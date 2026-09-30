import styles from './Sidebar.module.css';
import type { DayEntry } from '../../types';
import { TOTAL_DAYS } from '../../constants';

interface SidebarProps {
  days: DayEntry[];
  currentDayNumber: number;
  todayFocusMinutes: number;
}

interface WeekSummary {
  week: number;
  avgScore: number;
  completed: number;
  total: number;
}

function buildWeeklySummaries(days: DayEntry[], currentDay: number): WeekSummary[] {
  const result: WeekSummary[] = [];
  for (let w = 0; w < 13; w++) {
    const startDay = w * 7 + 1;
    const endDay = Math.min(startDay + 6, TOTAL_DAYS);
    const weekDays = days.filter(
      (d) => d.dayNumber >= startDay && d.dayNumber <= endDay && d.dayNumber <= currentDay,
    );
    if (weekDays.length === 0) break; // No active days in this week yet
    const avgScore =
      weekDays.reduce((sum, d) => sum + d.completionScore, 0) / weekDays.length;
    const completed = weekDays.filter((d) => d.completionScore >= 60).length;
    result.push({ week: w + 1, avgScore: Math.round(avgScore), completed, total: weekDays.length });
  }
  return result;
}

function weekFillColor(avg: number): string {
  if (avg >= 85) return '#C8A84B';
  if (avg >= 60) return '#4A7C5F';
  if (avg >= 30) return '#9B8364';
  return '#8B2E2E';
}

export function Sidebar({ days, currentDayNumber, todayFocusMinutes }: SidebarProps) {
  const weeklySummaries = buildWeeklySummaries(days, currentDayNumber);

  // Stats
  const completedDays = days.filter((d) => d.completionScore >= 60).length;
  const goldDays = days.filter((d) => d.completionScore >= 85).length;
  const missedDays = days.filter((d) => d.status === 'MISSED').length;
  const streakDays = (() => {
    let streak = 0;
    for (let n = currentDayNumber; n >= 1; n--) {
      const d = days.find((x) => x.dayNumber === n);
      if (d && d.completionScore >= 30) streak++;
      else break;
    }
    return streak;
  })();

  const totalFocusMinutes = days.reduce((sum, d) => sum + d.chronosFocusMinutes, 0);

  return (
    <div className={styles.sidebar}>
      {/* CHRONOS integration card */}
      <div className={styles.chronosCard}>
        <div className={styles.chronosCardTitle}>
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <circle cx="6" cy="6" r="4.5" />
            <polyline points="6,3 6,6 8,7" />
          </svg>
          CHRONOS — Focus Today
        </div>
        <div className={styles.chronosMinutes}>{todayFocusMinutes}m</div>
        <div className={styles.chronosSub}>
          {totalFocusMinutes}m total programme focus
        </div>
      </div>

      {/* Stats */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Programme Stats</div>
        {[
          { label: 'Days Completed', value: `${completedDays} / ${TOTAL_DAYS}` },
          { label: 'Gold Days', value: goldDays },
          { label: 'Active Streak', value: `${streakDays}d` },
          { label: 'Days Missed', value: missedDays },
        ].map(({ label, value }) => (
          <div key={label} className={styles.statRow}>
            <span className={styles.statLabel}>{label}</span>
            <span className={styles.statValue}>{value}</span>
          </div>
        ))}
      </div>

      {/* Weekly breakdown */}
      {weeklySummaries.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Weekly Breakdown</div>
          {weeklySummaries.map(({ week, avgScore }) => (
            <div key={week} className={styles.weekBar}>
              <span className={styles.weekLabel}>W{week}</span>
              <div className={styles.weekTrack}>
                <div
                  className={styles.weekFill}
                  style={{
                    width: `${avgScore}%`,
                    background: weekFillColor(avgScore),
                  }}
                  aria-label={`Week ${week}: ${avgScore}% average`}
                />
              </div>
              <span className={styles.weekScore}>{avgScore}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
