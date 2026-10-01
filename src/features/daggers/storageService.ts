// ============================================================
// DAGGERS STORAGE SERVICE — Resilient Persistence Engine
// Isolated localStorage namespace — floral_mighty_daggers_tracker_v1
// Never touches or modifies chronos_focus_v1
// ============================================================

import type { DaggersPersistedStore, DayEntry, ProgrammeConfig } from './types';
import {
  DAGGERS_STORAGE_KEY,
  LEGACY_STORAGE_KEY,
  DAGGERS_STORAGE_VERSION,
  TOTAL_DAYS,
  DEFAULT_PROGRAMME_CONFIG,
  SCORE_WEIGHTS,
} from './constants';
import { getFocusMinutesForDate } from './services/chronosIntegrationService';

// Storage error tracking
let lastStorageError: string | null = null;

export function getLastStorageError(): string | null {
  return lastStorageError;
}

export function clearLastStorageError(): void {
  lastStorageError = null;
}

// ============================================================
// HELPERS — Day construction & scoring
// ============================================================

/**
 * Compute the date string (YYYY-MM-DD) for a given day number (1-based).
 */
export function dayNumberToDate(startDate: string, dayNumber: number): string {
  const [y, m, d] = startDate.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d + dayNumber - 1));
  return date.toISOString().split('T')[0];
}

/**
 * Compute which day number (1-90) corresponds to today.
 * Returns 0 if before the start date, or > 90 if after.
 */
export function todayDayNumber(startDate: string): number {
  const [sy, sm, sd] = startDate.split('-').map(Number);
  const startUtc = Date.UTC(sy, sm - 1, sd);
  const now = new Date();
  const todayUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const diff = Math.floor((todayUtc - startUtc) / 86400000) + 1;
  return diff;
}

/**
 * Compute the completion score (0-100) for a day entry.
 * Uses the weighted pillars from SCORE_WEIGHTS.
 */
export function computeCompletionScore(entry: DayEntry): number {
  let score = 0;

  // PT pillar (35%)
  if (entry.physicalLog?.safetyConfirmed) {
    score += SCORE_WEIGHTS.PT;
  } else if (entry.pt) {
    const ptFields = [
      entry.pt.runDistanceKm,
      entry.pt.pushUps,
      entry.pt.pullUps,
      entry.pt.sitUps,
    ].filter((v) => v !== undefined && v > 0);
    if (ptFields.length >= 2) score += SCORE_WEIGHTS.PT;
    else if (ptFields.length === 1) score += SCORE_WEIGHTS.PT * 0.5;
  }

  // SSB pillar (30%)
  if (entry.ssbSubmission?.isCompleted) {
    score += SCORE_WEIGHTS.SSB;
  } else if (entry.ssb && entry.ssb.activities.length > 0) {
    const ssbMinutes = entry.ssb.durationMin ?? 0;
    if (ssbMinutes >= 60) score += SCORE_WEIGHTS.SSB;
    else if (ssbMinutes > 0) score += SCORE_WEIGHTS.SSB * (ssbMinutes / 60);
    else score += SCORE_WEIGHTS.SSB * 0.5; // Activity logged without duration
  }

  // Studies pillar (20%)
  if (entry.studies && entry.studies.length > 0) {
    const totalStudyMin = entry.studies.reduce((sum, s) => sum + (s.durationMin ?? 0), 0);
    if (totalStudyMin >= 120) score += SCORE_WEIGHTS.STUDIES;
    else if (totalStudyMin > 0) score += SCORE_WEIGHTS.STUDIES * (totalStudyMin / 120);
  } else if (entry.lessonSubmission?.isQuizPassed || entry.mentalSubmission?.isCompleted) {
    let academyStudies = 0;
    if (entry.lessonSubmission?.isQuizPassed) academyStudies += SCORE_WEIGHTS.STUDIES * 0.6;
    if (entry.mentalSubmission?.isCompleted) academyStudies += SCORE_WEIGHTS.STUDIES * 0.4;
    score += Math.min(SCORE_WEIGHTS.STUDIES, academyStudies);
  } else if ((entry.chronosFocusMinutes ?? 0) >= 30) {
    score += SCORE_WEIGHTS.STUDIES * 0.5;
  }

  // Reflection pillar (15%)
  if (entry.reflection && entry.reflection.text.trim().length >= 20) {
    score += SCORE_WEIGHTS.REFLECTION;
  } else if (entry.routineHabitsCompleted && entry.routineHabitsCompleted.length >= 3) {
    // If routine habits are recorded with at least 3 items, grant discipline bonus
    score += SCORE_WEIGHTS.REFLECTION * 0.8;
  } else if (entry.routineHabitsCompleted && entry.routineHabitsCompleted.length > 0) {
    score += SCORE_WEIGHTS.REFLECTION * 0.5;
  }

  return Math.min(100, Math.round(score));
}

