// ============================================================
// DaggersApp — Master view for 4 PARA SF 90-Day Tracker
// Handles Dashboard, Programme Curriculum, Analytics, and Settings
// ============================================================

import { useState, useCallback, useEffect } from 'react';
import styles from './DaggersApp.module.css';
import './DaggersApp.css';
import { useDaggers } from './hooks/useDaggers';
import { DaggersHeader, type DaggersTab } from './components/DaggersHeader/DaggersHeader';
import { DayGrid } from './components/DayGrid/DayGrid';
import { DayDetail } from './components/DayDetail/DayDetail';
import { Sidebar } from './components/Sidebar/Sidebar';
import { ProgrammePage } from './components/ProgrammePage/ProgrammePage';
import { AnalyticsPage } from './components/AnalyticsPage/AnalyticsPage';
import { SettingsPage } from './components/SettingsPage/SettingsPage';
import { AcademyPage } from './components/AcademyPage/AcademyPage';
import { ExerciseLibraryPage } from './components/ExerciseLibraryPage/ExerciseLibraryPage';
import { AssessmentsPage } from './components/AssessmentsPage/AssessmentsPage';
import { subscribeToChronosUpdates, type FocusIntent } from './services/chronosIntegrationService';
import { syncWithChronosSessions } from './storageService';

export interface DaggersAppProps {
  onSwitchToTimer?: () => void;
  onLaunchFocusSession?: (intent: FocusIntent) => void;
  isTimerRunning?: boolean;
  remainingMs?: number;
}

export function DaggersApp({
  onSwitchToTimer,
  onLaunchFocusSession,
  isTimerRunning,
  remainingMs = 0,
}: DaggersAppProps = {}) {
  const {
    store,
    days,
    config,
    selectedDay,
    currentDayNumber,
    overallProgress,
    selectDay,
    updateDay,
    setStore,
  } = useDaggers();

  const [activeTab, setActiveTab] = useState<DaggersTab>('DASHBOARD');

  // Real-time synchronization with CHRONOS focus sessions
  useEffect(() => {
    const unsubscribe = subscribeToChronosUpdates(() => {
      setStore((prev) => syncWithChronosSessions(prev));
    });
    return () => {
      unsubscribe();
    };
  }, [setStore]);

  const todayEntry = days.find((d) => d.dayNumber === currentDayNumber);
  const todayFocusMinutes = todayEntry?.chronosFocusMinutes ?? 0;

  // If a day is selected, display that day; otherwise default to today (or day 1 if not started)
  const displayDayNumber = selectedDay ?? (currentDayNumber >= 1 ? Math.min(currentDayNumber, 90) : 1);
  const selectedEntry = days.find((d) => d.dayNumber === displayDayNumber);

  const handleUpdate = useCallback(
    (patch: Parameters<typeof updateDay>[1]) => {
      updateDay(displayDayNumber, patch);
    },
    [displayDayNumber, updateDay],
  );

  return (
    <div className={styles.shell} data-daggers="true">
      <DaggersHeader
        config={config}
        currentDayNumber={currentDayNumber}
        overallProgress={overallProgress}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onSwitchToTimer={onSwitchToTimer}
        isTimerRunning={isTimerRunning}
        remainingMs={remainingMs}
      />

      {activeTab === 'DASHBOARD' && (
        <div className={styles.content}>
          {/* Left sidebar */}
          <aside className={styles.sidebar}>
            <Sidebar
              days={days}
              currentDayNumber={currentDayNumber}
              todayFocusMinutes={todayFocusMinutes}
            />
          </aside>

          {/* Main operational panel */}
          <main className={styles.main}>
            {/* 90-day interactive grid */}
            <DayGrid
              days={days}
              selectedDay={displayDayNumber}
              currentDayNumber={currentDayNumber}
              onSelectDay={selectDay}
            />

            {/* Day detail panel connected to daily mission curriculum */}
            <DayDetail
              entry={selectedEntry}
              dayNumber={displayDayNumber}
              onUpdate={handleUpdate}
              onLaunchFocusSession={onLaunchFocusSession}
            />
          </main>
        </div>
      )}

      {activeTab === 'PROGRAMME' && (
        <main className={styles.main} style={{ overflowY: 'auto' }}>
          <ProgrammePage currentDayNumber={currentDayNumber} />
        </main>
      )}

      {activeTab === 'ACADEMY' && (
        <main className={styles.main} style={{ overflowY: 'auto' }}>
          <AcademyPage
            days={days}
            onUpdateDay={updateDay}
            onLaunchFocusSession={onLaunchFocusSession}
          />
        </main>
      )}

      {activeTab === 'EXERCISES' && (
        <main className={styles.main} style={{ overflowY: 'auto' }}>
          <ExerciseLibraryPage />
        </main>
      )}

      {activeTab === 'ASSESSMENTS' && (
        <main className={styles.main} style={{ overflowY: 'auto' }}>
          <AssessmentsPage days={days} currentDayNumber={currentDayNumber} />
        </main>
      )}

      {activeTab === 'ANALYTICS' && (
        <main className={styles.main} style={{ overflowY: 'auto' }}>
          <AnalyticsPage days={days} currentDayNumber={currentDayNumber} />
        </main>
      )}

      {activeTab === 'SETTINGS' && (
        <main className={styles.main} style={{ overflowY: 'auto' }}>
          <SettingsPage store={store} onStoreChange={setStore} />
        </main>
      )}
    </div>
  );
}
