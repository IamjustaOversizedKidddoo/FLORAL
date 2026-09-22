// ============================================================
// TIMER STATE MACHINE — Pure functional reducer
//
// DESIGN: This is a deterministic, pure function.
// (state, action) => nextState
//
// No side effects. No DOM. No AudioContext. No React.
// Side effects (audio, notifications, storage) are triggered
// outside the reducer via timerEvents or hook observers.
// ============================================================

import type {
  TimerState,
  TimerAction,
  TimerMode,
  TimerSettings,
  ProductivityStats,
  SessionRecord,
} from './types';
import { DEFAULT_SETTINGS, DEFAULT_STATS, MAX_HISTORY_RECORDS } from './constants';
import { validateSettings } from './settingsValidation';
import {
  computeTargetEndTimestamp,
  computeRemainingMs,
  computeElapsedMs,
  computeProgress,
  minToMs,
  getTodayISO,
} from './monotonicTimer';

// ============================================================
// INITIAL STATE FACTORY
// ============================================================
export function createInitialState(customSettings?: Partial<TimerSettings>): TimerState {
  const settings: TimerSettings = { ...DEFAULT_SETTINGS, ...(customSettings ?? {}) };
  const initialDuration = getDurationForMode('FOCUS', settings);

  return {
    status: 'IDLE',
    mode: 'FOCUS',
    remainingMs: initialDuration,
    totalDurationMs: initialDuration,
    elapsedMs: 0,
    progress: 0,
    startedAt: null,
    pausedAt: null,
    elapsedBeforeCurrentRunMs: 0,
    targetEndTimestamp: null,
    completedFocusSessions: 0,
    currentCycle: 1,
    completedInCycle: 0,
    settings,
    stats: { ...DEFAULT_STATS, lastActiveDate: getTodayISO() },
  };
}

// ============================================================
// MODE DURATION LOOKUP
// ============================================================
export function getDurationForMode(mode: TimerMode, settings: TimerSettings): number {
  switch (mode) {
    case 'FOCUS':
      return minToMs(settings.focusDurationMin);
    case 'SHORT_BREAK':
      return minToMs(settings.shortBreakDurationMin);
    case 'LONG_BREAK':
      return minToMs(settings.longBreakDurationMin);
  }
}

// ============================================================
// NEXT MODE TRANSITION LOGIC
// ============================================================
export interface NextModeResult {
  nextMode: TimerMode;
  nextCompletedInCycle: number;
  nextCycle: number;
}

/**
 * Determine the next mode upon natural completion of the current mode.
 */
export function getNextModeOnCompletion(
  currentMode: TimerMode,
  completedInCycle: number,
  currentCycle: number,
  sessionsBeforeLongBreak: number,
): NextModeResult {
  if (currentMode === 'FOCUS') {
    // completedInCycle was already incremented for this completion
    if (completedInCycle >= sessionsBeforeLongBreak) {
      return {
        nextMode: 'LONG_BREAK',
        nextCompletedInCycle: completedInCycle,
        nextCycle: currentCycle,
      };
    }
    return {
      nextMode: 'SHORT_BREAK',
      nextCompletedInCycle: completedInCycle,
      nextCycle: currentCycle,
    };
  }

  if (currentMode === 'SHORT_BREAK') {
    return {
      nextMode: 'FOCUS',
      nextCompletedInCycle: completedInCycle,
      nextCycle: currentCycle,
    };
  }

  // LONG_BREAK completes -> reset completedInCycle to 0, start new cycle
  return {
    nextMode: 'FOCUS',
    nextCompletedInCycle: 0,
    nextCycle: currentCycle + 1,
  };
}

/**
 * Determine next mode upon SKIP (does not credit focus completion).
 */
export function getNextModeOnSkip(
  currentMode: TimerMode,
  completedInCycle: number,
  currentCycle: number,
  sessionsBeforeLongBreak: number,
): NextModeResult {
  if (currentMode === 'FOCUS') {
    // User skipped focus without completing it -> goes to short break (or long break if cycle threshold reached previously)
    const wouldBeLong = completedInCycle >= sessionsBeforeLongBreak && completedInCycle > 0;
    return {
      nextMode: wouldBeLong ? 'LONG_BREAK' : 'SHORT_BREAK',
      nextCompletedInCycle: completedInCycle,
      nextCycle: currentCycle,
    };
  }

  if (currentMode === 'SHORT_BREAK') {
    return {
      nextMode: 'FOCUS',
      nextCompletedInCycle: completedInCycle,
      nextCycle: currentCycle,
    };
  }

  // Skipping LONG_BREAK resets cycle count and moves to FOCUS
  return {
    nextMode: 'FOCUS',
    nextCompletedInCycle: 0,
    nextCycle: currentCycle + 1,
  };
}

