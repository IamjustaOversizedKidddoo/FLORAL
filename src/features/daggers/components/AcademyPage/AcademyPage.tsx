// ============================================================
// ACADEMY PAGE — Searchable 90-Day Knowledge & Doctrine Library
// ============================================================

import { useState, useMemo } from 'react';
import styles from './AcademyPage.module.css';
import type { DayEntry, KnowledgeDomain, MasteryStatus } from '../../types';
import { getAllIndexedLessons, searchLessons } from '../../services/knowledgeService';
import { evaluateLessonQuiz } from '../../services/assessmentEngine';
import { getMissionForDay } from '../../data/curriculumData';
import type { FocusIntent } from '../../services/chronosIntegrationService';

interface AcademyPageProps {
  days: DayEntry[];
  onUpdateDay?: (dayNumber: number, patch: Partial<DayEntry>) => void;
  onLaunchFocusSession?: (intent: FocusIntent) => void;
}

const DOMAINS: Array<{ id: KnowledgeDomain | 'ALL'; label: string }> = [
  { id: 'ALL', label: 'All Subjects' },
  { id: 'NAVIGATION', label: 'Navigation' },
  { id: 'FIRST_AID', label: 'First Aid' },
  { id: 'LEADERSHIP', label: 'Leadership' },
  { id: 'MILITARY_STUDIES', label: 'Military Studies' },
  { id: 'COMMUNICATION', label: 'Communication' },
  { id: 'MENTAL_MODELS', label: 'Mental Models' },
  { id: 'PLANNING', label: 'Planning' },
];

