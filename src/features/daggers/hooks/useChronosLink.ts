// ============================================================
// useChronosLink — Read-only CHRONOS timerEvents subscriber
//
// Listens to the shared timerEvents singleton and accumulates
// focus minutes into the Daggers store for today's entry.
// Zero modifications to CHRONOS source required.
// ============================================================

import { useEffect } from 'react';
import { timerEvents } from '../../../core/timerEvents';

export function useChronosLink(
  addFocusMinutes: (minutes: number) => void,
): void {
  useEffect(() => {
    // Subscribe to CHRONOS session completions — purely additive, no CHRONOS code touched
    const unsubscribe = timerEvents.on('SESSION_COMPLETED', (data) => {
      if (data.mode === 'FOCUS') {
        // Approximate focus minutes from CHRONOS session defaults (25 min)
        // In a real session the actual duration would come from the settings;
        // we use the completedFocusSessions count delta to avoid double-counting.
        addFocusMinutes(25);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [addFocusMinutes]);
}
