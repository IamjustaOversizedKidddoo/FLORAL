// ============================================================
// useIdleTimer — Detects inactivity for cinematic chrome fade
//
// After IDLE_TIMEOUT_MS of no pointer/keyboard activity,
// returns isIdle: true. The UI uses this to fade chrome.
// Any interaction immediately resets the timer.
// ============================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import { IDLE_TIMEOUT_MS } from '../core/constants';

export function useIdleTimer(active: boolean) {
  const [isIdle, setIsIdle] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetIdle = useCallback(() => {
    setIsIdle(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (active) {
      timeoutRef.current = setTimeout(() => {
        setIsIdle(true);
      }, IDLE_TIMEOUT_MS);
    }
  }, [active]);

  useEffect(() => {
    if (!active) {
      setIsIdle(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      return;
    }

    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    events.forEach((ev) => window.addEventListener(ev, resetIdle, { passive: true }));

    // Start initial idle countdown
    resetIdle();

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, resetIdle));
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [active, resetIdle]);

  return { isIdle, resetIdle };
}
