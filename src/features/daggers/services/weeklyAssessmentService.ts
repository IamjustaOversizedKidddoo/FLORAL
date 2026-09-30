// ============================================================
// DAGGERS WEEKLY & PHASE ASSESSMENT SERVICE
// Computes genuine 7-day rolling reviews and 30/60/90-day phase milestones
// ============================================================

import type { DayEntry } from '../types';

export interface WeeklyAssessmentReport {
  weekNumber: number;
  startDay: number;
  endDay: number;
  totalDaysCompleted: number;
  completionRatePercent: number;
  averageScore: number;
  totalPTMinutes: number;
  totalStudyMinutes: number;
  totalFocusMinutes: number;
  quizzesPassed: number;
  mentalChallengesPassed: number;
  ssbExercisesCompleted: number;
  strengths: string[];
  weaknesses: string[];
  remedialRecommendations: string[];
  isPassingGrade: boolean;
}

export interface PhaseMilestoneReport {
  phaseId: 'FOUNDATION' | 'HARDENING' | 'OPERATOR';
  milestoneDay: number; // 30, 60, or 90
  phaseTitle: string;
  totalDays: number;
  completedDays: number;
  averageScore: number;
  physicalProgressionSummary: string;
  knowledgeMasteryCount: number;
  mentalAptitudeAvg: number;
  overallStatus: 'GRADUATED' | 'QUALIFIED' | 'NEEDS_REMEDIAL';
  recommendations: string[];
}

export function computeWeeklyReport(
  weekNumber: number,
  days: DayEntry[],
): WeeklyAssessmentReport {
  const startDay = (weekNumber - 1) * 7 + 1;
  const endDay = Math.min(weekNumber * 7, 90);

  const weekDays = days.filter((d) => d.dayNumber >= startDay && d.dayNumber <= endDay);
  const totalDays = weekDays.length;

  let completedCount = 0;
  let scoreSum = 0;
  let ptMinSum = 0;
  let studyMinSum = 0;
  let focusMinSum = 0;
  let quizzesPassed = 0;
  let mentalPassed = 0;
  let ssbCount = 0;

  weekDays.forEach((day) => {
    if (day.status === 'COMPLETE' || (day.completionScore && day.completionScore >= 70)) {
      completedCount++;
    }
    scoreSum += day.completionScore || 0;
    ptMinSum += day.pt?.runTimeMin || 0;
    if (day.studies) {
      studyMinSum += day.studies.reduce((sum, s) => sum + (s.durationMin || 0), 0);
    }
    focusMinSum += day.chronosFocusMinutes || 0;

    if (day.lessonSubmission?.isQuizPassed) quizzesPassed++;
    if (day.mentalSubmission?.isCompleted) mentalPassed++;
    if (day.ssbSubmission?.isCompleted) ssbCount++;
  });

  const avgScore = totalDays > 0 ? Math.round(scoreSum / totalDays) : 0;
  const completionRate = totalDays > 0 ? Math.round((completedCount / totalDays) * 100) : 0;

  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const remedialRecommendations: string[] = [];

  if (completionRate >= 80) {
    strengths.push(`High discipline: ${completedCount}/${totalDays} days completed with consistent execution.`);
  } else {
    weaknesses.push(`Inconsistent execution: Only ${completedCount}/${totalDays} days completed.`);
    remedialRecommendations.push('Use morning reveille and evening gear preparation to eliminate missed training.');
  }

  if (quizzesPassed >= Math.ceil(totalDays * 0.7)) {
    strengths.push(`Strong academic retention: ${quizzesPassed}/${totalDays} knowledge quizzes passed.`);
  } else {
    weaknesses.push(`Knowledge gaps identified: ${totalDays - quizzesPassed} quizzes missed or failed.`);
    remedialRecommendations.push('Schedule 30 minutes in CHRONOS to review weak topics in the Academy library.');
  }

  if (mentalPassed >= Math.ceil(totalDays * 0.7)) {
    strengths.push('Mental challenge reasoning aligned with officer standards.');
  } else {
    weaknesses.push('Reasoning speed and logical structure require refinement.');
    remedialRecommendations.push('Practice deduction and spatial reasoning drills without rushing.');
  }

  const isPassingGrade = completionRate >= 70 && avgScore >= 65;

  return {
    weekNumber,
    startDay,
    endDay,
    totalDaysCompleted: completedCount,
    completionRatePercent: completionRate,
    averageScore: avgScore,
    totalPTMinutes: ptMinSum,
    totalStudyMinutes: studyMinSum,
    totalFocusMinutes: focusMinSum,
    quizzesPassed,
    mentalChallengesPassed: mentalPassed,
    ssbExercisesCompleted: ssbCount,
    strengths,
    weaknesses,
    remedialRecommendations,
    isPassingGrade,
  };
}

