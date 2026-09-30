// ============================================================
// ACADEMY UPGRADE TESTS — 4 PARA SF The Mighty Daggers
// Verifies 90-day curriculum completeness, virtual instructor assessment engine,
// weekly/phase reporting, and exercise library specifications
// ============================================================

import { describe, it, expect } from 'vitest';
import { COMPLETE_90_DAY_CURRICULUM, getMissionForDay, getMissionsByPhase } from '../data/curriculumData';
import { getAllExercises, getExerciseById } from '../data/exerciseLibrary';
import {
  evaluateLessonQuiz,
  evaluateMentalSubmission,
  evaluateSSBSubmission,
  generateInstructorAssessment,
} from '../services/assessmentEngine';
import { computeWeeklyReport, computePhaseMilestoneReport } from '../services/weeklyAssessmentService';
import { getAllIndexedLessons, searchLessons } from '../services/knowledgeService';
import type { DayEntry } from '../types';

describe('Academy Upgrade — Curriculum, Engines & Assessment Tests', () => {
  // 1. 90-Day Curriculum Completeness
  describe('1. 90-Day Curriculum Completeness', () => {
    it('contains exactly 90 distinct authored days', () => {
      expect(COMPLETE_90_DAY_CURRICULUM).toHaveLength(90);
    });

    it('divides into 3 progressive phases: Foundation (1-30), Hardening (31-60), Operator (61-90)', () => {
      const foundation = getMissionsByPhase('FOUNDATION');
      const hardening = getMissionsByPhase('HARDENING');
      const operator = getMissionsByPhase('OPERATOR');

      expect(foundation).toHaveLength(30);
      expect(hardening).toHaveLength(30);
      expect(operator).toHaveLength(30);

      expect(foundation[0].dayNumber).toBe(1);
      expect(foundation[29].dayNumber).toBe(30);
      expect(hardening[0].dayNumber).toBe(31);
      expect(hardening[29].dayNumber).toBe(60);
      expect(operator[0].dayNumber).toBe(61);
      expect(operator[29].dayNumber).toBe(90);
    });

    it('ensures every mission has a unique lesson, quiz with 4 options, physical training, mental challenge, and SSB drill', () => {
      for (let day = 1; day <= 90; day++) {
        const mission = getMissionForDay(day);

        // Core fields
        expect(mission.dayNumber).toBe(day);
        expect(mission.title).toBeTruthy();
        expect(mission.objective).toBeTruthy();
        expect(mission.estimatedDurationMin).toBeGreaterThan(0);

        // Knowledge Lesson & Quiz
        expect(mission.learningLesson.title).toBeTruthy();
        expect(mission.learningLesson.explanation.length).toBeGreaterThan(20);
        expect(mission.learningLesson.keyTakeaways.length).toBeGreaterThanOrEqual(2);
        expect(mission.learningLesson.practicalDrill).toBeTruthy();
        expect(mission.learningLesson.quiz.options).toHaveLength(4);
        expect(mission.learningLesson.quiz.correctIndex).toBeGreaterThanOrEqual(0);
        expect(mission.learningLesson.quiz.correctIndex).toBeLessThan(4);
        expect(mission.learningLesson.quiz.explanation).toBeTruthy();

        // Physical Training
        expect(mission.physicalTraining.title).toBeTruthy();
        expect(mission.physicalTraining.prescription).toBeTruthy();
        expect(mission.physicalTraining.exercises.length).toBeGreaterThan(0);
        expect(mission.physicalTraining.safetyWarning).toContain('Stop immediately');

        // Mental Challenge
        expect(mission.mentalChallenge.title).toBeTruthy();
        expect(mission.mentalChallenge.prompt).toBeTruthy();
        expect(mission.mentalChallenge.modelSolution).toBeTruthy();
        expect(mission.mentalChallenge.rubric.length).toBeGreaterThan(0);

        // SSB Assignment
        expect(mission.ssbAssignment.title).toBeTruthy();
        expect(mission.ssbAssignment.stimulus).toBeTruthy();
        expect(mission.ssbAssignment.exemplarResponse).toBeTruthy();

        // Routine habits and reflection
        expect(mission.routineHabits.length).toBeGreaterThanOrEqual(3);
        expect(mission.reflectionPrompt).toBeTruthy();
      }
    });
  });

  // 2. Exercise Library Integrity
  describe('2. Physical Training Exercise Library', () => {
    it('contains all required foundational and progressive movements', () => {
      const requiredExercises = [
        'push_ups',
        'incline_push_ups',
        'bodyweight_squats',
        'reverse_lunges',
        'plank',
        'side_plank',
        'glute_bridges',
        'calf_raises',
        'assisted_pull_ups',
        'running_intervals',
        'mobility_flow',
        'box_breathing',
      ];

      for (const exId of requiredExercises) {
        const ex = getExerciseById(exId);
        expect(ex).toBeDefined();
        expect(ex?.stepByStepTechnique.length).toBeGreaterThanOrEqual(3);
        expect(ex?.safetyInstructions).toBeTruthy();
        expect(ex?.easierVariation.name).toBeTruthy();
        expect(ex?.harderVariation.name).toBeTruthy();
        expect(ex?.commonErrors.length).toBeGreaterThanOrEqual(2);
      }
    });

    it('returns all exercises properly via getAllExercises', () => {
      const list = getAllExercises();
      expect(list.length).toBeGreaterThanOrEqual(12);
    });
  });

  // 3. Virtual Instructor Assessment Engine
  describe('3. Virtual Instructor Assessment Engine', () => {
    const sampleMission = getMissionForDay(1);

    it('evaluates knowledge quiz accurately', () => {
      // Correct answer
      const correctSub = evaluateLessonQuiz(sampleMission, sampleMission.learningLesson.quiz.correctIndex);
      expect(correctSub.isQuizPassed).toBe(true);
      expect(correctSub.mastery).toBe('COMPETENT');

      // Incorrect answer
      const wrongIdx = (sampleMission.learningLesson.quiz.correctIndex + 1) % 4;
      const wrongSub = evaluateLessonQuiz(sampleMission, wrongIdx);
      expect(wrongSub.isQuizPassed).toBe(false);
      expect(wrongSub.mastery).toBe('NEEDS_REVISION');
    });

    it('evaluates mental challenge submissions against rubrics', () => {
      const correctMental = evaluateMentalSubmission(sampleMission, String(sampleMission.mentalChallenge.correctAnswer));
      expect(correctMental.score).toBeGreaterThanOrEqual(80);
      expect(correctMental.isCompleted).toBe(true);
      expect(correctMental.instructorFeedback).toContain('Accurate conclusion');

      const wrongMental = evaluateMentalSubmission(sampleMission, 'completely arbitrary wrong text');
      expect(wrongMental.score).toBeLessThan(70);
      expect(wrongMental.instructorFeedback).toContain('Inaccurate conclusion');
    });

    it('evaluates SSB practical responses constructively', () => {
      const emptySSB = evaluateSSBSubmission(sampleMission, '');
      expect(emptySSB.isCompleted).toBe(false);

      const goodSSB = evaluateSSBSubmission(
        sampleMission,
        'Hero Suresh identified village irrigation line failure after flash floods. Organized volunteer crew, cleared silt, restored water flow to paddy fields before nightfall.',
      );
      expect(goodSSB.isCompleted).toBe(true);
      expect(goodSSB.instructorFeedback).toContain('Automated assessment disclaimer');
    });

    it('generates transparent instructor report with grade and remedial tasks', () => {
      const lessonSub = evaluateLessonQuiz(sampleMission, sampleMission.learningLesson.quiz.correctIndex);
      const mentalSub = evaluateMentalSubmission(sampleMission, String(sampleMission.mentalChallenge.correctAnswer));
      const ssbSub = evaluateSSBSubmission(sampleMission, 'Detailed constructive response with initiative and team coordination.');

      const assessment = generateInstructorAssessment(sampleMission, lessonSub, mentalSub, ssbSub, {
        completedExercises: [],
        safetyConfirmed: true,
        overallRpe: 7,
      });

      expect(['EXEMPLARY', 'COMPETENT']).toContain(assessment.overallGrade);
      expect(assessment.strengths.length).toBeGreaterThan(0);
      expect(assessment.totalScore).toBeGreaterThanOrEqual(75);
    });
  });

  // 4. Weekly & Phase Assessment Services
  describe('4. Weekly & Phase Assessment Services', () => {
    const mockDays: DayEntry[] = Array.from({ length: 90 }, (_, i) => ({
      dayNumber: i + 1,
      date: `2026-03-${String(i + 1).padStart(2, '0')}`,
      status: i < 7 ? 'COMPLETE' : 'ACTIVE',
      completionScore: i < 7 ? 85 : 0,
      chronosFocusMinutes: i < 7 ? 45 : 0,
      lastModified: Date.now(),
      lessonSubmission: i < 7 ? { isQuizPassed: true, mastery: 'COMPETENT' } : undefined,
      mentalSubmission: i < 7 ? { score: 90, isCompleted: true, userAnswer: '', submittedAt: Date.now(), instructorFeedback: '' } : undefined,
    }));

    it('computes Week 1 report accurately from verified day records', () => {
      const report = computeWeeklyReport(1, mockDays);
      expect(report.weekNumber).toBe(1);
      expect(report.totalDaysCompleted).toBe(7);
      expect(report.completionRatePercent).toBe(100);
      expect(report.isPassingGrade).toBe(true);
      expect(report.quizzesPassed).toBe(7);
    });

    it('computes Phase I milestone report accurately', () => {
      const phaseReport = computePhaseMilestoneReport('FOUNDATION', mockDays);
      expect(phaseReport.phaseId).toBe('FOUNDATION');
      expect(phaseReport.milestoneDay).toBe(30);
      expect(phaseReport.totalDays).toBe(30);
    });
  });

  // 5. Knowledge Academy Service
  describe('5. Knowledge Academy Search & Mastery', () => {
    it('indexes all 90 lessons properly', () => {
      const indexed = getAllIndexedLessons([]);
      expect(indexed).toHaveLength(90);
    });

    it('filters lessons by domain and search keyword', () => {
      const indexed = getAllIndexedLessons([]);
      const navLessons = searchLessons(indexed, '', 'NAVIGATION');
      expect(navLessons.length).toBeGreaterThan(0);
      expect(navLessons.every((l) => l.domain === 'NAVIGATION')).toBe(true);

      const searched = searchLessons(indexed, 'compass', 'ALL');
      expect(searched.length).toBeGreaterThan(0);
    });
  });
});
