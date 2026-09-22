// ============================================================
// useTimer — Main hook connecting React to the timer engine
//
// RESPONSIBILITIES:
// - Exposes the authoritative Timer API to UI components
// - Manages timer state via the pure deterministic reducer
// - Owns the Web Worker lifecycle (drift-proof background heartbeat)
// - Handles page visibility & window focus changes (wake-from-sleep reconciliation)
// - Syncs settings/stats/session to LocalStorage with schema versioning
// - Synchronizes Web Audio API and Web Notifications configurations
// - Emits decoupled timerEvents for subscribers
// - Coordinates COMPLETED -> ADVANCE automatic session transitions
// ============================================================

import { useReducer, useEffect, useRef, useCallback } from 'react';
import { timerReducer, createInitialState, getNextModeOnCompletion } from '../core/stateMachine';
import {
  loadPersistedStore,
  saveSettings,
  saveStats,
  saveSession,
  resetAllSettings,
  resetCategorySettings,
  resetAllData,
  deleteProductivityHistory,
  saveGoals,
} from '../services/storageService';
import { audioService } from '../services/audioService';
import { notificationService } from '../services/notificationService';
import { timerEvents } from '../core/timerEvents';
import type { TimerMode, TimerSettings } from '../core/types';
import { TICK_INTERVAL_MS, COMPLETION_PAUSE_MS } from '../core/constants';

// Vite Web Worker import syntax
import TimerWorker from '../core/worker/timer.worker?worker';

