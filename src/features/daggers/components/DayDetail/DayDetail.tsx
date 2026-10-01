// ============================================================
// DayDetail — Daily Mission Interface (5-Step Training Cycle)
// LEARN → PRACTISE → PERFORM → ASSESS → IMPROVE
// Complete educational and assessment engine
// ============================================================

import { useState, useCallback, useMemo } from 'react';
import styles from './DayDetail.module.css';
import type {
  DayEntry,
  PTSession,
  SSBSession,
  DailyReflection,
  MoodRating,
  PhysicalLog,
  StudySession,
} from '../../types';
import { getMissionForDay } from '../../data/curriculumData';
import { PhaseBadge } from '../PhaseBadge/PhaseBadge';
import { type FocusIntent } from '../../services/chronosIntegrationService';
import {
  evaluateLessonQuiz,
  evaluateMentalSubmission,
  evaluateSSBSubmission,
  generateInstructorAssessment,
} from '../../services/assessmentEngine';

export type TrainingCycleStep = 'LEARN' | 'PRACTISE' | 'PERFORM' | 'ASSESS' | 'IMPROVE';

interface DayDetailProps {
  entry: DayEntry | undefined;
  dayNumber: number;
  onUpdate: (patch: Partial<DayEntry>) => void;
  onLaunchFocusSession?: (intent: FocusIntent) => void;
}

