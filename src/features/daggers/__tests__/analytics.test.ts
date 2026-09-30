// ============================================================
// ANALYTICS ENGINE TESTS
// Verifies pure calculations from recorded DayEntry & CHRONOS data
// Tests completion rates, study hours, workout consistency, and weekly matrix
// ============================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { computeProgrammeAnalytics } from '../services/analyticsService';
import { createDefaultStore, updateDayEntry } from '../storageService';

describe('Analytics Telemetry Engine', () => {
  let mockStorage: Record<string, string> = {};

  beforeEach(() => {
    mockStorage = {};
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => mockStorage[key] ?? null,
      setItem: (key: string, value: string) => {
        mockStorage[key] = value;
      },
      removeItem: (key: string) => {
        delete mockStorage[key];
      },
      clear: () => {
        mockStorage = {};
      },
    });
  });
  it('computes 0% rates when no days have been logged', () => {
    const store = createDefaultStore({
      startDate: new Date().toISOString().split('T')[0],
      programmeTitle: '90-Day Probation',
      targetUnit: '4 PARA SF',
    });

    const analytics = computeProgrammeAnalytics(store.days, 1);
    expect(analytics.completedDays).toBe(0);
    expect(analytics.dailyCompletionRate).toBe(0);
    expect(analytics.currentStreak).toBe(0);
    expect(analytics.workoutConsistencyRate).toBe(0);
    expect(analytics.studyHours).toBe(0);
    expect(analytics.totalSSBSessions).toBe(0);
  });

  it('calculates completion rate and consistency based strictly on recorded workouts and studies', () => {
    let store = createDefaultStore({
      startDate: '2026-03-01',
      programmeTitle: '90-Day Probation',
      targetUnit: '4 PARA SF',
    });

    // Day 1: Full completion (100%)
    store = updateDayEntry(store, 1, {
      pt: { runDistanceKm: 5.0, pushUps: 30, pullUps: 10, sitUps: 40 },
      ssb: { activities: ['OIR', 'PPDT'], durationMin: 60 },
      studies: [
        { subject: 'MATHS', durationMin: 60 },
        { subject: 'PHYSICS', durationMin: 60 },
      ],
      reflection: { text: 'Outstanding execution on Day 1.', mood: 5, overallRating: 5 },
    });

    // Day 2: Partial completion (workout only)
    store = updateDayEntry(store, 2, {
      pt: { runDistanceKm: 4.0, pushUps: 25 },
    });

    // If today is Day 2 (2 elapsed days)
    const analytics = computeProgrammeAnalytics(store.days, 2);

    expect(analytics.elapsedDays).toBe(2);
    expect(analytics.completedDays).toBe(1); // Day 1 completed (>= 60)
    expect(analytics.goldDays).toBe(1);      // Day 1 >= 85
    expect(analytics.partialDays).toBe(1);   // Day 2 is partial (score ~18)
    expect(analytics.dailyCompletionRate).toBe(50); // 1 out of 2 = 50%

    // Workout metrics
    expect(analytics.recordedWorkoutDays).toBe(2);
    expect(analytics.workoutConsistencyRate).toBe(100); // 2 out of 2 = 100%
    expect(analytics.totalRunDistanceKm).toBe(9.0);      // 5.0 + 4.0
    expect(analytics.totalPushUps).toBe(55);             // 30 + 25

    // Study & SSB metrics
    expect(analytics.totalStudyMinutes).toBe(120);
    expect(analytics.studyHours).toBe(2.0);
    expect(analytics.totalSSBSessions).toBe(2);
    expect(analytics.ssbActivityBreakdown.OIR).toBe(1);
    expect(analytics.ssbActivityBreakdown.PPDT).toBe(1);
  });

  it('calculates week-by-week telemetry across all 13 weeks correctly', () => {
    let store = createDefaultStore({
      startDate: '2026-03-01',
      programmeTitle: '90-Day Probation',
      targetUnit: '4 PARA SF',
    });

    // Log days 1, 2, 3 in week 1
    for (let day = 1; day <= 3; day++) {
      store = updateDayEntry(store, day, {
        pt: { runDistanceKm: 5, pushUps: 30 },
        ssb: { activities: ['OIR'], durationMin: 60 },
        studies: [{ subject: 'MATHS', durationMin: 120 }],
        reflection: { text: `Day ${day} completed according to plan.`, mood: 4, overallRating: 4 },
      });
    }

    const analytics = computeProgrammeAnalytics(store.days, 7); // Week 1 elapsed
    expect(analytics.weeklyBreakdown).toHaveLength(13);

    const week1 = analytics.weeklyBreakdown[0];
    expect(week1.weekNumber).toBe(1);
    expect(week1.phaseId).toBe('FOUNDATION');
    expect(week1.completedDays).toBe(3);
    expect(week1.completionRate).toBe(43); // 3/7 = 43%
  });
});