export function useTimer() {
  // --------------------------------------------------------
  // Initialize state — load persisted state synchronously
  // --------------------------------------------------------
  const [state, dispatch] = useReducer(timerReducer, undefined, () => {
    const initial = createInitialState();
    const persisted = loadPersistedStore();

    // 1. Apply persisted settings
    let loaded = timerReducer(initial, {
      type: 'UPDATE_SETTINGS',
      settings: persisted.settings,
    });

    // 2. Apply persisted stats
    loaded = { ...loaded, stats: persisted.stats };

    // 3. Restore session if one was saved
    if (persisted.session) {
      loaded = timerReducer(loaded, {
        type: 'LOAD_PERSISTED',
        state: persisted.session,
      });
    }

    return loaded;
  });

  // --------------------------------------------------------
  // Refs
  // --------------------------------------------------------
  const workerRef = useRef<Worker | null>(null);
  const completionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevStatusRef = useRef(state.status);
  const prevModeRef = useRef(state.mode);

  // --------------------------------------------------------
  // Worker management
  // --------------------------------------------------------
  const startWorker = useCallback(() => {
    if (!workerRef.current) {
      workerRef.current = new TimerWorker();
      workerRef.current.onmessage = (e: MessageEvent<{ type: 'TICK'; timestamp: number }>) => {
        if (e.data.type === 'TICK') {
          dispatch({ type: 'TICK', timestamp: e.data.timestamp });
        }
      };
      workerRef.current.onerror = (err) => {
        console.error('[Worker] Timer worker error:', err);
      };
    }
    workerRef.current.postMessage({ command: 'START', intervalMs: TICK_INTERVAL_MS });
  }, []);

  const stopWorker = useCallback(() => {
    workerRef.current?.postMessage({ command: 'STOP' });
  }, []);

  // --------------------------------------------------------
  // Manage worker based on status transitions
  // --------------------------------------------------------
  useEffect(() => {
    const prevStatus = prevStatusRef.current;
    const { status } = state;

    if (status === 'RUNNING' && prevStatus !== 'RUNNING') {
      startWorker();
    } else if (status !== 'RUNNING' && prevStatus === 'RUNNING') {
      stopWorker();
    }

    prevStatusRef.current = status;
  }, [state.status, startWorker, stopWorker]);

  // --------------------------------------------------------
  // Handle COMPLETED state — emit events & coordinate auto-advance
  // --------------------------------------------------------
  useEffect(() => {
    if (state.status !== 'COMPLETED') return;

    if (completionTimeoutRef.current) {
      clearTimeout(completionTimeoutRef.current);
      completionTimeoutRef.current = null;
    }

    const { nextMode } = getNextModeOnCompletion(
      state.mode,
      state.completedInCycle,
      state.currentCycle,
      state.settings.sessionsBeforeLongBreak,
    );

    // Emit decoupled event: subscribers (audioService, notificationService) react
    timerEvents.emit('SESSION_COMPLETED', {
      mode: state.mode,
      nextMode,
      completedInCycle: state.completedInCycle,
      currentCycle: state.currentCycle,
      totalCompletedSessions: state.completedFocusSessions,
    });

    // Schedule automatic transition to next mode
    completionTimeoutRef.current = setTimeout(() => {
      dispatch({ type: 'ADVANCE' });
    }, COMPLETION_PAUSE_MS);

    return () => {
      if (completionTimeoutRef.current) {
        clearTimeout(completionTimeoutRef.current);
      }
    };
  }, [
    state.status,
    state.mode,
    state.completedInCycle,
    state.currentCycle,
    state.completedFocusSessions,
    state.settings.sessionsBeforeLongBreak,
  ]);

  // --------------------------------------------------------
  // Sync Audio & Notification configurations
  // --------------------------------------------------------
  useEffect(() => {
    audioService.setEnabled(state.settings.soundEnabled);
    audioService.setVolume(state.settings.soundVolume);
    audioService.setFocusTheme(state.settings.soundTheme);
    audioService.setBreakTheme(state.settings.breakSoundTheme);
    audioService.setLongBreakTheme(state.settings.longBreakSoundTheme);
  }, [
    state.settings.soundEnabled,
    state.settings.soundVolume,
    state.settings.soundTheme,
    state.settings.breakSoundTheme,
    state.settings.longBreakSoundTheme,
  ]);

  useEffect(() => {
    notificationService.setEnabled(state.settings.notificationsEnabled);
    notificationService.setFocusNotificationEnabled(state.settings.focusNotificationEnabled);
    notificationService.setBreakNotificationEnabled(state.settings.breakNotificationEnabled);
  }, [
    state.settings.notificationsEnabled,
    state.settings.focusNotificationEnabled,
    state.settings.breakNotificationEnabled,
  ]);

  // --------------------------------------------------------
  // Persist settings & stats
  // --------------------------------------------------------
  useEffect(() => {
    saveSettings(state.settings);
  }, [state.settings]);

  useEffect(() => {
    saveStats(state.stats);
  }, [state.stats]);

  // --------------------------------------------------------
  // Persist session state for refresh recovery
  // --------------------------------------------------------
  useEffect(() => {
    saveSession({
      status: state.status,
      mode: state.mode,
      remainingMs: state.remainingMs,
      totalDurationMs: state.totalDurationMs,
      elapsedBeforeCurrentRunMs: state.elapsedBeforeCurrentRunMs,
      startedAt: state.startedAt,
      pausedAt: state.pausedAt,
      targetEndTimestamp: state.targetEndTimestamp,
      completedFocusSessions: state.completedFocusSessions,
      currentCycle: state.currentCycle,
      completedInCycle: state.completedInCycle,
    });
  }, [
    state.status,
    state.mode,
    state.remainingMs,
    state.totalDurationMs,
    state.elapsedBeforeCurrentRunMs,
    state.startedAt,
    state.pausedAt,
    state.targetEndTimestamp,
    state.completedFocusSessions,
    state.currentCycle,
    state.completedInCycle,
  ]);

  // --------------------------------------------------------
  // Visibility & Focus reconciliation
  // --------------------------------------------------------
  useEffect(() => {
    const handleReconcile = () => {
      if (state.status === 'RUNNING') {
        dispatch({ type: 'TICK', timestamp: Date.now() });
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        handleReconcile();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleReconcile);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleReconcile);
    };
  }, [state.status]);

  // --------------------------------------------------------
  // Mode accent colors
  // --------------------------------------------------------
  useEffect(() => {
    const root = document.documentElement;
    if (prevModeRef.current !== state.mode || prevStatusRef.current !== state.status) {
      prevModeRef.current = state.mode;
    }

    switch (state.mode) {
      case 'FOCUS':
        root.style.setProperty('--mode-accent', 'var(--mode-focus-accent)');
        root.style.setProperty('--mode-accent-dim', 'var(--mode-focus-accent-dim)');
        root.style.setProperty('--mode-progress', 'var(--mode-focus-progress)');
        break;
      case 'SHORT_BREAK':
        root.style.setProperty('--mode-accent', 'var(--mode-short-break-accent)');
        root.style.setProperty('--mode-accent-dim', 'var(--mode-short-break-accent-dim)');
        root.style.setProperty('--mode-progress', 'var(--mode-short-break-progress)');
        break;
      case 'LONG_BREAK':
        root.style.setProperty('--mode-accent', 'var(--mode-long-break-accent)');
        root.style.setProperty('--mode-accent-dim', 'var(--mode-long-break-accent-dim)');
        root.style.setProperty('--mode-progress', 'var(--mode-long-break-progress)');
        break;
    }
  }, [state.mode, state.status]);

  // --------------------------------------------------------
  // Theme — Supports DARK_DEEP, LIGHT_PAPER, and SYSTEM
  // --------------------------------------------------------
  useEffect(() => {
    const applyTheme = () => {
      let resolved = state.settings.theme;
      if (resolved === 'SYSTEM') {
        const prefersDark =
          typeof window !== 'undefined' &&
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches;
        resolved = prefersDark ? 'DARK_DEEP' : 'LIGHT_PAPER';
      }
      document.documentElement.setAttribute('data-theme', resolved);
    };

    applyTheme();

    if (state.settings.theme === 'SYSTEM' && typeof window !== 'undefined' && window.matchMedia) {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => applyTheme();
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, [state.settings.theme]);

  // --------------------------------------------------------
  // Cleanup on unmount
  // --------------------------------------------------------
  useEffect(() => {
    return () => {
      stopWorker();
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
      if (completionTimeoutRef.current) {
        clearTimeout(completionTimeoutRef.current);
      }
    };
  }, [stopWorker]);

  // --------------------------------------------------------
  // Public Action Dispatchers
  // --------------------------------------------------------
  const clearPendingCompletion = () => {
    if (completionTimeoutRef.current) {
      clearTimeout(completionTimeoutRef.current);
      completionTimeoutRef.current = null;
    }
  };

  const start = useCallback(() => {
    clearPendingCompletion();
    audioService.unlock();
    audioService.playButtonPress();

    if (state.status === 'COMPLETED') {
      dispatch({ type: 'ADVANCE' });
    }
    dispatch({ type: 'START', timestamp: Date.now() });
    timerEvents.emit('SESSION_STARTED', {
      mode: state.mode,
      durationMs: state.totalDurationMs,
    });
  }, [state.status, state.mode, state.totalDurationMs]);

  const pause = useCallback(() => {
    clearPendingCompletion();
    audioService.playButtonPress();
    const now = Date.now();
    dispatch({ type: 'PAUSE', timestamp: now });
    timerEvents.emit('SESSION_PAUSED', {
      mode: state.mode,
      remainingMs: state.remainingMs,
      elapsedMs: state.elapsedMs,
    });
  }, [state.mode, state.remainingMs, state.elapsedMs]);

  const resume = useCallback(() => {
    clearPendingCompletion();
    audioService.playButtonPress();
    const now = Date.now();
    dispatch({ type: 'RESUME', timestamp: now });
    timerEvents.emit('SESSION_RESUMED', {
      mode: state.mode,
      remainingMs: state.remainingMs,
    });
  }, [state.mode, state.remainingMs]);

  const reset = useCallback(() => {
    clearPendingCompletion();
    dispatch({ type: 'RESET', timestamp: Date.now() });
    timerEvents.emit('SESSION_RESET', {
      mode: state.mode,
      durationMs: state.totalDurationMs,
    });
  }, [state.mode, state.totalDurationMs]);

  const skip = useCallback(() => {
    clearPendingCompletion();
    const prevMode = state.mode;
    dispatch({ type: 'SKIP', timestamp: Date.now() });
    timerEvents.emit('SESSION_SKIPPED', {
      fromMode: prevMode,
      toMode: state.mode,
    });
  }, [state.mode]);

  const changeMode = useCallback((mode: TimerMode) => {
    clearPendingCompletion();
    dispatch({ type: 'CHANGE_MODE', mode });
    timerEvents.emit('MODE_CHANGED', { mode });
  }, []);

  const updateSettings = useCallback((settings: Partial<TimerSettings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', settings });
  }, []);

  const resetSettings = useCallback(() => {
    const fresh = resetAllSettings();
    dispatch({ type: 'UPDATE_SETTINGS', settings: fresh });
  }, []);

  const resetCategory = useCallback(
    (category: 'timer' | 'automation' | 'sound' | 'notifications' | 'appearance' | 'behavior') => {
      const updated = resetCategorySettings(category, state.settings);
      dispatch({ type: 'UPDATE_SETTINGS', settings: updated });
    },
    [state.settings],
  );

  const resetData = useCallback(() => {
    const freshStore = resetAllData();
    dispatch({ type: 'UPDATE_SETTINGS', settings: freshStore.settings });
    dispatch({ type: 'RESET' });
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }, []);

  const deleteHistory = useCallback(() => {
    deleteProductivityHistory();
    dispatch({ type: 'DELETE_HISTORY' });
  }, []);

  const updateGoals = useCallback((dailyTargetMinutes: number, dailyTargetSessions: number) => {
    saveGoals(dailyTargetMinutes, dailyTargetSessions);
    dispatch({ type: 'UPDATE_GOALS', dailyTargetMinutes, dailyTargetSessions });
  }, []);

  // --------------------------------------------------------
  // Authoritative Timer API
  // --------------------------------------------------------
  const actions = {
    start,
    pause,
    resume,
    reset,
    skip,
    changeMode,
    updateSettings,
    resetSettings,
    resetCategory,
    resetData,
    deleteHistory,
    updateGoals,
  };

  return {
    state,
    mode: state.mode,
    status: state.status,
    remainingTime: state.remainingMs,
    remainingMs: state.remainingMs,
    elapsedTime: state.elapsedMs,
    elapsedMs: state.elapsedMs,
    progress: state.progress,
    currentSession: state.completedInCycle + 1,
    completedSessions: state.completedFocusSessions,
    cycle: state.currentCycle,
    configuration: state.settings,
    settings: state.settings,
    stats: state.stats,

    actions,
    start,
    pause,
    resume,
    reset,
    skip,
    changeMode,
    updateSettings,
    resetSettings,
    resetCategory,
    resetData,
    deleteHistory,
    updateGoals,
  };
}
