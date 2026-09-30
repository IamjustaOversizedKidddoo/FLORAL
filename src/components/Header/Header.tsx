import type { TimerMode, TimerStatus } from '../../core/types';
import styles from './Header.module.css';

const MODES: { key: TimerMode; label: string }[] = [
  { key: 'FOCUS', label: 'Focus' },
  { key: 'SHORT_BREAK', label: 'Short Break' },
  { key: 'LONG_BREAK', label: 'Long Break' },
];

interface HeaderProps {
  mode: TimerMode;
  status: TimerStatus;
  isIdle: boolean;
  showModeTabs?: boolean;
  onModeChange: (mode: TimerMode) => void;
  onSettingsOpen: () => void;
  activeView?: 'TIMER' | 'DAGGERS';
  onViewChange?: (view: 'TIMER' | 'DAGGERS') => void;
  remainingMs?: number;
}

export function Header({
  mode,
  status,
  isIdle,
  showModeTabs = true,
  onModeChange,
  onSettingsOpen,
  activeView = 'TIMER',
  onViewChange,
  remainingMs = 0,
}: HeaderProps) {
  const isRunning = status === 'RUNNING';

  const formatTimerShort = (ms: number) => {
    const totalSec = Math.max(0, Math.ceil(ms / 1000));
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const handleModeChange = (newMode: TimerMode) => {
    if (activeView !== 'TIMER') {
      onViewChange?.('TIMER');
    }
    if (isRunning && newMode !== mode) {
      const confirmed = window.confirm(
        'Switching modes will reset the current session. Continue?',
      );
      if (!confirmed) return;
    }
    onModeChange(newMode);
  };

  return (
    <header
      className={`${styles.header} ${isIdle ? styles.idleHidden : ''}`}
      role="banner"
    >
      {/* Top Left: Minimalist View Navigation (CHRONOS / MIGHTY DAGGERS) */}
      <div className={styles.leftNav} role="navigation" aria-label="Feature navigation">
        <button
          id="nav-view-timer"
          type="button"
          className={`${styles.viewNavBtn} ${activeView === 'TIMER' ? styles.viewNavActive : ''}`}
          onClick={() => onViewChange?.('TIMER')}
          title="CHRONOS Focus Timer"
        >
          <span>CHRONOS</span>
          {activeView === 'DAGGERS' && isRunning && (
            <span className={styles.activeTimerBadge} aria-label={`Timer running: ${formatTimerShort(remainingMs)}`}>
              ▶ {formatTimerShort(remainingMs)}
            </span>
          )}
        </button>

        <span className={styles.viewDivider} aria-hidden="true">/</span>

        <button
          id="nav-view-daggers"
          type="button"
          className={`${styles.viewNavBtn} ${activeView === 'DAGGERS' ? styles.viewNavActive : ''}`}
          onClick={() => onViewChange?.('DAGGERS')}
          title="4 PARA SF — The Mighty Daggers Probation Tracker"
        >
          <svg className={styles.daggerMiniIcon} viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M6 1 L6.8 5 L9 6 L6.8 7 L6.8 11 L6 11.5 L5.2 11 L5.2 7 L3 6 L5.2 5 Z" fill="currentColor"/>
          </svg>
          <span>MIGHTY DAGGERS</span>
        </button>
      </div>

      {/* Center: Typography-first Mode Navigation */}
      {showModeTabs ? (
        <nav className={styles.modeNav} role="tablist" aria-label="Timer mode selection">
          {MODES.map(({ key, label }) => {
            const isActive = mode === key;
            return (
              <button
                key={key}
                id={`mode-nav-${key.toLowerCase()}`}
                role="tab"
                aria-selected={isActive}
                className={`${styles.modeButton} ${isActive ? styles.active : ''}`}
                onClick={() => handleModeChange(key)}
                type="button"
              >
                <span className={styles.modeLabel}>{label}</span>
                {isActive && <span className={styles.activeDot} aria-hidden="true" />}
              </button>
            );
          })}
        </nav>
      ) : (
        <div style={{ flex: 1 }} />
      )}

      {/* Top Right: Ambient Settings Icon */}
      <div className={styles.rightNav}>
        <button
          id="settings-trigger-btn"
          className={styles.iconButton}
          onClick={onSettingsOpen}
          aria-label="Open settings"
          type="button"
          title="Settings (,)"
        >
          <SettingsIcon />
        </button>
      </div>
    </header>
  );
}

function SettingsIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="2.5" />
      <path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M3.4 12.6l1.1-1.1M11.5 4.5l1.1-1.1" />
    </svg>
  );
}
