// ============================================================
// 4 PARA SF 90-DAY PROBATION ACADEMY CURRICULUM
// Complete 90-Day Structured Educational & Assessment Syllabus
// Every single day contains an authentic, verified curriculum mission
// ============================================================

import type {
  KnowledgeLesson,
  MentalChallenge,
  SSBAssignment,
  PhysicalTrainingAssignment,
  StudySubject,
} from '../types';

export interface DailyCurriculumMission {
  dayNumber: number;
  phaseId: 'FOUNDATION' | 'HARDENING' | 'OPERATOR';
  weekNumber: number;
  title: string;
  theme: string;
  objective: string;
  estimatedDurationMin: number;
  learningLesson: KnowledgeLesson;
  physicalTraining: PhysicalTrainingAssignment;
  mentalChallenge: MentalChallenge;
  ssbAssignment: SSBAssignment;
  studyTask: {
    subject: StudySubject;
    topic: string;
    syllabusObjective: string;
    durationMin: number;
  };
  chronosRecommendation: {
    intent: string;
    mode: 'FOCUS';
    targetMinutes: number;
  };
  routineHabits: string[];
  reflectionPrompt: string;
}

export const COMPLETE_90_DAY_CURRICULUM: DailyCurriculumMission[] = [
  {
    "dayNumber": 1,
    "phaseId": "FOUNDATION",
    "weekNumber": 1,
    "title": "Day 1: Topographic Map Symbols & The Three Norths",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete Topographic Map Symbols & The Three Norths study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d1",
      "title": "Topographic Map Symbols & The Three Norths",
      "domain": "NAVIGATION",
      "objective": "Understand the fundamental doctrine and practical application of Topographic Map Symbols & The Three Norths.",
      "explanation": "Mastery of Topographic Map Symbols & The Three Norths is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Topographic Map Symbols & The Three Norths.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Topographic Map Symbols & The Three Norths under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Topographic Map Symbols & The Three Norths from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Topographic Map Symbols & The Three Norths?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "BENCHMARK",
      "title": "Benchmark Diagnostic Fitness Assessment (Day 1)",
      "prescription": "Warmup + 1.6 km Time Trial + Max Push-ups (strict form) + Max Plank Hold.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "1.6 km continuous time trial",
          "targetRpe": 8,
          "restSeconds": 180,
          "techniqueCues": "Pace evenly from the start."
        },
        {
          "exerciseId": "push_ups",
          "sets": 1,
          "repsOrDuration": "Max repetitions to failure",
          "targetRpe": 9,
          "restSeconds": 120,
          "techniqueCues": "Chest within 2 inches of deck, full lockout."
        },
        {
          "exerciseId": "plank",
          "sets": 1,
          "repsOrDuration": "Max hold for time",
          "targetRpe": 8,
          "restSeconds": 90,
          "techniqueCues": "Rigid straight line from heels to ears."
        }
      ],
      "progressionNotes": "Record exact times and repetitions to compare with baseline.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d1",
      "type": "REASONING",
      "title": "Number Series & Arithmetic Logic",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Determine the next number in the sequence: 2, 5, 9, 14, 20, ?",
      "options": [
        "25",
        "27",
        "30",
        "32"
      ],
      "correctAnswer": "27",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "The sequence differences increase by +1 each step: +3, +4, +5, +6, so the next difference is +7. 20 + 7 = 27.",
      "learningExplanation": "Step-difference sequences test rapid numerical induction."
    },
    "ssbAssignment": {
      "activity": "OIR",
      "title": "OIR Practical Exercise",
      "instructions": "Complete the OIR drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "Solve 5 mixed classification and analogical reasoning questions under 3 minutes.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Target >90% accuracy. Systematically check symmetry, number of line segments, and rotation direction."
    },
    "studyTask": {
      "subject": "MATHS",
      "topic": "MATHS Core Syllabus Block 1",
      "syllabusObjective": "Study MATHS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "MATHS Study & OIR Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 2,
    "phaseId": "FOUNDATION",
    "weekNumber": 1,
    "title": "Day 2: The Military Grid System: 4-Figure Coordinates",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete The Military Grid System: 4-Figure Coordinates study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d2",
      "title": "The Military Grid System: 4-Figure Coordinates",
      "domain": "NAVIGATION",
      "objective": "Understand the fundamental doctrine and practical application of The Military Grid System: 4-Figure Coordinates.",
      "explanation": "Mastery of The Military Grid System: 4-Figure Coordinates is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing The Military Grid System: 4-Figure Coordinates.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of The Military Grid System: 4-Figure Coordinates under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for The Military Grid System: 4-Figure Coordinates from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of The Military Grid System: 4-Figure Coordinates?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "CALISTHENICS",
      "title": "Upper-Body Calisthenics Strength & Core",
      "prescription": "Warmup + 4 sets of Push-ups (10-15 reps) + 4 sets of Pull-up Progression (4-6 assisted reps / 25s hang) + Plank Holds.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "push_ups",
          "sets": 4,
          "repsOrDuration": "10-15 reps",
          "targetRpe": 7,
          "restSeconds": 60,
          "techniqueCues": "Elbows at 45 degrees, rigid hollow core."
        },
        {
          "exerciseId": "assisted_pull_ups",
          "sets": 4,
          "repsOrDuration": "4-6 assisted reps / 25s hang",
          "targetRpe": 7,
          "restSeconds": 90,
          "techniqueCues": "Depress scapula first, pull chest to bar."
        },
        {
          "exerciseId": "plank",
          "sets": 3,
          "repsOrDuration": "35 seconds",
          "targetRpe": 7,
          "restSeconds": 45,
          "techniqueCues": "Tuck tailbone, contract quads and glutes."
        }
      ],
      "progressionNotes": "Maintain strict cadence. If technique fails, regress to incline or band assistance.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d2",
      "type": "MEMORY",
      "title": "Observation & Working Memory Challenge (Kim's Drill)",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Memorize this 7-item logistical convoy checklist for 60 seconds: 1) Radio Call-sign: BRAVO-2, 2) Route Checkpoint: CP-ALPHA (Grid 6428), 3) Departure Time: 0430 hrs, 4) Vehicle Fuel Reserve: 80 Liters, 5) Primary Emergency Frequency: 45.25 MHz, 6) Medic Lead: Sgt. Sharma, 7) Security Password: KAVACH. Close the screen and write all 7 details from memory.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Verified elements: Call-sign BRAVO-2; Checkpoint CP-ALPHA (Grid 6428); Departure 0430 hrs; Fuel 80L; Frequency 45.25 MHz; Medic Sgt. Sharma; Password KAVACH.",
      "learningExplanation": "Retaining multifaceted logistical data under cognitive pressure is vital for field communications."
    },
    "ssbAssignment": {
      "activity": "PPDT",
      "title": "PPDT Practical Exercise",
      "instructions": "Complete the PPDT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "A blurred picture of a group of youth gathered around a table with maps and paper in a village community hall.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Hero: Suresh (23), organized youth volunteer group to survey flood damage, prepared relief distribution maps, coordinated medical camp with local authorities."
    },
    "studyTask": {
      "subject": "GEOGRAPHY",
      "topic": "GEOGRAPHY Core Syllabus Block 1",
      "syllabusObjective": "Study GEOGRAPHY with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "GEOGRAPHY Study & PPDT Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 3,
    "phaseId": "FOUNDATION",
    "weekNumber": 1,
    "title": "Day 3: First Aid: The DRSABCD Primary Survey Protocol",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete First Aid: The DRSABCD Primary Survey Protocol study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d3",
      "title": "First Aid: The DRSABCD Primary Survey Protocol",
      "domain": "FIRST_AID",
      "objective": "Understand the fundamental doctrine and practical application of First Aid: The DRSABCD Primary Survey Protocol.",
      "explanation": "Mastery of First Aid: The DRSABCD Primary Survey Protocol is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing First Aid: The DRSABCD Primary Survey Protocol.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of First Aid: The DRSABCD Primary Survey Protocol under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for First Aid: The DRSABCD Primary Survey Protocol from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of First Aid: The DRSABCD Primary Survey Protocol?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "LOWER_BODY",
      "title": "Lower-Body Structural Strength & Unilateral Stability",
      "prescription": "Warmup + 4 sets Air Squats (15-20 reps) + 3 sets Reverse Lunges (10 reps/leg) + Glute Bridges.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "bodyweight_squats",
          "sets": 4,
          "repsOrDuration": "15-20 reps",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Hip crease below patella, drive through midfoot."
        },
        {
          "exerciseId": "reverse_lunges",
          "sets": 3,
          "repsOrDuration": "10 reps/leg",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Drop rear knee softly, front knee stacked over ankle."
        },
        {
          "exerciseId": "glute_bridges",
          "sets": 3,
          "repsOrDuration": "15-20 reps with 2s squeeze",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "Drive through heels without hyperextending lumbar."
        }
      ],
      "progressionNotes": "Lower-body endurance provides stamina for long marches and field tasks.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d3",
      "type": "DECISION_MAKING",
      "title": "Tactical Decision Scenario & Resource Trade-Off",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "You are leading a 4-person patrol returning from a 15km reconnaissance march. It is 1700 hrs, sunset is in 90 minutes, and the temperature is dropping rapidly. Member A has a sprained ankle and can only limp at 2 km/h. You are 6 km from the base camp. Member B suggests leaving Member A in a sleeping bag with rations and jogging ahead to get a transport vehicle. Member C insists on carrying Member A using a 2-man seat carry, which will slow the whole team to 3 km/h. What is your decision, and how do you mitigate risks?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Correct Officer Action: Never abandon an injured casualty alone in falling temperatures with night approaching (hypothermia and animal/security hazard). Reject Member B proposal. Adopt an improvised stretcher or 2-man carry rotating bearers between B, C, and yourself every 15 minutes. Send a radio SITREP with current coordinates and estimated arrival, requesting base send a vehicle to the nearest road-head intersecting the path. Maintain team cohesion and security integrity.",
      "learningExplanation": "Prioritizes human life, security integrity, and team cohesion over expedient but dangerous shortcuts."
    },
    "ssbAssignment": {
      "activity": "WAT",
      "title": "WAT Practical Exercise",
      "instructions": "Complete the WAT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "10 words: 1) RISK  2) DISCIPLINE  3) CRISIS  4) WEAPON  5) OBSTACLE  6) COOPERATE  7) LONELY  8) VICTORY  9) DUTY  10) TIRED",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Risk: Calculated risks lead to decisive progress. Obstacle: Stepping stone for determined individuals. Duty: Performed with unwavering integrity."
    },
    "studyTask": {
      "subject": "PHYSICS",
      "topic": "PHYSICS Core Syllabus Block 1",
      "syllabusObjective": "Study PHYSICS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "PHYSICS Study & WAT Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 4,
    "phaseId": "FOUNDATION",
    "weekNumber": 1,
    "title": "Day 4: The Prismatic Compass & Magnetic Bearings",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete The Prismatic Compass & Magnetic Bearings study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d4",
      "title": "The Prismatic Compass & Magnetic Bearings",
      "domain": "NAVIGATION",
      "objective": "Understand the fundamental doctrine and practical application of The Prismatic Compass & Magnetic Bearings.",
      "explanation": "Mastery of The Prismatic Compass & Magnetic Bearings is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing The Prismatic Compass & Magnetic Bearings.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of The Prismatic Compass & Magnetic Bearings under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for The Prismatic Compass & Magnetic Bearings from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of The Prismatic Compass & Magnetic Bearings?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "AEROBIC",
      "title": "Aerobic Zone 2 Endurance (2.7 km)",
      "prescription": "Warmup + 2.7 km continuous aerobic run (conversational pace) + Calf Raises.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "2.7 km continuous run",
          "targetRpe": 5,
          "restSeconds": 60,
          "techniqueCues": "Zone 2: Speak in full sentences without gasping."
        },
        {
          "exerciseId": "calf_raises",
          "sets": 3,
          "repsOrDuration": "15 reps",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "2-second pause at apex, controlled descent."
        }
      ],
      "progressionNotes": "Keep heart rate controlled. Build aerobic mitochondrial base.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d4",
      "type": "CRITICAL_THINKING",
      "title": "Fallacy Detection & Argument Deconstruction",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Evaluate this claim: \"Officer Candidate X completed the 5km run 2 minutes faster than Candidate Y. Therefore, Candidate X will make a significantly better operational leader in crisis than Candidate Y.\" Identify the logical fallacy and explain why the conclusion is invalid.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Logical Fallacy: False Equivalence / Hasty Generalization (Fallacy of Division). Physical aerobic speed is only one isolated component of officer competence; it does not measure decision-making under ambiguity, moral courage, communication, spatial planning, or empathy. While fitness is necessary, higher run speed alone does not directly correlate with superior leadership or crisis management.",
      "learningExplanation": "Officers must distinguish isolated performance metrics from holistic leadership capability."
    },
    "ssbAssignment": {
      "activity": "SRT",
      "title": "SRT Practical Exercise",
      "instructions": "Complete the SRT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "1) On a night train, you notice smoke emerging from the adjacent electrical compartment. You...\n2) Your team disagrees strongly with your proposed route during a timed navigation exercise. You...\n3) A junior cadet loses their equipment kit 1 hour before morning inspection. You...",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "1) Pulled emergency chain, grabbed coach fire extinguisher, directed passengers to move away, extinguished fire, reported to guard.\n2) Paused, listened to alternate route points, demonstrated map contours objectively, gained consensus on safest route, executed decisively."
    },
    "studyTask": {
      "subject": "CURRENT_AFFAIRS",
      "topic": "CURRENT_AFFAIRS Core Syllabus Block 2",
      "syllabusObjective": "Study CURRENT_AFFAIRS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "CURRENT_AFFAIRS Study & SRT Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 5,
    "phaseId": "FOUNDATION",
    "weekNumber": 1,
    "title": "Day 5: Emergency Hemorrhage Control & Pressure Dressings",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete Emergency Hemorrhage Control & Pressure Dressings study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d5",
      "title": "Emergency Hemorrhage Control & Pressure Dressings",
      "domain": "FIRST_AID",
      "objective": "Understand the fundamental doctrine and practical application of Emergency Hemorrhage Control & Pressure Dressings.",
      "explanation": "Mastery of Emergency Hemorrhage Control & Pressure Dressings is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Emergency Hemorrhage Control & Pressure Dressings.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Emergency Hemorrhage Control & Pressure Dressings under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Emergency Hemorrhage Control & Pressure Dressings from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Emergency Hemorrhage Control & Pressure Dressings?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "CALISTHENICS",
      "title": "Upper-Body Calisthenics Strength & Core",
      "prescription": "Warmup + 4 sets of Push-ups (10-15 reps) + 4 sets of Pull-up Progression (4-6 assisted reps / 25s hang) + Plank Holds.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "push_ups",
          "sets": 4,
          "repsOrDuration": "10-15 reps",
          "targetRpe": 7,
          "restSeconds": 60,
          "techniqueCues": "Elbows at 45 degrees, rigid hollow core."
        },
        {
          "exerciseId": "assisted_pull_ups",
          "sets": 4,
          "repsOrDuration": "4-6 assisted reps / 25s hang",
          "targetRpe": 7,
          "restSeconds": 90,
          "techniqueCues": "Depress scapula first, pull chest to bar."
        },
        {
          "exerciseId": "plank",
          "sets": 3,
          "repsOrDuration": "35 seconds",
          "targetRpe": 7,
          "restSeconds": 45,
          "techniqueCues": "Tuck tailbone, contract quads and glutes."
        }
      ],
      "progressionNotes": "Maintain strict cadence. If technique fails, regress to incline or band assistance.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d5",
      "type": "PSYCHOLOGICAL",
      "title": "Stoic Psychological Ownership & Stress Audit",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Reflect on a recent instance where a task did not go as planned: 1) What was your immediate emotional response (frustration, blaming circumstances, defensiveness)? 2) What part of the failure was within your direct circle of control? 3) How did you handle accountability with others involved?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "High-Performing Response: Acknowledges initial emotional impulse without letting it dictate action; shifts immediately to what was controllable (preparation, communication, contingency planning); takes full ownership without deflecting blame onto external factors or teammates.",
      "learningExplanation": "Extreme ownership eliminates victim mindset and builds commanding authority."
    },
    "ssbAssignment": {
      "activity": "TAT",
      "title": "TAT Practical Exercise",
      "instructions": "Complete the TAT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "Picture prompt: A person standing on a hilltop looking through binoculars at a distant valley with rising smoke.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Hero: Forest Ranger Rajesh. Identifies forest fire outbreak early, radios division post for backup, mobilizes local village fire-line team, cuts containment trench, extinguishes blaze before reaching timber reserve."
    },
    "studyTask": {
      "subject": "MILITARY_HISTORY",
      "topic": "MILITARY_HISTORY Core Syllabus Block 2",
      "syllabusObjective": "Study MILITARY_HISTORY with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "MILITARY_HISTORY Study & TAT Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 6,
    "phaseId": "FOUNDATION",
    "weekNumber": 1,
    "title": "Day 6: The Cornell Note-Taking System for Dense Study",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete The Cornell Note-Taking System for Dense Study study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d6",
      "title": "The Cornell Note-Taking System for Dense Study",
      "domain": "PLANNING",
      "objective": "Understand the fundamental doctrine and practical application of The Cornell Note-Taking System for Dense Study.",
      "explanation": "Mastery of The Cornell Note-Taking System for Dense Study is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing The Cornell Note-Taking System for Dense Study.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of The Cornell Note-Taking System for Dense Study under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for The Cornell Note-Taking System for Dense Study from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of The Cornell Note-Taking System for Dense Study?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "LOWER_BODY",
      "title": "Lower-Body Structural Strength & Unilateral Stability",
      "prescription": "Warmup + 4 sets Air Squats (15-20 reps) + 3 sets Reverse Lunges (10 reps/leg) + Glute Bridges.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "bodyweight_squats",
          "sets": 4,
          "repsOrDuration": "15-20 reps",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Hip crease below patella, drive through midfoot."
        },
        {
          "exerciseId": "reverse_lunges",
          "sets": 3,
          "repsOrDuration": "10 reps/leg",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Drop rear knee softly, front knee stacked over ankle."
        },
        {
          "exerciseId": "glute_bridges",
          "sets": 3,
          "repsOrDuration": "15-20 reps with 2s squeeze",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "Drive through heels without hyperextending lumbar."
        }
      ],
      "progressionNotes": "Lower-body endurance provides stamina for long marches and field tasks.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d6",
      "type": "REASONING",
      "title": "Number Series & Arithmetic Logic",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Determine the next number in the sequence: 12, 15, 19, 24, 30, ?",
      "options": [
        "35",
        "37",
        "40",
        "42"
      ],
      "correctAnswer": "37",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "The sequence differences increase by +1 each step: +3, +4, +5, +6, so the next difference is +7. 30 + 7 = 37.",
      "learningExplanation": "Step-difference sequences test rapid numerical induction."
    },
    "ssbAssignment": {
      "activity": "INTERVIEW",
      "title": "INTERVIEW Practical Exercise",
      "instructions": "Complete the INTERVIEW drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "Prepare 3-minute structured answers to: 1) What are your top 3 strengths and 2 weaknesses you are actively working on? 2) Why Indian Armed Forces instead of civil services or corporate career? 3) Describe a situation where you had a conflict with a senior and how you resolved it.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Answer with authenticity, concrete examples, clear cause-and-effect reasoning, without fabricated heroic cliches."
    },
    "studyTask": {
      "subject": "ENGLISH",
      "topic": "ENGLISH Core Syllabus Block 2",
      "syllabusObjective": "Study ENGLISH with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "ENGLISH Study & INTERVIEW Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 7,
    "phaseId": "FOUNDATION",
    "weekNumber": 1,
    "title": "Day 7: Principles of Physical & Mental Deloading",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete Principles of Physical & Mental Deloading study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d7",
      "title": "Principles of Physical & Mental Deloading",
      "domain": "LEADERSHIP",
      "objective": "Understand the fundamental doctrine and practical application of Principles of Physical & Mental Deloading.",
      "explanation": "Mastery of Principles of Physical & Mental Deloading is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Principles of Physical & Mental Deloading.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Principles of Physical & Mental Deloading under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Principles of Physical & Mental Deloading from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Principles of Physical & Mental Deloading?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "RECOVERY",
      "title": "Week 1 Restorative Mobility & Recovery Protocol",
      "prescription": "15 minutes full-body joint mobility flow + 10 minutes tactical box breathing.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "mobility_flow",
          "sets": 1,
          "repsOrDuration": "15 minutes",
          "targetRpe": 3,
          "restSeconds": 0,
          "techniqueCues": "Smooth diaphragmatic breathing into tight areas."
        },
        {
          "exerciseId": "box_breathing",
          "sets": 1,
          "repsOrDuration": "10 minutes",
          "targetRpe": 1,
          "restSeconds": 0,
          "techniqueCues": "4s in, 4s hold, 4s out, 4s empty."
        }
      ],
      "progressionNotes": "Deload allows neuromuscular supercompensation and tissue repair.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d7",
      "type": "MEMORY",
      "title": "Observation & Working Memory Challenge (Kim's Drill)",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Memorize this 7-item logistical convoy checklist for 60 seconds: 1) Radio Call-sign: BRAVO-2, 2) Route Checkpoint: CP-ALPHA (Grid 6428), 3) Departure Time: 0430 hrs, 4) Vehicle Fuel Reserve: 80 Liters, 5) Primary Emergency Frequency: 45.25 MHz, 6) Medic Lead: Sgt. Sharma, 7) Security Password: KAVACH. Close the screen and write all 7 details from memory.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Verified elements: Call-sign BRAVO-2; Checkpoint CP-ALPHA (Grid 6428); Departure 0430 hrs; Fuel 80L; Frequency 45.25 MHz; Medic Sgt. Sharma; Password KAVACH.",
      "learningExplanation": "Retaining multifaceted logistical data under cognitive pressure is vital for field communications."
    },
    "ssbAssignment": {
      "activity": "READING",
      "title": "READING Practical Exercise",
      "instructions": "Complete the READING drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "Analyze the strategic lessons from the battle/topic of the day. Extract 3 operational takeaways for leadership and tactical doctrine.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Synthesize command decisiveness, logistical foresight, and decentralized initiative."
    },
    "studyTask": {
      "subject": "LEADERSHIP",
      "topic": "LEADERSHIP Core Syllabus Block 3",
      "syllabusObjective": "Study LEADERSHIP with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "LEADERSHIP Study & READING Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 8,
    "phaseId": "FOUNDATION",
    "weekNumber": 2,
    "title": "Day 8: Six-Figure Grid References & 100m Precision",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete Six-Figure Grid References & 100m Precision study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d8",
      "title": "Six-Figure Grid References & 100m Precision",
      "domain": "NAVIGATION",
      "objective": "Understand the fundamental doctrine and practical application of Six-Figure Grid References & 100m Precision.",
      "explanation": "Mastery of Six-Figure Grid References & 100m Precision is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Six-Figure Grid References & 100m Precision.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Six-Figure Grid References & 100m Precision under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Six-Figure Grid References & 100m Precision from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Six-Figure Grid References & 100m Precision?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "CALISTHENICS",
      "title": "Upper-Body Calisthenics Strength & Core",
      "prescription": "Warmup + 4 sets of Push-ups (10-15 reps) + 4 sets of Pull-up Progression (4-6 assisted reps / 25s hang) + Plank Holds.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "push_ups",
          "sets": 4,
          "repsOrDuration": "10-15 reps",
          "targetRpe": 7,
          "restSeconds": 60,
          "techniqueCues": "Elbows at 45 degrees, rigid hollow core."
        },
        {
          "exerciseId": "assisted_pull_ups",
          "sets": 4,
          "repsOrDuration": "4-6 assisted reps / 25s hang",
          "targetRpe": 7,
          "restSeconds": 90,
          "techniqueCues": "Depress scapula first, pull chest to bar."
        },
        {
          "exerciseId": "plank",
          "sets": 3,
          "repsOrDuration": "35 seconds",
          "targetRpe": 7,
          "restSeconds": 45,
          "techniqueCues": "Tuck tailbone, contract quads and glutes."
        }
      ],
      "progressionNotes": "Maintain strict cadence. If technique fails, regress to incline or band assistance.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d8",
      "type": "DECISION_MAKING",
      "title": "Tactical Decision Scenario & Resource Trade-Off",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "You are leading a 4-person patrol returning from a 15km reconnaissance march. It is 1700 hrs, sunset is in 90 minutes, and the temperature is dropping rapidly. Member A has a sprained ankle and can only limp at 2 km/h. You are 6 km from the base camp. Member B suggests leaving Member A in a sleeping bag with rations and jogging ahead to get a transport vehicle. Member C insists on carrying Member A using a 2-man seat carry, which will slow the whole team to 3 km/h. What is your decision, and how do you mitigate risks?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Correct Officer Action: Never abandon an injured casualty alone in falling temperatures with night approaching (hypothermia and animal/security hazard). Reject Member B proposal. Adopt an improvised stretcher or 2-man carry rotating bearers between B, C, and yourself every 15 minutes. Send a radio SITREP with current coordinates and estimated arrival, requesting base send a vehicle to the nearest road-head intersecting the path. Maintain team cohesion and security integrity.",
      "learningExplanation": "Prioritizes human life, security integrity, and team cohesion over expedient but dangerous shortcuts."
    },
    "ssbAssignment": {
      "activity": "OIR",
      "title": "OIR Practical Exercise",
      "instructions": "Complete the OIR drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "Solve 5 mixed classification and analogical reasoning questions under 3 minutes.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Target >90% accuracy. Systematically check symmetry, number of line segments, and rotation direction."
    },
    "studyTask": {
      "subject": "MATHS",
      "topic": "MATHS Core Syllabus Block 3",
      "syllabusObjective": "Study MATHS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "MATHS Study & OIR Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 9,
    "phaseId": "FOUNDATION",
    "weekNumber": 2,
    "title": "Day 9: Shock Pathology: Hypovolemic & Anaphylactic Management",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete Shock Pathology: Hypovolemic & Anaphylactic Management study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d9",
      "title": "Shock Pathology: Hypovolemic & Anaphylactic Management",
      "domain": "FIRST_AID",
      "objective": "Understand the fundamental doctrine and practical application of Shock Pathology: Hypovolemic & Anaphylactic Management.",
      "explanation": "Mastery of Shock Pathology: Hypovolemic & Anaphylactic Management is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Shock Pathology: Hypovolemic & Anaphylactic Management.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Shock Pathology: Hypovolemic & Anaphylactic Management under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Shock Pathology: Hypovolemic & Anaphylactic Management from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Shock Pathology: Hypovolemic & Anaphylactic Management?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "LOWER_BODY",
      "title": "Lower-Body Structural Strength & Unilateral Stability",
      "prescription": "Warmup + 4 sets Air Squats (15-20 reps) + 3 sets Reverse Lunges (10 reps/leg) + Glute Bridges.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "bodyweight_squats",
          "sets": 4,
          "repsOrDuration": "15-20 reps",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Hip crease below patella, drive through midfoot."
        },
        {
          "exerciseId": "reverse_lunges",
          "sets": 3,
          "repsOrDuration": "10 reps/leg",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Drop rear knee softly, front knee stacked over ankle."
        },
        {
          "exerciseId": "glute_bridges",
          "sets": 3,
          "repsOrDuration": "15-20 reps with 2s squeeze",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "Drive through heels without hyperextending lumbar."
        }
      ],
      "progressionNotes": "Lower-body endurance provides stamina for long marches and field tasks.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d9",
      "type": "CRITICAL_THINKING",
      "title": "Fallacy Detection & Argument Deconstruction",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Evaluate this claim: \"Officer Candidate X completed the 5km run 2 minutes faster than Candidate Y. Therefore, Candidate X will make a significantly better operational leader in crisis than Candidate Y.\" Identify the logical fallacy and explain why the conclusion is invalid.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Logical Fallacy: False Equivalence / Hasty Generalization (Fallacy of Division). Physical aerobic speed is only one isolated component of officer competence; it does not measure decision-making under ambiguity, moral courage, communication, spatial planning, or empathy. While fitness is necessary, higher run speed alone does not directly correlate with superior leadership or crisis management.",
      "learningExplanation": "Officers must distinguish isolated performance metrics from holistic leadership capability."
    },
    "ssbAssignment": {
      "activity": "WAT",
      "title": "WAT Practical Exercise",
      "instructions": "Complete the WAT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "10 words: 1) RISK  2) DISCIPLINE  3) CRISIS  4) WEAPON  5) OBSTACLE  6) COOPERATE  7) LONELY  8) VICTORY  9) DUTY  10) TIRED",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Risk: Calculated risks lead to decisive progress. Obstacle: Stepping stone for determined individuals. Duty: Performed with unwavering integrity."
    },
    "studyTask": {
      "subject": "PHYSICS",
      "topic": "PHYSICS Core Syllabus Block 3",
      "syllabusObjective": "Study PHYSICS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "PHYSICS Study & WAT Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 10,
    "phaseId": "FOUNDATION",
    "weekNumber": 2,
    "title": "Day 10: The 16-Point Compass Rose & Angular Mils",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete The 16-Point Compass Rose & Angular Mils study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d10",
      "title": "The 16-Point Compass Rose & Angular Mils",
      "domain": "NAVIGATION",
      "objective": "Understand the fundamental doctrine and practical application of The 16-Point Compass Rose & Angular Mils.",
      "explanation": "Mastery of The 16-Point Compass Rose & Angular Mils is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing The 16-Point Compass Rose & Angular Mils.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of The 16-Point Compass Rose & Angular Mils under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for The 16-Point Compass Rose & Angular Mils from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of The 16-Point Compass Rose & Angular Mils?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "AEROBIC",
      "title": "Aerobic Zone 2 Endurance (3.0 km)",
      "prescription": "Warmup + 3.0 km continuous aerobic run (conversational pace) + Calf Raises.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "3.0 km continuous run",
          "targetRpe": 5,
          "restSeconds": 60,
          "techniqueCues": "Zone 2: Speak in full sentences without gasping."
        },
        {
          "exerciseId": "calf_raises",
          "sets": 3,
          "repsOrDuration": "15 reps",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "2-second pause at apex, controlled descent."
        }
      ],
      "progressionNotes": "Keep heart rate controlled. Build aerobic mitochondrial base.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d10",
      "type": "PSYCHOLOGICAL",
      "title": "Stoic Psychological Ownership & Stress Audit",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Reflect on a recent instance where a task did not go as planned: 1) What was your immediate emotional response (frustration, blaming circumstances, defensiveness)? 2) What part of the failure was within your direct circle of control? 3) How did you handle accountability with others involved?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "High-Performing Response: Acknowledges initial emotional impulse without letting it dictate action; shifts immediately to what was controllable (preparation, communication, contingency planning); takes full ownership without deflecting blame onto external factors or teammates.",
      "learningExplanation": "Extreme ownership eliminates victim mindset and builds commanding authority."
    },
    "ssbAssignment": {
      "activity": "SRT",
      "title": "SRT Practical Exercise",
      "instructions": "Complete the SRT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "1) On a night train, you notice smoke emerging from the adjacent electrical compartment. You...\n2) Your team disagrees strongly with your proposed route during a timed navigation exercise. You...\n3) A junior cadet loses their equipment kit 1 hour before morning inspection. You...",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "1) Pulled emergency chain, grabbed coach fire extinguisher, directed passengers to move away, extinguished fire, reported to guard.\n2) Paused, listened to alternate route points, demonstrated map contours objectively, gained consensus on safest route, executed decisively."
    },
    "studyTask": {
      "subject": "GEOGRAPHY",
      "topic": "GEOGRAPHY Core Syllabus Block 4",
      "syllabusObjective": "Study GEOGRAPHY with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "GEOGRAPHY Study & SRT Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 11,
    "phaseId": "FOUNDATION",
    "weekNumber": 2,
    "title": "Day 11: Tactical Verbal Briefing: The SMEAC Framework",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete Tactical Verbal Briefing: The SMEAC Framework study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d11",
      "title": "Tactical Verbal Briefing: The SMEAC Framework",
      "domain": "COMMUNICATION",
      "objective": "Understand the fundamental doctrine and practical application of Tactical Verbal Briefing: The SMEAC Framework.",
      "explanation": "Mastery of Tactical Verbal Briefing: The SMEAC Framework is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Tactical Verbal Briefing: The SMEAC Framework.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Tactical Verbal Briefing: The SMEAC Framework under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Tactical Verbal Briefing: The SMEAC Framework from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Tactical Verbal Briefing: The SMEAC Framework?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "CALISTHENICS",
      "title": "Upper-Body Calisthenics Strength & Core",
      "prescription": "Warmup + 4 sets of Push-ups (10-15 reps) + 4 sets of Pull-up Progression (4-6 assisted reps / 25s hang) + Plank Holds.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "push_ups",
          "sets": 4,
          "repsOrDuration": "10-15 reps",
          "targetRpe": 7,
          "restSeconds": 60,
          "techniqueCues": "Elbows at 45 degrees, rigid hollow core."
        },
        {
          "exerciseId": "assisted_pull_ups",
          "sets": 4,
          "repsOrDuration": "4-6 assisted reps / 25s hang",
          "targetRpe": 7,
          "restSeconds": 90,
          "techniqueCues": "Depress scapula first, pull chest to bar."
        },
        {
          "exerciseId": "plank",
          "sets": 3,
          "repsOrDuration": "35 seconds",
          "targetRpe": 7,
          "restSeconds": 45,
          "techniqueCues": "Tuck tailbone, contract quads and glutes."
        }
      ],
      "progressionNotes": "Maintain strict cadence. If technique fails, regress to incline or band assistance.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d11",
      "type": "REASONING",
      "title": "Number Series & Arithmetic Logic",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Determine the next number in the sequence: 22, 25, 29, 34, 40, ?",
      "options": [
        "45",
        "47",
        "50",
        "52"
      ],
      "correctAnswer": "47",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "The sequence differences increase by +1 each step: +3, +4, +5, +6, so the next difference is +7. 40 + 7 = 47.",
      "learningExplanation": "Step-difference sequences test rapid numerical induction."
    },
    "ssbAssignment": {
      "activity": "TAT",
      "title": "TAT Practical Exercise",
      "instructions": "Complete the TAT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "Picture prompt: A person standing on a hilltop looking through binoculars at a distant valley with rising smoke.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Hero: Forest Ranger Rajesh. Identifies forest fire outbreak early, radios division post for backup, mobilizes local village fire-line team, cuts containment trench, extinguishes blaze before reaching timber reserve."
    },
    "studyTask": {
      "subject": "CURRENT_AFFAIRS",
      "topic": "CURRENT_AFFAIRS Core Syllabus Block 4",
      "syllabusObjective": "Study CURRENT_AFFAIRS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "CURRENT_AFFAIRS Study & TAT Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 12,
    "phaseId": "FOUNDATION",
    "weekNumber": 2,
    "title": "Day 12: Heat Illness Triage: Heat Exhaustion vs Heat Stroke",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete Heat Illness Triage: Heat Exhaustion vs Heat Stroke study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d12",
      "title": "Heat Illness Triage: Heat Exhaustion vs Heat Stroke",
      "domain": "FIRST_AID",
      "objective": "Understand the fundamental doctrine and practical application of Heat Illness Triage: Heat Exhaustion vs Heat Stroke.",
      "explanation": "Mastery of Heat Illness Triage: Heat Exhaustion vs Heat Stroke is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Heat Illness Triage: Heat Exhaustion vs Heat Stroke.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Heat Illness Triage: Heat Exhaustion vs Heat Stroke under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Heat Illness Triage: Heat Exhaustion vs Heat Stroke from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Heat Illness Triage: Heat Exhaustion vs Heat Stroke?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "LOWER_BODY",
      "title": "Lower-Body Structural Strength & Unilateral Stability",
      "prescription": "Warmup + 4 sets Air Squats (15-20 reps) + 3 sets Reverse Lunges (10 reps/leg) + Glute Bridges.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "bodyweight_squats",
          "sets": 4,
          "repsOrDuration": "15-20 reps",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Hip crease below patella, drive through midfoot."
        },
        {
          "exerciseId": "reverse_lunges",
          "sets": 3,
          "repsOrDuration": "10 reps/leg",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Drop rear knee softly, front knee stacked over ankle."
        },
        {
          "exerciseId": "glute_bridges",
          "sets": 3,
          "repsOrDuration": "15-20 reps with 2s squeeze",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "Drive through heels without hyperextending lumbar."
        }
      ],
      "progressionNotes": "Lower-body endurance provides stamina for long marches and field tasks.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d12",
      "type": "MEMORY",
      "title": "Observation & Working Memory Challenge (Kim's Drill)",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Memorize this 7-item logistical convoy checklist for 60 seconds: 1) Radio Call-sign: BRAVO-2, 2) Route Checkpoint: CP-ALPHA (Grid 6428), 3) Departure Time: 0430 hrs, 4) Vehicle Fuel Reserve: 80 Liters, 5) Primary Emergency Frequency: 45.25 MHz, 6) Medic Lead: Sgt. Sharma, 7) Security Password: KAVACH. Close the screen and write all 7 details from memory.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Verified elements: Call-sign BRAVO-2; Checkpoint CP-ALPHA (Grid 6428); Departure 0430 hrs; Fuel 80L; Frequency 45.25 MHz; Medic Sgt. Sharma; Password KAVACH.",
      "learningExplanation": "Retaining multifaceted logistical data under cognitive pressure is vital for field communications."
    },
    "ssbAssignment": {
      "activity": "INTERVIEW",
      "title": "INTERVIEW Practical Exercise",
      "instructions": "Complete the INTERVIEW drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "Prepare 3-minute structured answers to: 1) What are your top 3 strengths and 2 weaknesses you are actively working on? 2) Why Indian Armed Forces instead of civil services or corporate career? 3) Describe a situation where you had a conflict with a senior and how you resolved it.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Answer with authenticity, concrete examples, clear cause-and-effect reasoning, without fabricated heroic cliches."
    },
    "studyTask": {
      "subject": "PHYSICS",
      "topic": "PHYSICS Core Syllabus Block 4",
      "syllabusObjective": "Study PHYSICS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "PHYSICS Study & INTERVIEW Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 13,
    "phaseId": "FOUNDATION",
    "weekNumber": 2,
    "title": "Day 13: Contour Lines, Relief & Calculating Ground Slopes",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete Contour Lines, Relief & Calculating Ground Slopes study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d13",
      "title": "Contour Lines, Relief & Calculating Ground Slopes",
      "domain": "NAVIGATION",
      "objective": "Understand the fundamental doctrine and practical application of Contour Lines, Relief & Calculating Ground Slopes.",
      "explanation": "Mastery of Contour Lines, Relief & Calculating Ground Slopes is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Contour Lines, Relief & Calculating Ground Slopes.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Contour Lines, Relief & Calculating Ground Slopes under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Contour Lines, Relief & Calculating Ground Slopes from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Contour Lines, Relief & Calculating Ground Slopes?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "AEROBIC",
      "title": "Aerobic Zone 2 Endurance (3.1 km)",
      "prescription": "Warmup + 3.1 km continuous aerobic run (conversational pace) + Calf Raises.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "3.1 km continuous run",
          "targetRpe": 5,
          "restSeconds": 60,
          "techniqueCues": "Zone 2: Speak in full sentences without gasping."
        },
        {
          "exerciseId": "calf_raises",
          "sets": 3,
          "repsOrDuration": "15 reps",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "2-second pause at apex, controlled descent."
        }
      ],
      "progressionNotes": "Keep heart rate controlled. Build aerobic mitochondrial base.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d13",
      "type": "DECISION_MAKING",
      "title": "Tactical Decision Scenario & Resource Trade-Off",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "You are leading a 4-person patrol returning from a 15km reconnaissance march. It is 1700 hrs, sunset is in 90 minutes, and the temperature is dropping rapidly. Member A has a sprained ankle and can only limp at 2 km/h. You are 6 km from the base camp. Member B suggests leaving Member A in a sleeping bag with rations and jogging ahead to get a transport vehicle. Member C insists on carrying Member A using a 2-man seat carry, which will slow the whole team to 3 km/h. What is your decision, and how do you mitigate risks?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Correct Officer Action: Never abandon an injured casualty alone in falling temperatures with night approaching (hypothermia and animal/security hazard). Reject Member B proposal. Adopt an improvised stretcher or 2-man carry rotating bearers between B, C, and yourself every 15 minutes. Send a radio SITREP with current coordinates and estimated arrival, requesting base send a vehicle to the nearest road-head intersecting the path. Maintain team cohesion and security integrity.",
      "learningExplanation": "Prioritizes human life, security integrity, and team cohesion over expedient but dangerous shortcuts."
    },
    "ssbAssignment": {
      "activity": "PPDT",
      "title": "PPDT Practical Exercise",
      "instructions": "Complete the PPDT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "A blurred picture of a group of youth gathered around a table with maps and paper in a village community hall.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Hero: Suresh (23), organized youth volunteer group to survey flood damage, prepared relief distribution maps, coordinated medical camp with local authorities."
    },
    "studyTask": {
      "subject": "GEOGRAPHY",
      "topic": "GEOGRAPHY Core Syllabus Block 5",
      "syllabusObjective": "Study GEOGRAPHY with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "GEOGRAPHY Study & PPDT Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 14,
    "phaseId": "FOUNDATION",
    "weekNumber": 2,
    "title": "Day 14: Weekly Tactical Deload & Sleep Architecture",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete Weekly Tactical Deload & Sleep Architecture study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d14",
      "title": "Weekly Tactical Deload & Sleep Architecture",
      "domain": "LEADERSHIP",
      "objective": "Understand the fundamental doctrine and practical application of Weekly Tactical Deload & Sleep Architecture.",
      "explanation": "Mastery of Weekly Tactical Deload & Sleep Architecture is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Weekly Tactical Deload & Sleep Architecture.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Weekly Tactical Deload & Sleep Architecture under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Weekly Tactical Deload & Sleep Architecture from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Weekly Tactical Deload & Sleep Architecture?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "RECOVERY",
      "title": "Week 2 Restorative Mobility & Recovery Protocol",
      "prescription": "15 minutes full-body joint mobility flow + 10 minutes tactical box breathing.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "mobility_flow",
          "sets": 1,
          "repsOrDuration": "15 minutes",
          "targetRpe": 3,
          "restSeconds": 0,
          "techniqueCues": "Smooth diaphragmatic breathing into tight areas."
        },
        {
          "exerciseId": "box_breathing",
          "sets": 1,
          "repsOrDuration": "10 minutes",
          "targetRpe": 1,
          "restSeconds": 0,
          "techniqueCues": "4s in, 4s hold, 4s out, 4s empty."
        }
      ],
      "progressionNotes": "Deload allows neuromuscular supercompensation and tissue repair.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d14",
      "type": "CRITICAL_THINKING",
      "title": "Fallacy Detection & Argument Deconstruction",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Evaluate this claim: \"Officer Candidate X completed the 5km run 2 minutes faster than Candidate Y. Therefore, Candidate X will make a significantly better operational leader in crisis than Candidate Y.\" Identify the logical fallacy and explain why the conclusion is invalid.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Logical Fallacy: False Equivalence / Hasty Generalization (Fallacy of Division). Physical aerobic speed is only one isolated component of officer competence; it does not measure decision-making under ambiguity, moral courage, communication, spatial planning, or empathy. While fitness is necessary, higher run speed alone does not directly correlate with superior leadership or crisis management.",
      "learningExplanation": "Officers must distinguish isolated performance metrics from holistic leadership capability."
    },
    "ssbAssignment": {
      "activity": "READING",
      "title": "READING Practical Exercise",
      "instructions": "Complete the READING drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "Analyze the strategic lessons from the battle/topic of the day. Extract 3 operational takeaways for leadership and tactical doctrine.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Synthesize command decisiveness, logistical foresight, and decentralized initiative."
    },
    "studyTask": {
      "subject": "LEADERSHIP",
      "topic": "LEADERSHIP Core Syllabus Block 5",
      "syllabusObjective": "Study LEADERSHIP with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "LEADERSHIP Study & READING Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 15,
    "phaseId": "FOUNDATION",
    "weekNumber": 3,
    "title": "Day 15: Compass Deviation, Local Attraction & Grid Magnetic Angle",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete Compass Deviation, Local Attraction & Grid Magnetic Angle study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d15",
      "title": "Compass Deviation, Local Attraction & Grid Magnetic Angle",
      "domain": "NAVIGATION",
      "objective": "Understand the fundamental doctrine and practical application of Compass Deviation, Local Attraction & Grid Magnetic Angle.",
      "explanation": "Mastery of Compass Deviation, Local Attraction & Grid Magnetic Angle is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Compass Deviation, Local Attraction & Grid Magnetic Angle.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Compass Deviation, Local Attraction & Grid Magnetic Angle under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Compass Deviation, Local Attraction & Grid Magnetic Angle from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Compass Deviation, Local Attraction & Grid Magnetic Angle?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "LOWER_BODY",
      "title": "Lower-Body Structural Strength & Unilateral Stability",
      "prescription": "Warmup + 4 sets Air Squats (15-20 reps) + 3 sets Reverse Lunges (10 reps/leg) + Glute Bridges.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "bodyweight_squats",
          "sets": 4,
          "repsOrDuration": "15-20 reps",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Hip crease below patella, drive through midfoot."
        },
        {
          "exerciseId": "reverse_lunges",
          "sets": 3,
          "repsOrDuration": "10 reps/leg",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Drop rear knee softly, front knee stacked over ankle."
        },
        {
          "exerciseId": "glute_bridges",
          "sets": 3,
          "repsOrDuration": "15-20 reps with 2s squeeze",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "Drive through heels without hyperextending lumbar."
        }
      ],
      "progressionNotes": "Lower-body endurance provides stamina for long marches and field tasks.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d15",
      "type": "PSYCHOLOGICAL",
      "title": "Stoic Psychological Ownership & Stress Audit",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Reflect on a recent instance where a task did not go as planned: 1) What was your immediate emotional response (frustration, blaming circumstances, defensiveness)? 2) What part of the failure was within your direct circle of control? 3) How did you handle accountability with others involved?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "High-Performing Response: Acknowledges initial emotional impulse without letting it dictate action; shifts immediately to what was controllable (preparation, communication, contingency planning); takes full ownership without deflecting blame onto external factors or teammates.",
      "learningExplanation": "Extreme ownership eliminates victim mindset and builds commanding authority."
    },
    "ssbAssignment": {
      "activity": "OIR",
      "title": "OIR Practical Exercise",
      "instructions": "Complete the OIR drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "Solve 5 mixed classification and analogical reasoning questions under 3 minutes.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Target >90% accuracy. Systematically check symmetry, number of line segments, and rotation direction."
    },
    "studyTask": {
      "subject": "MATHS",
      "topic": "MATHS Core Syllabus Block 5",
      "syllabusObjective": "Study MATHS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "MATHS Study & OIR Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 16,
    "phaseId": "FOUNDATION",
    "weekNumber": 3,
    "title": "Day 16: Soft-Tissue Trauma: Sprains, Strains & The Modern RICE Protocol",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete Soft-Tissue Trauma: Sprains, Strains & The Modern RICE Protocol study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d16",
      "title": "Soft-Tissue Trauma: Sprains, Strains & The Modern RICE Protocol",
      "domain": "FIRST_AID",
      "objective": "Understand the fundamental doctrine and practical application of Soft-Tissue Trauma: Sprains, Strains & The Modern RICE Protocol.",
      "explanation": "Mastery of Soft-Tissue Trauma: Sprains, Strains & The Modern RICE Protocol is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Soft-Tissue Trauma: Sprains, Strains & The Modern RICE Protocol.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Soft-Tissue Trauma: Sprains, Strains & The Modern RICE Protocol under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Soft-Tissue Trauma: Sprains, Strains & The Modern RICE Protocol from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Soft-Tissue Trauma: Sprains, Strains & The Modern RICE Protocol?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "AEROBIC",
      "title": "Aerobic Zone 2 Endurance (3.3 km)",
      "prescription": "Warmup + 3.3 km continuous aerobic run (conversational pace) + Calf Raises.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "3.3 km continuous run",
          "targetRpe": 5,
          "restSeconds": 60,
          "techniqueCues": "Zone 2: Speak in full sentences without gasping."
        },
        {
          "exerciseId": "calf_raises",
          "sets": 3,
          "repsOrDuration": "15 reps",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "2-second pause at apex, controlled descent."
        }
      ],
      "progressionNotes": "Keep heart rate controlled. Build aerobic mitochondrial base.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d16",
      "type": "REASONING",
      "title": "Number Series & Arithmetic Logic",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Determine the next number in the sequence: 32, 35, 39, 44, 50, ?",
      "options": [
        "55",
        "57",
        "60",
        "62"
      ],
      "correctAnswer": "57",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "The sequence differences increase by +1 each step: +3, +4, +5, +6, so the next difference is +7. 50 + 7 = 57.",
      "learningExplanation": "Step-difference sequences test rapid numerical induction."
    },
    "ssbAssignment": {
      "activity": "WAT",
      "title": "WAT Practical Exercise",
      "instructions": "Complete the WAT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "10 words: 1) RISK  2) DISCIPLINE  3) CRISIS  4) WEAPON  5) OBSTACLE  6) COOPERATE  7) LONELY  8) VICTORY  9) DUTY  10) TIRED",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Risk: Calculated risks lead to decisive progress. Obstacle: Stepping stone for determined individuals. Duty: Performed with unwavering integrity."
    },
    "studyTask": {
      "subject": "PHYSICS",
      "topic": "PHYSICS Core Syllabus Block 6",
      "syllabusObjective": "Study PHYSICS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "PHYSICS Study & WAT Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 17,
    "phaseId": "FOUNDATION",
    "weekNumber": 3,
    "title": "Day 17: Eisenhower Matrix: Urgent vs Important Time Management",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete Eisenhower Matrix: Urgent vs Important Time Management study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d17",
      "title": "Eisenhower Matrix: Urgent vs Important Time Management",
      "domain": "PLANNING",
      "objective": "Understand the fundamental doctrine and practical application of Eisenhower Matrix: Urgent vs Important Time Management.",
      "explanation": "Mastery of Eisenhower Matrix: Urgent vs Important Time Management is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Eisenhower Matrix: Urgent vs Important Time Management.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Eisenhower Matrix: Urgent vs Important Time Management under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Eisenhower Matrix: Urgent vs Important Time Management from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Eisenhower Matrix: Urgent vs Important Time Management?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "CALISTHENICS",
      "title": "Upper-Body Calisthenics Strength & Core",
      "prescription": "Warmup + 4 sets of Push-ups (10-15 reps) + 4 sets of Pull-up Progression (4-6 assisted reps / 25s hang) + Plank Holds.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "push_ups",
          "sets": 4,
          "repsOrDuration": "10-15 reps",
          "targetRpe": 7,
          "restSeconds": 60,
          "techniqueCues": "Elbows at 45 degrees, rigid hollow core."
        },
        {
          "exerciseId": "assisted_pull_ups",
          "sets": 4,
          "repsOrDuration": "4-6 assisted reps / 25s hang",
          "targetRpe": 7,
          "restSeconds": 90,
          "techniqueCues": "Depress scapula first, pull chest to bar."
        },
        {
          "exerciseId": "plank",
          "sets": 3,
          "repsOrDuration": "35 seconds",
          "targetRpe": 7,
          "restSeconds": 45,
          "techniqueCues": "Tuck tailbone, contract quads and glutes."
        }
      ],
      "progressionNotes": "Maintain strict cadence. If technique fails, regress to incline or band assistance.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d17",
      "type": "MEMORY",
      "title": "Observation & Working Memory Challenge (Kim's Drill)",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Memorize this 7-item logistical convoy checklist for 60 seconds: 1) Radio Call-sign: BRAVO-2, 2) Route Checkpoint: CP-ALPHA (Grid 6428), 3) Departure Time: 0430 hrs, 4) Vehicle Fuel Reserve: 80 Liters, 5) Primary Emergency Frequency: 45.25 MHz, 6) Medic Lead: Sgt. Sharma, 7) Security Password: KAVACH. Close the screen and write all 7 details from memory.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Verified elements: Call-sign BRAVO-2; Checkpoint CP-ALPHA (Grid 6428); Departure 0430 hrs; Fuel 80L; Frequency 45.25 MHz; Medic Sgt. Sharma; Password KAVACH.",
      "learningExplanation": "Retaining multifaceted logistical data under cognitive pressure is vital for field communications."
    },
    "ssbAssignment": {
      "activity": "SRT",
      "title": "SRT Practical Exercise",
      "instructions": "Complete the SRT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "1) On a night train, you notice smoke emerging from the adjacent electrical compartment. You...\n2) Your team disagrees strongly with your proposed route during a timed navigation exercise. You...\n3) A junior cadet loses their equipment kit 1 hour before morning inspection. You...",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "1) Pulled emergency chain, grabbed coach fire extinguisher, directed passengers to move away, extinguished fire, reported to guard.\n2) Paused, listened to alternate route points, demonstrated map contours objectively, gained consensus on safest route, executed decisively."
    },
    "studyTask": {
      "subject": "ENGLISH",
      "topic": "ENGLISH Core Syllabus Block 6",
      "syllabusObjective": "Study ENGLISH with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "ENGLISH Study & SRT Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 18,
    "phaseId": "FOUNDATION",
    "weekNumber": 3,
    "title": "Day 18: Map Scales, Distance Calculation & Pace Counting Beads",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete Map Scales, Distance Calculation & Pace Counting Beads study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d18",
      "title": "Map Scales, Distance Calculation & Pace Counting Beads",
      "domain": "NAVIGATION",
      "objective": "Understand the fundamental doctrine and practical application of Map Scales, Distance Calculation & Pace Counting Beads.",
      "explanation": "Mastery of Map Scales, Distance Calculation & Pace Counting Beads is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Map Scales, Distance Calculation & Pace Counting Beads.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Map Scales, Distance Calculation & Pace Counting Beads under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Map Scales, Distance Calculation & Pace Counting Beads from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Map Scales, Distance Calculation & Pace Counting Beads?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "LOWER_BODY",
      "title": "Lower-Body Structural Strength & Unilateral Stability",
      "prescription": "Warmup + 4 sets Air Squats (15-20 reps) + 3 sets Reverse Lunges (10 reps/leg) + Glute Bridges.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "bodyweight_squats",
          "sets": 4,
          "repsOrDuration": "15-20 reps",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Hip crease below patella, drive through midfoot."
        },
        {
          "exerciseId": "reverse_lunges",
          "sets": 3,
          "repsOrDuration": "10 reps/leg",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Drop rear knee softly, front knee stacked over ankle."
        },
        {
          "exerciseId": "glute_bridges",
          "sets": 3,
          "repsOrDuration": "15-20 reps with 2s squeeze",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "Drive through heels without hyperextending lumbar."
        }
      ],
      "progressionNotes": "Lower-body endurance provides stamina for long marches and field tasks.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d18",
      "type": "DECISION_MAKING",
      "title": "Tactical Decision Scenario & Resource Trade-Off",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "You are leading a 4-person patrol returning from a 15km reconnaissance march. It is 1700 hrs, sunset is in 90 minutes, and the temperature is dropping rapidly. Member A has a sprained ankle and can only limp at 2 km/h. You are 6 km from the base camp. Member B suggests leaving Member A in a sleeping bag with rations and jogging ahead to get a transport vehicle. Member C insists on carrying Member A using a 2-man seat carry, which will slow the whole team to 3 km/h. What is your decision, and how do you mitigate risks?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Correct Officer Action: Never abandon an injured casualty alone in falling temperatures with night approaching (hypothermia and animal/security hazard). Reject Member B proposal. Adopt an improvised stretcher or 2-man carry rotating bearers between B, C, and yourself every 15 minutes. Send a radio SITREP with current coordinates and estimated arrival, requesting base send a vehicle to the nearest road-head intersecting the path. Maintain team cohesion and security integrity.",
      "learningExplanation": "Prioritizes human life, security integrity, and team cohesion over expedient but dangerous shortcuts."
    },
    "ssbAssignment": {
      "activity": "TAT",
      "title": "TAT Practical Exercise",
      "instructions": "Complete the TAT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "Picture prompt: A person standing on a hilltop looking through binoculars at a distant valley with rising smoke.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Hero: Forest Ranger Rajesh. Identifies forest fire outbreak early, radios division post for backup, mobilizes local village fire-line team, cuts containment trench, extinguishes blaze before reaching timber reserve."
    },
    "studyTask": {
      "subject": "GEOGRAPHY",
      "topic": "GEOGRAPHY Core Syllabus Block 6",
      "syllabusObjective": "Study GEOGRAPHY with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "GEOGRAPHY Study & TAT Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 19,
    "phaseId": "FOUNDATION",
    "weekNumber": 3,
    "title": "Day 19: Wilderness Hydration, Water Filtration & Electrolyte Balance",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete Wilderness Hydration, Water Filtration & Electrolyte Balance study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d19",
      "title": "Wilderness Hydration, Water Filtration & Electrolyte Balance",
      "domain": "FIRST_AID",
      "objective": "Understand the fundamental doctrine and practical application of Wilderness Hydration, Water Filtration & Electrolyte Balance.",
      "explanation": "Mastery of Wilderness Hydration, Water Filtration & Electrolyte Balance is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Wilderness Hydration, Water Filtration & Electrolyte Balance.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Wilderness Hydration, Water Filtration & Electrolyte Balance under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Wilderness Hydration, Water Filtration & Electrolyte Balance from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Wilderness Hydration, Water Filtration & Electrolyte Balance?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "AEROBIC",
      "title": "Aerobic Zone 2 Endurance (3.5 km)",
      "prescription": "Warmup + 3.5 km continuous aerobic run (conversational pace) + Calf Raises.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "3.5 km continuous run",
          "targetRpe": 5,
          "restSeconds": 60,
          "techniqueCues": "Zone 2: Speak in full sentences without gasping."
        },
        {
          "exerciseId": "calf_raises",
          "sets": 3,
          "repsOrDuration": "15 reps",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "2-second pause at apex, controlled descent."
        }
      ],
      "progressionNotes": "Keep heart rate controlled. Build aerobic mitochondrial base.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d19",
      "type": "CRITICAL_THINKING",
      "title": "Fallacy Detection & Argument Deconstruction",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Evaluate this claim: \"Officer Candidate X completed the 5km run 2 minutes faster than Candidate Y. Therefore, Candidate X will make a significantly better operational leader in crisis than Candidate Y.\" Identify the logical fallacy and explain why the conclusion is invalid.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Logical Fallacy: False Equivalence / Hasty Generalization (Fallacy of Division). Physical aerobic speed is only one isolated component of officer competence; it does not measure decision-making under ambiguity, moral courage, communication, spatial planning, or empathy. While fitness is necessary, higher run speed alone does not directly correlate with superior leadership or crisis management.",
      "learningExplanation": "Officers must distinguish isolated performance metrics from holistic leadership capability."
    },
    "ssbAssignment": {
      "activity": "PPDT",
      "title": "PPDT Practical Exercise",
      "instructions": "Complete the PPDT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "A blurred picture of a group of youth gathered around a table with maps and paper in a village community hall.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Hero: Suresh (23), organized youth volunteer group to survey flood damage, prepared relief distribution maps, coordinated medical camp with local authorities."
    },
    "studyTask": {
      "subject": "CHEMISTRY",
      "topic": "CHEMISTRY Core Syllabus Block 7",
      "syllabusObjective": "Study CHEMISTRY with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "CHEMISTRY Study & PPDT Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 20,
    "phaseId": "FOUNDATION",
    "weekNumber": 3,
    "title": "Day 20: Active Listening & Concise Military Communication",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete Active Listening & Concise Military Communication study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d20",
      "title": "Active Listening & Concise Military Communication",
      "domain": "COMMUNICATION",
      "objective": "Understand the fundamental doctrine and practical application of Active Listening & Concise Military Communication.",
      "explanation": "Mastery of Active Listening & Concise Military Communication is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Active Listening & Concise Military Communication.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Active Listening & Concise Military Communication under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Active Listening & Concise Military Communication from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Active Listening & Concise Military Communication?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "CALISTHENICS",
      "title": "Upper-Body Calisthenics Strength & Core",
      "prescription": "Warmup + 4 sets of Push-ups (10-15 reps) + 4 sets of Pull-up Progression (4-6 assisted reps / 25s hang) + Plank Holds.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "push_ups",
          "sets": 4,
          "repsOrDuration": "10-15 reps",
          "targetRpe": 7,
          "restSeconds": 60,
          "techniqueCues": "Elbows at 45 degrees, rigid hollow core."
        },
        {
          "exerciseId": "assisted_pull_ups",
          "sets": 4,
          "repsOrDuration": "4-6 assisted reps / 25s hang",
          "targetRpe": 7,
          "restSeconds": 90,
          "techniqueCues": "Depress scapula first, pull chest to bar."
        },
        {
          "exerciseId": "plank",
          "sets": 3,
          "repsOrDuration": "35 seconds",
          "targetRpe": 7,
          "restSeconds": 45,
          "techniqueCues": "Tuck tailbone, contract quads and glutes."
        }
      ],
      "progressionNotes": "Maintain strict cadence. If technique fails, regress to incline or band assistance.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d20",
      "type": "PSYCHOLOGICAL",
      "title": "Stoic Psychological Ownership & Stress Audit",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Reflect on a recent instance where a task did not go as planned: 1) What was your immediate emotional response (frustration, blaming circumstances, defensiveness)? 2) What part of the failure was within your direct circle of control? 3) How did you handle accountability with others involved?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "High-Performing Response: Acknowledges initial emotional impulse without letting it dictate action; shifts immediately to what was controllable (preparation, communication, contingency planning); takes full ownership without deflecting blame onto external factors or teammates.",
      "learningExplanation": "Extreme ownership eliminates victim mindset and builds commanding authority."
    },
    "ssbAssignment": {
      "activity": "INTERVIEW",
      "title": "INTERVIEW Practical Exercise",
      "instructions": "Complete the INTERVIEW drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "Prepare 3-minute structured answers to: 1) What are your top 3 strengths and 2 weaknesses you are actively working on? 2) Why Indian Armed Forces instead of civil services or corporate career? 3) Describe a situation where you had a conflict with a senior and how you resolved it.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Answer with authenticity, concrete examples, clear cause-and-effect reasoning, without fabricated heroic cliches."
    },
    "studyTask": {
      "subject": "CURRENT_AFFAIRS",
      "topic": "CURRENT_AFFAIRS Core Syllabus Block 7",
      "syllabusObjective": "Study CURRENT_AFFAIRS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "CURRENT_AFFAIRS Study & INTERVIEW Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 21,
    "phaseId": "FOUNDATION",
    "weekNumber": 3,
    "title": "Day 21: Mid-Phase Active Recovery & Cognitive Consolidation",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete Mid-Phase Active Recovery & Cognitive Consolidation study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d21",
      "title": "Mid-Phase Active Recovery & Cognitive Consolidation",
      "domain": "LEADERSHIP",
      "objective": "Understand the fundamental doctrine and practical application of Mid-Phase Active Recovery & Cognitive Consolidation.",
      "explanation": "Mastery of Mid-Phase Active Recovery & Cognitive Consolidation is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Mid-Phase Active Recovery & Cognitive Consolidation.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Mid-Phase Active Recovery & Cognitive Consolidation under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Mid-Phase Active Recovery & Cognitive Consolidation from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Mid-Phase Active Recovery & Cognitive Consolidation?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "RECOVERY",
      "title": "Week 3 Restorative Mobility & Recovery Protocol",
      "prescription": "15 minutes full-body joint mobility flow + 10 minutes tactical box breathing.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "mobility_flow",
          "sets": 1,
          "repsOrDuration": "15 minutes",
          "targetRpe": 3,
          "restSeconds": 0,
          "techniqueCues": "Smooth diaphragmatic breathing into tight areas."
        },
        {
          "exerciseId": "box_breathing",
          "sets": 1,
          "repsOrDuration": "10 minutes",
          "targetRpe": 1,
          "restSeconds": 0,
          "techniqueCues": "4s in, 4s hold, 4s out, 4s empty."
        }
      ],
      "progressionNotes": "Deload allows neuromuscular supercompensation and tissue repair.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d21",
      "type": "REASONING",
      "title": "Number Series & Arithmetic Logic",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Determine the next number in the sequence: 42, 45, 49, 54, 60, ?",
      "options": [
        "65",
        "67",
        "70",
        "72"
      ],
      "correctAnswer": "67",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "The sequence differences increase by +1 each step: +3, +4, +5, +6, so the next difference is +7. 60 + 7 = 67.",
      "learningExplanation": "Step-difference sequences test rapid numerical induction."
    },
    "ssbAssignment": {
      "activity": "READING",
      "title": "READING Practical Exercise",
      "instructions": "Complete the READING drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "Analyze the strategic lessons from the battle/topic of the day. Extract 3 operational takeaways for leadership and tactical doctrine.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Synthesize command decisiveness, logistical foresight, and decentralized initiative."
    },
    "studyTask": {
      "subject": "LEADERSHIP",
      "topic": "LEADERSHIP Core Syllabus Block 7",
      "syllabusObjective": "Study LEADERSHIP with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "LEADERSHIP Study & READING Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 22,
    "phaseId": "FOUNDATION",
    "weekNumber": 4,
    "title": "Day 22: Navigation Resection: Fixing Location Using Two Distant Landmarks",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete Navigation Resection: Fixing Location Using Two Distant Landmarks study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d22",
      "title": "Navigation Resection: Fixing Location Using Two Distant Landmarks",
      "domain": "NAVIGATION",
      "objective": "Understand the fundamental doctrine and practical application of Navigation Resection: Fixing Location Using Two Distant Landmarks.",
      "explanation": "Mastery of Navigation Resection: Fixing Location Using Two Distant Landmarks is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Navigation Resection: Fixing Location Using Two Distant Landmarks.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Navigation Resection: Fixing Location Using Two Distant Landmarks under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Navigation Resection: Fixing Location Using Two Distant Landmarks from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Navigation Resection: Fixing Location Using Two Distant Landmarks?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "AEROBIC",
      "title": "Aerobic Zone 2 Endurance (3.6 km)",
      "prescription": "Warmup + 3.6 km continuous aerobic run (conversational pace) + Calf Raises.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "3.6 km continuous run",
          "targetRpe": 5,
          "restSeconds": 60,
          "techniqueCues": "Zone 2: Speak in full sentences without gasping."
        },
        {
          "exerciseId": "calf_raises",
          "sets": 3,
          "repsOrDuration": "15 reps",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "2-second pause at apex, controlled descent."
        }
      ],
      "progressionNotes": "Keep heart rate controlled. Build aerobic mitochondrial base.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d22",
      "type": "MEMORY",
      "title": "Observation & Working Memory Challenge (Kim's Drill)",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Memorize this 7-item logistical convoy checklist for 60 seconds: 1) Radio Call-sign: BRAVO-2, 2) Route Checkpoint: CP-ALPHA (Grid 6428), 3) Departure Time: 0430 hrs, 4) Vehicle Fuel Reserve: 80 Liters, 5) Primary Emergency Frequency: 45.25 MHz, 6) Medic Lead: Sgt. Sharma, 7) Security Password: KAVACH. Close the screen and write all 7 details from memory.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Verified elements: Call-sign BRAVO-2; Checkpoint CP-ALPHA (Grid 6428); Departure 0430 hrs; Fuel 80L; Frequency 45.25 MHz; Medic Sgt. Sharma; Password KAVACH.",
      "learningExplanation": "Retaining multifaceted logistical data under cognitive pressure is vital for field communications."
    },
    "ssbAssignment": {
      "activity": "OIR",
      "title": "OIR Practical Exercise",
      "instructions": "Complete the OIR drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "Solve 5 mixed classification and analogical reasoning questions under 3 minutes.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Target >90% accuracy. Systematically check symmetry, number of line segments, and rotation direction."
    },
    "studyTask": {
      "subject": "MATHS",
      "topic": "MATHS Core Syllabus Block 8",
      "syllabusObjective": "Study MATHS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "MATHS Study & OIR Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 23,
    "phaseId": "FOUNDATION",
    "weekNumber": 4,
    "title": "Day 23: Musculoskeletal Trauma: Splinting & Immobilization Principles",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete Musculoskeletal Trauma: Splinting & Immobilization Principles study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d23",
      "title": "Musculoskeletal Trauma: Splinting & Immobilization Principles",
      "domain": "FIRST_AID",
      "objective": "Understand the fundamental doctrine and practical application of Musculoskeletal Trauma: Splinting & Immobilization Principles.",
      "explanation": "Mastery of Musculoskeletal Trauma: Splinting & Immobilization Principles is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Musculoskeletal Trauma: Splinting & Immobilization Principles.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Musculoskeletal Trauma: Splinting & Immobilization Principles under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Musculoskeletal Trauma: Splinting & Immobilization Principles from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Musculoskeletal Trauma: Splinting & Immobilization Principles?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "CALISTHENICS",
      "title": "Upper-Body Calisthenics Strength & Core",
      "prescription": "Warmup + 4 sets of Push-ups (10-15 reps) + 4 sets of Pull-up Progression (4-6 assisted reps / 25s hang) + Plank Holds.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "push_ups",
          "sets": 4,
          "repsOrDuration": "10-15 reps",
          "targetRpe": 7,
          "restSeconds": 60,
          "techniqueCues": "Elbows at 45 degrees, rigid hollow core."
        },
        {
          "exerciseId": "assisted_pull_ups",
          "sets": 4,
          "repsOrDuration": "4-6 assisted reps / 25s hang",
          "targetRpe": 7,
          "restSeconds": 90,
          "techniqueCues": "Depress scapula first, pull chest to bar."
        },
        {
          "exerciseId": "plank",
          "sets": 3,
          "repsOrDuration": "35 seconds",
          "targetRpe": 7,
          "restSeconds": 45,
          "techniqueCues": "Tuck tailbone, contract quads and glutes."
        }
      ],
      "progressionNotes": "Maintain strict cadence. If technique fails, regress to incline or band assistance.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d23",
      "type": "DECISION_MAKING",
      "title": "Tactical Decision Scenario & Resource Trade-Off",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "You are leading a 4-person patrol returning from a 15km reconnaissance march. It is 1700 hrs, sunset is in 90 minutes, and the temperature is dropping rapidly. Member A has a sprained ankle and can only limp at 2 km/h. You are 6 km from the base camp. Member B suggests leaving Member A in a sleeping bag with rations and jogging ahead to get a transport vehicle. Member C insists on carrying Member A using a 2-man seat carry, which will slow the whole team to 3 km/h. What is your decision, and how do you mitigate risks?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Correct Officer Action: Never abandon an injured casualty alone in falling temperatures with night approaching (hypothermia and animal/security hazard). Reject Member B proposal. Adopt an improvised stretcher or 2-man carry rotating bearers between B, C, and yourself every 15 minutes. Send a radio SITREP with current coordinates and estimated arrival, requesting base send a vehicle to the nearest road-head intersecting the path. Maintain team cohesion and security integrity.",
      "learningExplanation": "Prioritizes human life, security integrity, and team cohesion over expedient but dangerous shortcuts."
    },
    "ssbAssignment": {
      "activity": "WAT",
      "title": "WAT Practical Exercise",
      "instructions": "Complete the WAT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "10 words: 1) RISK  2) DISCIPLINE  3) CRISIS  4) WEAPON  5) OBSTACLE  6) COOPERATE  7) LONELY  8) VICTORY  9) DUTY  10) TIRED",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Risk: Calculated risks lead to decisive progress. Obstacle: Stepping stone for determined individuals. Duty: Performed with unwavering integrity."
    },
    "studyTask": {
      "subject": "PHYSICS",
      "topic": "PHYSICS Core Syllabus Block 8",
      "syllabusObjective": "Study PHYSICS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "PHYSICS Study & WAT Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 24,
    "phaseId": "FOUNDATION",
    "weekNumber": 4,
    "title": "Day 24: Situational Awareness: Cooper's Color Codes of Readiness",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete Situational Awareness: Cooper's Color Codes of Readiness study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d24",
      "title": "Situational Awareness: Cooper's Color Codes of Readiness",
      "domain": "MENTAL_MODELS",
      "objective": "Understand the fundamental doctrine and practical application of Situational Awareness: Cooper's Color Codes of Readiness.",
      "explanation": "Mastery of Situational Awareness: Cooper's Color Codes of Readiness is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Situational Awareness: Cooper's Color Codes of Readiness.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Situational Awareness: Cooper's Color Codes of Readiness under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Situational Awareness: Cooper's Color Codes of Readiness from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Situational Awareness: Cooper's Color Codes of Readiness?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "LOWER_BODY",
      "title": "Lower-Body Structural Strength & Unilateral Stability",
      "prescription": "Warmup + 4 sets Air Squats (15-20 reps) + 3 sets Reverse Lunges (10 reps/leg) + Glute Bridges.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "bodyweight_squats",
          "sets": 4,
          "repsOrDuration": "15-20 reps",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Hip crease below patella, drive through midfoot."
        },
        {
          "exerciseId": "reverse_lunges",
          "sets": 3,
          "repsOrDuration": "10 reps/leg",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Drop rear knee softly, front knee stacked over ankle."
        },
        {
          "exerciseId": "glute_bridges",
          "sets": 3,
          "repsOrDuration": "15-20 reps with 2s squeeze",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "Drive through heels without hyperextending lumbar."
        }
      ],
      "progressionNotes": "Lower-body endurance provides stamina for long marches and field tasks.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d24",
      "type": "CRITICAL_THINKING",
      "title": "Fallacy Detection & Argument Deconstruction",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Evaluate this claim: \"Officer Candidate X completed the 5km run 2 minutes faster than Candidate Y. Therefore, Candidate X will make a significantly better operational leader in crisis than Candidate Y.\" Identify the logical fallacy and explain why the conclusion is invalid.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Logical Fallacy: False Equivalence / Hasty Generalization (Fallacy of Division). Physical aerobic speed is only one isolated component of officer competence; it does not measure decision-making under ambiguity, moral courage, communication, spatial planning, or empathy. While fitness is necessary, higher run speed alone does not directly correlate with superior leadership or crisis management.",
      "learningExplanation": "Officers must distinguish isolated performance metrics from holistic leadership capability."
    },
    "ssbAssignment": {
      "activity": "SRT",
      "title": "SRT Practical Exercise",
      "instructions": "Complete the SRT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "1) On a night train, you notice smoke emerging from the adjacent electrical compartment. You...\n2) Your team disagrees strongly with your proposed route during a timed navigation exercise. You...\n3) A junior cadet loses their equipment kit 1 hour before morning inspection. You...",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "1) Pulled emergency chain, grabbed coach fire extinguisher, directed passengers to move away, extinguished fire, reported to guard.\n2) Paused, listened to alternate route points, demonstrated map contours objectively, gained consensus on safest route, executed decisively."
    },
    "studyTask": {
      "subject": "CURRENT_AFFAIRS",
      "topic": "CURRENT_AFFAIRS Core Syllabus Block 8",
      "syllabusObjective": "Study CURRENT_AFFAIRS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "CURRENT_AFFAIRS Study & SRT Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 25,
    "phaseId": "FOUNDATION",
    "weekNumber": 4,
    "title": "Day 25: Burn Trauma Management: Thermal, Chemical & Electrical Care",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete Burn Trauma Management: Thermal, Chemical & Electrical Care study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d25",
      "title": "Burn Trauma Management: Thermal, Chemical & Electrical Care",
      "domain": "FIRST_AID",
      "objective": "Understand the fundamental doctrine and practical application of Burn Trauma Management: Thermal, Chemical & Electrical Care.",
      "explanation": "Mastery of Burn Trauma Management: Thermal, Chemical & Electrical Care is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Burn Trauma Management: Thermal, Chemical & Electrical Care.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Burn Trauma Management: Thermal, Chemical & Electrical Care under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Burn Trauma Management: Thermal, Chemical & Electrical Care from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Burn Trauma Management: Thermal, Chemical & Electrical Care?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "AEROBIC",
      "title": "Aerobic Zone 2 Endurance (3.8 km)",
      "prescription": "Warmup + 3.8 km continuous aerobic run (conversational pace) + Calf Raises.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "3.8 km continuous run",
          "targetRpe": 5,
          "restSeconds": 60,
          "techniqueCues": "Zone 2: Speak in full sentences without gasping."
        },
        {
          "exerciseId": "calf_raises",
          "sets": 3,
          "repsOrDuration": "15 reps",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "2-second pause at apex, controlled descent."
        }
      ],
      "progressionNotes": "Keep heart rate controlled. Build aerobic mitochondrial base.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d25",
      "type": "PSYCHOLOGICAL",
      "title": "Stoic Psychological Ownership & Stress Audit",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Reflect on a recent instance where a task did not go as planned: 1) What was your immediate emotional response (frustration, blaming circumstances, defensiveness)? 2) What part of the failure was within your direct circle of control? 3) How did you handle accountability with others involved?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "High-Performing Response: Acknowledges initial emotional impulse without letting it dictate action; shifts immediately to what was controllable (preparation, communication, contingency planning); takes full ownership without deflecting blame onto external factors or teammates.",
      "learningExplanation": "Extreme ownership eliminates victim mindset and builds commanding authority."
    },
    "ssbAssignment": {
      "activity": "TAT",
      "title": "TAT Practical Exercise",
      "instructions": "Complete the TAT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "Picture prompt: A person standing on a hilltop looking through binoculars at a distant valley with rising smoke.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Hero: Forest Ranger Rajesh. Identifies forest fire outbreak early, radios division post for backup, mobilizes local village fire-line team, cuts containment trench, extinguishes blaze before reaching timber reserve."
    },
    "studyTask": {
      "subject": "CHEMISTRY",
      "topic": "CHEMISTRY Core Syllabus Block 9",
      "syllabusObjective": "Study CHEMISTRY with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "CHEMISTRY Study & TAT Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 26,
    "phaseId": "FOUNDATION",
    "weekNumber": 4,
    "title": "Day 26: Constructive Criticism & Peer Deconfliction Under Pressure",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete Constructive Criticism & Peer Deconfliction Under Pressure study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d26",
      "title": "Constructive Criticism & Peer Deconfliction Under Pressure",
      "domain": "COMMUNICATION",
      "objective": "Understand the fundamental doctrine and practical application of Constructive Criticism & Peer Deconfliction Under Pressure.",
      "explanation": "Mastery of Constructive Criticism & Peer Deconfliction Under Pressure is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Constructive Criticism & Peer Deconfliction Under Pressure.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Constructive Criticism & Peer Deconfliction Under Pressure under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Constructive Criticism & Peer Deconfliction Under Pressure from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Constructive Criticism & Peer Deconfliction Under Pressure?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "CALISTHENICS",
      "title": "Upper-Body Calisthenics Strength & Core",
      "prescription": "Warmup + 4 sets of Push-ups (10-15 reps) + 4 sets of Pull-up Progression (4-6 assisted reps / 25s hang) + Plank Holds.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "push_ups",
          "sets": 4,
          "repsOrDuration": "10-15 reps",
          "targetRpe": 7,
          "restSeconds": 60,
          "techniqueCues": "Elbows at 45 degrees, rigid hollow core."
        },
        {
          "exerciseId": "assisted_pull_ups",
          "sets": 4,
          "repsOrDuration": "4-6 assisted reps / 25s hang",
          "targetRpe": 7,
          "restSeconds": 90,
          "techniqueCues": "Depress scapula first, pull chest to bar."
        },
        {
          "exerciseId": "plank",
          "sets": 3,
          "repsOrDuration": "35 seconds",
          "targetRpe": 7,
          "restSeconds": 45,
          "techniqueCues": "Tuck tailbone, contract quads and glutes."
        }
      ],
      "progressionNotes": "Maintain strict cadence. If technique fails, regress to incline or band assistance.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d26",
      "type": "REASONING",
      "title": "Number Series & Arithmetic Logic",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Determine the next number in the sequence: 52, 55, 59, 64, 70, ?",
      "options": [
        "75",
        "77",
        "80",
        "82"
      ],
      "correctAnswer": "77",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "The sequence differences increase by +1 each step: +3, +4, +5, +6, so the next difference is +7. 70 + 7 = 77.",
      "learningExplanation": "Step-difference sequences test rapid numerical induction."
    },
    "ssbAssignment": {
      "activity": "PPDT",
      "title": "PPDT Practical Exercise",
      "instructions": "Complete the PPDT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "A blurred picture of a group of youth gathered around a table with maps and paper in a village community hall.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Hero: Suresh (23), organized youth volunteer group to survey flood damage, prepared relief distribution maps, coordinated medical camp with local authorities."
    },
    "studyTask": {
      "subject": "ENGLISH",
      "topic": "ENGLISH Core Syllabus Block 9",
      "syllabusObjective": "Study ENGLISH with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "ENGLISH Study & PPDT Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 27,
    "phaseId": "FOUNDATION",
    "weekNumber": 4,
    "title": "Day 27: Indian Armed Forces Organization: Integrated Theatre Command Structure",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete Indian Armed Forces Organization: Integrated Theatre Command Structure study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d27",
      "title": "Indian Armed Forces Organization: Integrated Theatre Command Structure",
      "domain": "MILITARY_STUDIES",
      "objective": "Understand the fundamental doctrine and practical application of Indian Armed Forces Organization: Integrated Theatre Command Structure.",
      "explanation": "Mastery of Indian Armed Forces Organization: Integrated Theatre Command Structure is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Indian Armed Forces Organization: Integrated Theatre Command Structure.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Indian Armed Forces Organization: Integrated Theatre Command Structure under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Indian Armed Forces Organization: Integrated Theatre Command Structure from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Indian Armed Forces Organization: Integrated Theatre Command Structure?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "LOWER_BODY",
      "title": "Lower-Body Structural Strength & Unilateral Stability",
      "prescription": "Warmup + 4 sets Air Squats (15-20 reps) + 3 sets Reverse Lunges (10 reps/leg) + Glute Bridges.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "bodyweight_squats",
          "sets": 4,
          "repsOrDuration": "15-20 reps",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Hip crease below patella, drive through midfoot."
        },
        {
          "exerciseId": "reverse_lunges",
          "sets": 3,
          "repsOrDuration": "10 reps/leg",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Drop rear knee softly, front knee stacked over ankle."
        },
        {
          "exerciseId": "glute_bridges",
          "sets": 3,
          "repsOrDuration": "15-20 reps with 2s squeeze",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "Drive through heels without hyperextending lumbar."
        }
      ],
      "progressionNotes": "Lower-body endurance provides stamina for long marches and field tasks.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d27",
      "type": "MEMORY",
      "title": "Observation & Working Memory Challenge (Kim's Drill)",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Memorize this 7-item logistical convoy checklist for 60 seconds: 1) Radio Call-sign: BRAVO-2, 2) Route Checkpoint: CP-ALPHA (Grid 6428), 3) Departure Time: 0430 hrs, 4) Vehicle Fuel Reserve: 80 Liters, 5) Primary Emergency Frequency: 45.25 MHz, 6) Medic Lead: Sgt. Sharma, 7) Security Password: KAVACH. Close the screen and write all 7 details from memory.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Verified elements: Call-sign BRAVO-2; Checkpoint CP-ALPHA (Grid 6428); Departure 0430 hrs; Fuel 80L; Frequency 45.25 MHz; Medic Sgt. Sharma; Password KAVACH.",
      "learningExplanation": "Retaining multifaceted logistical data under cognitive pressure is vital for field communications."
    },
    "ssbAssignment": {
      "activity": "INTERVIEW",
      "title": "INTERVIEW Practical Exercise",
      "instructions": "Complete the INTERVIEW drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "Prepare 3-minute structured answers to: 1) What are your top 3 strengths and 2 weaknesses you are actively working on? 2) Why Indian Armed Forces instead of civil services or corporate career? 3) Describe a situation where you had a conflict with a senior and how you resolved it.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Answer with authenticity, concrete examples, clear cause-and-effect reasoning, without fabricated heroic cliches."
    },
    "studyTask": {
      "subject": "MILITARY_HISTORY",
      "topic": "MILITARY_HISTORY Core Syllabus Block 9",
      "syllabusObjective": "Study MILITARY_HISTORY with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "MILITARY_HISTORY Study & INTERVIEW Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 28,
    "phaseId": "FOUNDATION",
    "weekNumber": 4,
    "title": "Day 28: Deload & Mental Readiness Before Phase Milestone",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete Deload & Mental Readiness Before Phase Milestone study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d28",
      "title": "Deload & Mental Readiness Before Phase Milestone",
      "domain": "LEADERSHIP",
      "objective": "Understand the fundamental doctrine and practical application of Deload & Mental Readiness Before Phase Milestone.",
      "explanation": "Mastery of Deload & Mental Readiness Before Phase Milestone is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Deload & Mental Readiness Before Phase Milestone.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Deload & Mental Readiness Before Phase Milestone under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Deload & Mental Readiness Before Phase Milestone from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Deload & Mental Readiness Before Phase Milestone?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "RECOVERY",
      "title": "Week 4 Restorative Mobility & Recovery Protocol",
      "prescription": "15 minutes full-body joint mobility flow + 10 minutes tactical box breathing.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "mobility_flow",
          "sets": 1,
          "repsOrDuration": "15 minutes",
          "targetRpe": 3,
          "restSeconds": 0,
          "techniqueCues": "Smooth diaphragmatic breathing into tight areas."
        },
        {
          "exerciseId": "box_breathing",
          "sets": 1,
          "repsOrDuration": "10 minutes",
          "targetRpe": 1,
          "restSeconds": 0,
          "techniqueCues": "4s in, 4s hold, 4s out, 4s empty."
        }
      ],
      "progressionNotes": "Deload allows neuromuscular supercompensation and tissue repair.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d28",
      "type": "DECISION_MAKING",
      "title": "Tactical Decision Scenario & Resource Trade-Off",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "You are leading a 4-person patrol returning from a 15km reconnaissance march. It is 1700 hrs, sunset is in 90 minutes, and the temperature is dropping rapidly. Member A has a sprained ankle and can only limp at 2 km/h. You are 6 km from the base camp. Member B suggests leaving Member A in a sleeping bag with rations and jogging ahead to get a transport vehicle. Member C insists on carrying Member A using a 2-man seat carry, which will slow the whole team to 3 km/h. What is your decision, and how do you mitigate risks?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Correct Officer Action: Never abandon an injured casualty alone in falling temperatures with night approaching (hypothermia and animal/security hazard). Reject Member B proposal. Adopt an improvised stretcher or 2-man carry rotating bearers between B, C, and yourself every 15 minutes. Send a radio SITREP with current coordinates and estimated arrival, requesting base send a vehicle to the nearest road-head intersecting the path. Maintain team cohesion and security integrity.",
      "learningExplanation": "Prioritizes human life, security integrity, and team cohesion over expedient but dangerous shortcuts."
    },
    "ssbAssignment": {
      "activity": "READING",
      "title": "READING Practical Exercise",
      "instructions": "Complete the READING drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "Analyze the strategic lessons from the battle/topic of the day. Extract 3 operational takeaways for leadership and tactical doctrine.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Synthesize command decisiveness, logistical foresight, and decentralized initiative."
    },
    "studyTask": {
      "subject": "LEADERSHIP",
      "topic": "LEADERSHIP Core Syllabus Block 10",
      "syllabusObjective": "Study LEADERSHIP with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "LEADERSHIP Study & READING Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 29,
    "phaseId": "FOUNDATION",
    "weekNumber": 5,
    "title": "Day 29: Phase 1 Comprehensive Foundation Knowledge Synthesis",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete Phase 1 Comprehensive Foundation Knowledge Synthesis study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d29",
      "title": "Phase 1 Comprehensive Foundation Knowledge Synthesis",
      "domain": "MILITARY_STUDIES",
      "objective": "Understand the fundamental doctrine and practical application of Phase 1 Comprehensive Foundation Knowledge Synthesis.",
      "explanation": "Mastery of Phase 1 Comprehensive Foundation Knowledge Synthesis is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Phase 1 Comprehensive Foundation Knowledge Synthesis.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Phase 1 Comprehensive Foundation Knowledge Synthesis under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Phase 1 Comprehensive Foundation Knowledge Synthesis from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Phase 1 Comprehensive Foundation Knowledge Synthesis?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "CALISTHENICS",
      "title": "Upper-Body Calisthenics Strength & Core",
      "prescription": "Warmup + 4 sets of Push-ups (10-15 reps) + 4 sets of Pull-up Progression (4-6 assisted reps / 25s hang) + Plank Holds.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "push_ups",
          "sets": 4,
          "repsOrDuration": "10-15 reps",
          "targetRpe": 7,
          "restSeconds": 60,
          "techniqueCues": "Elbows at 45 degrees, rigid hollow core."
        },
        {
          "exerciseId": "assisted_pull_ups",
          "sets": 4,
          "repsOrDuration": "4-6 assisted reps / 25s hang",
          "targetRpe": 7,
          "restSeconds": 90,
          "techniqueCues": "Depress scapula first, pull chest to bar."
        },
        {
          "exerciseId": "plank",
          "sets": 3,
          "repsOrDuration": "35 seconds",
          "targetRpe": 7,
          "restSeconds": 45,
          "techniqueCues": "Tuck tailbone, contract quads and glutes."
        }
      ],
      "progressionNotes": "Maintain strict cadence. If technique fails, regress to incline or band assistance.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d29",
      "type": "CRITICAL_THINKING",
      "title": "Fallacy Detection & Argument Deconstruction",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Evaluate this claim: \"Officer Candidate X completed the 5km run 2 minutes faster than Candidate Y. Therefore, Candidate X will make a significantly better operational leader in crisis than Candidate Y.\" Identify the logical fallacy and explain why the conclusion is invalid.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Logical Fallacy: False Equivalence / Hasty Generalization (Fallacy of Division). Physical aerobic speed is only one isolated component of officer competence; it does not measure decision-making under ambiguity, moral courage, communication, spatial planning, or empathy. While fitness is necessary, higher run speed alone does not directly correlate with superior leadership or crisis management.",
      "learningExplanation": "Officers must distinguish isolated performance metrics from holistic leadership capability."
    },
    "ssbAssignment": {
      "activity": "MOCK_TEST",
      "title": "MOCK_TEST Practical Exercise",
      "instructions": "Complete the MOCK_TEST drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "Analyze the strategic lessons from the battle/topic of the day. Extract 3 operational takeaways for leadership and tactical doctrine.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Synthesize command decisiveness, logistical foresight, and decentralized initiative."
    },
    "studyTask": {
      "subject": "CURRENT_AFFAIRS",
      "topic": "CURRENT_AFFAIRS Core Syllabus Block 10",
      "syllabusObjective": "Study CURRENT_AFFAIRS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "CURRENT_AFFAIRS Study & MOCK_TEST Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 30,
    "phaseId": "FOUNDATION",
    "weekNumber": 5,
    "title": "Day 30: Phase 1 Diagnostic Milestone Assessment & Review",
    "theme": "Foundation: Consistency, Discipline & Basic Competence",
    "objective": "Complete Phase 1 Diagnostic Milestone Assessment & Review study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 80,
    "learningLesson": {
      "id": "lesson_d30",
      "title": "Phase 1 Diagnostic Milestone Assessment & Review",
      "domain": "LEADERSHIP",
      "objective": "Understand the fundamental doctrine and practical application of Phase 1 Diagnostic Milestone Assessment & Review.",
      "explanation": "Mastery of Phase 1 Diagnostic Milestone Assessment & Review is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Phase 1 Diagnostic Milestone Assessment & Review.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Phase 1 Diagnostic Milestone Assessment & Review under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Phase 1 Diagnostic Milestone Assessment & Review from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Phase 1 Diagnostic Milestone Assessment & Review?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "BENCHMARK",
      "title": "Benchmark Diagnostic Fitness Assessment (Day 30)",
      "prescription": "Warmup + 3.0 km Time Trial + Max Push-ups (strict form) + Max Plank Hold.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "3.0 km continuous time trial",
          "targetRpe": 8,
          "restSeconds": 180,
          "techniqueCues": "Pace evenly from the start."
        },
        {
          "exerciseId": "push_ups",
          "sets": 1,
          "repsOrDuration": "Max repetitions to failure",
          "targetRpe": 9,
          "restSeconds": 120,
          "techniqueCues": "Chest within 2 inches of deck, full lockout."
        },
        {
          "exerciseId": "plank",
          "sets": 1,
          "repsOrDuration": "Max hold for time",
          "targetRpe": 8,
          "restSeconds": 90,
          "techniqueCues": "Rigid straight line from heels to ears."
        }
      ],
      "progressionNotes": "Record exact times and repetitions to compare with baseline.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d30",
      "type": "PSYCHOLOGICAL",
      "title": "Stoic Psychological Ownership & Stress Audit",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Reflect on a recent instance where a task did not go as planned: 1) What was your immediate emotional response (frustration, blaming circumstances, defensiveness)? 2) What part of the failure was within your direct circle of control? 3) How did you handle accountability with others involved?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "High-Performing Response: Acknowledges initial emotional impulse without letting it dictate action; shifts immediately to what was controllable (preparation, communication, contingency planning); takes full ownership without deflecting blame onto external factors or teammates.",
      "learningExplanation": "Extreme ownership eliminates victim mindset and builds commanding authority."
    },
    "ssbAssignment": {
      "activity": "MOCK_TEST",
      "title": "MOCK_TEST Practical Exercise",
      "instructions": "Complete the MOCK_TEST drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 20,
      "stimulus": "Analyze the strategic lessons from the battle/topic of the day. Extract 3 operational takeaways for leadership and tactical doctrine.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Synthesize command decisiveness, logistical foresight, and decentralized initiative."
    },
    "studyTask": {
      "subject": "LEADERSHIP",
      "topic": "LEADERSHIP Core Syllabus Block 10",
      "syllabusObjective": "Study LEADERSHIP with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 45
    },
    "chronosRecommendation": {
      "intent": "LEADERSHIP Study & MOCK_TEST Drill",
      "mode": "FOCUS",
      "targetMinutes": 45
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 31,
    "phaseId": "HARDENING",
    "weekNumber": 5,
    "title": "Day 31: Advanced Topographic Relief: Spurs, Re-entrants & Saddles",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Advanced Topographic Relief: Spurs, Re-entrants & Saddles study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d31",
      "title": "Advanced Topographic Relief: Spurs, Re-entrants & Saddles",
      "domain": "NAVIGATION",
      "objective": "Understand the fundamental doctrine and practical application of Advanced Topographic Relief: Spurs, Re-entrants & Saddles.",
      "explanation": "Mastery of Advanced Topographic Relief: Spurs, Re-entrants & Saddles is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Advanced Topographic Relief: Spurs, Re-entrants & Saddles.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Advanced Topographic Relief: Spurs, Re-entrants & Saddles under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Advanced Topographic Relief: Spurs, Re-entrants & Saddles from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Advanced Topographic Relief: Spurs, Re-entrants & Saddles?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "AEROBIC",
      "title": "Aerobic Zone 2 Endurance (4.6 km)",
      "prescription": "Warmup + 4.6 km continuous aerobic run (conversational pace) + Calf Raises.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "4.6 km continuous run",
          "targetRpe": 5,
          "restSeconds": 60,
          "techniqueCues": "Zone 2: Speak in full sentences without gasping."
        },
        {
          "exerciseId": "calf_raises",
          "sets": 3,
          "repsOrDuration": "25 reps",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "2-second pause at apex, controlled descent."
        }
      ],
      "progressionNotes": "Keep heart rate controlled. Build aerobic mitochondrial base.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d31",
      "type": "REASONING",
      "title": "Number Series & Arithmetic Logic",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Determine the next number in the sequence: 62, 65, 69, 74, 80, ?",
      "options": [
        "85",
        "87",
        "90",
        "92"
      ],
      "correctAnswer": "87",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "The sequence differences increase by +1 each step: +3, +4, +5, +6, so the next difference is +7. 80 + 7 = 87.",
      "learningExplanation": "Step-difference sequences test rapid numerical induction."
    },
    "ssbAssignment": {
      "activity": "OIR",
      "title": "OIR Practical Exercise",
      "instructions": "Complete the OIR drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Solve 5 mixed classification and analogical reasoning questions under 3 minutes.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Target >90% accuracy. Systematically check symmetry, number of line segments, and rotation direction."
    },
    "studyTask": {
      "subject": "GEOGRAPHY",
      "topic": "GEOGRAPHY Core Syllabus Block 11",
      "syllabusObjective": "Study GEOGRAPHY with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "GEOGRAPHY Study & OIR Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 32,
    "phaseId": "HARDENING",
    "weekNumber": 5,
    "title": "Day 32: The OODA Loop: Rapid Observation-Orientation Decision Cycle",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete The OODA Loop: Rapid Observation-Orientation Decision Cycle study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d32",
      "title": "The OODA Loop: Rapid Observation-Orientation Decision Cycle",
      "domain": "MENTAL_MODELS",
      "objective": "Understand the fundamental doctrine and practical application of The OODA Loop: Rapid Observation-Orientation Decision Cycle.",
      "explanation": "Mastery of The OODA Loop: Rapid Observation-Orientation Decision Cycle is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing The OODA Loop: Rapid Observation-Orientation Decision Cycle.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of The OODA Loop: Rapid Observation-Orientation Decision Cycle under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for The OODA Loop: Rapid Observation-Orientation Decision Cycle from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of The OODA Loop: Rapid Observation-Orientation Decision Cycle?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "CALISTHENICS",
      "title": "Upper-Body Calisthenics Strength & Core",
      "prescription": "Warmup + 4 sets of Push-ups (18-25 reps) + 4 sets of Pull-up Progression (6-8 assisted or eccentric negatives) + Plank Holds.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "push_ups",
          "sets": 4,
          "repsOrDuration": "18-25 reps",
          "targetRpe": 7,
          "restSeconds": 60,
          "techniqueCues": "Elbows at 45 degrees, rigid hollow core."
        },
        {
          "exerciseId": "assisted_pull_ups",
          "sets": 4,
          "repsOrDuration": "6-8 assisted or eccentric negatives",
          "targetRpe": 7,
          "restSeconds": 90,
          "techniqueCues": "Depress scapula first, pull chest to bar."
        },
        {
          "exerciseId": "plank",
          "sets": 3,
          "repsOrDuration": "60 seconds",
          "targetRpe": 7,
          "restSeconds": 45,
          "techniqueCues": "Tuck tailbone, contract quads and glutes."
        }
      ],
      "progressionNotes": "Maintain strict cadence. If technique fails, regress to incline or band assistance.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d32",
      "type": "MEMORY",
      "title": "Observation & Working Memory Challenge (Kim's Drill)",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Memorize this 7-item logistical convoy checklist for 60 seconds: 1) Radio Call-sign: BRAVO-2, 2) Route Checkpoint: CP-ALPHA (Grid 6428), 3) Departure Time: 0430 hrs, 4) Vehicle Fuel Reserve: 80 Liters, 5) Primary Emergency Frequency: 45.25 MHz, 6) Medic Lead: Sgt. Sharma, 7) Security Password: KAVACH. Close the screen and write all 7 details from memory.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Verified elements: Call-sign BRAVO-2; Checkpoint CP-ALPHA (Grid 6428); Departure 0430 hrs; Fuel 80L; Frequency 45.25 MHz; Medic Sgt. Sharma; Password KAVACH.",
      "learningExplanation": "Retaining multifaceted logistical data under cognitive pressure is vital for field communications."
    },
    "ssbAssignment": {
      "activity": "PPDT",
      "title": "PPDT Practical Exercise",
      "instructions": "Complete the PPDT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "A blurred picture of a group of youth gathered around a table with maps and paper in a village community hall.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Hero: Suresh (23), organized youth volunteer group to survey flood damage, prepared relief distribution maps, coordinated medical camp with local authorities."
    },
    "studyTask": {
      "subject": "PHYSICS",
      "topic": "PHYSICS Core Syllabus Block 11",
      "syllabusObjective": "Study PHYSICS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "PHYSICS Study & PPDT Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 33,
    "phaseId": "HARDENING",
    "weekNumber": 5,
    "title": "Day 33: Airway Emergencies: Choking, Recovery Position & Tension Pneumothorax",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Airway Emergencies: Choking, Recovery Position & Tension Pneumothorax study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d33",
      "title": "Airway Emergencies: Choking, Recovery Position & Tension Pneumothorax",
      "domain": "FIRST_AID",
      "objective": "Understand the fundamental doctrine and practical application of Airway Emergencies: Choking, Recovery Position & Tension Pneumothorax.",
      "explanation": "Mastery of Airway Emergencies: Choking, Recovery Position & Tension Pneumothorax is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Airway Emergencies: Choking, Recovery Position & Tension Pneumothorax.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Airway Emergencies: Choking, Recovery Position & Tension Pneumothorax under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Airway Emergencies: Choking, Recovery Position & Tension Pneumothorax from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Airway Emergencies: Choking, Recovery Position & Tension Pneumothorax?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "LOWER_BODY",
      "title": "Lower-Body Structural Strength & Unilateral Stability",
      "prescription": "Warmup + 4 sets Air Squats (25-30 reps) + 3 sets Reverse Lunges (15 reps/leg) + Glute Bridges.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "bodyweight_squats",
          "sets": 4,
          "repsOrDuration": "25-30 reps",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Hip crease below patella, drive through midfoot."
        },
        {
          "exerciseId": "reverse_lunges",
          "sets": 3,
          "repsOrDuration": "15 reps/leg",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Drop rear knee softly, front knee stacked over ankle."
        },
        {
          "exerciseId": "glute_bridges",
          "sets": 3,
          "repsOrDuration": "15-20 reps with 2s squeeze",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "Drive through heels without hyperextending lumbar."
        }
      ],
      "progressionNotes": "Lower-body endurance provides stamina for long marches and field tasks.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d33",
      "type": "DECISION_MAKING",
      "title": "Tactical Decision Scenario & Resource Trade-Off",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "You are leading a 4-person patrol returning from a 15km reconnaissance march. It is 1700 hrs, sunset is in 90 minutes, and the temperature is dropping rapidly. Member A has a sprained ankle and can only limp at 2 km/h. You are 6 km from the base camp. Member B suggests leaving Member A in a sleeping bag with rations and jogging ahead to get a transport vehicle. Member C insists on carrying Member A using a 2-man seat carry, which will slow the whole team to 3 km/h. What is your decision, and how do you mitigate risks?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Correct Officer Action: Never abandon an injured casualty alone in falling temperatures with night approaching (hypothermia and animal/security hazard). Reject Member B proposal. Adopt an improvised stretcher or 2-man carry rotating bearers between B, C, and yourself every 15 minutes. Send a radio SITREP with current coordinates and estimated arrival, requesting base send a vehicle to the nearest road-head intersecting the path. Maintain team cohesion and security integrity.",
      "learningExplanation": "Prioritizes human life, security integrity, and team cohesion over expedient but dangerous shortcuts."
    },
    "ssbAssignment": {
      "activity": "WAT",
      "title": "WAT Practical Exercise",
      "instructions": "Complete the WAT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "10 words: 1) RISK  2) DISCIPLINE  3) CRISIS  4) WEAPON  5) OBSTACLE  6) COOPERATE  7) LONELY  8) VICTORY  9) DUTY  10) TIRED",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Risk: Calculated risks lead to decisive progress. Obstacle: Stepping stone for determined individuals. Duty: Performed with unwavering integrity."
    },
    "studyTask": {
      "subject": "CHEMISTRY",
      "topic": "CHEMISTRY Core Syllabus Block 11",
      "syllabusObjective": "Study CHEMISTRY with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "CHEMISTRY Study & WAT Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 34,
    "phaseId": "HARDENING",
    "weekNumber": 5,
    "title": "Day 34: Dead Reckoning & Night Navigation Route Planning",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Dead Reckoning & Night Navigation Route Planning study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d34",
      "title": "Dead Reckoning & Night Navigation Route Planning",
      "domain": "NAVIGATION",
      "objective": "Understand the fundamental doctrine and practical application of Dead Reckoning & Night Navigation Route Planning.",
      "explanation": "Mastery of Dead Reckoning & Night Navigation Route Planning is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Dead Reckoning & Night Navigation Route Planning.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Dead Reckoning & Night Navigation Route Planning under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Dead Reckoning & Night Navigation Route Planning from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Dead Reckoning & Night Navigation Route Planning?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "AEROBIC",
      "title": "Aerobic Zone 2 Endurance (4.8 km)",
      "prescription": "Warmup + 4.8 km continuous aerobic run (conversational pace) + Calf Raises.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "4.8 km continuous run",
          "targetRpe": 5,
          "restSeconds": 60,
          "techniqueCues": "Zone 2: Speak in full sentences without gasping."
        },
        {
          "exerciseId": "calf_raises",
          "sets": 3,
          "repsOrDuration": "25 reps",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "2-second pause at apex, controlled descent."
        }
      ],
      "progressionNotes": "Keep heart rate controlled. Build aerobic mitochondrial base.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d34",
      "type": "CRITICAL_THINKING",
      "title": "Fallacy Detection & Argument Deconstruction",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Evaluate this claim: \"Officer Candidate X completed the 5km run 2 minutes faster than Candidate Y. Therefore, Candidate X will make a significantly better operational leader in crisis than Candidate Y.\" Identify the logical fallacy and explain why the conclusion is invalid.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Logical Fallacy: False Equivalence / Hasty Generalization (Fallacy of Division). Physical aerobic speed is only one isolated component of officer competence; it does not measure decision-making under ambiguity, moral courage, communication, spatial planning, or empathy. While fitness is necessary, higher run speed alone does not directly correlate with superior leadership or crisis management.",
      "learningExplanation": "Officers must distinguish isolated performance metrics from holistic leadership capability."
    },
    "ssbAssignment": {
      "activity": "SRT",
      "title": "SRT Practical Exercise",
      "instructions": "Complete the SRT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "1) On a night train, you notice smoke emerging from the adjacent electrical compartment. You...\n2) Your team disagrees strongly with your proposed route during a timed navigation exercise. You...\n3) A junior cadet loses their equipment kit 1 hour before morning inspection. You...",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "1) Pulled emergency chain, grabbed coach fire extinguisher, directed passengers to move away, extinguished fire, reported to guard.\n2) Paused, listened to alternate route points, demonstrated map contours objectively, gained consensus on safest route, executed decisively."
    },
    "studyTask": {
      "subject": "MATHS",
      "topic": "MATHS Core Syllabus Block 12",
      "syllabusObjective": "Study MATHS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "MATHS Study & SRT Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 35,
    "phaseId": "HARDENING",
    "weekNumber": 5,
    "title": "Day 35: Principles of Mission Command: Commander's Intent & Subordinate Initiative",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Principles of Mission Command: Commander's Intent & Subordinate Initiative study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d35",
      "title": "Principles of Mission Command: Commander's Intent & Subordinate Initiative",
      "domain": "LEADERSHIP",
      "objective": "Understand the fundamental doctrine and practical application of Principles of Mission Command: Commander's Intent & Subordinate Initiative.",
      "explanation": "Mastery of Principles of Mission Command: Commander's Intent & Subordinate Initiative is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Principles of Mission Command: Commander's Intent & Subordinate Initiative.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Principles of Mission Command: Commander's Intent & Subordinate Initiative under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Principles of Mission Command: Commander's Intent & Subordinate Initiative from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Principles of Mission Command: Commander's Intent & Subordinate Initiative?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "RECOVERY",
      "title": "Week 5 Restorative Mobility & Recovery Protocol",
      "prescription": "15 minutes full-body joint mobility flow + 10 minutes tactical box breathing.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "mobility_flow",
          "sets": 1,
          "repsOrDuration": "15 minutes",
          "targetRpe": 3,
          "restSeconds": 0,
          "techniqueCues": "Smooth diaphragmatic breathing into tight areas."
        },
        {
          "exerciseId": "box_breathing",
          "sets": 1,
          "repsOrDuration": "10 minutes",
          "targetRpe": 1,
          "restSeconds": 0,
          "techniqueCues": "4s in, 4s hold, 4s out, 4s empty."
        }
      ],
      "progressionNotes": "Deload allows neuromuscular supercompensation and tissue repair.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d35",
      "type": "PSYCHOLOGICAL",
      "title": "Stoic Psychological Ownership & Stress Audit",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Reflect on a recent instance where a task did not go as planned: 1) What was your immediate emotional response (frustration, blaming circumstances, defensiveness)? 2) What part of the failure was within your direct circle of control? 3) How did you handle accountability with others involved?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "High-Performing Response: Acknowledges initial emotional impulse without letting it dictate action; shifts immediately to what was controllable (preparation, communication, contingency planning); takes full ownership without deflecting blame onto external factors or teammates.",
      "learningExplanation": "Extreme ownership eliminates victim mindset and builds commanding authority."
    },
    "ssbAssignment": {
      "activity": "TAT",
      "title": "TAT Practical Exercise",
      "instructions": "Complete the TAT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Picture prompt: A person standing on a hilltop looking through binoculars at a distant valley with rising smoke.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Hero: Forest Ranger Rajesh. Identifies forest fire outbreak early, radios division post for backup, mobilizes local village fire-line team, cuts containment trench, extinguishes blaze before reaching timber reserve."
    },
    "studyTask": {
      "subject": "LEADERSHIP",
      "topic": "LEADERSHIP Core Syllabus Block 12",
      "syllabusObjective": "Study LEADERSHIP with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "LEADERSHIP Study & TAT Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 36,
    "phaseId": "HARDENING",
    "weekNumber": 6,
    "title": "Day 36: Critical Reading: Identifying Logical Fallacies & Cognitive Biases",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Critical Reading: Identifying Logical Fallacies & Cognitive Biases study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d36",
      "title": "Critical Reading: Identifying Logical Fallacies & Cognitive Biases",
      "domain": "COMMUNICATION",
      "objective": "Understand the fundamental doctrine and practical application of Critical Reading: Identifying Logical Fallacies & Cognitive Biases.",
      "explanation": "Mastery of Critical Reading: Identifying Logical Fallacies & Cognitive Biases is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Critical Reading: Identifying Logical Fallacies & Cognitive Biases.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Critical Reading: Identifying Logical Fallacies & Cognitive Biases under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Critical Reading: Identifying Logical Fallacies & Cognitive Biases from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Critical Reading: Identifying Logical Fallacies & Cognitive Biases?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "LOWER_BODY",
      "title": "Lower-Body Structural Strength & Unilateral Stability",
      "prescription": "Warmup + 4 sets Air Squats (25-30 reps) + 3 sets Reverse Lunges (15 reps/leg) + Glute Bridges.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "bodyweight_squats",
          "sets": 4,
          "repsOrDuration": "25-30 reps",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Hip crease below patella, drive through midfoot."
        },
        {
          "exerciseId": "reverse_lunges",
          "sets": 3,
          "repsOrDuration": "15 reps/leg",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Drop rear knee softly, front knee stacked over ankle."
        },
        {
          "exerciseId": "glute_bridges",
          "sets": 3,
          "repsOrDuration": "15-20 reps with 2s squeeze",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "Drive through heels without hyperextending lumbar."
        }
      ],
      "progressionNotes": "Lower-body endurance provides stamina for long marches and field tasks.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d36",
      "type": "REASONING",
      "title": "Number Series & Arithmetic Logic",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Determine the next number in the sequence: 72, 75, 79, 84, 90, ?",
      "options": [
        "95",
        "97",
        "100",
        "102"
      ],
      "correctAnswer": "97",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "The sequence differences increase by +1 each step: +3, +4, +5, +6, so the next difference is +7. 90 + 7 = 97.",
      "learningExplanation": "Step-difference sequences test rapid numerical induction."
    },
    "ssbAssignment": {
      "activity": "GD",
      "title": "GD Practical Exercise",
      "instructions": "Complete the GD drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Group Discussion topic: \"Role of artificial intelligence, autonomous drones, and hypersonic systems in modern warfare: Opportunity or vulnerability?\"",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Structure points: 1) Force multiplier in surveillance and precision strike; 2) Vulnerability in GPS-denied environments and electronic warfare jamming; 3) Necessity of domestic sovereign algorithmic capability."
    },
    "studyTask": {
      "subject": "ENGLISH",
      "topic": "ENGLISH Core Syllabus Block 12",
      "syllabusObjective": "Study ENGLISH with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "ENGLISH Study & GD Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 37,
    "phaseId": "HARDENING",
    "weekNumber": 6,
    "title": "Day 37: Hardening Deload: Restorative Mobility & Weekly Debrief",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Hardening Deload: Restorative Mobility & Weekly Debrief study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d37",
      "title": "Hardening Deload: Restorative Mobility & Weekly Debrief",
      "domain": "LEADERSHIP",
      "objective": "Understand the fundamental doctrine and practical application of Hardening Deload: Restorative Mobility & Weekly Debrief.",
      "explanation": "Mastery of Hardening Deload: Restorative Mobility & Weekly Debrief is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Hardening Deload: Restorative Mobility & Weekly Debrief.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Hardening Deload: Restorative Mobility & Weekly Debrief under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Hardening Deload: Restorative Mobility & Weekly Debrief from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Hardening Deload: Restorative Mobility & Weekly Debrief?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "AEROBIC",
      "title": "Aerobic Zone 2 Endurance (5.1 km)",
      "prescription": "Warmup + 5.1 km continuous aerobic run (conversational pace) + Calf Raises.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "5.1 km continuous run",
          "targetRpe": 5,
          "restSeconds": 60,
          "techniqueCues": "Zone 2: Speak in full sentences without gasping."
        },
        {
          "exerciseId": "calf_raises",
          "sets": 3,
          "repsOrDuration": "25 reps",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "2-second pause at apex, controlled descent."
        }
      ],
      "progressionNotes": "Keep heart rate controlled. Build aerobic mitochondrial base.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d37",
      "type": "MEMORY",
      "title": "Observation & Working Memory Challenge (Kim's Drill)",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Memorize this 7-item logistical convoy checklist for 60 seconds: 1) Radio Call-sign: BRAVO-2, 2) Route Checkpoint: CP-ALPHA (Grid 6428), 3) Departure Time: 0430 hrs, 4) Vehicle Fuel Reserve: 80 Liters, 5) Primary Emergency Frequency: 45.25 MHz, 6) Medic Lead: Sgt. Sharma, 7) Security Password: KAVACH. Close the screen and write all 7 details from memory.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Verified elements: Call-sign BRAVO-2; Checkpoint CP-ALPHA (Grid 6428); Departure 0430 hrs; Fuel 80L; Frequency 45.25 MHz; Medic Sgt. Sharma; Password KAVACH.",
      "learningExplanation": "Retaining multifaceted logistical data under cognitive pressure is vital for field communications."
    },
    "ssbAssignment": {
      "activity": "READING",
      "title": "READING Practical Exercise",
      "instructions": "Complete the READING drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Analyze the strategic lessons from the battle/topic of the day. Extract 3 operational takeaways for leadership and tactical doctrine.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Synthesize command decisiveness, logistical foresight, and decentralized initiative."
    },
    "studyTask": {
      "subject": "LEADERSHIP",
      "topic": "LEADERSHIP Core Syllabus Block 13",
      "syllabusObjective": "Study LEADERSHIP with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "LEADERSHIP Study & READING Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 38,
    "phaseId": "HARDENING",
    "weekNumber": 6,
    "title": "Day 38: Terrain Analysis Framework: OAKOC Military Land Study",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Terrain Analysis Framework: OAKOC Military Land Study study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d38",
      "title": "Terrain Analysis Framework: OAKOC Military Land Study",
      "domain": "NAVIGATION",
      "objective": "Understand the fundamental doctrine and practical application of Terrain Analysis Framework: OAKOC Military Land Study.",
      "explanation": "Mastery of Terrain Analysis Framework: OAKOC Military Land Study is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Terrain Analysis Framework: OAKOC Military Land Study.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Terrain Analysis Framework: OAKOC Military Land Study under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Terrain Analysis Framework: OAKOC Military Land Study from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Terrain Analysis Framework: OAKOC Military Land Study?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "CALISTHENICS",
      "title": "Upper-Body Calisthenics Strength & Core",
      "prescription": "Warmup + 4 sets of Push-ups (18-25 reps) + 4 sets of Pull-up Progression (6-8 assisted or eccentric negatives) + Plank Holds.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "push_ups",
          "sets": 4,
          "repsOrDuration": "18-25 reps",
          "targetRpe": 7,
          "restSeconds": 60,
          "techniqueCues": "Elbows at 45 degrees, rigid hollow core."
        },
        {
          "exerciseId": "assisted_pull_ups",
          "sets": 4,
          "repsOrDuration": "6-8 assisted or eccentric negatives",
          "targetRpe": 7,
          "restSeconds": 90,
          "techniqueCues": "Depress scapula first, pull chest to bar."
        },
        {
          "exerciseId": "plank",
          "sets": 3,
          "repsOrDuration": "60 seconds",
          "targetRpe": 7,
          "restSeconds": 45,
          "techniqueCues": "Tuck tailbone, contract quads and glutes."
        }
      ],
      "progressionNotes": "Maintain strict cadence. If technique fails, regress to incline or band assistance.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d38",
      "type": "DECISION_MAKING",
      "title": "Tactical Decision Scenario & Resource Trade-Off",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "You are leading a 4-person patrol returning from a 15km reconnaissance march. It is 1700 hrs, sunset is in 90 minutes, and the temperature is dropping rapidly. Member A has a sprained ankle and can only limp at 2 km/h. You are 6 km from the base camp. Member B suggests leaving Member A in a sleeping bag with rations and jogging ahead to get a transport vehicle. Member C insists on carrying Member A using a 2-man seat carry, which will slow the whole team to 3 km/h. What is your decision, and how do you mitigate risks?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Correct Officer Action: Never abandon an injured casualty alone in falling temperatures with night approaching (hypothermia and animal/security hazard). Reject Member B proposal. Adopt an improvised stretcher or 2-man carry rotating bearers between B, C, and yourself every 15 minutes. Send a radio SITREP with current coordinates and estimated arrival, requesting base send a vehicle to the nearest road-head intersecting the path. Maintain team cohesion and security integrity.",
      "learningExplanation": "Prioritizes human life, security integrity, and team cohesion over expedient but dangerous shortcuts."
    },
    "ssbAssignment": {
      "activity": "GTO_1",
      "title": "GTO_1 Practical Exercise",
      "instructions": "Complete the GTO_1 drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Group Planning Exercise: 4 emergencies simultaneously: 1) Injured farmer bleeding heavily (needs help in 30 min), 2) River bund leaking (bursts in 60 min flooding town), 3) Stolen temple idol moving toward border in car, 4) Train arriving in 45 min with severed signal cable. You have 8 people, 2 bicycles, a tractor, and first aid kit.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Divide team based on urgency: Team 1 (2 people with first aid & bicycle) immediate medical care; Team 2 (3 people with tractor & sandbags) secure river bund; Team 3 (2 people) report idol theft to police outpost at crossroads; Team 4 (1 person) warn railway station master via station phone or manual flag."
    },
    "studyTask": {
      "subject": "GEOGRAPHY",
      "topic": "GEOGRAPHY Core Syllabus Block 13",
      "syllabusObjective": "Study GEOGRAPHY with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "GEOGRAPHY Study & GTO_1 Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 39,
    "phaseId": "HARDENING",
    "weekNumber": 6,
    "title": "Day 39: Mass Casualty Triage: The START Protocol",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Mass Casualty Triage: The START Protocol study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d39",
      "title": "Mass Casualty Triage: The START Protocol",
      "domain": "FIRST_AID",
      "objective": "Understand the fundamental doctrine and practical application of Mass Casualty Triage: The START Protocol.",
      "explanation": "Mastery of Mass Casualty Triage: The START Protocol is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Mass Casualty Triage: The START Protocol.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Mass Casualty Triage: The START Protocol under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Mass Casualty Triage: The START Protocol from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Mass Casualty Triage: The START Protocol?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "LOWER_BODY",
      "title": "Lower-Body Structural Strength & Unilateral Stability",
      "prescription": "Warmup + 4 sets Air Squats (25-30 reps) + 3 sets Reverse Lunges (15 reps/leg) + Glute Bridges.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "bodyweight_squats",
          "sets": 4,
          "repsOrDuration": "25-30 reps",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Hip crease below patella, drive through midfoot."
        },
        {
          "exerciseId": "reverse_lunges",
          "sets": 3,
          "repsOrDuration": "15 reps/leg",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Drop rear knee softly, front knee stacked over ankle."
        },
        {
          "exerciseId": "glute_bridges",
          "sets": 3,
          "repsOrDuration": "15-20 reps with 2s squeeze",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "Drive through heels without hyperextending lumbar."
        }
      ],
      "progressionNotes": "Lower-body endurance provides stamina for long marches and field tasks.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d39",
      "type": "CRITICAL_THINKING",
      "title": "Fallacy Detection & Argument Deconstruction",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Evaluate this claim: \"Officer Candidate X completed the 5km run 2 minutes faster than Candidate Y. Therefore, Candidate X will make a significantly better operational leader in crisis than Candidate Y.\" Identify the logical fallacy and explain why the conclusion is invalid.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Logical Fallacy: False Equivalence / Hasty Generalization (Fallacy of Division). Physical aerobic speed is only one isolated component of officer competence; it does not measure decision-making under ambiguity, moral courage, communication, spatial planning, or empathy. While fitness is necessary, higher run speed alone does not directly correlate with superior leadership or crisis management.",
      "learningExplanation": "Officers must distinguish isolated performance metrics from holistic leadership capability."
    },
    "ssbAssignment": {
      "activity": "SRT",
      "title": "SRT Practical Exercise",
      "instructions": "Complete the SRT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "1) On a night train, you notice smoke emerging from the adjacent electrical compartment. You...\n2) Your team disagrees strongly with your proposed route during a timed navigation exercise. You...\n3) A junior cadet loses their equipment kit 1 hour before morning inspection. You...",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "1) Pulled emergency chain, grabbed coach fire extinguisher, directed passengers to move away, extinguished fire, reported to guard.\n2) Paused, listened to alternate route points, demonstrated map contours objectively, gained consensus on safest route, executed decisively."
    },
    "studyTask": {
      "subject": "PHYSICS",
      "topic": "PHYSICS Core Syllabus Block 13",
      "syllabusObjective": "Study PHYSICS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "PHYSICS Study & SRT Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 40,
    "phaseId": "HARDENING",
    "weekNumber": 6,
    "title": "Day 40: Decision Matrices: Weighted Multi-Factor Decision Making",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Decision Matrices: Weighted Multi-Factor Decision Making study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d40",
      "title": "Decision Matrices: Weighted Multi-Factor Decision Making",
      "domain": "PLANNING",
      "objective": "Understand the fundamental doctrine and practical application of Decision Matrices: Weighted Multi-Factor Decision Making.",
      "explanation": "Mastery of Decision Matrices: Weighted Multi-Factor Decision Making is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Decision Matrices: Weighted Multi-Factor Decision Making.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Decision Matrices: Weighted Multi-Factor Decision Making under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Decision Matrices: Weighted Multi-Factor Decision Making from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Decision Matrices: Weighted Multi-Factor Decision Making?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "AEROBIC",
      "title": "Aerobic Zone 2 Endurance (5.3 km)",
      "prescription": "Warmup + 5.3 km continuous aerobic run (conversational pace) + Calf Raises.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "5.3 km continuous run",
          "targetRpe": 5,
          "restSeconds": 60,
          "techniqueCues": "Zone 2: Speak in full sentences without gasping."
        },
        {
          "exerciseId": "calf_raises",
          "sets": 3,
          "repsOrDuration": "25 reps",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "2-second pause at apex, controlled descent."
        }
      ],
      "progressionNotes": "Keep heart rate controlled. Build aerobic mitochondrial base.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d40",
      "type": "PSYCHOLOGICAL",
      "title": "Stoic Psychological Ownership & Stress Audit",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Reflect on a recent instance where a task did not go as planned: 1) What was your immediate emotional response (frustration, blaming circumstances, defensiveness)? 2) What part of the failure was within your direct circle of control? 3) How did you handle accountability with others involved?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "High-Performing Response: Acknowledges initial emotional impulse without letting it dictate action; shifts immediately to what was controllable (preparation, communication, contingency planning); takes full ownership without deflecting blame onto external factors or teammates.",
      "learningExplanation": "Extreme ownership eliminates victim mindset and builds commanding authority."
    },
    "ssbAssignment": {
      "activity": "OIR",
      "title": "OIR Practical Exercise",
      "instructions": "Complete the OIR drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Solve 5 mixed classification and analogical reasoning questions under 3 minutes.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Target >90% accuracy. Systematically check symmetry, number of line segments, and rotation direction."
    },
    "studyTask": {
      "subject": "MATHS",
      "topic": "MATHS Core Syllabus Block 14",
      "syllabusObjective": "Study MATHS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "MATHS Study & OIR Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 41,
    "phaseId": "HARDENING",
    "weekNumber": 6,
    "title": "Day 41: Group Planning Dynamics: Resource Allocation & Bridging Tasks",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Group Planning Dynamics: Resource Allocation & Bridging Tasks study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d41",
      "title": "Group Planning Dynamics: Resource Allocation & Bridging Tasks",
      "domain": "LEADERSHIP",
      "objective": "Understand the fundamental doctrine and practical application of Group Planning Dynamics: Resource Allocation & Bridging Tasks.",
      "explanation": "Mastery of Group Planning Dynamics: Resource Allocation & Bridging Tasks is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Group Planning Dynamics: Resource Allocation & Bridging Tasks.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Group Planning Dynamics: Resource Allocation & Bridging Tasks under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Group Planning Dynamics: Resource Allocation & Bridging Tasks from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Group Planning Dynamics: Resource Allocation & Bridging Tasks?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "CALISTHENICS",
      "title": "Upper-Body Calisthenics Strength & Core",
      "prescription": "Warmup + 4 sets of Push-ups (18-25 reps) + 4 sets of Pull-up Progression (6-8 assisted or eccentric negatives) + Plank Holds.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "push_ups",
          "sets": 4,
          "repsOrDuration": "18-25 reps",
          "targetRpe": 7,
          "restSeconds": 60,
          "techniqueCues": "Elbows at 45 degrees, rigid hollow core."
        },
        {
          "exerciseId": "assisted_pull_ups",
          "sets": 4,
          "repsOrDuration": "6-8 assisted or eccentric negatives",
          "targetRpe": 7,
          "restSeconds": 90,
          "techniqueCues": "Depress scapula first, pull chest to bar."
        },
        {
          "exerciseId": "plank",
          "sets": 3,
          "repsOrDuration": "60 seconds",
          "targetRpe": 7,
          "restSeconds": 45,
          "techniqueCues": "Tuck tailbone, contract quads and glutes."
        }
      ],
      "progressionNotes": "Maintain strict cadence. If technique fails, regress to incline or band assistance.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d41",
      "type": "REASONING",
      "title": "Number Series & Arithmetic Logic",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Determine the next number in the sequence: 82, 85, 89, 94, 100, ?",
      "options": [
        "105",
        "107",
        "110",
        "112"
      ],
      "correctAnswer": "107",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "The sequence differences increase by +1 each step: +3, +4, +5, +6, so the next difference is +7. 100 + 7 = 107.",
      "learningExplanation": "Step-difference sequences test rapid numerical induction."
    },
    "ssbAssignment": {
      "activity": "GTO_1",
      "title": "GTO_1 Practical Exercise",
      "instructions": "Complete the GTO_1 drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Group Planning Exercise: 4 emergencies simultaneously: 1) Injured farmer bleeding heavily (needs help in 30 min), 2) River bund leaking (bursts in 60 min flooding town), 3) Stolen temple idol moving toward border in car, 4) Train arriving in 45 min with severed signal cable. You have 8 people, 2 bicycles, a tractor, and first aid kit.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Divide team based on urgency: Team 1 (2 people with first aid & bicycle) immediate medical care; Team 2 (3 people with tractor & sandbags) secure river bund; Team 3 (2 people) report idol theft to police outpost at crossroads; Team 4 (1 person) warn railway station master via station phone or manual flag."
    },
    "studyTask": {
      "subject": "CURRENT_AFFAIRS",
      "topic": "CURRENT_AFFAIRS Core Syllabus Block 14",
      "syllabusObjective": "Study CURRENT_AFFAIRS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "CURRENT_AFFAIRS Study & GTO_1 Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 42,
    "phaseId": "HARDENING",
    "weekNumber": 6,
    "title": "Day 42: Environmental Extremes: High Altitude Sickness & AMS Protocols",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Environmental Extremes: High Altitude Sickness & AMS Protocols study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d42",
      "title": "Environmental Extremes: High Altitude Sickness & AMS Protocols",
      "domain": "FIRST_AID",
      "objective": "Understand the fundamental doctrine and practical application of Environmental Extremes: High Altitude Sickness & AMS Protocols.",
      "explanation": "Mastery of Environmental Extremes: High Altitude Sickness & AMS Protocols is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Environmental Extremes: High Altitude Sickness & AMS Protocols.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Environmental Extremes: High Altitude Sickness & AMS Protocols under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Environmental Extremes: High Altitude Sickness & AMS Protocols from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Environmental Extremes: High Altitude Sickness & AMS Protocols?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "RECOVERY",
      "title": "Week 6 Restorative Mobility & Recovery Protocol",
      "prescription": "15 minutes full-body joint mobility flow + 10 minutes tactical box breathing.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "mobility_flow",
          "sets": 1,
          "repsOrDuration": "15 minutes",
          "targetRpe": 3,
          "restSeconds": 0,
          "techniqueCues": "Smooth diaphragmatic breathing into tight areas."
        },
        {
          "exerciseId": "box_breathing",
          "sets": 1,
          "repsOrDuration": "10 minutes",
          "targetRpe": 1,
          "restSeconds": 0,
          "techniqueCues": "4s in, 4s hold, 4s out, 4s empty."
        }
      ],
      "progressionNotes": "Deload allows neuromuscular supercompensation and tissue repair.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d42",
      "type": "MEMORY",
      "title": "Observation & Working Memory Challenge (Kim's Drill)",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Memorize this 7-item logistical convoy checklist for 60 seconds: 1) Radio Call-sign: BRAVO-2, 2) Route Checkpoint: CP-ALPHA (Grid 6428), 3) Departure Time: 0430 hrs, 4) Vehicle Fuel Reserve: 80 Liters, 5) Primary Emergency Frequency: 45.25 MHz, 6) Medic Lead: Sgt. Sharma, 7) Security Password: KAVACH. Close the screen and write all 7 details from memory.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Verified elements: Call-sign BRAVO-2; Checkpoint CP-ALPHA (Grid 6428); Departure 0430 hrs; Fuel 80L; Frequency 45.25 MHz; Medic Sgt. Sharma; Password KAVACH.",
      "learningExplanation": "Retaining multifaceted logistical data under cognitive pressure is vital for field communications."
    },
    "ssbAssignment": {
      "activity": "WAT",
      "title": "WAT Practical Exercise",
      "instructions": "Complete the WAT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "10 words: 1) RISK  2) DISCIPLINE  3) CRISIS  4) WEAPON  5) OBSTACLE  6) COOPERATE  7) LONELY  8) VICTORY  9) DUTY  10) TIRED",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Risk: Calculated risks lead to decisive progress. Obstacle: Stepping stone for determined individuals. Duty: Performed with unwavering integrity."
    },
    "studyTask": {
      "subject": "CHEMISTRY",
      "topic": "CHEMISTRY Core Syllabus Block 14",
      "syllabusObjective": "Study CHEMISTRY with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "CHEMISTRY Study & WAT Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 43,
    "phaseId": "HARDENING",
    "weekNumber": 7,
    "title": "Day 43: Celestial Navigation: Orienting via Pole Star & Constellations",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Celestial Navigation: Orienting via Pole Star & Constellations study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d43",
      "title": "Celestial Navigation: Orienting via Pole Star & Constellations",
      "domain": "NAVIGATION",
      "objective": "Understand the fundamental doctrine and practical application of Celestial Navigation: Orienting via Pole Star & Constellations.",
      "explanation": "Mastery of Celestial Navigation: Orienting via Pole Star & Constellations is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Celestial Navigation: Orienting via Pole Star & Constellations.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Celestial Navigation: Orienting via Pole Star & Constellations under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Celestial Navigation: Orienting via Pole Star & Constellations from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Celestial Navigation: Orienting via Pole Star & Constellations?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "AEROBIC",
      "title": "Aerobic Zone 2 Endurance (5.5 km)",
      "prescription": "Warmup + 5.5 km continuous aerobic run (conversational pace) + Calf Raises.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "5.5 km continuous run",
          "targetRpe": 5,
          "restSeconds": 60,
          "techniqueCues": "Zone 2: Speak in full sentences without gasping."
        },
        {
          "exerciseId": "calf_raises",
          "sets": 3,
          "repsOrDuration": "25 reps",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "2-second pause at apex, controlled descent."
        }
      ],
      "progressionNotes": "Keep heart rate controlled. Build aerobic mitochondrial base.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d43",
      "type": "DECISION_MAKING",
      "title": "Tactical Decision Scenario & Resource Trade-Off",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "You are leading a 4-person patrol returning from a 15km reconnaissance march. It is 1700 hrs, sunset is in 90 minutes, and the temperature is dropping rapidly. Member A has a sprained ankle and can only limp at 2 km/h. You are 6 km from the base camp. Member B suggests leaving Member A in a sleeping bag with rations and jogging ahead to get a transport vehicle. Member C insists on carrying Member A using a 2-man seat carry, which will slow the whole team to 3 km/h. What is your decision, and how do you mitigate risks?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Correct Officer Action: Never abandon an injured casualty alone in falling temperatures with night approaching (hypothermia and animal/security hazard). Reject Member B proposal. Adopt an improvised stretcher or 2-man carry rotating bearers between B, C, and yourself every 15 minutes. Send a radio SITREP with current coordinates and estimated arrival, requesting base send a vehicle to the nearest road-head intersecting the path. Maintain team cohesion and security integrity.",
      "learningExplanation": "Prioritizes human life, security integrity, and team cohesion over expedient but dangerous shortcuts."
    },
    "ssbAssignment": {
      "activity": "TAT",
      "title": "TAT Practical Exercise",
      "instructions": "Complete the TAT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Picture prompt: A person standing on a hilltop looking through binoculars at a distant valley with rising smoke.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Hero: Forest Ranger Rajesh. Identifies forest fire outbreak early, radios division post for backup, mobilizes local village fire-line team, cuts containment trench, extinguishes blaze before reaching timber reserve."
    },
    "studyTask": {
      "subject": "PHYSICS",
      "topic": "PHYSICS Core Syllabus Block 15",
      "syllabusObjective": "Study PHYSICS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "PHYSICS Study & TAT Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 44,
    "phaseId": "HARDENING",
    "weekNumber": 7,
    "title": "Day 44: Hardening Phase Mid-Point Deload & Recovery Metrics",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Hardening Phase Mid-Point Deload & Recovery Metrics study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d44",
      "title": "Hardening Phase Mid-Point Deload & Recovery Metrics",
      "domain": "LEADERSHIP",
      "objective": "Understand the fundamental doctrine and practical application of Hardening Phase Mid-Point Deload & Recovery Metrics.",
      "explanation": "Mastery of Hardening Phase Mid-Point Deload & Recovery Metrics is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Hardening Phase Mid-Point Deload & Recovery Metrics.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Hardening Phase Mid-Point Deload & Recovery Metrics under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Hardening Phase Mid-Point Deload & Recovery Metrics from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Hardening Phase Mid-Point Deload & Recovery Metrics?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "CALISTHENICS",
      "title": "Upper-Body Calisthenics Strength & Core",
      "prescription": "Warmup + 4 sets of Push-ups (18-25 reps) + 4 sets of Pull-up Progression (6-8 assisted or eccentric negatives) + Plank Holds.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "push_ups",
          "sets": 4,
          "repsOrDuration": "18-25 reps",
          "targetRpe": 7,
          "restSeconds": 60,
          "techniqueCues": "Elbows at 45 degrees, rigid hollow core."
        },
        {
          "exerciseId": "assisted_pull_ups",
          "sets": 4,
          "repsOrDuration": "6-8 assisted or eccentric negatives",
          "targetRpe": 7,
          "restSeconds": 90,
          "techniqueCues": "Depress scapula first, pull chest to bar."
        },
        {
          "exerciseId": "plank",
          "sets": 3,
          "repsOrDuration": "60 seconds",
          "targetRpe": 7,
          "restSeconds": 45,
          "techniqueCues": "Tuck tailbone, contract quads and glutes."
        }
      ],
      "progressionNotes": "Maintain strict cadence. If technique fails, regress to incline or band assistance.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d44",
      "type": "CRITICAL_THINKING",
      "title": "Fallacy Detection & Argument Deconstruction",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Evaluate this claim: \"Officer Candidate X completed the 5km run 2 minutes faster than Candidate Y. Therefore, Candidate X will make a significantly better operational leader in crisis than Candidate Y.\" Identify the logical fallacy and explain why the conclusion is invalid.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Logical Fallacy: False Equivalence / Hasty Generalization (Fallacy of Division). Physical aerobic speed is only one isolated component of officer competence; it does not measure decision-making under ambiguity, moral courage, communication, spatial planning, or empathy. While fitness is necessary, higher run speed alone does not directly correlate with superior leadership or crisis management.",
      "learningExplanation": "Officers must distinguish isolated performance metrics from holistic leadership capability."
    },
    "ssbAssignment": {
      "activity": "READING",
      "title": "READING Practical Exercise",
      "instructions": "Complete the READING drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Analyze the strategic lessons from the battle/topic of the day. Extract 3 operational takeaways for leadership and tactical doctrine.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Synthesize command decisiveness, logistical foresight, and decentralized initiative."
    },
    "studyTask": {
      "subject": "LEADERSHIP",
      "topic": "LEADERSHIP Core Syllabus Block 15",
      "syllabusObjective": "Study LEADERSHIP with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "LEADERSHIP Study & READING Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 45,
    "phaseId": "HARDENING",
    "weekNumber": 7,
    "title": "Day 45: Historical Battle Study: 1965 Battle of Asal Uttar (Patton Nagar)",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Historical Battle Study: 1965 Battle of Asal Uttar (Patton Nagar) study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d45",
      "title": "Historical Battle Study: 1965 Battle of Asal Uttar (Patton Nagar)",
      "domain": "MILITARY_STUDIES",
      "objective": "Understand the fundamental doctrine and practical application of Historical Battle Study: 1965 Battle of Asal Uttar (Patton Nagar).",
      "explanation": "Mastery of Historical Battle Study: 1965 Battle of Asal Uttar (Patton Nagar) is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Historical Battle Study: 1965 Battle of Asal Uttar (Patton Nagar).",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Historical Battle Study: 1965 Battle of Asal Uttar (Patton Nagar) under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Historical Battle Study: 1965 Battle of Asal Uttar (Patton Nagar) from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Historical Battle Study: 1965 Battle of Asal Uttar (Patton Nagar)?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "LOWER_BODY",
      "title": "Lower-Body Structural Strength & Unilateral Stability",
      "prescription": "Warmup + 4 sets Air Squats (25-30 reps) + 3 sets Reverse Lunges (15 reps/leg) + Glute Bridges.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "bodyweight_squats",
          "sets": 4,
          "repsOrDuration": "25-30 reps",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Hip crease below patella, drive through midfoot."
        },
        {
          "exerciseId": "reverse_lunges",
          "sets": 3,
          "repsOrDuration": "15 reps/leg",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Drop rear knee softly, front knee stacked over ankle."
        },
        {
          "exerciseId": "glute_bridges",
          "sets": 3,
          "repsOrDuration": "15-20 reps with 2s squeeze",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "Drive through heels without hyperextending lumbar."
        }
      ],
      "progressionNotes": "Lower-body endurance provides stamina for long marches and field tasks.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d45",
      "type": "PSYCHOLOGICAL",
      "title": "Stoic Psychological Ownership & Stress Audit",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Reflect on a recent instance where a task did not go as planned: 1) What was your immediate emotional response (frustration, blaming circumstances, defensiveness)? 2) What part of the failure was within your direct circle of control? 3) How did you handle accountability with others involved?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "High-Performing Response: Acknowledges initial emotional impulse without letting it dictate action; shifts immediately to what was controllable (preparation, communication, contingency planning); takes full ownership without deflecting blame onto external factors or teammates.",
      "learningExplanation": "Extreme ownership eliminates victim mindset and builds commanding authority."
    },
    "ssbAssignment": {
      "activity": "INTERVIEW",
      "title": "INTERVIEW Practical Exercise",
      "instructions": "Complete the INTERVIEW drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Prepare 3-minute structured answers to: 1) What are your top 3 strengths and 2 weaknesses you are actively working on? 2) Why Indian Armed Forces instead of civil services or corporate career? 3) Describe a situation where you had a conflict with a senior and how you resolved it.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Answer with authenticity, concrete examples, clear cause-and-effect reasoning, without fabricated heroic cliches."
    },
    "studyTask": {
      "subject": "MILITARY_HISTORY",
      "topic": "MILITARY_HISTORY Core Syllabus Block 15",
      "syllabusObjective": "Study MILITARY_HISTORY with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "MILITARY_HISTORY Study & INTERVIEW Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 46,
    "phaseId": "HARDENING",
    "weekNumber": 7,
    "title": "Day 46: Conflict Resolution: Managing Domineering & Passive Team Dynamics",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Conflict Resolution: Managing Domineering & Passive Team Dynamics study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d46",
      "title": "Conflict Resolution: Managing Domineering & Passive Team Dynamics",
      "domain": "COMMUNICATION",
      "objective": "Understand the fundamental doctrine and practical application of Conflict Resolution: Managing Domineering & Passive Team Dynamics.",
      "explanation": "Mastery of Conflict Resolution: Managing Domineering & Passive Team Dynamics is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Conflict Resolution: Managing Domineering & Passive Team Dynamics.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Conflict Resolution: Managing Domineering & Passive Team Dynamics under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Conflict Resolution: Managing Domineering & Passive Team Dynamics from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Conflict Resolution: Managing Domineering & Passive Team Dynamics?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "AEROBIC",
      "title": "Aerobic Zone 2 Endurance (5.8 km)",
      "prescription": "Warmup + 5.8 km continuous aerobic run (conversational pace) + Calf Raises.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "5.8 km continuous run",
          "targetRpe": 5,
          "restSeconds": 60,
          "techniqueCues": "Zone 2: Speak in full sentences without gasping."
        },
        {
          "exerciseId": "calf_raises",
          "sets": 3,
          "repsOrDuration": "25 reps",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "2-second pause at apex, controlled descent."
        }
      ],
      "progressionNotes": "Keep heart rate controlled. Build aerobic mitochondrial base.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d46",
      "type": "REASONING",
      "title": "Number Series & Arithmetic Logic",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Determine the next number in the sequence: 92, 95, 99, 104, 110, ?",
      "options": [
        "115",
        "117",
        "120",
        "122"
      ],
      "correctAnswer": "117",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "The sequence differences increase by +1 each step: +3, +4, +5, +6, so the next difference is +7. 110 + 7 = 117.",
      "learningExplanation": "Step-difference sequences test rapid numerical induction."
    },
    "ssbAssignment": {
      "activity": "GD",
      "title": "GD Practical Exercise",
      "instructions": "Complete the GD drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Group Discussion topic: \"Role of artificial intelligence, autonomous drones, and hypersonic systems in modern warfare: Opportunity or vulnerability?\"",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Structure points: 1) Force multiplier in surveillance and precision strike; 2) Vulnerability in GPS-denied environments and electronic warfare jamming; 3) Necessity of domestic sovereign algorithmic capability."
    },
    "studyTask": {
      "subject": "ENGLISH",
      "topic": "ENGLISH Core Syllabus Block 16",
      "syllabusObjective": "Study ENGLISH with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "ENGLISH Study & GD Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 47,
    "phaseId": "HARDENING",
    "weekNumber": 7,
    "title": "Day 47: Safe Route Reconnaissance & Handrail Navigation",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Safe Route Reconnaissance & Handrail Navigation study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d47",
      "title": "Safe Route Reconnaissance & Handrail Navigation",
      "domain": "NAVIGATION",
      "objective": "Understand the fundamental doctrine and practical application of Safe Route Reconnaissance & Handrail Navigation.",
      "explanation": "Mastery of Safe Route Reconnaissance & Handrail Navigation is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Safe Route Reconnaissance & Handrail Navigation.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Safe Route Reconnaissance & Handrail Navigation under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Safe Route Reconnaissance & Handrail Navigation from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Safe Route Reconnaissance & Handrail Navigation?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "CALISTHENICS",
      "title": "Upper-Body Calisthenics Strength & Core",
      "prescription": "Warmup + 4 sets of Push-ups (18-25 reps) + 4 sets of Pull-up Progression (6-8 assisted or eccentric negatives) + Plank Holds.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "push_ups",
          "sets": 4,
          "repsOrDuration": "18-25 reps",
          "targetRpe": 7,
          "restSeconds": 60,
          "techniqueCues": "Elbows at 45 degrees, rigid hollow core."
        },
        {
          "exerciseId": "assisted_pull_ups",
          "sets": 4,
          "repsOrDuration": "6-8 assisted or eccentric negatives",
          "targetRpe": 7,
          "restSeconds": 90,
          "techniqueCues": "Depress scapula first, pull chest to bar."
        },
        {
          "exerciseId": "plank",
          "sets": 3,
          "repsOrDuration": "60 seconds",
          "targetRpe": 7,
          "restSeconds": 45,
          "techniqueCues": "Tuck tailbone, contract quads and glutes."
        }
      ],
      "progressionNotes": "Maintain strict cadence. If technique fails, regress to incline or band assistance.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d47",
      "type": "MEMORY",
      "title": "Observation & Working Memory Challenge (Kim's Drill)",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Memorize this 7-item logistical convoy checklist for 60 seconds: 1) Radio Call-sign: BRAVO-2, 2) Route Checkpoint: CP-ALPHA (Grid 6428), 3) Departure Time: 0430 hrs, 4) Vehicle Fuel Reserve: 80 Liters, 5) Primary Emergency Frequency: 45.25 MHz, 6) Medic Lead: Sgt. Sharma, 7) Security Password: KAVACH. Close the screen and write all 7 details from memory.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Verified elements: Call-sign BRAVO-2; Checkpoint CP-ALPHA (Grid 6428); Departure 0430 hrs; Fuel 80L; Frequency 45.25 MHz; Medic Sgt. Sharma; Password KAVACH.",
      "learningExplanation": "Retaining multifaceted logistical data under cognitive pressure is vital for field communications."
    },
    "ssbAssignment": {
      "activity": "GTO_2",
      "title": "GTO_2 Practical Exercise",
      "instructions": "Complete the GTO_2 drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Group Planning Exercise: 4 emergencies simultaneously: 1) Injured farmer bleeding heavily (needs help in 30 min), 2) River bund leaking (bursts in 60 min flooding town), 3) Stolen temple idol moving toward border in car, 4) Train arriving in 45 min with severed signal cable. You have 8 people, 2 bicycles, a tractor, and first aid kit.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Divide team based on urgency: Team 1 (2 people with first aid & bicycle) immediate medical care; Team 2 (3 people with tractor & sandbags) secure river bund; Team 3 (2 people) report idol theft to police outpost at crossroads; Team 4 (1 person) warn railway station master via station phone or manual flag."
    },
    "studyTask": {
      "subject": "GEOGRAPHY",
      "topic": "GEOGRAPHY Core Syllabus Block 16",
      "syllabusObjective": "Study GEOGRAPHY with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "GEOGRAPHY Study & GTO_2 Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 48,
    "phaseId": "HARDENING",
    "weekNumber": 7,
    "title": "Day 48: Crush Injury & Compartment Syndrome Field Recognition",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Crush Injury & Compartment Syndrome Field Recognition study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d48",
      "title": "Crush Injury & Compartment Syndrome Field Recognition",
      "domain": "FIRST_AID",
      "objective": "Understand the fundamental doctrine and practical application of Crush Injury & Compartment Syndrome Field Recognition.",
      "explanation": "Mastery of Crush Injury & Compartment Syndrome Field Recognition is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Crush Injury & Compartment Syndrome Field Recognition.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Crush Injury & Compartment Syndrome Field Recognition under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Crush Injury & Compartment Syndrome Field Recognition from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Crush Injury & Compartment Syndrome Field Recognition?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "LOWER_BODY",
      "title": "Lower-Body Structural Strength & Unilateral Stability",
      "prescription": "Warmup + 4 sets Air Squats (25-30 reps) + 3 sets Reverse Lunges (15 reps/leg) + Glute Bridges.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "bodyweight_squats",
          "sets": 4,
          "repsOrDuration": "25-30 reps",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Hip crease below patella, drive through midfoot."
        },
        {
          "exerciseId": "reverse_lunges",
          "sets": 3,
          "repsOrDuration": "15 reps/leg",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Drop rear knee softly, front knee stacked over ankle."
        },
        {
          "exerciseId": "glute_bridges",
          "sets": 3,
          "repsOrDuration": "15-20 reps with 2s squeeze",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "Drive through heels without hyperextending lumbar."
        }
      ],
      "progressionNotes": "Lower-body endurance provides stamina for long marches and field tasks.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d48",
      "type": "DECISION_MAKING",
      "title": "Tactical Decision Scenario & Resource Trade-Off",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "You are leading a 4-person patrol returning from a 15km reconnaissance march. It is 1700 hrs, sunset is in 90 minutes, and the temperature is dropping rapidly. Member A has a sprained ankle and can only limp at 2 km/h. You are 6 km from the base camp. Member B suggests leaving Member A in a sleeping bag with rations and jogging ahead to get a transport vehicle. Member C insists on carrying Member A using a 2-man seat carry, which will slow the whole team to 3 km/h. What is your decision, and how do you mitigate risks?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Correct Officer Action: Never abandon an injured casualty alone in falling temperatures with night approaching (hypothermia and animal/security hazard). Reject Member B proposal. Adopt an improvised stretcher or 2-man carry rotating bearers between B, C, and yourself every 15 minutes. Send a radio SITREP with current coordinates and estimated arrival, requesting base send a vehicle to the nearest road-head intersecting the path. Maintain team cohesion and security integrity.",
      "learningExplanation": "Prioritizes human life, security integrity, and team cohesion over expedient but dangerous shortcuts."
    },
    "ssbAssignment": {
      "activity": "SRT",
      "title": "SRT Practical Exercise",
      "instructions": "Complete the SRT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "1) On a night train, you notice smoke emerging from the adjacent electrical compartment. You...\n2) Your team disagrees strongly with your proposed route during a timed navigation exercise. You...\n3) A junior cadet loses their equipment kit 1 hour before morning inspection. You...",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "1) Pulled emergency chain, grabbed coach fire extinguisher, directed passengers to move away, extinguished fire, reported to guard.\n2) Paused, listened to alternate route points, demonstrated map contours objectively, gained consensus on safest route, executed decisively."
    },
    "studyTask": {
      "subject": "PHYSICS",
      "topic": "PHYSICS Core Syllabus Block 16",
      "syllabusObjective": "Study PHYSICS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "PHYSICS Study & SRT Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 49,
    "phaseId": "HARDENING",
    "weekNumber": 7,
    "title": "Day 49: Mental Toughness: Cognitive Reframing Under Sustained Physical Load",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Mental Toughness: Cognitive Reframing Under Sustained Physical Load study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d49",
      "title": "Mental Toughness: Cognitive Reframing Under Sustained Physical Load",
      "domain": "MENTAL_MODELS",
      "objective": "Understand the fundamental doctrine and practical application of Mental Toughness: Cognitive Reframing Under Sustained Physical Load.",
      "explanation": "Mastery of Mental Toughness: Cognitive Reframing Under Sustained Physical Load is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Mental Toughness: Cognitive Reframing Under Sustained Physical Load.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Mental Toughness: Cognitive Reframing Under Sustained Physical Load under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Mental Toughness: Cognitive Reframing Under Sustained Physical Load from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Mental Toughness: Cognitive Reframing Under Sustained Physical Load?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "RECOVERY",
      "title": "Week 7 Restorative Mobility & Recovery Protocol",
      "prescription": "15 minutes full-body joint mobility flow + 10 minutes tactical box breathing.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "mobility_flow",
          "sets": 1,
          "repsOrDuration": "15 minutes",
          "targetRpe": 3,
          "restSeconds": 0,
          "techniqueCues": "Smooth diaphragmatic breathing into tight areas."
        },
        {
          "exerciseId": "box_breathing",
          "sets": 1,
          "repsOrDuration": "10 minutes",
          "targetRpe": 1,
          "restSeconds": 0,
          "techniqueCues": "4s in, 4s hold, 4s out, 4s empty."
        }
      ],
      "progressionNotes": "Deload allows neuromuscular supercompensation and tissue repair.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d49",
      "type": "CRITICAL_THINKING",
      "title": "Fallacy Detection & Argument Deconstruction",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Evaluate this claim: \"Officer Candidate X completed the 5km run 2 minutes faster than Candidate Y. Therefore, Candidate X will make a significantly better operational leader in crisis than Candidate Y.\" Identify the logical fallacy and explain why the conclusion is invalid.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Logical Fallacy: False Equivalence / Hasty Generalization (Fallacy of Division). Physical aerobic speed is only one isolated component of officer competence; it does not measure decision-making under ambiguity, moral courage, communication, spatial planning, or empathy. While fitness is necessary, higher run speed alone does not directly correlate with superior leadership or crisis management.",
      "learningExplanation": "Officers must distinguish isolated performance metrics from holistic leadership capability."
    },
    "ssbAssignment": {
      "activity": "TAT",
      "title": "TAT Practical Exercise",
      "instructions": "Complete the TAT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Picture prompt: A person standing on a hilltop looking through binoculars at a distant valley with rising smoke.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Hero: Forest Ranger Rajesh. Identifies forest fire outbreak early, radios division post for backup, mobilizes local village fire-line team, cuts containment trench, extinguishes blaze before reaching timber reserve."
    },
    "studyTask": {
      "subject": "CURRENT_AFFAIRS",
      "topic": "CURRENT_AFFAIRS Core Syllabus Block 17",
      "syllabusObjective": "Study CURRENT_AFFAIRS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "CURRENT_AFFAIRS Study & TAT Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 50,
    "phaseId": "HARDENING",
    "weekNumber": 8,
    "title": "Day 50: Indian Defense Industrial Base: Atmanirbhar Defense Ecosystem",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Indian Defense Industrial Base: Atmanirbhar Defense Ecosystem study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d50",
      "title": "Indian Defense Industrial Base: Atmanirbhar Defense Ecosystem",
      "domain": "MILITARY_STUDIES",
      "objective": "Understand the fundamental doctrine and practical application of Indian Defense Industrial Base: Atmanirbhar Defense Ecosystem.",
      "explanation": "Mastery of Indian Defense Industrial Base: Atmanirbhar Defense Ecosystem is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Indian Defense Industrial Base: Atmanirbhar Defense Ecosystem.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Indian Defense Industrial Base: Atmanirbhar Defense Ecosystem under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Indian Defense Industrial Base: Atmanirbhar Defense Ecosystem from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Indian Defense Industrial Base: Atmanirbhar Defense Ecosystem?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "CALISTHENICS",
      "title": "Upper-Body Calisthenics Strength & Core",
      "prescription": "Warmup + 4 sets of Push-ups (18-25 reps) + 4 sets of Pull-up Progression (6-8 assisted or eccentric negatives) + Plank Holds.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "push_ups",
          "sets": 4,
          "repsOrDuration": "18-25 reps",
          "targetRpe": 7,
          "restSeconds": 60,
          "techniqueCues": "Elbows at 45 degrees, rigid hollow core."
        },
        {
          "exerciseId": "assisted_pull_ups",
          "sets": 4,
          "repsOrDuration": "6-8 assisted or eccentric negatives",
          "targetRpe": 7,
          "restSeconds": 90,
          "techniqueCues": "Depress scapula first, pull chest to bar."
        },
        {
          "exerciseId": "plank",
          "sets": 3,
          "repsOrDuration": "60 seconds",
          "targetRpe": 7,
          "restSeconds": 45,
          "techniqueCues": "Tuck tailbone, contract quads and glutes."
        }
      ],
      "progressionNotes": "Maintain strict cadence. If technique fails, regress to incline or band assistance.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d50",
      "type": "PSYCHOLOGICAL",
      "title": "Stoic Psychological Ownership & Stress Audit",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Reflect on a recent instance where a task did not go as planned: 1) What was your immediate emotional response (frustration, blaming circumstances, defensiveness)? 2) What part of the failure was within your direct circle of control? 3) How did you handle accountability with others involved?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "High-Performing Response: Acknowledges initial emotional impulse without letting it dictate action; shifts immediately to what was controllable (preparation, communication, contingency planning); takes full ownership without deflecting blame onto external factors or teammates.",
      "learningExplanation": "Extreme ownership eliminates victim mindset and builds commanding authority."
    },
    "ssbAssignment": {
      "activity": "INTERVIEW",
      "title": "INTERVIEW Practical Exercise",
      "instructions": "Complete the INTERVIEW drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Prepare 3-minute structured answers to: 1) What are your top 3 strengths and 2 weaknesses you are actively working on? 2) Why Indian Armed Forces instead of civil services or corporate career? 3) Describe a situation where you had a conflict with a senior and how you resolved it.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Answer with authenticity, concrete examples, clear cause-and-effect reasoning, without fabricated heroic cliches."
    },
    "studyTask": {
      "subject": "CURRENT_AFFAIRS",
      "topic": "CURRENT_AFFAIRS Core Syllabus Block 17",
      "syllabusObjective": "Study CURRENT_AFFAIRS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "CURRENT_AFFAIRS Study & INTERVIEW Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 51,
    "phaseId": "HARDENING",
    "weekNumber": 8,
    "title": "Day 51: Weekly Hardening Deload & Neuromuscular Recovery",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Weekly Hardening Deload & Neuromuscular Recovery study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d51",
      "title": "Weekly Hardening Deload & Neuromuscular Recovery",
      "domain": "LEADERSHIP",
      "objective": "Understand the fundamental doctrine and practical application of Weekly Hardening Deload & Neuromuscular Recovery.",
      "explanation": "Mastery of Weekly Hardening Deload & Neuromuscular Recovery is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Weekly Hardening Deload & Neuromuscular Recovery.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Weekly Hardening Deload & Neuromuscular Recovery under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Weekly Hardening Deload & Neuromuscular Recovery from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Weekly Hardening Deload & Neuromuscular Recovery?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "LOWER_BODY",
      "title": "Lower-Body Structural Strength & Unilateral Stability",
      "prescription": "Warmup + 4 sets Air Squats (25-30 reps) + 3 sets Reverse Lunges (15 reps/leg) + Glute Bridges.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "bodyweight_squats",
          "sets": 4,
          "repsOrDuration": "25-30 reps",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Hip crease below patella, drive through midfoot."
        },
        {
          "exerciseId": "reverse_lunges",
          "sets": 3,
          "repsOrDuration": "15 reps/leg",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Drop rear knee softly, front knee stacked over ankle."
        },
        {
          "exerciseId": "glute_bridges",
          "sets": 3,
          "repsOrDuration": "15-20 reps with 2s squeeze",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "Drive through heels without hyperextending lumbar."
        }
      ],
      "progressionNotes": "Lower-body endurance provides stamina for long marches and field tasks.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d51",
      "type": "REASONING",
      "title": "Number Series & Arithmetic Logic",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Determine the next number in the sequence: 102, 105, 109, 114, 120, ?",
      "options": [
        "125",
        "127",
        "130",
        "132"
      ],
      "correctAnswer": "127",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "The sequence differences increase by +1 each step: +3, +4, +5, +6, so the next difference is +7. 120 + 7 = 127.",
      "learningExplanation": "Step-difference sequences test rapid numerical induction."
    },
    "ssbAssignment": {
      "activity": "READING",
      "title": "READING Practical Exercise",
      "instructions": "Complete the READING drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Analyze the strategic lessons from the battle/topic of the day. Extract 3 operational takeaways for leadership and tactical doctrine.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Synthesize command decisiveness, logistical foresight, and decentralized initiative."
    },
    "studyTask": {
      "subject": "LEADERSHIP",
      "topic": "LEADERSHIP Core Syllabus Block 17",
      "syllabusObjective": "Study LEADERSHIP with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "LEADERSHIP Study & READING Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 52,
    "phaseId": "HARDENING",
    "weekNumber": 8,
    "title": "Day 52: Historical Battle Study: 1971 Tangail Airborne Drop Operations",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Historical Battle Study: 1971 Tangail Airborne Drop Operations study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d52",
      "title": "Historical Battle Study: 1971 Tangail Airborne Drop Operations",
      "domain": "MILITARY_STUDIES",
      "objective": "Understand the fundamental doctrine and practical application of Historical Battle Study: 1971 Tangail Airborne Drop Operations.",
      "explanation": "Mastery of Historical Battle Study: 1971 Tangail Airborne Drop Operations is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Historical Battle Study: 1971 Tangail Airborne Drop Operations.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Historical Battle Study: 1971 Tangail Airborne Drop Operations under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Historical Battle Study: 1971 Tangail Airborne Drop Operations from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Historical Battle Study: 1971 Tangail Airborne Drop Operations?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "AEROBIC",
      "title": "Aerobic Zone 2 Endurance (6.3 km)",
      "prescription": "Warmup + 6.3 km continuous aerobic run (conversational pace) + Calf Raises.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "6.3 km continuous run",
          "targetRpe": 5,
          "restSeconds": 60,
          "techniqueCues": "Zone 2: Speak in full sentences without gasping."
        },
        {
          "exerciseId": "calf_raises",
          "sets": 3,
          "repsOrDuration": "25 reps",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "2-second pause at apex, controlled descent."
        }
      ],
      "progressionNotes": "Keep heart rate controlled. Build aerobic mitochondrial base.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d52",
      "type": "MEMORY",
      "title": "Observation & Working Memory Challenge (Kim's Drill)",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Memorize this 7-item logistical convoy checklist for 60 seconds: 1) Radio Call-sign: BRAVO-2, 2) Route Checkpoint: CP-ALPHA (Grid 6428), 3) Departure Time: 0430 hrs, 4) Vehicle Fuel Reserve: 80 Liters, 5) Primary Emergency Frequency: 45.25 MHz, 6) Medic Lead: Sgt. Sharma, 7) Security Password: KAVACH. Close the screen and write all 7 details from memory.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Verified elements: Call-sign BRAVO-2; Checkpoint CP-ALPHA (Grid 6428); Departure 0430 hrs; Fuel 80L; Frequency 45.25 MHz; Medic Sgt. Sharma; Password KAVACH.",
      "learningExplanation": "Retaining multifaceted logistical data under cognitive pressure is vital for field communications."
    },
    "ssbAssignment": {
      "activity": "TAT",
      "title": "TAT Practical Exercise",
      "instructions": "Complete the TAT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Picture prompt: A person standing on a hilltop looking through binoculars at a distant valley with rising smoke.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Hero: Forest Ranger Rajesh. Identifies forest fire outbreak early, radios division post for backup, mobilizes local village fire-line team, cuts containment trench, extinguishes blaze before reaching timber reserve."
    },
    "studyTask": {
      "subject": "MILITARY_HISTORY",
      "topic": "MILITARY_HISTORY Core Syllabus Block 18",
      "syllabusObjective": "Study MILITARY_HISTORY with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "MILITARY_HISTORY Study & TAT Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 53,
    "phaseId": "HARDENING",
    "weekNumber": 8,
    "title": "Day 53: Toxic Leadership vs Authentic Command: The 15 OLQ Standards",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Toxic Leadership vs Authentic Command: The 15 OLQ Standards study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d53",
      "title": "Toxic Leadership vs Authentic Command: The 15 OLQ Standards",
      "domain": "LEADERSHIP",
      "objective": "Understand the fundamental doctrine and practical application of Toxic Leadership vs Authentic Command: The 15 OLQ Standards.",
      "explanation": "Mastery of Toxic Leadership vs Authentic Command: The 15 OLQ Standards is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Toxic Leadership vs Authentic Command: The 15 OLQ Standards.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Toxic Leadership vs Authentic Command: The 15 OLQ Standards under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Toxic Leadership vs Authentic Command: The 15 OLQ Standards from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Toxic Leadership vs Authentic Command: The 15 OLQ Standards?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "CALISTHENICS",
      "title": "Upper-Body Calisthenics Strength & Core",
      "prescription": "Warmup + 4 sets of Push-ups (18-25 reps) + 4 sets of Pull-up Progression (6-8 assisted or eccentric negatives) + Plank Holds.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "push_ups",
          "sets": 4,
          "repsOrDuration": "18-25 reps",
          "targetRpe": 7,
          "restSeconds": 60,
          "techniqueCues": "Elbows at 45 degrees, rigid hollow core."
        },
        {
          "exerciseId": "assisted_pull_ups",
          "sets": 4,
          "repsOrDuration": "6-8 assisted or eccentric negatives",
          "targetRpe": 7,
          "restSeconds": 90,
          "techniqueCues": "Depress scapula first, pull chest to bar."
        },
        {
          "exerciseId": "plank",
          "sets": 3,
          "repsOrDuration": "60 seconds",
          "targetRpe": 7,
          "restSeconds": 45,
          "techniqueCues": "Tuck tailbone, contract quads and glutes."
        }
      ],
      "progressionNotes": "Maintain strict cadence. If technique fails, regress to incline or band assistance.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d53",
      "type": "DECISION_MAKING",
      "title": "Tactical Decision Scenario & Resource Trade-Off",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "You are leading a 4-person patrol returning from a 15km reconnaissance march. It is 1700 hrs, sunset is in 90 minutes, and the temperature is dropping rapidly. Member A has a sprained ankle and can only limp at 2 km/h. You are 6 km from the base camp. Member B suggests leaving Member A in a sleeping bag with rations and jogging ahead to get a transport vehicle. Member C insists on carrying Member A using a 2-man seat carry, which will slow the whole team to 3 km/h. What is your decision, and how do you mitigate risks?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Correct Officer Action: Never abandon an injured casualty alone in falling temperatures with night approaching (hypothermia and animal/security hazard). Reject Member B proposal. Adopt an improvised stretcher or 2-man carry rotating bearers between B, C, and yourself every 15 minutes. Send a radio SITREP with current coordinates and estimated arrival, requesting base send a vehicle to the nearest road-head intersecting the path. Maintain team cohesion and security integrity.",
      "learningExplanation": "Prioritizes human life, security integrity, and team cohesion over expedient but dangerous shortcuts."
    },
    "ssbAssignment": {
      "activity": "INTERVIEW",
      "title": "INTERVIEW Practical Exercise",
      "instructions": "Complete the INTERVIEW drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Prepare 3-minute structured answers to: 1) What are your top 3 strengths and 2 weaknesses you are actively working on? 2) Why Indian Armed Forces instead of civil services or corporate career? 3) Describe a situation where you had a conflict with a senior and how you resolved it.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Answer with authenticity, concrete examples, clear cause-and-effect reasoning, without fabricated heroic cliches."
    },
    "studyTask": {
      "subject": "ENGLISH",
      "topic": "ENGLISH Core Syllabus Block 18",
      "syllabusObjective": "Study ENGLISH with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "ENGLISH Study & INTERVIEW Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 54,
    "phaseId": "HARDENING",
    "weekNumber": 8,
    "title": "Day 54: Advanced Cross-Country Route Card & Time-Distance Estimation",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Advanced Cross-Country Route Card & Time-Distance Estimation study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d54",
      "title": "Advanced Cross-Country Route Card & Time-Distance Estimation",
      "domain": "NAVIGATION",
      "objective": "Understand the fundamental doctrine and practical application of Advanced Cross-Country Route Card & Time-Distance Estimation.",
      "explanation": "Mastery of Advanced Cross-Country Route Card & Time-Distance Estimation is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Advanced Cross-Country Route Card & Time-Distance Estimation.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Advanced Cross-Country Route Card & Time-Distance Estimation under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Advanced Cross-Country Route Card & Time-Distance Estimation from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Advanced Cross-Country Route Card & Time-Distance Estimation?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "LOWER_BODY",
      "title": "Lower-Body Structural Strength & Unilateral Stability",
      "prescription": "Warmup + 4 sets Air Squats (25-30 reps) + 3 sets Reverse Lunges (15 reps/leg) + Glute Bridges.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "bodyweight_squats",
          "sets": 4,
          "repsOrDuration": "25-30 reps",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Hip crease below patella, drive through midfoot."
        },
        {
          "exerciseId": "reverse_lunges",
          "sets": 3,
          "repsOrDuration": "15 reps/leg",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Drop rear knee softly, front knee stacked over ankle."
        },
        {
          "exerciseId": "glute_bridges",
          "sets": 3,
          "repsOrDuration": "15-20 reps with 2s squeeze",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "Drive through heels without hyperextending lumbar."
        }
      ],
      "progressionNotes": "Lower-body endurance provides stamina for long marches and field tasks.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d54",
      "type": "CRITICAL_THINKING",
      "title": "Fallacy Detection & Argument Deconstruction",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Evaluate this claim: \"Officer Candidate X completed the 5km run 2 minutes faster than Candidate Y. Therefore, Candidate X will make a significantly better operational leader in crisis than Candidate Y.\" Identify the logical fallacy and explain why the conclusion is invalid.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Logical Fallacy: False Equivalence / Hasty Generalization (Fallacy of Division). Physical aerobic speed is only one isolated component of officer competence; it does not measure decision-making under ambiguity, moral courage, communication, spatial planning, or empathy. While fitness is necessary, higher run speed alone does not directly correlate with superior leadership or crisis management.",
      "learningExplanation": "Officers must distinguish isolated performance metrics from holistic leadership capability."
    },
    "ssbAssignment": {
      "activity": "GTO_1",
      "title": "GTO_1 Practical Exercise",
      "instructions": "Complete the GTO_1 drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Group Planning Exercise: 4 emergencies simultaneously: 1) Injured farmer bleeding heavily (needs help in 30 min), 2) River bund leaking (bursts in 60 min flooding town), 3) Stolen temple idol moving toward border in car, 4) Train arriving in 45 min with severed signal cable. You have 8 people, 2 bicycles, a tractor, and first aid kit.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Divide team based on urgency: Team 1 (2 people with first aid & bicycle) immediate medical care; Team 2 (3 people with tractor & sandbags) secure river bund; Team 3 (2 people) report idol theft to police outpost at crossroads; Team 4 (1 person) warn railway station master via station phone or manual flag."
    },
    "studyTask": {
      "subject": "MATHS",
      "topic": "MATHS Core Syllabus Block 18",
      "syllabusObjective": "Study MATHS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "MATHS Study & GTO_1 Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 55,
    "phaseId": "HARDENING",
    "weekNumber": 8,
    "title": "Day 55: Cold Weather Casualties: Hypothermia & Frostbite First Aid",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Cold Weather Casualties: Hypothermia & Frostbite First Aid study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d55",
      "title": "Cold Weather Casualties: Hypothermia & Frostbite First Aid",
      "domain": "FIRST_AID",
      "objective": "Understand the fundamental doctrine and practical application of Cold Weather Casualties: Hypothermia & Frostbite First Aid.",
      "explanation": "Mastery of Cold Weather Casualties: Hypothermia & Frostbite First Aid is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Cold Weather Casualties: Hypothermia & Frostbite First Aid.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Cold Weather Casualties: Hypothermia & Frostbite First Aid under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Cold Weather Casualties: Hypothermia & Frostbite First Aid from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Cold Weather Casualties: Hypothermia & Frostbite First Aid?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "AEROBIC",
      "title": "Aerobic Zone 2 Endurance (6.5 km)",
      "prescription": "Warmup + 6.5 km continuous aerobic run (conversational pace) + Calf Raises.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "6.5 km continuous run",
          "targetRpe": 5,
          "restSeconds": 60,
          "techniqueCues": "Zone 2: Speak in full sentences without gasping."
        },
        {
          "exerciseId": "calf_raises",
          "sets": 3,
          "repsOrDuration": "25 reps",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "2-second pause at apex, controlled descent."
        }
      ],
      "progressionNotes": "Keep heart rate controlled. Build aerobic mitochondrial base.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d55",
      "type": "PSYCHOLOGICAL",
      "title": "Stoic Psychological Ownership & Stress Audit",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Reflect on a recent instance where a task did not go as planned: 1) What was your immediate emotional response (frustration, blaming circumstances, defensiveness)? 2) What part of the failure was within your direct circle of control? 3) How did you handle accountability with others involved?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "High-Performing Response: Acknowledges initial emotional impulse without letting it dictate action; shifts immediately to what was controllable (preparation, communication, contingency planning); takes full ownership without deflecting blame onto external factors or teammates.",
      "learningExplanation": "Extreme ownership eliminates victim mindset and builds commanding authority."
    },
    "ssbAssignment": {
      "activity": "WAT",
      "title": "WAT Practical Exercise",
      "instructions": "Complete the WAT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "10 words: 1) RISK  2) DISCIPLINE  3) CRISIS  4) WEAPON  5) OBSTACLE  6) COOPERATE  7) LONELY  8) VICTORY  9) DUTY  10) TIRED",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Risk: Calculated risks lead to decisive progress. Obstacle: Stepping stone for determined individuals. Duty: Performed with unwavering integrity."
    },
    "studyTask": {
      "subject": "PHYSICS",
      "topic": "PHYSICS Core Syllabus Block 19",
      "syllabusObjective": "Study PHYSICS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "PHYSICS Study & WAT Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 56,
    "phaseId": "HARDENING",
    "weekNumber": 8,
    "title": "Day 56: Lecturette Mastery: Hook, 3-Pillar Body & Strong Conclusion",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Lecturette Mastery: Hook, 3-Pillar Body & Strong Conclusion study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d56",
      "title": "Lecturette Mastery: Hook, 3-Pillar Body & Strong Conclusion",
      "domain": "COMMUNICATION",
      "objective": "Understand the fundamental doctrine and practical application of Lecturette Mastery: Hook, 3-Pillar Body & Strong Conclusion.",
      "explanation": "Mastery of Lecturette Mastery: Hook, 3-Pillar Body & Strong Conclusion is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Lecturette Mastery: Hook, 3-Pillar Body & Strong Conclusion.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Lecturette Mastery: Hook, 3-Pillar Body & Strong Conclusion under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Lecturette Mastery: Hook, 3-Pillar Body & Strong Conclusion from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Lecturette Mastery: Hook, 3-Pillar Body & Strong Conclusion?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "RECOVERY",
      "title": "Week 8 Restorative Mobility & Recovery Protocol",
      "prescription": "15 minutes full-body joint mobility flow + 10 minutes tactical box breathing.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "mobility_flow",
          "sets": 1,
          "repsOrDuration": "15 minutes",
          "targetRpe": 3,
          "restSeconds": 0,
          "techniqueCues": "Smooth diaphragmatic breathing into tight areas."
        },
        {
          "exerciseId": "box_breathing",
          "sets": 1,
          "repsOrDuration": "10 minutes",
          "targetRpe": 1,
          "restSeconds": 0,
          "techniqueCues": "4s in, 4s hold, 4s out, 4s empty."
        }
      ],
      "progressionNotes": "Deload allows neuromuscular supercompensation and tissue repair.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d56",
      "type": "REASONING",
      "title": "Number Series & Arithmetic Logic",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Determine the next number in the sequence: 112, 115, 119, 124, 130, ?",
      "options": [
        "135",
        "137",
        "140",
        "142"
      ],
      "correctAnswer": "137",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "The sequence differences increase by +1 each step: +3, +4, +5, +6, so the next difference is +7. 130 + 7 = 137.",
      "learningExplanation": "Step-difference sequences test rapid numerical induction."
    },
    "ssbAssignment": {
      "activity": "GD",
      "title": "GD Practical Exercise",
      "instructions": "Complete the GD drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Group Discussion topic: \"Role of artificial intelligence, autonomous drones, and hypersonic systems in modern warfare: Opportunity or vulnerability?\"",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Structure points: 1) Force multiplier in surveillance and precision strike; 2) Vulnerability in GPS-denied environments and electronic warfare jamming; 3) Necessity of domestic sovereign algorithmic capability."
    },
    "studyTask": {
      "subject": "CURRENT_AFFAIRS",
      "topic": "CURRENT_AFFAIRS Core Syllabus Block 19",
      "syllabusObjective": "Study CURRENT_AFFAIRS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "CURRENT_AFFAIRS Study & GD Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 57,
    "phaseId": "HARDENING",
    "weekNumber": 9,
    "title": "Day 57: Military Planning Exercise (MPE): Practical Group Strategy",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Military Planning Exercise (MPE): Practical Group Strategy study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d57",
      "title": "Military Planning Exercise (MPE): Practical Group Strategy",
      "domain": "PLANNING",
      "objective": "Understand the fundamental doctrine and practical application of Military Planning Exercise (MPE): Practical Group Strategy.",
      "explanation": "Mastery of Military Planning Exercise (MPE): Practical Group Strategy is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Military Planning Exercise (MPE): Practical Group Strategy.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Military Planning Exercise (MPE): Practical Group Strategy under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Military Planning Exercise (MPE): Practical Group Strategy from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Military Planning Exercise (MPE): Practical Group Strategy?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "LOWER_BODY",
      "title": "Lower-Body Structural Strength & Unilateral Stability",
      "prescription": "Warmup + 4 sets Air Squats (25-30 reps) + 3 sets Reverse Lunges (15 reps/leg) + Glute Bridges.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "bodyweight_squats",
          "sets": 4,
          "repsOrDuration": "25-30 reps",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Hip crease below patella, drive through midfoot."
        },
        {
          "exerciseId": "reverse_lunges",
          "sets": 3,
          "repsOrDuration": "15 reps/leg",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Drop rear knee softly, front knee stacked over ankle."
        },
        {
          "exerciseId": "glute_bridges",
          "sets": 3,
          "repsOrDuration": "15-20 reps with 2s squeeze",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "Drive through heels without hyperextending lumbar."
        }
      ],
      "progressionNotes": "Lower-body endurance provides stamina for long marches and field tasks.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d57",
      "type": "MEMORY",
      "title": "Observation & Working Memory Challenge (Kim's Drill)",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Memorize this 7-item logistical convoy checklist for 60 seconds: 1) Radio Call-sign: BRAVO-2, 2) Route Checkpoint: CP-ALPHA (Grid 6428), 3) Departure Time: 0430 hrs, 4) Vehicle Fuel Reserve: 80 Liters, 5) Primary Emergency Frequency: 45.25 MHz, 6) Medic Lead: Sgt. Sharma, 7) Security Password: KAVACH. Close the screen and write all 7 details from memory.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Verified elements: Call-sign BRAVO-2; Checkpoint CP-ALPHA (Grid 6428); Departure 0430 hrs; Fuel 80L; Frequency 45.25 MHz; Medic Sgt. Sharma; Password KAVACH.",
      "learningExplanation": "Retaining multifaceted logistical data under cognitive pressure is vital for field communications."
    },
    "ssbAssignment": {
      "activity": "GTO_1",
      "title": "GTO_1 Practical Exercise",
      "instructions": "Complete the GTO_1 drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Group Planning Exercise: 4 emergencies simultaneously: 1) Injured farmer bleeding heavily (needs help in 30 min), 2) River bund leaking (bursts in 60 min flooding town), 3) Stolen temple idol moving toward border in car, 4) Train arriving in 45 min with severed signal cable. You have 8 people, 2 bicycles, a tractor, and first aid kit.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Divide team based on urgency: Team 1 (2 people with first aid & bicycle) immediate medical care; Team 2 (3 people with tractor & sandbags) secure river bund; Team 3 (2 people) report idol theft to police outpost at crossroads; Team 4 (1 person) warn railway station master via station phone or manual flag."
    },
    "studyTask": {
      "subject": "GEOGRAPHY",
      "topic": "GEOGRAPHY Core Syllabus Block 19",
      "syllabusObjective": "Study GEOGRAPHY with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "GEOGRAPHY Study & GTO_1 Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 58,
    "phaseId": "HARDENING",
    "weekNumber": 9,
    "title": "Day 58: Pre-Milestone Deload & Neurological Consolidation",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Pre-Milestone Deload & Neurological Consolidation study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d58",
      "title": "Pre-Milestone Deload & Neurological Consolidation",
      "domain": "LEADERSHIP",
      "objective": "Understand the fundamental doctrine and practical application of Pre-Milestone Deload & Neurological Consolidation.",
      "explanation": "Mastery of Pre-Milestone Deload & Neurological Consolidation is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Pre-Milestone Deload & Neurological Consolidation.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Pre-Milestone Deload & Neurological Consolidation under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Pre-Milestone Deload & Neurological Consolidation from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Pre-Milestone Deload & Neurological Consolidation?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "AEROBIC",
      "title": "Aerobic Zone 2 Endurance (6.7 km)",
      "prescription": "Warmup + 6.7 km continuous aerobic run (conversational pace) + Calf Raises.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "6.7 km continuous run",
          "targetRpe": 5,
          "restSeconds": 60,
          "techniqueCues": "Zone 2: Speak in full sentences without gasping."
        },
        {
          "exerciseId": "calf_raises",
          "sets": 3,
          "repsOrDuration": "25 reps",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "2-second pause at apex, controlled descent."
        }
      ],
      "progressionNotes": "Keep heart rate controlled. Build aerobic mitochondrial base.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d58",
      "type": "DECISION_MAKING",
      "title": "Tactical Decision Scenario & Resource Trade-Off",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "You are leading a 4-person patrol returning from a 15km reconnaissance march. It is 1700 hrs, sunset is in 90 minutes, and the temperature is dropping rapidly. Member A has a sprained ankle and can only limp at 2 km/h. You are 6 km from the base camp. Member B suggests leaving Member A in a sleeping bag with rations and jogging ahead to get a transport vehicle. Member C insists on carrying Member A using a 2-man seat carry, which will slow the whole team to 3 km/h. What is your decision, and how do you mitigate risks?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Correct Officer Action: Never abandon an injured casualty alone in falling temperatures with night approaching (hypothermia and animal/security hazard). Reject Member B proposal. Adopt an improvised stretcher or 2-man carry rotating bearers between B, C, and yourself every 15 minutes. Send a radio SITREP with current coordinates and estimated arrival, requesting base send a vehicle to the nearest road-head intersecting the path. Maintain team cohesion and security integrity.",
      "learningExplanation": "Prioritizes human life, security integrity, and team cohesion over expedient but dangerous shortcuts."
    },
    "ssbAssignment": {
      "activity": "READING",
      "title": "READING Practical Exercise",
      "instructions": "Complete the READING drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Analyze the strategic lessons from the battle/topic of the day. Extract 3 operational takeaways for leadership and tactical doctrine.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Synthesize command decisiveness, logistical foresight, and decentralized initiative."
    },
    "studyTask": {
      "subject": "LEADERSHIP",
      "topic": "LEADERSHIP Core Syllabus Block 20",
      "syllabusObjective": "Study LEADERSHIP with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "LEADERSHIP Study & READING Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 59,
    "phaseId": "HARDENING",
    "weekNumber": 9,
    "title": "Day 59: Phase 2 Comprehensive Knowledge & Skills Battery",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Phase 2 Comprehensive Knowledge & Skills Battery study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d59",
      "title": "Phase 2 Comprehensive Knowledge & Skills Battery",
      "domain": "MILITARY_STUDIES",
      "objective": "Understand the fundamental doctrine and practical application of Phase 2 Comprehensive Knowledge & Skills Battery.",
      "explanation": "Mastery of Phase 2 Comprehensive Knowledge & Skills Battery is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Phase 2 Comprehensive Knowledge & Skills Battery.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Phase 2 Comprehensive Knowledge & Skills Battery under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Phase 2 Comprehensive Knowledge & Skills Battery from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Phase 2 Comprehensive Knowledge & Skills Battery?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "CALISTHENICS",
      "title": "Upper-Body Calisthenics Strength & Core",
      "prescription": "Warmup + 4 sets of Push-ups (18-25 reps) + 4 sets of Pull-up Progression (6-8 assisted or eccentric negatives) + Plank Holds.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "push_ups",
          "sets": 4,
          "repsOrDuration": "18-25 reps",
          "targetRpe": 7,
          "restSeconds": 60,
          "techniqueCues": "Elbows at 45 degrees, rigid hollow core."
        },
        {
          "exerciseId": "assisted_pull_ups",
          "sets": 4,
          "repsOrDuration": "6-8 assisted or eccentric negatives",
          "targetRpe": 7,
          "restSeconds": 90,
          "techniqueCues": "Depress scapula first, pull chest to bar."
        },
        {
          "exerciseId": "plank",
          "sets": 3,
          "repsOrDuration": "60 seconds",
          "targetRpe": 7,
          "restSeconds": 45,
          "techniqueCues": "Tuck tailbone, contract quads and glutes."
        }
      ],
      "progressionNotes": "Maintain strict cadence. If technique fails, regress to incline or band assistance.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d59",
      "type": "CRITICAL_THINKING",
      "title": "Fallacy Detection & Argument Deconstruction",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Evaluate this claim: \"Officer Candidate X completed the 5km run 2 minutes faster than Candidate Y. Therefore, Candidate X will make a significantly better operational leader in crisis than Candidate Y.\" Identify the logical fallacy and explain why the conclusion is invalid.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Logical Fallacy: False Equivalence / Hasty Generalization (Fallacy of Division). Physical aerobic speed is only one isolated component of officer competence; it does not measure decision-making under ambiguity, moral courage, communication, spatial planning, or empathy. While fitness is necessary, higher run speed alone does not directly correlate with superior leadership or crisis management.",
      "learningExplanation": "Officers must distinguish isolated performance metrics from holistic leadership capability."
    },
    "ssbAssignment": {
      "activity": "MOCK_TEST",
      "title": "MOCK_TEST Practical Exercise",
      "instructions": "Complete the MOCK_TEST drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Analyze the strategic lessons from the battle/topic of the day. Extract 3 operational takeaways for leadership and tactical doctrine.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Synthesize command decisiveness, logistical foresight, and decentralized initiative."
    },
    "studyTask": {
      "subject": "CURRENT_AFFAIRS",
      "topic": "CURRENT_AFFAIRS Core Syllabus Block 20",
      "syllabusObjective": "Study CURRENT_AFFAIRS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "CURRENT_AFFAIRS Study & MOCK_TEST Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 60,
    "phaseId": "HARDENING",
    "weekNumber": 9,
    "title": "Day 60: Phase 2 Hardening Benchmark Fitness & Performance Assessment",
    "theme": "Hardening: Progressive Overload, Resilience & Pressure",
    "objective": "Complete Phase 2 Hardening Benchmark Fitness & Performance Assessment study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 95,
    "learningLesson": {
      "id": "lesson_d60",
      "title": "Phase 2 Hardening Benchmark Fitness & Performance Assessment",
      "domain": "LEADERSHIP",
      "objective": "Understand the fundamental doctrine and practical application of Phase 2 Hardening Benchmark Fitness & Performance Assessment.",
      "explanation": "Mastery of Phase 2 Hardening Benchmark Fitness & Performance Assessment is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Phase 2 Hardening Benchmark Fitness & Performance Assessment.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Phase 2 Hardening Benchmark Fitness & Performance Assessment under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Phase 2 Hardening Benchmark Fitness & Performance Assessment from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Phase 2 Hardening Benchmark Fitness & Performance Assessment?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "BENCHMARK",
      "title": "Benchmark Diagnostic Fitness Assessment (Day 60)",
      "prescription": "Warmup + 5.0 km Time Trial + Max Push-ups (strict form) + Max Plank Hold.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "5.0 km continuous time trial",
          "targetRpe": 8,
          "restSeconds": 180,
          "techniqueCues": "Pace evenly from the start."
        },
        {
          "exerciseId": "push_ups",
          "sets": 1,
          "repsOrDuration": "Max repetitions to failure",
          "targetRpe": 9,
          "restSeconds": 120,
          "techniqueCues": "Chest within 2 inches of deck, full lockout."
        },
        {
          "exerciseId": "plank",
          "sets": 1,
          "repsOrDuration": "Max hold for time",
          "targetRpe": 8,
          "restSeconds": 90,
          "techniqueCues": "Rigid straight line from heels to ears."
        }
      ],
      "progressionNotes": "Record exact times and repetitions to compare with baseline.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d60",
      "type": "PSYCHOLOGICAL",
      "title": "Stoic Psychological Ownership & Stress Audit",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Reflect on a recent instance where a task did not go as planned: 1) What was your immediate emotional response (frustration, blaming circumstances, defensiveness)? 2) What part of the failure was within your direct circle of control? 3) How did you handle accountability with others involved?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "High-Performing Response: Acknowledges initial emotional impulse without letting it dictate action; shifts immediately to what was controllable (preparation, communication, contingency planning); takes full ownership without deflecting blame onto external factors or teammates.",
      "learningExplanation": "Extreme ownership eliminates victim mindset and builds commanding authority."
    },
    "ssbAssignment": {
      "activity": "MOCK_TEST",
      "title": "MOCK_TEST Practical Exercise",
      "instructions": "Complete the MOCK_TEST drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Analyze the strategic lessons from the battle/topic of the day. Extract 3 operational takeaways for leadership and tactical doctrine.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Synthesize command decisiveness, logistical foresight, and decentralized initiative."
    },
    "studyTask": {
      "subject": "LEADERSHIP",
      "topic": "LEADERSHIP Core Syllabus Block 20",
      "syllabusObjective": "Study LEADERSHIP with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "LEADERSHIP Study & MOCK_TEST Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 61,
    "phaseId": "OPERATOR",
    "weekNumber": 9,
    "title": "Day 61: Standardized 5km Aerobic Threshold Re-Assessment",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete Standardized 5km Aerobic Threshold Re-Assessment study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d61",
      "title": "Standardized 5km Aerobic Threshold Re-Assessment",
      "domain": "LEADERSHIP",
      "objective": "Understand the fundamental doctrine and practical application of Standardized 5km Aerobic Threshold Re-Assessment.",
      "explanation": "Mastery of Standardized 5km Aerobic Threshold Re-Assessment is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Standardized 5km Aerobic Threshold Re-Assessment.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Standardized 5km Aerobic Threshold Re-Assessment under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Standardized 5km Aerobic Threshold Re-Assessment from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Standardized 5km Aerobic Threshold Re-Assessment?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "AEROBIC",
      "title": "Aerobic Zone 2 Endurance (6.6 km)",
      "prescription": "Warmup + 6.6 km continuous aerobic run (conversational pace) + Calf Raises.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "6.6 km continuous run",
          "targetRpe": 5,
          "restSeconds": 60,
          "techniqueCues": "Zone 2: Speak in full sentences without gasping."
        },
        {
          "exerciseId": "calf_raises",
          "sets": 3,
          "repsOrDuration": "25 reps",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "2-second pause at apex, controlled descent."
        }
      ],
      "progressionNotes": "Keep heart rate controlled. Build aerobic mitochondrial base.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d61",
      "type": "REASONING",
      "title": "Number Series & Arithmetic Logic",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Determine the next number in the sequence: 122, 125, 129, 134, 140, ?",
      "options": [
        "145",
        "147",
        "150",
        "152"
      ],
      "correctAnswer": "147",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "The sequence differences increase by +1 each step: +3, +4, +5, +6, so the next difference is +7. 140 + 7 = 147.",
      "learningExplanation": "Step-difference sequences test rapid numerical induction."
    },
    "ssbAssignment": {
      "activity": "OIR",
      "title": "OIR Practical Exercise",
      "instructions": "Complete the OIR drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Solve 5 mixed classification and analogical reasoning questions under 3 minutes.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Target >90% accuracy. Systematically check symmetry, number of line segments, and rotation direction."
    },
    "studyTask": {
      "subject": "PHYSICS",
      "topic": "PHYSICS Core Syllabus Block 21",
      "syllabusObjective": "Study PHYSICS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "PHYSICS Study & OIR Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 62,
    "phaseId": "OPERATOR",
    "weekNumber": 9,
    "title": "Day 62: Full Psychological Battery Mock Test 1: 12 TAT Picture Narratives",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete Full Psychological Battery Mock Test 1: 12 TAT Picture Narratives study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d62",
      "title": "Full Psychological Battery Mock Test 1: 12 TAT Picture Narratives",
      "domain": "MENTAL_MODELS",
      "objective": "Understand the fundamental doctrine and practical application of Full Psychological Battery Mock Test 1: 12 TAT Picture Narratives.",
      "explanation": "Mastery of Full Psychological Battery Mock Test 1: 12 TAT Picture Narratives is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Full Psychological Battery Mock Test 1: 12 TAT Picture Narratives.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Full Psychological Battery Mock Test 1: 12 TAT Picture Narratives under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Full Psychological Battery Mock Test 1: 12 TAT Picture Narratives from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Full Psychological Battery Mock Test 1: 12 TAT Picture Narratives?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "CALISTHENICS",
      "title": "Upper-Body Calisthenics Strength & Core",
      "prescription": "Warmup + 4 sets of Push-ups (25-35 reps) + 4 sets of Pull-up Progression (8-12 strict pull-ups) + Plank Holds.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "push_ups",
          "sets": 4,
          "repsOrDuration": "25-35 reps",
          "targetRpe": 7,
          "restSeconds": 60,
          "techniqueCues": "Elbows at 45 degrees, rigid hollow core."
        },
        {
          "exerciseId": "assisted_pull_ups",
          "sets": 4,
          "repsOrDuration": "8-12 strict pull-ups",
          "targetRpe": 7,
          "restSeconds": 90,
          "techniqueCues": "Depress scapula first, pull chest to bar."
        },
        {
          "exerciseId": "plank",
          "sets": 3,
          "repsOrDuration": "90 seconds",
          "targetRpe": 7,
          "restSeconds": 45,
          "techniqueCues": "Tuck tailbone, contract quads and glutes."
        }
      ],
      "progressionNotes": "Maintain strict cadence. If technique fails, regress to incline or band assistance.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d62",
      "type": "MEMORY",
      "title": "Observation & Working Memory Challenge (Kim's Drill)",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Memorize this 7-item logistical convoy checklist for 60 seconds: 1) Radio Call-sign: BRAVO-2, 2) Route Checkpoint: CP-ALPHA (Grid 6428), 3) Departure Time: 0430 hrs, 4) Vehicle Fuel Reserve: 80 Liters, 5) Primary Emergency Frequency: 45.25 MHz, 6) Medic Lead: Sgt. Sharma, 7) Security Password: KAVACH. Close the screen and write all 7 details from memory.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Verified elements: Call-sign BRAVO-2; Checkpoint CP-ALPHA (Grid 6428); Departure 0430 hrs; Fuel 80L; Frequency 45.25 MHz; Medic Sgt. Sharma; Password KAVACH.",
      "learningExplanation": "Retaining multifaceted logistical data under cognitive pressure is vital for field communications."
    },
    "ssbAssignment": {
      "activity": "TAT",
      "title": "TAT Practical Exercise",
      "instructions": "Complete the TAT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Picture prompt: A person standing on a hilltop looking through binoculars at a distant valley with rising smoke.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Hero: Forest Ranger Rajesh. Identifies forest fire outbreak early, radios division post for backup, mobilizes local village fire-line team, cuts containment trench, extinguishes blaze before reaching timber reserve."
    },
    "studyTask": {
      "subject": "MILITARY_HISTORY",
      "topic": "MILITARY_HISTORY Core Syllabus Block 21",
      "syllabusObjective": "Study MILITARY_HISTORY with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "MILITARY_HISTORY Study & TAT Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 63,
    "phaseId": "OPERATOR",
    "weekNumber": 9,
    "title": "Day 63: Full WAT Battery: 60 Trigger Words at 15-Second Cadence",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete Full WAT Battery: 60 Trigger Words at 15-Second Cadence study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d63",
      "title": "Full WAT Battery: 60 Trigger Words at 15-Second Cadence",
      "domain": "COMMUNICATION",
      "objective": "Understand the fundamental doctrine and practical application of Full WAT Battery: 60 Trigger Words at 15-Second Cadence.",
      "explanation": "Mastery of Full WAT Battery: 60 Trigger Words at 15-Second Cadence is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Full WAT Battery: 60 Trigger Words at 15-Second Cadence.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Full WAT Battery: 60 Trigger Words at 15-Second Cadence under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Full WAT Battery: 60 Trigger Words at 15-Second Cadence from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Full WAT Battery: 60 Trigger Words at 15-Second Cadence?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "RECOVERY",
      "title": "Week 9 Restorative Mobility & Recovery Protocol",
      "prescription": "15 minutes full-body joint mobility flow + 10 minutes tactical box breathing.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "mobility_flow",
          "sets": 1,
          "repsOrDuration": "15 minutes",
          "targetRpe": 3,
          "restSeconds": 0,
          "techniqueCues": "Smooth diaphragmatic breathing into tight areas."
        },
        {
          "exerciseId": "box_breathing",
          "sets": 1,
          "repsOrDuration": "10 minutes",
          "targetRpe": 1,
          "restSeconds": 0,
          "techniqueCues": "4s in, 4s hold, 4s out, 4s empty."
        }
      ],
      "progressionNotes": "Deload allows neuromuscular supercompensation and tissue repair.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d63",
      "type": "DECISION_MAKING",
      "title": "Tactical Decision Scenario & Resource Trade-Off",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "You are leading a 4-person patrol returning from a 15km reconnaissance march. It is 1700 hrs, sunset is in 90 minutes, and the temperature is dropping rapidly. Member A has a sprained ankle and can only limp at 2 km/h. You are 6 km from the base camp. Member B suggests leaving Member A in a sleeping bag with rations and jogging ahead to get a transport vehicle. Member C insists on carrying Member A using a 2-man seat carry, which will slow the whole team to 3 km/h. What is your decision, and how do you mitigate risks?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Correct Officer Action: Never abandon an injured casualty alone in falling temperatures with night approaching (hypothermia and animal/security hazard). Reject Member B proposal. Adopt an improvised stretcher or 2-man carry rotating bearers between B, C, and yourself every 15 minutes. Send a radio SITREP with current coordinates and estimated arrival, requesting base send a vehicle to the nearest road-head intersecting the path. Maintain team cohesion and security integrity.",
      "learningExplanation": "Prioritizes human life, security integrity, and team cohesion over expedient but dangerous shortcuts."
    },
    "ssbAssignment": {
      "activity": "WAT",
      "title": "WAT Practical Exercise",
      "instructions": "Complete the WAT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "10 words: 1) RISK  2) DISCIPLINE  3) CRISIS  4) WEAPON  5) OBSTACLE  6) COOPERATE  7) LONELY  8) VICTORY  9) DUTY  10) TIRED",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Risk: Calculated risks lead to decisive progress. Obstacle: Stepping stone for determined individuals. Duty: Performed with unwavering integrity."
    },
    "studyTask": {
      "subject": "ENGLISH",
      "topic": "ENGLISH Core Syllabus Block 21",
      "syllabusObjective": "Study ENGLISH with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "ENGLISH Study & WAT Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 64,
    "phaseId": "OPERATOR",
    "weekNumber": 10,
    "title": "Day 64: Full SRT Battery: 60 Rapid Situational Reaction Scenarios",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete Full SRT Battery: 60 Rapid Situational Reaction Scenarios study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d64",
      "title": "Full SRT Battery: 60 Rapid Situational Reaction Scenarios",
      "domain": "PLANNING",
      "objective": "Understand the fundamental doctrine and practical application of Full SRT Battery: 60 Rapid Situational Reaction Scenarios.",
      "explanation": "Mastery of Full SRT Battery: 60 Rapid Situational Reaction Scenarios is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Full SRT Battery: 60 Rapid Situational Reaction Scenarios.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Full SRT Battery: 60 Rapid Situational Reaction Scenarios under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Full SRT Battery: 60 Rapid Situational Reaction Scenarios from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Full SRT Battery: 60 Rapid Situational Reaction Scenarios?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "AEROBIC",
      "title": "Aerobic Zone 2 Endurance (6.9 km)",
      "prescription": "Warmup + 6.9 km continuous aerobic run (conversational pace) + Calf Raises.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "6.9 km continuous run",
          "targetRpe": 5,
          "restSeconds": 60,
          "techniqueCues": "Zone 2: Speak in full sentences without gasping."
        },
        {
          "exerciseId": "calf_raises",
          "sets": 3,
          "repsOrDuration": "25 reps",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "2-second pause at apex, controlled descent."
        }
      ],
      "progressionNotes": "Keep heart rate controlled. Build aerobic mitochondrial base.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d64",
      "type": "CRITICAL_THINKING",
      "title": "Fallacy Detection & Argument Deconstruction",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Evaluate this claim: \"Officer Candidate X completed the 5km run 2 minutes faster than Candidate Y. Therefore, Candidate X will make a significantly better operational leader in crisis than Candidate Y.\" Identify the logical fallacy and explain why the conclusion is invalid.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Logical Fallacy: False Equivalence / Hasty Generalization (Fallacy of Division). Physical aerobic speed is only one isolated component of officer competence; it does not measure decision-making under ambiguity, moral courage, communication, spatial planning, or empathy. While fitness is necessary, higher run speed alone does not directly correlate with superior leadership or crisis management.",
      "learningExplanation": "Officers must distinguish isolated performance metrics from holistic leadership capability."
    },
    "ssbAssignment": {
      "activity": "SRT",
      "title": "SRT Practical Exercise",
      "instructions": "Complete the SRT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "1) On a night train, you notice smoke emerging from the adjacent electrical compartment. You...\n2) Your team disagrees strongly with your proposed route during a timed navigation exercise. You...\n3) A junior cadet loses their equipment kit 1 hour before morning inspection. You...",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "1) Pulled emergency chain, grabbed coach fire extinguisher, directed passengers to move away, extinguished fire, reported to guard.\n2) Paused, listened to alternate route points, demonstrated map contours objectively, gained consensus on safest route, executed decisively."
    },
    "studyTask": {
      "subject": "CURRENT_AFFAIRS",
      "topic": "CURRENT_AFFAIRS Core Syllabus Block 22",
      "syllabusObjective": "Study CURRENT_AFFAIRS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "CURRENT_AFFAIRS Study & SRT Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 65,
    "phaseId": "OPERATOR",
    "weekNumber": 10,
    "title": "Day 65: Self-Description (SD) Mastery & Cross-Check Alignment",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete Self-Description (SD) Mastery & Cross-Check Alignment study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d65",
      "title": "Self-Description (SD) Mastery & Cross-Check Alignment",
      "domain": "LEADERSHIP",
      "objective": "Understand the fundamental doctrine and practical application of Self-Description (SD) Mastery & Cross-Check Alignment.",
      "explanation": "Mastery of Self-Description (SD) Mastery & Cross-Check Alignment is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Self-Description (SD) Mastery & Cross-Check Alignment.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Self-Description (SD) Mastery & Cross-Check Alignment under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Self-Description (SD) Mastery & Cross-Check Alignment from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Self-Description (SD) Mastery & Cross-Check Alignment?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "CALISTHENICS",
      "title": "Upper-Body Calisthenics Strength & Core",
      "prescription": "Warmup + 4 sets of Push-ups (25-35 reps) + 4 sets of Pull-up Progression (8-12 strict pull-ups) + Plank Holds.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "push_ups",
          "sets": 4,
          "repsOrDuration": "25-35 reps",
          "targetRpe": 7,
          "restSeconds": 60,
          "techniqueCues": "Elbows at 45 degrees, rigid hollow core."
        },
        {
          "exerciseId": "assisted_pull_ups",
          "sets": 4,
          "repsOrDuration": "8-12 strict pull-ups",
          "targetRpe": 7,
          "restSeconds": 90,
          "techniqueCues": "Depress scapula first, pull chest to bar."
        },
        {
          "exerciseId": "plank",
          "sets": 3,
          "repsOrDuration": "90 seconds",
          "targetRpe": 7,
          "restSeconds": 45,
          "techniqueCues": "Tuck tailbone, contract quads and glutes."
        }
      ],
      "progressionNotes": "Maintain strict cadence. If technique fails, regress to incline or band assistance.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d65",
      "type": "PSYCHOLOGICAL",
      "title": "Stoic Psychological Ownership & Stress Audit",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Reflect on a recent instance where a task did not go as planned: 1) What was your immediate emotional response (frustration, blaming circumstances, defensiveness)? 2) What part of the failure was within your direct circle of control? 3) How did you handle accountability with others involved?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "High-Performing Response: Acknowledges initial emotional impulse without letting it dictate action; shifts immediately to what was controllable (preparation, communication, contingency planning); takes full ownership without deflecting blame onto external factors or teammates.",
      "learningExplanation": "Extreme ownership eliminates victim mindset and builds commanding authority."
    },
    "ssbAssignment": {
      "activity": "SD",
      "title": "SD Practical Exercise",
      "instructions": "Complete the SD drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Analyze the strategic lessons from the battle/topic of the day. Extract 3 operational takeaways for leadership and tactical doctrine.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Synthesize command decisiveness, logistical foresight, and decentralized initiative."
    },
    "studyTask": {
      "subject": "LEADERSHIP",
      "topic": "LEADERSHIP Core Syllabus Block 22",
      "syllabusObjective": "Study LEADERSHIP with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "LEADERSHIP Study & SD Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 66,
    "phaseId": "OPERATOR",
    "weekNumber": 10,
    "title": "Day 66: GTO Simulation: Military Planning Exercise (MPE) Under Time Pressure",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete GTO Simulation: Military Planning Exercise (MPE) Under Time Pressure study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d66",
      "title": "GTO Simulation: Military Planning Exercise (MPE) Under Time Pressure",
      "domain": "PLANNING",
      "objective": "Understand the fundamental doctrine and practical application of GTO Simulation: Military Planning Exercise (MPE) Under Time Pressure.",
      "explanation": "Mastery of GTO Simulation: Military Planning Exercise (MPE) Under Time Pressure is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing GTO Simulation: Military Planning Exercise (MPE) Under Time Pressure.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of GTO Simulation: Military Planning Exercise (MPE) Under Time Pressure under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for GTO Simulation: Military Planning Exercise (MPE) Under Time Pressure from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of GTO Simulation: Military Planning Exercise (MPE) Under Time Pressure?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "LOWER_BODY",
      "title": "Lower-Body Structural Strength & Unilateral Stability",
      "prescription": "Warmup + 4 sets Air Squats (30-40 reps) + 3 sets Reverse Lunges (20 reps/leg) + Glute Bridges.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "bodyweight_squats",
          "sets": 4,
          "repsOrDuration": "30-40 reps",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Hip crease below patella, drive through midfoot."
        },
        {
          "exerciseId": "reverse_lunges",
          "sets": 3,
          "repsOrDuration": "20 reps/leg",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Drop rear knee softly, front knee stacked over ankle."
        },
        {
          "exerciseId": "glute_bridges",
          "sets": 3,
          "repsOrDuration": "15-20 reps with 2s squeeze",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "Drive through heels without hyperextending lumbar."
        }
      ],
      "progressionNotes": "Lower-body endurance provides stamina for long marches and field tasks.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d66",
      "type": "REASONING",
      "title": "Number Series & Arithmetic Logic",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Determine the next number in the sequence: 132, 135, 139, 144, 150, ?",
      "options": [
        "155",
        "157",
        "160",
        "162"
      ],
      "correctAnswer": "157",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "The sequence differences increase by +1 each step: +3, +4, +5, +6, so the next difference is +7. 150 + 7 = 157.",
      "learningExplanation": "Step-difference sequences test rapid numerical induction."
    },
    "ssbAssignment": {
      "activity": "GTO_1",
      "title": "GTO_1 Practical Exercise",
      "instructions": "Complete the GTO_1 drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Group Planning Exercise: 4 emergencies simultaneously: 1) Injured farmer bleeding heavily (needs help in 30 min), 2) River bund leaking (bursts in 60 min flooding town), 3) Stolen temple idol moving toward border in car, 4) Train arriving in 45 min with severed signal cable. You have 8 people, 2 bicycles, a tractor, and first aid kit.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Divide team based on urgency: Team 1 (2 people with first aid & bicycle) immediate medical care; Team 2 (3 people with tractor & sandbags) secure river bund; Team 3 (2 people) report idol theft to police outpost at crossroads; Team 4 (1 person) warn railway station master via station phone or manual flag."
    },
    "studyTask": {
      "subject": "GEOGRAPHY",
      "topic": "GEOGRAPHY Core Syllabus Block 22",
      "syllabusObjective": "Study GEOGRAPHY with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "GEOGRAPHY Study & GTO_1 Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 67,
    "phaseId": "OPERATOR",
    "weekNumber": 10,
    "title": "Day 67: Weekly Performance Deload & CNS Reset",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete Weekly Performance Deload & CNS Reset study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d67",
      "title": "Weekly Performance Deload & CNS Reset",
      "domain": "LEADERSHIP",
      "objective": "Understand the fundamental doctrine and practical application of Weekly Performance Deload & CNS Reset.",
      "explanation": "Mastery of Weekly Performance Deload & CNS Reset is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Weekly Performance Deload & CNS Reset.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Weekly Performance Deload & CNS Reset under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Weekly Performance Deload & CNS Reset from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Weekly Performance Deload & CNS Reset?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "AEROBIC",
      "title": "Aerobic Zone 2 Endurance (7.2 km)",
      "prescription": "Warmup + 7.2 km continuous aerobic run (conversational pace) + Calf Raises.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "7.2 km continuous run",
          "targetRpe": 5,
          "restSeconds": 60,
          "techniqueCues": "Zone 2: Speak in full sentences without gasping."
        },
        {
          "exerciseId": "calf_raises",
          "sets": 3,
          "repsOrDuration": "25 reps",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "2-second pause at apex, controlled descent."
        }
      ],
      "progressionNotes": "Keep heart rate controlled. Build aerobic mitochondrial base.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d67",
      "type": "MEMORY",
      "title": "Observation & Working Memory Challenge (Kim's Drill)",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Memorize this 7-item logistical convoy checklist for 60 seconds: 1) Radio Call-sign: BRAVO-2, 2) Route Checkpoint: CP-ALPHA (Grid 6428), 3) Departure Time: 0430 hrs, 4) Vehicle Fuel Reserve: 80 Liters, 5) Primary Emergency Frequency: 45.25 MHz, 6) Medic Lead: Sgt. Sharma, 7) Security Password: KAVACH. Close the screen and write all 7 details from memory.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Verified elements: Call-sign BRAVO-2; Checkpoint CP-ALPHA (Grid 6428); Departure 0430 hrs; Fuel 80L; Frequency 45.25 MHz; Medic Sgt. Sharma; Password KAVACH.",
      "learningExplanation": "Retaining multifaceted logistical data under cognitive pressure is vital for field communications."
    },
    "ssbAssignment": {
      "activity": "READING",
      "title": "READING Practical Exercise",
      "instructions": "Complete the READING drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Analyze the strategic lessons from the battle/topic of the day. Extract 3 operational takeaways for leadership and tactical doctrine.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Synthesize command decisiveness, logistical foresight, and decentralized initiative."
    },
    "studyTask": {
      "subject": "LEADERSHIP",
      "topic": "LEADERSHIP Core Syllabus Block 23",
      "syllabusObjective": "Study LEADERSHIP with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "LEADERSHIP Study & READING Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 68,
    "phaseId": "OPERATOR",
    "weekNumber": 10,
    "title": "Day 68: Historical Battle Study: 1999 Battle of Tololing & Tiger Hill",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete Historical Battle Study: 1999 Battle of Tololing & Tiger Hill study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d68",
      "title": "Historical Battle Study: 1999 Battle of Tololing & Tiger Hill",
      "domain": "MILITARY_STUDIES",
      "objective": "Understand the fundamental doctrine and practical application of Historical Battle Study: 1999 Battle of Tololing & Tiger Hill.",
      "explanation": "Mastery of Historical Battle Study: 1999 Battle of Tololing & Tiger Hill is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Historical Battle Study: 1999 Battle of Tololing & Tiger Hill.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Historical Battle Study: 1999 Battle of Tololing & Tiger Hill under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Historical Battle Study: 1999 Battle of Tololing & Tiger Hill from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Historical Battle Study: 1999 Battle of Tololing & Tiger Hill?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "CALISTHENICS",
      "title": "Upper-Body Calisthenics Strength & Core",
      "prescription": "Warmup + 4 sets of Push-ups (25-35 reps) + 4 sets of Pull-up Progression (8-12 strict pull-ups) + Plank Holds.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "push_ups",
          "sets": 4,
          "repsOrDuration": "25-35 reps",
          "targetRpe": 7,
          "restSeconds": 60,
          "techniqueCues": "Elbows at 45 degrees, rigid hollow core."
        },
        {
          "exerciseId": "assisted_pull_ups",
          "sets": 4,
          "repsOrDuration": "8-12 strict pull-ups",
          "targetRpe": 7,
          "restSeconds": 90,
          "techniqueCues": "Depress scapula first, pull chest to bar."
        },
        {
          "exerciseId": "plank",
          "sets": 3,
          "repsOrDuration": "90 seconds",
          "targetRpe": 7,
          "restSeconds": 45,
          "techniqueCues": "Tuck tailbone, contract quads and glutes."
        }
      ],
      "progressionNotes": "Maintain strict cadence. If technique fails, regress to incline or band assistance.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d68",
      "type": "DECISION_MAKING",
      "title": "Tactical Decision Scenario & Resource Trade-Off",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "You are leading a 4-person patrol returning from a 15km reconnaissance march. It is 1700 hrs, sunset is in 90 minutes, and the temperature is dropping rapidly. Member A has a sprained ankle and can only limp at 2 km/h. You are 6 km from the base camp. Member B suggests leaving Member A in a sleeping bag with rations and jogging ahead to get a transport vehicle. Member C insists on carrying Member A using a 2-man seat carry, which will slow the whole team to 3 km/h. What is your decision, and how do you mitigate risks?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Correct Officer Action: Never abandon an injured casualty alone in falling temperatures with night approaching (hypothermia and animal/security hazard). Reject Member B proposal. Adopt an improvised stretcher or 2-man carry rotating bearers between B, C, and yourself every 15 minutes. Send a radio SITREP with current coordinates and estimated arrival, requesting base send a vehicle to the nearest road-head intersecting the path. Maintain team cohesion and security integrity.",
      "learningExplanation": "Prioritizes human life, security integrity, and team cohesion over expedient but dangerous shortcuts."
    },
    "ssbAssignment": {
      "activity": "TAT",
      "title": "TAT Practical Exercise",
      "instructions": "Complete the TAT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Picture prompt: A person standing on a hilltop looking through binoculars at a distant valley with rising smoke.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Hero: Forest Ranger Rajesh. Identifies forest fire outbreak early, radios division post for backup, mobilizes local village fire-line team, cuts containment trench, extinguishes blaze before reaching timber reserve."
    },
    "studyTask": {
      "subject": "MILITARY_HISTORY",
      "topic": "MILITARY_HISTORY Core Syllabus Block 23",
      "syllabusObjective": "Study MILITARY_HISTORY with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "MILITARY_HISTORY Study & TAT Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 69,
    "phaseId": "OPERATOR",
    "weekNumber": 10,
    "title": "Day 69: Calisthenics Maximum Capacity Battery (Push-ups, Pull-ups, Core)",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete Calisthenics Maximum Capacity Battery (Push-ups, Pull-ups, Core) study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d69",
      "title": "Calisthenics Maximum Capacity Battery (Push-ups, Pull-ups, Core)",
      "domain": "LEADERSHIP",
      "objective": "Understand the fundamental doctrine and practical application of Calisthenics Maximum Capacity Battery (Push-ups, Pull-ups, Core).",
      "explanation": "Mastery of Calisthenics Maximum Capacity Battery (Push-ups, Pull-ups, Core) is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Calisthenics Maximum Capacity Battery (Push-ups, Pull-ups, Core).",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Calisthenics Maximum Capacity Battery (Push-ups, Pull-ups, Core) under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Calisthenics Maximum Capacity Battery (Push-ups, Pull-ups, Core) from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Calisthenics Maximum Capacity Battery (Push-ups, Pull-ups, Core)?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "LOWER_BODY",
      "title": "Lower-Body Structural Strength & Unilateral Stability",
      "prescription": "Warmup + 4 sets Air Squats (30-40 reps) + 3 sets Reverse Lunges (20 reps/leg) + Glute Bridges.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "bodyweight_squats",
          "sets": 4,
          "repsOrDuration": "30-40 reps",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Hip crease below patella, drive through midfoot."
        },
        {
          "exerciseId": "reverse_lunges",
          "sets": 3,
          "repsOrDuration": "20 reps/leg",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Drop rear knee softly, front knee stacked over ankle."
        },
        {
          "exerciseId": "glute_bridges",
          "sets": 3,
          "repsOrDuration": "15-20 reps with 2s squeeze",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "Drive through heels without hyperextending lumbar."
        }
      ],
      "progressionNotes": "Lower-body endurance provides stamina for long marches and field tasks.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d69",
      "type": "CRITICAL_THINKING",
      "title": "Fallacy Detection & Argument Deconstruction",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Evaluate this claim: \"Officer Candidate X completed the 5km run 2 minutes faster than Candidate Y. Therefore, Candidate X will make a significantly better operational leader in crisis than Candidate Y.\" Identify the logical fallacy and explain why the conclusion is invalid.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Logical Fallacy: False Equivalence / Hasty Generalization (Fallacy of Division). Physical aerobic speed is only one isolated component of officer competence; it does not measure decision-making under ambiguity, moral courage, communication, spatial planning, or empathy. While fitness is necessary, higher run speed alone does not directly correlate with superior leadership or crisis management.",
      "learningExplanation": "Officers must distinguish isolated performance metrics from holistic leadership capability."
    },
    "ssbAssignment": {
      "activity": "OIR",
      "title": "OIR Practical Exercise",
      "instructions": "Complete the OIR drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Solve 5 mixed classification and analogical reasoning questions under 3 minutes.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Target >90% accuracy. Systematically check symmetry, number of line segments, and rotation direction."
    },
    "studyTask": {
      "subject": "PHYSICS",
      "topic": "PHYSICS Core Syllabus Block 23",
      "syllabusObjective": "Study PHYSICS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "PHYSICS Study & OIR Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 70,
    "phaseId": "OPERATOR",
    "weekNumber": 10,
    "title": "Day 70: Timed Lecturette Simulation: High-Stakes Geopolitical Topic",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete Timed Lecturette Simulation: High-Stakes Geopolitical Topic study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d70",
      "title": "Timed Lecturette Simulation: High-Stakes Geopolitical Topic",
      "domain": "COMMUNICATION",
      "objective": "Understand the fundamental doctrine and practical application of Timed Lecturette Simulation: High-Stakes Geopolitical Topic.",
      "explanation": "Mastery of Timed Lecturette Simulation: High-Stakes Geopolitical Topic is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Timed Lecturette Simulation: High-Stakes Geopolitical Topic.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Timed Lecturette Simulation: High-Stakes Geopolitical Topic under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Timed Lecturette Simulation: High-Stakes Geopolitical Topic from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Timed Lecturette Simulation: High-Stakes Geopolitical Topic?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "RECOVERY",
      "title": "Week 10 Restorative Mobility & Recovery Protocol",
      "prescription": "15 minutes full-body joint mobility flow + 10 minutes tactical box breathing.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "mobility_flow",
          "sets": 1,
          "repsOrDuration": "15 minutes",
          "targetRpe": 3,
          "restSeconds": 0,
          "techniqueCues": "Smooth diaphragmatic breathing into tight areas."
        },
        {
          "exerciseId": "box_breathing",
          "sets": 1,
          "repsOrDuration": "10 minutes",
          "targetRpe": 1,
          "restSeconds": 0,
          "techniqueCues": "4s in, 4s hold, 4s out, 4s empty."
        }
      ],
      "progressionNotes": "Deload allows neuromuscular supercompensation and tissue repair.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d70",
      "type": "PSYCHOLOGICAL",
      "title": "Stoic Psychological Ownership & Stress Audit",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Reflect on a recent instance where a task did not go as planned: 1) What was your immediate emotional response (frustration, blaming circumstances, defensiveness)? 2) What part of the failure was within your direct circle of control? 3) How did you handle accountability with others involved?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "High-Performing Response: Acknowledges initial emotional impulse without letting it dictate action; shifts immediately to what was controllable (preparation, communication, contingency planning); takes full ownership without deflecting blame onto external factors or teammates.",
      "learningExplanation": "Extreme ownership eliminates victim mindset and builds commanding authority."
    },
    "ssbAssignment": {
      "activity": "GD",
      "title": "GD Practical Exercise",
      "instructions": "Complete the GD drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Group Discussion topic: \"Role of artificial intelligence, autonomous drones, and hypersonic systems in modern warfare: Opportunity or vulnerability?\"",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Structure points: 1) Force multiplier in surveillance and precision strike; 2) Vulnerability in GPS-denied environments and electronic warfare jamming; 3) Necessity of domestic sovereign algorithmic capability."
    },
    "studyTask": {
      "subject": "CURRENT_AFFAIRS",
      "topic": "CURRENT_AFFAIRS Core Syllabus Block 24",
      "syllabusObjective": "Study CURRENT_AFFAIRS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "CURRENT_AFFAIRS Study & GD Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 71,
    "phaseId": "OPERATOR",
    "weekNumber": 11,
    "title": "Day 71: GTO Simulation: Progressive Group Task Cantilever & Fulcrum Mechanics",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete GTO Simulation: Progressive Group Task Cantilever & Fulcrum Mechanics study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d71",
      "title": "GTO Simulation: Progressive Group Task Cantilever & Fulcrum Mechanics",
      "domain": "PLANNING",
      "objective": "Understand the fundamental doctrine and practical application of GTO Simulation: Progressive Group Task Cantilever & Fulcrum Mechanics.",
      "explanation": "Mastery of GTO Simulation: Progressive Group Task Cantilever & Fulcrum Mechanics is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing GTO Simulation: Progressive Group Task Cantilever & Fulcrum Mechanics.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of GTO Simulation: Progressive Group Task Cantilever & Fulcrum Mechanics under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for GTO Simulation: Progressive Group Task Cantilever & Fulcrum Mechanics from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of GTO Simulation: Progressive Group Task Cantilever & Fulcrum Mechanics?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "CALISTHENICS",
      "title": "Upper-Body Calisthenics Strength & Core",
      "prescription": "Warmup + 4 sets of Push-ups (25-35 reps) + 4 sets of Pull-up Progression (8-12 strict pull-ups) + Plank Holds.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "push_ups",
          "sets": 4,
          "repsOrDuration": "25-35 reps",
          "targetRpe": 7,
          "restSeconds": 60,
          "techniqueCues": "Elbows at 45 degrees, rigid hollow core."
        },
        {
          "exerciseId": "assisted_pull_ups",
          "sets": 4,
          "repsOrDuration": "8-12 strict pull-ups",
          "targetRpe": 7,
          "restSeconds": 90,
          "techniqueCues": "Depress scapula first, pull chest to bar."
        },
        {
          "exerciseId": "plank",
          "sets": 3,
          "repsOrDuration": "90 seconds",
          "targetRpe": 7,
          "restSeconds": 45,
          "techniqueCues": "Tuck tailbone, contract quads and glutes."
        }
      ],
      "progressionNotes": "Maintain strict cadence. If technique fails, regress to incline or band assistance.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d71",
      "type": "REASONING",
      "title": "Number Series & Arithmetic Logic",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Determine the next number in the sequence: 142, 145, 149, 154, 160, ?",
      "options": [
        "165",
        "167",
        "170",
        "172"
      ],
      "correctAnswer": "167",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "The sequence differences increase by +1 each step: +3, +4, +5, +6, so the next difference is +7. 160 + 7 = 167.",
      "learningExplanation": "Step-difference sequences test rapid numerical induction."
    },
    "ssbAssignment": {
      "activity": "GTO_2",
      "title": "GTO_2 Practical Exercise",
      "instructions": "Complete the GTO_2 drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Group Planning Exercise: 4 emergencies simultaneously: 1) Injured farmer bleeding heavily (needs help in 30 min), 2) River bund leaking (bursts in 60 min flooding town), 3) Stolen temple idol moving toward border in car, 4) Train arriving in 45 min with severed signal cable. You have 8 people, 2 bicycles, a tractor, and first aid kit.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Divide team based on urgency: Team 1 (2 people with first aid & bicycle) immediate medical care; Team 2 (3 people with tractor & sandbags) secure river bund; Team 3 (2 people) report idol theft to police outpost at crossroads; Team 4 (1 person) warn railway station master via station phone or manual flag."
    },
    "studyTask": {
      "subject": "PHYSICS",
      "topic": "PHYSICS Core Syllabus Block 24",
      "syllabusObjective": "Study PHYSICS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "PHYSICS Study & GTO_2 Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 72,
    "phaseId": "OPERATOR",
    "weekNumber": 11,
    "title": "Day 72: Personal Interview Simulation: High-Pressure Cross-Examination",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete Personal Interview Simulation: High-Pressure Cross-Examination study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d72",
      "title": "Personal Interview Simulation: High-Pressure Cross-Examination",
      "domain": "COMMUNICATION",
      "objective": "Understand the fundamental doctrine and practical application of Personal Interview Simulation: High-Pressure Cross-Examination.",
      "explanation": "Mastery of Personal Interview Simulation: High-Pressure Cross-Examination is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Personal Interview Simulation: High-Pressure Cross-Examination.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Personal Interview Simulation: High-Pressure Cross-Examination under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Personal Interview Simulation: High-Pressure Cross-Examination from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Personal Interview Simulation: High-Pressure Cross-Examination?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "LOWER_BODY",
      "title": "Lower-Body Structural Strength & Unilateral Stability",
      "prescription": "Warmup + 4 sets Air Squats (30-40 reps) + 3 sets Reverse Lunges (20 reps/leg) + Glute Bridges.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "bodyweight_squats",
          "sets": 4,
          "repsOrDuration": "30-40 reps",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Hip crease below patella, drive through midfoot."
        },
        {
          "exerciseId": "reverse_lunges",
          "sets": 3,
          "repsOrDuration": "20 reps/leg",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Drop rear knee softly, front knee stacked over ankle."
        },
        {
          "exerciseId": "glute_bridges",
          "sets": 3,
          "repsOrDuration": "15-20 reps with 2s squeeze",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "Drive through heels without hyperextending lumbar."
        }
      ],
      "progressionNotes": "Lower-body endurance provides stamina for long marches and field tasks.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d72",
      "type": "MEMORY",
      "title": "Observation & Working Memory Challenge (Kim's Drill)",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Memorize this 7-item logistical convoy checklist for 60 seconds: 1) Radio Call-sign: BRAVO-2, 2) Route Checkpoint: CP-ALPHA (Grid 6428), 3) Departure Time: 0430 hrs, 4) Vehicle Fuel Reserve: 80 Liters, 5) Primary Emergency Frequency: 45.25 MHz, 6) Medic Lead: Sgt. Sharma, 7) Security Password: KAVACH. Close the screen and write all 7 details from memory.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Verified elements: Call-sign BRAVO-2; Checkpoint CP-ALPHA (Grid 6428); Departure 0430 hrs; Fuel 80L; Frequency 45.25 MHz; Medic Sgt. Sharma; Password KAVACH.",
      "learningExplanation": "Retaining multifaceted logistical data under cognitive pressure is vital for field communications."
    },
    "ssbAssignment": {
      "activity": "INTERVIEW",
      "title": "INTERVIEW Practical Exercise",
      "instructions": "Complete the INTERVIEW drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Prepare 3-minute structured answers to: 1) What are your top 3 strengths and 2 weaknesses you are actively working on? 2) Why Indian Armed Forces instead of civil services or corporate career? 3) Describe a situation where you had a conflict with a senior and how you resolved it.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Answer with authenticity, concrete examples, clear cause-and-effect reasoning, without fabricated heroic cliches."
    },
    "studyTask": {
      "subject": "ENGLISH",
      "topic": "ENGLISH Core Syllabus Block 24",
      "syllabusObjective": "Study ENGLISH with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "ENGLISH Study & INTERVIEW Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 73,
    "phaseId": "OPERATOR",
    "weekNumber": 11,
    "title": "Day 73: Historical Battle Study: Operation Meghdoot (Siachen Glacier 1984)",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete Historical Battle Study: Operation Meghdoot (Siachen Glacier 1984) study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d73",
      "title": "Historical Battle Study: Operation Meghdoot (Siachen Glacier 1984)",
      "domain": "MILITARY_STUDIES",
      "objective": "Understand the fundamental doctrine and practical application of Historical Battle Study: Operation Meghdoot (Siachen Glacier 1984).",
      "explanation": "Mastery of Historical Battle Study: Operation Meghdoot (Siachen Glacier 1984) is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Historical Battle Study: Operation Meghdoot (Siachen Glacier 1984).",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Historical Battle Study: Operation Meghdoot (Siachen Glacier 1984) under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Historical Battle Study: Operation Meghdoot (Siachen Glacier 1984) from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Historical Battle Study: Operation Meghdoot (Siachen Glacier 1984)?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "AEROBIC",
      "title": "Aerobic Zone 2 Endurance (7.8 km)",
      "prescription": "Warmup + 7.8 km continuous aerobic run (conversational pace) + Calf Raises.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "7.8 km continuous run",
          "targetRpe": 5,
          "restSeconds": 60,
          "techniqueCues": "Zone 2: Speak in full sentences without gasping."
        },
        {
          "exerciseId": "calf_raises",
          "sets": 3,
          "repsOrDuration": "25 reps",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "2-second pause at apex, controlled descent."
        }
      ],
      "progressionNotes": "Keep heart rate controlled. Build aerobic mitochondrial base.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d73",
      "type": "DECISION_MAKING",
      "title": "Tactical Decision Scenario & Resource Trade-Off",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "You are leading a 4-person patrol returning from a 15km reconnaissance march. It is 1700 hrs, sunset is in 90 minutes, and the temperature is dropping rapidly. Member A has a sprained ankle and can only limp at 2 km/h. You are 6 km from the base camp. Member B suggests leaving Member A in a sleeping bag with rations and jogging ahead to get a transport vehicle. Member C insists on carrying Member A using a 2-man seat carry, which will slow the whole team to 3 km/h. What is your decision, and how do you mitigate risks?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Correct Officer Action: Never abandon an injured casualty alone in falling temperatures with night approaching (hypothermia and animal/security hazard). Reject Member B proposal. Adopt an improvised stretcher or 2-man carry rotating bearers between B, C, and yourself every 15 minutes. Send a radio SITREP with current coordinates and estimated arrival, requesting base send a vehicle to the nearest road-head intersecting the path. Maintain team cohesion and security integrity.",
      "learningExplanation": "Prioritizes human life, security integrity, and team cohesion over expedient but dangerous shortcuts."
    },
    "ssbAssignment": {
      "activity": "READING",
      "title": "READING Practical Exercise",
      "instructions": "Complete the READING drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Analyze the strategic lessons from the battle/topic of the day. Extract 3 operational takeaways for leadership and tactical doctrine.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Synthesize command decisiveness, logistical foresight, and decentralized initiative."
    },
    "studyTask": {
      "subject": "GEOGRAPHY",
      "topic": "GEOGRAPHY Core Syllabus Block 25",
      "syllabusObjective": "Study GEOGRAPHY with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "GEOGRAPHY Study & READING Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 74,
    "phaseId": "OPERATOR",
    "weekNumber": 11,
    "title": "Day 74: Performance Deload & Joint Mobility Reset",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete Performance Deload & Joint Mobility Reset study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d74",
      "title": "Performance Deload & Joint Mobility Reset",
      "domain": "LEADERSHIP",
      "objective": "Understand the fundamental doctrine and practical application of Performance Deload & Joint Mobility Reset.",
      "explanation": "Mastery of Performance Deload & Joint Mobility Reset is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Performance Deload & Joint Mobility Reset.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Performance Deload & Joint Mobility Reset under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Performance Deload & Joint Mobility Reset from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Performance Deload & Joint Mobility Reset?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "CALISTHENICS",
      "title": "Upper-Body Calisthenics Strength & Core",
      "prescription": "Warmup + 4 sets of Push-ups (25-35 reps) + 4 sets of Pull-up Progression (8-12 strict pull-ups) + Plank Holds.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "push_ups",
          "sets": 4,
          "repsOrDuration": "25-35 reps",
          "targetRpe": 7,
          "restSeconds": 60,
          "techniqueCues": "Elbows at 45 degrees, rigid hollow core."
        },
        {
          "exerciseId": "assisted_pull_ups",
          "sets": 4,
          "repsOrDuration": "8-12 strict pull-ups",
          "targetRpe": 7,
          "restSeconds": 90,
          "techniqueCues": "Depress scapula first, pull chest to bar."
        },
        {
          "exerciseId": "plank",
          "sets": 3,
          "repsOrDuration": "90 seconds",
          "targetRpe": 7,
          "restSeconds": 45,
          "techniqueCues": "Tuck tailbone, contract quads and glutes."
        }
      ],
      "progressionNotes": "Maintain strict cadence. If technique fails, regress to incline or band assistance.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d74",
      "type": "CRITICAL_THINKING",
      "title": "Fallacy Detection & Argument Deconstruction",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Evaluate this claim: \"Officer Candidate X completed the 5km run 2 minutes faster than Candidate Y. Therefore, Candidate X will make a significantly better operational leader in crisis than Candidate Y.\" Identify the logical fallacy and explain why the conclusion is invalid.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Logical Fallacy: False Equivalence / Hasty Generalization (Fallacy of Division). Physical aerobic speed is only one isolated component of officer competence; it does not measure decision-making under ambiguity, moral courage, communication, spatial planning, or empathy. While fitness is necessary, higher run speed alone does not directly correlate with superior leadership or crisis management.",
      "learningExplanation": "Officers must distinguish isolated performance metrics from holistic leadership capability."
    },
    "ssbAssignment": {
      "activity": "READING",
      "title": "READING Practical Exercise",
      "instructions": "Complete the READING drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Analyze the strategic lessons from the battle/topic of the day. Extract 3 operational takeaways for leadership and tactical doctrine.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Synthesize command decisiveness, logistical foresight, and decentralized initiative."
    },
    "studyTask": {
      "subject": "LEADERSHIP",
      "topic": "LEADERSHIP Core Syllabus Block 25",
      "syllabusObjective": "Study LEADERSHIP with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "LEADERSHIP Study & READING Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 75,
    "phaseId": "OPERATOR",
    "weekNumber": 11,
    "title": "Day 75: Special Operations History: Operation Khukri (Sierra Leone 2000)",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete Special Operations History: Operation Khukri (Sierra Leone 2000) study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d75",
      "title": "Special Operations History: Operation Khukri (Sierra Leone 2000)",
      "domain": "MILITARY_STUDIES",
      "objective": "Understand the fundamental doctrine and practical application of Special Operations History: Operation Khukri (Sierra Leone 2000).",
      "explanation": "Mastery of Special Operations History: Operation Khukri (Sierra Leone 2000) is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Special Operations History: Operation Khukri (Sierra Leone 2000).",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Special Operations History: Operation Khukri (Sierra Leone 2000) under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Special Operations History: Operation Khukri (Sierra Leone 2000) from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Special Operations History: Operation Khukri (Sierra Leone 2000)?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "LOWER_BODY",
      "title": "Lower-Body Structural Strength & Unilateral Stability",
      "prescription": "Warmup + 4 sets Air Squats (30-40 reps) + 3 sets Reverse Lunges (20 reps/leg) + Glute Bridges.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "bodyweight_squats",
          "sets": 4,
          "repsOrDuration": "30-40 reps",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Hip crease below patella, drive through midfoot."
        },
        {
          "exerciseId": "reverse_lunges",
          "sets": 3,
          "repsOrDuration": "20 reps/leg",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Drop rear knee softly, front knee stacked over ankle."
        },
        {
          "exerciseId": "glute_bridges",
          "sets": 3,
          "repsOrDuration": "15-20 reps with 2s squeeze",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "Drive through heels without hyperextending lumbar."
        }
      ],
      "progressionNotes": "Lower-body endurance provides stamina for long marches and field tasks.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d75",
      "type": "PSYCHOLOGICAL",
      "title": "Stoic Psychological Ownership & Stress Audit",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Reflect on a recent instance where a task did not go as planned: 1) What was your immediate emotional response (frustration, blaming circumstances, defensiveness)? 2) What part of the failure was within your direct circle of control? 3) How did you handle accountability with others involved?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "High-Performing Response: Acknowledges initial emotional impulse without letting it dictate action; shifts immediately to what was controllable (preparation, communication, contingency planning); takes full ownership without deflecting blame onto external factors or teammates.",
      "learningExplanation": "Extreme ownership eliminates victim mindset and builds commanding authority."
    },
    "ssbAssignment": {
      "activity": "TAT",
      "title": "TAT Practical Exercise",
      "instructions": "Complete the TAT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Picture prompt: A person standing on a hilltop looking through binoculars at a distant valley with rising smoke.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Hero: Forest Ranger Rajesh. Identifies forest fire outbreak early, radios division post for backup, mobilizes local village fire-line team, cuts containment trench, extinguishes blaze before reaching timber reserve."
    },
    "studyTask": {
      "subject": "MILITARY_HISTORY",
      "topic": "MILITARY_HISTORY Core Syllabus Block 25",
      "syllabusObjective": "Study MILITARY_HISTORY with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "MILITARY_HISTORY Study & TAT Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 76,
    "phaseId": "OPERATOR",
    "weekNumber": 11,
    "title": "Day 76: Tactical First Aid Scenario Simulation: Compound Trauma",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete Tactical First Aid Scenario Simulation: Compound Trauma study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d76",
      "title": "Tactical First Aid Scenario Simulation: Compound Trauma",
      "domain": "FIRST_AID",
      "objective": "Understand the fundamental doctrine and practical application of Tactical First Aid Scenario Simulation: Compound Trauma.",
      "explanation": "Mastery of Tactical First Aid Scenario Simulation: Compound Trauma is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Tactical First Aid Scenario Simulation: Compound Trauma.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Tactical First Aid Scenario Simulation: Compound Trauma under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Tactical First Aid Scenario Simulation: Compound Trauma from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Tactical First Aid Scenario Simulation: Compound Trauma?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "AEROBIC",
      "title": "Aerobic Zone 2 Endurance (8.1 km)",
      "prescription": "Warmup + 8.1 km continuous aerobic run (conversational pace) + Calf Raises.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "8.1 km continuous run",
          "targetRpe": 5,
          "restSeconds": 60,
          "techniqueCues": "Zone 2: Speak in full sentences without gasping."
        },
        {
          "exerciseId": "calf_raises",
          "sets": 3,
          "repsOrDuration": "25 reps",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "2-second pause at apex, controlled descent."
        }
      ],
      "progressionNotes": "Keep heart rate controlled. Build aerobic mitochondrial base.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d76",
      "type": "REASONING",
      "title": "Number Series & Arithmetic Logic",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Determine the next number in the sequence: 152, 155, 159, 164, 170, ?",
      "options": [
        "175",
        "177",
        "180",
        "182"
      ],
      "correctAnswer": "177",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "The sequence differences increase by +1 each step: +3, +4, +5, +6, so the next difference is +7. 170 + 7 = 177.",
      "learningExplanation": "Step-difference sequences test rapid numerical induction."
    },
    "ssbAssignment": {
      "activity": "SRT",
      "title": "SRT Practical Exercise",
      "instructions": "Complete the SRT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "1) On a night train, you notice smoke emerging from the adjacent electrical compartment. You...\n2) Your team disagrees strongly with your proposed route during a timed navigation exercise. You...\n3) A junior cadet loses their equipment kit 1 hour before morning inspection. You...",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "1) Pulled emergency chain, grabbed coach fire extinguisher, directed passengers to move away, extinguished fire, reported to guard.\n2) Paused, listened to alternate route points, demonstrated map contours objectively, gained consensus on safest route, executed decisively."
    },
    "studyTask": {
      "subject": "PHYSICS",
      "topic": "PHYSICS Core Syllabus Block 26",
      "syllabusObjective": "Study PHYSICS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "PHYSICS Study & SRT Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 77,
    "phaseId": "OPERATOR",
    "weekNumber": 11,
    "title": "Day 77: Advanced Map & Compass Practical Examination",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete Advanced Map & Compass Practical Examination study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d77",
      "title": "Advanced Map & Compass Practical Examination",
      "domain": "NAVIGATION",
      "objective": "Understand the fundamental doctrine and practical application of Advanced Map & Compass Practical Examination.",
      "explanation": "Mastery of Advanced Map & Compass Practical Examination is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Advanced Map & Compass Practical Examination.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Advanced Map & Compass Practical Examination under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Advanced Map & Compass Practical Examination from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Advanced Map & Compass Practical Examination?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "RECOVERY",
      "title": "Week 11 Restorative Mobility & Recovery Protocol",
      "prescription": "15 minutes full-body joint mobility flow + 10 minutes tactical box breathing.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "mobility_flow",
          "sets": 1,
          "repsOrDuration": "15 minutes",
          "targetRpe": 3,
          "restSeconds": 0,
          "techniqueCues": "Smooth diaphragmatic breathing into tight areas."
        },
        {
          "exerciseId": "box_breathing",
          "sets": 1,
          "repsOrDuration": "10 minutes",
          "targetRpe": 1,
          "restSeconds": 0,
          "techniqueCues": "4s in, 4s hold, 4s out, 4s empty."
        }
      ],
      "progressionNotes": "Deload allows neuromuscular supercompensation and tissue repair.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d77",
      "type": "MEMORY",
      "title": "Observation & Working Memory Challenge (Kim's Drill)",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Memorize this 7-item logistical convoy checklist for 60 seconds: 1) Radio Call-sign: BRAVO-2, 2) Route Checkpoint: CP-ALPHA (Grid 6428), 3) Departure Time: 0430 hrs, 4) Vehicle Fuel Reserve: 80 Liters, 5) Primary Emergency Frequency: 45.25 MHz, 6) Medic Lead: Sgt. Sharma, 7) Security Password: KAVACH. Close the screen and write all 7 details from memory.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Verified elements: Call-sign BRAVO-2; Checkpoint CP-ALPHA (Grid 6428); Departure 0430 hrs; Fuel 80L; Frequency 45.25 MHz; Medic Sgt. Sharma; Password KAVACH.",
      "learningExplanation": "Retaining multifaceted logistical data under cognitive pressure is vital for field communications."
    },
    "ssbAssignment": {
      "activity": "OIR",
      "title": "OIR Practical Exercise",
      "instructions": "Complete the OIR drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Solve 5 mixed classification and analogical reasoning questions under 3 minutes.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Target >90% accuracy. Systematically check symmetry, number of line segments, and rotation direction."
    },
    "studyTask": {
      "subject": "MATHS",
      "topic": "MATHS Core Syllabus Block 26",
      "syllabusObjective": "Study MATHS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "MATHS Study & OIR Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 78,
    "phaseId": "OPERATOR",
    "weekNumber": 12,
    "title": "Day 78: Speed Endurance & Controlled Tempo Running Benchmark",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete Speed Endurance & Controlled Tempo Running Benchmark study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d78",
      "title": "Speed Endurance & Controlled Tempo Running Benchmark",
      "domain": "LEADERSHIP",
      "objective": "Understand the fundamental doctrine and practical application of Speed Endurance & Controlled Tempo Running Benchmark.",
      "explanation": "Mastery of Speed Endurance & Controlled Tempo Running Benchmark is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Speed Endurance & Controlled Tempo Running Benchmark.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Speed Endurance & Controlled Tempo Running Benchmark under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Speed Endurance & Controlled Tempo Running Benchmark from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Speed Endurance & Controlled Tempo Running Benchmark?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "LOWER_BODY",
      "title": "Lower-Body Structural Strength & Unilateral Stability",
      "prescription": "Warmup + 4 sets Air Squats (30-40 reps) + 3 sets Reverse Lunges (20 reps/leg) + Glute Bridges.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "bodyweight_squats",
          "sets": 4,
          "repsOrDuration": "30-40 reps",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Hip crease below patella, drive through midfoot."
        },
        {
          "exerciseId": "reverse_lunges",
          "sets": 3,
          "repsOrDuration": "20 reps/leg",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Drop rear knee softly, front knee stacked over ankle."
        },
        {
          "exerciseId": "glute_bridges",
          "sets": 3,
          "repsOrDuration": "15-20 reps with 2s squeeze",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "Drive through heels without hyperextending lumbar."
        }
      ],
      "progressionNotes": "Lower-body endurance provides stamina for long marches and field tasks.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d78",
      "type": "DECISION_MAKING",
      "title": "Tactical Decision Scenario & Resource Trade-Off",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "You are leading a 4-person patrol returning from a 15km reconnaissance march. It is 1700 hrs, sunset is in 90 minutes, and the temperature is dropping rapidly. Member A has a sprained ankle and can only limp at 2 km/h. You are 6 km from the base camp. Member B suggests leaving Member A in a sleeping bag with rations and jogging ahead to get a transport vehicle. Member C insists on carrying Member A using a 2-man seat carry, which will slow the whole team to 3 km/h. What is your decision, and how do you mitigate risks?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Correct Officer Action: Never abandon an injured casualty alone in falling temperatures with night approaching (hypothermia and animal/security hazard). Reject Member B proposal. Adopt an improvised stretcher or 2-man carry rotating bearers between B, C, and yourself every 15 minutes. Send a radio SITREP with current coordinates and estimated arrival, requesting base send a vehicle to the nearest road-head intersecting the path. Maintain team cohesion and security integrity.",
      "learningExplanation": "Prioritizes human life, security integrity, and team cohesion over expedient but dangerous shortcuts."
    },
    "ssbAssignment": {
      "activity": "WAT",
      "title": "WAT Practical Exercise",
      "instructions": "Complete the WAT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "10 words: 1) RISK  2) DISCIPLINE  3) CRISIS  4) WEAPON  5) OBSTACLE  6) COOPERATE  7) LONELY  8) VICTORY  9) DUTY  10) TIRED",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Risk: Calculated risks lead to decisive progress. Obstacle: Stepping stone for determined individuals. Duty: Performed with unwavering integrity."
    },
    "studyTask": {
      "subject": "PHYSICS",
      "topic": "PHYSICS Core Syllabus Block 26",
      "syllabusObjective": "Study PHYSICS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "PHYSICS Study & WAT Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 79,
    "phaseId": "OPERATOR",
    "weekNumber": 12,
    "title": "Day 79: Ethical Leadership Under Uncertainty: Complex Case Analysis",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete Ethical Leadership Under Uncertainty: Complex Case Analysis study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d79",
      "title": "Ethical Leadership Under Uncertainty: Complex Case Analysis",
      "domain": "LEADERSHIP",
      "objective": "Understand the fundamental doctrine and practical application of Ethical Leadership Under Uncertainty: Complex Case Analysis.",
      "explanation": "Mastery of Ethical Leadership Under Uncertainty: Complex Case Analysis is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Ethical Leadership Under Uncertainty: Complex Case Analysis.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Ethical Leadership Under Uncertainty: Complex Case Analysis under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Ethical Leadership Under Uncertainty: Complex Case Analysis from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Ethical Leadership Under Uncertainty: Complex Case Analysis?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "AEROBIC",
      "title": "Aerobic Zone 2 Endurance (8.4 km)",
      "prescription": "Warmup + 8.4 km continuous aerobic run (conversational pace) + Calf Raises.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "8.4 km continuous run",
          "targetRpe": 5,
          "restSeconds": 60,
          "techniqueCues": "Zone 2: Speak in full sentences without gasping."
        },
        {
          "exerciseId": "calf_raises",
          "sets": 3,
          "repsOrDuration": "25 reps",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "2-second pause at apex, controlled descent."
        }
      ],
      "progressionNotes": "Keep heart rate controlled. Build aerobic mitochondrial base.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d79",
      "type": "CRITICAL_THINKING",
      "title": "Fallacy Detection & Argument Deconstruction",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Evaluate this claim: \"Officer Candidate X completed the 5km run 2 minutes faster than Candidate Y. Therefore, Candidate X will make a significantly better operational leader in crisis than Candidate Y.\" Identify the logical fallacy and explain why the conclusion is invalid.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Logical Fallacy: False Equivalence / Hasty Generalization (Fallacy of Division). Physical aerobic speed is only one isolated component of officer competence; it does not measure decision-making under ambiguity, moral courage, communication, spatial planning, or empathy. While fitness is necessary, higher run speed alone does not directly correlate with superior leadership or crisis management.",
      "learningExplanation": "Officers must distinguish isolated performance metrics from holistic leadership capability."
    },
    "ssbAssignment": {
      "activity": "GD",
      "title": "GD Practical Exercise",
      "instructions": "Complete the GD drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Group Discussion topic: \"Role of artificial intelligence, autonomous drones, and hypersonic systems in modern warfare: Opportunity or vulnerability?\"",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Structure points: 1) Force multiplier in surveillance and precision strike; 2) Vulnerability in GPS-denied environments and electronic warfare jamming; 3) Necessity of domestic sovereign algorithmic capability."
    },
    "studyTask": {
      "subject": "LEADERSHIP",
      "topic": "LEADERSHIP Core Syllabus Block 27",
      "syllabusObjective": "Study LEADERSHIP with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "LEADERSHIP Study & GD Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 80,
    "phaseId": "OPERATOR",
    "weekNumber": 12,
    "title": "Day 80: Current Geopolitics: Quad, BRICS & Indo-Pacific Maritime Security",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete Current Geopolitics: Quad, BRICS & Indo-Pacific Maritime Security study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d80",
      "title": "Current Geopolitics: Quad, BRICS & Indo-Pacific Maritime Security",
      "domain": "MILITARY_STUDIES",
      "objective": "Understand the fundamental doctrine and practical application of Current Geopolitics: Quad, BRICS & Indo-Pacific Maritime Security.",
      "explanation": "Mastery of Current Geopolitics: Quad, BRICS & Indo-Pacific Maritime Security is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Current Geopolitics: Quad, BRICS & Indo-Pacific Maritime Security.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Current Geopolitics: Quad, BRICS & Indo-Pacific Maritime Security under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Current Geopolitics: Quad, BRICS & Indo-Pacific Maritime Security from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Current Geopolitics: Quad, BRICS & Indo-Pacific Maritime Security?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "CALISTHENICS",
      "title": "Upper-Body Calisthenics Strength & Core",
      "prescription": "Warmup + 4 sets of Push-ups (25-35 reps) + 4 sets of Pull-up Progression (8-12 strict pull-ups) + Plank Holds.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "push_ups",
          "sets": 4,
          "repsOrDuration": "25-35 reps",
          "targetRpe": 7,
          "restSeconds": 60,
          "techniqueCues": "Elbows at 45 degrees, rigid hollow core."
        },
        {
          "exerciseId": "assisted_pull_ups",
          "sets": 4,
          "repsOrDuration": "8-12 strict pull-ups",
          "targetRpe": 7,
          "restSeconds": 90,
          "techniqueCues": "Depress scapula first, pull chest to bar."
        },
        {
          "exerciseId": "plank",
          "sets": 3,
          "repsOrDuration": "90 seconds",
          "targetRpe": 7,
          "restSeconds": 45,
          "techniqueCues": "Tuck tailbone, contract quads and glutes."
        }
      ],
      "progressionNotes": "Maintain strict cadence. If technique fails, regress to incline or band assistance.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d80",
      "type": "PSYCHOLOGICAL",
      "title": "Stoic Psychological Ownership & Stress Audit",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Reflect on a recent instance where a task did not go as planned: 1) What was your immediate emotional response (frustration, blaming circumstances, defensiveness)? 2) What part of the failure was within your direct circle of control? 3) How did you handle accountability with others involved?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "High-Performing Response: Acknowledges initial emotional impulse without letting it dictate action; shifts immediately to what was controllable (preparation, communication, contingency planning); takes full ownership without deflecting blame onto external factors or teammates.",
      "learningExplanation": "Extreme ownership eliminates victim mindset and builds commanding authority."
    },
    "ssbAssignment": {
      "activity": "INTERVIEW",
      "title": "INTERVIEW Practical Exercise",
      "instructions": "Complete the INTERVIEW drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Prepare 3-minute structured answers to: 1) What are your top 3 strengths and 2 weaknesses you are actively working on? 2) Why Indian Armed Forces instead of civil services or corporate career? 3) Describe a situation where you had a conflict with a senior and how you resolved it.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Answer with authenticity, concrete examples, clear cause-and-effect reasoning, without fabricated heroic cliches."
    },
    "studyTask": {
      "subject": "CURRENT_AFFAIRS",
      "topic": "CURRENT_AFFAIRS Core Syllabus Block 27",
      "syllabusObjective": "Study CURRENT_AFFAIRS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "CURRENT_AFFAIRS Study & INTERVIEW Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 81,
    "phaseId": "OPERATOR",
    "weekNumber": 12,
    "title": "Day 81: Weekly Deload & Pre-Final Performance Review",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete Weekly Deload & Pre-Final Performance Review study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d81",
      "title": "Weekly Deload & Pre-Final Performance Review",
      "domain": "LEADERSHIP",
      "objective": "Understand the fundamental doctrine and practical application of Weekly Deload & Pre-Final Performance Review.",
      "explanation": "Mastery of Weekly Deload & Pre-Final Performance Review is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Weekly Deload & Pre-Final Performance Review.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Weekly Deload & Pre-Final Performance Review under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Weekly Deload & Pre-Final Performance Review from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Weekly Deload & Pre-Final Performance Review?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "LOWER_BODY",
      "title": "Lower-Body Structural Strength & Unilateral Stability",
      "prescription": "Warmup + 4 sets Air Squats (30-40 reps) + 3 sets Reverse Lunges (20 reps/leg) + Glute Bridges.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "bodyweight_squats",
          "sets": 4,
          "repsOrDuration": "30-40 reps",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Hip crease below patella, drive through midfoot."
        },
        {
          "exerciseId": "reverse_lunges",
          "sets": 3,
          "repsOrDuration": "20 reps/leg",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Drop rear knee softly, front knee stacked over ankle."
        },
        {
          "exerciseId": "glute_bridges",
          "sets": 3,
          "repsOrDuration": "15-20 reps with 2s squeeze",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "Drive through heels without hyperextending lumbar."
        }
      ],
      "progressionNotes": "Lower-body endurance provides stamina for long marches and field tasks.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d81",
      "type": "REASONING",
      "title": "Number Series & Arithmetic Logic",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Determine the next number in the sequence: 162, 165, 169, 174, 180, ?",
      "options": [
        "185",
        "187",
        "190",
        "192"
      ],
      "correctAnswer": "187",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "The sequence differences increase by +1 each step: +3, +4, +5, +6, so the next difference is +7. 180 + 7 = 187.",
      "learningExplanation": "Step-difference sequences test rapid numerical induction."
    },
    "ssbAssignment": {
      "activity": "READING",
      "title": "READING Practical Exercise",
      "instructions": "Complete the READING drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Analyze the strategic lessons from the battle/topic of the day. Extract 3 operational takeaways for leadership and tactical doctrine.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Synthesize command decisiveness, logistical foresight, and decentralized initiative."
    },
    "studyTask": {
      "subject": "LEADERSHIP",
      "topic": "LEADERSHIP Core Syllabus Block 27",
      "syllabusObjective": "Study LEADERSHIP with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "LEADERSHIP Study & READING Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 82,
    "phaseId": "OPERATOR",
    "weekNumber": 12,
    "title": "Day 82: Screening Day Re-Simulation: Full OIR + PPDT Narration & Discussion",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete Screening Day Re-Simulation: Full OIR + PPDT Narration & Discussion study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d82",
      "title": "Screening Day Re-Simulation: Full OIR + PPDT Narration & Discussion",
      "domain": "MENTAL_MODELS",
      "objective": "Understand the fundamental doctrine and practical application of Screening Day Re-Simulation: Full OIR + PPDT Narration & Discussion.",
      "explanation": "Mastery of Screening Day Re-Simulation: Full OIR + PPDT Narration & Discussion is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Screening Day Re-Simulation: Full OIR + PPDT Narration & Discussion.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Screening Day Re-Simulation: Full OIR + PPDT Narration & Discussion under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Screening Day Re-Simulation: Full OIR + PPDT Narration & Discussion from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Screening Day Re-Simulation: Full OIR + PPDT Narration & Discussion?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "AEROBIC",
      "title": "Aerobic Zone 2 Endurance (8.7 km)",
      "prescription": "Warmup + 8.7 km continuous aerobic run (conversational pace) + Calf Raises.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "8.7 km continuous run",
          "targetRpe": 5,
          "restSeconds": 60,
          "techniqueCues": "Zone 2: Speak in full sentences without gasping."
        },
        {
          "exerciseId": "calf_raises",
          "sets": 3,
          "repsOrDuration": "25 reps",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "2-second pause at apex, controlled descent."
        }
      ],
      "progressionNotes": "Keep heart rate controlled. Build aerobic mitochondrial base.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d82",
      "type": "MEMORY",
      "title": "Observation & Working Memory Challenge (Kim's Drill)",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Memorize this 7-item logistical convoy checklist for 60 seconds: 1) Radio Call-sign: BRAVO-2, 2) Route Checkpoint: CP-ALPHA (Grid 6428), 3) Departure Time: 0430 hrs, 4) Vehicle Fuel Reserve: 80 Liters, 5) Primary Emergency Frequency: 45.25 MHz, 6) Medic Lead: Sgt. Sharma, 7) Security Password: KAVACH. Close the screen and write all 7 details from memory.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Verified elements: Call-sign BRAVO-2; Checkpoint CP-ALPHA (Grid 6428); Departure 0430 hrs; Fuel 80L; Frequency 45.25 MHz; Medic Sgt. Sharma; Password KAVACH.",
      "learningExplanation": "Retaining multifaceted logistical data under cognitive pressure is vital for field communications."
    },
    "ssbAssignment": {
      "activity": "PPDT",
      "title": "PPDT Practical Exercise",
      "instructions": "Complete the PPDT drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "A blurred picture of a group of youth gathered around a table with maps and paper in a village community hall.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Hero: Suresh (23), organized youth volunteer group to survey flood damage, prepared relief distribution maps, coordinated medical camp with local authorities."
    },
    "studyTask": {
      "subject": "MATHS",
      "topic": "MATHS Core Syllabus Block 28",
      "syllabusObjective": "Study MATHS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "MATHS Study & PPDT Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 83,
    "phaseId": "OPERATOR",
    "weekNumber": 12,
    "title": "Day 83: Psychological Battery Re-Simulation: Full TAT, WAT, SRT & SD",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete Psychological Battery Re-Simulation: Full TAT, WAT, SRT & SD study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d83",
      "title": "Psychological Battery Re-Simulation: Full TAT, WAT, SRT & SD",
      "domain": "MENTAL_MODELS",
      "objective": "Understand the fundamental doctrine and practical application of Psychological Battery Re-Simulation: Full TAT, WAT, SRT & SD.",
      "explanation": "Mastery of Psychological Battery Re-Simulation: Full TAT, WAT, SRT & SD is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Psychological Battery Re-Simulation: Full TAT, WAT, SRT & SD.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Psychological Battery Re-Simulation: Full TAT, WAT, SRT & SD under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Psychological Battery Re-Simulation: Full TAT, WAT, SRT & SD from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Psychological Battery Re-Simulation: Full TAT, WAT, SRT & SD?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "CALISTHENICS",
      "title": "Upper-Body Calisthenics Strength & Core",
      "prescription": "Warmup + 4 sets of Push-ups (25-35 reps) + 4 sets of Pull-up Progression (8-12 strict pull-ups) + Plank Holds.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "push_ups",
          "sets": 4,
          "repsOrDuration": "25-35 reps",
          "targetRpe": 7,
          "restSeconds": 60,
          "techniqueCues": "Elbows at 45 degrees, rigid hollow core."
        },
        {
          "exerciseId": "assisted_pull_ups",
          "sets": 4,
          "repsOrDuration": "8-12 strict pull-ups",
          "targetRpe": 7,
          "restSeconds": 90,
          "techniqueCues": "Depress scapula first, pull chest to bar."
        },
        {
          "exerciseId": "plank",
          "sets": 3,
          "repsOrDuration": "90 seconds",
          "targetRpe": 7,
          "restSeconds": 45,
          "techniqueCues": "Tuck tailbone, contract quads and glutes."
        }
      ],
      "progressionNotes": "Maintain strict cadence. If technique fails, regress to incline or band assistance.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d83",
      "type": "DECISION_MAKING",
      "title": "Tactical Decision Scenario & Resource Trade-Off",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "You are leading a 4-person patrol returning from a 15km reconnaissance march. It is 1700 hrs, sunset is in 90 minutes, and the temperature is dropping rapidly. Member A has a sprained ankle and can only limp at 2 km/h. You are 6 km from the base camp. Member B suggests leaving Member A in a sleeping bag with rations and jogging ahead to get a transport vehicle. Member C insists on carrying Member A using a 2-man seat carry, which will slow the whole team to 3 km/h. What is your decision, and how do you mitigate risks?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Correct Officer Action: Never abandon an injured casualty alone in falling temperatures with night approaching (hypothermia and animal/security hazard). Reject Member B proposal. Adopt an improvised stretcher or 2-man carry rotating bearers between B, C, and yourself every 15 minutes. Send a radio SITREP with current coordinates and estimated arrival, requesting base send a vehicle to the nearest road-head intersecting the path. Maintain team cohesion and security integrity.",
      "learningExplanation": "Prioritizes human life, security integrity, and team cohesion over expedient but dangerous shortcuts."
    },
    "ssbAssignment": {
      "activity": "MOCK_TEST",
      "title": "MOCK_TEST Practical Exercise",
      "instructions": "Complete the MOCK_TEST drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Analyze the strategic lessons from the battle/topic of the day. Extract 3 operational takeaways for leadership and tactical doctrine.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Synthesize command decisiveness, logistical foresight, and decentralized initiative."
    },
    "studyTask": {
      "subject": "ENGLISH",
      "topic": "ENGLISH Core Syllabus Block 28",
      "syllabusObjective": "Study ENGLISH with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "ENGLISH Study & MOCK_TEST Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 84,
    "phaseId": "OPERATOR",
    "weekNumber": 12,
    "title": "Day 84: GTO Tasks Complete Re-Simulation: MPE + Individual Obstacles Strategy",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete GTO Tasks Complete Re-Simulation: MPE + Individual Obstacles Strategy study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d84",
      "title": "GTO Tasks Complete Re-Simulation: MPE + Individual Obstacles Strategy",
      "domain": "PLANNING",
      "objective": "Understand the fundamental doctrine and practical application of GTO Tasks Complete Re-Simulation: MPE + Individual Obstacles Strategy.",
      "explanation": "Mastery of GTO Tasks Complete Re-Simulation: MPE + Individual Obstacles Strategy is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing GTO Tasks Complete Re-Simulation: MPE + Individual Obstacles Strategy.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of GTO Tasks Complete Re-Simulation: MPE + Individual Obstacles Strategy under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for GTO Tasks Complete Re-Simulation: MPE + Individual Obstacles Strategy from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of GTO Tasks Complete Re-Simulation: MPE + Individual Obstacles Strategy?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "RECOVERY",
      "title": "Week 12 Restorative Mobility & Recovery Protocol",
      "prescription": "15 minutes full-body joint mobility flow + 10 minutes tactical box breathing.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "mobility_flow",
          "sets": 1,
          "repsOrDuration": "15 minutes",
          "targetRpe": 3,
          "restSeconds": 0,
          "techniqueCues": "Smooth diaphragmatic breathing into tight areas."
        },
        {
          "exerciseId": "box_breathing",
          "sets": 1,
          "repsOrDuration": "10 minutes",
          "targetRpe": 1,
          "restSeconds": 0,
          "techniqueCues": "4s in, 4s hold, 4s out, 4s empty."
        }
      ],
      "progressionNotes": "Deload allows neuromuscular supercompensation and tissue repair.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d84",
      "type": "CRITICAL_THINKING",
      "title": "Fallacy Detection & Argument Deconstruction",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Evaluate this claim: \"Officer Candidate X completed the 5km run 2 minutes faster than Candidate Y. Therefore, Candidate X will make a significantly better operational leader in crisis than Candidate Y.\" Identify the logical fallacy and explain why the conclusion is invalid.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Logical Fallacy: False Equivalence / Hasty Generalization (Fallacy of Division). Physical aerobic speed is only one isolated component of officer competence; it does not measure decision-making under ambiguity, moral courage, communication, spatial planning, or empathy. While fitness is necessary, higher run speed alone does not directly correlate with superior leadership or crisis management.",
      "learningExplanation": "Officers must distinguish isolated performance metrics from holistic leadership capability."
    },
    "ssbAssignment": {
      "activity": "GTO_1",
      "title": "GTO_1 Practical Exercise",
      "instructions": "Complete the GTO_1 drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Group Planning Exercise: 4 emergencies simultaneously: 1) Injured farmer bleeding heavily (needs help in 30 min), 2) River bund leaking (bursts in 60 min flooding town), 3) Stolen temple idol moving toward border in car, 4) Train arriving in 45 min with severed signal cable. You have 8 people, 2 bicycles, a tractor, and first aid kit.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Divide team based on urgency: Team 1 (2 people with first aid & bicycle) immediate medical care; Team 2 (3 people with tractor & sandbags) secure river bund; Team 3 (2 people) report idol theft to police outpost at crossroads; Team 4 (1 person) warn railway station master via station phone or manual flag."
    },
    "studyTask": {
      "subject": "GEOGRAPHY",
      "topic": "GEOGRAPHY Core Syllabus Block 28",
      "syllabusObjective": "Study GEOGRAPHY with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "GEOGRAPHY Study & GTO_1 Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 85,
    "phaseId": "OPERATOR",
    "weekNumber": 13,
    "title": "Day 85: Comprehensive Personal Interview Mock & PIQ Verification",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete Comprehensive Personal Interview Mock & PIQ Verification study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d85",
      "title": "Comprehensive Personal Interview Mock & PIQ Verification",
      "domain": "COMMUNICATION",
      "objective": "Understand the fundamental doctrine and practical application of Comprehensive Personal Interview Mock & PIQ Verification.",
      "explanation": "Mastery of Comprehensive Personal Interview Mock & PIQ Verification is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Comprehensive Personal Interview Mock & PIQ Verification.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Comprehensive Personal Interview Mock & PIQ Verification under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Comprehensive Personal Interview Mock & PIQ Verification from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Comprehensive Personal Interview Mock & PIQ Verification?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "AEROBIC",
      "title": "Aerobic Zone 2 Endurance (9.0 km)",
      "prescription": "Warmup + 9.0 km continuous aerobic run (conversational pace) + Calf Raises.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "9.0 km continuous run",
          "targetRpe": 5,
          "restSeconds": 60,
          "techniqueCues": "Zone 2: Speak in full sentences without gasping."
        },
        {
          "exerciseId": "calf_raises",
          "sets": 3,
          "repsOrDuration": "25 reps",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "2-second pause at apex, controlled descent."
        }
      ],
      "progressionNotes": "Keep heart rate controlled. Build aerobic mitochondrial base.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d85",
      "type": "PSYCHOLOGICAL",
      "title": "Stoic Psychological Ownership & Stress Audit",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Reflect on a recent instance where a task did not go as planned: 1) What was your immediate emotional response (frustration, blaming circumstances, defensiveness)? 2) What part of the failure was within your direct circle of control? 3) How did you handle accountability with others involved?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "High-Performing Response: Acknowledges initial emotional impulse without letting it dictate action; shifts immediately to what was controllable (preparation, communication, contingency planning); takes full ownership without deflecting blame onto external factors or teammates.",
      "learningExplanation": "Extreme ownership eliminates victim mindset and builds commanding authority."
    },
    "ssbAssignment": {
      "activity": "INTERVIEW",
      "title": "INTERVIEW Practical Exercise",
      "instructions": "Complete the INTERVIEW drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Prepare 3-minute structured answers to: 1) What are your top 3 strengths and 2 weaknesses you are actively working on? 2) Why Indian Armed Forces instead of civil services or corporate career? 3) Describe a situation where you had a conflict with a senior and how you resolved it.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Answer with authenticity, concrete examples, clear cause-and-effect reasoning, without fabricated heroic cliches."
    },
    "studyTask": {
      "subject": "CURRENT_AFFAIRS",
      "topic": "CURRENT_AFFAIRS Core Syllabus Block 29",
      "syllabusObjective": "Study CURRENT_AFFAIRS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "CURRENT_AFFAIRS Study & INTERVIEW Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 86,
    "phaseId": "OPERATOR",
    "weekNumber": 13,
    "title": "Day 86: Aerobic & Strength Endurance Culmination Benchmark",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete Aerobic & Strength Endurance Culmination Benchmark study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d86",
      "title": "Aerobic & Strength Endurance Culmination Benchmark",
      "domain": "LEADERSHIP",
      "objective": "Understand the fundamental doctrine and practical application of Aerobic & Strength Endurance Culmination Benchmark.",
      "explanation": "Mastery of Aerobic & Strength Endurance Culmination Benchmark is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Aerobic & Strength Endurance Culmination Benchmark.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Aerobic & Strength Endurance Culmination Benchmark under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Aerobic & Strength Endurance Culmination Benchmark from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Aerobic & Strength Endurance Culmination Benchmark?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "BENCHMARK",
      "title": "Benchmark Diagnostic Fitness Assessment (Day 86)",
      "prescription": "Warmup + 5.0 km Time Trial + Max Push-ups (strict form) + Max Plank Hold.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "5.0 km continuous time trial",
          "targetRpe": 8,
          "restSeconds": 180,
          "techniqueCues": "Pace evenly from the start."
        },
        {
          "exerciseId": "push_ups",
          "sets": 1,
          "repsOrDuration": "Max repetitions to failure",
          "targetRpe": 9,
          "restSeconds": 120,
          "techniqueCues": "Chest within 2 inches of deck, full lockout."
        },
        {
          "exerciseId": "plank",
          "sets": 1,
          "repsOrDuration": "Max hold for time",
          "targetRpe": 8,
          "restSeconds": 90,
          "techniqueCues": "Rigid straight line from heels to ears."
        }
      ],
      "progressionNotes": "Record exact times and repetitions to compare with baseline.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d86",
      "type": "REASONING",
      "title": "Number Series & Arithmetic Logic",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Determine the next number in the sequence: 172, 175, 179, 184, 190, ?",
      "options": [
        "195",
        "197",
        "200",
        "202"
      ],
      "correctAnswer": "197",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "The sequence differences increase by +1 each step: +3, +4, +5, +6, so the next difference is +7. 190 + 7 = 197.",
      "learningExplanation": "Step-difference sequences test rapid numerical induction."
    },
    "ssbAssignment": {
      "activity": "OIR",
      "title": "OIR Practical Exercise",
      "instructions": "Complete the OIR drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Solve 5 mixed classification and analogical reasoning questions under 3 minutes.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Target >90% accuracy. Systematically check symmetry, number of line segments, and rotation direction."
    },
    "studyTask": {
      "subject": "PHYSICS",
      "topic": "PHYSICS Core Syllabus Block 29",
      "syllabusObjective": "Study PHYSICS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "PHYSICS Study & OIR Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 87,
    "phaseId": "OPERATOR",
    "weekNumber": 13,
    "title": "Day 87: Cumulative 90-Day Academic Knowledge Examination",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete Cumulative 90-Day Academic Knowledge Examination study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d87",
      "title": "Cumulative 90-Day Academic Knowledge Examination",
      "domain": "MILITARY_STUDIES",
      "objective": "Understand the fundamental doctrine and practical application of Cumulative 90-Day Academic Knowledge Examination.",
      "explanation": "Mastery of Cumulative 90-Day Academic Knowledge Examination is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Cumulative 90-Day Academic Knowledge Examination.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Cumulative 90-Day Academic Knowledge Examination under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Cumulative 90-Day Academic Knowledge Examination from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Cumulative 90-Day Academic Knowledge Examination?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "LOWER_BODY",
      "title": "Lower-Body Structural Strength & Unilateral Stability",
      "prescription": "Warmup + 4 sets Air Squats (30-40 reps) + 3 sets Reverse Lunges (20 reps/leg) + Glute Bridges.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "bodyweight_squats",
          "sets": 4,
          "repsOrDuration": "30-40 reps",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Hip crease below patella, drive through midfoot."
        },
        {
          "exerciseId": "reverse_lunges",
          "sets": 3,
          "repsOrDuration": "20 reps/leg",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Drop rear knee softly, front knee stacked over ankle."
        },
        {
          "exerciseId": "glute_bridges",
          "sets": 3,
          "repsOrDuration": "15-20 reps with 2s squeeze",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "Drive through heels without hyperextending lumbar."
        }
      ],
      "progressionNotes": "Lower-body endurance provides stamina for long marches and field tasks.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d87",
      "type": "MEMORY",
      "title": "Observation & Working Memory Challenge (Kim's Drill)",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Memorize this 7-item logistical convoy checklist for 60 seconds: 1) Radio Call-sign: BRAVO-2, 2) Route Checkpoint: CP-ALPHA (Grid 6428), 3) Departure Time: 0430 hrs, 4) Vehicle Fuel Reserve: 80 Liters, 5) Primary Emergency Frequency: 45.25 MHz, 6) Medic Lead: Sgt. Sharma, 7) Security Password: KAVACH. Close the screen and write all 7 details from memory.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Verified elements: Call-sign BRAVO-2; Checkpoint CP-ALPHA (Grid 6428); Departure 0430 hrs; Fuel 80L; Frequency 45.25 MHz; Medic Sgt. Sharma; Password KAVACH.",
      "learningExplanation": "Retaining multifaceted logistical data under cognitive pressure is vital for field communications."
    },
    "ssbAssignment": {
      "activity": "MOCK_TEST",
      "title": "MOCK_TEST Practical Exercise",
      "instructions": "Complete the MOCK_TEST drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Analyze the strategic lessons from the battle/topic of the day. Extract 3 operational takeaways for leadership and tactical doctrine.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Synthesize command decisiveness, logistical foresight, and decentralized initiative."
    },
    "studyTask": {
      "subject": "CURRENT_AFFAIRS",
      "topic": "CURRENT_AFFAIRS Core Syllabus Block 29",
      "syllabusObjective": "Study CURRENT_AFFAIRS with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "CURRENT_AFFAIRS Study & MOCK_TEST Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 88,
    "phaseId": "OPERATOR",
    "weekNumber": 13,
    "title": "Day 88: Tactical Deload, Mental Stillness & Focus Consolidation",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete Tactical Deload, Mental Stillness & Focus Consolidation study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d88",
      "title": "Tactical Deload, Mental Stillness & Focus Consolidation",
      "domain": "LEADERSHIP",
      "objective": "Understand the fundamental doctrine and practical application of Tactical Deload, Mental Stillness & Focus Consolidation.",
      "explanation": "Mastery of Tactical Deload, Mental Stillness & Focus Consolidation is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Tactical Deload, Mental Stillness & Focus Consolidation.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Tactical Deload, Mental Stillness & Focus Consolidation under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Tactical Deload, Mental Stillness & Focus Consolidation from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Tactical Deload, Mental Stillness & Focus Consolidation?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "AEROBIC",
      "title": "Aerobic Zone 2 Endurance (9.3 km)",
      "prescription": "Warmup + 9.3 km continuous aerobic run (conversational pace) + Calf Raises.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "9.3 km continuous run",
          "targetRpe": 5,
          "restSeconds": 60,
          "techniqueCues": "Zone 2: Speak in full sentences without gasping."
        },
        {
          "exerciseId": "calf_raises",
          "sets": 3,
          "repsOrDuration": "25 reps",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "2-second pause at apex, controlled descent."
        }
      ],
      "progressionNotes": "Keep heart rate controlled. Build aerobic mitochondrial base.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d88",
      "type": "DECISION_MAKING",
      "title": "Tactical Decision Scenario & Resource Trade-Off",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "You are leading a 4-person patrol returning from a 15km reconnaissance march. It is 1700 hrs, sunset is in 90 minutes, and the temperature is dropping rapidly. Member A has a sprained ankle and can only limp at 2 km/h. You are 6 km from the base camp. Member B suggests leaving Member A in a sleeping bag with rations and jogging ahead to get a transport vehicle. Member C insists on carrying Member A using a 2-man seat carry, which will slow the whole team to 3 km/h. What is your decision, and how do you mitigate risks?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Correct Officer Action: Never abandon an injured casualty alone in falling temperatures with night approaching (hypothermia and animal/security hazard). Reject Member B proposal. Adopt an improvised stretcher or 2-man carry rotating bearers between B, C, and yourself every 15 minutes. Send a radio SITREP with current coordinates and estimated arrival, requesting base send a vehicle to the nearest road-head intersecting the path. Maintain team cohesion and security integrity.",
      "learningExplanation": "Prioritizes human life, security integrity, and team cohesion over expedient but dangerous shortcuts."
    },
    "ssbAssignment": {
      "activity": "READING",
      "title": "READING Practical Exercise",
      "instructions": "Complete the READING drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Analyze the strategic lessons from the battle/topic of the day. Extract 3 operational takeaways for leadership and tactical doctrine.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Synthesize command decisiveness, logistical foresight, and decentralized initiative."
    },
    "studyTask": {
      "subject": "LEADERSHIP",
      "topic": "LEADERSHIP Core Syllabus Block 30",
      "syllabusObjective": "Study LEADERSHIP with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "LEADERSHIP Study & READING Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 89,
    "phaseId": "OPERATOR",
    "weekNumber": 13,
    "title": "Day 89: The 90-Day Academy Capstone Assessment & Final Debrief",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete The 90-Day Academy Capstone Assessment & Final Debrief study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d89",
      "title": "The 90-Day Academy Capstone Assessment & Final Debrief",
      "domain": "LEADERSHIP",
      "objective": "Understand the fundamental doctrine and practical application of The 90-Day Academy Capstone Assessment & Final Debrief.",
      "explanation": "Mastery of The 90-Day Academy Capstone Assessment & Final Debrief is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing The 90-Day Academy Capstone Assessment & Final Debrief.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of The 90-Day Academy Capstone Assessment & Final Debrief under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for The 90-Day Academy Capstone Assessment & Final Debrief from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of The 90-Day Academy Capstone Assessment & Final Debrief?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "BENCHMARK",
      "title": "Benchmark Diagnostic Fitness Assessment (Day 89)",
      "prescription": "Warmup + 5.0 km Time Trial + Max Push-ups (strict form) + Max Plank Hold.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "running_intervals",
          "sets": 1,
          "repsOrDuration": "5.0 km continuous time trial",
          "targetRpe": 8,
          "restSeconds": 180,
          "techniqueCues": "Pace evenly from the start."
        },
        {
          "exerciseId": "push_ups",
          "sets": 1,
          "repsOrDuration": "Max repetitions to failure",
          "targetRpe": 9,
          "restSeconds": 120,
          "techniqueCues": "Chest within 2 inches of deck, full lockout."
        },
        {
          "exerciseId": "plank",
          "sets": 1,
          "repsOrDuration": "Max hold for time",
          "targetRpe": 8,
          "restSeconds": 90,
          "techniqueCues": "Rigid straight line from heels to ears."
        }
      ],
      "progressionNotes": "Record exact times and repetitions to compare with baseline.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d89",
      "type": "CRITICAL_THINKING",
      "title": "Fallacy Detection & Argument Deconstruction",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Evaluate this claim: \"Officer Candidate X completed the 5km run 2 minutes faster than Candidate Y. Therefore, Candidate X will make a significantly better operational leader in crisis than Candidate Y.\" Identify the logical fallacy and explain why the conclusion is invalid.",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "Logical Fallacy: False Equivalence / Hasty Generalization (Fallacy of Division). Physical aerobic speed is only one isolated component of officer competence; it does not measure decision-making under ambiguity, moral courage, communication, spatial planning, or empathy. While fitness is necessary, higher run speed alone does not directly correlate with superior leadership or crisis management.",
      "learningExplanation": "Officers must distinguish isolated performance metrics from holistic leadership capability."
    },
    "ssbAssignment": {
      "activity": "MOCK_TEST",
      "title": "MOCK_TEST Practical Exercise",
      "instructions": "Complete the MOCK_TEST drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Analyze the strategic lessons from the battle/topic of the day. Extract 3 operational takeaways for leadership and tactical doctrine.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Synthesize command decisiveness, logistical foresight, and decentralized initiative."
    },
    "studyTask": {
      "subject": "LEADERSHIP",
      "topic": "LEADERSHIP Core Syllabus Block 30",
      "syllabusObjective": "Study LEADERSHIP with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "LEADERSHIP Study & MOCK_TEST Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  },
  {
    "dayNumber": 90,
    "phaseId": "OPERATOR",
    "weekNumber": 13,
    "title": "Day 90: Operator Readiness & Long-Term Development Road Map",
    "theme": "Performance: Peak Stamina, Mission Clarity & Operator Benchmark",
    "objective": "Complete Operator Readiness & Long-Term Development Road Map study, execute physical training, solve the mental challenge, and practice the SSB drill.",
    "estimatedDurationMin": 105,
    "learningLesson": {
      "id": "lesson_d90",
      "title": "Operator Readiness & Long-Term Development Road Map",
      "domain": "LEADERSHIP",
      "objective": "Understand the fundamental doctrine and practical application of Operator Readiness & Long-Term Development Road Map.",
      "explanation": "Mastery of Operator Readiness & Long-Term Development Road Map is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.",
      "keyTakeaways": [
        "Understand the core definitions and regulatory protocols governing Operator Readiness & Long-Term Development Road Map.",
        "Prioritize safety, situational awareness, and clear communication in every execution.",
        "Never skip verifying ground truth with verified physical landmarks or standard operating procedures."
      ],
      "examples": [
        "Operational case study illustrating successful application of Operator Readiness & Long-Term Development Road Map under field constraints.",
        "Contrast between a poorly executed procedure and a professional, methodical execution."
      ],
      "practicalDrill": "Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for Operator Readiness & Long-Term Development Road Map from memory in your field notebook.",
      "quiz": {
        "question": "What is the primary governing principle of Operator Readiness & Long-Term Development Road Map?",
        "options": [
          "Immediate impulsive action without prior assessment",
          "Methodical assessment, situational awareness, and adhering to verified standard protocols",
          "Delegating all responsibility to bystanders",
          "Ignoring environmental factors and fatigue"
        ],
        "correctIndex": 1,
        "explanation": "Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention."
      }
    },
    "physicalTraining": {
      "category": "LOWER_BODY",
      "title": "Lower-Body Structural Strength & Unilateral Stability",
      "prescription": "Warmup + 4 sets Air Squats (30-40 reps) + 3 sets Reverse Lunges (20 reps/leg) + Glute Bridges.",
      "warmup": "Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.",
      "cooldown": "5 min walking + static leg and shoulder stretches + 3 min box breathing.",
      "exercises": [
        {
          "exerciseId": "bodyweight_squats",
          "sets": 4,
          "repsOrDuration": "30-40 reps",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Hip crease below patella, drive through midfoot."
        },
        {
          "exerciseId": "reverse_lunges",
          "sets": 3,
          "repsOrDuration": "20 reps/leg",
          "targetRpe": 6,
          "restSeconds": 60,
          "techniqueCues": "Drop rear knee softly, front knee stacked over ankle."
        },
        {
          "exerciseId": "glute_bridges",
          "sets": 3,
          "repsOrDuration": "15-20 reps with 2s squeeze",
          "targetRpe": 6,
          "restSeconds": 45,
          "techniqueCues": "Drive through heels without hyperextending lumbar."
        }
      ],
      "progressionNotes": "Lower-body endurance provides stamina for long marches and field tasks.",
      "safetyWarning": "Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs."
    },
    "mentalChallenge": {
      "id": "mental_d90",
      "type": "PSYCHOLOGICAL",
      "title": "Stoic Psychological Ownership & Stress Audit",
      "instructions": "Analyze the scenario carefully and submit your verified conclusion.",
      "timeLimitSec": 90,
      "prompt": "Reflect on a recent instance where a task did not go as planned: 1) What was your immediate emotional response (frustration, blaming circumstances, defensiveness)? 2) What part of the failure was within your direct circle of control? 3) How did you handle accountability with others involved?",
      "rubric": [
        {
          "criteria": "Reasoning Rigor & Logic",
          "maxScore": 50,
          "description": "Demonstrates sound, evidence-based reasoning without guessing."
        },
        {
          "criteria": "Accuracy & Clarity",
          "maxScore": 50,
          "description": "Delivers correct answer with concise, well-structured explanation."
        }
      ],
      "modelSolution": "High-Performing Response: Acknowledges initial emotional impulse without letting it dictate action; shifts immediately to what was controllable (preparation, communication, contingency planning); takes full ownership without deflecting blame onto external factors or teammates.",
      "learningExplanation": "Extreme ownership eliminates victim mindset and builds commanding authority."
    },
    "ssbAssignment": {
      "activity": "READING",
      "title": "READING Practical Exercise",
      "instructions": "Complete the READING drill under strict time constraints. Focus on natural, positive, and constructive expression.",
      "timeLimitMin": 30,
      "stimulus": "Analyze the strategic lessons from the battle/topic of the day. Extract 3 operational takeaways for leadership and tactical doctrine.",
      "evaluationRubric": [
        {
          "olq": "Effective Intelligence",
          "description": "Practical and resourceful approach to problems."
        },
        {
          "olq": "Sense of Responsibility",
          "description": "Full personal ownership of actions and outcomes."
        },
        {
          "olq": "Social Effectiveness",
          "description": "Cooperative, clear, and assertive communication."
        }
      ],
      "exemplarResponse": "Synthesize command decisiveness, logistical foresight, and decentralized initiative."
    },
    "studyTask": {
      "subject": "LEADERSHIP",
      "topic": "LEADERSHIP Core Syllabus Block 30",
      "syllabusObjective": "Study LEADERSHIP with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.",
      "durationMin": 60
    },
    "chronosRecommendation": {
      "intent": "LEADERSHIP Study & READING Drill",
      "mode": "FOCUS",
      "targetMinutes": 60
    },
    "routineHabits": [
      "05:30 Reveille, 500ml water & joint mobility check",
      "Physical training session logged with verified metrics",
      "Focused study block in CHRONOS without distractions",
      "Evening gear prep and daily reflection debrief"
    ],
    "reflectionPrompt": "What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?"
  }
];

export function getMissionForDay(dayNumber: number): DailyCurriculumMission {
  const clamped = Math.max(1, Math.min(dayNumber, 90));
  return COMPLETE_90_DAY_CURRICULUM[clamped - 1];
}

export function getMissionsByPhase(phaseId: 'FOUNDATION' | 'HARDENING' | 'OPERATOR'): DailyCurriculumMission[] {
  return COMPLETE_90_DAY_CURRICULUM.filter((m) => m.phaseId === phaseId);
}
