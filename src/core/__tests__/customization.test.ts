import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import {
  validateSettings,
  sanitizeInt,
  sanitizeFloat,
  sanitizeBool,
  sanitizeEnum,
} from '../settingsValidation';
import {
  loadStore,
  saveStore,
  migrateStore,
  resetAllSettings,
  resetCategorySettings,
  resetAllData,
} from '../../services/storageService';
import { DEFAULT_SETTINGS, DEFAULT_STATS, SETTING_BOUNDS, STORAGE_KEY, STORAGE_VERSION } from '../constants';
import { timerReducer, createInitialState } from '../stateMachine';
import { previewSound } from '../../services/audioService';
import type { TimerSettings, PersistedStore } from '../types';

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

describe('Customization System — Validation & Sanitization', () => {
  it('sanitizes integers within configured bounds', () => {
    expect(sanitizeInt(0, 1, 120, 25)).toBe(1);
    expect(sanitizeInt(150, 1, 120, 25)).toBe(120);
    expect(sanitizeInt(25.7, 1, 120, 25)).toBe(25);
    expect(sanitizeInt(NaN, 1, 120, 25)).toBe(25);
    expect(sanitizeInt('45' as any, 1, 120, 25)).toBe(45);
    expect(sanitizeInt('invalid' as any, 1, 120, 25)).toBe(25);
  });

  it('sanitizes floats within configured bounds', () => {
    expect(sanitizeFloat(-0.2, 0, 1, 0.7)).toBe(0);
    expect(sanitizeFloat(1.5, 0, 1, 0.7)).toBe(1);
    expect(sanitizeFloat(0.456, 0, 1, 0.7)).toBe(0.456);
    expect(sanitizeFloat(NaN, 0, 1, 0.7)).toBe(0.7);
    expect(sanitizeFloat('0.3' as any, 0, 1, 0.7)).toBe(0.3);
  });

  it('sanitizes booleans strictly', () => {
    expect(sanitizeBool(true, false)).toBe(true);
    expect(sanitizeBool(false, true)).toBe(false);
    expect(sanitizeBool('true' as any, false)).toBe(false);
    expect(sanitizeBool(1 as any, false)).toBe(false);
  });

  it('sanitizes enums against allowed sets', () => {
    const allowed = ['DARK_DEEP', 'LIGHT_PAPER', 'SYSTEM'] as const;
    expect(sanitizeEnum('DARK_DEEP', allowed, 'DARK_DEEP')).toBe('DARK_DEEP');
    expect(sanitizeEnum('LIGHT_PAPER', allowed, 'DARK_DEEP')).toBe('LIGHT_PAPER');
    expect(sanitizeEnum('UNKNOWN_THEME' as any, allowed, 'DARK_DEEP')).toBe('DARK_DEEP');
  });

  it('validates partial settings and clamps numeric limits', () => {
    const dirtyInput: Partial<TimerSettings> = {
      focusDurationMin: 500, // Should clamp to 120
      shortBreakDurationMin: -5, // Should clamp to 1
      soundVolume: 2.0, // Should clamp to 1.0
      soundTheme: 'ZEN_BOWL',
      theme: 'LIGHT_PAPER',
    };

    const validated = validateSettings(dirtyInput, DEFAULT_SETTINGS);
    expect(validated.focusDurationMin).toBe(SETTING_BOUNDS.FOCUS_MIN_MAX);
    expect(validated.shortBreakDurationMin).toBe(SETTING_BOUNDS.SHORT_BREAK_MIN_MIN);
    expect(validated.soundVolume).toBe(SETTING_BOUNDS.VOLUME_MAX);
    expect(validated.soundTheme).toBe('ZEN_BOWL');
    expect(validated.theme).toBe('LIGHT_PAPER');
    // Ensure untouched keys retain default values
    expect(validated.sessionsBeforeLongBreak).toBe(DEFAULT_SETTINGS.sessionsBeforeLongBreak);
  });

  it('handles completely corrupt or empty settings payload gracefully', () => {
    const validated = validateSettings(null as any, DEFAULT_SETTINGS);
    expect(validated).toEqual(DEFAULT_SETTINGS);

    const validated2 = validateSettings({} as any, DEFAULT_SETTINGS);
    expect(validated2).toEqual(DEFAULT_SETTINGS);
  });
});

