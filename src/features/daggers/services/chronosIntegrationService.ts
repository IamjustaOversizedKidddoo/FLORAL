// ============================================================
// CHRONOS INTEGRATION SERVICE — Safe, Read-Only Link
// Reads real CHRONOS session records from 'chronos_focus_v1'
// Never alters CHRONOS state, timer logic, or storage format
// ============================================================

import type { SessionRecord } from '../../../core/types';
import { FOCUS_INTENT_KEY } from '../constants';
import { timerEvents } from '../../../core/timerEvents';

export const CHRONOS_STORAGE_KEY = 'chronos_focus_v1' as const;

export interface FocusIntent {
  task: string;
  subject?: string;
  dayNumber: number;
  targetMinutes?: number;
  createdAt: number;
}

/**
 * Safely parse date from epoch ms to local ISO date string (YYYY-MM-DD)
 */
export function epochToLocalDateString(epochMs: number): string {
  const d = new Date(epochMs);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Safely read and parse CHRONOS store from LocalStorage without mutating anything
 */
export function getChronosStore(): any | null {
  try {
    const raw = localStorage.getItem(CHRONOS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') return parsed;
    return null;
  } catch (err) {
    console.warn('[ChronosLink] Failed to read CHRONOS store:', err);
    return null;
  }
}

/**
 * Extract all recorded session records from CHRONOS history
 */
export function getChronosHistory(): SessionRecord[] {
  const store = getChronosStore();
  if (!store || !store.stats || !Array.isArray(store.stats.history)) {
    return [];
  }
  return store.stats.history;
}

/**
 * Get all focus sessions recorded in CHRONOS for a specific date (YYYY-MM-DD)
 */
export function getFocusSessionsForDate(targetDateStr: string): SessionRecord[] {
  const history = getChronosHistory();
  return history.filter((session) => {
    if (session.mode !== 'FOCUS') return false;
    const sessionDate = epochToLocalDateString(session.completedAt || session.startedAt || session.timestamp || 0);
    return sessionDate === targetDateStr;
  });
}

/**
 * Calculate total actual focused minutes recorded in CHRONOS for a given date
 */
export function getFocusMinutesForDate(targetDateStr: string): number {
  const sessions = getFocusSessionsForDate(targetDateStr);
  const totalSeconds = sessions.reduce((acc, s) => {
    if (typeof s.actualFocusedDurationSeconds === 'number' && !isNaN(s.actualFocusedDurationSeconds)) {
      return acc + s.actualFocusedDurationSeconds;
    }
    if (typeof s.durationMinutes === 'number' && !isNaN(s.durationMinutes)) {
      return acc + s.durationMinutes * 60;
    }
    return acc + (s.plannedDurationMinutes || 25) * 60;
  }, 0);

  return Math.round(totalSeconds / 60);
}

/**
 * Calculate focus minutes for a date range [startDate, endDate] inclusive
 */
export function getFocusMinutesForDateRange(startDateStr: string, endDateStr: string): number {
  const history = getChronosHistory();
  const totalSeconds = history.reduce((acc, s) => {
    if (s.mode !== 'FOCUS') return acc;
    const sessionDate = epochToLocalDateString(s.completedAt || s.startedAt || s.timestamp || 0);
    if (sessionDate >= startDateStr && sessionDate <= endDateStr) {
      const sec = typeof s.actualFocusedDurationSeconds === 'number' && !isNaN(s.actualFocusedDurationSeconds)
        ? s.actualFocusedDurationSeconds
        : (s.durationMinutes || s.plannedDurationMinutes || 25) * 60;
      return acc + sec;
    }
    return acc;
  }, 0);

  return Math.round(totalSeconds / 60);
}

/**
 * Total lifetime focus minutes recorded in CHRONOS
 */
export function getTotalChronosFocusMinutes(): number {
  const store = getChronosStore();
  if (store?.stats && typeof store.stats.totalFocusMinutes === 'number') {
    return store.stats.totalFocusMinutes;
  }
  const history = getChronosHistory();
  const totalSeconds = history
    .filter((s) => s.mode === 'FOCUS')
    .reduce((sum, s) => sum + (s.actualFocusedDurationSeconds || (s.durationMinutes || 25) * 60), 0);
  return Math.round(totalSeconds / 60);
}

/**
 * Save focus session intent (subject, task, dayNumber) so CHRONOS session can be contextualized
 */
export function setFocusIntent(intent: FocusIntent): void {
  try {
    localStorage.setItem(FOCUS_INTENT_KEY, JSON.stringify(intent));
  } catch (err) {
    console.warn('[ChronosLink] Failed to save focus intent:', err);
  }
}

/**
 * Retrieve current focus session intent if any
 */
export function getFocusIntent(): FocusIntent | null {
  try {
    const raw = localStorage.getItem(FOCUS_INTENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Clear focus session intent
 */
export function clearFocusIntent(): void {
  try {
    localStorage.removeItem(FOCUS_INTENT_KEY);
  } catch {
    // silent
  }
}

/**
 * Launch CHRONOS timer with associated study/task intent
 */
export function launchChronosTimer(
  task: string,
  subject: string,
  dayNumber: number,
  onLaunchCallback?: (intent: FocusIntent) => void
): void {
  const intent: FocusIntent = {
    task,
    subject,
    dayNumber,
    createdAt: Date.now(),
  };
  setFocusIntent(intent);
  if (onLaunchCallback) {
    onLaunchCallback(intent);
  } else {
    // Fallback if accessed standalone
    window.location.href = `/?task=${encodeURIComponent(task)}&subject=${encodeURIComponent(subject)}&source=daggers`;
  }
}

/**
 * Subscribe to CHRONOS updates (via window storage event + in-memory timerEvents)
 */
export function subscribeToChronosUpdates(onUpdate: () => void): () => void {
  const handleStorage = (e: StorageEvent) => {
    if (e.key === CHRONOS_STORAGE_KEY) {
      onUpdate();
    }
  };

  window.addEventListener('storage', handleStorage);

  const unsubEvent = timerEvents.on('SESSION_COMPLETED', () => {
    onUpdate();
  });

  return () => {
    window.removeEventListener('storage', handleStorage);
    unsubEvent();
  };
}
