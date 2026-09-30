// ============================================================
// 4 PARA SF PROBATION PERIOD TRACKER — Comprehensive Unit Tests
// Tests date calculations, daily completion, curriculum, editing,
// calendar navigation and persistence isolation
// ============================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  dayNumberToDate,
  todayDayNumber,
  computeCompletionScore,
  createDefaultStore,
  loadDaggersStore,
  saveDaggersStore,
  updateDayEntry,
  updateConfig,
  resetDaggersStore,
} from '../storageService';
import {
  PROGRAMME_90_DAYS,
  getCurriculumForDay,
  getCurriculumByPhase,
} from '../data/programmeData';
import { getPhaseForDay } from '../components/PhaseBadge/PhaseBadge';
import { DAGGERS_STORAGE_KEY, TOTAL_DAYS, SCORE_WEIGHTS } from '../constants';
import type { DayEntry } from '../types';

describe('4 PARA SF — 90-Day Programme Tracker', () => {
  // In-memory mock storage
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

  // ------------------------------------------------------------
  // 1. DATE CALCULATIONS
  // ------------------------------------------------------------
  describe('1. Date Calculations', () => {
    it('calculates correct date strings sequentially from start date', () => {
      const startDate = '2026-03-01';
      expect(dayNumberToDate(startDate, 1)).toBe('2026-03-01');
      expect(dayNumberToDate(startDate, 2)).toBe('2026-03-02');
      expect(dayNumberToDate(startDate, 31)).toBe('2026-03-31');
      expect(dayNumberToDate(startDate, 32)).toBe('2026-04-01');
      expect(dayNumberToDate(startDate, 90)).toBe('2026-05-29');
    });

    it('calculates todayDayNumber accurately relative to start date', () => {
      const today = new Date().toISOString().split('T')[0];
      // If start date is today, current day should be 1
      expect(todayDayNumber(today)).toBe(1);

      // If start date was 9 days ago, current day should be 10
      const tenDaysAgo = new Date(Date.now() - 9 * 86400000).toISOString().split('T')[0];
      expect(todayDayNumber(tenDaysAgo)).toBe(10);

      // If start date is tomorrow, current day should be 0
      const tomorrow = new Date(Date.now() + 1 * 86400000).toISOString().split('T')[0];
      expect(todayDayNumber(tomorrow)).toBe(0);
    });
  });

  // ------------------------------------------------------------
  // 2. 90-DAY PROGRAMME CURRICULUM STRUCTURE & PHASES
  // ------------------------------------------------------------
  describe('2. 90-Day Programme Structure', () => {
    it('contains exactly 90 days of structured training', () => {
      expect(PROGRAMME_90_DAYS).toHaveLength(90);
    });

    it('divides the 90 days into three structured phases', () => {
      const phase1 = getCurriculumByPhase('FOUNDATION');
      const phase2 = getCurriculumByPhase('HARDENING');
      const phase3 = getCurriculumByPhase('OPERATOR');

      expect(phase1).toHaveLength(30);
      expect(phase2).toHaveLength(30);
      expect(phase3).toHaveLength(30);

      expect(getPhaseForDay(1)).toBe('FOUNDATION');
      expect(getPhaseForDay(30)).toBe('FOUNDATION');
      expect(getPhaseForDay(31)).toBe('HARDENING');
      expect(getPhaseForDay(60)).toBe('HARDENING');
      expect(getPhaseForDay(61)).toBe('OPERATOR');
      expect(getPhaseForDay(90)).toBe('OPERATOR');
    });

    it('verifies progressive overload in physical training targets', () => {
      const day1 = getCurriculumForDay(1);
      const day45 = getCurriculumForDay(45);
      const day85 = getCurriculumForDay(85);

      // Running distance increases across phases
      expect(day1.ptTarget.runDistanceKm).toBeLessThan(day45.ptTarget.runDistanceKm);
      expect(day45.ptTarget.runDistanceKm).toBeLessThan(day85.ptTarget.runDistanceKm);

      // Push-ups increase progressively
      expect(day1.ptTarget.pushUps).toBeLessThan(day45.ptTarget.pushUps);
      expect(day45.ptTarget.pushUps).toBeLessThan(day85.ptTarget.pushUps);

      // Pull-ups increase progressively
      expect(day1.ptTarget.pullUps).toBeLessThan(day45.ptTarget.pullUps);
      expect(day45.ptTarget.pullUps).toBeLessThan(day85.ptTarget.pullUps);
    });

    it('ensures every single day contains valid SSB, Study, Routine, and Reflection requirements', () => {
      PROGRAMME_90_DAYS.forEach((curriculum) => {
        expect(curriculum.title).toBeTruthy();
        expect(curriculum.theme).toBeTruthy();
        expect(curriculum.ssbTask.activity).toBeTruthy();
        expect(curriculum.ssbTask.durationMin).toBeGreaterThan(0);
        expect(curriculum.studyTask.subject).toBeTruthy();
        expect(curriculum.studyTask.topic).toBeTruthy();
        expect(curriculum.studyTask.durationMin).toBeGreaterThan(0);
        expect(curriculum.routineHabits.length).toBeGreaterThanOrEqual(3);
        expect(curriculum.reflectionPrompt).toBeTruthy();
      });
    });

    it('clamps day access within [1, 90]', () => {
      expect(getCurriculumForDay(0).dayNumber).toBe(1);
      expect(getCurriculumForDay(-5).dayNumber).toBe(1);
      expect(getCurriculumForDay(100).dayNumber).toBe(90);
    });
  });

  // ------------------------------------------------------------
  // 3. COMPLETION SCORING ENGINE
  // ------------------------------------------------------------
  describe('3. Completion Scoring Engine', () => {
    const blankEntry: DayEntry = {
      dayNumber: 1,
      date: '2026-03-01',
      status: 'ACTIVE',
      chronosFocusMinutes: 0,
      completionScore: 0,
      lastModified: 0,
    };

    it('scores 0 for an empty day entry', () => {
      expect(computeCompletionScore(blankEntry)).toBe(0);
    });

    it('scores PT pillar according to weights', () => {
      // 1 metric logged: half of PT score (17.5 -> 18)
      const singleMetric: DayEntry = {
        ...blankEntry,
        pt: { runDistanceKm: 5 },
      };
      expect(computeCompletionScore(singleMetric)).toBe(Math.round(SCORE_WEIGHTS.PT * 0.5));

      // 2+ metrics logged: full PT score (35)
      const multiMetric: DayEntry = {
        ...blankEntry,
        pt: { runDistanceKm: 5, pushUps: 30 },
      };
      expect(computeCompletionScore(multiMetric)).toBe(SCORE_WEIGHTS.PT);
    });

    it('scores SSB pillar proportionally with 60 min benchmark', () => {
      const ssb30Min: DayEntry = {
        ...blankEntry,
        ssb: { activities: ['OIR'], durationMin: 30 },
      };
      expect(computeCompletionScore(ssb30Min)).toBe(Math.round(SCORE_WEIGHTS.SSB * 0.5));

      const ssb60Min: DayEntry = {
        ...blankEntry,
        ssb: { activities: ['OIR'], durationMin: 60 },
      };
      expect(computeCompletionScore(ssb60Min)).toBe(SCORE_WEIGHTS.SSB);
    });

    it('scores Study pillar with 120 min benchmark', () => {
      const study60Min: DayEntry = {
        ...blankEntry,
        studies: [{ subject: 'MATHS', durationMin: 60 }],
      };
      expect(computeCompletionScore(study60Min)).toBe(Math.round(SCORE_WEIGHTS.STUDIES * 0.5));

      const study120Min: DayEntry = {
        ...blankEntry,
        studies: [
          { subject: 'MATHS', durationMin: 60 },
          { subject: 'PHYSICS', durationMin: 60 },
        ],
      };
      expect(computeCompletionScore(study120Min)).toBe(SCORE_WEIGHTS.STUDIES);
    });

    it('scores Reflection pillar for meaningful reflection entries (>= 20 chars)', () => {
      const shortReflection: DayEntry = {
        ...blankEntry,
        reflection: { text: 'too short', mood: 3, overallRating: 3 },
      };
      expect(computeCompletionScore(shortReflection)).toBe(0);

      const validReflection: DayEntry = {
        ...blankEntry,
        reflection: {
          text: 'Completed all training sessions with high discipline and intensity.',
          mood: 5,
          overallRating: 5,
        },
      };
      expect(computeCompletionScore(validReflection)).toBe(SCORE_WEIGHTS.REFLECTION);
    });

    it('reaches 100% completion when all pillars are fully satisfied', () => {
      const fullDay: DayEntry = {
        ...blankEntry,
        pt: { runDistanceKm: 6.0, pushUps: 40, pullUps: 12, sitUps: 50 },
        ssb: { activities: ['OIR', 'WAT'], durationMin: 60 },
        studies: [{ subject: 'MILITARY_HISTORY', durationMin: 120 }],
        reflection: {
          text: 'Excellent execution today. Handled high lactate thresholds on the tempo run.',
          mood: 5,
          overallRating: 5,
        },
      };
      expect(computeCompletionScore(fullDay)).toBe(100);
    });
  });

  // ------------------------------------------------------------
  // 4. PERSISTENCE, RECOVERY & SETTINGS
  // ------------------------------------------------------------
  describe('4. Persistence & Settings', () => {
    it('creates a default store with exactly 90 days and proper active/locked statuses', () => {
      const store = createDefaultStore({
        startDate: new Date().toISOString().split('T')[0],
        programmeTitle: '90-Day Probation Period',
        targetUnit: '4 PARA SF — THE MIGHTY DAGGERS',
      });

      expect(store.days).toHaveLength(TOTAL_DAYS);
      expect(store.days[0].dayNumber).toBe(1);
      expect(store.days[0].status).toBe('ACTIVE');
      expect(store.days[1].status).toBe('LOCKED');
    });

    it('updates a single day entry and automatically recalculates score and status', () => {
      let store = createDefaultStore();
      store = updateDayEntry(store, 1, {
        pt: { runDistanceKm: 5, pushUps: 30 },
        ssb: { activities: ['OIR'], durationMin: 60 },
        studies: [{ subject: 'GEOGRAPHY', durationMin: 120 }],
        reflection: {
          text: 'Disciplined effort today on all fronts without exception.',
          mood: 4,
          overallRating: 4,
        },
      });

      const day1 = store.days.find((d) => d.dayNumber === 1);
      expect(day1?.completionScore).toBe(100);
      expect(day1?.status).toBe('COMPLETE');
      expect(day1?.lastModified).toBeGreaterThan(0);
    });

    it('handles start date modifications and recomputes day dates and statuses', () => {
      const initialStore = createDefaultStore({
        startDate: '2026-04-01',
        programmeTitle: '90-Day Probation',
        targetUnit: '4 PARA SF',
      });

      expect(initialStore.days[0].date).toBe('2026-04-01');

      const updatedStore = updateConfig(initialStore, { startDate: '2026-05-01' });
      expect(updatedStore.config.startDate).toBe('2026-05-01');
      expect(updatedStore.days[0].date).toBe('2026-05-01');
      expect(updatedStore.days[1].date).toBe('2026-05-02');
    });

    it('recovers gracefully from corrupted JSON in localStorage', () => {
      mockStorage[DAGGERS_STORAGE_KEY] = '{{INVALID_JSON_CORRUPTED}}';
      const loaded = loadDaggersStore();

      expect(loaded).toBeDefined();
      expect(loaded.days).toHaveLength(TOTAL_DAYS);
    });

    it('resets all data cleanly without impacting any other storage keys', () => {
      // Simulate CHRONOS storage key
      mockStorage['chronos_focus_v1'] = JSON.stringify({ chronosData: true });

      let store = createDefaultStore();
      store = updateDayEntry(store, 1, { pt: { runDistanceKm: 10 } });
      saveDaggersStore(store);

      const fresh = resetDaggersStore();
      expect(fresh.days[0].completionScore).toBe(0);

      // Verify CHRONOS storage is 100% untouched
      expect(mockStorage['chronos_focus_v1']).toBe(JSON.stringify({ chronosData: true }));
    });
  });
});
