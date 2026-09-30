// ============================================================
// PHASE I: FOUNDATION CURRICULUM (DAYS 1–30)
// Establish baseline fitness, learn essential field & study skills,
// develop study discipline, and build SSB preparation foundations.
// ============================================================

import type {
  KnowledgeLesson,
  MentalChallenge,
  SSBAssignment,
  PhysicalTrainingAssignment,
  StudySubject,
} from '../types';

export interface AcademyMission {
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

export const PHASE_1_MISSIONS: AcademyMission[] = [
  // DAY 1
  {
    dayNumber: 1,
    phaseId: 'FOUNDATION',
    weekNumber: 1,
    title: 'Baseline Assessment & Map Reading Foundations',
    theme: 'Diagnostic Assessment & Orientation',
    objective: 'Establish verified physical baseline metrics, understand map orientation fundamentals, and calibrate mental focus.',
    estimatedDurationMin: 90,
    learningLesson: {
      id: 'lesson_d1',
      title: 'Topographic Map Symbols & The Three Norths',
      domain: 'NAVIGATION',
      objective: 'Identify conventional map symbols and differentiate True North, Grid North, and Magnetic North.',
      explanation: 'A topographic map is a two-dimensional scaled representation of three-dimensional terrain. Navigators must understand three distinct reference lines for North: 1) True North (the geographic direction to the North Pole along lines of longitude), 2) Grid North (the direction of vertical grid lines on the map projection), and 3) Magnetic North (the direction indicated by the compass needle pointing toward the Earth magnetic pole). The angular difference between Grid North and Magnetic North is the Grid Magnetic Angle (GMA), essential for converting map bearings to compass bearings.',
      keyTakeaways: [
        'True North = geographic pole; Grid North = map grid lines; Magnetic North = compass needle.',
        'Conventional signs use standardized colors: Blue (water), Brown (contours/relief), Green (vegetation), Black (man-made structures), Red (roads/built-up areas).',
        'Always inspect the map legend before plotting bearings.',
      ],
      examples: [
        'On a 1:50,000 Survey of India sheet, brown contour lines indicate elevation; a blue dotted line indicates a seasonal stream.',
        'If Magnetic North is 2° West of Grid North, converting a Grid Bearing of 040° to Magnetic requires adding 2° (042°).',
      ],
      practicalDrill: 'Take any local map or digital topographic sheet. Locate three natural features and three man-made features using the legend. Identify the Grid North alignment.',
      quiz: {
        question: 'Which North is represented by the vertical grid lines printed on a standard topographical map?',
        options: ['True North', 'Grid North', 'Magnetic North', 'Solar North'],
        correctIndex: 1,
        explanation: 'Grid North is the direction indicated by the vertical lines of the grid system printed directly on the map sheet.',
      },
    },
    physicalTraining: {
      category: 'BENCHMARK',
      title: 'Baseline Physical Diagnostic Battery',
      prescription: 'Warmup (8 min) + 1.6km (1 mile) Baseline Time Trial + Max Push-ups (strict form) + Plank Hold test + Cooldown.',
      warmup: 'Arm circles, leg swings, high knees, ankle rotations, and 400m easy jog.',
      cooldown: '5 minutes walking + quad, hamstring, and chest stretches + box breathing.',
      exercises: [
        {
          exerciseId: 'running_intervals',
          sets: 1,
          repsOrDuration: '1.6 km continuous run or run-walk',
          targetRpe: 7,
          restSeconds: 180,
          techniqueCues: 'Pace evenly. Do not sprint the first 400m. Record elapsed time accurately.',
        },
        {
          exerciseId: 'push_ups',
          sets: 1,
          repsOrDuration: 'Max repetitions to technical failure',
          targetRpe: 9,
          restSeconds: 120,
          techniqueCues: 'Chest touches deck (or 2 inches above), full lockout at top. If unable to do floor push-ups, test incline.',
        },
        {
          exerciseId: 'plank',
          sets: 1,
          repsOrDuration: 'Single max hold for time',
          targetRpe: 8,
          restSeconds: 90,
          techniqueCues: 'Glutes squeezed, forearms pulling to toes. Stop timer when hips sag.',
        },
      ],
      progressionNotes: 'This is a diagnostic baseline. Record your numbers honestly. We will re-test on Day 30, 60, and 90.',
      safetyWarning: 'Never exercise through sharp joint pain. If dizziness or chest tightness occurs, stop immediately.',
    },
    mentalChallenge: {
      id: 'mental_d1',
      type: 'REASONING',
      title: 'Deductive Sequence & Number Progression',
      instructions: 'Analyze the logic governing the sequence and determine the missing term.',
      timeLimitSec: 90,
      prompt: 'Identify the next number in the series: 3, 7, 15, 31, 63, ?',
      options: ['95', '125', '127', '129'],
      correctAnswer: '127',
      rubric: [
        { criteria: 'Logical Pattern Identification', maxScore: 50, description: 'Correctly recognizes the (n * 2 + 1) or powers-of-two difference rule.' },
        { criteria: 'Speed and Accuracy', maxScore: 50, description: 'Calculates the exact integer value within time constraints.' },
      ],
      modelSolution: 'The pattern adds increasing powers of 2, or each term is (2n + 1): 3*2+1=7; 7*2+1=15; 15*2+1=31; 31*2+1=63; 63*2+1=127. Alternatively, differences are +4, +8, +16, +32, so next difference is +64 (63 + 64 = 127).',
      learningExplanation: 'Number series tests measure cognitive pattern extraction and numerical fluidity under time constraints, foundational for OIR.',
    },
    ssbAssignment: {
      activity: 'OIR',
      title: 'Officers Intelligence Rating: Verbal & Non-Verbal Basics',
      instructions: 'Review OIR test formats, question types, time boundaries, and scoring percentiles (OIR 1 to 5).',
      timeLimitMin: 25,
      stimulus: 'Analyze 5 sample classification problems: Spot the odd one out among shapes, word analogies, and unfolded dice faces.',
      evaluationRubric: [
        { olq: 'Effective Intelligence', description: 'Ability to quickly identify underlying rules without guessing.' },
        { olq: 'Speed of Processing', description: 'Target solving at least 1 problem every 25-30 seconds.' },
      ],
      exemplarResponse: 'In classification, systematically test three axes: 1) Number of sides/vertices, 2) Symmetry/rotation, 3) Open vs closed contours.',
    },
    studyTask: {
      subject: 'MATHS',
      topic: 'Number Systems & Arithmetic Speed',
      syllabusObjective: 'Master fraction-decimal conversions and divisibility tests (2 through 11).',
      durationMin: 45,
    },
    chronosRecommendation: {
      intent: 'OIR Practice & Number Systems Study',
      mode: 'FOCUS',
      targetMinutes: 45,
    },
    routineHabits: [
      '05:30 Reveille & 500ml water before movement',
      'Morning baseline physical assessment with recorded times',
      'Evening gear prep and 15-minute mobility stretch',
    ],
    reflectionPrompt: 'What was your internal monologue during the final 400m of the baseline run and the final reps of the push-up test?',
  },

  // DAY 2
  {
    dayNumber: 2,
    phaseId: 'FOUNDATION',
    weekNumber: 1,
    title: 'Aerobic Base Building & Four-Figure Grid References',
    theme: 'Cardiovascular Foundation & Map Grids',
    objective: 'Learn to read four-figure grid references and execute a controlled conversational-pace aerobic run-walk session.',
    estimatedDurationMin: 85,
    learningLesson: {
      id: 'lesson_d2',
      title: 'The Military Grid System: Eastings & Northings',
      domain: 'NAVIGATION',
      objective: 'Calculate 4-figure grid references using the fundamental principle: Eastings first, Northings second.',
      explanation: 'Topographic maps are overlaid with a square coordinate grid. The vertical lines run North-South and are numbered from West to East; these are called Eastings (because their numbers increase as you go East). The horizontal lines run East-West and are numbered from South to North; these are called Northings. A 4-figure grid reference identifies a 1km x 1km grid square. The universal mnemonic is: "Read the Easting line first (bottom-left corner of square), then the Northing line" — remember "Along the corridor, then up the stairs".',
      keyTakeaways: [
        'Eastings are vertical lines running N-S, numbered west to east.',
        'Northings are horizontal lines running E-W, numbered south to north.',
        'A 4-figure grid identifies the 1km square from its bottom-left (South-West) corner.',
      ],
      examples: [
        'If a hill crest sits inside the square bounded by vertical line 24 on the west and horizontal line 87 on the south, the 4-figure reference is GR 2487.',
      ],
      practicalDrill: 'Sketch a 4x4 grid numbered 10 to 14 (Eastings) and 50 to 54 (Northings). Place 3 dots representing water tower, church, and crossroads. Write their 4-figure references.',
      quiz: {
        question: 'When reading a military grid reference, what is the golden rule for the order of coordinates?',
        options: ['Northings first, then Eastings', 'Eastings first, then Northings', 'Elevation first, then Northing', 'Magnetic bearing first'],
        correctIndex: 1,
        explanation: 'Always read Eastings first (along the corridor), followed by Northings (up the stairs).',
      },
    },
    physicalTraining: {
      category: 'AEROBIC',
      title: 'Aerobic Run-Walk Interval Protocol',
      prescription: '5 min brisk walking warmup + 2.5km total volume alternating 2 min easy jog / 1 min brisk walk + 5 min cooldown.',
      warmup: 'Dynamic leg swings (front-to-back, side-to-side), ankle mobility circles, 10 bodyweight squats.',
      cooldown: 'Static calf stretches against a wall (30s hold per side), quad stretch, hamstring stretch.',
      exercises: [
        {
          exerciseId: 'running_intervals',
          sets: 1,
          repsOrDuration: '2.5 km total distance (Zone 2 conversational pace)',
          targetRpe: 5,
          restSeconds: 60,
          techniqueCues: 'Maintain conversational pace during the run segments. If you cannot speak in full sentences, slow down.',
        },
        {
          exerciseId: 'calf_raises',
          sets: 3,
          repsOrDuration: '15 reps with 2-second pause at apex',
          targetRpe: 6,
          restSeconds: 45,
          techniqueCues: 'Press through the big toe ball of the foot. Lower under 3-second control.',
        },
      ],
      progressionNotes: 'Building aerobic capillary density takes patience. Do not turn this easy session into a race.',
      safetyWarning: 'If shin tightness or localized lower leg tenderness emerges, switch to brisk incline walking.',
    },
    mentalChallenge: {
      id: 'mental_d2',
      type: 'REASONING',
      title: 'Directional Spatial Orientation Puzzle',
      instructions: 'Track the displacement vector mentally and determine the final cardinal position.',
      timeLimitSec: 75,
      prompt: 'An observer starts at Point A. They walk 4 km North, turn right and walk 3 km, turn right again and walk 4 km, then turn left and walk 2 km. In what direction and how far are they from Point A?',
      options: ['5 km East', '5 km West', '9 km South', '7 km East'],
      correctAnswer: '5 km East',
      rubric: [
        { criteria: 'Vector Displacement Tracking', maxScore: 50, description: 'Accurately offsets North (+4) with South (-4) leaving only East components.' },
        { criteria: 'Calculated Distance', maxScore: 50, description: 'Correctly sums the East displacements: 3 km + 2 km = 5 km East.' },
      ],
      modelSolution: 'North (+4km) cancels with the second turn South (-4km). The East displacement is 3km (first right turn) + 2km (subsequent left turn) = 5km due East.',
      learningExplanation: 'Directional reasoning is directly tested in OIR and forms the mental architecture of navigation.',
    },
    ssbAssignment: {
      activity: 'PPDT',
      title: 'PPDT Picture Perception & The 1-Minute Story Arc',
      instructions: 'Study the PPDT story structure: Character identification (Age, Sex, Mood), Past (What led to the scene), Present (What the hero does), and Future (Constructive resolution).',
      timeLimitMin: 20,
      stimulus: 'Scene: Two young people standing in an agricultural field examining irrigation pipes during morning light.',
      evaluationRubric: [
        { olq: 'Social Responsibility', description: 'Hero identifies a constructive community or agricultural improvement task.' },
        { olq: 'Realistic Planning', description: 'Action plan has tangible logical steps rather than miraculous coincidences.' },
      ],
      exemplarResponse: 'Hero: Ramesh (22, Male, Positive). Engineering graduate visiting ancestral village. Identifies drip irrigation blockage, organizes village youth committee, cleans filters, ensures water flow restored.',
    },
    studyTask: {
      subject: 'GEOGRAPHY',
      topic: 'Physiography of India — Northern Mountain Walls',
      syllabusObjective: 'Learn the three parallel ranges of Himalayas (Himadri, Himachal, Shiwalik) and strategic passes.',
      durationMin: 45,
    },
    chronosRecommendation: {
      intent: 'Geography Reading & PPDT Structure',
      mode: 'FOCUS',
      targetMinutes: 45,
    },
    routineHabits: [
      '05:30 Reveille & hydration',
      'Conversational pace run-walk without stopping early',
      'Evening review of 4-figure grid references',
    ],
    reflectionPrompt: 'Did you maintain true conversational pacing during running, or did your ego push you to run too fast?',
  },

  // DAY 3
  {
    dayNumber: 3,
    phaseId: 'FOUNDATION',
    weekNumber: 1,
    title: 'Push-Up Form & DRSABCD Emergency Survey',
    theme: 'Upper Body Mechanics & Primary Life Support',
    objective: 'Master strict push-up joint mechanics and learn the life-saving DRSABCD primary first-aid survey algorithm.',
    estimatedDurationMin: 85,
    learningLesson: {
      id: 'lesson_d3',
      title: 'First Aid: The DRSABCD Primary Survey Protocol',
      domain: 'FIRST_AID',
      objective: 'Execute the seven-step primary survey algorithm in an emergency situation.',
      explanation: 'DRSABCD is the internationally recognized emergency response standard: Danger (ensure scene safety for yourself, bystanders, and casualty); Response (check consciousness via verbal cue and gentle shoulder squeeze — COWS: Can you hear me? Open your eyes, What is your name? Squeeze my hands); Send for help (call emergency services); Airway (open airway using head-tilt chin-lift unless cervical injury suspected); Breathing (look, listen, feel for normal breathing for 10 seconds); CPR (if absent/abnormal breathing, start 30 compressions to 2 rescue breaths); Defibrillator (attach AED as soon as available and follow vocal prompts).',
      keyTakeaways: [
        'Never enter an unsafe scene — rescuer safety is paramount.',
        'Agonal gasping is NOT normal breathing; it requires immediate CPR.',
        'Compression depth for adult CPR is 5-6 cm at 100-120 beats per minute.',
      ],
      examples: [
        'Encountering an unconscious person near an electrical wire: Do NOT touch them until the power source is isolated (Danger).',
      ],
      practicalDrill: 'Simulate the verbal callout and hand sequence: "Danger check -> Are you okay? -> Call ambulance -> Check mouth/airway -> Watch chest for 10s". Practice aloud 3 times.',
      quiz: {
        question: 'What is the very first action required in the DRSABCD first aid protocol before approaching a casualty?',
        options: ['Open the airway', 'Check for danger to yourself and others', 'Give two rescue breaths', 'Check for a carotid pulse'],
        correctIndex: 1,
        explanation: 'Danger is the first step: never approach a scene if electrical, fire, traffic, or toxic hazards threaten the rescuer.',
      },
    },
    physicalTraining: {
      category: 'CALISTHENICS',
      title: 'Push-Up Density & Scapular Stability Protocol',
      prescription: 'Warmup + 4 sets of 8-12 strict Push-ups (or Incline Push-ups) with 60s rest + 3 sets of 30s Forearm Planks.',
      warmup: 'Wrist circles, shoulder band pull-aparts or arm sweeps, cat-cow stretch (10 reps).',
      cooldown: 'Doorway pectoral stretch (30s each arm), child’s pose, 3 minutes box breathing.',
      exercises: [
        {
          exerciseId: 'push_ups',
          sets: 4,
          repsOrDuration: '8-12 reps with 2-second eccentric descent',
          targetRpe: 7,
          restSeconds: 60,
          techniqueCues: 'Elbows at 45 degrees. Do not let lower back arch. Regress to incline if form degrades.',
        },
        {
          exerciseId: 'plank',
          sets: 3,
          repsOrDuration: '30 seconds hold',
          targetRpe: 6,
          restSeconds: 45,
          techniqueCues: 'Tuck pelvis, contract quadriceps and glutes. Breathe rhythmically through nose.',
        },
      ],
      progressionNotes: 'Focus on perfect form over repetition count. Quality repetitions build tendon strength.',
      safetyWarning: 'If front shoulder impingement is felt, elevate hands to an incline surface immediately.',
    },
    mentalChallenge: {
      id: 'mental_d3',
      type: 'DECISION_MAKING',
      title: 'Triage Decision Under Pressure',
      instructions: 'Evaluate the emergency situation and prioritize the immediate action required.',
      timeLimitSec: 90,
      prompt: 'During an outdoor training march, a team member collapses in hot conditions. You arrive at the scene. They are conscious but incoherent, sweating profusely, with red skin and a rapid pulse. What is your prioritized first action?',
      options: [
        'Give them a large meal and painkiller medication',
        'Move them immediately to shade, elevate head slightly, loosen tight clothing, and begin active cooling with water',
        'Tell them to stand up and keep walking to prevent muscle stiffness',
        'Wait 30 minutes to see if symptoms pass before taking action',
      ],
      correctAnswer: 'Move them immediately to shade, elevate head slightly, loosen tight clothing, and begin active cooling with water',
      rubric: [
        { criteria: 'Recognition of Heat Illness', maxScore: 50, description: 'Identifies impending heat exhaustion/heat stroke.' },
        { criteria: 'Correct Immediate Remediation', maxScore: 50, description: 'Prioritizes shade, cooling, and rapid medical alerting.' },
      ],
      modelSolution: 'The casualty displays clear signs of severe heat exhaustion. Immediate removal from heat source, loosening restrictive clothing, and active external cooling (wet cloth/fanning) are critical to prevent progression to life-threatening heat stroke.',
      learningExplanation: 'Decisive situational judgment in tactical first aid requires recognizing red flags and acting decisively.',
    },
    ssbAssignment: {
      activity: 'WAT',
      title: 'Word Association Test: 15-Second Spontaneous Response',
      instructions: 'Practice 10 prompt words. Write a constructive, concise sentence within 15 seconds per word. Avoid generic quotations or preachiness.',
      timeLimitMin: 15,
      stimulus: 'Words: 1) DEFEAT  2) COURAGE  3) RULES  4) FEAR  5) LEADER  6) MISTAKE  7) TEAM  8) SYSTEM  9) DANGER  10) TIRED',
      evaluationRubric: [
        { olq: 'Mental Robustness', description: 'Turns negative/adversity trigger words into positive, problem-solving actions.' },
        { olq: 'Spontaneity & Conciseness', description: 'Answers are natural, realistic, and lack rehearsed cliches.' },
      ],
      exemplarResponse: 'Defeat: Teaches valuable lessons for subsequent victory. Mistake: Prompt acknowledgment allows corrective action. Danger: Assessed calmly and tackled methodically.',
    },
    studyTask: {
      subject: 'PHYSICS',
      topic: 'Newtonian Mechanics — Laws of Motion & Friction',
      syllabusObjective: 'Understand Newton’s Three Laws, momentum conservation, and static vs dynamic friction coefficients.',
      durationMin: 45,
    },
    chronosRecommendation: {
      intent: 'Physics Mechanics & WAT Formulation',
      mode: 'FOCUS',
      targetMinutes: 45,
    },
    routineHabits: [
      '05:30 Reveille & hydration',
      'Push-up set with strict 2-second eccentric cadence',
      'Evening review of DRSABCD steps from memory',
    ],
    reflectionPrompt: 'When doing the push-ups, did you finish every rep with full lockout or cut range of motion short when fatigue arrived?',
  },

  // DAY 4
  {
    dayNumber: 4,
    phaseId: 'FOUNDATION',
    weekNumber: 1,
    title: 'Lower-Body Foundations & Compass Bearings',
    theme: 'Squat Mechanics & Direction Finding',
    objective: 'Master bodyweight squat mechanics and understand compass components and forward bearings.',
    estimatedDurationMin: 85,
    learningLesson: {
      id: 'lesson_d4',
      title: 'The Prismatic Compass & Taking Forward Bearings',
      domain: 'NAVIGATION',
      objective: 'Identify key components of a service prismatic compass and calculate a magnetic forward bearing.',
      explanation: 'A prismatic compass consists of a magnetic needle attached to a 360-degree floating dial inside a liquid-filled housing. Key parts include the thumb ring, prism assembly, sighting slit, sighting wire on the cover lid, and directional notch. To take a forward bearing to an object: 1) Unfold compass fully; 2) Insert right thumb into thumb ring; 3) Raise compass to eye level, aligning the sighting slit, prism, and sighting wire on the target landmark; 4) Look down into the prism to read the degrees where the hair-line intersects the scale. Always step 3 meters away from metal objects, vehicles, and weapons to prevent magnetic deviation.',
      keyTakeaways: [
        'A bearing is an angle measured clockwise from North (000° to 360°).',
        'Always express bearings in three digits (e.g., 045°, 090°).',
        'Local magnetic attraction (rifles, steel buckles, fence wire) corrupts compass accuracy.',
      ],
      examples: [
        'Sighting a water tower due East yields a forward bearing of 090°. The reciprocal back bearing is 270° (090° + 180°).',
      ],
      practicalDrill: 'Hold an imaginary compass: practice the two-hand grip, sighting through thumb ring and prism. Calculate the back bearing for 035° and 215°.',
      quiz: {
        question: 'What is the back bearing (reciprocal) for a forward bearing of 040 degrees?',
        options: ['140 degrees', '220 degrees', '310 degrees', '080 degrees'],
        correctIndex: 1,
        explanation: 'For bearings less than 180°, add 180°: 040° + 180° = 220°.',
      },
    },
    physicalTraining: {
      category: 'LOWER_BODY',
      title: 'Squat Depth & Glute Activation Protocol',
      prescription: 'Warmup + 4 sets of 15 Bodyweight Air Squats + 3 sets of 15 Glute Bridges + 5 min joint mobility cooldown.',
      warmup: 'Cat-cow, 10 hip openers, 20 high knees, 15 ankle pumps.',
      cooldown: 'Deep squat pry hold (45s), seated butterfly stretch, standing quad stretch.',
      exercises: [
        {
          exerciseId: 'bodyweight_squats',
          sets: 4,
          repsOrDuration: '15 reps with hip crease below patella',
          targetRpe: 6,
          restSeconds: 60,
          techniqueCues: 'Chest up, knees tracking in line with toes. Push through midfoot and heel.',
        },
        {
          exerciseId: 'glute_bridges',
          sets: 3,
          repsOrDuration: '15 reps with 2-second hold at peak extension',
          targetRpe: 6,
          restSeconds: 45,
          techniqueCues: 'Drive through heels. Do not hyperextend lumbar spine.',
        },
      ],
      progressionNotes: 'Squat depth should be earned with mobility. If heels rise, place a 1-inch book under heels temporarily.',
      safetyWarning: 'Never allow knees to buckle inward (valgus collapse) on ascent.',
    },
    mentalChallenge: {
      id: 'mental_d4',
      type: 'REASONING',
      title: 'Reciprocal Angle & Geometric Reasoning',
      instructions: 'Apply reciprocal angular logic to calculate navigation path shifts.',
      timeLimitSec: 60,
      prompt: 'A patrol marches on a bearing of 290 degrees for 3 kilometers, realizes an obstacle is ahead, and must reverse direction along their exact original path. What bearing must they march on to return to their start point?',
      options: ['110 degrees', '120 degrees', '200 degrees', '090 degrees'],
      correctAnswer: '110 degrees',
      rubric: [
        { criteria: 'Reciprocal Bearing Rule Application', maxScore: 50, description: 'Applies (Angle - 180) rule for bearings over 180 degrees.' },
        { criteria: 'Exact Calculation', maxScore: 50, description: '290° - 180° = 110°.' },
      ],
      modelSolution: 'Since 290° is greater than 180°, subtract 180°: 290° - 180° = 110°.',
      learningExplanation: 'Back bearings are vital for dead reckoning, resection, and backtracking in navigation.',
    },
    ssbAssignment: {
      activity: 'SRT',
      title: 'Situation Reaction Test: Practicality & Decisiveness',
      instructions: 'Respond to 3 SRT scenarios. Write actionable, telegrammatic sentences. Do not postpone action or write "I will call the police" as your sole step.',
      timeLimitMin: 15,
      stimulus: '1) You are leading a college cycling trip. A member slips and breaks their ankle on a deserted mountain road with no phone signal. You...\n2) During an examination, you notice the invigilator wrongly accuses your friend of cheating. You...\n3) You discover that your project partner has submitted plagiarized content on the eve of the final deadline. You...',
      evaluationRubric: [
        { olq: 'Initiative & Resourcefulness', description: 'Acts immediately with materials on hand before seeking outside aid.' },
        { olq: 'Moral Courage', description: 'Stands up for truth and fairness constructively.' },
      ],
      exemplarResponse: '1) Splinted broken ankle with sticks and bandage, assigned buddy to stay with casualty in warm jacket, cycled to nearest village outpost, brought vehicle, evacuated to clinic.',
    },
    studyTask: {
      subject: 'CURRENT_AFFAIRS',
      topic: 'Strategic Security — Indian Coastal & Maritime Defense',
      syllabusObjective: 'Learn India’s coastal security grid (Navy, Coast Guard, Marine Police) and SAGAR doctrine.',
      durationMin: 45,
    },
    chronosRecommendation: {
      intent: 'Coastal Defense Notes & SRT Writing',
      mode: 'FOCUS',
      targetMinutes: 45,
    },
    routineHabits: [
      '05:30 Reveille & hydration',
      'Air squat set with strict depth',
      'Evening mental calculation of 5 compass back bearings',
    ],
    reflectionPrompt: 'In the SRT responses, did you take personal ownership of the situation, or did you pass responsibility to someone else?',
  },

  // DAY 5
  {
    dayNumber: 5,
    phaseId: 'FOUNDATION',
    weekNumber: 1,
    title: 'Core Stability & Bleeding Control First Aid',
    theme: 'Trunk Rigidity & Hemorrhage Management',
    objective: 'Build anti-extension core endurance and master the direct pressure and wound packing protocol for hemorrhage control.',
    estimatedDurationMin: 85,
    learningLesson: {
      id: 'lesson_d5',
      title: 'Emergency Hemorrhage Control: Pressure, Elevation & Tourniquets',
      domain: 'FIRST_AID',
      objective: 'Apply the clinical sequence to stop external arterial and venous bleeding.',
      explanation: 'Uncontrolled bleeding is the leading cause of preventable trauma death. The first line of defense is firm, relentless Direct Pressure over the bleeding wound using sterile gauze or clean cloth. Maintain continuous pressure for at least 5-10 minutes without lifting gauze to "check". If blood soaks through, do NOT remove the original dressing; add more layers on top. For life-threatening arterial limb bleeding (bright red, pulsating/spurting) where direct pressure fails, apply a commercial windlass tourniquet 2-3 inches above the wound (never over a joint), tighten until bleeding stops, and mark the exact time of application on the casualty forehead.',
      keyTakeaways: [
        'Direct pressure stops >90% of external hemorrhage.',
        'Never peel off soaked dressings — add fresh dressings over top.',
        'Tourniquets are for life-threatening limb hemorrhage; record application time immediately.',
      ],
      examples: [
        'Deep forearm cut from broken glass: Apply firm direct pressure with palms, elevate limb above heart level if no fracture suspected.',
      ],
      practicalDrill: 'Simulate applying a pressure dressing to your forearm using a roll of bandage: apply direct firm compression, wrap circumferentially with overlapping layers, and test distal finger pulse.',
      quiz: {
        question: 'If blood soaks through the first dressing applied to a severely bleeding wound, what should you do?',
        options: [
          'Remove the dressing immediately and wash the wound with cold water',
          'Leave the original dressing in place and apply fresh absorbent dressings firmly over it',
          'Apply ice directly to the raw tissue',
          'Stop pressing and let the blood clot naturally',
        ],
        correctIndex: 1,
        explanation: 'Removing dressings pulls away early clotting factors. Always add new dressings on top while maintaining firm continuous pressure.',
      },
    },
    physicalTraining: {
      category: 'CORE',
      title: 'Pillar Core Endurance Protocol',
      prescription: 'Warmup + 3 sets of 40s Forearm Plank + 3 sets of 25s Side Plank per side + 3 sets of 15 Bird-Dog holds.',
      warmup: 'Cat-cow, shoulder rolls, 10 air squats, wrist warmups.',
      cooldown: 'Cobra / sphinx stretch, child’s pose, 5 minutes diaphragmatic breathing.',
      exercises: [
        {
          exerciseId: 'plank',
          sets: 3,
          repsOrDuration: '40 seconds hold',
          targetRpe: 7,
          restSeconds: 45,
          techniqueCues: 'Elbows under shoulders, pull forearms toward feet to engage lats and anterior core.',
        },
        {
          exerciseId: 'side_plank',
          sets: 3,
          repsOrDuration: '25 seconds per side',
          targetRpe: 7,
          restSeconds: 45,
          techniqueCues: 'Stack feet, lift bottom hip high, keep body in a razor-straight plane.',
        },
      ],
      progressionNotes: 'Core strength is not about crunches; it is about resisting movement (anti-extension and anti-lateral flexion).',
      safetyWarning: 'If lower back pinches during plank, terminate the set and check pelvis tuck.',
    },
    mentalChallenge: {
      id: 'mental_d5',
      type: 'CRITICAL_THINKING',
      title: 'Evaluating Evidence vs Supposition',
      instructions: 'Distinguish factual statements from unverified inferences.',
      timeLimitSec: 90,
      prompt: 'Report: "Patrol Alpha arrived at Grid 4532 at 0600 hrs and found fresh campfire ashes and three discarded water bottles of brand X. Brand X is sold exclusively in Town B, 15 km away." Which of the following is an incontrovertible FACT derived strictly from the text?',
      options: [
        'A team of three enemy infiltrators from Town B spent the night at Grid 4532.',
        'Campfire ashes and three brand X bottles were physically present at Grid 4532 at 0600 hrs.',
        'The individuals who drank the water are currently inside Town B.',
        'Brand X is the preferred water brand for military scouts.',
      ],
      correctAnswer: 'Campfire ashes and three brand X bottles were physically present at Grid 4532 at 0600 hrs.',
      rubric: [
        { criteria: 'Factual Isolation', maxScore: 50, description: 'Separates observed ground truth from speculative theories.' },
        { criteria: 'Avoiding Assumptions', maxScore: 50, description: 'Rejects theories about number of people or intentions that were not explicitly proven.' },
      ],
      modelSolution: 'The only proven fact is that campfire ashes and 3 bottles were found at 0600 hrs at Grid 4532. Inferring the identity, nationality, or present location of the persons is an unverified hypothesis.',
      learningExplanation: 'Distinguishing fact from assumption is the cornerstone of military intelligence and sound leadership judgment.',
    },
    ssbAssignment: {
      activity: 'TAT',
      title: 'TAT Story Construction: The 3-Part Architecture',
      instructions: 'Learn the TAT framework: 1) What led to the situation (Past); 2) What is happening currently with the hero showing initiative (Present); 3) Positive, realistic culmination (Future). Avoid accidental deaths, murders, or unrealistic superpowers.',
      timeLimitMin: 20,
      stimulus: 'TAT Picture Prompt: A young man looking at blueprints laid across a rustic wooden table under a hanging lantern.',
      evaluationRubric: [
        { olq: 'Planning & Organizing', description: 'Hero demonstrates methodical preparation and resource allocation.' },
        { olq: 'Social Adaptability', description: 'Engages colleagues or community members to achieve a shared objective.' },
      ],
      exemplarResponse: 'Vikram, a civil engineering diploma holder, working on a rural bridge project after flood damage. Studies terrain contours, coordinates with local panchayat for labor and gravel, oversees foundation work, and completes bridge ahead of monsoon.',
    },
    studyTask: {
      subject: 'MILITARY_HISTORY',
      topic: '1971 Liberation War — Battle of Longewala',
      syllabusObjective: 'Analyze the defensive stand of 23 Punjab under Maj K.S. Chandpuri and IAF Hunter air strikes.',
      durationMin: 45,
    },
    chronosRecommendation: {
      intent: '1971 Longewala Case Study & TAT Drafting',
      mode: 'FOCUS',
      targetMinutes: 45,
    },
    routineHabits: [
      '05:30 Reveille & hydration',
      'Flawless core plank session without hip sag',
      'Evening debrief & reading on Longewala battle tactics',
    ],
    reflectionPrompt: 'When writing your TAT story, did your hero wait for orders or take positive initiative?',
  },

  // DAY 6
  {
    dayNumber: 6,
    phaseId: 'FOUNDATION',
    weekNumber: 1,
    title: 'Vertical Pulling Progressions & The Cornell Method',
    theme: 'Pull Mechanics & Academic Note-Taking',
    objective: 'Develop vertical pulling strength through dead hangs/incline rows and adopt the structured Cornell note-taking system.',
    estimatedDurationMin: 80,
    learningLesson: {
      id: 'lesson_d6',
      title: 'The Cornell Note-Taking System for Dense Study',
      domain: 'PLANNING',
      objective: 'Structure study notes into Cue, Note, and Summary zones to maximize retention and rapid recall.',
      explanation: 'Devised by Prof. Walter Pauk at Cornell University, this systematic format divides a page into three distinct sections: 1) Notes Column (right 70% width): Record concise telegraphic notes, definitions, diagrams, and main ideas during study; 2) Cue Column (left 30% width): Formulate quiz questions, keywords, and potential test prompts corresponding to the notes; 3) Summary Area (bottom 5-7 lines): Synthesize the core concept in 1-2 sentences in your own words. During revision, cover the Notes column and recite answers using only the Cue column prompts.',
      keyTakeaways: [
        'Right column: Concise notes during study.',
        'Left column: Self-testing cues and keywords written immediately after study.',
        'Bottom banner: 2-sentence synthesis.',
        'Active recall using the cue column increases long-term retention by >50%.',
      ],
      examples: [
        'Studying First Aid: Cue = "What does D in DRSABCD stand for?"; Notes = "Danger: ensure scene safety for self, bystanders, casualty before entering."',
      ],
      practicalDrill: 'Take a blank paper sheet. Draw a vertical line 2.5 inches from the left margin, and a horizontal line 2 inches from the bottom. Summarize today’s military history lesson using this format.',
      quiz: {
        question: 'When using the Cornell note-taking method, what is the primary purpose of the left-hand column?',
        options: [
          'Writing full word-for-word transcriptions',
          'Formulating recall questions, cues, and key trigger words',
          'Drawing decorative margins',
          'Listing page numbers exclusively',
        ],
        correctIndex: 1,
        explanation: 'The left column contains cues and questions designed to enable active recall testing during revision.',
      },
    },
    physicalTraining: {
      category: 'CALISTHENICS',
      title: 'Pull-Up Progression & Scapular Pulls',
      prescription: 'Warmup + 4 sets of 20-30s Dead Hangs (or Assisted Pull-ups 4-6 reps) + 3 sets of 10 Inverted Rows + Cooldown.',
      warmup: 'Shoulder dislocates with towel/band, arm swings, wrist rotations, 10 cat-cows.',
      cooldown: 'Latissimus dorsi stretch against a post (30s per side), doorframe chest stretch, box breathing.',
      exercises: [
        {
          exerciseId: 'assisted_pull_ups',
          sets: 4,
          repsOrDuration: '25-second active dead hang (shoulder blades packed)',
          targetRpe: 7,
          restSeconds: 90,
          techniqueCues: 'Overhand grip. Do not hang passively in shoulder joints; pull shoulder blades down and back.',
        },
        {
          exerciseId: 'reverse_lunges',
          sets: 3,
          repsOrDuration: '10 reps per leg',
          targetRpe: 6,
          restSeconds: 60,
          techniqueCues: 'Step back softly. Front knee directly over ankle.',
        },
      ],
      progressionNotes: 'Grip strength and scapular control are the building blocks of pull-up mastery.',
      safetyWarning: 'Do not drop suddenly into dead hang lockout. Lower under muscular control.',
    },
    mentalChallenge: {
      id: 'mental_d6',
      type: 'MEMORY',
      title: 'Observation & Immediate Recall (Kim’s Game Foundations)',
      instructions: 'Study the observation stimulus for 60 seconds, then recall all items from memory.',
      timeLimitSec: 120,
      prompt: 'Memorize this 8-item patrol equipment list: 1) Silva Compass, 2) Prismatic Monocular (8x30), 3) Green Chem-light, 4) 1:50k Topo Sheet (Sheet 53D/12), 5) Triangular Bandage, 6) Whistle, 7) 2B Marking Pencil, 8) Insect Repellent Bottle. Close your eyes. Write down all 8 items and their specific details.',
      rubric: [
        { criteria: 'Item Recall', maxScore: 60, description: 'Recalls all 8 items accurately without omission.' },
        { criteria: 'Detail Precision', maxScore: 40, description: 'Retains specific attributes (8x30, Sheet 53D/12, 2B).' },
      ],
      modelSolution: 'All 8 items: Silva Compass; Prismatic Monocular (8x30); Green Chem-light; 1:50k Topo Sheet (Sheet 53D/12); Triangular Bandage; Whistle; 2B Marking Pencil; Insect Repellent Bottle.',
      learningExplanation: 'Kim’s Game sharpens short-term working memory and observational discipline, essential for fieldcraft and GTO tasks.',
    },
    ssbAssignment: {
      activity: 'INTERVIEW',
      title: 'Personal Information Questionnaire (PIQ) Self-Audit',
      instructions: 'Draft your personal introductory statement: Educational trajectory, family background, extracurricular participation, sports, and reasons for aspiring to serve.',
      timeLimitMin: 25,
      stimulus: 'Structure: 1) Academic background & key achievements; 2) Sports & physical activities played regularly; 3) Leadership responsibilities held; 4) Hobbies & interests with genuine depth.',
      evaluationRubric: [
        { olq: 'Self-Awareness', description: 'Honest appraisal of strengths and genuine areas of ongoing self-improvement.' },
        { olq: 'Clarity of Expression', description: 'Concise speech free of filler words (um, uh, basically).' },
      ],
      exemplarResponse: 'Speak in structured bullet points. State facts, verified percentages, specific positions of responsibility held, and concrete books read.',
    },
    studyTask: {
      subject: 'ENGLISH',
      topic: 'Military Phrasing & Concise Active Vocabulary',
      syllabusObjective: 'Learn 15 high-utility adjectives and verbs for concise briefing (e.g., spearheaded, mitigated, coordinated).',
      durationMin: 45,
    },
    chronosRecommendation: {
      intent: 'Cornell Note Practice & PIQ Drafting',
      mode: 'FOCUS',
      targetMinutes: 45,
    },
    routineHabits: [
      '05:30 Reveille & hydration',
      'Dead hang sets completed with packed shoulders',
      'One complete study page written in Cornell format',
    ],
    reflectionPrompt: 'When testing your memory on the 8 items, what technique did you use? Did you group items into categories?',
  },

  // DAY 7
  {
    dayNumber: 7,
    phaseId: 'FOUNDATION',
    weekNumber: 1,
    title: 'Active Recovery, Weekly Review & Tactical Down-Regulation',
    theme: 'Restoration, Deload & Performance Assessment',
    objective: 'Execute full restorative mobility flow, conduct a Week 1 curriculum audit, and master tactical box breathing.',
    estimatedDurationMin: 60,
    learningLesson: {
      id: 'lesson_d7',
      title: 'Principles of Physical & Mental Deloading',
      domain: 'LEADERSHIP',
      objective: 'Understand why planned recovery prevents overtraining syndrome and strengthens neural consolidation.',
      explanation: 'Training does not make you stronger; recovery from training makes you stronger. When we exercise, we induce controlled micro-tears in muscle tissue and generate central nervous system (CNS) fatigue. Without adequate recovery, physiological cortisol remains elevated, leading to sleep disruption, immune suppression, and injury (overtraining syndrome). A dedicated weekly active recovery session promotes blood flow, clears metabolic byproducts, and restores soft-tissue elasticity. Pair physical deloading with cognitive consolidation: review all notes from Days 1-6 using active recall.',
      keyTakeaways: [
        'Supercompensation occurs during deep sleep and active rest.',
        'Active recovery (light movement + stretching) accelerates tissue repair faster than total couch immobility.',
        'Never skip planned deload days.',
      ],
      examples: [
        'Light 20-minute walk + 15 minutes joint mobility flow reduces muscle soreness (DOMS) by over 40% compared to sedentary rest.',
      ],
      practicalDrill: 'Perform 10 continuous minutes of Box Breathing (4 seconds in, 4 hold, 4 out, 4 empty) in a quiet, dark room.',
      quiz: {
        question: 'What physiological process occurs during planned rest days that leads to increased strength and stamina?',
        options: ['Muscle atrophy', 'Supercompensation and tissue repair', 'Lactic acid buildup', 'Electrolyte depletion'],
        correctIndex: 1,
        explanation: 'Supercompensation is the adaptive process where the body repairs tissue stronger than its prior baseline during adequate rest.',
      },
    },
    physicalTraining: {
      category: 'RECOVERY',
      title: 'Full Body Joint Mobility & Myofascial Flow',
      prescription: '15 minutes guided mobility flow (World’s Greatest Stretch, Cat-Cow, Deep Squat Pry, 90/90 Hips) + 10 minutes Box Breathing.',
      warmup: '5 minutes easy brisk stroll in fresh air.',
      cooldown: 'Legs-up-the-wall pose (5 minutes) for venous pooling return.',
      exercises: [
        {
          exerciseId: 'mobility_flow',
          sets: 1,
          repsOrDuration: '15 minutes continuous flow',
          targetRpe: 3,
          restSeconds: 0,
          techniqueCues: 'Move smoothly with breath. Pause and breathe into areas of tension.',
        },
        {
          exerciseId: 'box_breathing',
          sets: 1,
          repsOrDuration: '10 minutes (approx 20 breath cycles)',
          targetRpe: 1,
          restSeconds: 0,
          techniqueCues: 'Inhale 4s through nose, hold 4s, exhale 4s, hold empty 4s. Relax facial muscles.',
        },
      ],
      progressionNotes: 'Recovery is a discipline, not laziness. Treat this session with the same precision as a run trial.',
      safetyWarning: 'Never aggressively force a tight muscle into painful overstretch.',
    },
    mentalChallenge: {
      id: 'mental_d7',
      type: 'PSYCHOLOGICAL',
      title: 'Week 1 Stoic Self-Assessment & Honest Accountability',
      instructions: 'Answer the 3 self-accountability questions with unvarnished honesty.',
      timeLimitSec: 180,
      prompt: 'Reflect on Days 1 to 6: 1) Which single task did you approach with resistance or attempt to take a shortcut on? 2) How did you manage your time when distractions arose? 3) What is one tangible standard you will raise in Week 2?',
      rubric: [
        { criteria: 'Self-Awareness and Honesty', maxScore: 50, description: 'Acknowledges weaknesses without defensive rationalization.' },
        { criteria: 'Actionable Improvement Plan', maxScore: 50, description: 'Defines concrete, measurable standards for the upcoming week.' },
      ],
      modelSolution: 'Candidate identifies exact moments of procrastination or fatigue and lays out clear preventive measures (e.g. laying kit out the night before, removing phone during study blocks).',
      learningExplanation: 'Self-examination without ego enables officers to correct small errors before they compound into critical failures.',
    },
    ssbAssignment: {
      activity: 'READING',
      title: 'Weekly National Security Editorial Analysis',
      instructions: 'Read an authoritative editorial on Indian defense diplomacy or border logistics. Extract 3 core arguments and 1 counter-perspective.',
      timeLimitMin: 25,
      stimulus: 'Analyze the strategic significance of the Siliguri Corridor (Chicken’s Neck) and current infrastructure initiatives.',
      evaluationRubric: [
        { olq: 'Effective Intelligence', description: 'Grasps the geopolitical vulnerability and logistical solutions.' },
        { olq: 'Depth of Knowledge', description: 'Retains key distances, neighboring boundaries (Nepal, Bhutan, Bangladesh), and road/rail corridors.' },
      ],
      exemplarResponse: 'Identify Siliguri width (approx 22km at narrowest), connectivity to 8 Northeastern states, alternative multimodal transit via Bangladesh (Chittagong port), and mountain strike corps positioning.',
    },
    studyTask: {
      subject: 'LEADERSHIP',
      topic: 'The 15 Officer-Like Qualities (OLQ) Overview',
      syllabusObjective: 'Memorize and understand the four factor categories of OLQs: Planning & Organizing, Social Adjustment, Social Effectiveness, and Dynamic.',
      durationMin: 45,
    },
    chronosRecommendation: {
      intent: 'Week 1 Knowledge Consolidation & OLQ Review',
      mode: 'FOCUS',
      targetMinutes: 45,
    },
    routineHabits: [
      '06:00 Gentle reveille & deep hydration',
      '15 minutes joint mobility flow completed',
      'Gear inspection, notebook audit, and Week 2 planning',
    ],
    reflectionPrompt: 'Looking at your Week 1 training log: did you train as the person you wish to become, or did you settle for the bare minimum?',
  },
];
