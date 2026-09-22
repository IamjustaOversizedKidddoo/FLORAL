// ============================================================
// MONOTONIC TIMER — Drift-proof timestamp arithmetic
//
// PRINCIPLE: Remaining time is NEVER stored as a decrementing
// integer. It is always computed from:
//   remainingMs = targetEndTimestamp - Date.now()
//
// This means browser throttling, tab suspension, and laptop
// sleep all correct themselves automatically on the next tick.
// ============================================================

/**
 * Given the moment a timer starts (or resumes), compute
 * the absolute wall-clock timestamp at which it will end.
 */
export function computeTargetEndTimestamp(remainingMs: number, now: number = Date.now()): number {
  return Math.round(now + Math.max(0, remainingMs));
}

/**
 * Given a target end timestamp, compute how many milliseconds
 * remain right now. Clamped between 0 and totalDurationMs (if provided).
 * Returns 0 if already past the target.
 */
export function computeRemainingMs(
  targetEndTimestamp: number,
  now: number = Date.now(),
  maxMs?: number,
): number {
  const diff = targetEndTimestamp - now;
  if (diff <= 0 || Number.isNaN(diff)) return 0;
  if (typeof maxMs === 'number' && maxMs > 0) {
    return Math.min(maxMs, diff);
  }
  return diff;
}

/**
 * Compute elapsed milliseconds given total duration and remaining ms.
 * Clamped between 0 and totalDurationMs.
 */
export function computeElapsedMs(totalDurationMs: number, remainingMs: number): number {
  if (totalDurationMs <= 0 || Number.isNaN(totalDurationMs)) return 0;
  return Math.min(totalDurationMs, Math.max(0, totalDurationMs - Math.max(0, remainingMs)));
}

/**
 * Given remaining milliseconds, extract whole hours, minutes, and seconds
 * for display purposes. Does NOT mutate state.
 */
export function msToDisplay(ms: number): {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  hasHours: boolean;
} {
  const safeMs = Math.max(0, ms);
  const totalSeconds = Math.ceil(safeMs / 1000);
  const display = safeMs <= 0 ? 0 : totalSeconds;

  const hours = Math.floor(display / 3600);
  const remainingMinutes = Math.floor((display % 3600) / 60);
  const seconds = display % 60;
  const hasHours = hours > 0;

  return {
    hours,
    // When hasHours is false, minutes represents total minutes (e.g. 25).
    // When hasHours is true, minutes is 0-59 (e.g. 1:00:00).
    minutes: hasHours ? remainingMinutes : Math.floor(display / 60),
    seconds,
    totalSeconds: display,
    hasHours,
  };
}

/**
 * Format hours:minutes:seconds or minutes:seconds.
 * Uses tabular display with leading zeros where appropriate.
 */
export function formatTime(minutes: number, seconds: number, hours?: number): string {
  if (typeof hours === 'number' && hours > 0) {
    const hh = String(hours);
    const mm = String(Math.max(0, minutes)).padStart(2, '0');
    const ss = String(Math.max(0, seconds)).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  }
  const mm = String(Math.max(0, minutes)).padStart(2, '0');
  const ss = String(Math.max(0, seconds)).padStart(2, '0');
  return `${mm}:${ss}`;
}

/**
 * Compute what fraction of the session has elapsed, for progress indicators.
 * Returns a value between 0.0 (start) and 1.0 (complete).
 */
export function computeProgress(remainingMs: number, totalDurationMs: number): number {
  if (totalDurationMs <= 0 || Number.isNaN(totalDurationMs)) return 0;
  const elapsed = computeElapsedMs(totalDurationMs, remainingMs);
  return Math.min(1, Math.max(0, elapsed / totalDurationMs));
}

/**
 * Convert minutes to milliseconds. Named to prevent unit confusion.
 */
export function minToMs(minutes: number): number {
  return Math.round(Math.max(0, minutes) * 60 * 1000);
}

/**
 * Convert milliseconds to whole minutes rounded down/up.
 */
export function msToMin(ms: number): number {
  return Math.round(Math.max(0, ms) / 60000);
}

/**
 * Get today's ISO date string (YYYY-MM-DD) in local timezone.
 */
export function getTodayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
