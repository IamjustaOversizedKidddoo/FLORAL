// ============================================================
// ASSESSMENTS PAGE — Structured Weekly Debriefs & Phase Milestones
// ============================================================

import { useState } from 'react';
import styles from './AssessmentsPage.module.css';
import type { DayEntry } from '../../types';
import {
  computeWeeklyReport,
  computePhaseMilestoneReport,
  type WeeklyAssessmentReport,
  type PhaseMilestoneReport,
} from '../../services/weeklyAssessmentService';

interface AssessmentsPageProps {
  days: DayEntry[];
  currentDayNumber: number;
}

export function AssessmentsPage({ days, currentDayNumber }: AssessmentsPageProps) {
  const currentWeek = Math.max(1, Math.min(Math.ceil(currentDayNumber / 7), 13));
  const [selectedView, setSelectedView] = useState<'WEEKLY' | 'PHASE_1' | 'PHASE_2' | 'PHASE_3'>('WEEKLY');
  const [selectedWeek, setSelectedWeek] = useState<number>(currentWeek);

  const weeklyReport: WeeklyAssessmentReport = computeWeeklyReport(selectedWeek, days);
  const phase1Report: PhaseMilestoneReport = computePhaseMilestoneReport('FOUNDATION', days);
  const phase2Report: PhaseMilestoneReport = computePhaseMilestoneReport('HARDENING', days);
  const phase3Report: PhaseMilestoneReport = computePhaseMilestoneReport('OPERATOR', days);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C4A882" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          Academy Assessments & Instructor Reports
        </h1>
        <p className={styles.subtitle}>
          Verified assessment reviews every 7 days and comprehensive phase milestones on Days 30, 60, and 90. Performance metrics are computed from verified logged training, quizzes, and mental challenge submissions.
        </p>
      </header>

      {/* Navigation selector */}
      <div className={styles.navRow}>
        <button
          type="button"
          className={`${styles.tabBtn} ${selectedView === 'WEEKLY' ? styles.tabBtnActive : ''}`}
          onClick={() => setSelectedView('WEEKLY')}
        >
          Weekly Debriefs (1–13)
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${selectedView === 'PHASE_1' ? styles.tabBtnActive : ''}`}
          onClick={() => setSelectedView('PHASE_1')}
        >
          Phase I Milestone (Day 30)
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${selectedView === 'PHASE_2' ? styles.tabBtnActive : ''}`}
          onClick={() => setSelectedView('PHASE_2')}
        >
          Phase II Milestone (Day 60)
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${selectedView === 'PHASE_3' ? styles.tabBtnActive : ''}`}
          onClick={() => setSelectedView('PHASE_3')}
        >
          Phase III Capstone (Day 90)
        </button>
      </div>

      {selectedView === 'WEEKLY' && (
        <>
          {/* Week picker */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {Array.from({ length: 13 }, (_, i) => i + 1).map((w) => (
              <button
                key={w}
                type="button"
                className={`${styles.tabBtn} ${selectedWeek === w ? styles.tabBtnActive : ''}`}
                onClick={() => setSelectedWeek(w)}
              >
                Week {w}
              </button>
            ))}
          </div>

          {/* Weekly Report Card */}
          <article className={styles.reportCard}>
            <div className={styles.reportHeader}>
              <div>
                <div className={styles.reportTitle}>Week {weeklyReport.weekNumber} Assessment Debrief</div>
                <div className={styles.reportSubtitle}>
                  Covering Days {weeklyReport.startDay} through {weeklyReport.endDay}
                </div>
              </div>

              <span
                className={`${styles.statusBadge} ${
                  weeklyReport.isPassingGrade ? styles.statusGraduated : styles.statusRemedial
                }`}
              >
                {weeklyReport.isPassingGrade ? 'Satisfactory Standard' : 'Needs Remediation'}
              </span>
            </div>

            {/* Metrics */}
            <div className={styles.metricsGrid}>
              <div className={styles.metricItem}>
                <div className={styles.metricValue}>{weeklyReport.completionRatePercent}%</div>
                <div className={styles.metricLabel}>Completion Rate</div>
              </div>
              <div className={styles.metricItem}>
                <div className={styles.metricValue}>{weeklyReport.averageScore} / 100</div>
                <div className={styles.metricLabel}>Average Efficiency Score</div>
              </div>
              <div className={styles.metricItem}>
                <div className={styles.metricValue}>{weeklyReport.quizzesPassed} / 7</div>
                <div className={styles.metricLabel}>Knowledge Quizzes Passed</div>
              </div>
              <div className={styles.metricItem}>
                <div className={styles.metricValue}>{weeklyReport.mentalChallengesPassed} / 7</div>
                <div className={styles.metricLabel}>Mental Challenges Passed</div>
              </div>
              <div className={styles.metricItem}>
                <div className={styles.metricValue}>{weeklyReport.ssbExercisesCompleted}</div>
                <div className={styles.metricLabel}>SSB Exercises Submitted</div>
              </div>
              <div className={styles.metricItem}>
                <div className={styles.metricValue}>{weeklyReport.totalFocusMinutes}m</div>
                <div className={styles.metricLabel}>CHRONOS Focus Time</div>
              </div>
            </div>

            {/* Analysis */}
            <div className={styles.analysisSection}>
              <div className={styles.analysisBox}>
                <div className={`${styles.boxTitle} ${styles.strengthTitle}`}>Observed Strengths</div>
                <ul className={styles.bulletList}>
                  {weeklyReport.strengths.length > 0 ? (
                    weeklyReport.strengths.map((s, i) => <li key={i}>{s}</li>)
                  ) : (
                    <li>No verified strengths recorded yet for this week.</li>
                  )}
                </ul>
              </div>

              <div className={styles.analysisBox}>
                <div className={`${styles.boxTitle} ${styles.weaknessTitle}`}>Areas for Improvement</div>
                <ul className={styles.bulletList}>
                  {weeklyReport.weaknesses.length > 0 ? (
                    weeklyReport.weaknesses.map((w, i) => <li key={i}>{w}</li>)
                  ) : (
                    <li>No critical deficiencies detected for this training block.</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Recommendations */}
            <div className={styles.remedialBox}>
              <div className={styles.remedialTitle}>Virtual Instructor Prescriptions</div>
              <ul className={styles.bulletList}>
                {weeklyReport.remedialRecommendations.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </article>
        </>
      )}

      {/* Phase I Milestone */}
      {selectedView === 'PHASE_1' && (
        <article className={styles.reportCard}>
          <div className={styles.reportHeader}>
            <div>
              <div className={styles.reportTitle}>{phase1Report.phaseTitle}</div>
              <div className={styles.reportSubtitle}>Foundation Diagnostic Assessment (Days 1–30)</div>
            </div>

            <span
              className={`${styles.statusBadge} ${
                phase1Report.overallStatus === 'GRADUATED'
                  ? styles.statusGraduated
                  : phase1Report.overallStatus === 'QUALIFIED'
                  ? styles.statusQualified
                  : styles.statusRemedial
              }`}
            >
              {phase1Report.overallStatus}
            </span>
          </div>

          <div className={styles.metricsGrid}>
            <div className={styles.metricItem}>
              <div className={styles.metricValue}>
                {phase1Report.completedDays} / {phase1Report.totalDays}
              </div>
              <div className={styles.metricLabel}>Days Completed</div>
            </div>
            <div className={styles.metricItem}>
              <div className={styles.metricValue}>{phase1Report.averageScore}%</div>
              <div className={styles.metricLabel}>Phase Efficiency</div>
            </div>
            <div className={styles.metricItem}>
              <div className={styles.metricValue}>{phase1Report.knowledgeMasteryCount}</div>
              <div className={styles.metricLabel}>Lessons Fully Mastered</div>
            </div>
            <div className={styles.metricItem}>
              <div className={styles.metricValue}>{phase1Report.mentalAptitudeAvg}%</div>
              <div className={styles.metricLabel}>Mental Aptitude Avg</div>
            </div>
          </div>

          <div className={styles.analysisBox}>
            <div className={styles.boxTitle} style={{ color: '#C4A882' }}>
              Physical Progression Summary
            </div>
            <div style={{ color: '#D6CEBE', fontSize: '0.875rem', lineHeight: '1.5' }}>
              {phase1Report.physicalProgressionSummary}
            </div>
          </div>

          <div className={styles.remedialBox}>
            <div className={styles.remedialTitle}>Phase II Transition Guidance</div>
            <ul className={styles.bulletList}>
              {phase1Report.recommendations.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        </article>
      )}

      {/* Phase II Milestone */}
      {selectedView === 'PHASE_2' && (
        <article className={styles.reportCard}>
          <div className={styles.reportHeader}>
            <div>
              <div className={styles.reportTitle}>{phase2Report.phaseTitle}</div>
              <div className={styles.reportSubtitle}>Hardening Volume Assessment (Days 31–60)</div>
            </div>

            <span
              className={`${styles.statusBadge} ${
                phase2Report.overallStatus === 'GRADUATED'
                  ? styles.statusGraduated
                  : phase2Report.overallStatus === 'QUALIFIED'
                  ? styles.statusQualified
                  : styles.statusRemedial
              }`}
            >
              {phase2Report.overallStatus}
            </span>
          </div>

          <div className={styles.metricsGrid}>
            <div className={styles.metricItem}>
              <div className={styles.metricValue}>
                {phase2Report.completedDays} / {phase2Report.totalDays}
              </div>
              <div className={styles.metricLabel}>Days Completed</div>
            </div>
            <div className={styles.metricItem}>
              <div className={styles.metricValue}>{phase2Report.averageScore}%</div>
              <div className={styles.metricLabel}>Phase Efficiency</div>
            </div>
            <div className={styles.metricItem}>
              <div className={styles.metricValue}>{phase2Report.knowledgeMasteryCount}</div>
              <div className={styles.metricLabel}>Lessons Fully Mastered</div>
            </div>
            <div className={styles.metricItem}>
              <div className={styles.metricValue}>{phase2Report.mentalAptitudeAvg}%</div>
              <div className={styles.metricLabel}>Mental Aptitude Avg</div>
            </div>
          </div>

          <div className={styles.analysisBox}>
            <div className={styles.boxTitle} style={{ color: '#C4A882' }}>
              Physical Progression Summary
            </div>
            <div style={{ color: '#D6CEBE', fontSize: '0.875rem', lineHeight: '1.5' }}>
              {phase2Report.physicalProgressionSummary}
            </div>
          </div>

          <div className={styles.remedialBox}>
            <div className={styles.remedialTitle}>Phase III Transition Guidance</div>
            <ul className={styles.bulletList}>
              {phase2Report.recommendations.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        </article>
      )}

      {/* Phase III Capstone */}
      {selectedView === 'PHASE_3' && (
        <article className={styles.reportCard}>
          <div className={styles.reportHeader}>
            <div>
              <div className={styles.reportTitle}>{phase3Report.phaseTitle}</div>
              <div className={styles.reportSubtitle}>Capstone Operator Readiness (Days 61–90)</div>
            </div>

            <span
              className={`${styles.statusBadge} ${
                phase3Report.overallStatus === 'GRADUATED'
                  ? styles.statusGraduated
                  : phase3Report.overallStatus === 'QUALIFIED'
                  ? styles.statusQualified
                  : styles.statusRemedial
              }`}
            >
              {phase3Report.overallStatus}
            </span>
          </div>

          <div className={styles.metricsGrid}>
            <div className={styles.metricItem}>
              <div className={styles.metricValue}>
                {phase3Report.completedDays} / {phase3Report.totalDays}
              </div>
              <div className={styles.metricLabel}>Days Completed</div>
            </div>
            <div className={styles.metricItem}>
              <div className={styles.metricValue}>{phase3Report.averageScore}%</div>
              <div className={styles.metricLabel}>Phase Efficiency</div>
            </div>
            <div className={styles.metricItem}>
              <div className={styles.metricValue}>{phase3Report.knowledgeMasteryCount}</div>
              <div className={styles.metricLabel}>Lessons Fully Mastered</div>
            </div>
            <div className={styles.metricItem}>
              <div className={styles.metricValue}>{phase3Report.mentalAptitudeAvg}%</div>
              <div className={styles.metricLabel}>Mental Aptitude Avg</div>
            </div>
          </div>

          <div className={styles.analysisBox}>
            <div className={styles.boxTitle} style={{ color: '#C4A882' }}>
              Final 90-Day Cumulative Assessment
            </div>
            <div style={{ color: '#D6CEBE', fontSize: '0.875rem', lineHeight: '1.5' }}>
              {phase3Report.physicalProgressionSummary}
            </div>
          </div>

          <div className={styles.remedialBox}>
            <div className={styles.remedialTitle}>Post-Academy Development Road Map</div>
            <ul className={styles.bulletList}>
              {phase3Report.recommendations.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        </article>
      )}
    </div>
  );
}
