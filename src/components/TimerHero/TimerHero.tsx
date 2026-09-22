import { useMemo } from 'react';
import type { TimerMode, TimerStatus, TimerFormatPreference } from '../../core/types';
import { msToDisplay, computeProgress } from '../../core/monotonicTimer';
import styles from './TimerHero.module.css';

interface TimerHeroProps {
  remainingMs: number;
  totalDurationMs: number;
  mode: TimerMode;
  status: TimerStatus;
  timerFormat?: TimerFormatPreference;
}

export function TimerHero({
  remainingMs,
  totalDurationMs,
  mode,
  status,
  timerFormat = 'AUTO',
}: TimerHeroProps) {
  const { hours, minutes, seconds, hasHours, totalSeconds } = useMemo(
    () => msToDisplay(remainingMs),
    [remainingMs],
  );
  const progress = useMemo(
    () => computeProgress(remainingMs, totalDurationMs),
    [remainingMs, totalDurationMs],
  );

  const isCompleted = status === 'COMPLETED';

  // Determine whether to show hours group based on timerFormat setting
  let displayHours = hours;
  let displayMinutes = minutes;
  let showHours = false;

  if (timerFormat === 'HH_MM_SS') {
    showHours = true;
    displayHours = Math.floor(totalSeconds / 3600);
    displayMinutes = Math.floor((totalSeconds % 3600) / 60);
  } else if (timerFormat === 'MM_SS') {
    showHours = false;
    displayMinutes = Math.floor(totalSeconds / 60);
  } else {
    // AUTO: show hours only if hours > 0
    showHours = hasHours;
    displayHours = hours;
    displayMinutes = minutes;
  }

  const hh = String(displayHours).padStart(2, '0');
  const mm = String(displayMinutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');

  const isRunning = status === 'RUNNING';
  const isPaused = status === 'PAUSED';

  return (
    <div
      className={`${styles.hero} ${
        mode === 'FOCUS'
          ? styles.focusMode
          : mode === 'SHORT_BREAK'
            ? styles.shortBreakMode
            : styles.longBreakMode
      }`}
      role="region"
      aria-label="Timer display"
    >
      {/* Ambient background glow on completion */}
      <div
        className={`${styles.ambientGlow} ${isCompleted ? styles.visible : ''}`}
        aria-hidden="true"
      />

      {/* Timer digits container */}
      <div className={styles.digitsContainer}>
        <div
          role="timer"
          aria-live="off"
          aria-label={
            showHours
              ? `${displayHours} hours, ${displayMinutes} minutes, ${ss} seconds remaining`
              : `${displayMinutes} minutes, ${ss} seconds remaining`
          }
          className={`${styles.digits} ${showHours ? styles.hasHours : ''} ${
            isRunning ? styles.running : ''
          } ${isPaused ? styles.paused : ''} ${isCompleted ? styles.completed : ''}`}
        >
          {showHours && (
            <>
              <span className={styles.digitGroup}>
                <span className={styles.digit}>{hh[0]}</span>
                <span className={styles.digit}>{hh[1]}</span>
              </span>
              <span className={styles.colon}>:</span>
            </>
          )}
          <span className={styles.digitGroup}>
            <span className={styles.digit}>{mm[0]}</span>
            <span className={styles.digit}>{mm[1]}</span>
          </span>
          <span className={styles.colon}>:</span>
          <span className={styles.digitGroup}>
            <span className={styles.digit}>{ss[0]}</span>
            <span className={styles.digit}>{ss[1]}</span>
          </span>
        </div>

        {/* Minimalist hairline progress track */}
        <div className={styles.progressTrack} aria-hidden="true">
          <div
            className={styles.progressFill}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
