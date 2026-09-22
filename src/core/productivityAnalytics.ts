// ============================================================
// PRODUCTIVITY ANALYTICS ENGINE — Local-First Intelligence
//
// DESIGN:
// - 100% Client-Side Pure Mathematics
// - Zero Network Calls, Zero Tracking
// - Strict Local Calendar Day Timezone Handling
// - Separated from high-frequency timer tick loop (Memoized/On-Demand)
// ============================================================

import type { SessionRecord, ProductivityStats } from './types';

export interface DayActivity {
  dayName: string; // 'Mon', 'Tue', etc.
  dateISO: string; // 'YYYY-MM-DD'
  focusMinutes: number;
  completedSessions: number;
}

export interface WeeklySummary {
  days: DayActivity[];
  weeklyTotalMinutes: number;
  dailyAverageMinutes: number;
  peakDay: { dayName: string; focusMinutes: number } | null;
}

export interface MonthDayActivity {
  dayNumber: number;
  dateISO: string;
  focusMinutes: number;
  completedSessions: number;
  hasActivity: boolean;
}

export interface MonthlySummary {
  year: number;
  month: number; // 0-11
  monthName: string;
  days: MonthDayActivity[];
  monthlyTotalMinutes: number;
  activeDaysCount: number;
  completedSessionsCount: number;
}

export interface DailySummary {
  dateISO: string;
  focusMinutes: number;
  completedSessions: number;
  interruptedSessions: number;
  totalStartedSessions: number;
  completionRate: number; // 0 to 100
}

export interface StreakInfo {
  currentStreakDays: number;
  longestStreakDays: number;
  isActiveToday: boolean;
}

export interface ProductivityInsight {
  id: string;
  text: string;
  metric?: string;
}

// ============================================================
// TIMEZONE-SAFE LOCAL DATE UTILITIES
// ============================================================

/**
 * Returns local calendar date string formatted as YYYY-MM-DD.
 * Strictly uses local calendar components, never UTC.
 * Safe against NaN, invalid types, and corrupted timestamps.
 */
export function getLocalDateISO(input?: number | Date | string | null): string {
  try {
    let d: Date;
    if (input instanceof Date) {
      d = input;
    } else if (typeof input === 'number') {
      d = isNaN(input) || input <= 0 ? new Date() : new Date(input);
    } else if (typeof input === 'string') {
      d = new Date(input);
    } else {
      d = new Date();
    }
    if (isNaN(d.getTime())) {
      d = new Date();
    }
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }
}

/**
 * Get date object for yesterday relative to a given local ISO date or today.
 */
export function getYesterdayISO(referenceDateISO?: string): string {
  const base = referenceDateISO ? new Date(`${referenceDateISO}T12:00:00`) : new Date();
  if (isNaN(base.getTime())) return getLocalDateISO();
  base.setDate(base.getDate() - 1);
  return getLocalDateISO(base);
}

/**
 * Formats integer minutes into a readable string (e.g. "2h 15m" or "45m").
 */
