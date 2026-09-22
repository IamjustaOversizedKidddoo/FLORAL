// ============================================================
// STORAGE SERVICE — Versioned LocalStorage with Schema Migration
//
// DESIGN:
// - Schema version 2 with automated backward-compatible migrations
// - Sanitizes and validates data on read & write
// - Granular resets: category-level, all-settings, and full-data
// - Never throws, never corrupts
// ============================================================

import type {
  PersistedStore,
  TimerSettings,
  ProductivityStats,
  PersistedSessionState,
  SessionRecord,
} from '../core/types';
import { DEFAULT_SETTINGS, DEFAULT_STATS, STORAGE_KEY, STORAGE_VERSION } from '../core/constants';
import { validateSettings } from '../core/settingsValidation';

let inMemoryFallbackStore: PersistedStore | null = null;

export function getInMemoryStore(): PersistedStore | null {
  return inMemoryFallbackStore;
}

// ============================================================
// DEFENSIVE RECORD SANITIZATION
// ============================================================
export function sanitizeSessionRecord(s: unknown, idx = 0): SessionRecord | null {
  if (!s || typeof s !== 'object') return null;
  const obj = s as Record<string, any>;

  const now = Date.now();
  let startedAt = Number(obj.startedAt ?? obj.timestamp);
  if (isNaN(startedAt) || startedAt <= 0) startedAt = now;

  let completedAt = Number(obj.completedAt ?? obj.timestamp);
  if (isNaN(completedAt) || completedAt <= 0) completedAt = now;

  const mode =
    obj.mode === 'SHORT_BREAK' || obj.mode === 'LONG_BREAK' ? obj.mode : 'FOCUS';

  let planned = Number(obj.plannedDurationMinutes ?? obj.durationMinutes ?? 25);
  if (isNaN(planned) || planned <= 0) planned = 25;

  let actualSec = Number(obj.actualFocusedDurationSeconds);
  if (isNaN(actualSec) || actualSec < 0) {
    actualSec =
      typeof obj.durationMinutes === 'number' && !isNaN(obj.durationMinutes)
        ? Math.max(0, obj.durationMinutes * 60)
        : planned * 60;
  }

  const cycle = Number(obj.cycle) > 0 ? Number(obj.cycle) : 1;
  const completionType =
    obj.completionType === 'RESET' || obj.completionType === 'SKIPPED'
      ? obj.completionType
      : obj.completed !== false
      ? 'COMPLETED'
      : 'RESET';

  return {
    id:
      typeof obj.id === 'string' && obj.id.trim()
        ? obj.id
        : `sanitized_${now}_${idx}`,
    startedAt,
    completedAt,
    mode,
    plannedDurationMinutes: Math.round(planned),
    actualFocusedDurationSeconds: Math.round(actualSec),
    cycle,
    completionType,
    timestamp: completedAt,
    durationMinutes: Math.round(actualSec / 60),
    completed: completionType === 'COMPLETED',
  };
}

// ============================================================
// DEFAULT STORE FACTORY
// ============================================================
export function createDefaultStore(): PersistedStore {
  return {
    version: STORAGE_VERSION,
    lastSavedTimestamp: Date.now(),
    settings: { ...DEFAULT_SETTINGS },
    stats: { ...DEFAULT_STATS },
    session: null,
  };
}

