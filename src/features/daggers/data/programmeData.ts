// ============================================================
// 4 PARA SF 90-DAY PROBATION PROGRAMME CURRICULUM
// Complete day-by-day structured blueprint (Days 1–90)
// Divided into 3 phases: Foundation, Hardening, Operator Readiness
// ============================================================

import type { SSBActivity, StudySubject } from '../types';
import type { PhaseId } from '../components/PhaseBadge/PhaseBadge';
import { COMPLETE_90_DAY_CURRICULUM, getMissionForDay, type DailyCurriculumMission } from './curriculumData';

export type { DailyCurriculumMission };
export { COMPLETE_90_DAY_CURRICULUM, getMissionForDay };

export interface DailyCurriculum {
  dayNumber: number;
  phaseId: PhaseId;
  weekNumber: number;
  title: string;
  theme: string;
  ptTarget: {
    description: string;
    runDistanceKm: number;
    runTimeMin?: number;
    pushUps: number;
    pullUps: number;
    sitUps: number;
    swimmingLaps?: number;
    drills?: string;
  };
  ssbTask: {
    activity: SSBActivity;
    title: string;
    description: string;
    durationMin: number;
  };
  studyTask: {
    subject: StudySubject;
    topic: string;
    durationMin: number;
  };
  routineHabits: string[];
  reflectionPrompt: string;
  mission: DailyCurriculumMission;
}

