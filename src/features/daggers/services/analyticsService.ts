// ============================================================
// ANALYTICS SERVICE — Pure Recorded Data Calculations
// Calculates actual recorded information from DayEntry and CHRONOS history
// Strictly no manufactured statistics or uncompleted activities
// ============================================================

import type { DayEntry, StudySubject, SSBActivity } from '../types';
import { TOTAL_DAYS } from '../constants';
import { getPhaseForDay, type PhaseId } from '../components/PhaseBadge/PhaseBadge';
import {
  getFocusMinutesForDate,
  getTotalChronosFocusMinutes,
} from './chronosIntegrationService';

export interface WeekAnalytics {
  weekNumber: number;
  phaseId: PhaseId;
  startDate: string;
  endDate: string;
  totalDaysInWeek: number;
  completedDays: number;
  completionRate: number;      // 0-100%
  totalPTMinutes: number;
  totalStudyMinutes: number;
  totalSSBMinutes: number;
  chronosFocusMinutes: number;
}

export interface ProgrammeAnalytics {
  // General Progress
  totalDays: number;
  currentDayNumber: number;
  elapsedDays: number;
  completedDays: number;        // score >= 60
  goldDays: number;             // score >= 85
  partialDays: number;          // 0 < score < 60
  missedDays: number;           // score == 0 on elapsed days
  dailyCompletionRate: number;  // % of elapsed days completed
  currentStreak: number;        // consecutive days with score >= 30
  longestStreak: number;

  // Physical Training
  recordedWorkoutDays: number;
  workoutConsistencyRate: number; // % of elapsed days with PT
  totalRunDistanceKm: number;
  totalPushUps: number;
  totalPullUps: number;
  totalSitUps: number;
  totalSwimmingLaps: number;

  // SSB Preparation
  totalSSBSessions: number;
  totalSSBMinutes: number;
  ssbActivityBreakdown: Record<SSBActivity, number>;

  // Academic Studies
  totalStudyMinutes: number;
  studyHours: number;
  studySubjectBreakdown: Record<StudySubject, number>;

  // CHRONOS Focus
  todayFocusMinutes: number;
  totalChronosFocusMinutes: number;

  // Weekly Breakdown (Weeks 1 to 13)
  weeklyBreakdown: WeekAnalytics[];
}