// ============================================================
// SCHEMA MIGRATION STRATEGY
// ============================================================
export function migrateStore(rawParsed: Partial<PersistedStore>): PersistedStore {
  const currentVersion = rawParsed.version ?? 1;

  let settings = rawParsed.settings ? validateSettings(rawParsed.settings) : { ...DEFAULT_SETTINGS };
  const rawStats = (rawParsed.stats ?? {}) as Record<string, any>;

  // Normalize legacy session history with defensive sanitization
  const rawHistory: any[] = Array.isArray(rawStats.history) ? rawStats.history : [];
  const normalizedHistory: SessionRecord[] = rawHistory
    .map((s, idx) => sanitizeSessionRecord(s, idx))
    .filter((rec): rec is SessionRecord => rec !== null);

  const currentStreak =
    typeof rawStats.currentStreakDays === 'number' && !isNaN(rawStats.currentStreakDays)
      ? Math.max(0, rawStats.currentStreakDays)
      : typeof rawStats.currentStreak === 'number' && !isNaN(rawStats.currentStreak)
        ? Math.max(0, rawStats.currentStreak as number)
        : DEFAULT_STATS.currentStreakDays;

  const longestStreak =
    typeof rawStats.longestStreakDays === 'number' && !isNaN(rawStats.longestStreakDays)
      ? Math.max(0, rawStats.longestStreakDays)
      : typeof rawStats.longestStreak === 'number' && !isNaN(rawStats.longestStreak)
        ? Math.max(0, rawStats.longestStreak as number)
        : Math.max(DEFAULT_STATS.longestStreakDays, currentStreak);

  const totalCompleted =
    typeof rawStats.totalCompletedSessions === 'number' && !isNaN(rawStats.totalCompletedSessions)
      ? Math.max(0, rawStats.totalCompletedSessions)
      : typeof rawStats.sessionsCompleted === 'number' && !isNaN(rawStats.sessionsCompleted)
        ? Math.max(0, rawStats.sessionsCompleted)
        : DEFAULT_STATS.totalCompletedSessions;

  const stats: ProductivityStats = {
    ...DEFAULT_STATS,
    ...rawStats,
    history: normalizedHistory,
    currentStreakDays: currentStreak,
    longestStreakDays: longestStreak,
    totalCompletedSessions: totalCompleted,
    dailyTargetMinutes: rawStats.dailyTargetMinutes ?? DEFAULT_STATS.dailyTargetMinutes,
    dailyTargetSessions: rawStats.dailyTargetSessions ?? DEFAULT_STATS.dailyTargetSessions,
  };
  const session = rawParsed.session ?? null;

  if (currentVersion < 2) {
    // Migration from v1 -> v2: Backfill newly added customization settings
    settings = validateSettings(rawParsed.settings ?? {}, DEFAULT_SETTINGS);
  }

  return {
    version: STORAGE_VERSION,
    lastSavedTimestamp: Date.now(),
    settings,
    stats,
    session,
  };
}

// ============================================================
// LOAD — Synchronous read at app boot
// ============================================================
export function loadPersistedStore(): PersistedStore {
  try {
    let raw: string | null = null;
    try {
      raw = localStorage.getItem(STORAGE_KEY);
    } catch (accessErr) {
      console.warn('[Storage] LocalStorage access unavailable. Using fallback:', accessErr);
      return inMemoryFallbackStore || createDefaultStore();
    }

    if (!raw) return inMemoryFallbackStore || createDefaultStore();

    const parsed = JSON.parse(raw) as Partial<PersistedStore>;
    if (!parsed || typeof parsed !== 'object') {
      return inMemoryFallbackStore || createDefaultStore();
    }

    // If version is older or missing, migrate safely rather than resetting
    if (!parsed.version || parsed.version < STORAGE_VERSION) {
      const migrated = migrateStore(parsed);
      saveStore(migrated);
      return migrated;
    }

    const rawStats = (parsed.stats ?? {}) as Record<string, any>;
    const rawHistory = Array.isArray(rawStats.history) ? rawStats.history : [];
    const sanitizedHistory = rawHistory
      .map((item, idx) => sanitizeSessionRecord(item, idx))
      .filter((rec): rec is SessionRecord => rec !== null);

    const store: PersistedStore = {
      version: STORAGE_VERSION,
      lastSavedTimestamp: parsed.lastSavedTimestamp ?? Date.now(),
      settings: validateSettings(parsed.settings ?? {}, DEFAULT_SETTINGS),
      stats: {
        ...DEFAULT_STATS,
        ...rawStats,
        history: sanitizedHistory,
      },
      session: parsed.session ?? null,
    };
    inMemoryFallbackStore = store;
    return store;
  } catch (err) {
    // Backup corrupted string for safety
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) localStorage.setItem(`${STORAGE_KEY}_backup`, raw);
    } catch {
      // Ignore backup error
    }
    console.warn('[Storage] Failed to load store — falling back to defaults:', err);
    const fallback = inMemoryFallbackStore || createDefaultStore();
    inMemoryFallbackStore = fallback;
    return fallback;
  }
}

