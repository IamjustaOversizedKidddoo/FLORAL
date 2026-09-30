// ============================================================
// DaggersHeader — Brand Insignia, Global Progress, Nav Tabs, CHRONOS link
// ============================================================

import styles from './DaggersHeader.module.css';
import type { ProgrammeConfig } from '../../types';
import { TOTAL_DAYS } from '../../constants';
import { PhaseBadge } from '../PhaseBadge/PhaseBadge';

export type DaggersTab =
  | 'DASHBOARD'
  | 'PROGRAMME'
  | 'ACADEMY'
  | 'EXERCISES'
  | 'ASSESSMENTS'
  | 'ANALYTICS'
  | 'SETTINGS';

interface DaggersHeaderProps {
  config: ProgrammeConfig;
  currentDayNumber: number;
  overallProgress: number;
  activeTab: DaggersTab;
  onSelectTab: (tab: DaggersTab) => void;
  onSwitchToTimer?: () => void;
  isTimerRunning?: boolean;
  remainingMs?: number;
}

export function DaggersHeader({
  config,
  currentDayNumber,
  overallProgress,
  activeTab,
  onSelectTab,
  onSwitchToTimer,
  isTimerRunning,
  remainingMs = 0,
}: DaggersHeaderProps) {
  const daysRemaining = Math.max(0, TOTAL_DAYS - currentDayNumber);
  const displayDay = Math.max(0, Math.min(currentDayNumber, TOTAL_DAYS));

  // SVG ring parameters
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallProgress / 100) * circumference;

  return (
    <header className={styles.header}>
      {/* Left: Unit identity */}
      <div className={styles.left}>
        {/* Daggers Insignia SVG */}
        <svg
          className={styles.insigniaBadge}
          viewBox="0 0 40 40"
          fill="none"
          aria-label="4 PARA SF Daggers Insignia"
        >
          {/* Dagger silhouette */}
          <path
            d="M20 4 L22 16 L26 18 L22 20 L22 34 L20 36 L18 34 L18 20 L14 18 L18 16 Z"
            fill="#C4A882"
            opacity="0.9"
          />
          <path
            d="M20 4 L21 10 L20 12 L19 10 Z"
            fill="#F0EBE0"
          />
          {/* Wings */}
          <path d="M14 18 L6 14 L12 18 L6 22 Z" fill="#9B8364" opacity="0.7" />
          <path d="M26 18 L34 14 L28 18 L34 22 Z" fill="#9B8364" opacity="0.7" />
          {/* Outer ring */}
          <circle cx="20" cy="20" r="19" stroke="#9B8364" strokeWidth="0.75" fill="none" opacity="0.4" />
        </svg>

        <div className={styles.titles}>
          <div className={styles.unitName}>{config.targetUnit}</div>
          <div className={styles.programmeTitle}>
            {config.programmeTitle}
            {config.candidateName && (
              <span className={styles.candidateTag}> • {config.candidateName}</span>
            )}
          </div>
        </div>
      </div>

      {/* Center navigation tabs */}
      <nav className={styles.navTabs} aria-label="Navigation Tabs">
        <button
          type="button"
          className={`${styles.navBtn} ${activeTab === 'DASHBOARD' ? styles.navActive : ''}`}
          onClick={() => onSelectTab('DASHBOARD')}
        >
          Mission
        </button>
        <button
          type="button"
          className={`${styles.navBtn} ${activeTab === 'PROGRAMME' ? styles.navActive : ''}`}
          onClick={() => onSelectTab('PROGRAMME')}
        >
          90-Day Plan
        </button>
        <button
          type="button"
          className={`${styles.navBtn} ${activeTab === 'ACADEMY' ? styles.navActive : ''}`}
          onClick={() => onSelectTab('ACADEMY')}
        >
          Academy
        </button>
        <button
          type="button"
          className={`${styles.navBtn} ${activeTab === 'EXERCISES' ? styles.navActive : ''}`}
          onClick={() => onSelectTab('EXERCISES')}
        >
          Exercises
        </button>
        <button
          type="button"
          className={`${styles.navBtn} ${activeTab === 'ASSESSMENTS' ? styles.navActive : ''}`}
          onClick={() => onSelectTab('ASSESSMENTS')}
        >
          Assessments
        </button>
        <button
          type="button"
          className={`${styles.navBtn} ${activeTab === 'ANALYTICS' ? styles.navActive : ''}`}
          onClick={() => onSelectTab('ANALYTICS')}
        >
          Analytics
        </button>
        <button
          type="button"
          className={`${styles.navBtn} ${activeTab === 'SETTINGS' ? styles.navActive : ''}`}
          onClick={() => onSelectTab('SETTINGS')}
        >
          Settings
        </button>
      </nav>

      {/* Centre: Day counter + progress ring */}
      <div className={styles.centre}>
        <div className={styles.dayCounter}>
          <div className={styles.dayNum}>
            {displayDay > 0 ? `D${String(displayDay).padStart(2, '0')}` : '--'}
          </div>
          <div className={styles.dayLabel}>
            {daysRemaining > 0 ? `${daysRemaining} remaining` : 'Complete'}
          </div>
        </div>

        <div className={styles.separator} aria-hidden />

        <div className={styles.progress}>
          <div className={styles.progressRing}>
            <svg width="44" height="44" aria-hidden>
              <circle
                cx="22"
                cy="22"
                r={radius}
                stroke="rgba(155, 131, 100, 0.15)"
                strokeWidth="2.5"
                fill="none"
              />
              <circle
                cx="22"
                cy="22"
                r={radius}
                stroke="#C4A882"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
            <div className={styles.progressText}>{overallProgress}%</div>
          </div>
          <div className={styles.progressLabel}>Avg Score</div>
        </div>

        {displayDay > 0 && <PhaseBadge dayNumber={displayDay} compact />}
      </div>

      {/* Right: CHRONOS link */}
      <div className={styles.right}>
        <button
          type="button"
          onClick={() => {
            if (onSwitchToTimer) {
              onSwitchToTimer();
            } else {
              window.location.href = '/';
            }
          }}
          className={styles.chronosLink}
          title="Open CHRONOS Focus Timer"
        >
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <circle cx="6" cy="6" r="4.5" />
            <polyline points="6,3 6,6 8,7" />
          </svg>
          <span>CHRONOS Timer</span>
          {isTimerRunning && (
            <span style={{ color: '#fff', fontWeight: 700, marginLeft: 4 }}>
              ▶ {Math.floor(remainingMs / 60000)}:{String(Math.floor((remainingMs % 60000) / 1000)).padStart(2, '0')}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