// ============================================================
// FACTORY — Build a blank 90-day schedule
// ============================================================
export function createDefaultStore(config: ProgrammeConfig = DEFAULT_PROGRAMME_CONFIG): DaggersPersistedStore {
  const today = todayDayNumber(config.startDate);

  const days: DayEntry[] = Array.from({ length: TOTAL_DAYS }, (_, i) => {
    const dayNumber = i + 1;
    const date = dayNumberToDate(config.startDate, dayNumber);
    const status =
      dayNumber < today
        ? 'MISSED'
        : dayNumber === today
          ? 'ACTIVE'
          : 'LOCKED';

    return {
      dayNumber,
      date,
      status,
      chronosFocusMinutes: getFocusMinutesForDate(date),
      completionScore: 0,
      lastModified: 0,
    };
  });

  return {
    version: DAGGERS_STORAGE_VERSION,
    lastSavedTimestamp: Date.now(),
    config,
    days,
  };
}

/**
 * Synchronize all days in store with real CHRONOS session logs
 */
export function syncWithChronosSessions(store: DaggersPersistedStore): DaggersPersistedStore {
  let changed = false;
  const days = store.days.map((d) => {
    const actualFocus = getFocusMinutesForDate(d.date);
    if (actualFocus !== d.chronosFocusMinutes) {
      changed = true;
      return { ...d, chronosFocusMinutes: actualFocus };
    }
    return d;
  });

  if (!changed) return store;
  return { ...store, days };
}

// ============================================================
// LOAD
// ============================================================
export function loadDaggersStore(): DaggersPersistedStore {
  try {
    let raw = localStorage.getItem(DAGGERS_STORAGE_KEY);

    // Fallback migration from legacy key if present
    if (!raw) {
      raw = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (raw) {
        try {
          localStorage.setItem(DAGGERS_STORAGE_KEY, raw);
          localStorage.removeItem(LEGACY_STORAGE_KEY);
        } catch {
          // ignore migration write failure
        }
      }
    }

    if (!raw) return createDefaultStore();

    const parsed = JSON.parse(raw) as DaggersPersistedStore;
    if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.days)) {
      return createDefaultStore();
    }

    // Ensure all 90 days are present
    if (parsed.days.length !== TOTAL_DAYS) {
      const defaultStore = createDefaultStore(parsed.config ?? DEFAULT_PROGRAMME_CONFIG);
      const mergedDays = defaultStore.days.map((d) => {
        const existing = parsed.days.find((p) => p.dayNumber === d.dayNumber);
        return existing ?? d;
      });
      return {
        ...defaultStore,
        days: mergedDays,
      };
    }

    // Synchronize CHRONOS focus records
    return syncWithChronosSessions(parsed);
  } catch (err) {
    console.warn('[Daggers Storage] Load failed — using defaults:', err);
    lastStorageError = 'Failed to load local storage. Using default session state.';
    return createDefaultStore();
  }
}