// ============================================================
// STATS RECORDING
// ============================================================
export function recordSessionCompletion(
  stats: ProductivityStats,
  mode: TimerMode,
  durationMs: number,
  now: number = Date.now(),
  cycle: number = 1,
): ProductivityStats {
  if (mode !== 'FOCUS') return stats;

  const today = getTodayISO();
  const isNewDay = stats.lastActiveDate !== today;
  const plannedDurationMinutes = Math.max(1, Math.round(durationMs / 60000));
  const actualFocusedDurationSeconds = plannedDurationMinutes * 60;

  const newRecord: SessionRecord = {
    id: `${now}-${Math.random().toString(36).slice(2, 7)}`,
    startedAt: now - actualFocusedDurationSeconds * 1000,
    completedAt: now,
    mode,
    plannedDurationMinutes,
    actualFocusedDurationSeconds,
    cycle,
    completionType: 'COMPLETED',
    timestamp: now,
    durationMinutes: plannedDurationMinutes,
    completed: true,
  };

  const history = [newRecord, ...stats.history].slice(0, MAX_HISTORY_RECORDS);
  const nextStreak = computeStreak(stats, today, isNewDay);
  const longestStreak = Math.max(stats.longestStreakDays ?? 0, nextStreak);

  return {
    ...stats,
    lastActiveDate: today,
    dailyCompletedSessions: isNewDay ? 1 : stats.dailyCompletedSessions + 1,
    dailyFocusMinutes: isNewDay ? plannedDurationMinutes : stats.dailyFocusMinutes + plannedDurationMinutes,
    totalFocusMinutes: stats.totalFocusMinutes + plannedDurationMinutes,
    totalCompletedSessions: (stats.totalCompletedSessions ?? 0) + 1,
    currentStreakDays: nextStreak,
    longestStreakDays: longestStreak,
    history,
  };
}

export function recordSessionInterruption(
  stats: ProductivityStats,
  mode: TimerMode,
  elapsedMs: number,
  plannedMs: number,
  type: 'RESET' | 'SKIPPED',
  now: number = Date.now(),
  cycle: number = 1,
): ProductivityStats {
  if (mode !== 'FOCUS' || elapsedMs < 60000) return stats;

  const today = getTodayISO();
  const isNewDay = stats.lastActiveDate !== today;
  const actualSeconds = Math.round(elapsedMs / 1000);
  const actualMinutes = Math.round(actualSeconds / 60);
  const plannedDurationMinutes = Math.max(1, Math.round(plannedMs / 60000));

  const newRecord: SessionRecord = {
    id: `${now}-${Math.random().toString(36).slice(2, 7)}`,
    startedAt: now - elapsedMs,
    completedAt: now,
    mode,
    plannedDurationMinutes,
    actualFocusedDurationSeconds: actualSeconds,
    cycle,
    completionType: type,
    timestamp: now,
    durationMinutes: actualMinutes,
    completed: false,
  };

  const history = [newRecord, ...stats.history].slice(0, MAX_HISTORY_RECORDS);

  return {
    ...stats,
    lastActiveDate: today,
    dailyFocusMinutes: isNewDay ? actualMinutes : stats.dailyFocusMinutes + actualMinutes,
    totalFocusMinutes: stats.totalFocusMinutes + actualMinutes,
    history,
  };
}

function computeStreak(stats: ProductivityStats, today: string, isNewDay: boolean): number {
  if (!isNewDay) return Math.max(1, stats.currentStreakDays);
  if (!stats.lastActiveDate) return 1;

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayISO = yesterday.toISOString().split('T')[0];

  if (stats.lastActiveDate === yesterdayISO) {
    return stats.currentStreakDays + 1;
  }
  return 1;
}

