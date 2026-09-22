import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import {
  getLocalDateISO,
  getYesterdayISO,
  formatDurationMinutes,
  computeDailyStats,
  computeWeeklyStats,
  computeMonthlyStats,
  computeStreaks,
  computeInsights,
} from '../productivityAnalytics';
import { timerReducer, createInitialState } from '../stateMachine';
import { migrateStore, deleteProductivityHistory, loadStore } from '../../services/storageService';
import { DEFAULT_SETTINGS, DEFAULT_STATS } from '../constants';
import type { SessionRecord, ProductivityStats, PersistedStore } from '../types';

// Mock localStorage for Node test runner
const storageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => { store[k] = v.toString(); },
    removeItem: (k: string) => { delete store[k]; },
    clear: () => { store = {}; },
  };
})();

beforeAll(() => {
  if (typeof globalThis.localStorage === 'undefined') {
    Object.defineProperty(globalThis, 'localStorage', {
      value: storageMock,
      writable: true,
    });
  }
});

describe('Productivity Intelligence — Date & Formatting Utilities', () => {
  it('formats local dates into YYYY-MM-DD string accurately', () => {
    // Deterministic date: April 15, 2026
    const testDate = new Date(2026, 3, 15, 14, 30);
    expect(getLocalDateISO(testDate)).toBe('2026-04-15');
  });

  it('computes yesterday ISO accurately across month boundary', () => {
    // May 1 -> April 30
    const yesterday = getYesterdayISO('2026-05-01');
    expect(yesterday).toBe('2026-04-30');
  });

  it('computes yesterday ISO accurately across leap year boundary', () => {
    // March 1, 2024 (leap year) -> February 29
    const leapYesterday = getYesterdayISO('2024-03-01');
    expect(leapYesterday).toBe('2024-02-29');
  });

  it('formats duration in minutes into clean readable strings', () => {
    expect(formatDurationMinutes(0)).toBe('0m');
    expect(formatDurationMinutes(25)).toBe('25m');
    expect(formatDurationMinutes(60)).toBe('1h');
    expect(formatDurationMinutes(75)).toBe('1h 15m');
    expect(formatDurationMinutes(150)).toBe('2h 30m');
  });
});

describe('Productivity Intelligence — Daily Aggregations', () => {
  it('handles empty session history gracefully with zero defaults', () => {
    const daily = computeDailyStats([], '2026-04-15');
    expect(daily.focusMinutes).toBe(0);
    expect(daily.completedSessions).toBe(0);
    expect(daily.interruptedSessions).toBe(0);
    expect(daily.completionRate).toBe(100);
  });

  it('aggregates actual focused minutes and completed vs interrupted counts', () => {
    const testDate = '2026-04-15';
    const baseTimestamp = new Date(`${testDate}T10:00:00`).getTime();

    const mockHistory: SessionRecord[] = [
      // 25m completed focus
      {
        id: 's1',
        startedAt: baseTimestamp,
        completedAt: baseTimestamp + 25 * 60000,
        mode: 'FOCUS',
        plannedDurationMinutes: 25,
        actualFocusedDurationSeconds: 25 * 60,
        cycle: 1,
        completionType: 'COMPLETED',
      },
      // 12m reset focus
      {
        id: 's2',
        startedAt: baseTimestamp + 35 * 60000,
        completedAt: baseTimestamp + 47 * 60000,
        mode: 'FOCUS',
        plannedDurationMinutes: 25,
        actualFocusedDurationSeconds: 12 * 60,
        cycle: 1,
        completionType: 'RESET',
      },
      // Break session on the same day (should NOT count toward focus minutes)
      {
        id: 's3',
        startedAt: baseTimestamp + 50 * 60000,
        completedAt: baseTimestamp + 55 * 60000,
        mode: 'SHORT_BREAK',
        plannedDurationMinutes: 5,
        actualFocusedDurationSeconds: 5 * 60,
        cycle: 1,
        completionType: 'COMPLETED',
      },
      // Session on a different date
      {
        id: 's4',
        startedAt: baseTimestamp - 86400000,
        completedAt: baseTimestamp - 86400000 + 25 * 60000,
        mode: 'FOCUS',
        plannedDurationMinutes: 25,
        actualFocusedDurationSeconds: 25 * 60,
        cycle: 1,
        completionType: 'COMPLETED',
      },
    ];

    const stats = computeDailyStats(mockHistory, testDate);
    // 25m + 12m = 37m focus time
    expect(stats.focusMinutes).toBe(37);
    expect(stats.completedSessions).toBe(1);
    expect(stats.interruptedSessions).toBe(1);
    expect(stats.totalStartedSessions).toBe(2);
    expect(stats.completionRate).toBe(50); // 1 out of 2 completed
  });
});