export function formatDurationMinutes(minutes: number): string {
  const safe = Math.max(0, isNaN(minutes) ? 0 : Math.round(minutes));
  if (safe < 60) return `${safe}m`;
  const h = Math.floor(safe / 60);
  const m = safe % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

// ============================================================
// DAILY AGGREGATION
// ============================================================
export function computeDailyStats(
  history: SessionRecord[],
  targetDateISO: string = getLocalDateISO(),
): DailySummary {
  const safeHistory = Array.isArray(history) ? history : [];
  const daySessions = safeHistory.filter((s) => {
    if (!s || typeof s !== 'object') return false;
    const timestamp = Number(s.completedAt ?? s.startedAt ?? s.timestamp);
    if (isNaN(timestamp) || timestamp <= 0) return false;
    return getLocalDateISO(timestamp) === targetDateISO && s.mode === 'FOCUS';
  });

  let focusMinutes = 0;
  let completedSessions = 0;
  let interruptedSessions = 0;

  for (const s of daySessions) {
    const durationSeconds =
      typeof s.actualFocusedDurationSeconds === 'number' && !isNaN(s.actualFocusedDurationSeconds)
        ? Math.max(0, s.actualFocusedDurationSeconds)
        : typeof s.durationMinutes === 'number' && !isNaN(s.durationMinutes)
          ? Math.max(0, s.durationMinutes * 60)
          : 0;
    focusMinutes += Math.round(durationSeconds / 60);

    const isCompleted = s.completionType === 'COMPLETED' || s.completed === true;
    if (isCompleted) {
      completedSessions++;
    } else {
      interruptedSessions++;
    }
  }

  const totalStartedSessions = completedSessions + interruptedSessions;
  const completionRate =
    totalStartedSessions > 0 ? Math.round((completedSessions / totalStartedSessions) * 100) : 100;

  return {
    dateISO: targetDateISO,
    focusMinutes: Math.max(0, focusMinutes),
    completedSessions,
    interruptedSessions,
    totalStartedSessions,
    completionRate: Math.min(100, Math.max(0, completionRate)),
  };
}

// ============================================================
// WEEKLY AGGREGATION (Monday through Sunday)
// ============================================================
export function computeWeeklyStats(
  history: SessionRecord[],
  referenceDate: Date = new Date(),
): WeeklySummary {
  // Determine Monday of the reference week in local time
  const current = new Date(referenceDate);
  const dayOfWeek = current.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const distanceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const monday = new Date(current);
  monday.setDate(current.getDate() + distanceToMonday);
  monday.setHours(0, 0, 0, 0);

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const days: DayActivity[] = [];

  let weeklyTotalMinutes = 0;
  let peakDay: { dayName: string; focusMinutes: number } | null = null;

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dateISO = getLocalDateISO(d);

    const dayStats = computeDailyStats(history, dateISO);
    weeklyTotalMinutes += dayStats.focusMinutes;

    const dayName = dayNames[i];
    days.push({
      dayName,
      dateISO,
      focusMinutes: dayStats.focusMinutes,
      completedSessions: dayStats.completedSessions,
    });

    if (dayStats.focusMinutes > 0 && (!peakDay || dayStats.focusMinutes > peakDay.focusMinutes)) {
      peakDay = { dayName, focusMinutes: dayStats.focusMinutes };
    }
  }

  const dailyAverageMinutes = Math.round(weeklyTotalMinutes / 7);

  return {
    days,
    weeklyTotalMinutes,
    dailyAverageMinutes,
    peakDay,
  };
}

// ============================================================
// MONTHLY AGGREGATION
// ============================================================
export function computeMonthlyStats(
  history: SessionRecord[],
  year: number = new Date().getFullYear(),
  month: number = new Date().getMonth(), // 0-indexed
): MonthlySummary {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  // Number of days in specified month (handles leap years automatically)
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: MonthDayActivity[] = [];
  let monthlyTotalMinutes = 0;
  let activeDaysCount = 0;
  let completedSessionsCount = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day);
    const dateISO = getLocalDateISO(d);
    const dayStats = computeDailyStats(history, dateISO);

    if (dayStats.focusMinutes > 0 || dayStats.completedSessions > 0) {
      activeDaysCount++;
    }

    monthlyTotalMinutes += dayStats.focusMinutes;
    completedSessionsCount += dayStats.completedSessions;

    days.push({
      dayNumber: day,
      dateISO,
      focusMinutes: dayStats.focusMinutes,
      completedSessions: dayStats.completedSessions,
      hasActivity: dayStats.focusMinutes > 0,
    });
  }

  return {
    year,
    month,
    monthName: monthNames[month],
    days,
    monthlyTotalMinutes,
    activeDaysCount,
    completedSessionsCount,
  };
}

