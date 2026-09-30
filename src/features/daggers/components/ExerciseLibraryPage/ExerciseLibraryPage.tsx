// ============================================================
// EXERCISE LIBRARY PAGE — Professional Movement Mechanics Manual
// ============================================================

import { useState, useMemo } from 'react';
import styles from './ExerciseLibraryPage.module.css';
import { getAllExercises, type ExerciseDefinition } from '../../data/exerciseLibrary';

const CATEGORIES: Array<{ id: ExerciseDefinition['category'] | 'ALL'; label: string }> = [
  { id: 'ALL', label: 'All Movements' },
  { id: 'PUSH', label: 'Push' },
  { id: 'PULL', label: 'Pull' },
  { id: 'LEGS', label: 'Lower Body' },
  { id: 'CORE', label: 'Core' },
  { id: 'CARDIO', label: 'Cardio' },
  { id: 'MOBILITY', label: 'Mobility' },
  { id: 'RECOVERY', label: 'Recovery' },
];

export function ExerciseLibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ExerciseDefinition['category'] | 'ALL'>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const allExercises = useMemo(() => getAllExercises(), []);

  const filteredExercises = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return allExercises.filter((ex) => {
      if (selectedCategory !== 'ALL' && ex.category !== selectedCategory) {
        return false;
      }

      if (q) {
        const inName = ex.name.toLowerCase().includes(q);
        const inPurpose = ex.purpose.toLowerCase().includes(q);
        const inMuscles = ex.targetMuscleGroups.some((m) => m.toLowerCase().includes(q));
        return inName || inPurpose || inMuscles;
      }

      return true;
    });
  }, [allExercises, searchQuery, selectedCategory]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C4A882" strokeWidth="2">
            <path d="M6 4v16M18 4v16M2 8h4M2 16h4M18 8h4M18 16h4M6 12h12"/>
          </svg>
          Academy Physical Training Movement Manual
        </h1>
        <p className={styles.subtitle}>
          Standardized biomechanics, progressions, regressions, and safety cues for all prescribed exercises. We train for longevity, structural joint integrity, and mission endurance.
        </p>
      </header>

      {/* Mandatory Safety Notice */}
      <div className={styles.safetyNotice}>
        <div className={styles.safetyTitle}>Mandatory Safety Protocol</div>
        Stop exercising immediately and consult medical support if you experience chest tightness, sudden dizziness, sharp joint pain, or severe shortness of breath. Exercise adaptations occur through progressive consistency, never through reckless joint degradation or collapse.
      </div>

      {/* Search and Filters */}
      <div className={styles.filtersBar}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search by exercise name, target muscle, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className={styles.filterGroup}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`${styles.filterBtn} ${selectedCategory === cat.id ? styles.filterBtnActive : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Exercises */}
      <div className={styles.exerciseGrid}>
        {filteredExercises.map((ex) => {
          const isExpanded = expandedId === ex.id;

          return (
            <div key={ex.id} className={styles.exerciseCard}>
              <div className={styles.cardHeader}>
                <div>
                  <div className={styles.exerciseName}>{ex.name}</div>
                  <div className={styles.muscleTags} style={{ marginTop: '4px' }}>
                    {ex.targetMuscleGroups.map((m) => (
                      <span key={m} className={styles.muscleTag}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                <span className={styles.categoryTag}>{ex.category}</span>
              </div>

              <div className={styles.purposeText}>{ex.purpose}</div>

              <div className={styles.coachingCueBox}>
                <strong>Cue:</strong> {ex.coachingCue}
              </div>

              <button
                type="button"
                className={styles.filterBtn}
                style={{ width: '100%', textAlign: 'center' }}
                onClick={() => setExpandedId(isExpanded ? null : ex.id)}
              >
                {isExpanded ? 'Hide Mechanics ▲' : 'View Full Mechanics & Regressions ▼'}
              </button>

              {isExpanded && (
                <>
                  <div className={styles.detailSection}>
                    <div className={styles.detailTitle}>Step-by-Step Technique</div>
                    <ol className={styles.stepList}>
                      {ex.stepByStepTechnique.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  <div className={styles.detailSection}>
                    <div className={styles.detailTitle}>Phase Prescriptions</div>
                    <div style={{ color: '#D6CEBE', fontSize: '0.75rem', lineHeight: '1.4' }}>
                      <div>
                        <strong>Foundation:</strong> {ex.setsAndRepsRecommendation.foundation}
                      </div>
                      <div>
                        <strong>Hardening:</strong> {ex.setsAndRepsRecommendation.hardening}
                      </div>
                      <div>
                        <strong>Operator:</strong> {ex.setsAndRepsRecommendation.operator}
                      </div>
                    </div>
                  </div>

                  <div className={styles.variationRow}>
                    <div className={styles.variationBlock}>
                      <span className={styles.variationLabel}>Easier Regression:</span>
                      <span className={styles.variationText}>
                        <strong>{ex.easierVariation.name}:</strong> {ex.easierVariation.description}
                      </span>
                    </div>
                    <div className={styles.variationBlock}>
                      <span className={styles.variationLabel}>Harder Progression:</span>
                      <span className={styles.variationText}>
                        <strong>{ex.harderVariation.name}:</strong> {ex.harderVariation.description}
                      </span>
                    </div>
                  </div>

                  <div className={styles.detailSection}>
                    <div className={styles.detailTitle}>Common Errors to Avoid</div>
                    <ul className={styles.stepList}>
                      {ex.commonErrors.map((err, idx) => (
                        <li key={idx} style={{ color: '#E0A899' }}>
                          {err}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.detailSection}>
                    <div className={styles.detailTitle} style={{ color: '#EF9A9A' }}>
                      Safety Protocol
                    </div>
                    <div className={styles.safetyText}>{ex.safetyInstructions}</div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