export function computeProgrammeAnalytics(
  days: DayEntry[],
  currentDayNumber: number,
): ProgrammeAnalytics {
  const elapsedDays = Math.max(0, Math.min(currentDayNumber, TOTAL_DAYS));
  const activeDays = days.filter((d) => d.dayNumber <= elapsedDays);

  // Completion metrics
  const completedDays = activeDays.filter((d) => d.completionScore >= 60).length;
  const goldDays = activeDays.filter((d) => d.completionScore >= 85).length;
  const partialDays = activeDays.filter((d) => d.completionScore > 0 && d.completionScore < 60).length;
  const missedDays = activeDays.filter((d) => d.completionScore === 0).length;
  const dailyCompletionRate = elapsedDays > 0 ? Math.round((completedDays / elapsedDays) * 100) : 0;

  // Streaks
  let currentStreak = 0;
  for (let n = elapsedDays; n >= 1; n--) {
    const d = days.find((x) => x.dayNumber === n);
    if (d && d.completionScore >= 30) currentStreak++;
    else break;
  }

  let longestStreak = 0;
  let tempStreak = 0;
  for (let n = 1; n <= elapsedDays; n++) {
    const d = days.find((x) => x.dayNumber === n);
    if (d && d.completionScore >= 30) {
      tempStreak++;
      if (tempStreak > longestStreak) longestStreak = tempStreak;
    } else {
      tempStreak = 0;
    }
  }

  // PT Metrics
  let recordedWorkoutDays = 0;
  let totalRunDistanceKm = 0;
  let totalPushUps = 0;
  let totalPullUps = 0;
  let totalSitUps = 0;
  let totalSwimmingLaps = 0;

  // SSB Metrics
  let totalSSBSessions = 0;
  let totalSSBMinutes = 0;
  const ssbActivityBreakdown: Record<SSBActivity, number> = {
    OIR: 0,
    PPDT: 0,
    WAT: 0,
    SRT: 0,
    TAT: 0,
    SD: 0,
    GD: 0,
    GTO_1: 0,
    GTO_2: 0,
    INTERVIEW: 0,
    MOCK_TEST: 0,
    READING: 0,
    OTHER: 0,
  };

  // Study Metrics
  let totalStudyMinutes = 0;
  const studySubjectBreakdown: Record<StudySubject, number> = {
    MATHS: 0,
    PHYSICS: 0,
    CHEMISTRY: 0,
    GEOGRAPHY: 0,
    HISTORY: 0,
    CURRENT_AFFAIRS: 0,
    ENGLISH: 0,
    MILITARY_HISTORY: 0,
    LEADERSHIP: 0,
    OTHER: 0,
  };

  days.forEach((day) => {
    // PT aggregation
    if (day.pt) {
      const hasMetric =
        (day.pt.runDistanceKm && day.pt.runDistanceKm > 0) ||
        (day.pt.pushUps && day.pt.pushUps > 0) ||
        (day.pt.pullUps && day.pt.pullUps > 0) ||
        (day.pt.sitUps && day.pt.sitUps > 0);
      if (hasMetric) recordedWorkoutDays++;

      if (day.pt.runDistanceKm) totalRunDistanceKm += day.pt.runDistanceKm;
      if (day.pt.pushUps) totalPushUps += day.pt.pushUps;
      if (day.pt.pullUps) totalPullUps += day.pt.pullUps;
      if (day.pt.sitUps) totalSitUps += day.pt.sitUps;
      if (day.pt.swimmingLaps) totalSwimmingLaps += day.pt.swimmingLaps;
    }

    // SSB aggregation
    if (day.ssb) {
      if (day.ssb.activities && day.ssb.activities.length > 0) {
        totalSSBSessions += day.ssb.activities.length;
        day.ssb.activities.forEach((act) => {
          if (ssbActivityBreakdown[act] !== undefined) {
            ssbActivityBreakdown[act]++;
          }
        });
      }
      if (day.ssb.durationMin) {
        totalSSBMinutes += day.ssb.durationMin;
      }
    }

    // Study aggregation
    if (day.studies && Array.isArray(day.studies)) {
      day.studies.forEach((session) => {
        const min = session.durationMin || 0;
        totalStudyMinutes += min;
        if (studySubjectBreakdown[session.subject] !== undefined) {
          studySubjectBreakdown[session.subject] += min;
        }
      });
    }
  });

  const workoutConsistencyRate = elapsedDays > 0 ? Math.round((recordedWorkoutDays / elapsedDays) * 100) : 0;
  const studyHours = +(totalStudyMinutes / 60).toFixed(1);

  // CHRONOS focus metrics
  const todayEntry = days.find((d) => d.dayNumber === currentDayNumber);
  const todayDate = todayEntry?.date || new Date().toISOString().split('T')[0];
  const todayFocusMinutes = getFocusMinutesForDate(todayDate);
  const totalChronosFocusMinutes = getTotalChronosFocusMinutes();

  // Weekly breakdown across 13 weeks
  const weeklyBreakdown: WeekAnalytics[] = [];
  const totalWeeks = Math.ceil(TOTAL_DAYS / 7);

  for (let w = 1; w <= totalWeeks; w++) {
    const startDay = (w - 1) * 7 + 1;
    const endDay = Math.min(startDay + 6, TOTAL_DAYS);
    const weekDays = days.filter((d) => d.dayNumber >= startDay && d.dayNumber <= endDay);
    const weekActiveDays = weekDays.filter((d) => d.dayNumber <= elapsedDays);

    const weekCompleted = weekActiveDays.filter((d) => d.completionScore >= 60).length;
    const weekRate = weekActiveDays.length > 0 ? Math.round((weekCompleted / weekActiveDays.length) * 100) : 0;

    const weekPTMin = weekDays.reduce((sum, d) => sum + (d.pt?.runTimeMin || 0), 0);
    const weekStudyMin = weekDays.reduce(
      (sum, d) => sum + (d.studies?.reduce((s, st) => s + (st.durationMin || 0), 0) || 0),
      0,
    );
    const weekSSBMin = weekDays.reduce((sum, d) => sum + (d.ssb?.durationMin || 0), 0);
    const weekChronosMin = weekDays.reduce((sum, d) => sum + (d.chronosFocusMinutes || 0), 0);

    weeklyBreakdown.push({
      weekNumber: w,
      phaseId: getPhaseForDay(startDay),
      startDate: weekDays[0]?.date || '',
      endDate: weekDays[weekDays.length - 1]?.date || '',
      totalDaysInWeek: weekDays.length,
      completedDays: weekCompleted,
      completionRate: weekRate,
      totalPTMinutes: weekPTMin,
      totalStudyMinutes: weekStudyMin,
      totalSSBMinutes: weekSSBMin,
      chronosFocusMinutes: weekChronosMin,
    });
  }

  return {
    totalDays: TOTAL_DAYS,
    currentDayNumber: elapsedDays,
    elapsedDays,
    completedDays,
    goldDays,
    partialDays,
    missedDays,
    dailyCompletionRate,
    currentStreak,
    longestStreak,
    recordedWorkoutDays,
    workoutConsistencyRate,
    totalRunDistanceKm: +totalRunDistanceKm.toFixed(1),
    totalPushUps,
    totalPullUps,
    totalSitUps,
    totalSwimmingLaps,
    totalSSBSessions,
    totalSSBMinutes,
    ssbActivityBreakdown,
    totalStudyMinutes,
    studyHours,
    studySubjectBreakdown,
    todayFocusMinutes,
    totalChronosFocusMinutes,
    weeklyBreakdown,
  };
}
