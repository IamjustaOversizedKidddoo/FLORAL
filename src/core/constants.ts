// ============================================================
// CONSTANTS — Authoritative application constants & bounds
// ============================================================

import type { TimerSettings, ProductivityStats } from './types';

// --- Storage ---
export const STORAGE_KEY = 'chronos_focus_v1' as const;
export const STORAGE_VERSION = 3 as const; // Incremented for Phase 6 productivity intelligence
export const MAX_HISTORY_RECORDS = 500 as const;

// --- Timer Tick Rate ---
export const TICK_INTERVAL_MS = 100 as const;

// --- Idle Detection ---
export const IDLE_TIMEOUT_MS = 3500 as const;
export const IDLE_FADE_DURATION_MS = 800 as const;

// --- Transition Delay ---
export const COMPLETION_PAUSE_MS = 1500 as const;

// --- Validation Bounds ---
export const SETTING_BOUNDS = {
  FOCUS_MIN_MIN: 1,
  FOCUS_MIN_MAX: 120,
  SHORT_BREAK_MIN_MIN: 1,
  SHORT_BREAK_MIN_MAX: 60,
  LONG_BREAK_MIN_MIN: 1,
  LONG_BREAK_MIN_MAX: 120,
  SESSIONS_BEFORE_LONG_MIN: 1,
  SESSIONS_BEFORE_LONG_MAX: 12,
  VOLUME_MIN: 0.0,
  VOLUME_MAX: 1.0,
} as const;

// --- Default Settings ---
export const DEFAULT_SETTINGS: TimerSettings = {
  // 1. Durations
  focusDurationMin: 25,
  shortBreakDurationMin: 5,
  longBreakDurationMin: 15,
  sessionsBeforeLongBreak: 4,

  // 2. Automation
  autoStartBreaks: false,
  autoStartFocus: false,
  autoStartCycle: false,

  // 3. Sound
  soundEnabled: true,
  soundTheme: 'ZEN_BOWL',
  breakSoundTheme: 'SOFT_BELL',
  longBreakSoundTheme: 'ZEN_BOWL',
  soundVolume: 0.65,
  tickSoundEnabled: false,

  // 4. Notifications
  notificationsEnabled: false,
  focusNotificationEnabled: true,
  breakNotificationEnabled: true,

  // 5. Appearance
  theme: 'DARK_DEEP',
  backgroundStyle: 'OBSIDIAN_PURE',

  // 6. Display Options
  showRemainingInTitle: true,
  showSessionDots: true,
  showModeTabs: true,
  timerFormat: 'AUTO',

  // 7. Behavior
  confirmReset: false,
  confirmSkip: false,
  spaceToStartPause: true,
  keyboardShortcutsEnabled: true,
  keepScreenAwake: true,
};

// --- Default Stats ---
export const DEFAULT_STATS: ProductivityStats = {
  dailyCompletedSessions: 0,
  dailyFocusMinutes: 0,
  totalFocusMinutes: 0,
  totalCompletedSessions: 0,
  currentStreakDays: 0,
  longestStreakDays: 0,
  lastActiveDate: '',
  history: [],
  dailyTargetMinutes: 60,
  dailyTargetSessions: 4,
};

// --- Mode Display Labels ---
export const MODE_LABELS: Record<string, string> = {
  FOCUS: 'FOCUS',
  SHORT_BREAK: 'SHORT BREAK',
  LONG_BREAK: 'LONG BREAK',
} as const;

// --- Keyboard Shortcuts ---
export const SHORTCUTS = {
  START_PAUSE: 'Space',
  RESET: 'r',
  SKIP: 's',
  FULLSCREEN: 'f',
  SETTINGS: ',',
  HELP: '?',
  MUTE: 'm',
} as const;
