// ============================================================
// PRODUCTION AUDIT & STRESS TEST SUITE — Phase 7 Hardening
//
// Tests:
// 1. Rapid state machine transition stress tests
// 2. Zero-second edge case and completion idempotency
// 3. System clock jump tolerance (forward & backward)
// 4. Background sleep / wake reconciliation
// 5. Corrupted localStorage handling & in-memory fallback
// 6. QuotaExceededError recovery
// 7. Malformed analytics history resilience
// 8. Invalid input & extreme settings clamping
// 9. In-flight duration update safety
// ============================================================

import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import {
  timerReducer,
  createInitialState,
} from '../stateMachine';
import {
  computeRemainingMs,
  computeElapsedMs,
  computeProgress,
} from '../monotonicTimer';
import {
  validateSettings,
  sanitizeInt,
  sanitizeFloat,
} from '../settingsValidation';
import {
  loadPersistedStore,
  saveStore,
  getInMemoryStore,
  createDefaultStore,
  sanitizeSessionRecord,
} from '../../services/storageService';
import {
  computeDailyStats,
  computeStreaks,
  computeWeeklyStats,
  computeMonthlyStats,
  computeInsights,
  getLocalDateISO,
} from '../productivityAnalytics';
import { STORAGE_KEY } from '../constants';


// In-memory mock for localStorage in Node test environment
const storageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
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