describe('Productivity Intelligence — Weekly & Monthly Aggregations', () => {
  it('aggregates Monday through Sunday with correct total and peak day', () => {
    // Reference date: Wednesday, April 15, 2026
    const refDate = new Date(2026, 3, 15);
    // Monday of this week is April 13, 2026
    const mondayTs = new Date(2026, 3, 13, 10, 0).getTime();
    const tuesdayTs = new Date(2026, 3, 14, 11, 0).getTime();

    const mockHistory: SessionRecord[] = [
      {
        id: 'w1',
        startedAt: mondayTs,
        completedAt: mondayTs + 30 * 60000,
        mode: 'FOCUS',
        plannedDurationMinutes: 30,
        actualFocusedDurationSeconds: 30 * 60,
        cycle: 1,
        completionType: 'COMPLETED',
      },
      {
        id: 'w2',
        startedAt: tuesdayTs,
        completedAt: tuesdayTs + 50 * 60000,
        mode: 'FOCUS',
        plannedDurationMinutes: 50,
        actualFocusedDurationSeconds: 50 * 60,
        cycle: 1,
        completionType: 'COMPLETED',
      },
    ];

    const weekly = computeWeeklyStats(mockHistory, refDate);
    expect(weekly.days).toHaveLength(7);
    expect(weekly.days[0].dayName).toBe('Mon');
    expect(weekly.days[0].focusMinutes).toBe(30);
    expect(weekly.days[1].dayName).toBe('Tue');
    expect(weekly.days[1].focusMinutes).toBe(50);
    expect(weekly.weeklyTotalMinutes).toBe(80);
    expect(weekly.peakDay?.dayName).toBe('Tue');
    expect(weekly.peakDay?.focusMinutes).toBe(50);
  });

  it('aggregates monthly rhythm accurately and handles leap years', () => {
    // February 2024 has 29 days
    const febMonthly = computeMonthlyStats([], 2024, 1);
    expect(febMonthly.days).toHaveLength(29);
    expect(febMonthly.monthName).toBe('February');

    // April 2026 has 30 days
    const aprMonthly = computeMonthlyStats([], 2026, 3);
    expect(aprMonthly.days).toHaveLength(30);
    expect(aprMonthly.monthName).toBe('April');
  });
});

