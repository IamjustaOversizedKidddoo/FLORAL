// ============================================================
// DayGrid — 90-Day Calendar Grid with Phase Filter & Day Selection
// ============================================================

import { useState } from 'react';
import styles from './DayGrid.module.css';
import type { DayEntry } from '../../types';
import { SCORE_THRESHOLDS } from '../../constants';

interface DayGridProps {
  days: DayEntry[];
  selectedDay: number | null;
  currentDayNumber: number;
  onSelectDay: (day: number) => void;
}

type FilterMode = 'ALL' | 'FOUNDATION' | 'HARDENING' | 'OPERATOR';

function scoreToFillColor(score: number, status: DayEntry['status']): string {
  if (status === 'LOCKED') return 'transparent';
  if (status === 'MISSED') return 'rgba(139, 46, 46, 0.25)';
  if (status === 'ACTIVE') return `rgba(155, 131, 100, ${0.05 + (score / 100) * 0.35})`;
  if (score >= SCORE_THRESHOLDS.GOLD) return 'rgba(200, 168, 75, 0.35)';    // Gold
  if (score >= SCORE_THRESHOLDS.SILVER) return 'rgba(74, 124, 95, 0.30)';  // Green
  if (score >= SCORE_THRESHOLDS.BRONZE) return 'rgba(155, 131, 100, 0.22)'; // Bronze
  return 'rgba(155, 131, 100, 0.08)';
}

export function DayGrid({ days, selectedDay, onSelectDay }: DayGridProps) {
  const [filter, setFilter] = useState<FilterMode>('ALL');

  const filteredDays = days.filter((d) => {
    if (filter === 'FOUNDATION') return d.dayNumber <= 30;
    if (filter === 'HARDENING') return d.dayNumber >= 31 && d.dayNumber <= 60;
    if (filter === 'OPERATOR') return d.dayNumber >= 61;
    return true;
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <div className={styles.sectionTitle}>
          <span>90-Day Progress Grid</span>
        </div>

        <div className={styles.phaseFilterBar} role="tablist" aria-label="Filter grid by phase">
          <button
            type="button"
            className={`${styles.phaseFilterBtn} ${filter === 'ALL' ? styles.activeFilter : ''}`}
            onClick={() => setFilter('ALL')}
          >
            All (1–90)
          </button>
          <button
            type="button"
            className={`${styles.phaseFilterBtn} ${filter === 'FOUNDATION' ? styles.activeFilter : ''}`}
            onClick={() => setFilter('FOUNDATION')}
          >
            Phase I (1–30)
          </button>
          <button
            type="button"
            className={`${styles.phaseFilterBtn} ${filter === 'HARDENING' ? styles.activeFilter : ''}`}
            onClick={() => setFilter('HARDENING')}
          >
            Phase II (31–60)
          </button>
          <button
            type="button"
            className={`${styles.phaseFilterBtn} ${filter === 'OPERATOR' ? styles.activeFilter : ''}`}
            onClick={() => setFilter('OPERATOR')}
          >
            Phase III (61–90)
          </button>
        </div>
      </div>

      <div className={styles.grid} role="grid" aria-label="90-day tracker grid">
        {filteredDays.map((entry) => {
          const dayNumber = entry.dayNumber;
          const status = entry.status;
          const score = entry.completionScore;
          const isSelected = selectedDay === dayNumber;

          const cellClass = [
            styles.cell,
            styles[status.toLowerCase()],
            isSelected ? styles.selected : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <button
              key={dayNumber}
              role="gridcell"
              className={cellClass}
              aria-label={`Day ${dayNumber}: ${status}${score > 0 ? `, score ${score}%` : ''}`}
              aria-selected={isSelected}
              onClick={() => onSelectDay(dayNumber)}
            >
              <div
                className={styles.fill}
                style={{ background: scoreToFillColor(score, status) }}
                aria-hidden
              />
              <span className={styles.dayNum}>{dayNumber}</span>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className={styles.legend} aria-label="Grid legend">
        {[
          { color: 'rgba(200, 168, 75, 0.5)', label: 'Gold (85+)' },
          { color: 'rgba(74, 124, 95, 0.5)', label: 'Good (60+)' },
          { color: 'rgba(155, 131, 100, 0.35)', label: 'Partial' },
          { color: 'rgba(139, 46, 46, 0.35)', label: 'Missed' },
          { color: 'rgba(255,255,255,0.06)', label: 'Scheduled' },
        ].map(({ color, label }) => (
          <div key={label} className={styles.legendItem}>
            <div className={styles.legendDot} style={{ background: color }} aria-hidden />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