// ============================================================
// SAVE STORE
// ============================================================
export function saveStore(store: PersistedStore): void {
  inMemoryFallbackStore = store;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (err: any) {
    // QuotaExceededError handling: attempt pruning older history
    if (err?.name === 'QuotaExceededError' || err?.code === 22) {
      console.warn('[Storage] Quota exceeded. Pruning older history to preserve state...');
      try {
        const pruned: PersistedStore = {
          ...store,
          stats: {
            ...store.stats,
            history: (store.stats.history || []).slice(0, 50),
          },
        };
        inMemoryFallbackStore = pruned;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(pruned));
        return;
      } catch {
        console.warn('[Storage] Quota still exceeded after pruning. Operating in memory-only fallback.');
      }
    } else {
      console.warn('[Storage] Write failure:', err);
    }
  }
}

export const loadStore = loadPersistedStore;

// ============================================================
// SAVE SETTINGS
// ============================================================
export function saveSettings(settings: TimerSettings): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const current = raw ? (JSON.parse(raw) as PersistedStore) : createDefaultStore();
    const validated = validateSettings(settings, current.settings);

    const next: PersistedStore = {
      ...current,
      version: STORAGE_VERSION,
      settings: validated,
      lastSavedTimestamp: Date.now(),
    };
    saveStore(next);
  } catch (err) {
    console.warn('[Storage] Failed to save settings:', err);
  }
}

// ============================================================
// SAVE STATS
// ============================================================
export function saveStats(stats: ProductivityStats): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const current = raw ? (JSON.parse(raw) as PersistedStore) : createDefaultStore();

    const next: PersistedStore = {
      ...current,
      version: STORAGE_VERSION,
      stats,
      lastSavedTimestamp: Date.now(),
    };
    saveStore(next);
  } catch (err) {
    console.warn('[Storage] Failed to save stats:', err);
  }
}

// ============================================================
// SAVE SESSION
// ============================================================
export function saveSession(session: PersistedSessionState | null): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const current = raw ? (JSON.parse(raw) as PersistedStore) : createDefaultStore();

    const next: PersistedStore = {
      ...current,
      version: STORAGE_VERSION,
      session,
      lastSavedTimestamp: Date.now(),
    };
    saveStore(next);
  } catch (err) {
    console.warn('[Storage] Failed to save session:', err);
  }
}

// ============================================================
// RESET SETTINGS (Retains Statistics)
// ============================================================
export function resetAllSettings(): TimerSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const current = raw ? (JSON.parse(raw) as PersistedStore) : createDefaultStore();
    const freshSettings = { ...DEFAULT_SETTINGS };

    const next: PersistedStore = {
      ...current,
      version: STORAGE_VERSION,
      settings: freshSettings,
      lastSavedTimestamp: Date.now(),
    };
    saveStore(next);
    return freshSettings;
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

