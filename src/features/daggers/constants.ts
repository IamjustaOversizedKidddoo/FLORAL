// ============================================================
// DAGGERS CONSTANTS — 4 PARA SF 90-Day Tracker
// ============================================================

import type { ProgrammeConfig, StudySubject, SSBActivity } from './types';

// --- Storage (fully isolated from CHRONOS's 'chronos_focus_v1') ---
export const DAGGERS_STORAGE_KEY = 'floral_mighty_daggers_tracker_v1' as const;
export const LEGACY_STORAGE_KEY = 'daggers_90day_v1' as const;
export const FOCUS_INTENT_KEY = 'floral_focus_intent_v1' as const;
export const DAGGERS_STORAGE_VERSION = 1 as const;

// --- Programme ---
export const TOTAL_DAYS = 90 as const;

export const DEFAULT_PROGRAMME_CONFIG: ProgrammeConfig = {
  startDate: new Date().toISOString().split('T')[0], // Today by default
  programmeTitle: '90-Day Probation Period',
  targetUnit: '4 PARA SF — THE MIGHTY DAGGERS',
};

// --- Day scoring weights (must sum to 100) ---
export const SCORE_WEIGHTS = {
  PT: 35,
  SSB: 30,
  STUDIES: 25,
  REFLECTION: 10,
} as const;

// --- SSB Activity Labels ---
export const SSB_ACTIVITY_LABELS: Record<SSBActivity, string> = {
  OIR: 'OIR Practice',
  PPDT: 'PPDT',
  WAT: 'Word Association Test',
  SRT: 'Situation Reaction Test',
  TAT: 'TAT',
  SD: 'Self Description',
  GD: 'Group Discussion',
  GTO_1: 'GTO Tasks (Day 1)',
  GTO_2: 'GTO Tasks (Day 2)',
  INTERVIEW: 'Personal Interview',
  MOCK_TEST: 'Full Mock SSB',
  READING: 'Current Affairs / Reading',
  OTHER: 'Other',
};

// --- Study Subject Labels ---
export const STUDY_SUBJECT_LABELS: Record<StudySubject, string> = {
  MATHS: 'Mathematics',
  PHYSICS: 'Physics',
  CHEMISTRY: 'Chemistry',
  GEOGRAPHY: 'Geography',
  HISTORY: 'History',
  CURRENT_AFFAIRS: 'Current Affairs',
  ENGLISH: 'English',
  MILITARY_HISTORY: 'Military History',
  LEADERSHIP: 'Leadership & Ethics',
  OTHER: 'Other',
};

// --- Mood labels ---
export const MOOD_LABELS: Record<number, string> = {
  1: 'Tough Day',
  2: 'Below Par',
  3: 'Solid',
  4: 'Good Day',
  5: 'Outstanding',
};

// --- Completion score thresholds ---
export const SCORE_THRESHOLDS = {
  GOLD: 85,   // Gold badge
  SILVER: 60, // Silver badge
  BRONZE: 30, // Bronze badge
} as const;

// --- Military quotes for the tracker ---
export const DAGGERS_QUOTES = [
  'Who Dares Wins.',
  'Per Ardua ad Astra.',
  'Be the best.',
  'Ready for anything. Anywhere. Anytime.',
  'Selection is a state of mind.',
  'Pain is temporary. Glory is permanent.',
  'Discipline is the soul of an army.',
  'The harder the training, the lighter the battle.',
  'Slow is smooth. Smooth is fast.',
  'Earn your place. Every single day.',
] as const;
