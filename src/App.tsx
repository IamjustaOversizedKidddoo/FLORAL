import { useState, useCallback, useEffect } from 'react';
import { useTimer } from './hooks/useTimer';
import { useIdleTimer } from './hooks/useIdleTimer';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useDocumentHead } from './hooks/useDocumentHead';
import { useWakeLock } from './hooks/useWakeLock';
import { Header } from './components/Header/Header';
import { TimerHero } from './components/TimerHero/TimerHero';
import { Controls } from './components/Controls/Controls';
import { Footer } from './components/Footer/Footer';
import { LiveAnnouncer } from './components/LiveAnnouncer/LiveAnnouncer';
import { SettingsModal } from './components/SettingsModal/SettingsModal';
import { StatsModal } from './components/StatsModal/StatsModal';
import { Quotes } from './components/Quotes/Quotes';
import { DaggersApp } from './features/daggers/DaggersApp';
import styles from './App.module.css';

// Fullscreen API with cross-browser prefixes
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(console.warn);
  } else {
    document.exitFullscreen().catch(console.warn);
  }
}

export default function App() {
  const { state, actions } = useTimer();
  const [activeView, setActiveView] = useState<'TIMER' | 'DAGGERS'>('TIMER');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const isRunning = state.status === 'RUNNING';

  // Support direct URL query parameter (e.g. ?view=daggers)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'daggers') {
      setActiveView('DAGGERS');
    }
  }, []);

  // Launch a focus session initiated from a Daggers task
  const handleLaunchFocusFromTracker = useCallback((_intent: { task: string; subject?: string; dayNumber: number }) => {
    setActiveView('TIMER');
    if (state.mode !== 'FOCUS') {
      actions.changeMode('FOCUS');
    }
    if (state.status === 'IDLE' || state.status === 'COMPLETED') {
      actions.start();
    }
  }, [state.mode, state.status, actions]);

  // Screen wake lock when enabled and timer is running
  useWakeLock(state.settings.keepScreenAwake, isRunning);

  // Idle detection — active only when timer is running on timer screen
  const { isIdle } = useIdleTimer(isRunning && activeView === 'TIMER');

  // Document title + dynamic favicon sync
  useDocumentHead({
    remainingMs: state.remainingMs,
    totalDurationMs: state.totalDurationMs,
    mode: state.mode,
    status: state.status,
    showRemainingInTitle: state.settings.showRemainingInTitle,
  });

  // Track Fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Primary action toggle: Start -> Pause -> Resume
  const handleStartPause = useCallback(() => {
    if (isRunning) {
      actions.pause();
    } else if (state.status === 'PAUSED') {
      actions.resume();
    } else if (state.status === 'IDLE' || state.status === 'COMPLETED') {
      actions.start();
    }
  }, [isRunning, state.status, actions]);

  const handleReset = useCallback(() => {
    if (state.settings.confirmReset && isRunning) {
      const confirmed = window.confirm('Reset the active session?');
      if (!confirmed) return;
    }
    actions.reset();
  }, [state.settings.confirmReset, isRunning, actions]);

  const handleSkip = useCallback(() => {
    if (state.settings.confirmSkip && isRunning) {
      const confirmed = window.confirm('Skip the active session?');
      if (!confirmed) return;
    }
    actions.skip();
  }, [state.settings.confirmSkip, isRunning, actions]);

  const handleMute = useCallback(() => {
    actions.updateSettings({ soundEnabled: !state.settings.soundEnabled });
  }, [actions, state.settings.soundEnabled]);

  const handleEscape = useCallback(() => {
    if (helpOpen) { setHelpOpen(false); return; }
    if (settingsOpen) { setSettingsOpen(false); return; }
    if (statsOpen) { setStatsOpen(false); }
  }, [helpOpen, settingsOpen, statsOpen]);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onStartPause: handleStartPause,
    onReset: handleReset,
    onSkip: handleSkip,
    onFullscreen: toggleFullscreen,
    onSettings: () => setSettingsOpen((v) => !v),
    onHelp: () => setHelpOpen((v) => !v),
    onMute: handleMute,
    onEscape: handleEscape,
    disabled: settingsOpen || statsOpen || helpOpen,
    shortcutsEnabled: state.settings.keyboardShortcutsEnabled,
    spaceToStartPause: state.settings.spaceToStartPause,
  });

  const showCursorHidden = isIdle;
  const backgroundClass = state.settings.backgroundStyle === 'SUBTLE_GRAIN' ? styles.grainBackground : '';
  const isAtmosphereRunning = state.settings.backgroundStyle === 'SUBTLE_ATMOSPHERE' && isRunning;

  return (
    <div
      className={`${styles.appShell} ${backgroundClass} ${
        isAtmosphereRunning ? styles.runningAtmosphere : ''
      } ${settingsOpen || statsOpen ? styles.receding : ''} ${
        showCursorHidden ? styles.cursorHidden : ''
      } ${isFullscreen ? styles.fullscreenMode : ''}`}
      id="app-root"
    >
      {/* Accessibility: polite screen reader announcer */}
      <LiveAnnouncer
        status={state.status}
        mode={state.mode}
        remainingMs={state.remainingMs}
      />

      {activeView === 'DAGGERS' ? (
        <div className={styles.daggersContainer}>
          <DaggersApp
            onSwitchToTimer={() => setActiveView('TIMER')}
            onLaunchFocusSession={handleLaunchFocusFromTracker}
            isTimerRunning={isRunning}
            remainingMs={state.remainingMs}
          />
        </div>
      ) : (
        <>
          {/* Top navigation (Mode selector + settings + MIGHTY DAGGERS) */}
          <Header
            mode={state.mode}
            status={state.status}
            isIdle={isIdle}
            showModeTabs={state.settings.showModeTabs}
            onModeChange={actions.changeMode}
            onSettingsOpen={() => setSettingsOpen(true)}
            activeView={activeView}
            onViewChange={setActiveView}
            remainingMs={state.remainingMs}
          />

          {/* Top Right Corner Quotes Widget */}
          <aside
            className={`${styles.topRightQuotes} ${isIdle ? styles.idleHidden : ''}`}
            aria-label="Mindset Quote"
          >
            <Quotes intervalMs={7000} />
          </aside>

          {/* Main hero stage — optical vertical centering */}
          <main className={styles.mainStage} id="timer-main">
            <div className={styles.topSpacer} aria-hidden="true" />
            <div className={styles.heroWrapper}>
              <TimerHero
                remainingMs={state.remainingMs}
                totalDurationMs={state.totalDurationMs}
                mode={state.mode}
                status={state.status}
                timerFormat={state.settings.timerFormat}
              />
            </div>

            <div className={styles.controlsWrapper}>
              <Controls
                status={state.status}
                mode={state.mode}
                completedInCycle={state.completedInCycle}
                sessionsBeforeLongBreak={state.settings.sessionsBeforeLongBreak}
                showSessionDots={state.settings.showSessionDots}
                onStart={actions.start}
                onPause={actions.pause}
                onResume={actions.resume}
                onReset={handleReset}
                onSkip={handleSkip}
              />
            </div>
          </main>

          {/* Bottom ambient status bar */}
          <Footer
            stats={state.stats}
            isIdle={isIdle}
            onFullscreen={toggleFullscreen}
            onStatsOpen={() => setStatsOpen(true)}
          />
        </>
      )}

      {/* Settings Modal Component */}
      <SettingsModal
        isOpen={settingsOpen}
        settings={state.settings}
        onClose={() => setSettingsOpen(false)}
        onUpdateSettings={actions.updateSettings}
        onResetSettings={actions.resetSettings}
        onResetCategory={actions.resetCategory}
        onResetData={actions.resetData}
      />

      {/* Productivity Intelligence Modal */}
      <StatsModal
        isOpen={statsOpen}
        stats={state.stats}
        onClose={() => setStatsOpen(false)}
        onDeleteHistory={actions.deleteHistory}
        onUpdateGoals={actions.updateGoals}
      />
    </div>
  );
}