// Generate the complete 90-day syllabus
function build90DayProgramme(): DailyCurriculum[] {
  const list: DailyCurriculum[] = [];

  const PHASE_I_FOCUS = [
    { title: 'Reveille & Baseline Testing', ssb: 'OIR', sub: 'MATHS', ssbDesc: 'Solve 40 verbal & non-verbal reasoning problems under 30 minutes.', subTopic: 'Number systems, percentages & basic arithmetic' },
    { title: 'Aerobic Base Foundation', ssb: 'PPDT', sub: 'GEOGRAPHY', ssbDesc: '1 picture perception test. Write 1-minute story, 3-minute narration practice.', subTopic: 'Indian physical geography: Northern frontiers & passes' },
    { title: 'Upper Body Conditioning', ssb: 'WAT', sub: 'CURRENT_AFFAIRS', ssbDesc: '60 words association test (15 seconds per word). Fast spontaneous thoughts.', subTopic: 'National security overview & recent border developments' },
    { title: 'Core Stabilization & Flexibility', ssb: 'SRT', sub: 'PHYSICS', ssbDesc: '30 Situations in 15 minutes. Decisive, constructive action-oriented responses.', subTopic: 'Mechanics, kinetics, work, power & energy' },
    { title: 'Pacing & Endurance Run', ssb: 'TAT', sub: 'MILITARY_HISTORY', ssbDesc: '4 TAT slides. Portray proactive hero with leadership, empathy, and initiative.', subTopic: '1971 Indo-Pak War: Eastern Command operations & airborne drops' },
    { title: 'Calisthenics Density Session', ssb: 'SD', sub: 'ENGLISH', ssbDesc: 'Self Description drafting: parents, teachers, friends, own self-view.', subTopic: 'Active vocabulary, concise military report phrasing & synonyms' },
    { title: 'Active Recovery & Kit Maintenance', ssb: 'READING', sub: 'LEADERSHIP', ssbDesc: 'Read 3 editorial columns analyzing strategic Indian ocean defense postures.', subTopic: 'Principles of Military Leadership: Integrity, courage, decisiveness' },
  ];

  const PHASE_II_FOCUS = [
    { title: 'Tempo Run & Lactate Threshold', ssb: 'OIR', sub: 'PHYSICS', ssbDesc: 'Timed advanced OIR test (50 questions in 25 min). Target >90% accuracy.', subTopic: 'Thermodynamics, optics, wave optics & radar fundamentals' },
    { title: 'Strength Endurance & Pull-Up Overload', ssb: 'GD', sub: 'CURRENT_AFFAIRS', ssbDesc: 'Group discussion prep: 20 min speech practice on Indo-Pacific quad alliances.', subTopic: 'Modern geopolitical alliances and regional balance of power' },
    { title: 'High-Volume Push-Up & Core Circuit', ssb: 'TAT', sub: 'MILITARY_HISTORY', ssbDesc: 'Full 12-slide TAT session (11 pictures + 1 blank). High resourcefulness.', subTopic: '1999 Kargil Conflict: Battle of Tololing & Tiger Hill operations' },
    { title: 'Hill Sprint / Weighted Pack Strides', ssb: 'SRT', sub: 'GEOGRAPHY', ssbDesc: 'Full 60 SRT questions under 30 minutes. Rapid officer-like problem solving.', subTopic: 'Strategic straits, choke points & international sea lanes' },
    { title: 'Interval Run & Speed Play (Fartlek)', ssb: 'WAT', sub: 'MATHS', ssbDesc: 'Timed 60-word WAT with strict 15s buzzer. Positive and solution-oriented.', subTopic: 'Probability, statistics, permutations & combinations' },
    { title: 'Functional Endurance & Agility Drills', ssb: 'INTERVIEW', sub: 'LEADERSHIP', ssbDesc: 'Personal interview practice: PIQ verification, handling counter-questions.', subTopic: 'Crisis management, extreme ownership & officer qualities (OLQs)' },
    { title: 'Long Endurance March & Mobility', ssb: 'MOCK_TEST', sub: 'CURRENT_AFFAIRS', ssbDesc: 'Comprehensive psychological battery mock review (TAT, WAT, SRT, SD).', subTopic: 'Indigenous defense manufacturing: Make in India & Atmanirbhar Bharat' },
  ];

  const PHASE_III_FOCUS = [
    { title: 'Operator Standard 8km Time Trial', ssb: 'MOCK_TEST', sub: 'MILITARY_HISTORY', ssbDesc: 'Simulated Day 1 Screening: Timed OIR + PPDT discussion group simulation.', subTopic: 'History of Parachute Regiment and Special Forces operations' },
    { title: 'Max Calisthenics Battery (SF Benchmark)', ssb: 'GTO_1', sub: 'GEOGRAPHY', ssbDesc: 'GTO indoor planning: Military Planning Exercise (MPE) with resource allocation.', subTopic: 'Himalayan terrain, glaciology, high altitude survival & passes' },
    { title: 'Speed Endurance & Sprint Intervals', ssb: 'INTERVIEW', sub: 'LEADERSHIP', ssbDesc: 'Rapid-fire personal interview pressure simulation (stress testing).', subTopic: 'Ethical command under ambiguity, psychological resilience' },
    { title: 'Heavy Ruck Endurance / Weighted Strides', ssb: 'WAT', sub: 'CURRENT_AFFAIRS', ssbDesc: '60 rapid-fire defense/leadership trigger words with high mental clarity.', subTopic: 'Space, cyber warfare & drone integration in contemporary battle' },
    { title: 'Combined Upper Body & Core Volume', ssb: 'SRT', sub: 'PHYSICS', ssbDesc: '60 complex tactical/moral situations. Fast, decisive, moral integrity.', subTopic: 'Nuclear, ballistic & drone defense systems engineering' },
    { title: 'Continuous Trail / Outdoor Ruck Run', ssb: 'TAT', sub: 'ENGLISH', ssbDesc: '12 TAT slides with stress prompts. High officer-like qualities under fatigue.', subTopic: 'Professional brief writing, clear oral exposition & brevity' },
    { title: 'Tactical Rest, Mobility & Final Review', ssb: 'READING', sub: 'MILITARY_HISTORY', ssbDesc: 'Deep study of special operation citations (PVC, MVC, Ashok Chakra).', subTopic: 'Case studies: Operation Khukri, Mandhol Raid & counter-terror missions' },
  ];

  for (let day = 1; day <= 90; day++) {
    const weekNumber = Math.ceil(day / 7);
    let phaseId: PhaseId;
    let focusTemplate;

    if (day <= 30) {
      phaseId = 'FOUNDATION';
      const index = (day - 1) % PHASE_I_FOCUS.length;
      focusTemplate = PHASE_I_FOCUS[index];
    } else if (day <= 60) {
      phaseId = 'HARDENING';
      const index = (day - 31) % PHASE_II_FOCUS.length;
      focusTemplate = PHASE_II_FOCUS[index];
    } else {
      phaseId = 'OPERATOR';
      const index = (day - 61) % PHASE_III_FOCUS.length;
      focusTemplate = PHASE_III_FOCUS[index];
    }

    // Progressive physical metrics
    let runDist = 3.0;
    let pushUps = 20;
    let pullUps = 5;
    let sitUps = 25;
    let swimLaps: number | undefined = undefined;

    if (phaseId === 'FOUNDATION') {
      runDist = +(2.5 + (day * 0.1)).toFixed(1); // 2.6 to 5.5 km
      pushUps = 20 + Math.floor(day * 0.7);      // 20 to 41
      pullUps = 4 + Math.floor(day * 0.25);      // 4 to 11
      sitUps = 25 + Math.floor(day * 0.9);       // 25 to 52
    } else if (phaseId === 'HARDENING') {
      const relDay = day - 30;
      runDist = +(5.0 + (relDay * 0.12)).toFixed(1); // 5.1 to 8.6 km
      pushUps = 42 + Math.floor(relDay * 0.7);       // 42 to 63
      pullUps = 11 + Math.floor(relDay * 0.25);      // 11 to 18
      sitUps = 52 + Math.floor(relDay * 0.8);        // 52 to 76
      if (day % 4 === 0) swimLaps = 12 + Math.floor(relDay * 0.4);
    } else {
      const relDay = day - 60;
      runDist = +(7.5 + (relDay * 0.1)).toFixed(1); // 7.6 to 10.5 km
      pushUps = 62 + Math.floor(relDay * 0.6);      // 62 to 80
      pullUps = 18 + Math.floor(relDay * 0.25);     // 18 to 25
      sitUps = 75 + Math.floor(relDay * 0.5);       // 75 to 90
      if (day % 3 === 0) swimLaps = 20 + Math.floor(relDay * 0.3);
    }

    const reflectionPrompts = [
      'Did you execute today without hesitation or excuses? Where did your mind seek an easy exit?',
      'How was your composure when physical fatigue set in? Did form hold?',
      'Reflect on one decision today where you chose discipline over immediate comfort.',
      'Did you complete the mental study with full concentration, or merely clock in the minutes?',
      'How can you raise the standard of your execution tomorrow by 1%?',
      'When your body wanted to stop today, what was the internal dialogue that kept you going?',
      'How does today’s effort contribute to the caliber of officer and leader you are building?',
    ];

    list.push({
      dayNumber: day,
      phaseId,
      weekNumber,
      title: `Day ${day}: ${focusTemplate.title}`,
      theme: phaseId === 'FOUNDATION'
        ? 'Consistency, discipline & aerobic base'
        : phaseId === 'HARDENING'
          ? 'Volume overload, resilience & time-pressure performance'
          : 'Peak operator stamina, mission clarity & unwavering leadership',
      ptTarget: {
        description: `${runDist} km Run, ${pushUps} Push-ups, ${pullUps} Pull-ups, ${sitUps} Sit-ups${swimLaps ? `, ${swimLaps} Swimming Laps` : ''}`,
        runDistanceKm: runDist,
        runTimeMin: Math.round(runDist * 5.5),
        pushUps,
        pullUps,
        sitUps,
        swimmingLaps: swimLaps,
        drills: phaseId === 'FOUNDATION'
          ? 'Joint mobility warmup (10m) + static stretch post-run'
          : phaseId === 'HARDENING'
            ? 'Dynamic sprints (4x100m) + core plank circuit (3x90s)'
            : 'Weighted vest / backpack drills + deep hip/shoulder mobility',
      },
      ssbTask: {
        activity: focusTemplate.ssb as SSBActivity,
        title: `${focusTemplate.ssb} Drill`,
        description: focusTemplate.ssbDesc,
        durationMin: phaseId === 'FOUNDATION' ? 30 : phaseId === 'HARDENING' ? 45 : 60,
      },
      studyTask: {
        subject: focusTemplate.sub as StudySubject,
        topic: focusTemplate.subTopic,
        durationMin: phaseId === 'FOUNDATION' ? 45 : phaseId === 'HARDENING' ? 60 : 75,
      },
      routineHabits: [
        '05:00 Reveille & 500ml water before movement',
        'Strict nutrition & hydration (minimum 3.5L throughout day)',
        'Mobility & recovery protocol (15 min stretching)',
        'Evening debrief & gear layout for tomorrow morning',
      ],
      reflectionPrompt: reflectionPrompts[(day - 1) % reflectionPrompts.length],
      mission: getMissionForDay(day),
    });
  }

  return list;
}

export const PROGRAMME_90_DAYS = build90DayProgramme();

export function getCurriculumForDay(dayNumber: number): DailyCurriculum {
  const clamped = Math.max(1, Math.min(dayNumber, 90));
  return PROGRAMME_90_DAYS[clamped - 1];
}

export function getCurriculumByPhase(phaseId: PhaseId): DailyCurriculum[] {
  return PROGRAMME_90_DAYS.filter((d) => d.phaseId === phaseId);
}
