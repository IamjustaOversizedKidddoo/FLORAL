// ============================================================
// DAGGERS KNOWLEDGE ACADEMY SERVICE
// Searchable knowledge base, domain indexing & mastery tracking
// ============================================================

import type { DayEntry, KnowledgeDomain, KnowledgeLesson, MasteryStatus } from '../types';
import { COMPLETE_90_DAY_CURRICULUM } from '../data/curriculumData';

export interface IndexedLesson extends KnowledgeLesson {
  dayNumber: number;
  phaseId: 'FOUNDATION' | 'HARDENING' | 'OPERATOR';
  mastery: MasteryStatus;
  quizPassed: boolean;
}

export function getAllIndexedLessons(days: DayEntry[] = []): IndexedLesson[] {
  const dayMap = new Map<number, DayEntry>();
  days.forEach((d) => dayMap.set(d.dayNumber, d));

  return COMPLETE_90_DAY_CURRICULUM.map((mission) => {
    const entry = dayMap.get(mission.dayNumber);
    const sub = entry?.lessonSubmission;

    return {
      ...mission.learningLesson,
      dayNumber: mission.dayNumber,
      phaseId: mission.phaseId,
      mastery: sub?.mastery || 'NOT_STARTED',
      quizPassed: Boolean(sub?.isQuizPassed),
    };
  });
}

export function searchLessons(
  lessons: IndexedLesson[],
  query: string,
  domainFilter?: KnowledgeDomain | 'ALL',
  masteryFilter?: MasteryStatus | 'ALL',
): IndexedLesson[] {
  const cleanQuery = query.trim().toLowerCase();

  return lessons.filter((lesson) => {
    // Domain match
    if (domainFilter && domainFilter !== 'ALL' && lesson.domain !== domainFilter) {
      return false;
    }

    // Mastery match
    if (masteryFilter && masteryFilter !== 'ALL' && lesson.mastery !== masteryFilter) {
      return false;
    }

    // Text search
    if (cleanQuery) {
      const inTitle = lesson.title.toLowerCase().includes(cleanQuery);
      const inObjective = lesson.objective.toLowerCase().includes(cleanQuery);
      const inExplanation = lesson.explanation.toLowerCase().includes(cleanQuery);
      const inTakeaways = lesson.keyTakeaways.some((t) => t.toLowerCase().includes(cleanQuery));

      return inTitle || inObjective || inExplanation || inTakeaways;
    }

    return true;
  });
}