// ============================================================
// RESET CATEGORY SETTINGS
// ============================================================
export function resetCategorySettings(
  category: 'timer' | 'automation' | 'sound' | 'notifications' | 'appearance' | 'behavior',
  currentSettings: TimerSettings,
): TimerSettings {
  const next = { ...currentSettings };

  switch (category) {
    case 'timer':
      next.focusDurationMin = DEFAULT_SETTINGS.focusDurationMin;
      next.shortBreakDurationMin = DEFAULT_SETTINGS.shortBreakDurationMin;
      next.longBreakDurationMin = DEFAULT_SETTINGS.longBreakDurationMin;
      next.sessionsBeforeLongBreak = DEFAULT_SETTINGS.sessionsBeforeLongBreak;
      break;
    case 'automation':
      next.autoStartBreaks = DEFAULT_SETTINGS.autoStartBreaks;
      next.autoStartFocus = DEFAULT_SETTINGS.autoStartFocus;
      next.autoStartCycle = DEFAULT_SETTINGS.autoStartCycle;
      break;
    case 'sound':
      next.soundEnabled = DEFAULT_SETTINGS.soundEnabled;
      next.soundTheme = DEFAULT_SETTINGS.soundTheme;
      next.breakSoundTheme = DEFAULT_SETTINGS.breakSoundTheme;
      next.longBreakSoundTheme = DEFAULT_SETTINGS.longBreakSoundTheme;
      next.soundVolume = DEFAULT_SETTINGS.soundVolume;
      next.tickSoundEnabled = DEFAULT_SETTINGS.tickSoundEnabled;
      break;
    case 'notifications':
      next.notificationsEnabled = DEFAULT_SETTINGS.notificationsEnabled;
      next.focusNotificationEnabled = DEFAULT_SETTINGS.focusNotificationEnabled;
      next.breakNotificationEnabled = DEFAULT_SETTINGS.breakNotificationEnabled;
      break;
    case 'appearance':
      next.theme = DEFAULT_SETTINGS.theme;
      next.backgroundStyle = DEFAULT_SETTINGS.backgroundStyle;
      break;
    case 'behavior':
      next.showRemainingInTitle = DEFAULT_SETTINGS.showRemainingInTitle;
      next.showSessionDots = DEFAULT_SETTINGS.showSessionDots;
      next.showModeTabs = DEFAULT_SETTINGS.showModeTabs;
      next.timerFormat = DEFAULT_SETTINGS.timerFormat;
      next.confirmReset = DEFAULT_SETTINGS.confirmReset;
      next.confirmSkip = DEFAULT_SETTINGS.confirmSkip;
      next.spaceToStartPause = DEFAULT_SETTINGS.spaceToStartPause;
      next.keyboardShortcutsEnabled = DEFAULT_SETTINGS.keyboardShortcutsEnabled;
      next.keepScreenAwake = DEFAULT_SETTINGS.keepScreenAwake;
      break;
  }

  saveSettings(next);
  return next;
}

// ============================================================
// DELETE PRODUCTIVITY HISTORY (Retains Settings)
// ============================================================
export function deleteProductivityHistory(): ProductivityStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const current = raw ? (JSON.parse(raw) as PersistedStore) : createDefaultStore();
    const freshStats: ProductivityStats = {
      ...DEFAULT_STATS,
      dailyTargetMinutes: current.stats?.dailyTargetMinutes ?? DEFAULT_STATS.dailyTargetMinutes,
      dailyTargetSessions: current.stats?.dailyTargetSessions ?? DEFAULT_STATS.dailyTargetSessions,
    };
    const next: PersistedStore = {
      ...current,
      version: STORAGE_VERSION,
      stats: freshStats,
      lastSavedTimestamp: Date.now(),
    };
    saveStore(next);
    return freshStats;
  } catch {
    return { ...DEFAULT_STATS };
  }
}

// ============================================================
// SAVE GOALS
// ============================================================
export function saveGoals(dailyTargetMinutes: number, dailyTargetSessions: number): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const current = raw ? (JSON.parse(raw) as PersistedStore) : createDefaultStore();
    const next: PersistedStore = {
      ...current,
      stats: {
        ...current.stats,
        dailyTargetMinutes,
        dailyTargetSessions,
      },
      lastSavedTimestamp: Date.now(),
    };
    saveStore(next);
  } catch (err) {
    console.warn('[Storage] Failed to save goals:', err);
  }
}

// ============================================================
// DESTRUCTIVE FULL RESET (Settings + Stats + Session)
// ============================================================
export function resetAllData(): PersistedStore {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('[Storage] Failed to clear localStorage:', err);
  }
  const fresh = createDefaultStore();
  saveStore(fresh);
  return fresh;
}
