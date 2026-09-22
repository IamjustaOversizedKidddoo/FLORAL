// ============================================================
// DOMAIN TYPES — Single source of truth for all core entities
// ============================================================

// --- Timer Modes ---
export type TimerMode = 'FOCUS' | 'SHORT_BREAK' | 'LONG_BREAK';

// --- Timer Status (State Machine States) ---
export type TimerStatus = 'IDLE' | 'RUNNING' | 'PAUSED' | 'COMPLETED' | 'TRANSITIONING';

// --- Audio ---
export type SoundTheme = 'ZEN_BOWL' | 'SOFT_BELL' | 'MECHANICAL' | 'MUTED';

// --- Visual ---
export type ColorTheme = 'DARK_DEEP' | 'LIGHT_PAPER' | 'SYSTEM';
export type BackgroundStyle = 'OBSIDIAN_PURE' | 'SUBTLE_ATMOSPHERE' | 'SUBTLE_GRAIN';
export type TimerFormatPreference = 'AUTO' | 'MM_SS' | 'HH_MM_SS';

// ============================================================
// SETTINGS — All user-configurable preferences
// ============================================================
export interface TimerSettings {
  // 1. Timer Durations
  focusDurationMin: number;
  shortBreakDurationMin: number;
  longBreakDurationMin: number;
  sessionsBeforeLongBreak: number;

  // 2. Automation
  autoStartBreaks: boolean;
  autoStartFocus: boolean;
  autoStartCycle: boolean;

  // 3. Sound
  soundEnabled: boolean;
  soundTheme: SoundTheme;
  breakSoundTheme: SoundTheme;
  longBreakSoundTheme: SoundTheme;
  soundVolume: number; // 0.0 to 1.0
  tickSoundEnabled: boolean;

  // 4. Notifications
  notificationsEnabled: boolean;
  focusNotificationEnabled: boolean;
  breakNotificationEnabled: boolean;

  // 5. Appearance
  theme: ColorTheme;
  backgroundStyle: BackgroundStyle;

  // 6. Display Options
  showRemainingInTitle: boolean;
  showSessionDots: boolean;
  showModeTabs: boolean;
  timerFormat: TimerFormatPreference;

  // 7. Behavior
  confirmReset: boolean;
  confirmSkip: boolean;
  spaceToStartPause: boolean;
  keyboardShortcutsEnabled: boolean;
  keepScreenAwake: boolean;
}

// ============================================================
// SESSION RECORD — Immutable productivity log entry
// ============================================================
export type SessionCompletionType = 'COMPLETED' | 'INTERRUPTED' | 'SKIPPED' | 'RESET';

export interface SessionRecord {
  id: string;
  startedAt: number;                   // Epoch ms when session began
  completedAt: number;                 // Epoch ms when session concluded/reset
  mode: TimerMode;
  plannedDurationMinutes: number;      // Planned target duration in minutes
  actualFocusedDurationSeconds: number;// Actual focused time in seconds
  cycle: number;                       // Cycle index when session occurred
  completionType: SessionCompletionType;
  // Legacy backward compatibility fields
  timestamp?: number;
  durationMinutes?: number;
  completed?: boolean;
}

// ============================================================
// PRODUCTIVITY STATS — Aggregated analytics
// ============================================================
export interface ProductivityStats {
  dailyCompletedSessions: number;
  dailyFocusMinutes: number;
  totalFocusMinutes: number;
  totalCompletedSessions: number;
  currentStreakDays: number;
  longestStreakDays: number;
  lastActiveDate: string; // ISO: YYYY-MM-DD
  history: SessionRecord[];
  dailyTargetMinutes: number;
  dailyTargetSessions: number;
}

// ============================================================
// TIMER STATE — Complete runtime state of the timer engine
// ============================================================
export interface TimerState {
  status: TimerStatus;
  mode: TimerMode;
  remainingMs: number;
  totalDurationMs: number;
  elapsedMs: number;
  progress: number; // 0.0 (just started) to 1.0 (completed)
  startedAt: number | null; // Wall-clock timestamp when current run started
  pausedAt: number | null; // Wall-clock timestamp when paused
  elapsedBeforeCurrentRunMs: number; // Accumulated elapsed ms before current run
  targetEndTimestamp: number | null; // Wall-clock timestamp when timer reaches 0
  completedFocusSessions: number; // Lifetime completed focus count
  currentCycle: number; // 1-based cycle counter
  completedInCycle: number; // 0 to sessionsBeforeLongBreak - 1
  settings: TimerSettings;
  stats: ProductivityStats;
}

// ============================================================
// ACTIONS — All possible state machine events
// ============================================================
export type TimerAction =
  | { type: 'START'; timestamp?: number }
  | { type: 'PAUSE'; timestamp?: number }
  | { type: 'RESUME'; timestamp?: number }
  | { type: 'RESET'; timestamp?: number }
  | { type: 'SKIP'; timestamp?: number }
  | { type: 'TICK'; timestamp: number }
  | { type: 'CHANGE_MODE'; mode: TimerMode }
  | { type: 'ADVANCE'; timestamp?: number } // Called after COMPLETED to move to next mode
  | { type: 'UPDATE_SETTINGS'; settings: Partial<TimerSettings> }
  | { type: 'DELETE_HISTORY' }
  | { type: 'UPDATE_GOALS'; dailyTargetMinutes: number; dailyTargetSessions: number }
  | { type: 'LOAD_PERSISTED'; state: Partial<PersistedSessionState> };

// ============================================================
// PERSISTENCE — Shape of what we store in LocalStorage
// ============================================================
export interface PersistedSessionState {
  status: TimerStatus;
  mode: TimerMode;
  remainingMs: number;
  totalDurationMs: number;
  elapsedBeforeCurrentRunMs: number;
  startedAt: number | null;
  pausedAt: number | null;
  targetEndTimestamp: number | null;
  completedFocusSessions: number;
  currentCycle: number;
  completedInCycle: number;
}

export interface PersistedStore {
  version: number;
  lastSavedTimestamp: number;
  settings: TimerSettings;
  stats: ProductivityStats;
  session: PersistedSessionState | null;
}
