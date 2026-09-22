import type { ProductivityStats } from '../../core/types';
import styles from './Footer.module.css';

interface FooterProps {
  stats: ProductivityStats;
  isIdle: boolean;
  onFullscreen: () => void;
  onStatsOpen: () => void;
}

function formatFocusTime(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function Footer({ stats, isIdle, onFullscreen, onStatsOpen }: FooterProps) {
  const todayLabel =
    stats.dailyFocusMinutes > 0
      ? `${formatFocusTime(stats.dailyFocusMinutes)} today`
      : '0m today';

  const streakLabel =
    stats.currentStreakDays > 0 ? `${stats.currentStreakDays}d streak` : null;

  return (
    <footer
      className={styles.footer}
      style={{ opacity: isIdle ? 0 : 1, pointerEvents: isIdle ? 'none' : 'auto' }}
    >
      {/* Today's focus stats */}
      <div className={styles.stats}>
        <button
          id="stats-btn"
          className={styles.utilityButton}
          onClick={onStatsOpen}
          aria-label="View productivity statistics"
          type="button"
          style={{ padding: 0 }}
        >
          <span className={styles.statItem}>
            <span>{todayLabel}</span>
          </span>
          {streakLabel && (
            <>
              <span className={styles.statSeparator} aria-hidden="true">·</span>
              <span className={styles.statItem}>
                <span aria-label={`${stats.currentStreakDays} day streak`}>
                  {streakLabel}
                </span>
              </span>
            </>
          )}
        </button>
      </div>

      {/* Utility buttons */}
      <div className={styles.utilityButtons}>
        <button
          id="fullscreen-btn"
          className={styles.utilityButton}
          onClick={onFullscreen}
          aria-label="Toggle fullscreen (f)"
          type="button"
          title="Fullscreen (f)"
        >
          <FullscreenIcon />
          <span className={styles.key} aria-hidden="true">F</span>
        </button>
      </div>
    </footer>
  );
}

function FullscreenIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M1 4.5V1.5A.5.5 0 0 1 1.5 1H4.5M9.5 1H12.5A.5.5 0 0 1 13 1.5V4.5M13 9.5V12.5A.5.5 0 0 1 12.5 13H9.5M4.5 13H1.5A.5.5 0 0 1 1 12.5V9.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
