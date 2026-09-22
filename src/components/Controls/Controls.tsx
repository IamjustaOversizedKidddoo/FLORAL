import type { TimerStatus, TimerMode } from '../../core/types';
import styles from './Controls.module.css';

interface ControlsProps {
  status: TimerStatus;
  mode: TimerMode;
  completedInCycle: number;
  sessionsBeforeLongBreak: number;
  showSessionDots?: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export function Controls({
  status,
  mode,
  completedInCycle,
  sessionsBeforeLongBreak,
  showSessionDots = true,
  onStart,
  onPause,
  onResume,
  onReset,
  onSkip,
}: ControlsProps) {
  const isRunning = status === 'RUNNING';
  const isPaused = status === 'PAUSED';
  const isCompleted = status === 'COMPLETED';
  const isBreakMode = mode !== 'FOCUS';

  const handlePrimaryClick = () => {
    if (isRunning) {
      onPause();
    } else if (isPaused) {
      onResume();
    } else if (isCompleted) {
      onStart();
    } else {
      onStart();
    }
  };

  const getPrimaryLabel = () => {
    if (isRunning) return 'Pause';
    if (isPaused) return 'Resume';
    if (isCompleted) return 'Next';
    return 'Start';
  };

  return (
    <div className={styles.controls} role="group" aria-label="Timer controls">
      {/* LEVEL 3: Primary Action Button */}
      <button
        id="timer-primary-btn"
        className={`${styles.primaryButton} ${isBreakMode ? styles.breakMode : ''} ${
          isCompleted ? styles.completedState : ''
        }`}
        onClick={handlePrimaryClick}
        aria-label={`${getPrimaryLabel()} timer`}
        type="button"
      >
        <span className={styles.primaryLabel}>{getPrimaryLabel()}</span>
        <span className={styles.shortcutHint} aria-hidden="true">
          Space
        </span>
      </button>

      {/* LEVEL 4: Subtle Session Indicator Dots */}
      {showSessionDots && (
        <div
          className={styles.sessionDots}
          role="status"
          aria-label={`Session ${completedInCycle} of ${sessionsBeforeLongBreak} in cycle`}
          title={`Session ${completedInCycle} of ${sessionsBeforeLongBreak}`}
        >
          {Array.from({ length: sessionsBeforeLongBreak }, (_, i) => {
            const isDone = i < completedInCycle;
            const isCurrent = i === completedInCycle && mode === 'FOCUS';
            return (
              <span
                key={i}
                className={`${styles.dot} ${isDone ? styles.dotCompleted : ''} ${
                  isCurrent ? styles.dotCurrent : ''
                }`}
                aria-hidden="true"
              />
            );
          })}
        </div>
      )}

      {/* LEVEL 5: Secondary Actions (Quiet Ghost Buttons) */}
      <div className={styles.secondaryActions}>
        <button
          id="timer-reset-btn"
          className={styles.secondaryButton}
          onClick={onReset}
          disabled={status === 'IDLE'}
          aria-label="Reset timer (R)"
          type="button"
          title="Reset (R)"
        >
          Reset
        </button>

        <span className={styles.secondaryDivider} aria-hidden="true">·</span>

        <button
          id="timer-skip-btn"
          className={styles.secondaryButton}
          onClick={onSkip}
          aria-label="Skip session (S)"
          type="button"
          title="Skip (S)"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