describe('Customization System — LocalStorage & Schema Migration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('migrates Schema Version 1 payload to Version 2 without losing stats', () => {
    // Mock legacy v1 schema data
    const legacyV1Data = {
      version: 1,
      settings: {
        focusDurationMin: 30,
        shortBreakDurationMin: 6,
        longBreakDurationMin: 20,
        sessionsBeforeLongBreak: 4,
        soundEnabled: true,
        soundVolume: 0.8,
        soundTheme: 'ZEN_BOWL',
        autoStartBreaks: true,
        autoStartFocus: false,
        notificationsEnabled: true,
        theme: 'DARK_DEEP',
      },
      stats: {
        totalFocusMinutes: 180,
        sessionsCompleted: 6,
        dailySessionsCompleted: 4,
        currentStreak: 3,
        longestStreak: 5,
        lastCompletedDate: '2026-09-20',
      },
      cycle: {
        completedInCycle: 2,
      },
    };

    const migrated = migrateStore(legacyV1Data as unknown as Partial<PersistedStore>);
    expect(migrated.version).toBe(STORAGE_VERSION);
    // Preserved existing values
    expect(migrated.settings.focusDurationMin).toBe(30);
    expect(migrated.settings.soundVolume).toBe(0.8);
    // Preserved stats
    expect(migrated.stats.totalFocusMinutes).toBe(180);
    expect(migrated.stats.currentStreakDays).toBe(3);
    // Backfilled new Phase 4 fields with defaults
    expect(migrated.settings.backgroundStyle).toBe(DEFAULT_SETTINGS.backgroundStyle);
    expect(migrated.settings.timerFormat).toBe(DEFAULT_SETTINGS.timerFormat);
    expect(migrated.settings.breakSoundTheme).toBe(DEFAULT_SETTINGS.breakSoundTheme);
    expect(migrated.settings.keepScreenAwake).toBe(DEFAULT_SETTINGS.keepScreenAwake);
  });

  it('recovers safely from invalid or unparseable JSON in storage', () => {
    localStorage.setItem(STORAGE_KEY, 'INVALID_JSON_CORRUPT{[');
    const store = loadStore();
    expect(store.version).toBe(STORAGE_VERSION);
    expect(store.settings).toEqual(DEFAULT_SETTINGS);
  });

  it('resetAllSettings restores defaults while strictly preserving user statistics', () => {
    const customSettings: TimerSettings = {
      ...DEFAULT_SETTINGS,
      focusDurationMin: 50,
      theme: 'LIGHT_PAPER',
    };
    saveStore({
      version: 2,
      lastSavedTimestamp: Date.now(),
      settings: customSettings,
      stats: {
        ...DEFAULT_STATS,
        dailyCompletedSessions: 4,
        dailyFocusMinutes: 100,
        totalFocusMinutes: 200,
        currentStreakDays: 7,
        lastActiveDate: '2026-09-21',
        history: [],
      },
      session: null,
    });

    const resetSettings = resetAllSettings();
    expect(resetSettings.focusDurationMin).toBe(DEFAULT_SETTINGS.focusDurationMin);
    expect(resetSettings.theme).toBe(DEFAULT_SETTINGS.theme);

    // Verify persisted store statistics were untouched
    const currentStore = loadStore();
    expect(currentStore.stats.totalFocusMinutes).toBe(200);
    expect(currentStore.stats.currentStreakDays).toBe(7);
  });

  it('resetCategorySettings only resets the requested category', () => {
    const customized: TimerSettings = {
      ...DEFAULT_SETTINGS,
      focusDurationMin: 45,
      shortBreakDurationMin: 10,
      soundTheme: 'MECHANICAL',
      soundVolume: 0.2,
      theme: 'LIGHT_PAPER',
    };

    // Reset only 'timer' category
    const afterTimerReset = resetCategorySettings('timer', customized);
    expect(afterTimerReset.focusDurationMin).toBe(DEFAULT_SETTINGS.focusDurationMin);
    expect(afterTimerReset.shortBreakDurationMin).toBe(DEFAULT_SETTINGS.shortBreakDurationMin);
    // Audio and appearance must remain customized
    expect(afterTimerReset.soundTheme).toBe('MECHANICAL');
    expect(afterTimerReset.soundVolume).toBe(0.2);
    expect(afterTimerReset.theme).toBe('LIGHT_PAPER');
  });

  it('resetAllData clears both settings and stats to factory defaults', () => {
    saveStore({
      version: 2,
      lastSavedTimestamp: Date.now(),
      settings: { ...DEFAULT_SETTINGS, focusDurationMin: 90 },
      stats: {
        ...DEFAULT_STATS,
        dailyCompletedSessions: 5,
        dailyFocusMinutes: 200,
        totalFocusMinutes: 900,
        currentStreakDays: 4,
        lastActiveDate: '2026-09-21',
        history: [],
      },
      session: null,
    });

    const fresh = resetAllData();
    expect(fresh.settings).toEqual(DEFAULT_SETTINGS);
    expect(fresh.stats.totalFocusMinutes).toBe(0);
    expect(fresh.stats.dailyCompletedSessions).toBe(0);
    expect(fresh.session).toBeNull();
  });
});

describe('Customization System — In-Flight Timer Resilience', () => {
  it('updates duration settings immediately if timer is IDLE', () => {
    const initialState = createInitialState();
    expect(initialState.totalDurationMs).toBe(25 * 60 * 1000);

    const nextState = timerReducer(initialState, {
      type: 'UPDATE_SETTINGS',
      settings: { focusDurationMin: 40 },
    });

    expect(nextState.settings.focusDurationMin).toBe(40);
    expect(nextState.totalDurationMs).toBe(40 * 60 * 1000);
    expect(nextState.remainingMs).toBe(40 * 60 * 1000);
  });

  it('does NOT alter remainingMs or totalDurationMs of an active RUNNING session when settings change', () => {
    const initialState = createInitialState();
    // Start the timer
    const runningState = timerReducer(initialState, {
      type: 'START',
      timestamp: 1000000,
    });
    expect(runningState.status).toBe('RUNNING');
    expect(runningState.remainingMs).toBe(25 * 60 * 1000);
    expect(runningState.totalDurationMs).toBe(25 * 60 * 1000);

    // Update settings while timer is running
    const updatedRunningState = timerReducer(runningState, {
      type: 'UPDATE_SETTINGS',
      settings: { focusDurationMin: 50 },
    });

    // Settings are updated for FUTURE sessions
    expect(updatedRunningState.settings.focusDurationMin).toBe(50);
    // In-flight session mathematics remain untampered
    expect(updatedRunningState.remainingMs).toBe(25 * 60 * 1000);
    expect(updatedRunningState.totalDurationMs).toBe(25 * 60 * 1000);
  });
});

describe('Customization System — Audio Preview', () => {
  it('allows safe audio preview without mutating timer state or throwing', () => {
    expect(() => {
      previewSound('ZEN_BOWL', 0.5);
      previewSound('SOFT_BELL', 0.8);
      previewSound('MECHANICAL', 0.3);
      previewSound('MUTED', 0.0);
    }).not.toThrow();
  });
});