describe('Productivity Intelligence — Streak Arithmetic', () => {
  it('returns 0 streaks when no completed sessions exist', () => {
    const streaks = computeStreaks([], '2026-04-15');
    expect(streaks.currentStreakDays).toBe(0);
    expect(streaks.longestStreakDays).toBe(0);
    expect(streaks.isActiveToday).toBe(false);
  });

  it('calculates continuous daily streaks and preserves longest streak', () => {
    const todayISO = '2026-04-15';

    // Sessions on April 13, 14, 15 (3 consecutive days)
    const d1 = new Date('2026-04-13T10:00:00').getTime();
    const d2 = new Date('2026-04-14T10:00:00').getTime();
    const d3 = new Date('2026-04-15T10:00:00').getTime();

    const history: SessionRecord[] = [
      { id: '1', startedAt: d1, completedAt: d1 + 1500000, mode: 'FOCUS', plannedDurationMinutes: 25, actualFocusedDurationSeconds: 1500, cycle: 1, completionType: 'COMPLETED' },
      { id: '2', startedAt: d2, completedAt: d2 + 1500000, mode: 'FOCUS', plannedDurationMinutes: 25, actualFocusedDurationSeconds: 1500, cycle: 1, completionType: 'COMPLETED' },
      { id: '3', startedAt: d3, completedAt: d3 + 1500000, mode: 'FOCUS', plannedDurationMinutes: 25, actualFocusedDurationSeconds: 1500, cycle: 1, completionType: 'COMPLETED' },
    ];

    const streaks = computeStreaks(history, todayISO);
    expect(streaks.currentStreakDays).toBe(3);
    expect(streaks.longestStreakDays).toBe(3);
    expect(streaks.isActiveToday).toBe(true);
  });

  it('resets current streak when a day is skipped, but retains longest streak', () => {
    const todayISO = '2026-04-15';

    // Sessions on April 10, 11, 12, 13 (4 days), but April 14 and 15 were skipped
    const d1 = new Date('2026-04-10T10:00:00').getTime();
    const d2 = new Date('2026-04-11T10:00:00').getTime();
    const d3 = new Date('2026-04-12T10:00:00').getTime();
    const d4 = new Date('2026-04-13T10:00:00').getTime();

    const history: SessionRecord[] = [
      { id: '1', startedAt: d1, completedAt: d1 + 1500000, mode: 'FOCUS', plannedDurationMinutes: 25, actualFocusedDurationSeconds: 1500, cycle: 1, completionType: 'COMPLETED' },
      { id: '2', startedAt: d2, completedAt: d2 + 1500000, mode: 'FOCUS', plannedDurationMinutes: 25, actualFocusedDurationSeconds: 1500, cycle: 1, completionType: 'COMPLETED' },
      { id: '3', startedAt: d3, completedAt: d3 + 1500000, mode: 'FOCUS', plannedDurationMinutes: 25, actualFocusedDurationSeconds: 1500, cycle: 1, completionType: 'COMPLETED' },
      { id: '4', startedAt: d4, completedAt: d4 + 1500000, mode: 'FOCUS', plannedDurationMinutes: 25, actualFocusedDurationSeconds: 1500, cycle: 1, completionType: 'COMPLETED' },
    ];

    const streaks = computeStreaks(history, todayISO);
    // Current streak has lapsed because neither today nor yesterday had activity
    expect(streaks.currentStreakDays).toBe(0);
    // But historical best remains 4 days
    expect(streaks.longestStreakDays).toBe(4);
    expect(streaks.isActiveToday).toBe(false);
  });
});

describe('Productivity Intelligence — Derived Empirical Insights', () => {
  it('returns empty array when history is empty without hallucinating metrics', () => {
    const insights = computeInsights([], DEFAULT_STATS);
    expect(insights).toEqual([]);
  });

  it('generates grounded insights for weekly volume and completion rate', () => {
    const now = Date.now();
    const history: SessionRecord[] = [
      { id: '1', startedAt: now - 3600000, completedAt: now - 1800000, mode: 'FOCUS', plannedDurationMinutes: 30, actualFocusedDurationSeconds: 1800, cycle: 1, completionType: 'COMPLETED' },
      { id: '2', startedAt: now - 1800000, completedAt: now, mode: 'FOCUS', plannedDurationMinutes: 30, actualFocusedDurationSeconds: 1800, cycle: 1, completionType: 'COMPLETED' },
      { id: '3', startedAt: now, completedAt: now + 900000, mode: 'FOCUS', plannedDurationMinutes: 30, actualFocusedDurationSeconds: 900, cycle: 1, completionType: 'RESET' },
    ];

    const stats: ProductivityStats = {
      ...DEFAULT_STATS,
      dailyFocusMinutes: 75,
      dailyTargetMinutes: 60,
      history,
    };

    const insights = computeInsights(history, stats);
    expect(insights.length).toBeGreaterThan(0);
    // Goal met insight
    expect(insights.some((i) => i.id === 'goal-met')).toBe(true);
    // Completion rate insight
    expect(insights.some((i) => i.id === 'completion-rate')).toBe(true);
  });
});