// ============================================================
// SAVE
// ============================================================
export function saveDaggersStore(store: DaggersPersistedStore): boolean {
  try {
    const serialized = JSON.stringify({
      ...store,
      lastSavedTimestamp: Date.now(),
    });
    localStorage.setItem(DAGGERS_STORAGE_KEY, serialized);
    lastStorageError = null;
    return true;
  } catch (err) {
    console.warn('[Daggers Storage] Save failed:', err);
    lastStorageError = 'Browser storage quota exceeded or storage disabled. Progress could not be saved.';
    return false;
  }
}

// ============================================================
// UPDATE SINGLE DAY
// ============================================================
export function updateDayEntry(
  store: DaggersPersistedStore,
  dayNumber: number,
  patch: Partial<DayEntry>,
): DaggersPersistedStore {
  const days = store.days.map((d) => {
    if (d.dayNumber !== dayNumber) return d;
    const updated: DayEntry = {
      ...d,
      ...patch,
      dayNumber,
      lastModified: Date.now(),
    };
    const computedScore = computeCompletionScore(updated);
    updated.completionScore =
      patch.completionScore !== undefined
        ? Math.max(patch.completionScore, computedScore)
        : computedScore;

    if (patch.status) {
      updated.status = patch.status;
    } else {
      updated.status =
        updated.completionScore >= 75
          ? 'COMPLETE'
          : updated.completionScore > 0
            ? 'PARTIAL'
            : d.status;
    }
    return updated;
  });

  const next: DaggersPersistedStore = { ...store, days, lastSavedTimestamp: Date.now() };
  saveDaggersStore(next);
  return next;
}

// ============================================================
// UPDATE CONFIG (Start date, Candidate name)
// ============================================================
export function updateConfig(
  store: DaggersPersistedStore,
  patch: Partial<ProgrammeConfig>,
): DaggersPersistedStore {
  const newConfig = { ...store.config, ...patch };
  let days = store.days;

  if (patch.startDate && patch.startDate !== store.config.startDate) {
    const today = todayDayNumber(newConfig.startDate);
    days = store.days.map((d) => {
      const newDate = dayNumberToDate(newConfig.startDate, d.dayNumber);
      let status = d.status;
      if (d.completionScore === 0) {
        status = d.dayNumber < today ? 'MISSED' : d.dayNumber === today ? 'ACTIVE' : 'LOCKED';
      } else {
        status = d.completionScore >= 85 ? 'COMPLETE' : 'PARTIAL';
      }
      return {
        ...d,
        date: newDate,
        status,
        chronosFocusMinutes: getFocusMinutesForDate(newDate),
      };
    });
  }

  const next: DaggersPersistedStore = {
    ...store,
    config: newConfig,
    days,
    lastSavedTimestamp: Date.now(),
  };
  saveDaggersStore(next);
  return next;
}

// ============================================================
// ACCUMULATE CHRONOS FOCUS TIME FOR TODAY
// ============================================================
export function addChronosFocusMinutes(
  store: DaggersPersistedStore,
  minutesToAdd: number,
): DaggersPersistedStore {
  const today = todayDayNumber(store.config.startDate);
  if (today < 1 || today > TOTAL_DAYS) return store;

  const days = store.days.map((d) => {
    if (d.dayNumber !== today) return d;
    return {
      ...d,
      chronosFocusMinutes: d.chronosFocusMinutes + minutesToAdd,
      lastModified: Date.now(),
    };
  });

  const next: DaggersPersistedStore = { ...store, days, lastSavedTimestamp: Date.now() };
  saveDaggersStore(next);
  return next;
}