export function computePhaseMilestoneReport(
  phaseId: 'FOUNDATION' | 'HARDENING' | 'OPERATOR',
  days: DayEntry[],
): PhaseMilestoneReport {
  const milestoneDay = phaseId === 'FOUNDATION' ? 30 : phaseId === 'HARDENING' ? 60 : 90;
  const startDay = phaseId === 'FOUNDATION' ? 1 : phaseId === 'HARDENING' ? 31 : 61;

  const phaseDays = days.filter((d) => d.dayNumber >= startDay && d.dayNumber <= milestoneDay);
  const totalDays = phaseDays.length;

  let completedDays = 0;
  let scoreSum = 0;
  let knowledgeMastered = 0;
  let mentalScoreSum = 0;
  let mentalAttempts = 0;

  phaseDays.forEach((d) => {
    if (d.status === 'COMPLETE' || (d.completionScore && d.completionScore >= 70)) {
      completedDays++;
    }
    scoreSum += d.completionScore || 0;
    if (d.lessonSubmission?.mastery === 'COMPETENT') knowledgeMastered++;
    if (d.mentalSubmission?.score) {
      mentalScoreSum += d.mentalSubmission.score;
      mentalAttempts++;
    }
  });

  const avgScore = totalDays > 0 ? Math.round(scoreSum / totalDays) : 0;
  const mentalAptitudeAvg = mentalAttempts > 0 ? Math.round(mentalScoreSum / mentalAttempts) : 0;

  let overallStatus: PhaseMilestoneReport['overallStatus'] = 'NEEDS_REMEDIAL';
  if (completedDays >= Math.ceil(totalDays * 0.8) && avgScore >= 75) {
    overallStatus = 'GRADUATED';
  } else if (completedDays >= Math.ceil(totalDays * 0.6)) {
    overallStatus = 'QUALIFIED';
  }

  const phaseTitle =
    phaseId === 'FOUNDATION'
      ? 'Phase I: Foundation (Days 1–30)'
      : phaseId === 'HARDENING'
      ? 'Phase II: Hardening (Days 31–60)'
      : 'Phase III: Performance (Days 61–90)';

  const physicalProgressionSummary =
    phaseId === 'FOUNDATION'
      ? 'Aerobic baseline established; foundational joint mobility and calisthenics technique verified.'
      : phaseId === 'HARDENING'
      ? 'Volume overload sustained; controlled interval capacity and core stamina elevated.'
      : 'Peak operational benchmark attained; repeatable fitness standards compared directly to baseline.';

  const recommendations: string[] = [];
  if (overallStatus === 'GRADUATED') {
    recommendations.push('Exemplary execution. Advance to next phase curriculum with increased personal standard.');
  } else {
    recommendations.push('Review non-mastered lessons in the Academy before starting high-volume sessions.');
    recommendations.push('Ensure every physical session includes logged sets, reps, and RPE.');
  }

  return {
    phaseId,
    milestoneDay,
    phaseTitle,
    totalDays,
    completedDays,
    averageScore: avgScore,
    physicalProgressionSummary,
    knowledgeMasteryCount: knowledgeMastered,
    mentalAptitudeAvg,
    overallStatus,
    recommendations,
  };
}
