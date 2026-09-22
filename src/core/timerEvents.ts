// ============================================================
// TIMER EVENT SYSTEM — Decoupled Event Architecture
//
// DESIGN:
// - Completely decouples timer engine calculations from side effects
//   such as Web Audio API, Web Notifications, and UI analytics.
// - Strongly-typed event payloads.
// - Allows zero-dependency subscribers (e.g., audioService, notificationService).
// ============================================================

import type { TimerMode } from './types';

export interface TimerEventMap {
  SESSION_COMPLETED: {
    mode: TimerMode;
    nextMode: TimerMode;
    completedInCycle: number;
    currentCycle: number;
    totalCompletedSessions: number;
  };
  SESSION_STARTED: {
    mode: TimerMode;
    durationMs: number;
  };
  SESSION_PAUSED: {
    mode: TimerMode;
    remainingMs: number;
    elapsedMs: number;
  };
  SESSION_RESUMED: {
    mode: TimerMode;
    remainingMs: number;
  };
  SESSION_RESET: {
    mode: TimerMode;
    durationMs: number;
  };
  SESSION_SKIPPED: {
    fromMode: TimerMode;
    toMode: TimerMode;
  };
  MODE_CHANGED: {
    mode: TimerMode;
  };
  TICK: {
    remainingMs: number;
    elapsedMs: number;
    progress: number;
  };
}

export type TimerEventKey = keyof TimerEventMap;
export type TimerEventListener<K extends TimerEventKey> = (data: TimerEventMap[K]) => void;

type AnyListener = (data: unknown) => void;

class TimerEventEmitter {
  private listeners: Map<TimerEventKey, Set<AnyListener>> = new Map();

  on<K extends TimerEventKey>(event: K, listener: TimerEventListener<K>): () => void {
    let set = this.listeners.get(event);
    if (!set) {
      set = new Set();
      this.listeners.set(event, set);
    }
    set.add(listener as unknown as AnyListener);

    return () => {
      this.off(event, listener);
    };
  }

  off<K extends TimerEventKey>(event: K, listener: TimerEventListener<K>): void {
    const set = this.listeners.get(event);
    if (set) {
      set.delete(listener as unknown as AnyListener);
    }
  }

  emit<K extends TimerEventKey>(event: K, data: TimerEventMap[K]): void {
    const set = this.listeners.get(event);
    if (set) {
      set.forEach((listener) => {
        try {
          listener(data);
        } catch (err) {
          console.error(`[TimerEvents] Error in listener for ${event}:`, err);
        }
      });
    }
  }

  removeAllListeners(): void {
    this.listeners.clear();
  }
}

export const timerEvents = new TimerEventEmitter();
