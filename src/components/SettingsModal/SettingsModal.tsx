// ============================================================
// SETTINGS MODAL — Comprehensive Progressive-Disclosure Preferences
//
// DESIGN:
// - 8 focused categories with zero visual clutter on the main screen
// - Strict bounds validation with live feedback
// - Independent sound previews and notification testing
// - Granular reset controls (Category, Settings-only, Full-data with confirm)
// - Accessible touch targets (44px+) and keyboard navigation
// ============================================================

import { useState, useEffect, useRef } from 'react';
import type {
  TimerSettings,
  SoundTheme,
  ColorTheme,
  BackgroundStyle,
  TimerFormatPreference,
} from '../../core/types';
import { SETTING_BOUNDS } from '../../core/constants';
import { audioService } from '../../services/audioService';
import { notificationService } from '../../services/notificationService';
import styles from './SettingsModal.module.css';

interface SettingsModalProps {
  isOpen: boolean;
  settings: TimerSettings;
  onClose: () => void;
  onUpdateSettings: (settings: Partial<TimerSettings>) => void;
  onResetSettings: () => void;
  onResetCategory: (category: 'timer' | 'automation' | 'sound' | 'notifications' | 'appearance' | 'behavior') => void;
  onResetData: () => void;
}

type TabKey =
  | 'timer'
  | 'automation'
  | 'sound'
  | 'notifications'
  | 'appearance'
  | 'behavior'
  | 'shortcuts'
  | 'data';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'timer', label: 'Timer' },
  { key: 'automation', label: 'Automation' },
  { key: 'sound', label: 'Audio' },
  { key: 'notifications', label: 'Notifications' },
  { key: 'appearance', label: 'Appearance' },
  { key: 'behavior', label: 'Behavior' },
  { key: 'shortcuts', label: 'Shortcuts' },
  { key: 'data', label: 'Data' },
];

const SOUND_THEMES: { key: SoundTheme; label: string }[] = [
  { key: 'ZEN_BOWL', label: 'Zen Singing Bowl' },
  { key: 'SOFT_BELL', label: 'Soft Bell Chime' },
  { key: 'MECHANICAL', label: 'Mechanical Shutter' },
  { key: 'MUTED', label: 'Muted' },
];