// ============================================================
// FULL RESET
// ============================================================
export function resetDaggersStore(): DaggersPersistedStore {
  try {
    localStorage.removeItem(DAGGERS_STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch {
    // silent
  }
  const fresh = createDefaultStore();
  saveDaggersStore(fresh);
  return fresh;
}

// ============================================================
// BACKUP EXPORT & IMPORT ENGINE
// ============================================================

export interface TrackerBackupFile {
  app: '4_PARA_SF_MIGHTY_DAGGERS_PROBATION';
  version: number;
  exportedAt: string;
  store: DaggersPersistedStore;
}

/**
 * Generate a validated JSON backup string of the tracker data
 */
export function exportTrackerBackup(store: DaggersPersistedStore): string {
  const backup: TrackerBackupFile = {
    app: '4_PARA_SF_MIGHTY_DAGGERS_PROBATION',
    version: store.version,
    exportedAt: new Date().toISOString(),
    store,
  };
  return JSON.stringify(backup, null, 2);
}

/**
 * Strictly validate and parse imported backup data.
 * Rejects invalid format, corrupted data, or partial schedules.
 */
export function validateAndImportTrackerBackup(
  rawJson: string,
): { success: boolean; store?: DaggersPersistedStore; error?: string } {
  try {
    if (!rawJson || typeof rawJson !== 'string' || !rawJson.trim()) {
      return { success: false, error: 'Import file is empty.' };
    }

    const parsed = JSON.parse(rawJson);
    if (!parsed || typeof parsed !== 'object') {
      return { success: false, error: 'File content is not a valid JSON object.' };
    }

    // Accept either direct store or wrapped backup file
    const targetStore: DaggersPersistedStore = parsed.store ?? parsed;

    // Validate config
    if (!targetStore.config || typeof targetStore.config !== 'object') {
      return { success: false, error: 'Backup is missing required programme configuration.' };
    }
    if (!targetStore.config.startDate || isNaN(Date.parse(targetStore.config.startDate))) {
      return { success: false, error: 'Invalid or missing programme start date in backup.' };
    }

    // Validate days array
    if (!Array.isArray(targetStore.days)) {
      return { success: false, error: 'Backup is missing days array.' };
    }
    if (targetStore.days.length !== TOTAL_DAYS) {
      return {
        success: false,
        error: `Invalid day count in backup: found ${targetStore.days.length} days, expected exactly ${TOTAL_DAYS}.`,
      };
    }

    // Validate day structure integrity
    for (let i = 0; i < targetStore.days.length; i++) {
      const day = targetStore.days[i];
      if (typeof day.dayNumber !== 'number' || day.dayNumber < 1 || day.dayNumber > TOTAL_DAYS) {
        return { success: false, error: `Corrupt dayNumber at index ${i}.` };
      }
      if (!day.date || typeof day.date !== 'string') {
        return { success: false, error: `Missing or invalid date for Day ${day.dayNumber}.` };
      }
    }

    // Validated successfully
    const sanitizedStore: DaggersPersistedStore = {
      version: DAGGERS_STORAGE_VERSION,
      lastSavedTimestamp: Date.now(),
      config: {
        startDate: targetStore.config.startDate,
        programmeTitle: targetStore.config.programmeTitle || DEFAULT_PROGRAMME_CONFIG.programmeTitle,
        candidateName: targetStore.config.candidateName || undefined,
        targetUnit: targetStore.config.targetUnit || DEFAULT_PROGRAMME_CONFIG.targetUnit,
      },
      days: targetStore.days.map((d) => ({
        dayNumber: d.dayNumber,
        date: d.date,
        status: d.status || 'LOCKED',
        pt: d.pt,
        ssb: d.ssb,
        studies: Array.isArray(d.studies) ? d.studies : undefined,
        reflection: d.reflection,
        routineHabitsCompleted: Array.isArray(d.routineHabitsCompleted) ? d.routineHabitsCompleted : undefined,
        chronosFocusMinutes: typeof d.chronosFocusMinutes === 'number' ? d.chronosFocusMinutes : 0,
        completionScore: typeof d.completionScore === 'number' ? d.completionScore : computeCompletionScore(d),
        lastModified: typeof d.lastModified === 'number' ? d.lastModified : Date.now(),
      })),
    };

    saveDaggersStore(sanitizedStore);
    return { success: true, store: sanitizedStore };
  } catch (err: any) {
    return { success: false, error: `Invalid JSON format: ${err?.message || 'Syntax error'}` };
  }
}