describe('Productivity Intelligence — State Machine & Completion Rules', () => {
  it('records exact elapsed focus time and RESET status when timer is aborted after >= 60s', () => {
    const initialState = createInitialState();
    // Start focus timer (planned 25m)
    const running = timerReducer(initialState, { type: 'START', timestamp: 1000000 });
    // User focuses for 15 minutes (900,000ms)
    const tickState = timerReducer(running, { type: 'TICK', timestamp: 1000000 + 15 * 60000 });
    expect(tickState.elapsedMs).toBe(15 * 60000);

    // User presses RESET
    const resetState = timerReducer(tickState, { type: 'RESET', timestamp: 1000000 + 15 * 60000 });

    expect(resetState.status).toBe('IDLE');
    // History must contain a single session record with 15m (not 25m!)
    expect(resetState.stats.history).toHaveLength(1);
    const session = resetState.stats.history[0];
    expect(session.completionType).toBe('RESET');
    expect(session.plannedDurationMinutes).toBe(25);
    expect(session.actualFocusedDurationSeconds).toBe(15 * 60);
    // Completed session count must NOT increment
    expect(resetState.stats.dailyCompletedSessions).toBe(0);
    // But actual 15m focus time is counted
    expect(resetState.stats.dailyFocusMinutes).toBe(15);
  });

  it('discards accidental resets under 60 seconds from history', () => {
    const initialState = createInitialState();
    const running = timerReducer(initialState, { type: 'START', timestamp: 1000000 });
    // Focused for only 20 seconds
    const tickState = timerReducer(running, { type: 'TICK', timestamp: 1000000 + 20000 });
    const resetState = timerReducer(tickState, { type: 'RESET' });

    expect(resetState.stats.history).toHaveLength(0);
    expect(resetState.stats.dailyFocusMinutes).toBe(0);
  });

  it('DELETE_HISTORY resets productivity data while preserving user settings and goals', () => {
    const state = createInitialState();
    state.stats.totalFocusMinutes = 500;
    state.stats.dailyCompletedSessions = 8;
    state.stats.dailyTargetMinutes = 90;
    state.settings.focusDurationMin = 45;

    const cleared = timerReducer(state, { type: 'DELETE_HISTORY' });
    expect(cleared.stats.totalFocusMinutes).toBe(0);
    expect(cleared.stats.dailyCompletedSessions).toBe(0);
    expect(cleared.stats.history).toHaveLength(0);
    // Goal and timer settings remain intact
    expect(cleared.stats.dailyTargetMinutes).toBe(90);
    expect(cleared.settings.focusDurationMin).toBe(45);
  });

  it('UPDATE_GOALS clamps target parameters within valid boundaries', () => {
    const state = createInitialState();
    const updated = timerReducer(state, {
      type: 'UPDATE_GOALS',
      dailyTargetMinutes: 120,
      dailyTargetSessions: 5,
    });
    expect(updated.stats.dailyTargetMinutes).toBe(120);
    expect(updated.stats.dailyTargetSessions).toBe(5);
  });
});

describe('Productivity Intelligence — Storage Schema V3 Migration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('migrates legacy Schema V2 data to Schema V3 without data loss', () => {
    const legacyV2Store = {
      version: 2,
      lastSavedTimestamp: Date.now(),
      settings: { ...DEFAULT_SETTINGS, focusDurationMin: 35 },
      stats: {
        dailyCompletedSessions: 3,
        dailyFocusMinutes: 75,
        totalFocusMinutes: 300,
        currentStreakDays: 2,
        lastActiveDate: '2026-04-14',
        history: [
          {
            id: 'legacy-1',
            timestamp: 1776000000000,
            mode: 'FOCUS',
            durationMinutes: 25,
            completed: true,
          },
        ],
      },
      session: null,
    };

    const migrated = migrateStore(legacyV2Store as unknown as Partial<PersistedStore>);
    expect(migrated.version).toBe(3);
    // Settings preserved
    expect(migrated.settings.focusDurationMin).toBe(35);
    // Stats preserved
    expect(migrated.stats.totalFocusMinutes).toBe(300);
    expect(migrated.stats.currentStreakDays).toBe(2);
    // Backfilled Schema V3 fields
    expect(migrated.stats.dailyTargetMinutes).toBe(60);
    expect(migrated.stats.dailyTargetSessions).toBe(4);
    // Normalized history
    expect(migrated.stats.history[0].completionType).toBe('COMPLETED');
    expect(migrated.stats.history[0].actualFocusedDurationSeconds).toBe(25 * 60);
  });

  it('deleteProductivityHistory resets storage statistics while preserving user settings', () => {
    const initial = {
      version: 3,
      lastSavedTimestamp: Date.now(),
      settings: { ...DEFAULT_SETTINGS, theme: 'LIGHT_PAPER' as const },
      stats: {
        ...DEFAULT_STATS,
        totalFocusMinutes: 600,
        dailyCompletedSessions: 5,
      },
      session: null,
    };
    localStorage.setItem('chronos_focus_v1', JSON.stringify(initial));

    const freshStats = deleteProductivityHistory();
    expect(freshStats.totalFocusMinutes).toBe(0);
    expect(freshStats.dailyCompletedSessions).toBe(0);

    const loaded = loadStore();
    expect(loaded.settings.theme).toBe('LIGHT_PAPER');
    expect(loaded.stats.totalFocusMinutes).toBe(0);
  });
});
