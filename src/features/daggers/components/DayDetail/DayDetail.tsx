// ============================================================
// DayDetail — Daily Mission Briefing, Interactive Checklist, and Training Log
// Connected directly to the 90-day structured programme
// ============================================================

import { useState, useCallback } from 'react';
import styles from './DayDetail.module.css';
import type {
  DayEntry, PTSession, SSBSession, SSBActivity,
  StudySession, StudySubject, DailyReflection, MoodRating,
} from '../../types';
import { SSB_ACTIVITY_LABELS, STUDY_SUBJECT_LABELS, MOOD_LABELS, SCORE_WEIGHTS } from '../../constants';
import { getCurriculumForDay } from '../../data/programmeData';
import { PhaseBadge } from '../PhaseBadge/PhaseBadge';
import { getFocusSessionsForDate, launchChronosTimer, type FocusIntent } from '../../services/chronosIntegrationService';

interface DayDetailProps {
  entry: DayEntry | undefined;
  dayNumber: number;
  onUpdate: (patch: Partial<DayEntry>) => void;
  onLaunchFocusSession?: (intent: FocusIntent) => void;
}

// ---- Sub-components ----

function PTCard({
  pt,
  onChange,
  disabled,
}: {
  pt?: PTSession;
  onChange: (v: PTSession) => void;
  disabled?: boolean;
}) {
  const v = pt ?? {};
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>
          <svg className={styles.cardIcon} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M2 7h10M7 2l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Physical Training
        </div>
        <span className={styles.cardWeight}>{SCORE_WEIGHTS.PT}%</span>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Run (km)</label>
            <input
              className={styles.fieldInput}
              type="number"
              min="0"
              step="0.1"
              placeholder="0.0"
              disabled={disabled}
              value={v.runDistanceKm ?? ''}
              onChange={(e) => onChange({ ...v, runDistanceKm: parseFloat(e.target.value) || undefined })}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Run (min)</label>
            <input
              className={styles.fieldInput}
              type="number"
              min="0"
              placeholder="0"
              disabled={disabled}
              value={v.runTimeMin ?? ''}
              onChange={(e) => onChange({ ...v, runTimeMin: parseInt(e.target.value) || undefined })}
            />
          </div>
        </div>
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Push-Ups</label>
            <input
              className={styles.fieldInput}
              type="number"
              min="0"
              placeholder="0"
              disabled={disabled}
              value={v.pushUps ?? ''}
              onChange={(e) => onChange({ ...v, pushUps: parseInt(e.target.value) || undefined })}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Pull-Ups</label>
            <input
              className={styles.fieldInput}
              type="number"
              min="0"
              placeholder="0"
              disabled={disabled}
              value={v.pullUps ?? ''}
              onChange={(e) => onChange({ ...v, pullUps: parseInt(e.target.value) || undefined })}
            />
          </div>
        </div>
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Sit-Ups</label>
            <input
              className={styles.fieldInput}
              type="number"
              min="0"
              placeholder="0"
              disabled={disabled}
              value={v.sitUps ?? ''}
              onChange={(e) => onChange({ ...v, sitUps: parseInt(e.target.value) || undefined })}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Swimming (laps)</label>
            <input
              className={styles.fieldInput}
              type="number"
              min="0"
              placeholder="0"
              disabled={disabled}
              value={v.swimmingLaps ?? ''}
              onChange={(e) => onChange({ ...v, swimmingLaps: parseInt(e.target.value) || undefined })}
            />
          </div>
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>Custom Drills / Notes</label>
          <input
            className={styles.fieldInput}
            type="text"
            placeholder="e.g. Tabata, burpees, ruck march..."
            disabled={disabled}
            value={v.customDrills ?? ''}
            onChange={(e) => onChange({ ...v, customDrills: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

function SSBCard({
  ssb,
  onChange,
  disabled,
}: {
  ssb?: SSBSession;
  onChange: (v: SSBSession) => void;
  disabled?: boolean;
}) {
  const activities = ssb?.activities ?? [];
  const toggleActivity = (act: SSBActivity) => {
    if (disabled) return;
    const next = activities.includes(act)
      ? activities.filter((a) => a !== act)
      : [...activities, act];
    onChange({ ...ssb, activities: next });
  };
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>
          <svg className={styles.cardIcon} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <rect x="2" y="3" width="10" height="8" rx="1"/>
            <path d="M5 3V2M9 3V2"/>
          </svg>
          SSB Preparation
        </div>
        <span className={styles.cardWeight}>{SCORE_WEIGHTS.SSB}%</span>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.activityGrid}>
          {(Object.keys(SSB_ACTIVITY_LABELS) as SSBActivity[]).map((act) => (
            <label key={act} className={styles.activityItem}>
              <input
                type="checkbox"
                disabled={disabled}
                checked={activities.includes(act)}
                onChange={() => toggleActivity(act)}
              />
              <span>{SSB_ACTIVITY_LABELS[act]}</span>
            </label>
          ))}
        </div>
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Duration (min)</label>
            <input
              className={styles.fieldInput}
              type="number"
              min="0"
              placeholder="0"
              disabled={disabled}
              value={ssb?.durationMin ?? ''}
              onChange={(e) => onChange({ ...ssb, activities, durationMin: parseInt(e.target.value) || undefined })}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Topics</label>
            <input
              className={styles.fieldInput}
              type="text"
              placeholder="e.g. Series completion..."
              disabled={disabled}
              value={ssb?.topics ?? ''}
              onChange={(e) => onChange({ ...ssb, activities, topics: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StudiesCard({
  studies,
  onChange,
  disabled,
}: {
  studies?: StudySession[];
  onChange: (v: StudySession[]) => void;
  disabled?: boolean;
}) {
  const sessions = studies ?? [];

  const addSession = () => {
    if (disabled) return;
    onChange([...sessions, { subject: 'MATHS', durationMin: 60 }]);
  };

  const updateSession = (idx: number, patch: Partial<StudySession>) => {
    if (disabled) return;
    onChange(sessions.map((s, i) => (i === idx ? { ...s, ...patch } : s)));
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>
          <svg className={styles.cardIcon} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M2 3h10M2 7h7M2 11h5"/>
          </svg>
          Studies
        </div>
        <span className={styles.cardWeight}>{SCORE_WEIGHTS.STUDIES}%</span>
      </div>
      <div className={styles.cardBody}>
        {sessions.map((session, idx) => (
          <div key={idx} className={styles.fieldRow}>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Subject</label>
              <select
                className={styles.fieldInput}
                disabled={disabled}
                value={session.subject}
                onChange={(e) => updateSession(idx, { subject: e.target.value as StudySubject })}
              >
                {(Object.keys(STUDY_SUBJECT_LABELS) as StudySubject[]).map((s) => (
                  <option key={s} value={s}>{STUDY_SUBJECT_LABELS[s]}</option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Minutes</label>
              <input
                className={styles.fieldInput}
                type="number"
                min="0"
                placeholder="60"
                disabled={disabled}
                value={session.durationMin}
                onChange={(e) => updateSession(idx, { durationMin: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
        ))}
        {!disabled && (
          <button
            type="button"
            className={styles.ratingBtn}
            onClick={addSession}
            style={{ textAlign: 'center', padding: '6px' }}
          >
            + Add Subject
          </button>
        )}
      </div>
    </div>
  );
}

function ReflectionCard({
  reflection,
  prompt,
  onChange,
  disabled,
}: {
  reflection?: DailyReflection;
  prompt: string;
  onChange: (v: DailyReflection) => void;
  disabled?: boolean;
}) {
  const v = reflection ?? { text: '', mood: 3, overallRating: 3, mentalNote: '' };
  const maxChars = 1000;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>
          <svg className={styles.cardIcon} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M7 1L8.5 5.5H13L9.5 8L11 12.5L7 10L3 12.5L4.5 8L1 5.5H5.5Z"/>
          </svg>
          Daily Reflection & Debrief
        </div>
        <span className={styles.cardWeight}>{SCORE_WEIGHTS.REFLECTION}%</span>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.promptBox}>
          <span className={styles.promptLabel}>Today's Reflection Prompt</span>
          "{prompt}"
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel}>Officer Log / Self-Assessment</label>
          <textarea
            className={styles.textarea}
            placeholder="Record your execution, obstacles faced, discipline lapses, or breakthroughs..."
            disabled={disabled}
            value={v.text}
            maxLength={maxChars}
            onChange={(e) => onChange({ ...v, text: e.target.value })}
          />
          <div className={styles.charCount}>{v.text.length}/{maxChars}</div>
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel}>Mental Toughness & Energy (1-5)</label>
          <div className={styles.ratingRow}>
            {([1, 2, 3, 4, 5] as MoodRating[]).map((r) => (
              <button
                key={r}
                type="button"
                disabled={disabled}
                className={`${styles.ratingBtn} ${v.mood === r ? styles.active : ''}`}
                onClick={() => onChange({ ...v, mood: r })}
                aria-pressed={v.mood === r}
                title={MOOD_LABELS[r]}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel}>Day Rating</label>
          <div className={styles.ratingRow}>
            {([1, 2, 3, 4, 5] as MoodRating[]).map((r) => (
              <button
                key={r}
                type="button"
                disabled={disabled}
                className={`${styles.ratingBtn} ${v.overallRating === r ? styles.active : ''}`}
                onClick={() => onChange({ ...v, overallRating: r })}
                aria-pressed={v.overallRating === r}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel}>Key Takeaway / Mental Note</label>
          <input
            className={styles.fieldInput}
            type="text"
            placeholder="One core principle to carry into tomorrow..."
            disabled={disabled}
            value={v.mentalNote ?? ''}
            maxLength={100}
            onChange={(e) => onChange({ ...v, mentalNote: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

function ChronosFocusCard({
  date,
  dayNumber,
  defaultSubject,
  defaultTask,
  focusMinutes,
  onLaunchFocusSession,
}: {
  date: string;
  dayNumber: number;
  defaultSubject?: string;
  defaultTask?: string;
  focusMinutes: number;
  onLaunchFocusSession?: (intent: FocusIntent) => void;
}) {
  const sessions = getFocusSessionsForDate(date);
  const subject = defaultSubject || 'MILITARY_HISTORY';
  const task = defaultTask || `Day ${dayNumber} Focus Block`;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>
          <svg className={styles.cardIcon} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="7" cy="7" r="5" />
            <polyline points="7,4 7,7 9,8" />
          </svg>
          CHRONOS Focus Session
        </div>
        <span className={styles.cardWeight}>{focusMinutes}m recorded today</span>
      </div>
      <div className={styles.cardBody}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--d-text-secondary)', lineHeight: 1.4 }}>
            Associate this day's academic or SSB preparation with a live CHRONOS focus block:
            <br />
            <strong>Target:</strong> {task}
          </div>
          <button
            type="button"
            className={styles.completeAllBtn}
            style={{ alignSelf: 'flex-start' }}
            onClick={() => launchChronosTimer(task, subject, dayNumber, onLaunchFocusSession)}
          >
            ▶ Launch CHRONOS Focus Timer
          </button>
        </div>

        {sessions.length > 0 && (
          <div style={{ marginTop: '8px', borderTop: '1px solid var(--d-border-subtle)', paddingTop: '8px' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--d-text-muted)', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'var(--d-font-mono)' }}>
              Today's Recorded CHRONOS Sessions ({sessions.length})
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {sessions.map((s, idx) => (
                <div key={s.id || idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--d-text-secondary)' }}>
                  <span>✓ {new Date(s.completedAt || s.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({s.completionType || 'COMPLETED'})</span>
                  <span style={{ fontFamily: 'var(--d-font-mono)', color: 'var(--d-accent-bright)' }}>
                    {Math.round((s.actualFocusedDurationSeconds || (s.durationMinutes || 25) * 60) / 60)} min
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---- Main DayDetail component ----

export function DayDetail({
  entry,
  dayNumber,
  onUpdate,
  onLaunchFocusSession,
}: DayDetailProps) {
  const [draft, setDraft] = useState<Partial<DayEntry>>({});
  const [saved, setSaved] = useState(false);

  const curriculum = getCurriculumForDay(dayNumber);
  const isLocked = entry?.status === 'LOCKED';

  const merged: Partial<DayEntry> = { ...entry, ...draft };
  const currentHabits = merged.routineHabitsCompleted ?? [];

  const handleSave = useCallback(() => {
    onUpdate(draft);
    setDraft({});
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }, [draft, onUpdate]);

  // Quick actions to apply prescribed targets
  const handleApplyPT = useCallback(() => {
    if (isLocked) return;
    setDraft((prev) => ({
      ...prev,
      pt: {
        ...(prev.pt ?? entry?.pt ?? {}),
        runDistanceKm: curriculum.ptTarget.runDistanceKm,
        runTimeMin: curriculum.ptTarget.runTimeMin,
        pushUps: curriculum.ptTarget.pushUps,
        pullUps: curriculum.ptTarget.pullUps,
        sitUps: curriculum.ptTarget.sitUps,
        swimmingLaps: curriculum.ptTarget.swimmingLaps,
        customDrills: curriculum.ptTarget.drills,
      },
    }));
  }, [curriculum, isLocked, entry]);

  const handleApplySSB = useCallback(() => {
    if (isLocked) return;
    const currentActivities = merged.ssb?.activities ?? [];
    const targetActivity = curriculum.ssbTask.activity;
    const activities = currentActivities.includes(targetActivity)
      ? currentActivities
      : [...currentActivities, targetActivity];

    setDraft((prev) => ({
      ...prev,
      ssb: {
        ...(prev.ssb ?? entry?.ssb ?? { activities: [] }),
        activities,
        durationMin: curriculum.ssbTask.durationMin,
        topics: curriculum.ssbTask.description,
      },
    }));
  }, [curriculum, isLocked, merged.ssb, entry]);

  const handleApplyStudy = useCallback(() => {
    if (isLocked) return;
    const currentStudies = merged.studies ?? [];
    const exists = currentStudies.some((s) => s.subject === curriculum.studyTask.subject);
    const updated = exists
      ? currentStudies.map((s) =>
          s.subject === curriculum.studyTask.subject
            ? { ...s, durationMin: curriculum.studyTask.durationMin, topicsCovered: curriculum.studyTask.topic }
            : s,
        )
      : [
          ...currentStudies,
          {
            subject: curriculum.studyTask.subject,
            durationMin: curriculum.studyTask.durationMin,
            topicsCovered: curriculum.studyTask.topic,
          },
        ];

    setDraft((prev) => ({
      ...prev,
      studies: updated,
    }));
  }, [curriculum, isLocked, merged.studies]);

  const handleToggleHabit = useCallback(
    (habit: string) => {
      if (isLocked) return;
      const nextHabits = currentHabits.includes(habit)
        ? currentHabits.filter((h) => h !== habit)
        : [...currentHabits, habit];

      setDraft((prev) => ({
        ...prev,
        routineHabitsCompleted: nextHabits,
      }));
    },
    [currentHabits, isLocked],
  );

  const handleCompleteAll = useCallback(() => {
    if (isLocked) return;
    setDraft({
      pt: {
        runDistanceKm: curriculum.ptTarget.runDistanceKm,
        runTimeMin: curriculum.ptTarget.runTimeMin,
        pushUps: curriculum.ptTarget.pushUps,
        pullUps: curriculum.ptTarget.pullUps,
        sitUps: curriculum.ptTarget.sitUps,
        swimmingLaps: curriculum.ptTarget.swimmingLaps,
        customDrills: curriculum.ptTarget.drills,
      },
      ssb: {
        activities: [curriculum.ssbTask.activity],
        durationMin: curriculum.ssbTask.durationMin,
        topics: curriculum.ssbTask.description,
      },
      studies: [
        {
          subject: curriculum.studyTask.subject,
          durationMin: curriculum.studyTask.durationMin,
          topicsCovered: curriculum.studyTask.topic,
        },
      ],
      routineHabitsCompleted: [...curriculum.routineHabits],
      reflection: {
        text: merged.reflection?.text || `Completed prescribed targets for ${curriculum.title}. Pushed through fatigue and executed standard.`,
        mood: 4,
        overallRating: 4,
        mentalNote: merged.reflection?.mentalNote || 'Disciplined execution under standard.',
      },
    });
  }, [curriculum, isLocked, merged.reflection]);

  // Compute score ring SVG
  const score = entry?.completionScore ?? 0;
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  if (!entry) {
    return (
      <div className={styles.emptyState}>
        <svg className={styles.emptyIcon} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="24" cy="24" r="22"/>
          <path d="M24 14v10l6 4"/>
        </svg>
        <div className={styles.emptyTitle}>Select a Day</div>
        <div className={styles.emptySubtitle}>
          Click any active or past day in the 90-day grid to inspect the curriculum and log training.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      {/* Day header */}
      <div className={styles.dayHeader}>
        <div className={styles.dayTitle}>
          <span className={styles.dayNumLarge}>D{String(dayNumber).padStart(2, '0')}</span>
          <span className={styles.dayDate}>{entry.date}</span>
          <PhaseBadge dayNumber={dayNumber} compact />
        </div>

        <div className={styles.scoreRing}>
          <svg width="56" height="56" aria-label={`Completion score: ${score}%`}>
            <g transform="rotate(-90 28 28)">
              <circle cx="28" cy="28" r={radius} stroke="rgba(155,131,100,0.12)" strokeWidth="3" fill="none"/>
              <circle
                cx="28" cy="28" r={radius}
                stroke={score >= 85 ? '#C8A84B' : score >= 60 ? '#4A7C5F' : '#9B8364'}
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transition: 'stroke-dashoffset 0.4s ease' }}
              />
            </g>
            <text x="28" y="32" textAnchor="middle" fontSize="11" fontWeight="600" fontFamily="var(--font-mono, monospace)" fill="#C4A882">
              {score}%
            </text>
          </svg>
          <div className={styles.scoreLabel}>Score</div>
        </div>
      </div>

      {isLocked && (
        <div className={styles.lockedBanner}>
          <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
            <path d="M8 1a3 3 0 0 0-3 3v2H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-1V4a3 3 0 0 0-3-3zm1 5V4a1 1 0 0 0-2 0v2h2z" />
          </svg>
          <span>Day {dayNumber} is scheduled for {entry.date}. Curriculum briefing is displayed below in read-only preview.</span>
        </div>
      )}

      {/* Mission Briefing Card */}
      <section className={styles.missionCard}>
        <div className={styles.missionTop}>
          <div className={styles.missionTitleGroup}>
            <div className={styles.missionBadges}>
              <span className={styles.weekBadge}>Week {curriculum.weekNumber}</span>
              <span className={styles.missionTheme}>{curriculum.theme}</span>
            </div>
            <h3 className={styles.missionTitle}>{curriculum.title}</h3>
          </div>
          {!isLocked && (
            <div className={styles.quickActions}>
              <button
                type="button"
                className={styles.completeAllBtn}
                onClick={handleCompleteAll}
                title="Fill all prescribed training benchmarks for today"
              >
                Auto-Fill All Prescribed
              </button>
            </div>
          )}
        </div>

        {/* 3 Prescribed target cards */}
        <div className={styles.prescribedGrid}>
          {/* PT Target */}
          <div className={styles.targetCol}>
            <div>
              <div className={styles.targetHeader}>
                <span className={styles.targetCategory}>PT Prescription</span>
                {curriculum.ptTarget.runTimeMin && (
                  <span className={styles.targetTime}>~{curriculum.ptTarget.runTimeMin}m</span>
                )}
              </div>
              <p className={styles.targetDesc}>{curriculum.ptTarget.description}</p>
              {curriculum.ptTarget.drills && (
                <p className={styles.targetDesc} style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                  Drill: {curriculum.ptTarget.drills}
                </p>
              )}
            </div>
            {!isLocked && (
              <button type="button" className={styles.applyBtn} onClick={handleApplyPT}>
                + Apply PT Targets
              </button>
            )}
          </div>

          {/* SSB Target */}
          <div className={styles.targetCol}>
            <div>
              <div className={styles.targetHeader}>
                <span className={styles.targetCategory}>SSB Battery</span>
                <span className={styles.targetTime}>{curriculum.ssbTask.durationMin}m</span>
              </div>
              <p className={styles.targetDesc}>
                <strong>{curriculum.ssbTask.title}:</strong> {curriculum.ssbTask.description}
              </p>
            </div>
            {!isLocked && (
              <button type="button" className={styles.applyBtn} onClick={handleApplySSB}>
                + Apply SSB Drill
              </button>
            )}
          </div>

          {/* Study Target */}
          <div className={styles.targetCol}>
            <div>
              <div className={styles.targetHeader}>
                <span className={styles.targetCategory}>Academic & Tech</span>
                <span className={styles.targetTime}>{curriculum.studyTask.durationMin}m</span>
              </div>
              <p className={styles.targetDesc}>
                <strong>{STUDY_SUBJECT_LABELS[curriculum.studyTask.subject]}:</strong> {curriculum.studyTask.topic}
              </p>
            </div>
            {!isLocked && (
              <button type="button" className={styles.applyBtn} onClick={handleApplyStudy}>
                + Apply Study Topic
              </button>
            )}
          </div>
        </div>

        {/* Routine habits checklist */}
        <div className={styles.habitsSection}>
          <div className={styles.habitsTitle}>Daily Operational Routine & Habits</div>
          <div className={styles.habitGrid}>
            {curriculum.routineHabits.map((habit) => {
              const isChecked = currentHabits.includes(habit);
              return (
                <label key={habit} className={styles.habitItem}>
                  <input
                    type="checkbox"
                    disabled={isLocked}
                    checked={isChecked}
                    onChange={() => handleToggleHabit(habit)}
                  />
                  <span className={isChecked ? styles.habitChecked : ''}>{habit}</span>
                </label>
              );
            })}
          </div>
        </div>
      </section>

      {/* CHRONOS Focus Session Integration */}
      <ChronosFocusCard
        date={entry.date}
        dayNumber={dayNumber}
        defaultSubject={curriculum.studyTask.subject}
        defaultTask={curriculum.studyTask.topic}
        focusMinutes={entry.chronosFocusMinutes}
        onLaunchFocusSession={onLaunchFocusSession}
      />

      {/* Four pillars logging cards */}
      <div className={styles.pillars}>
        <PTCard
          pt={merged.pt}
          disabled={isLocked}
          onChange={(v) => setDraft((d) => ({ ...d, pt: v }))}
        />
        <SSBCard
          ssb={merged.ssb}
          disabled={isLocked}
          onChange={(v) => setDraft((d) => ({ ...d, ssb: v }))}
        />
        <StudiesCard
          studies={merged.studies}
          disabled={isLocked}
          onChange={(v) => setDraft((d) => ({ ...d, studies: v }))}
        />
        <ReflectionCard
          reflection={merged.reflection}
          prompt={curriculum.reflectionPrompt}
          disabled={isLocked}
          onChange={(v) => setDraft((d) => ({ ...d, reflection: v }))}
        />
      </div>

      {/* Save Action */}
      {!isLocked && (
        <button
          type="button"
          className={`${styles.saveBtn} ${saved ? styles.saved : ''}`}
          onClick={handleSave}
          disabled={Object.keys(draft).length === 0}
        >
          {saved ? '✓ Saved to Log' : 'Save Day Log'}
        </button>
      )}
    </div>
  );
}
