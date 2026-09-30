// ============================================================
// DAGGERS TYPES — 4 PARA SF 90-Day Probation Period
// Single source of truth for all tracker types
// ============================================================

// --- Training Categories ---
export type TrainingCategory = 'PT' | 'SSB' | 'STUDIES' | 'REFLECTION';

// --- Physical Training ---
export interface PTSession {
  runDistanceKm?: number;
  runTimeMin?: number;
  pushUps?: number;
  pullUps?: number;
  sitUps?: number;
  swimmingLaps?: number;
  customDrills?: string;
  notes?: string;
}

// --- SSB Preparation ---
export type SSBActivity =
  | 'OIR'        // Officers Intelligence Rating
  | 'PPDT'       // Picture Perception & Discussion Test
  | 'WAT'        // Word Association Test
  | 'SRT'        // Situation Reaction Test
  | 'TAT'        // Thematic Apperception Test
  | 'SD'         // Self Description
  | 'GD'         // Group Discussion
  | 'GTO_1'      // Group Testing Officer tasks (day 1)
  | 'GTO_2'      // Group Testing Officer tasks (day 2)
  | 'INTERVIEW'  // Personal Interview practice
  | 'MOCK_TEST'  // Full mock SSB
  | 'READING'    // Current affairs / military history
  | 'OTHER';

export interface SSBSession {
  activities: SSBActivity[];
  durationMin?: number;
  topics?: string;
  notes?: string;
}

// --- Studies ---
export type StudySubject =
  | 'MATHS'
  | 'PHYSICS'
  | 'CHEMISTRY'
  | 'GEOGRAPHY'
  | 'HISTORY'
  | 'CURRENT_AFFAIRS'
  | 'ENGLISH'
  | 'MILITARY_HISTORY'
  | 'LEADERSHIP'
  | 'OTHER';

export interface StudySession {
  subject: StudySubject;
  durationMin: number;
  topicsCovered?: string;
  notes?: string;
}

// --- Daily Reflection ---
export type MoodRating = 1 | 2 | 3 | 4 | 5;

export interface DailyReflection {
  text: string;           // Free text, max 1000 chars
  mood: MoodRating;       // 1 = Low, 5 = High
  overallRating: MoodRating; // Day rating 1-5
  mentalNote?: string;    // One short phrase to carry forward
}

// --- Day Completion Score (0-100) ---
export type DayStatus = 'LOCKED' | 'ACTIVE' | 'COMPLETE' | 'PARTIAL' | 'MISSED';

// ============================================================
// CORE DAY ENTRY — Single day of the 90-day tracker
// ============================================================
export interface DayEntry {
  dayNumber: number;         // 1 to 90
  date: string;              // ISO: YYYY-MM-DD
  status: DayStatus;

  // Training pillars
  pt?: PTSession;
  ssb?: SSBSession;
  studies?: StudySession[];  // Multiple study blocks per day
  reflection?: DailyReflection;
  routineHabitsCompleted?: string[]; // Completed daily routine habits

  // CHRONOS integration
  chronosFocusMinutes: number;  // Pulled from timerEvents — read-only

  // Computed
  completionScore: number;   // 0-100
  lastModified: number;      // Epoch ms
}

// ============================================================
// PROGRAMME CONFIG — 90-day probation meta
// ============================================================
export interface ProgrammeConfig {
  startDate: string;         // ISO: YYYY-MM-DD — Day 1
  programmeTitle: string;    // Display name
  candidateName?: string;    // Optional personalisation
  targetUnit: string;        // e.g., '4 PARA SF — The Mighty Daggers'
}

// ============================================================
// DAGGERS STATE — Complete runtime state of the tracker
// ============================================================
export interface DaggersState {
  config: ProgrammeConfig;
  days: DayEntry[];          // Always 90 entries
  selectedDay: number | null; // 1-90; null = overview
  currentDayNumber: number;   // Computed from startDate + today
  overallProgress: number;    // 0-100
}

// ============================================================
// WEEKLY SUMMARY — Computed analytics
// ============================================================
export interface WeeklySummary {
  weekNumber: number;         // 1-13 (90 days / 7)
  completedDays: number;
  avgCompletionScore: number;
  totalPTMinutes: number;
  totalStudyMinutes: number;
  totalSSBMinutes: number;
  totalFocusMinutes: number;  // From CHRONOS
}

// ============================================================
// PERSISTENCE — Shape of localStorage store
// ============================================================
export interface DaggersPersistedStore {
  version: number;
  lastSavedTimestamp: number;
  config: ProgrammeConfig;
  days: DayEntry[];
}
