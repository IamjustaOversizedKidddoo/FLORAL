// ============================================================
// AnalyticsPage — Pure Recorded Telemetry & Progress Intelligence
// Displays actual performance metrics without manufactured statistics
// ============================================================

import styles from './AnalyticsPage.module.css';
import type { DayEntry } from '../../types';
import { computeProgrammeAnalytics } from '../../services/analyticsService';
import { getChronosHistory, launchChronosTimer } from '../../services/chronosIntegrationService';
import { SSB_ACTIVITY_LABELS, STUDY_SUBJECT_LABELS } from '../../constants';
import { PhaseBadge } from '../PhaseBadge/PhaseBadge';

interface AnalyticsPageProps {
  days: DayEntry[];
  currentDayNumber: number;
}

export function AnalyticsPage({ days, currentDayNumber }: AnalyticsPageProps) {
  const analytics = computeProgrammeAnalytics(days, currentDayNumber);
  const chronosSessions = getChronosHistory().filter((s) => s.mode === 'FOCUS').slice(-10).reverse();

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Operational Analytics</h2>
        <p className={styles.pageSubtitle}>
          Real recorded performance metrics across fitness, SSB battery, academics, and CHRONOS focus sessions.
        </p>
      </div>

      {/* KPI Grid */}
      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Completion Rate</span>
          <span className={styles.kpiValue}>{analytics.dailyCompletionRate}%</span>
          <span className={styles.kpiSub}>
            {analytics.completedDays} of {analytics.elapsedDays} active days passed
          </span>
        </div>

        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Discipline Streak</span>
          <span className={styles.kpiValue}>{analytics.currentStreak}d</span>
          <span className={styles.kpiSub}>Best: {analytics.longestStreak} consecutive days</span>
        </div>

        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Study Volume</span>
          <span className={styles.kpiValue}>{analytics.studyHours}h</span>
          <span className={styles.kpiSub}>{analytics.totalStudyMinutes} recorded study minutes</span>
        </div>

        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>CHRONOS Focus</span>
          <span className={styles.kpiValue}>{analytics.todayFocusMinutes}m</span>
          <span className={styles.kpiSub}>
            {analytics.totalChronosFocusMinutes}m total recorded focus
          </span>
        </div>
      </div>

      {/* Pillar Breakdown Grid */}
      <div className={styles.breakdownGrid}>
        {/* Physical Training */}
        <div className={styles.breakdownCol}>
          <span className={styles.breakdownTitle}>Physical Training</span>
          <div className={styles.statList}>
            <div className={styles.statRow}>
              <span className={styles.statName}>Workout Consistency</span>
              <span className={styles.statVal}>{analytics.workoutConsistencyRate}%</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statName}>Total Run Distance</span>
              <span className={styles.statVal}>{analytics.totalRunDistanceKm} km</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statName}>Total Push-Ups</span>
              <span className={styles.statVal}>{analytics.totalPushUps}</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statName}>Total Pull-Ups</span>
              <span className={styles.statVal}>{analytics.totalPullUps}</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statName}>Total Sit-Ups</span>
              <span className={styles.statVal}>{analytics.totalSitUps}</span>
            </div>
            {analytics.totalSwimmingLaps > 0 && (
              <div className={styles.statRow}>
                <span className={styles.statName}>Swimming Laps</span>
                <span className={styles.statVal}>{analytics.totalSwimmingLaps}</span>
              </div>
            )}
          </div>
        </div>

        {/* SSB Preparation */}
        <div className={styles.breakdownCol}>
          <span className={styles.breakdownTitle}>SSB Battery</span>
          <div className={styles.statList}>
            <div className={styles.statRow}>
              <span className={styles.statName}>Total Battery Sessions</span>
              <span className={styles.statVal}>{analytics.totalSSBSessions}</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statName}>Total SSB Time</span>
              <span className={styles.statVal}>{analytics.totalSSBMinutes}m</span>
            </div>
            {Object.entries(analytics.ssbActivityBreakdown)
              .filter(([_, count]) => count > 0)
              .slice(0, 5)
              .map(([act, count]) => (
                <div key={act} className={styles.statRow}>
                  <span className={styles.statName}>{SSB_ACTIVITY_LABELS[act as keyof typeof SSB_ACTIVITY_LABELS] || act}</span>
                  <span className={styles.statVal}>{count} sessions</span>
                </div>
              ))}
          </div>
        </div>

        {/* Academic Studies */}
        <div className={styles.breakdownCol}>
          <span className={styles.breakdownTitle}>Academics & Strategy</span>
          <div className={styles.statList}>
            <div className={styles.statRow}>
              <span className={styles.statName}>Total Study Time</span>
              <span className={styles.statVal}>{analytics.studyHours} hours</span>
            </div>
            {Object.entries(analytics.studySubjectBreakdown)
              .filter(([_, minutes]) => minutes > 0)
              .slice(0, 5)
              .map(([sub, minutes]) => (
                <div key={sub} className={styles.statRow}>
                  <span className={styles.statName}>{STUDY_SUBJECT_LABELS[sub as keyof typeof STUDY_SUBJECT_LABELS] || sub}</span>
                  <span className={styles.statVal}>{Math.round(minutes / 60 * 10) / 10}h</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* CHRONOS Recent Sessions */}
      <section className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>
            <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="7" cy="7" r="5" />
              <polyline points="7,4 7,7 9,8" />
            </svg>
            CHRONOS Focus Timer Logs (Live Synchronized)
          </div>
          <button
            type="button"
            className={styles.sessionBadge}
            style={{ cursor: 'pointer', background: 'var(--d-accent)', color: '#fff', border: 'none', padding: '4px 10px' }}
            onClick={() => launchChronosTimer('Probation Study Block', 'STUDIES', currentDayNumber)}
          >
            + Launch CHRONOS Session
          </button>
        </div>

        {chronosSessions.length > 0 ? (
          <div className={styles.sessionsList}>
            {chronosSessions.map((session, idx) => (
              <div key={session.id || idx} className={styles.sessionItem}>
                <div className={styles.sessionLeft}>
                  <span className={styles.sessionBadge}>
                    {session.completionType || (session.completed ? 'COMPLETED' : 'SESSION')}
                  </span>
                  <span className={styles.sessionTime}>
                    {new Date(session.completedAt || session.startedAt || 0).toLocaleString([], {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <div className={styles.sessionDuration}>
                  {Math.round((session.actualFocusedDurationSeconds || (session.durationMinutes || 25) * 60) / 60)} min focused
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: 'var(--d-space-4)', textAlign: 'center', color: 'var(--d-text-muted)', fontSize: '0.8rem' }}>
            No CHRONOS focus sessions recorded yet. Launch the CHRONOS Focus Timer to automatically log focused study intervals.
          </div>
        )}
      </section>

      {/* Weekly Progress Breakdown Table */}
      <section className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>Weekly Progress Telemetry (Weeks 1–13)</div>
        </div>

        <div className={styles.weeklyTableContainer}>
          <table className={styles.weeklyTable}>
            <thead>
              <tr>
                <th>Week</th>
                <th>Phase</th>
                <th>Dates</th>
                <th>Completion Rate</th>
                <th>PT Time</th>
                <th>Study Time</th>
                <th>SSB Time</th>
                <th>CHRONOS Focus</th>
              </tr>
            </thead>
            <tbody>
              {analytics.weeklyBreakdown.map((week) => (
                <tr key={week.weekNumber}>
                  <td>
                    <strong>W{String(week.weekNumber).padStart(2, '0')}</strong>
                  </td>
                  <td>
                    <PhaseBadge dayNumber={(week.weekNumber - 1) * 7 + 1} compact />
                  </td>
                  <td style={{ fontSize: '0.75rem', fontFamily: 'var(--d-font-mono)' }}>
                    {week.startDate} → {week.endDate}
                  </td>
                  <td>
                    <div className={styles.weekProgressTrack}>
                      <div
                        className={styles.weekProgressFill}
                        style={{ width: `${week.completionRate}%` }}
                      />
                    </div>
                    <span>{week.completionRate}%</span>
                  </td>
                  <td>{week.totalPTMinutes}m</td>
                  <td>{week.totalStudyMinutes}m</td>
                  <td>{week.totalSSBMinutes}m</td>
                  <td>
                    <strong>{week.chronosFocusMinutes}m</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