export function SettingsModal({
  isOpen,
  settings,
  onClose,
  onUpdateSettings,
  onResetSettings,
  onResetCategory,
  onResetData,
}: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('timer');
  const [permissionState, setPermissionState] = useState<NotificationPermission>(
    notificationService.getPermission(),
  );
  const [showConfirmResetData, setShowConfirmResetData] = useState(false);
  const [testNotificationSent, setTestNotificationSent] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      triggerElementRef.current = document.activeElement as HTMLElement | null;
      setPermissionState(notificationService.getPermission());
      setShowConfirmResetData(false);
      setTestNotificationSent(false);

      // Focus first interactive element inside modal
      requestAnimationFrame(() => {
        const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable && focusable.length > 0) {
          focusable[0].focus();
        }
      });
    } else if (triggerElementRef.current) {
      triggerElementRef.current.focus();
      triggerElementRef.current = null;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showConfirmResetData) {
          setShowConfirmResetData(false);
        } else {
          onClose();
        }
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, showConfirmResetData, onClose]);

  if (!isOpen) return null;

  const handleRequestPermission = async () => {
    const granted = await notificationService.requestPermission();
    const updated = notificationService.getPermission();
    setPermissionState(updated);
    if (granted) {
      onUpdateSettings({ notificationsEnabled: true });
    }
  };

  const handleTestNotification = () => {
    const sent = notificationService.testNotification();
    if (sent) {
      setTestNotificationSent(true);
      setTimeout(() => setTestNotificationSent(false), 4000);
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Settings and Preferences"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.headerLeft}>
            <h2 className={styles.modalTitle}>Preferences</h2>
            <span className={styles.headerSub}>Customize your deep focus environment</span>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close preferences"
            type="button"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <nav className={styles.tabNav} role="tablist" aria-label="Settings categories">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeTab === tab.key}
              className={`${styles.tabBtn} ${activeTab === tab.key ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab.key)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Tab Content Panel */}
        <div className={styles.panelContent}>
          {/* ========================================================
              TAB 1: TIMER
              ======================================================== */}
          {activeTab === 'timer' && (
            <div className={styles.tabPane} role="tabpanel">
              <div className={styles.paneDescription}>
                Durations for sessions. New durations take effect on the next session.
              </div>

              <div className={styles.grid2}>
                <div className={styles.inputGroup}>
                  <label htmlFor="pref-focus-dur" className={styles.label}>
                    Focus Duration (min)
                  </label>
                  <input
                    id="pref-focus-dur"
                    type="number"
                    min={SETTING_BOUNDS.FOCUS_MIN_MIN}
                    max={SETTING_BOUNDS.FOCUS_MIN_MAX}
                    value={settings.focusDurationMin}
                    onChange={(e) =>
                      onUpdateSettings({ focusDurationMin: parseInt(e.target.value) })
                    }
                    className={styles.numberInput}
                  />
                  <span className={styles.hint}>1 – 120 minutes</span>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="pref-short-dur" className={styles.label}>
                    Short Break (min)
                  </label>
                  <input
                    id="pref-short-dur"
                    type="number"
                    min={SETTING_BOUNDS.SHORT_BREAK_MIN_MIN}
                    max={SETTING_BOUNDS.SHORT_BREAK_MIN_MAX}
                    value={settings.shortBreakDurationMin}
                    onChange={(e) =>
                      onUpdateSettings({ shortBreakDurationMin: parseInt(e.target.value) })
                    }
                    className={styles.numberInput}
                  />
                  <span className={styles.hint}>1 – 60 minutes</span>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="pref-long-dur" className={styles.label}>
                    Long Break (min)
                  </label>
                  <input
                    id="pref-long-dur"
                    type="number"
                    min={SETTING_BOUNDS.LONG_BREAK_MIN_MIN}
                    max={SETTING_BOUNDS.LONG_BREAK_MIN_MAX}
                    value={settings.longBreakDurationMin}
                    onChange={(e) =>
                      onUpdateSettings({ longBreakDurationMin: parseInt(e.target.value) })
                    }
                    className={styles.numberInput}
                  />
                  <span className={styles.hint}>1 – 120 minutes</span>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="pref-sessions-cycle" className={styles.label}>
                    Long Break Interval
                  </label>
                  <input
                    id="pref-sessions-cycle"
                    type="number"
                    min={SETTING_BOUNDS.SESSIONS_BEFORE_LONG_MIN}
                    max={SETTING_BOUNDS.SESSIONS_BEFORE_LONG_MAX}
                    value={settings.sessionsBeforeLongBreak}
                    onChange={(e) =>
                      onUpdateSettings({ sessionsBeforeLongBreak: parseInt(e.target.value) })
                    }
                    className={styles.numberInput}
                  />
                  <span className={styles.hint}>1 – 12 focus sessions</span>
                </div>
              </div>

              <div className={styles.categoryResetRow}>
                <button
                  type="button"
                  onClick={() => onResetCategory('timer')}
                  className={styles.resetCategoryBtn}
                >
                  Reset Timer Durations to Defaults
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 2: AUTOMATION
              ======================================================== */}
          {activeTab === 'automation' && (
            <div className={styles.tabPane} role="tabpanel">
              <div className={styles.paneDescription}>
                Control automatic session progression without manual intervention.
              </div>

              <div className={styles.rowItem}>
                <div>
                  <span className={styles.rowTitle}>Auto-start Breaks</span>
                  <span className={styles.rowDesc}>
                    Automatically start break timer when a focus session completes
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoStartBreaks}
                  onChange={(e) => onUpdateSettings({ autoStartBreaks: e.target.checked })}
                  className={styles.toggleCheckbox}
                  aria-label="Toggle auto-start breaks"
                />
              </div>

              <div className={styles.rowItem}>
                <div>
                  <span className={styles.rowTitle}>Auto-start Focus Sessions</span>
                  <span className={styles.rowDesc}>
                    Automatically start focus timer when a short break completes
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoStartFocus}
                  onChange={(e) => onUpdateSettings({ autoStartFocus: e.target.checked })}
                  className={styles.toggleCheckbox}
                  aria-label="Toggle auto-start focus sessions"
                />
              </div>

              <div className={styles.rowItem}>
                <div>
                  <span className={styles.rowTitle}>Auto-start Next Cycle</span>
                  <span className={styles.rowDesc}>
                    Begin next cycle immediately when long break concludes
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoStartCycle}
                  onChange={(e) => onUpdateSettings({ autoStartCycle: e.target.checked })}
                  className={styles.toggleCheckbox}
                  aria-label="Toggle auto-start next cycle"
                />
              </div>

              <div className={styles.categoryResetRow}>
                <button
                  type="button"
                  onClick={() => onResetCategory('automation')}
                  className={styles.resetCategoryBtn}
                >
                  Reset Automation to Defaults
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 3: SOUND
              ======================================================== */}
          {activeTab === 'sound' && (
            <div className={styles.tabPane} role="tabpanel">
              <div className={styles.paneDescription}>
                Real-time zero-latency acoustic synthesis via Web Audio API.
              </div>

              <div className={styles.rowItem}>
                <div>
                  <span className={styles.rowTitle}>Acoustic Feedback</span>
                  <span className={styles.rowDesc}>Enable sound synthesis for completions and button clicks</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.soundEnabled}
                  onChange={(e) => onUpdateSettings({ soundEnabled: e.target.checked })}
                  className={styles.toggleCheckbox}
                  aria-label="Toggle sound feedback"
                />
              </div>

              {settings.soundEnabled && (
                <>
                  <div className={styles.sliderSection}>
                    <div className={styles.sliderHeader}>
                      <span className={styles.rowTitle}>Master Volume</span>
                      <span className={styles.sliderVal}>{Math.round(settings.soundVolume * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={settings.soundVolume}
                      onChange={(e) => onUpdateSettings({ soundVolume: parseFloat(e.target.value) })}
                      className={styles.rangeInput}
                      aria-label="Master volume"
                    />
                  </div>

                  {/* Focus Completion Sound */}
                  <div className={styles.soundSelectRow}>
                    <div className={styles.soundSelectMeta}>
                      <label htmlFor="pref-sound-focus" className={styles.label}>
                        Focus Completion Sound
                      </label>
                      <select
                        id="pref-sound-focus"
                        value={settings.soundTheme}
                        onChange={(e) => onUpdateSettings({ soundTheme: e.target.value as SoundTheme })}
                        className={styles.selectInput}
                      >
                        {SOUND_THEMES.map((th) => (
                          <option key={th.key} value={th.key}>{th.label}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={() => audioService.previewSound(settings.soundTheme, settings.soundVolume)}
                      className={styles.previewBtn}
                      title="Test focus sound"
                    >
                      Preview
                    </button>
                  </div>

                  {/* Short Break Sound */}
                  <div className={styles.soundSelectRow}>
                    <div className={styles.soundSelectMeta}>
                      <label htmlFor="pref-sound-break" className={styles.label}>
                        Short Break Completion Sound
                      </label>
                      <select
                        id="pref-sound-break"
                        value={settings.breakSoundTheme}
                        onChange={(e) => onUpdateSettings({ breakSoundTheme: e.target.value as SoundTheme })}
                        className={styles.selectInput}
                      >
                        {SOUND_THEMES.map((th) => (
                          <option key={th.key} value={th.key}>{th.label}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={() => audioService.previewSound(settings.breakSoundTheme, settings.soundVolume)}
                      className={styles.previewBtn}
                      title="Test short break sound"
                    >
                      Preview
                    </button>
                  </div>

                  {/* Long Break Sound */}
                  <div className={styles.soundSelectRow}>
                    <div className={styles.soundSelectMeta}>
                      <label htmlFor="pref-sound-long-break" className={styles.label}>
                        Long Break Completion Sound
                      </label>
                      <select
                        id="pref-sound-long-break"
                        value={settings.longBreakSoundTheme}
                        onChange={(e) => onUpdateSettings({ longBreakSoundTheme: e.target.value as SoundTheme })}
                        className={styles.selectInput}
                      >
                        {SOUND_THEMES.map((th) => (
                          <option key={th.key} value={th.key}>{th.label}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={() => audioService.previewSound(settings.longBreakSoundTheme, settings.soundVolume)}
                      className={styles.previewBtn}
                      title="Test long break sound"
                    >
                      Preview
                    </button>
                  </div>
                </>
              )}

              <div className={styles.categoryResetRow}>
                <button
                  type="button"
                  onClick={() => onResetCategory('sound')}
                  className={styles.resetCategoryBtn}
                >
                  Reset Sound Preferences to Defaults
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 4: NOTIFICATIONS
              ======================================================== */}
          {activeTab === 'notifications' && (
            <div className={styles.tabPane} role="tabpanel">
              <div className={styles.paneDescription}>
                Receive browser alerts when timers finish even if another tab or app is active.
              </div>

              <div className={styles.permissionCard}>
                <div className={styles.permissionStatusRow}>
                  <span className={styles.permissionLabel}>Browser Permission:</span>
                  <span
                    className={`${styles.permissionBadge} ${
                      permissionState === 'granted'
                        ? styles.permGranted
                        : permissionState === 'denied'
                        ? styles.permDenied
                        : styles.permDefault
                    }`}
                  >
                    {permissionState.toUpperCase()}
                  </span>
                </div>

                {permissionState !== 'granted' && permissionState !== 'denied' && (
                  <button
                    type="button"
                    onClick={handleRequestPermission}
                    className={styles.requestPermBtn}
                  >
                    Grant Notification Permission
                  </button>
                )}

                {permissionState === 'denied' && (
                  <div className={styles.deniedNotice}>
                    Notifications are blocked in your browser settings. To enable alerts, allow notifications for this site in your browser URL bar.
                  </div>
                )}
              </div>

              <div className={styles.rowItem}>
                <div>
                  <span className={styles.rowTitle}>Enable Web Notifications</span>
                  <span className={styles.rowDesc}>Show desktop alert upon timer completion</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notificationsEnabled && permissionState === 'granted'}
                  disabled={permissionState !== 'granted'}
                  onChange={(e) => onUpdateSettings({ notificationsEnabled: e.target.checked })}
                  className={styles.toggleCheckbox}
                  aria-label="Toggle notifications"
                />
              </div>

              {settings.notificationsEnabled && permissionState === 'granted' && (
                <>
                  <div className={styles.rowItem}>
                    <div>
                      <span className={styles.rowTitle}>Focus Completion Notification</span>
                      <span className={styles.rowDesc}>Alert when a deep work session ends</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.focusNotificationEnabled}
                      onChange={(e) => onUpdateSettings({ focusNotificationEnabled: e.target.checked })}
                      className={styles.toggleCheckbox}
                      aria-label="Toggle focus completion notification"
                    />
                  </div>

                  <div className={styles.rowItem}>
                    <div>
                      <span className={styles.rowTitle}>Break Completion Notification</span>
                      <span className={styles.rowDesc}>Alert when a rest break concludes</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.breakNotificationEnabled}
                      onChange={(e) => onUpdateSettings({ breakNotificationEnabled: e.target.checked })}
                      className={styles.toggleCheckbox}
                      aria-label="Toggle break completion notification"
                    />
                  </div>

                  <div className={styles.testNotificationRow}>
                    <button
                      type="button"
                      onClick={handleTestNotification}
                      className={styles.previewBtn}
                    >
                      {testNotificationSent ? '✓ Alert Triggered' : 'Send Test Notification'}
                    </button>
                  </div>
                </>
              )}

              <div className={styles.categoryResetRow}>
                <button
                  type="button"
                  onClick={() => onResetCategory('notifications')}
                  className={styles.resetCategoryBtn}
                >
                  Reset Notification Preferences to Defaults
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 5: APPEARANCE
              ======================================================== */}
          {activeTab === 'appearance' && (
            <div className={styles.tabPane} role="tabpanel">
              <div className={styles.paneDescription}>
                Fine-tune theme palette and canvas atmospheric depth. Updates live immediately.
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="pref-theme" className={styles.label}>
                  Color Theme
                </label>
                <select
                  id="pref-theme"
                  value={settings.theme}
                  onChange={(e) => onUpdateSettings({ theme: e.target.value as ColorTheme })}
                  className={styles.selectInput}
                >
                  <option value="DARK_DEEP">Obsidian Deep (Dark)</option>
                  <option value="LIGHT_PAPER">Crisp Paper (Light)</option>
                  <option value="SYSTEM">Follow System Theme</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="pref-bg-style" className={styles.label}>
                  Canvas Atmosphere
                </label>
                <select
                  id="pref-bg-style"
                  value={settings.backgroundStyle}
                  onChange={(e) => onUpdateSettings({ backgroundStyle: e.target.value as BackgroundStyle })}
                  className={styles.selectInput}
                >
                  <option value="OBSIDIAN_PURE">Solid Minimal Canvas</option>
                  <option value="SUBTLE_ATMOSPHERE">Soft Ambient Depth</option>
                  <option value="SUBTLE_GRAIN">Subtle Micro-Texture</option>
                </select>
              </div>

              <div className={styles.categoryResetRow}>
                <button
                  type="button"
                  onClick={() => onResetCategory('appearance')}
                  className={styles.resetCategoryBtn}
                >
                  Reset Appearance to Defaults
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 6: BEHAVIOR & DISPLAY
              ======================================================== */}
          {activeTab === 'behavior' && (
            <div className={styles.tabPane} role="tabpanel">
              <div className={styles.paneDescription}>
                Display options and confirmation guards for accidental clicks.
              </div>

              <div className={styles.rowItem}>
                <div>
                  <span className={styles.rowTitle}>Show Cycle Indicator Dots</span>
                  <span className={styles.rowDesc}>Display ● ○ ○ ○ session indicators in controls</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.showSessionDots}
                  onChange={(e) => onUpdateSettings({ showSessionDots: e.target.checked })}
                  className={styles.toggleCheckbox}
                  aria-label="Toggle cycle indicator dots"
                />
              </div>

              <div className={styles.rowItem}>
                <div>
                  <span className={styles.rowTitle}>Show Mode Navigation</span>
                  <span className={styles.rowDesc}>Display mode tabs in the top header</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.showModeTabs}
                  onChange={(e) => onUpdateSettings({ showModeTabs: e.target.checked })}
                  className={styles.toggleCheckbox}
                  aria-label="Toggle mode navigation tabs"
                />
              </div>

              <div className={styles.rowItem}>
                <div>
                  <span className={styles.rowTitle}>Show Remaining Time in Window Title</span>
                  <span className={styles.rowDesc}>Keep browser tab title synced with countdown</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.showRemainingInTitle}
                  onChange={(e) => onUpdateSettings({ showRemainingInTitle: e.target.checked })}
                  className={styles.toggleCheckbox}
                  aria-label="Toggle remaining time in window title"
                />
              </div>

              <div className={styles.rowItem}>
                <div>
                  <span className={styles.rowTitle}>Confirm Before Resetting Active Timer</span>
                  <span className={styles.rowDesc}>Prevents accidental resets during running focus sessions</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.confirmReset}
                  onChange={(e) => onUpdateSettings({ confirmReset: e.target.checked })}
                  className={styles.toggleCheckbox}
                  aria-label="Toggle confirm reset"
                />
              </div>

              <div className={styles.rowItem}>
                <div>
                  <span className={styles.rowTitle}>Confirm Before Skipping Active Session</span>
                  <span className={styles.rowDesc}>Prevents accidental skips during active focus</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.confirmSkip}
                  onChange={(e) => onUpdateSettings({ confirmSkip: e.target.checked })}
                  className={styles.toggleCheckbox}
                  aria-label="Toggle confirm skip"
                />
              </div>

              <div className={styles.rowItem}>
                <div>
                  <span className={styles.rowTitle}>Keep Display Awake (Wake Lock)</span>
                  <span className={styles.rowDesc}>Prevents computer monitor from sleeping during focus</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.keepScreenAwake}
                  onChange={(e) => onUpdateSettings({ keepScreenAwake: e.target.checked })}
                  className={styles.toggleCheckbox}
                  aria-label="Toggle Screen Wake Lock"
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="pref-timer-format" className={styles.label}>
                  Timer Display Format
                </label>
                <select
                  id="pref-timer-format"
                  value={settings.timerFormat}
                  onChange={(e) => onUpdateSettings({ timerFormat: e.target.value as TimerFormatPreference })}
                  className={styles.selectInput}
                >
                  <option value="AUTO">Automatic (MM:SS, adds hours if &gt; 60m)</option>
                  <option value="MM_SS">Always MM:SS</option>
                  <option value="HH_MM_SS">Always HH:MM:SS</option>
                </select>
              </div>

              <div className={styles.categoryResetRow}>
                <button
                  type="button"
                  onClick={() => onResetCategory('behavior')}
                  className={styles.resetCategoryBtn}
                >
                  Reset Behavior to Defaults
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 7: SHORTCUTS
              ======================================================== */}
          {activeTab === 'shortcuts' && (
            <div className={styles.tabPane} role="tabpanel">
              <div className={styles.paneDescription}>
                Fast keyboard hotkeys. Inactive while typing inside text fields.
              </div>

              <div className={styles.rowItem}>
                <div>
                  <span className={styles.rowTitle}>Enable Keyboard Shortcuts</span>
                  <span className={styles.rowDesc}>Allow global hotkeys to control timer</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.keyboardShortcutsEnabled}
                  onChange={(e) => onUpdateSettings({ keyboardShortcutsEnabled: e.target.checked })}
                  className={styles.toggleCheckbox}
                  aria-label="Toggle keyboard shortcuts"
                />
              </div>

              {settings.keyboardShortcutsEnabled && (
                <>
                  <div className={styles.rowItem}>
                    <div>
                      <span className={styles.rowTitle}>Spacebar Toggles Start / Pause</span>
                      <span className={styles.rowDesc}>Quick start/pause/resume via Space</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.spaceToStartPause}
                      onChange={(e) => onUpdateSettings({ spaceToStartPause: e.target.checked })}
                      className={styles.toggleCheckbox}
                      aria-label="Toggle Spacebar start/pause"
                    />
                  </div>

                  <div className={styles.shortcutsTable}>
                    <div className={styles.shortcutRow}>
                      <span className={styles.shortcutKey}>Space</span>
                      <span className={styles.shortcutDesc}>Start / Pause / Resume</span>
                    </div>
                    <div className={styles.shortcutRow}>
                      <span className={styles.shortcutKey}>R</span>
                      <span className={styles.shortcutDesc}>Reset session to full duration</span>
                    </div>
                    <div className={styles.shortcutRow}>
                      <span className={styles.shortcutKey}>S</span>
                      <span className={styles.shortcutDesc}>Skip to next session</span>
                    </div>
                    <div className={styles.shortcutRow}>
                      <span className={styles.shortcutKey}>F</span>
                      <span className={styles.shortcutDesc}>Toggle Fullscreen mode</span>
                    </div>
                    <div className={styles.shortcutRow}>
                      <span className={styles.shortcutKey}>,</span>
                      <span className={styles.shortcutDesc}>Open preferences</span>
                    </div>
                    <div className={styles.shortcutRow}>
                      <span className={styles.shortcutKey}>M</span>
                      <span className={styles.shortcutDesc}>Mute / unmute sound</span>
                    </div>
                    <div className={styles.shortcutRow}>
                      <span className={styles.shortcutKey}>Esc</span>
                      <span className={styles.shortcutDesc}>Close overlay or exit fullscreen</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ========================================================
              TAB 8: DATA & STORAGE
              ======================================================== */}
          {activeTab === 'data' && (
            <div className={styles.tabPane} role="tabpanel">
              <div className={styles.paneDescription}>
                Local-first offline storage. Manage settings and stored session analytics.
              </div>

              <div className={styles.dataCard}>
                <div className={styles.dataCardTitle}>Private Local Storage</div>
                <div className={styles.dataCardDesc}>
                  Your preferences, focus session records, and streaks are stored strictly on your device. Zero external servers, zero tracking.
                </div>
              </div>

              <div className={styles.actionCard}>
                <div className={styles.actionCardMeta}>
                  <span className={styles.rowTitle}>Reset All Preferences</span>
                  <span className={styles.rowDesc}>
                    Restores all customization settings to initial factory defaults. Your focus statistics, daily counts, and streaks are safely preserved.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onResetSettings}
                  className={styles.outlineBtn}
                >
                  Reset Settings
                </button>
              </div>

              <div className={`${styles.actionCard} ${styles.dangerCard}`}>
                <div className={styles.actionCardMeta}>
                  <span className={styles.dangerTitle}>Clear All Application Data</span>
                  <span className={styles.rowDesc}>
                    Permanently deletes all stored statistics, streaks, session history, and settings.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowConfirmResetData(true)}
                  className={styles.dangerBtn}
                >
                  Clear All Data
                </button>
              </div>

              {/* Destructive Action Modal Confirmation */}
              {showConfirmResetData && (
                <div className={styles.confirmOverlay}>
                  <div className={styles.confirmBox}>
                    <h4 className={styles.confirmTitle}>Confirm Full Data Reset</h4>
                    <p className={styles.confirmText}>
                      This will erase your lifetime focus history, streaks, and all saved preferences. This action cannot be undone.
                    </p>
                    <div className={styles.confirmBtns}>
                      <button
                        type="button"
                        onClick={() => setShowConfirmResetData(false)}
                        className={styles.cancelBtn}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={onResetData}
                        className={styles.dangerConfirmBtn}
                      >
                        Erase Everything
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