export function DayDetail({
  entry,
  dayNumber,
  onUpdate,
  onLaunchFocusSession,
}: DayDetailProps) {
  const [activeCycleStep, setActiveCycleStep] = useState<TrainingCycleStep>('LEARN');
  const [mentalAnswerInput, setMentalAnswerInput] = useState('');
  const [ssbResponseInput, setSsbResponseInput] = useState('');
  const [safetyChecked, setSafetyChecked] = useState(false);
  const [logRpe, setLogRpe] = useState(7);
  const [logDuration, setLogDuration] = useState(45);
  const [logRecovery, setLogRecovery] = useState<'WELL_RESTED' | 'MODERATE' | 'FATIGUED' | 'SORE'>('WELL_RESTED');

  const mission = useMemo(() => getMissionForDay(dayNumber), [dayNumber]);

  const isDisabled = entry?.status === 'LOCKED';
  const score = entry?.completionScore ?? 0;

  // 1. LEARN Quiz Handler
  const handleQuizSelect = useCallback(
    (optionIdx: number) => {
      if (isDisabled) return;
      const sub = evaluateLessonQuiz(mission, optionIdx);
      onUpdate({ lessonSubmission: sub });
    },
    [isDisabled, mission, onUpdate],
  );

  // 2. PRACTISE Workout Logger
  const handleSavePhysicalLog = useCallback(() => {
    if (isDisabled) return;

    const newLog: PhysicalLog = {
      completedExercises: mission.physicalTraining.exercises.map((ex) => ({
        exerciseId: ex.exerciseId,
        setsCompleted: ex.sets,
        repsCompleted: ex.repsOrDuration,
        rpe: logRpe,
      })),
      totalDurationMin: logDuration,
      overallRpe: logRpe,
      recoveryStatus: logRecovery,
      safetyConfirmed: safetyChecked,
      notes: 'Logged via 5-step academy workout logger',
    };

    // Also update backward-compatible pt fields
    const updatedPt: PTSession = {
      ...entry?.pt,
      runTimeMin: logDuration,
      pushUps: mission.physicalTraining.exercises.find((e) => e.exerciseId === 'push_ups')?.sets ? 25 : undefined,
    };

    onUpdate({
      physicalLog: newLog,
      pt: updatedPt,
    });
  }, [isDisabled, mission, logRpe, logDuration, logRecovery, safetyChecked, entry, onUpdate]);

  // 3. PERFORM Mental Challenge Submit
  const handleSubmitMental = useCallback(() => {
    if (isDisabled) return;
    const currentAnswer = mentalAnswerInput || entry?.mentalSubmission?.userAnswer || '';
    const mentalSub = evaluateMentalSubmission(mission, currentAnswer);
    onUpdate({ mentalSubmission: mentalSub });
  }, [isDisabled, mentalAnswerInput, entry, mission, onUpdate]);

  // 3. PERFORM SSB Submit
  const handleSubmitSSB = useCallback(() => {
    if (isDisabled) return;
    const currentText = ssbResponseInput || entry?.ssbSubmission?.userResponse || '';
    const ssbSub = evaluateSSBSubmission(mission, currentText);

    const ssbSession: SSBSession = {
      activities: [mission.ssbAssignment.activity],
      durationMin: mission.ssbAssignment.timeLimitMin,
      notes: currentText,
    };

    onUpdate({
      ssbSubmission: ssbSub,
      ssb: ssbSession,
    });
  }, [isDisabled, ssbResponseInput, entry, mission, onUpdate]);

  // 4. ASSESS Virtual Instructor Trigger
  const handleTriggerAssessment = useCallback(() => {
    if (isDisabled) return;

    const lessonSub = entry?.lessonSubmission || {
      quizAnswerIndex: undefined,
      isQuizPassed: false,
      practicalCompleted: false,
      mastery: 'NOT_STARTED',
    };

    const mentalSub = entry?.mentalSubmission || {
      userAnswer: '',
      score: 0,
      submittedAt: Date.now(),
      instructorFeedback: 'Incomplete mental challenge',
      isCompleted: false,
    };

    const ssbSub = entry?.ssbSubmission || {
      userResponse: '',
      instructorFeedback: 'Incomplete SSB drill',
      isCompleted: false,
    };

    const assessment = generateInstructorAssessment(
      mission,
      lessonSub,
      mentalSub,
      ssbSub,
      entry?.physicalLog,
    );

    // Compute updated completion score
    let compScore = 0;
    if (lessonSub.isQuizPassed) compScore += 25;
    if (mentalSub.isCompleted) compScore += 25;
    if (ssbSub.isCompleted) compScore += 25;
    if (entry?.physicalLog?.safetyConfirmed) compScore += 25;

    onUpdate({
      instructorAssessment: assessment,
      completionScore: compScore,
      status: compScore >= 75 ? 'COMPLETE' : compScore >= 40 ? 'PARTIAL' : 'ACTIVE',
    });
  }, [isDisabled, mission, entry, onUpdate]);

  // 5. IMPROVE Reflection and Habits
  const handleReflectionChange = useCallback(
    (text: string, mood?: MoodRating) => {
      if (isDisabled) return;
      const ref: DailyReflection = {
        text,
        mood: mood ?? entry?.reflection?.mood ?? 4,
        overallRating: mood ?? entry?.reflection?.overallRating ?? 4,
        mentalNote: entry?.reflection?.mentalNote,
      };
      onUpdate({ reflection: ref });
    },
    [isDisabled, entry, onUpdate],
  );

  const toggleHabit = useCallback(
    (habit: string) => {
      if (isDisabled) return;
      const current = entry?.routineHabitsCompleted ?? [];
      const next = current.includes(habit)
        ? current.filter((h) => h !== habit)
        : [...current, habit];
      onUpdate({ routineHabitsCompleted: next });
    },
    [isDisabled, entry, onUpdate],
  );

  const handleMarkStudyCompleted = useCallback(() => {
    if (isDisabled) return;
    const studySession: StudySession = {
      subject: mission.studyTask.subject,
      durationMin: mission.studyTask.durationMin,
      topicsCovered: mission.studyTask.topic,
    };
    onUpdate({
      studies: [...(entry?.studies || []), studySession],
    });
  }, [isDisabled, mission, entry, onUpdate]);

  // Commando Daily Task Manifest Status
  const taskRoster = useMemo(() => {
    const isDoctrineDone = entry?.lessonSubmission?.isQuizPassed ?? false;
    const isPtDone =
      (entry?.physicalLog?.safetyConfirmed ?? false) ||
      Boolean(entry?.pt?.runDistanceKm || entry?.pt?.pushUps || entry?.pt?.runTimeMin);
    const isMentalDone = entry?.mentalSubmission?.isCompleted ?? false;
    const isSsbDone = entry?.ssbSubmission?.isCompleted ?? false;
    const isStudyDone =
      (entry?.studies?.length ?? 0) > 0 ||
      (entry?.chronosFocusMinutes ?? 0) >= (mission.studyTask.durationMin || 30);
    const isHabitsDone =
      (entry?.routineHabitsCompleted?.length ?? 0) >= Math.min(3, mission.routineHabits.length || 3);

    const tasks = [
      {
        id: 'DOCTRINE',
        step: 'LEARN' as TrainingCycleStep,
        category: 'MILITARY DOCTRINE',
        icon: '📖',
        title: mission.learningLesson.title,
        detail: `Domain: ${mission.learningLesson.domain} • Practical drill & verification quiz`,
        isDone: isDoctrineDone,
        actionLabel: isDoctrineDone ? 'Review Lesson' : 'Execute Lesson & Quiz',
      },
      {
        id: 'PT',
        step: 'PRACTISE' as TrainingCycleStep,
        category: 'PHYSICAL CONDITIONING',
        icon: '🏋️‍♂️',
        title: mission.physicalTraining.title,
        detail: `${mission.physicalTraining.prescription}`,
        isDone: isPtDone,
        actionLabel: isPtDone ? 'View Log' : 'Log Physical Training',
      },
      {
        id: 'MENTAL',
        step: 'PERFORM' as TrainingCycleStep,
        category: 'COGNITIVE RESILIENCE',
        icon: '🧠',
        title: mission.mentalChallenge.title,
        detail: `${mission.mentalChallenge.type} drill • ${mission.mentalChallenge.timeLimitSec}s limit`,
        isDone: isMentalDone,
        actionLabel: isMentalDone ? 'View Solution' : 'Solve Scenario',
      },
      {
        id: 'SSB',
        step: 'PERFORM' as TrainingCycleStep,
        category: 'SSB OFFICER EVALUATION',
        icon: '🎖️',
        title: `${mission.ssbAssignment.activity}: ${mission.ssbAssignment.title}`,
        detail: `Timed evaluation • ${mission.ssbAssignment.timeLimitMin} min standard`,
        isDone: isSsbDone,
        actionLabel: isSsbDone ? 'Review Evaluation' : 'Take SSB Drill',
      },
      {
        id: 'STUDY',
        step: 'IMPROVE' as TrainingCycleStep,
        category: 'ACADEMIC SYLLABUS',
        icon: '📚',
        title: `${mission.studyTask.subject}: ${mission.studyTask.topic}`,
        detail: `${mission.studyTask.durationMin} min target • NDA/CDS/AFCAT Syllabus`,
        isDone: isStudyDone,
        actionLabel: isStudyDone ? 'Study Completed' : 'Study Block',
      },
      {
        id: 'HABITS',
        step: 'IMPROVE' as TrainingCycleStep,
        category: 'DISCIPLINE & REVEILLE',
        icon: '🛡️',
        title: 'Daily Commando Routine & Reveille',
        detail: `${entry?.routineHabitsCompleted?.length ?? 0} of ${mission.routineHabits.length} field protocols verified`,
        isDone: isHabitsDone,
        actionLabel: isHabitsDone ? 'Habits Verified' : 'Check Field Protocols',
      },
    ];

    const completedCount = tasks.filter((t) => t.isDone).length;
    return { tasks, completedCount, totalCount: tasks.length };
  }, [entry, mission]);

  return (
    <div className={styles.panel}>
      {/* Day & Mission Briefing Header */}
      <div className={styles.dayHeader}>
        <div className={styles.dayTitle}>
          <span className={styles.dayNumLarge}>DAY {String(dayNumber).padStart(2, '0')}</span>
          <span className={styles.dayDate}>{entry?.date || `Day ${dayNumber}`}</span>
          <PhaseBadge dayNumber={dayNumber} />
        </div>

        <div className={styles.scoreRing}>
          <div className={styles.scoreLabel}>EVALUATION SCORE</div>
          <div style={{ fontFamily: 'var(--d-font-heading, monospace)', fontSize: '1.25rem', color: score >= 75 ? '#81C784' : '#C4A882' }}>
            {score}%
          </div>
        </div>
      </div>

      {isDisabled && (
        <div className={styles.lockedBanner}>
          <span>🔒</span>
          <span>Day {dayNumber} is scheduled for a future training date. Content is available for preview and preparation.</span>
        </div>
      )}

      {/* Mission Briefing Card */}
      <div className={styles.missionCard}>
        <div className={styles.missionTop}>
          <div className={styles.missionTitleGroup}>
            <div className={styles.missionBadges}>
              <span className={styles.weekBadge}>WEEK {mission.weekNumber}</span>
              <span style={{ fontSize: '0.75rem', color: '#9B8364', textTransform: 'uppercase' }}>
                Est: {mission.estimatedDurationMin} MIN
              </span>
            </div>
            <h2 style={{ fontSize: '1.2rem', color: '#F0EBE0', margin: '4px 0' }}>{mission.title}</h2>
          </div>
        </div>

        <div style={{ fontSize: '0.85rem', color: '#C4A882', lineHeight: '1.4' }}>
          <strong>Operational Objective:</strong> {mission.objective}
        </div>
      </div>

      {/* Commando Order of the Day: Actionable Daily Tasks Roster */}
      <div className={styles.taskRosterCard}>
        <div className={styles.rosterHeader}>
          <div className={styles.rosterHeaderLeft}>
            <span className={styles.rosterBadge}>COMMANDO ORDER OF THE DAY</span>
            <h3 className={styles.rosterHeading}>Day {dayNumber} Operational Mission Manifest</h3>
          </div>
          <div className={styles.rosterProgressBox}>
            <div className={styles.rosterProgressText}>
              <span className={styles.rosterCountHighlight}>
                {taskRoster.completedCount} / {taskRoster.totalCount}
              </span>{' '}
              MISSIONS VERIFIED
            </div>
            <div className={styles.rosterProgressBar}>
              <div
                className={styles.rosterProgressFill}
                style={{ width: `${(taskRoster.completedCount / taskRoster.totalCount) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className={styles.rosterGrid}>
          {taskRoster.tasks.map((task) => (
            <div
              key={task.id}
              className={`${styles.rosterItem} ${task.isDone ? styles.rosterItemDone : ''}`}
            >
              <div className={styles.rosterItemLeft}>
                <div className={styles.rosterItemIcon}>{task.icon}</div>
                <div className={styles.rosterItemMeta}>
                  <div className={styles.rosterItemCategory}>{task.category}</div>
                  <div className={styles.rosterItemTitle}>{task.title}</div>
                  <div className={styles.rosterItemDetail}>{task.detail}</div>
                </div>
              </div>
              <div className={styles.rosterItemRight}>
                <span className={task.isDone ? styles.statusBadgeDone : styles.statusBadgePending}>
                  {task.isDone ? '✓ VERIFIED' : 'PENDING'}
                </span>
                <button
                  type="button"
                  className={styles.rosterActionBtn}
                  onClick={() => setActiveCycleStep(task.step)}
                >
                  {task.actionLabel} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5-Step Training Cycle Navigation */}
      <nav className={styles.cycleNav} aria-label="Training Cycle">
        <button
          type="button"
          className={`${styles.cycleBtn} ${activeCycleStep === 'LEARN' ? styles.cycleBtnActive : ''}`}
          onClick={() => setActiveCycleStep('LEARN')}
        >
          <span className={styles.cycleStepNum}>STEP 1</span>
          <span>📖 LEARN</span>
        </button>

        <button
          type="button"
          className={`${styles.cycleBtn} ${activeCycleStep === 'PRACTISE' ? styles.cycleBtnActive : ''}`}
          onClick={() => setActiveCycleStep('PRACTISE')}
        >
          <span className={styles.cycleStepNum}>STEP 2</span>
          <span>🏋️ PRACTISE</span>
        </button>

        <button
          type="button"
          className={`${styles.cycleBtn} ${activeCycleStep === 'PERFORM' ? styles.cycleBtnActive : ''}`}
          onClick={() => setActiveCycleStep('PERFORM')}
        >
          <span className={styles.cycleStepNum}>STEP 3</span>
          <span>🧠 PERFORM</span>
        </button>

        <button
          type="button"
          className={`${styles.cycleBtn} ${activeCycleStep === 'ASSESS' ? styles.cycleBtnActive : ''}`}
          onClick={() => setActiveCycleStep('ASSESS')}
        >
          <span className={styles.cycleStepNum}>STEP 4</span>
          <span>🎖️ ASSESS</span>
        </button>

        <button
          type="button"
          className={`${styles.cycleBtn} ${activeCycleStep === 'IMPROVE' ? styles.cycleBtnActive : ''}`}
          onClick={() => setActiveCycleStep('IMPROVE')}
        >
          <span className={styles.cycleStepNum}>STEP 5</span>
          <span>📝 IMPROVE</span>
        </button>
      </nav>

      {/* STEP 1: LEARN (Knowledge Doctrine & Quiz) */}
      {activeCycleStep === 'LEARN' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <span>📖 Knowledge Lesson: {mission.learningLesson.title}</span>
              </div>
              <span className={styles.categoryTag}>{mission.learningLesson.domain}</span>
            </div>

            <div className={styles.cardBody} style={{ gap: '14px' }}>
              <div style={{ fontSize: '0.85rem', color: '#D6CEBE', lineHeight: '1.6' }}>
                {mission.learningLesson.explanation}
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#C4A882', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Core Operational Takeaways
                </div>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#C7BFB0', fontSize: '0.8rem', lineHeight: '1.5' }}>
                  {mission.learningLesson.keyTakeaways.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#C4A882', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Practical Field Drill
                </div>
                <div style={{ fontSize: '0.8rem', color: '#9B8364', fontStyle: 'italic', background: 'rgba(196, 168, 130, 0.08)', padding: '8px 12px', borderRadius: '3px' }}>
                  {mission.learningLesson.practicalDrill}
                </div>
              </div>
            </div>
          </div>

          {/* Verification Quiz */}
          <div className={styles.quizCard}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#C4A882', textTransform: 'uppercase' }}>
              Step 1 Verification Quiz
            </div>
            <div className={styles.quizQuestion}>{mission.learningLesson.quiz.question}</div>

            <div className={styles.quizOptionsList}>
              {mission.learningLesson.quiz.options.map((opt, optIdx) => {
                const selected = entry?.lessonSubmission?.quizAnswerIndex === optIdx;
                const isCorrect = optIdx === mission.learningLesson.quiz.correctIndex;
                const hasAnswered = entry?.lessonSubmission?.quizAnswerIndex !== undefined;

                let optClass = styles.quizOptionItem;
                if (hasAnswered) {
                  if (isCorrect) optClass += ` ${styles.quizOptionSuccess}`;
                  else if (selected) optClass += ` ${styles.quizOptionFailure}`;
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    className={optClass}
                    onClick={() => handleQuizSelect(optIdx)}
                  >
                    {String.fromCharCode(65 + optIdx)}. {opt}
                  </button>
                );
              })}
            </div>

            {entry?.lessonSubmission?.quizAnswerIndex !== undefined && (
              <div className={styles.quizFeedback}>
                <strong>Instructor Rationale:</strong> {mission.learningLesson.quiz.explanation}
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 2: PRACTISE (Physical Training & Logger) */}
      {activeCycleStep === 'PRACTISE' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <span>🏋️ {mission.physicalTraining.title}</span>
              </div>
              <span className={styles.categoryTag}>{mission.physicalTraining.category}</span>
            </div>

            <div className={styles.cardBody} style={{ gap: '14px' }}>
              <div style={{ fontSize: '0.85rem', color: '#F0EBE0' }}>
                <strong>Prescription:</strong> {mission.physicalTraining.prescription}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.75rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: '3px' }}>
                  <span style={{ color: '#9B8364', fontWeight: 700 }}>WARMUP:</span> {mission.physicalTraining.warmup}
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: '3px' }}>
                  <span style={{ color: '#9B8364', fontWeight: 700 }}>COOLDOWN:</span> {mission.physicalTraining.cooldown}
                </div>
              </div>

              {/* Prescribed Exercises List */}
              <div className={styles.exercisePrescriptionList}>
                {mission.physicalTraining.exercises.map((ex, i) => (
                  <div key={i} className={styles.exerciseItemBox}>
                    <div className={styles.exerciseItemHeader}>
                      <span>{ex.exerciseId.replace('_', ' ').toUpperCase()}</span>
                      <span>{ex.sets} sets × {ex.repsOrDuration} (RPE {ex.targetRpe})</span>
                    </div>
                    <div className={styles.exerciseItemCues}>Cue: {ex.techniqueCues}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Workout Logger */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>Workout Session Performance Log</div>
              <span style={{ fontSize: '0.75rem', color: '#8C8270' }}>Record Verified Metrics</span>
            </div>

            <div className={styles.cardBody} style={{ gap: '14px' }}>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Duration (Minutes)</label>
                  <input
                    type="number"
                    className={styles.fieldInput}
                    value={logDuration}
                    onChange={(e) => setLogDuration(parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Perceived Exertion (RPE 1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    className={styles.fieldInput}
                    value={logRpe}
                    onChange={(e) => setLogRpe(parseInt(e.target.value) || 1)}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Recovery State</label>
                  <select
                    className={styles.fieldInput}
                    value={logRecovery}
                    onChange={(e) => setLogRecovery(e.target.value as any)}
                  >
                    <option value="WELL_RESTED">Well Rested</option>
                    <option value="MODERATE">Moderate</option>
                    <option value="FATIGUED">Fatigued</option>
                    <option value="SORE">Sore / Stiff</option>
                  </select>
                </div>
              </div>

              {/* Safety Confirmation Checklist */}
              <div className={styles.safetyConfirmBox}>
                <input
                  type="checkbox"
                  id="safetyCheck"
                  checked={safetyChecked || Boolean(entry?.physicalLog?.safetyConfirmed)}
                  onChange={(e) => setSafetyChecked(e.target.checked)}
                />
                <label htmlFor="safetyCheck" style={{ cursor: 'pointer' }}>
                  <strong>Safety Protocol Acknowledgment:</strong> I executed this session with safe form and confirm that I experienced no dizziness, chest pain, or acute joint pinch.
                </label>
              </div>

              <button
                type="button"
                className={styles.saveBtn}
                style={{ width: '100%', padding: '10px' }}
                onClick={handleSavePhysicalLog}
                disabled={isDisabled}
              >
                Log Physical Training Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: PERFORM (Mental Challenge & SSB Prep) */}
      {activeCycleStep === 'PERFORM' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Mental Grilling Challenge */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <span>🧠 {mission.mentalChallenge.title}</span>
              </div>
              <span className={styles.categoryTag}>{mission.mentalChallenge.type}</span>
            </div>

            <div className={styles.cardBody} style={{ gap: '12px' }}>
              <div style={{ fontSize: '0.8rem', color: '#9B8364' }}>
                Time Boundary: {mission.mentalChallenge.timeLimitSec} seconds | Strict Analytical Reasoning
              </div>

              <div style={{ fontSize: '0.9rem', color: '#F0EBE0', fontWeight: 600, background: 'rgba(15,14,11,0.7)', padding: '12px', borderRadius: '4px' }}>
                {mission.mentalChallenge.prompt}
              </div>

              {/* MCQ Options if available */}
              {mission.mentalChallenge.options ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {mission.mentalChallenge.options.map((opt, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`${styles.filterBtn} ${mentalAnswerInput === opt || entry?.mentalSubmission?.userAnswer === opt ? styles.filterBtnActive : ''}`}
                      style={{ textAlign: 'left', padding: '8px 12px' }}
                      onClick={() => setMentalAnswerInput(opt)}
                    >
                      {String.fromCharCode(65 + i)}. {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <textarea
                  className={styles.notesTextarea}
                  rows={4}
                  placeholder="Explain your decision, trade-off rationale, and risk mitigation steps..."
                  value={mentalAnswerInput || entry?.mentalSubmission?.userAnswer || ''}
                  onChange={(e) => setMentalAnswerInput(e.target.value)}
                />
              )}

              <button
                type="button"
                className={styles.saveBtn}
                style={{ width: '100%', padding: '8px' }}
                onClick={handleSubmitMental}
                disabled={isDisabled}
              >
                Submit Mental Challenge for Evaluation
              </button>

              {entry?.mentalSubmission?.submittedAt && (
                <div className={styles.quizFeedback} style={{ marginTop: '8px' }}>
                  <div style={{ fontWeight: 700, color: entry.mentalSubmission.score >= 70 ? '#81C784' : '#FFB74D' }}>
                    Instructor Score: {entry.mentalSubmission.score}/100
                  </div>
                  <div>{entry.mentalSubmission.instructorFeedback}</div>
                  <div style={{ marginTop: '6px', color: '#C4A882' }}>
                    <strong>Model Solution:</strong> {mission.mentalChallenge.modelSolution}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SSB Practical Assignment */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <span>🎯 SSB Preparation: {mission.ssbAssignment.title}</span>
              </div>
              <span className={styles.categoryTag}>{mission.ssbAssignment.activity}</span>
            </div>

            <div className={styles.cardBody} style={{ gap: '12px' }}>
              <div style={{ fontSize: '0.85rem', color: '#D6CEBE' }}>
                {mission.ssbAssignment.instructions}
              </div>

              <div style={{ background: 'rgba(196,168,130,0.08)', padding: '12px', borderRadius: '4px', fontSize: '0.85rem', color: '#F0EBE0' }}>
                <strong>Exercise Stimulus:</strong>
                <p style={{ margin: '6px 0 0 0', whiteSpace: 'pre-line' }}>{mission.ssbAssignment.stimulus}</p>
              </div>

              {onLaunchFocusSession && (
                <button
                  type="button"
                  className={styles.filterBtn}
                  style={{ alignSelf: 'flex-start', borderColor: '#C4A882', color: '#F0EBE0' }}
                  onClick={() =>
                    onLaunchFocusSession({
                      task: `${mission.ssbAssignment.activity} Drill`,
                      subject: 'SSB',
                      dayNumber,
                      createdAt: Date.now(),
                    })
                  }
                >
                  ⏱️ Launch Timed Practice in CHRONOS
                </button>
              )}

              <textarea
                className={styles.notesTextarea}
                rows={5}
                placeholder="Write your structured response (TAT story / WAT answers / SRT actions / Lecturette points)..."
                value={ssbResponseInput || entry?.ssbSubmission?.userResponse || ''}
                onChange={(e) => setSsbResponseInput(e.target.value)}
              />

              <button
                type="button"
                className={styles.saveBtn}
                style={{ width: '100%', padding: '8px' }}
                onClick={handleSubmitSSB}
                disabled={isDisabled}
              >
                Submit SSB Drill
              </button>

              {entry?.ssbSubmission?.instructorFeedback && (
                <div className={styles.quizFeedback}>
                  <strong>Evaluator Review:</strong> {entry.ssbSubmission.instructorFeedback}
                  <div style={{ marginTop: '6px', color: '#C4A882' }}>
                    <strong>Exemplar Standard:</strong> {mission.ssbAssignment.exemplarResponse}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: ASSESS (Virtual Instructor Evaluation) */}
      {activeCycleStep === 'ASSESS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className={styles.instructorCard}>
            <div className={styles.instructorBadgeRow}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#F0EBE0' }}>Virtual Instructor Day Debrief</h3>
                <span style={{ fontSize: '0.75rem', color: '#8C8270' }}>Objective Competence Analysis</span>
              </div>

              {entry?.instructorAssessment?.overallGrade && (
                <span
                  className={`${styles.gradePill} ${
                    entry.instructorAssessment.overallGrade === 'EXEMPLARY'
                      ? styles.gradeExemplary
                      : entry.instructorAssessment.overallGrade === 'COMPETENT'
                      ? styles.gradeCompetent
                      : entry.instructorAssessment.overallGrade === 'MARGINAL'
                      ? styles.gradeMarginal
                      : styles.gradeUnsatisfactory
                  }`}
                >
                  {entry.instructorAssessment.overallGrade} ({entry.instructorAssessment.totalScore}%)
                </span>
              )}
            </div>

            <button
              type="button"
              className={styles.saveBtn}
              style={{ width: '100%', padding: '10px' }}
              onClick={handleTriggerAssessment}
              disabled={isDisabled}
            >
              Generate / Update Instructor Evaluation
            </button>

            {entry?.instructorAssessment && (
              <>
                <div style={{ fontSize: '0.875rem', color: '#D6CEBE', lineHeight: '1.5' }}>
                  {entry.instructorAssessment.feedbackSummary}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ background: 'rgba(15,14,11,0.6)', padding: '12px', borderRadius: '4px' }}>
                    <div style={{ color: '#81C784', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Observed Strengths
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '16px', color: '#C7BFB0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                      {entry.instructorAssessment.strengths.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ background: 'rgba(15,14,11,0.6)', padding: '12px', borderRadius: '4px' }}>
                    <div style={{ color: '#FFB74D', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Deficiencies / Attention Areas
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '16px', color: '#C7BFB0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                      {entry.instructorAssessment.weaknesses.map((w, idx) => (
                        <li key={idx}>{w}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {entry.instructorAssessment.remedialAction && (
                  <div className={styles.remedialAlertBox}>
                    <strong>Remedial Prescription:</strong> {entry.instructorAssessment.remedialAction}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* STEP 5: IMPROVE (Study, Reflection & Habits) */}
      {activeCycleStep === 'IMPROVE' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Study Block */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <span>📚 Academic Study Block: {mission.studyTask.subject}</span>
              </div>
              <span className={styles.categoryTag}>{mission.studyTask.durationMin} MIN</span>
            </div>

            <div className={styles.cardBody} style={{ gap: '10px' }}>
              <div style={{ fontSize: '0.9rem', color: '#F0EBE0', fontWeight: 600 }}>
                {mission.studyTask.topic}
              </div>
              <div style={{ fontSize: '0.825rem', color: '#9B8364' }}>
                {mission.studyTask.syllabusObjective}
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
                <button
                  type="button"
                  className={styles.saveBtn}
                  style={{ fontSize: '0.8rem', padding: '6px 14px' }}
                  onClick={handleMarkStudyCompleted}
                  disabled={isDisabled}
                >
                  ✓ Mark {mission.studyTask.durationMin}m Study Completed
                </button>

                {onLaunchFocusSession && (
                  <button
                    type="button"
                    className={styles.filterBtn}
                    style={{ borderColor: '#C4A882', color: '#F0EBE0' }}
                    onClick={() =>
                      onLaunchFocusSession({
                        task: mission.studyTask.topic,
                        subject: mission.studyTask.subject,
                        dayNumber,
                        createdAt: Date.now(),
                      })
                    }
                  >
                    ⏱️ Launch {mission.studyTask.durationMin}m Study Timer in CHRONOS
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Daily Reflection & Rating */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>Daily Debrief & Personal Reflection</div>
              <span style={{ fontSize: '0.75rem', color: '#8C8270' }}>Candidate Ownership</span>
            </div>

            <div className={styles.cardBody} style={{ gap: '12px' }}>
              <div style={{ fontSize: '0.85rem', color: '#C4A882', fontStyle: 'italic' }}>
                Prompt: "{mission.reflectionPrompt}"
              </div>

              <textarea
                className={styles.notesTextarea}
                rows={4}
                placeholder="Record your honest reflection on discipline, resistance, and standard of execution..."
                value={entry?.reflection?.text || ''}
                onChange={(e) => handleReflectionChange(e.target.value)}
                disabled={isDisabled}
              />

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.75rem', color: '#8C8270' }}>Day Execution Rating:</span>
                {[1, 2, 3, 4, 5].map((r) => (
                  <button
                    key={r}
                    type="button"
                    className={`${styles.filterBtn} ${(entry?.reflection?.overallRating ?? 4) === r ? styles.filterBtnActive : ''}`}
                    onClick={() => handleReflectionChange(entry?.reflection?.text || '', r as MoodRating)}
                  >
                    {r} ★
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Routine Disciplined Habits */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>Daily Disciplined Routine Habits</div>
              <span style={{ fontSize: '0.75rem', color: '#8C8270' }}>Non-Negotiables</span>
            </div>

            <div className={styles.cardBody}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {mission.routineHabits.map((habit, idx) => {
                  const isChecked = entry?.routineHabitsCompleted?.includes(habit) || false;
                  return (
                    <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#D6CEBE', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleHabit(habit)}
                        disabled={isDisabled}
                      />
                      <span>{habit}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