export function AcademyPage({ days, onUpdateDay, onLaunchFocusSession }: AcademyPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<KnowledgeDomain | 'ALL'>('ALL');
  const [selectedMastery, setSelectedMastery] = useState<MasteryStatus | 'ALL'>('ALL');
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const indexedLessons = useMemo(() => getAllIndexedLessons(days), [days]);

  const filteredLessons = useMemo(
    () => searchLessons(indexedLessons, searchQuery, selectedDomain, selectedMastery),
    [indexedLessons, searchQuery, selectedDomain, selectedMastery],
  );

  const stats = useMemo(() => {
    let competent = 0;
    let revision = 0;
    let unstarted = 0;

    indexedLessons.forEach((l) => {
      if (l.mastery === 'COMPETENT') competent++;
      else if (l.mastery === 'NEEDS_REVISION') revision++;
      else unstarted++;
    });

    return { total: indexedLessons.length, competent, revision, unstarted };
  }, [indexedLessons]);

  const handleQuizAnswer = (dayNumber: number, optionIdx: number) => {
    if (!onUpdateDay) return;
    const mission = getMissionForDay(dayNumber);
    const sub = evaluateLessonQuiz(mission, optionIdx);

    onUpdateDay(dayNumber, {
      lessonSubmission: sub,
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C4A882" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
          Academy Knowledge Library
        </h1>
        <p className={styles.subtitle}>
          The 90-day academic doctrine syllabus: Topographic navigation, tactical first aid, operational leadership, military history, and mental models. Every lesson teaches a concrete capability verified by a knowledge assessment.
        </p>
      </header>

      {/* Metric Cards */}
      <div className={styles.metricsRow}>
        <div className={styles.metricCard}>
          <div className={styles.metricValue}>{stats.total}</div>
          <div className={styles.metricLabel}>Total Lessons</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricValue} style={{ color: '#81C784' }}>
            {stats.competent}
          </div>
          <div className={styles.metricLabel}>Mastered (Passed)</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricValue} style={{ color: '#FFB74D' }}>
            {stats.revision}
          </div>
          <div className={styles.metricLabel}>Needs Revision</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricValue} style={{ color: '#9E9E9E' }}>
            {stats.unstarted}
          </div>
          <div className={styles.metricLabel}>Unattempted</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className={styles.filtersBar}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search lessons, doctrine, navigation, first aid..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className={styles.filterGroup}>
          {DOMAINS.map((dom) => (
            <button
              key={dom.id}
              type="button"
              className={`${styles.filterBtn} ${selectedDomain === dom.id ? styles.filterBtnActive : ''}`}
              onClick={() => setSelectedDomain(dom.id)}
            >
              {dom.label}
            </button>
          ))}
        </div>

        <div className={styles.filterGroup}>
          <button
            type="button"
            className={`${styles.filterBtn} ${selectedMastery === 'ALL' ? styles.filterBtnActive : ''}`}
            onClick={() => setSelectedMastery('ALL')}
          >
            All Status
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${selectedMastery === 'COMPETENT' ? styles.filterBtnActive : ''}`}
            onClick={() => setSelectedMastery('COMPETENT')}
          >
            Mastered
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${selectedMastery === 'NEEDS_REVISION' ? styles.filterBtnActive : ''}`}
            onClick={() => setSelectedMastery('NEEDS_REVISION')}
          >
            Revision
          </button>
        </div>
      </div>

      {/* Lessons List */}
      <div className={styles.lessonsList}>
        {filteredLessons.length === 0 ? (
          <div className={styles.emptyState}>No doctrine lessons found matching your filters.</div>
        ) : (
          filteredLessons.map((lesson) => {
            const isExpanded = expandedDay === lesson.dayNumber;
            const entry = days.find((d) => d.dayNumber === lesson.dayNumber);
            const userSub = entry?.lessonSubmission;

            return (
              <article key={lesson.id} className={styles.lessonCard}>
                <div
                  className={styles.lessonHeader}
                  onClick={() => setExpandedDay(isExpanded ? null : lesson.dayNumber)}
                >
                  <div className={styles.lessonMeta}>
                    <div className={styles.badgeRow}>
                      <span className={styles.dayTag}>Day {lesson.dayNumber}</span>
                      <span className={styles.domainTag}>{lesson.domain}</span>
                      <span
                        className={`${styles.masteryBadge} ${
                          lesson.mastery === 'COMPETENT'
                            ? styles.masteryCompetent
                            : lesson.mastery === 'NEEDS_REVISION'
                            ? styles.masteryRevision
                            : styles.masteryUnstarted
                        }`}
                      >
                        {lesson.mastery.replace('_', ' ')}
                      </span>
                    </div>
                    <div className={styles.lessonTitle}>{lesson.title}</div>
                  </div>

                  <button
                    type="button"
                    className={styles.filterBtn}
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                  >
                    {isExpanded ? 'Collapse ▲' : 'Open Lesson ▼'}
                  </button>
                </div>

                {isExpanded && (
                  <div className={styles.lessonBody}>
                    <div className={styles.sectionBlock}>
                      <div className={styles.sectionTitle}>Learning Objective</div>
                      <div className={styles.sectionText}>{lesson.objective}</div>
                    </div>

                    <div className={styles.sectionBlock}>
                      <div className={styles.sectionTitle}>Doctrine Explanation</div>
                      <div className={styles.sectionText}>{lesson.explanation}</div>
                    </div>

                    <div className={styles.sectionBlock}>
                      <div className={styles.sectionTitle}>Key Takeaways</div>
                      <ul className={styles.takeawayList}>
                        {lesson.keyTakeaways.map((takeaway, i) => (
                          <li key={i}>{takeaway}</li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.sectionBlock}>
                      <div className={styles.sectionTitle}>Practical Field Drill</div>
                      <div className={styles.sectionText}>{lesson.practicalDrill}</div>
                    </div>

                    {/* Interactive Knowledge Quiz */}
                    <div className={styles.quizBox}>
                      <div className={styles.sectionTitle}>Knowledge Verification Quiz</div>
                      <div className={styles.quizQuestion}>{lesson.quiz.question}</div>

                      <div className={styles.quizOptions}>
                        {lesson.quiz.options.map((opt, optIdx) => {
                          const isSelected = userSub?.quizAnswerIndex === optIdx;
                          const isCorrect = optIdx === lesson.quiz.correctIndex;
                          const hasAnswered = userSub?.quizAnswerIndex !== undefined;

                          let optionClass = styles.quizOptionBtn;
                          if (hasAnswered) {
                            if (isCorrect) optionClass += ` ${styles.quizOptionCorrect}`;
                            else if (isSelected) optionClass += ` ${styles.quizOptionWrong}`;
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              className={optionClass}
                              onClick={() => handleQuizAnswer(lesson.dayNumber, optIdx)}
                            >
                              {String.fromCharCode(65 + optIdx)}. {opt}
                            </button>
                          );
                        })}
                      </div>

                      {userSub?.quizAnswerIndex !== undefined && (
                        <div className={styles.quizExplanation}>
                          <strong>Explanation:</strong> {lesson.quiz.explanation}
                        </div>
                      )}
                    </div>

                    {onLaunchFocusSession && (
                      <div style={{ marginTop: '8px' }}>
                        <button
                          type="button"
                          className={styles.filterBtn}
                          style={{ borderColor: '#C4A882', color: '#F0EBE0' }}
                          onClick={() =>
                            onLaunchFocusSession({
                              task: `Study: ${lesson.title}`,
                              subject: lesson.domain,
                              dayNumber: lesson.dayNumber,
                              createdAt: Date.now(),
                            })
                          }
                        >
                          ⏱️ Launch 30m Focused Study in CHRONOS
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