// ============================================================
// MAIN REDUCER
// ============================================================
export function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    // --------------------------------------------------------
    // START: Transitions IDLE or COMPLETED -> RUNNING
    // --------------------------------------------------------
    case 'START': {
      // If already running, no-op
      if (state.status === 'RUNNING') return state;

      const now = action.timestamp ?? Date.now();

      // If paused, START behaves like RESUME
      if (state.status === 'PAUSED') {
        const remaining = Math.max(0, state.remainingMs);
        return {
          ...state,
          status: 'RUNNING',
          startedAt: now,
          pausedAt: null,
          targetEndTimestamp: computeTargetEndTimestamp(remaining, now),
        };
      }

      // If COMPLETED, advance first or start the current duration
      const duration =
        state.status === 'COMPLETED'
          ? getDurationForMode(state.mode, state.settings)
          : state.remainingMs > 0
          ? state.remainingMs
          : state.totalDurationMs;

      return {
        ...state,
        status: 'RUNNING',
        remainingMs: duration,
        totalDurationMs: state.totalDurationMs > 0 ? state.totalDurationMs : duration,
        elapsedMs: computeElapsedMs(state.totalDurationMs, duration),
        progress: computeProgress(duration, state.totalDurationMs),
        startedAt: now,
        pausedAt: null,
        elapsedBeforeCurrentRunMs: state.elapsedMs,
        targetEndTimestamp: computeTargetEndTimestamp(duration, now),
      };
    }

    // --------------------------------------------------------
    // PAUSE: Transitions RUNNING -> PAUSED
    // --------------------------------------------------------
    case 'PAUSE': {
      if (state.status !== 'RUNNING') return state;

      const now = action.timestamp ?? Date.now();
      const frozenRemaining = state.targetEndTimestamp
        ? computeRemainingMs(state.targetEndTimestamp, now, state.totalDurationMs)
        : state.remainingMs;

      const elapsed = computeElapsedMs(state.totalDurationMs, frozenRemaining);

      return {
        ...state,
        status: 'PAUSED',
        remainingMs: frozenRemaining,
        elapsedMs: elapsed,
        progress: computeProgress(frozenRemaining, state.totalDurationMs),
        pausedAt: now,
        elapsedBeforeCurrentRunMs: elapsed,
        targetEndTimestamp: null,
      };
    }

    // --------------------------------------------------------
    // RESUME: Transitions PAUSED -> RUNNING
    // --------------------------------------------------------
    case 'RESUME': {
      if (state.status !== 'PAUSED') return state;

      const now = action.timestamp ?? Date.now();
      const remaining = Math.max(0, state.remainingMs);

      return {
        ...state,
        status: 'RUNNING',
        startedAt: now,
        pausedAt: null,
        targetEndTimestamp: computeTargetEndTimestamp(remaining, now),
      };
    }

    // --------------------------------------------------------
    // RESET: Restores current mode to its full duration (IDLE)
    // --------------------------------------------------------
    case 'RESET': {
      let nextStats = state.stats;
      if (state.mode === 'FOCUS' && state.elapsedMs >= 60000) {
        nextStats = recordSessionInterruption(
          state.stats,
          state.mode,
          state.elapsedMs,
          state.totalDurationMs,
          'RESET',
          action.timestamp ?? Date.now(),
          state.currentCycle,
        );
      }

      const duration = getDurationForMode(state.mode, state.settings);

      return {
        ...state,
        status: 'IDLE',
        remainingMs: duration,
        totalDurationMs: duration,
        elapsedMs: 0,
        progress: 0,
        startedAt: null,
        pausedAt: null,
        elapsedBeforeCurrentRunMs: 0,
        targetEndTimestamp: null,
        stats: nextStats,
      };
    }

    // --------------------------------------------------------
    // SKIP: Moves to next mode without crediting session completion
    // --------------------------------------------------------
    case 'SKIP': {
      let nextStats = state.stats;
      if (state.mode === 'FOCUS' && state.elapsedMs >= 60000) {
        nextStats = recordSessionInterruption(
          state.stats,
          state.mode,
          state.elapsedMs,
          state.totalDurationMs,
          'SKIPPED',
          action.timestamp ?? Date.now(),
          state.currentCycle,
        );
      }

      const { nextMode, nextCompletedInCycle, nextCycle } = getNextModeOnSkip(
        state.mode,
        state.completedInCycle,
        state.currentCycle,
        state.settings.sessionsBeforeLongBreak,
      );

      const duration = getDurationForMode(nextMode, state.settings);

      return {
        ...state,
        status: 'IDLE',
        mode: nextMode,
        remainingMs: duration,
        totalDurationMs: duration,
        elapsedMs: 0,
        progress: 0,
        startedAt: null,
        pausedAt: null,
        elapsedBeforeCurrentRunMs: 0,
        targetEndTimestamp: null,
        completedInCycle: nextCompletedInCycle,
        currentCycle: nextCycle,
        stats: nextStats,
      };
    }

    // --------------------------------------------------------
    // TICK: Monotonic heartbeat while RUNNING
    // --------------------------------------------------------
    case 'TICK': {
      if (state.status !== 'RUNNING' || !state.targetEndTimestamp) return state;

      const now = action.timestamp;
      const remaining = computeRemainingMs(state.targetEndTimestamp, now, state.totalDurationMs);

      // Session completed!
      if (remaining <= 0) {
        let nextStats = state.stats;
        let nextCompletedFocus = state.completedFocusSessions;
        let nextInCycle = state.completedInCycle;

        if (state.mode === 'FOCUS') {
          nextStats = recordSessionCompletion(
            state.stats,
            state.mode,
            state.totalDurationMs,
            now,
            state.currentCycle,
          );
          nextCompletedFocus += 1;
          nextInCycle += 1;
        }

        return {
          ...state,
          status: 'COMPLETED',
          remainingMs: 0,
          elapsedMs: state.totalDurationMs,
          progress: 1.0,
          targetEndTimestamp: null,
          pausedAt: null,
          stats: nextStats,
          completedFocusSessions: nextCompletedFocus,
          completedInCycle: nextInCycle,
        };
      }

      const elapsed = computeElapsedMs(state.totalDurationMs, remaining);
      const progress = computeProgress(remaining, state.totalDurationMs);

      return {
        ...state,
        remainingMs: remaining,
        elapsedMs: elapsed,
        progress,
      };
    }

    // --------------------------------------------------------
    // ADVANCE: Transition from COMPLETED to next mode
    // --------------------------------------------------------
    case 'ADVANCE': {
      if (state.status !== 'COMPLETED' && state.status !== 'TRANSITIONING') return state;

      const { nextMode, nextCompletedInCycle, nextCycle } = getNextModeOnCompletion(
        state.mode,
        state.completedInCycle,
        state.currentCycle,
        state.settings.sessionsBeforeLongBreak,
      );

      const duration = getDurationForMode(nextMode, state.settings);

      // Check auto-start preference
      let shouldAutoStart =
        (nextMode === 'FOCUS' && state.settings.autoStartFocus) ||
        (nextMode !== 'FOCUS' && state.settings.autoStartBreaks);

      // If completing long break (starting a new cycle), check autoStartCycle
      if (state.mode === 'LONG_BREAK' && nextMode === 'FOCUS' && !state.settings.autoStartCycle) {
        shouldAutoStart = false;
      }

      const now = action.timestamp ?? Date.now();

      return {
        ...state,
        status: shouldAutoStart ? 'RUNNING' : 'IDLE',
        mode: nextMode,
        remainingMs: duration,
        totalDurationMs: duration,
        elapsedMs: 0,
        progress: 0,
        startedAt: shouldAutoStart ? now : null,
        pausedAt: null,
        elapsedBeforeCurrentRunMs: 0,
        targetEndTimestamp: shouldAutoStart ? computeTargetEndTimestamp(duration, now) : null,
        completedInCycle: nextCompletedInCycle,
        currentCycle: nextCycle,
      };
    }

    // --------------------------------------------------------
    // CHANGE_MODE: Manual mode switch by user
    // --------------------------------------------------------
    case 'CHANGE_MODE': {
      if (state.mode === action.mode && state.status === 'IDLE') return state;

      const duration = getDurationForMode(action.mode, state.settings);

      return {
        ...state,
        status: 'IDLE',
        mode: action.mode,
        remainingMs: duration,
        totalDurationMs: duration,
        elapsedMs: 0,
        progress: 0,
        startedAt: null,
        pausedAt: null,
        elapsedBeforeCurrentRunMs: 0,
        targetEndTimestamp: null,
      };
    }

    // --------------------------------------------------------
    // UPDATE_SETTINGS: In-flight safe settings modification
    // --------------------------------------------------------
    case 'UPDATE_SETTINGS': {
      const newSettings = validateSettings(action.settings, state.settings);

      // Check if durations changed safely
      const rawSettings = action.settings || {};
      const isDurationChange =
        'focusDurationMin' in rawSettings ||
        'shortBreakDurationMin' in rawSettings ||
        'longBreakDurationMin' in rawSettings;

      // When IDLE, update duration immediately for the current mode
      if (isDurationChange && state.status === 'IDLE') {
        const newDuration = getDurationForMode(state.mode, newSettings);
        return {
          ...state,
          settings: newSettings,
          remainingMs: newDuration,
          totalDurationMs: newDuration,
          elapsedMs: 0,
          progress: 0,
        };
      }

      // When RUNNING or PAUSED, preserve active session duration to prevent corruption
      return {
        ...state,
        settings: newSettings,
      };
    }

    // --------------------------------------------------------
    // DELETE_HISTORY: Reset historical productivity data only
    // --------------------------------------------------------
    case 'DELETE_HISTORY': {
      return {
        ...state,
        stats: {
          ...DEFAULT_STATS,
          dailyTargetMinutes: state.stats.dailyTargetMinutes,
          dailyTargetSessions: state.stats.dailyTargetSessions,
        },
        completedFocusSessions: 0,
      };
    }

    // --------------------------------------------------------
    // UPDATE_GOALS: Modify focus goals
    // --------------------------------------------------------
    case 'UPDATE_GOALS': {
      return {
        ...state,
        stats: {
          ...state.stats,
          dailyTargetMinutes: Math.max(10, Math.min(720, action.dailyTargetMinutes)),
          dailyTargetSessions: Math.max(1, Math.min(24, action.dailyTargetSessions)),
        },
      };
    }

    // --------------------------------------------------------
    // LOAD_PERSISTED: Intelligent state reconstruction & reconciliation
    // --------------------------------------------------------
    case 'LOAD_PERSISTED': {
      const { state: persisted } = action;
      if (!persisted) return state;

      const completedFocus = persisted.completedFocusSessions ?? state.completedFocusSessions;
      const currentCycle = persisted.currentCycle ?? state.currentCycle;
      const completedInCycle = persisted.completedInCycle ?? state.completedInCycle;
      const mode = persisted.mode ?? state.mode;
      const totalDuration = persisted.totalDurationMs ?? getDurationForMode(mode, state.settings);

      // Scenario A: Was RUNNING when saved
      if (persisted.status === 'RUNNING' && persisted.targetEndTimestamp) {
        const now = Date.now();

        // Subcase A1: Session expired while the browser was closed
        if (now >= persisted.targetEndTimestamp) {
          let reconciledStats = state.stats;
          let newCompletedFocus = completedFocus;
          let newInCycle = completedInCycle;

          if (mode === 'FOCUS') {
            reconciledStats = recordSessionCompletion(
              state.stats,
              mode,
              totalDuration,
              persisted.targetEndTimestamp,
            );
            newCompletedFocus += 1;
            newInCycle += 1;
          }

          return {
            ...state,
            status: 'COMPLETED',
            mode,
            remainingMs: 0,
            totalDurationMs: totalDuration,
            elapsedMs: totalDuration,
            progress: 1.0,
            startedAt: persisted.startedAt ?? null,
            pausedAt: null,
            elapsedBeforeCurrentRunMs: totalDuration,
            targetEndTimestamp: null,
            completedFocusSessions: newCompletedFocus,
            currentCycle,
            completedInCycle: newInCycle,
            stats: reconciledStats,
          };
        }

        // Subcase A2: Still has time remaining -> resume seamlessly
        const remaining = computeRemainingMs(persisted.targetEndTimestamp, now, totalDuration);
        const elapsed = computeElapsedMs(totalDuration, remaining);

        return {
          ...state,
          status: 'RUNNING',
          mode,
          remainingMs: remaining,
          totalDurationMs: totalDuration,
          elapsedMs: elapsed,
          progress: computeProgress(remaining, totalDuration),
          startedAt: persisted.startedAt ?? now,
          pausedAt: null,
          elapsedBeforeCurrentRunMs: persisted.elapsedBeforeCurrentRunMs ?? 0,
          targetEndTimestamp: persisted.targetEndTimestamp,
          completedFocusSessions: completedFocus,
          currentCycle,
          completedInCycle,
        };
      }

      // Scenario B: Was PAUSED when saved
      if (persisted.status === 'PAUSED') {
        const rawRemaining = persisted.remainingMs ?? totalDuration;
        const remaining = Math.min(totalDuration, Math.max(0, rawRemaining));
        const elapsed = computeElapsedMs(totalDuration, remaining);

        return {
          ...state,
          status: 'PAUSED',
          mode,
          remainingMs: remaining,
          totalDurationMs: totalDuration,
          elapsedMs: elapsed,
          progress: computeProgress(remaining, totalDuration),
          startedAt: persisted.startedAt ?? null,
          pausedAt: persisted.pausedAt ?? null,
          elapsedBeforeCurrentRunMs: elapsed,
          targetEndTimestamp: null,
          completedFocusSessions: completedFocus,
          currentCycle,
          completedInCycle,
        };
      }

      // Scenario C: IDLE or other
      const duration = getDurationForMode(mode, state.settings);
      return {
        ...state,
        status: 'IDLE',
        mode,
        remainingMs: duration,
        totalDurationMs: duration,
        elapsedMs: 0,
        progress: 0,
        startedAt: null,
        pausedAt: null,
        elapsedBeforeCurrentRunMs: 0,
        targetEndTimestamp: null,
        completedFocusSessions: completedFocus,
        currentCycle,
        completedInCycle,
      };
    }

    default:
      return state;
  }
}
