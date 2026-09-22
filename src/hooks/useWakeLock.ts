// ============================================================
// useWakeLock — Screen Wake Lock API integration
//
// Prevents device display from sleeping during active focus sessions.
// Automatically re-acquires wake lock when tab visibility changes.
// ============================================================

import { useEffect, useRef } from 'react';

export function useWakeLock(enabled: boolean, isRunning: boolean) {
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function acquireLock() {
      if (
        !enabled ||
        !isRunning ||
        typeof navigator === 'undefined' ||
        !('wakeLock' in navigator) ||
        wakeLockRef.current !== null
      ) {
        return;
      }

      try {
        const sentinel = await navigator.wakeLock.request('screen');
        if (!isMounted) {
          void sentinel.release();
          return;
        }

        wakeLockRef.current = sentinel;
        sentinel.addEventListener('release', () => {
          wakeLockRef.current = null;
        });
      } catch {
        // WakeLock request can fail if device battery is critical or disabled by policy
      }
    }

    async function releaseLock() {
      if (wakeLockRef.current) {
        try {
          await wakeLockRef.current.release();
        } catch {
          // Ignore release errors
        }
        wakeLockRef.current = null;
      }
    }

    if (enabled && isRunning) {
      void acquireLock();
    } else {
      void releaseLock();
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && enabled && isRunning) {
        void acquireLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isMounted = false;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      void releaseLock();
    };
  }, [enabled, isRunning]);
}