// ============================================================
// STREAKS ARITHMETIC
// ============================================================
export function computeStreaks(
  history: SessionRecord[],
  todayISO: string = getLocalDateISO(),
): StreakInfo {
  const safeHistory = Array.isArray(history) ? history : [];
  // Collect all unique dates with at least 1 completed focus session
  const completedDates = new Set<string>();

  for (const s of safeHistory) {
    if (s && s.mode === 'FOCUS' && (s.completionType === 'COMPLETED' || s.completed === true)) {
      const timestamp = s.completedAt || s.startedAt || s.timestamp || 0;
      const dateStr = getLocalDateISO(timestamp);
      if (dateStr && !dateStr.includes('NaN')) {
        completedDates.add(dateStr);
      }
    }
  }

  if (completedDates.size === 0) {
    return { currentStreakDays: 0, longestStreakDays: 0, isActiveToday: false };
  }

  const sortedDates = Array.from(completedDates).sort();

  // 1. Longest Streak
  let longestStreak = 0;
  let currentRun = 0;
  let prevDate: Date | null = null;

  for (const dateStr of sortedDates) {
    const curDate = new Date(`${dateStr}T12:00:00`);
    if (isNaN(curDate.getTime())) continue;

    if (!prevDate) {
      currentRun = 1;
    } else {
      const diffDays = Math.round((curDate.getTime() - prevDate.getTime()) / (1000 * 3600 * 24));
      if (diffDays === 1) {
        currentRun++;
      } else if (diffDays > 1) {
        currentRun = 1;
      }
    }
    prevDate = curDate;
    if (currentRun > longestStreak) {
      longestStreak = currentRun;
    }
  }

  // 2. Current Streak
  const isActiveToday = completedDates.has(todayISO);
  const yesterdayISO = getYesterdayISO(todayISO);
  const isActiveYesterday = completedDates.has(yesterdayISO);

  let currentStreak = 0;

  if (isActiveToday || isActiveYesterday) {
    let checkDate = new Date(`${isActiveToday ? todayISO : yesterdayISO}T12:00:00`);
    let maxLoops = 10000;
    while (!isNaN(checkDate.getTime()) && completedDates.has(getLocalDateISO(checkDate)) && maxLoops-- > 0) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }
  }

  return {
    currentStreakDays: currentStreak,
    longestStreakDays: Math.max(longestStreak, currentStreak),
    isActiveToday,
  };
}

// ============================================================
// EMPIRICAL PRODUCTIVITY INSIGHTS
// ============================================================
export function computeInsights(
  history: SessionRecord[],
  stats: ProductivityStats,
): ProductivityInsight[] {
  const insights: ProductivityInsight[] = [];
  const safeHistory = Array.isArray(history) ? history : [];
  const focusSessions = safeHistory.filter((s) => s && s.mode === 'FOCUS');

  if (focusSessions.length === 0) {
    return insights;
  }

  // Insight 1: Weekly Total
  const weekly = computeWeeklyStats(safeHistory);
  if (weekly.weeklyTotalMinutes > 0) {
    insights.push({
      id: 'weekly-volume',
      text: `You focused for ${formatDurationMinutes(weekly.weeklyTotalMinutes)} this week.`,
      metric: formatDurationMinutes(weekly.weeklyTotalMinutes),
    });
  }

  // Insight 2: Peak Productive Day
  if (weekly.peakDay && weekly.peakDay.focusMinutes >= 20) {
    insights.push({
      id: 'peak-day',
      text: `${weekly.peakDay.dayName} was your most focused day (${formatDurationMinutes(weekly.peakDay.focusMinutes)}).`,
      metric: weekly.peakDay.dayName,
    });
  }

  // Insight 3: Completion Rate
  const completedCount = focusSessions.filter(
    (s) => s && (s.completionType === 'COMPLETED' || s.completed === true),
  ).length;
  if (focusSessions.length >= 3) {
    const rate = Math.round((completedCount / focusSessions.length) * 100);
    insights.push({
      id: 'completion-rate',
      text: `You completed ${rate}% of your initiated focus sessions.`,
      metric: `${rate}%`,
    });
  }

  // Insight 4: Daily Target Progress
  if (stats && stats.dailyTargetMinutes > 0 && stats.dailyFocusMinutes > 0) {
    const targetPercent = Math.round((stats.dailyFocusMinutes / stats.dailyTargetMinutes) * 100);
    if (targetPercent >= 100) {
      insights.push({
        id: 'goal-met',
        text: `You reached 100% of your daily focus goal today (${stats.dailyTargetMinutes}m target).`,
        metric: 'Goal Met',
      });
    } else {
      insights.push({
        id: 'goal-progress',
        text: `You have completed ${stats.dailyFocusMinutes}m of your ${stats.dailyTargetMinutes}m daily target (${targetPercent}%).`,
        metric: `${targetPercent}%`,
      });
    }
  }

  // Insight 5: Longest Streak
  if (stats && stats.longestStreakDays >= 3) {
    insights.push({
      id: 'longest-streak',
      text: `Your longest consistency streak is ${stats.longestStreakDays} days.`,
      metric: `${stats.longestStreakDays}d`,
    });
  }

  return insights;
}