describe('Phase 7: Production-Readiness Audit & Hardening', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // ============================================================
  // 1. TIMER STRESS TEST (Rapid Controls & Sequences)
  // ============================================================
  describe('1. Timer Stress Test (Rapid Control Sequences)', () => {
    it('START -> PAUSE -> START -> PAUSE does not corrupt timer or remaining time', () => {
      let state = createInitialState({ focusDurationMin: 25 });
      const now = 1700000000000;

      // 1. Start
      state = timerReducer(state, { type: 'START', timestamp: now });
      expect(state.status).toBe('RUNNING');
      expect(state.remainingMs).toBe(25 * 60 * 1000);

      // Tick 5 seconds
      state = timerReducer(state, { type: 'TICK', timestamp: now + 5000 });
      expect(state.remainingMs).toBe(25 * 60 * 1000 - 5000);

      // 2. Pause
      state = timerReducer(state, { type: 'PAUSE', timestamp: now + 5000 });
      expect(state.status).toBe('PAUSED');
      const pausedRemaining = state.remainingMs;

      // 3. Start (Resume)
      state = timerReducer(state, { type: 'START', timestamp: now + 10000 });
      expect(state.status).toBe('RUNNING');
      expect(state.remainingMs).toBe(pausedRemaining);

      // Tick 3 seconds
      state = timerReducer(state, { type: 'TICK', timestamp: now + 13000 });
      expect(state.remainingMs).toBe(pausedRemaining - 3000);

      // 4. Pause again
      state = timerReducer(state, { type: 'PAUSE', timestamp: now + 13000 });
      expect(state.status).toBe('PAUSED');
      expect(state.remainingMs).toBe(pausedRemaining - 3000);
      expect(state.elapsedMs).toBe(8000);
    });

    it('START -> RESET cleanly terminates and resets to initial mode duration', () => {
      let state = createInitialState({ focusDurationMin: 25 });
      const now = 1700000000000;

      state = timerReducer(state, { type: 'START', timestamp: now });
      state = timerReducer(state, { type: 'TICK', timestamp: now + 2000 });
      state = timerReducer(state, { type: 'RESET', timestamp: now + 2000 });

      expect(state.status).toBe('IDLE');
      expect(state.remainingMs).toBe(25 * 60 * 1000);
      expect(state.elapsedMs).toBe(0);
      expect(state.progress).toBe(0);
      expect(state.targetEndTimestamp).toBeNull();
    });

    it('START -> SKIP advances to break and resets timer cleanly', () => {
      let state = createInitialState({ focusDurationMin: 25, shortBreakDurationMin: 5 });
      const now = 1700000000000;

      state = timerReducer(state, { type: 'START', timestamp: now });
      state = timerReducer(state, { type: 'TICK', timestamp: now + 3000 });
      state = timerReducer(state, { type: 'SKIP', timestamp: now + 3000 });

      expect(state.status).toBe('IDLE');
      expect(state.mode).toBe('SHORT_BREAK');
      expect(state.remainingMs).toBe(5 * 60 * 1000);
      expect(state.elapsedMs).toBe(0);
      expect(state.progress).toBe(0);
    });

    it('START -> SKIP -> RESET maintains consistent state without crashing', () => {
      let state = createInitialState({ focusDurationMin: 25, shortBreakDurationMin: 5 });
      const now = 1700000000000;

      state = timerReducer(state, { type: 'START', timestamp: now });
      state = timerReducer(state, { type: 'SKIP', timestamp: now + 1000 });
      state = timerReducer(state, { type: 'RESET', timestamp: now + 1000 });

      expect(state.status).toBe('IDLE');
      expect(state.mode).toBe('SHORT_BREAK');
      expect(state.remainingMs).toBe(5 * 60 * 1000);
      expect(state.elapsedMs).toBe(0);
    });

    it('Rapid duplicate clicks are idempotent (no acceleration, no duplicate timers)', () => {
      let state = createInitialState({ focusDurationMin: 25 });
      const now = 1700000000000;

      state = timerReducer(state, { type: 'START', timestamp: now });
      const targetEnd = state.targetEndTimestamp;

      // 5 rapid START clicks while already RUNNING
      for (let i = 0; i < 5; i++) {
        state = timerReducer(state, { type: 'START', timestamp: now + i * 50 });
      }

      // targetEndTimestamp must not have shifted
      expect(state.status).toBe('RUNNING');
      expect(state.targetEndTimestamp).toBe(targetEnd);

      // Multiple PAUSE clicks while PAUSED
      state = timerReducer(state, { type: 'PAUSE', timestamp: now + 1000 });
      const pausedRemaining = state.remainingMs;

      for (let i = 0; i < 5; i++) {
        state = timerReducer(state, { type: 'PAUSE', timestamp: now + 1000 + i * 50 });
      }
      expect(state.status).toBe('PAUSED');
      expect(state.remainingMs).toBe(pausedRemaining);
    });
  });

  // ============================================================
  // 2. ZERO-SECOND EDGE CASE & COMPLETION
  // ============================================================
  describe('2. Zero-Second Edge Case & Idempotent Completion', () => {
    it('exact zero remaining triggers completion exactly once with accurate metrics', () => {
      let state = createInitialState({ focusDurationMin: 25 });
      const now = 1700000000000;
      const durationMs = 25 * 60 * 1000;

      state = timerReducer(state, { type: 'START', timestamp: now });
      // Tick exactly at completion timestamp
      state = timerReducer(state, { type: 'TICK', timestamp: now + durationMs });

      expect(state.status).toBe('COMPLETED');
      expect(state.remainingMs).toBe(0);
      expect(state.elapsedMs).toBe(durationMs);
      expect(state.progress).toBe(1.0);
      expect(state.completedFocusSessions).toBe(1);
      expect(state.completedInCycle).toBe(1);
      expect(state.stats.history).toHaveLength(1);
      expect(state.stats.history[0].completionType).toBe('COMPLETED');

      // Subsequent ticks while COMPLETED must be no-ops and not duplicate stats
      state = timerReducer(state, { type: 'TICK', timestamp: now + durationMs + 1000 });
      expect(state.completedFocusSessions).toBe(1);
      expect(state.stats.history).toHaveLength(1);
    });
  });

  // ============================================================
  // 3. BACKGROUND SLEEP & SYSTEM CLOCK JUMP TOLERANCE
  // ============================================================
  describe('3. Clock Jump & Background Sleep Resilience', () => {
    it('clock forward jump (sleep wake) completes cleanly without negative time', () => {
      const remaining = computeRemainingMs(100000, 150000, 60000);
      expect(remaining).toBe(0);

      const elapsed = computeElapsedMs(60000, remaining);
      expect(elapsed).toBe(60000);

      const progress = computeProgress(remaining, 60000);
      expect(progress).toBe(1.0);
    });

    it('clock backward jump (NTP or user changes time back) clamps safely to total duration', () => {
      // Suppose target was now + 60,000, but clock jumped backward by 2 hours
      const targetEnd = 1000000;
      const backwardNow = 500000; // 500 seconds in the past!
      const totalDuration = 60000;

      const remaining = computeRemainingMs(targetEnd, backwardNow, totalDuration);
      // Must be clamped to totalDuration, never exceed it
      expect(remaining).toBe(totalDuration);

      const elapsed = computeElapsedMs(totalDuration, remaining);
      expect(elapsed).toBe(0);

      const progress = computeProgress(remaining, totalDuration);
      expect(progress).toBe(0);
    });
  });

  // ============================================================
  // 4. STORAGE CORRUPTION & IN-MEMORY FALLBACK
  // ============================================================
  describe('4. Storage Resilience & Corruption Recovery', () => {
    it('recovers from completely unparseable or corrupted JSON without throwing', () => {
      localStorage.setItem(STORAGE_KEY, '}{--CORRUPT_DATA--[');
      const store = loadPersistedStore();

      expect(store).toBeDefined();
      expect(store.settings).toBeDefined();
      expect(store.settings.focusDurationMin).toBe(25);
      expect(store.stats.history).toEqual([]);
    });

    it('recovers from missing fields or wrong types in store', () => {
      const corrupted = {
        version: 2,
        settings: { focusDurationMin: 'INVALID_NUMBER', soundVolume: 'LOUD' },
        stats: { history: 'NOT_AN_ARRAY', currentStreakDays: -99 },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(corrupted));
      const store = loadPersistedStore();

      expect(store.settings.focusDurationMin).toBe(25); // default fallback
      expect(store.settings.soundVolume).toBe(0.65); // default fallback
      expect(Array.isArray(store.stats.history)).toBe(true);
      expect(store.stats.currentStreakDays).toBe(0);
    });

    it('recovers from corrupted SessionRecord items in history', () => {
      const corruptedItem = {
        id: null,
        startedAt: 'NOT_A_DATE',
        completedAt: -100,
        actualFocusedDurationSeconds: 'NaN',
        plannedDurationMinutes: -5,
      };
      const sanitized = sanitizeSessionRecord(corruptedItem, 0);

      expect(sanitized).not.toBeNull();
      expect(sanitized!.plannedDurationMinutes).toBe(25);
      expect(sanitized!.actualFocusedDurationSeconds).toBe(25 * 60);
      expect(typeof sanitized!.id).toBe('string');
      expect(sanitized!.startedAt).toBeGreaterThan(0);
    });

    it('handles localStorage QuotaExceededError by pruning and updating in-memory store', () => {
      const store = createDefaultStore();
      // Populate 100 history items
      store.stats.history = Array.from({ length: 100 }, (_, i) => ({
        id: `rec_${i}`,
        startedAt: Date.now() - i * 1000,
        completedAt: Date.now() - i * 500,
        mode: 'FOCUS',
        plannedDurationMinutes: 25,
        actualFocusedDurationSeconds: 1500,
        cycle: 1,
        completionType: 'COMPLETED',
      }));

      // Simulate quota error on localStorage.setItem
      const originalSetItem = localStorage.setItem;
      let callCount = 0;
      localStorage.setItem = (key: string, val: string) => {
        callCount++;
        if (callCount === 1) {
          const quotaErr = new Error('QuotaExceededError');
          quotaErr.name = 'QuotaExceededError';
          throw quotaErr;
        }
        return originalSetItem.call(localStorage, key, val);
      };

      saveStore(store);

      // Verified: fallback pruned and in-memory store is healthy
      const memStore = getInMemoryStore();
      expect(memStore).not.toBeNull();
      expect(memStore!.stats.history.length).toBeLessThanOrEqual(50);

      localStorage.setItem = originalSetItem;
    });
  });

  // ============================================================
  // 5. ANALYTICS CORRUPTION RESILIENCE
  // ============================================================
  describe('5. Productivity Analytics Corruption Immunity', () => {
    it('computeDailyStats gracefully ignores corrupted or null history items', () => {
      const dirtyHistory: any = [
        null,
        undefined,
        { id: 'broken1', startedAt: NaN },
        { id: 'broken2', mode: 'FOCUS', actualFocusedDurationSeconds: 'bad' },
        {
          id: 'good1',
          mode: 'FOCUS',
          startedAt: Date.now(),
          completedAt: Date.now(),
          actualFocusedDurationSeconds: 1500,
          completionType: 'COMPLETED',
        },
      ];

      const daily = computeDailyStats(dirtyHistory, getLocalDateISO());
      expect(daily).toBeDefined();
      expect(daily.completedSessions).toBe(1);
      expect(daily.focusMinutes).toBe(25);
      expect(isNaN(daily.completionRate)).toBe(false);
      expect(daily.completionRate).toBe(100);
    });

    it('computeStreaks handles invalid dates without returning NaN', () => {
      const dirtyHistory: any = [
        { mode: 'FOCUS', completed: true, timestamp: 'INVALID_TIMESTAMP' },
        { mode: 'FOCUS', completionType: 'COMPLETED', timestamp: Date.now() },
      ];

      const streaks = computeStreaks(dirtyHistory);
      expect(isNaN(streaks.currentStreakDays)).toBe(false);
      expect(isNaN(streaks.longestStreakDays)).toBe(false);
      expect(streaks.currentStreakDays).toBeGreaterThanOrEqual(0);
    });

    it('computeWeeklyStats and computeMonthlyStats do not crash on empty or corrupt history', () => {
      const weekly = computeWeeklyStats(null as any);
      expect(weekly.days).toHaveLength(7);
      expect(weekly.weeklyTotalMinutes).toBe(0);

      const monthly = computeMonthlyStats(undefined as any);
      expect(monthly.days.length).toBeGreaterThanOrEqual(28);
      expect(monthly.monthlyTotalMinutes).toBe(0);
    });

    it('computeInsights handles empty stats and corrupt targets without throwing', () => {
      const insights = computeInsights([], {
        dailyTargetMinutes: NaN as any,
        dailyFocusMinutes: -10,
        longestStreakDays: NaN as any,
      } as any);

      expect(Array.isArray(insights)).toBe(true);
      expect(insights).toEqual([]);
    });
  });

  // ============================================================
  // 6. INVALID INPUT & BOUNDARY ENFORCEMENT
  // ============================================================
  describe('6. Invalid Input Sanitization', () => {
    it('sanitizes negative, NaN, Infinity, and decimal values for integer settings', () => {
      expect(sanitizeInt(-10, 1, 120, 25)).toBe(1);
      expect(sanitizeInt(0, 1, 120, 25)).toBe(1);
      expect(sanitizeInt(999999, 1, 120, 25)).toBe(120);
      expect(sanitizeInt(NaN, 1, 120, 25)).toBe(25);
      expect(sanitizeInt(Infinity, 1, 120, 25)).toBe(25);
      expect(sanitizeInt(25.9, 1, 120, 25)).toBe(25);
      expect(sanitizeInt('50', 1, 120, 25)).toBe(50);
      expect(sanitizeInt('not-a-number', 1, 120, 25)).toBe(25);
    });

    it('sanitizes volume float bounds', () => {
      expect(sanitizeFloat(-0.5, 0.0, 1.0, 0.65)).toBe(0.0);
      expect(sanitizeFloat(1.5, 0.0, 1.0, 0.65)).toBe(1.0);
      expect(sanitizeFloat(NaN, 0.0, 1.0, 0.65)).toBe(0.65);
      expect(sanitizeFloat(0.8, 0.0, 1.0, 0.65)).toBe(0.8);
    });

    it('validates settings with comprehensive malicious or invalid payloads', () => {
      const maliciousPayload: any = {
        focusDurationMin: -999,
        shortBreakDurationMin: Infinity,
        longBreakDurationMin: 'hack',
        sessionsBeforeLongBreak: 0,
        soundVolume: 99.9,
        theme: '<script>alert(1)</script>',
        timerFormat: 'UNSUPPORTED_FORMAT',
        soundTheme: 'EVIL_THEME',
      };

      const validated = validateSettings(maliciousPayload);

      expect(validated.focusDurationMin).toBe(1); // clamped to min
      expect(validated.shortBreakDurationMin).toBe(5); // fallback from infinity
      expect(validated.longBreakDurationMin).toBe(15); // fallback from hack
      expect(validated.sessionsBeforeLongBreak).toBe(1); // clamped to min
      expect(validated.soundVolume).toBe(1.0); // clamped to max
      expect(validated.theme).toBe('DARK_DEEP'); // sanitized enum fallback
      expect(validated.timerFormat).toBe('AUTO'); // sanitized enum fallback
      expect(validated.soundTheme).toBe('ZEN_BOWL'); // sanitized enum fallback
    });
  });

  // ============================================================
  // 7. IN-FLIGHT SETTING CHANGES WHILE RUNNING
  // ============================================================
  describe('7. In-Flight Setting Updates Safety', () => {
    it('changing duration settings while RUNNING does not mutate active countdown', () => {
      let state = createInitialState({ focusDurationMin: 25 });
      const now = 1700000000000;

      state = timerReducer(state, { type: 'START', timestamp: now });
      state = timerReducer(state, { type: 'TICK', timestamp: now + 5000 });
      expect(state.remainingMs).toBe(25 * 60 * 1000 - 5000);

      // User changes setting in background to 50 min while timer is running
      state = timerReducer(state, {
        type: 'UPDATE_SETTINGS',
        settings: { focusDurationMin: 50 },
      });

      // Active remaining time must NOT jump to 50m! It must remain on the current run
      expect(state.status).toBe('RUNNING');
      expect(state.remainingMs).toBe(25 * 60 * 1000 - 5000);
      expect(state.settings.focusDurationMin).toBe(50);
    });

    it('changing duration settings while IDLE immediately updates ready timer', () => {
      let state = createInitialState({ focusDurationMin: 25 });
      expect(state.status).toBe('IDLE');
      expect(state.remainingMs).toBe(25 * 60 * 1000);

      state = timerReducer(state, {
        type: 'UPDATE_SETTINGS',
        settings: { focusDurationMin: 45 },
      });

      expect(state.remainingMs).toBe(45 * 60 * 1000);
      expect(state.totalDurationMs).toBe(45 * 60 * 1000);
    });
  });
});
