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
}

export function Header({
  mode,
  status,
  isIdle,
  showModeTabs = true,
  onModeChange,
  onSettingsOpen,
}: HeaderProps) {
  const isRunning = status === 'RUNNING';

  const handleModeChange = (newMode: TimerMode) => {
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
      {/* Top Left: Pure spacious negative space */}
      <div className={styles.brandSpacer} aria-hidden="true" />

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
