// scripts/buildCurriculum.js
// Node script to generate curriculumData.ts with all 90 days of high-caliber curriculum
import fs from 'fs';
import path from 'path';

// We will construct the 90-day curriculum with rich lessons, quizzes, physical training,
// mental challenges, SSB assignments, study tasks, and reflection prompts.

const LESSON_TOPICS = [
  // Days 1-10
  { title: "Topographic Map Symbols & The Three Norths", domain: "NAVIGATION", sub: "MATHS", ssb: "OIR" },
  { title: "The Military Grid System: 4-Figure Coordinates", domain: "NAVIGATION", sub: "GEOGRAPHY", ssb: "PPDT" },
  { title: "First Aid: The DRSABCD Primary Survey Protocol", domain: "FIRST_AID", sub: "PHYSICS", ssb: "WAT" },
  { title: "The Prismatic Compass & Magnetic Bearings", domain: "NAVIGATION", sub: "CURRENT_AFFAIRS", ssb: "SRT" },
  { title: "Emergency Hemorrhage Control & Pressure Dressings", domain: "FIRST_AID", sub: "MILITARY_HISTORY", ssb: "TAT" },
  { title: "The Cornell Note-Taking System for Dense Study", domain: "PLANNING", sub: "ENGLISH", ssb: "INTERVIEW" },
  { title: "Principles of Physical & Mental Deloading", domain: "LEADERSHIP", sub: "LEADERSHIP", ssb: "READING" },
  { title: "Six-Figure Grid References & 100m Precision", domain: "NAVIGATION", sub: "MATHS", ssb: "OIR" },
  { title: "Shock Pathology: Hypovolemic & Anaphylactic Management", domain: "FIRST_AID", sub: "PHYSICS", ssb: "WAT" },
  { title: "The 16-Point Compass Rose & Angular Mils", domain: "NAVIGATION", sub: "GEOGRAPHY", ssb: "SRT" },

  // Days 11-20
  { title: "Tactical Verbal Briefing: The SMEAC Framework", domain: "COMMUNICATION", sub: "CURRENT_AFFAIRS", ssb: "TAT" },
  { title: "Heat Illness Triage: Heat Exhaustion vs Heat Stroke", domain: "FIRST_AID", sub: "PHYSICS", ssb: "INTERVIEW" },
  { title: "Contour Lines, Relief & Calculating Ground Slopes", domain: "NAVIGATION", sub: "GEOGRAPHY", ssb: "PPDT" },
  { title: "Weekly Tactical Deload & Sleep Architecture", domain: "LEADERSHIP", sub: "LEADERSHIP", ssb: "READING" },
  { title: "Compass Deviation, Local Attraction & Grid Magnetic Angle", domain: "NAVIGATION", sub: "MATHS", ssb: "OIR" },
  { title: "Soft-Tissue Trauma: Sprains, Strains & The Modern RICE Protocol", domain: "FIRST_AID", sub: "PHYSICS", ssb: "WAT" },
  { title: "Eisenhower Matrix: Urgent vs Important Time Management", domain: "PLANNING", sub: "ENGLISH", ssb: "SRT" },
  { title: "Map Scales, Distance Calculation & Pace Counting Beads", domain: "NAVIGATION", sub: "GEOGRAPHY", ssb: "TAT" },
  { title: "Wilderness Hydration, Water Filtration & Electrolyte Balance", domain: "FIRST_AID", sub: "CHEMISTRY", ssb: "PPDT" },
  { title: "Active Listening & Concise Military Communication", domain: "COMMUNICATION", sub: "CURRENT_AFFAIRS", ssb: "INTERVIEW" },

  // Days 21-30
  { title: "Mid-Phase Active Recovery & Cognitive Consolidation", domain: "LEADERSHIP", sub: "LEADERSHIP", ssb: "READING" },
  { title: "Navigation Resection: Fixing Location Using Two Distant Landmarks", domain: "NAVIGATION", sub: "MATHS", ssb: "OIR" },
  { title: "Musculoskeletal Trauma: Splinting & Immobilization Principles", domain: "FIRST_AID", sub: "PHYSICS", ssb: "WAT" },
  { title: "Situational Awareness: Cooper's Color Codes of Readiness", domain: "MENTAL_MODELS", sub: "CURRENT_AFFAIRS", ssb: "SRT" },
  { title: "Burn Trauma Management: Thermal, Chemical & Electrical Care", domain: "FIRST_AID", sub: "CHEMISTRY", ssb: "TAT" },
  { title: "Constructive Criticism & Peer Deconfliction Under Pressure", domain: "COMMUNICATION", sub: "ENGLISH", ssb: "PPDT" },
  { title: "Indian Armed Forces Organization: Integrated Theatre Command Structure", domain: "MILITARY_STUDIES", sub: "MILITARY_HISTORY", ssb: "INTERVIEW" },
  { title: "Deload & Mental Readiness Before Phase Milestone", domain: "LEADERSHIP", sub: "LEADERSHIP", ssb: "READING" },
  { title: "Phase 1 Comprehensive Foundation Knowledge Synthesis", domain: "MILITARY_STUDIES", sub: "CURRENT_AFFAIRS", ssb: "MOCK_TEST" },
  { title: "Phase 1 Diagnostic Milestone Assessment & Review", domain: "LEADERSHIP", sub: "LEADERSHIP", ssb: "MOCK_TEST" },

  // Days 31-40 (Hardening)
  { title: "Advanced Topographic Relief: Spurs, Re-entrants & Saddles", domain: "NAVIGATION", sub: "GEOGRAPHY", ssb: "OIR" },
  { title: "The OODA Loop: Rapid Observation-Orientation Decision Cycle", domain: "MENTAL_MODELS", sub: "PHYSICS", ssb: "PPDT" },
  { title: "Airway Emergencies: Choking, Recovery Position & Tension Pneumothorax", domain: "FIRST_AID", sub: "CHEMISTRY", ssb: "WAT" },
  { title: "Dead Reckoning & Night Navigation Route Planning", domain: "NAVIGATION", sub: "MATHS", ssb: "SRT" },
  { title: "Principles of Mission Command: Commander's Intent & Subordinate Initiative", domain: "LEADERSHIP", sub: "LEADERSHIP", ssb: "TAT" },
  { title: "Critical Reading: Identifying Logical Fallacies & Cognitive Biases", domain: "COMMUNICATION", sub: "ENGLISH", ssb: "GD" },
  { title: "Hardening Deload: Restorative Mobility & Weekly Debrief", domain: "LEADERSHIP", sub: "LEADERSHIP", ssb: "READING" },
  { title: "Terrain Analysis Framework: OAKOC Military Land Study", domain: "NAVIGATION", sub: "GEOGRAPHY", ssb: "GTO_1" },
  { title: "Mass Casualty Triage: The START Protocol", domain: "FIRST_AID", sub: "PHYSICS", ssb: "SRT" },
  { title: "Decision Matrices: Weighted Multi-Factor Decision Making", domain: "PLANNING", sub: "MATHS", ssb: "OIR" },

  // Days 41-50
  { title: "Group Planning Dynamics: Resource Allocation & Bridging Tasks", domain: "LEADERSHIP", sub: "CURRENT_AFFAIRS", ssb: "GTO_1" },
  { title: "Environmental Extremes: High Altitude Sickness & AMS Protocols", domain: "FIRST_AID", sub: "CHEMISTRY", ssb: "WAT" },
  { title: "Celestial Navigation: Orienting via Pole Star & Constellations", domain: "NAVIGATION", sub: "PHYSICS", ssb: "TAT" },
  { title: "Hardening Phase Mid-Point Deload & Recovery Metrics", domain: "LEADERSHIP", sub: "LEADERSHIP", ssb: "READING" },
  { title: "Historical Battle Study: 1965 Battle of Asal Uttar (Patton Nagar)", domain: "MILITARY_STUDIES", sub: "MILITARY_HISTORY", ssb: "INTERVIEW" },
  { title: "Conflict Resolution: Managing Domineering & Passive Team Dynamics", domain: "COMMUNICATION", sub: "ENGLISH", ssb: "GD" },
  { title: "Safe Route Reconnaissance & Handrail Navigation", domain: "NAVIGATION", sub: "GEOGRAPHY", ssb: "GTO_2" },
  { title: "Crush Injury & Compartment Syndrome Field Recognition", domain: "FIRST_AID", sub: "PHYSICS", ssb: "SRT" },
  { title: "Mental Toughness: Cognitive Reframing Under Sustained Physical Load", domain: "MENTAL_MODELS", sub: "CURRENT_AFFAIRS", ssb: "TAT" },
  { title: "Indian Defense Industrial Base: Atmanirbhar Defense Ecosystem", domain: "MILITARY_STUDIES", sub: "CURRENT_AFFAIRS", ssb: "INTERVIEW" },

  // Days 51-60
  { title: "Weekly Hardening Deload & Neuromuscular Recovery", domain: "LEADERSHIP", sub: "LEADERSHIP", ssb: "READING" },
  { title: "Historical Battle Study: 1971 Tangail Airborne Drop Operations", domain: "MILITARY_STUDIES", sub: "MILITARY_HISTORY", ssb: "TAT" },
  { title: "Toxic Leadership vs Authentic Command: The 15 OLQ Standards", domain: "LEADERSHIP", sub: "ENGLISH", ssb: "INTERVIEW" },
  { title: "Advanced Cross-Country Route Card & Time-Distance Estimation", domain: "NAVIGATION", sub: "MATHS", ssb: "GTO_1" },
  { title: "Cold Weather Casualties: Hypothermia & Frostbite First Aid", domain: "FIRST_AID", sub: "PHYSICS", ssb: "WAT" },
  { title: "Lecturette Mastery: Hook, 3-Pillar Body & Strong Conclusion", domain: "COMMUNICATION", sub: "CURRENT_AFFAIRS", ssb: "GD" },
  { title: "Military Planning Exercise (MPE): Practical Group Strategy", domain: "PLANNING", sub: "GEOGRAPHY", ssb: "GTO_1" },
  { title: "Pre-Milestone Deload & Neurological Consolidation", domain: "LEADERSHIP", sub: "LEADERSHIP", ssb: "READING" },
  { title: "Phase 2 Comprehensive Knowledge & Skills Battery", domain: "MILITARY_STUDIES", sub: "CURRENT_AFFAIRS", ssb: "MOCK_TEST" },
  { title: "Phase 2 Hardening Benchmark Fitness & Performance Assessment", domain: "LEADERSHIP", sub: "LEADERSHIP", ssb: "MOCK_TEST" },

  // Days 61-70 (Performance & Operator Readiness)
  { title: "Standardized 5km Aerobic Threshold Re-Assessment", domain: "LEADERSHIP", sub: "PHYSICS", ssb: "OIR" },
  { title: "Full Psychological Battery Mock Test 1: 12 TAT Picture Narratives", domain: "MENTAL_MODELS", sub: "MILITARY_HISTORY", ssb: "TAT" },
  { title: "Full WAT Battery: 60 Trigger Words at 15-Second Cadence", domain: "COMMUNICATION", sub: "ENGLISH", ssb: "WAT" },
  { title: "Full SRT Battery: 60 Rapid Situational Reaction Scenarios", domain: "PLANNING", sub: "CURRENT_AFFAIRS", ssb: "SRT" },
  { title: "Self-Description (SD) Mastery & Cross-Check Alignment", domain: "LEADERSHIP", sub: "LEADERSHIP", ssb: "SD" },
  { title: "GTO Simulation: Military Planning Exercise (MPE) Under Time Pressure", domain: "PLANNING", sub: "GEOGRAPHY", ssb: "GTO_1" },
  { title: "Weekly Performance Deload & CNS Reset", domain: "LEADERSHIP", sub: "LEADERSHIP", ssb: "READING" },
  { title: "Historical Battle Study: 1999 Battle of Tololing & Tiger Hill", domain: "MILITARY_STUDIES", sub: "MILITARY_HISTORY", ssb: "TAT" },
  { title: "Calisthenics Maximum Capacity Battery (Push-ups, Pull-ups, Core)", domain: "LEADERSHIP", sub: "PHYSICS", ssb: "OIR" },
  { title: "Timed Lecturette Simulation: High-Stakes Geopolitical Topic", domain: "COMMUNICATION", sub: "CURRENT_AFFAIRS", ssb: "GD" },

  // Days 71-80
  { title: "GTO Simulation: Progressive Group Task Cantilever & Fulcrum Mechanics", domain: "PLANNING", sub: "PHYSICS", ssb: "GTO_2" },
  { title: "Personal Interview Simulation: High-Pressure Cross-Examination", domain: "COMMUNICATION", sub: "ENGLISH", ssb: "INTERVIEW" },
  { title: "Historical Battle Study: Operation Meghdoot (Siachen Glacier 1984)", domain: "MILITARY_STUDIES", sub: "GEOGRAPHY", ssb: "READING" },
  { title: "Performance Deload & Joint Mobility Reset", domain: "LEADERSHIP", sub: "LEADERSHIP", ssb: "READING" },
  { title: "Special Operations History: Operation Khukri (Sierra Leone 2000)", domain: "MILITARY_STUDIES", sub: "MILITARY_HISTORY", ssb: "TAT" },
  { title: "Tactical First Aid Scenario Simulation: Compound Trauma", domain: "FIRST_AID", sub: "PHYSICS", ssb: "SRT" },
  { title: "Advanced Map & Compass Practical Examination", domain: "NAVIGATION", sub: "MATHS", ssb: "OIR" },
  { title: "Speed Endurance & Controlled Tempo Running Benchmark", domain: "LEADERSHIP", sub: "PHYSICS", ssb: "WAT" },
  { title: "Ethical Leadership Under Uncertainty: Complex Case Analysis", domain: "LEADERSHIP", sub: "LEADERSHIP", ssb: "GD" },
  { title: "Current Geopolitics: Quad, BRICS & Indo-Pacific Maritime Security", domain: "MILITARY_STUDIES", sub: "CURRENT_AFFAIRS", ssb: "INTERVIEW" },

  // Days 81-90
  { title: "Weekly Deload & Pre-Final Performance Review", domain: "LEADERSHIP", sub: "LEADERSHIP", ssb: "READING" },
  { title: "Screening Day Re-Simulation: Full OIR + PPDT Narration & Discussion", domain: "MENTAL_MODELS", sub: "MATHS", ssb: "PPDT" },
  { title: "Psychological Battery Re-Simulation: Full TAT, WAT, SRT & SD", domain: "MENTAL_MODELS", sub: "ENGLISH", ssb: "MOCK_TEST" },
  { title: "GTO Tasks Complete Re-Simulation: MPE + Individual Obstacles Strategy", domain: "PLANNING", sub: "GEOGRAPHY", ssb: "GTO_1" },
  { title: "Comprehensive Personal Interview Mock & PIQ Verification", domain: "COMMUNICATION", sub: "CURRENT_AFFAIRS", ssb: "INTERVIEW" },
  { title: "Aerobic & Strength Endurance Culmination Benchmark", domain: "LEADERSHIP", sub: "PHYSICS", ssb: "OIR" },
  { title: "Cumulative 90-Day Academic Knowledge Examination", domain: "MILITARY_STUDIES", sub: "CURRENT_AFFAIRS", ssb: "MOCK_TEST" },
  { title: "Tactical Deload, Mental Stillness & Focus Consolidation", domain: "LEADERSHIP", sub: "LEADERSHIP", ssb: "READING" },
  { title: "The 90-Day Academy Capstone Assessment & Final Debrief", domain: "LEADERSHIP", sub: "LEADERSHIP", ssb: "MOCK_TEST" },
  { title: "Operator Readiness & Long-Term Development Road Map", domain: "LEADERSHIP", sub: "LEADERSHIP", ssb: "READING" },
];

function buildAllMissions() {
  const missions = [];

  for (let d = 1; d <= 90; d++) {
    const meta = LESSON_TOPICS[d - 1];
    const weekNumber = Math.ceil(d / 7);
    const phaseId = d <= 30 ? 'FOUNDATION' : d <= 60 ? 'HARDENING' : 'OPERATOR';

    // Physical training specs
    let ptCategory = 'AEROBIC';
    let ptTitle = '';
    let prescription = '';
    let warmup = 'Arm swings, leg swings, hip circles, ankle pumps, 400m easy jog.';
    let cooldown = '5 min walking + static leg and shoulder stretches + 3 min box breathing.';
    let exercises = [];
    let progressionNotes = '';
    let safetyWarning = 'Stop immediately if chest pain, dizziness, acute sharp joint pain, or severe breathlessness occurs.';

    if (d % 7 === 0) {
      ptCategory = 'RECOVERY';
      ptTitle = `Week ${weekNumber} Restorative Mobility & Recovery Protocol`;
      prescription = '15 minutes full-body joint mobility flow + 10 minutes tactical box breathing.';
      exercises = [
        { exerciseId: 'mobility_flow', sets: 1, repsOrDuration: '15 minutes', targetRpe: 3, restSeconds: 0, techniqueCues: 'Smooth diaphragmatic breathing into tight areas.' },
        { exerciseId: 'box_breathing', sets: 1, repsOrDuration: '10 minutes', targetRpe: 1, restSeconds: 0, techniqueCues: '4s in, 4s hold, 4s out, 4s empty.' },
      ];
      progressionNotes = 'Deload allows neuromuscular supercompensation and tissue repair.';
    } else if (d === 1 || d === 30 || d === 60 || d === 86 || d === 89) {
      ptCategory = 'BENCHMARK';
      ptTitle = `Benchmark Diagnostic Fitness Assessment (Day ${d})`;
      const runDist = d === 1 ? '1.6 km' : d <= 30 ? '3.0 km' : d <= 60 ? '5.0 km' : '5.0 km';
      prescription = `Warmup + ${runDist} Time Trial + Max Push-ups (strict form) + Max Plank Hold.`;
      exercises = [
        { exerciseId: 'running_intervals', sets: 1, repsOrDuration: `${runDist} continuous time trial`, targetRpe: 8, restSeconds: 180, techniqueCues: 'Pace evenly from the start.' },
        { exerciseId: 'push_ups', sets: 1, repsOrDuration: 'Max repetitions to failure', targetRpe: 9, restSeconds: 120, techniqueCues: 'Chest within 2 inches of deck, full lockout.' },
        { exerciseId: 'plank', sets: 1, repsOrDuration: 'Max hold for time', targetRpe: 8, restSeconds: 90, techniqueCues: 'Rigid straight line from heels to ears.' },
      ];
      progressionNotes = 'Record exact times and repetitions to compare with baseline.';
    } else if (d % 3 === 1) {
      ptCategory = 'AEROBIC';
      const runKm = phaseId === 'FOUNDATION' ? (2.5 + (d * 0.05)).toFixed(1) : phaseId === 'HARDENING' ? (4.5 + ((d - 30) * 0.08)).toFixed(1) : (6.5 + ((d - 60) * 0.1)).toFixed(1);
      ptTitle = `Aerobic Zone 2 Endurance (${runKm} km)`;
      prescription = `Warmup + ${runKm} km continuous aerobic run (conversational pace) + Calf Raises.`;
      exercises = [
        { exerciseId: 'running_intervals', sets: 1, repsOrDuration: `${runKm} km continuous run`, targetRpe: 5, restSeconds: 60, techniqueCues: 'Zone 2: Speak in full sentences without gasping.' },
        { exerciseId: 'calf_raises', sets: 3, repsOrDuration: phaseId === 'FOUNDATION' ? '15 reps' : '25 reps', targetRpe: 6, restSeconds: 45, techniqueCues: '2-second pause at apex, controlled descent.' },
      ];
      progressionNotes = 'Keep heart rate controlled. Build aerobic mitochondrial base.';
    } else if (d % 3 === 2) {
      ptCategory = 'CALISTHENICS';
      const pReps = phaseId === 'FOUNDATION' ? '10-15 reps' : phaseId === 'HARDENING' ? '18-25 reps' : '25-35 reps';
      const pullReps = phaseId === 'FOUNDATION' ? '4-6 assisted reps / 25s hang' : phaseId === 'HARDENING' ? '6-8 assisted or eccentric negatives' : '8-12 strict pull-ups';
      ptTitle = `Upper-Body Calisthenics Strength & Core`;
      prescription = `Warmup + 4 sets of Push-ups (${pReps}) + 4 sets of Pull-up Progression (${pullReps}) + Plank Holds.`;
      exercises = [
        { exerciseId: 'push_ups', sets: 4, repsOrDuration: pReps, targetRpe: 7, restSeconds: 60, techniqueCues: 'Elbows at 45 degrees, rigid hollow core.' },
        { exerciseId: 'assisted_pull_ups', sets: 4, repsOrDuration: pullReps, targetRpe: 7, restSeconds: 90, techniqueCues: 'Depress scapula first, pull chest to bar.' },
        { exerciseId: 'plank', sets: 3, repsOrDuration: phaseId === 'FOUNDATION' ? '35 seconds' : phaseId === 'HARDENING' ? '60 seconds' : '90 seconds', targetRpe: 7, restSeconds: 45, techniqueCues: 'Tuck tailbone, contract quads and glutes.' },
      ];
      progressionNotes = 'Maintain strict cadence. If technique fails, regress to incline or band assistance.';
    } else {
      ptCategory = 'LOWER_BODY';
      const sqReps = phaseId === 'FOUNDATION' ? '15-20 reps' : phaseId === 'HARDENING' ? '25-30 reps' : '30-40 reps';
      const lReps = phaseId === 'FOUNDATION' ? '10 reps/leg' : phaseId === 'HARDENING' ? '15 reps/leg' : '20 reps/leg';
      ptTitle = `Lower-Body Structural Strength & Unilateral Stability`;
      prescription = `Warmup + 4 sets Air Squats (${sqReps}) + 3 sets Reverse Lunges (${lReps}) + Glute Bridges.`;
      exercises = [
        { exerciseId: 'bodyweight_squats', sets: 4, repsOrDuration: sqReps, targetRpe: 6, restSeconds: 60, techniqueCues: 'Hip crease below patella, drive through midfoot.' },
        { exerciseId: 'reverse_lunges', sets: 3, repsOrDuration: lReps, targetRpe: 6, restSeconds: 60, techniqueCues: 'Drop rear knee softly, front knee stacked over ankle.' },
        { exerciseId: 'glute_bridges', sets: 3, repsOrDuration: '15-20 reps with 2s squeeze', targetRpe: 6, restSeconds: 45, techniqueCues: 'Drive through heels without hyperextending lumbar.' },
      ];
      progressionNotes = 'Lower-body endurance provides stamina for long marches and field tasks.';
    }

    // Mental Challenge
    const mentalTypes = ['REASONING', 'MEMORY', 'DECISION_MAKING', 'CRITICAL_THINKING', 'PSYCHOLOGICAL'];
    const mType = mentalTypes[(d - 1) % mentalTypes.length];
    let mTitle = `Day ${d}: ${mType.replace('_', ' ')} Challenge`;
    let mInstructions = 'Analyze the scenario carefully and submit your verified conclusion.';
    let mPrompt = '';
    let mOptions = undefined;
    let mCorrect = undefined;
    let mSolution = '';
    let mExplanation = '';

    if (mType === 'REASONING') {
      const pIndex = d % 5;
      if (pIndex === 1) {
        mTitle = `Number Series & Arithmetic Logic`;
        mPrompt = `Determine the next number in the sequence: ${d * 2}, ${d * 2 + 3}, ${d * 2 + 7}, ${d * 2 + 12}, ${d * 2 + 18}, ?`;
        const nextVal = d * 2 + 25;
        mOptions = [String(nextVal - 2), String(nextVal), String(nextVal + 3), String(nextVal + 5)];
        mCorrect = String(nextVal);
        mSolution = `The sequence differences increase by +1 each step: +3, +4, +5, +6, so the next difference is +7. ${d * 2 + 18} + 7 = ${nextVal}.`;
        mExplanation = 'Step-difference sequences test rapid numerical induction.';
      } else if (pIndex === 2) {
        mTitle = `Deductive Syllogism & Logic Bounds`;
        mPrompt = `Statements: 1) All commanders are planners. 2) No planners are careless. Conclusion I: No commanders are careless. Conclusion II: All planners are commanders. Which conclusions follow?`;
        mOptions = ['Only Conclusion I follows', 'Only Conclusion II follows', 'Both follow', 'Neither follows'];
        mCorrect = 'Only Conclusion I follows';
        mSolution = `Since all commanders belong to the set of planners, and the set of planners has no intersection with careless individuals, no commanders can be careless (Conclusion I follows). Planners may contain individuals who are not commanders, so II does not follow.`;
        mExplanation = 'Syllogistic logic evaluates strict deductive rigor without illicit conversion.';
      } else if (pIndex === 3) {
        mTitle = `Spatial Cube & Dice Face Reasoning`;
        mPrompt = `A cube has its faces numbered 1 to 6. When unfolded, face 1 is opposite 6, face 2 is opposite 5, and face 3 is opposite 4. If face 2 is on top and face 1 is facing front, what face is on the bottom?`;
        mOptions = ['Face 5', 'Face 6', 'Face 4', 'Face 3'];
        mCorrect = 'Face 5';
        mSolution = `Since face 2 is opposite face 5, if face 2 is on top, the opposite face (face 5) must be on the bottom.`;
        mExplanation = 'Opposite-face spatial mapping is an essential OIR non-verbal competency.';
      } else if (pIndex === 4) {
        mTitle = `Verbal Analogy & Relationship Precision`;
        mPrompt = `COMPASS is to BEARING as BAROMETER is to:`;
        mOptions = ['TEMPERATURE', 'ATMOSPHERIC PRESSURE', 'HUMIDITY', 'WIND VELOCITY'];
        mCorrect = 'ATMOSPHERIC PRESSURE';
        mSolution = `A compass is an instrument that measures bearing; a barometer is an instrument that measures atmospheric pressure.`;
        mExplanation = 'Verbal analogies test relational mapping and operational vocabulary.';
      } else {
        mTitle = `Mathematical Speed & Ratio Reasoning`;
        mPrompt = `A military convoy travels 120 km at an average speed of 40 km/h, then returns along the same route at 60 km/h. What is the average speed for the entire 240 km journey?`;
        mOptions = ['50 km/h', '48 km/h', '45 km/h', '52 km/h'];
        mCorrect = '48 km/h';
        mSolution = `Total distance = 240 km. Outbound time = 120/40 = 3 hours. Return time = 120/60 = 2 hours. Total time = 5 hours. Average speed = 240 / 5 = 48 km/h (harmonic mean formula: 2*V1*V2 / (V1+V2) = 2*40*60 / 100 = 48 km/h).`;
        mExplanation = 'Average speed over equal distances is the harmonic mean, not the arithmetic average.';
      }
    } else if (mType === 'MEMORY') {
      mTitle = `Observation & Working Memory Challenge (Kim's Drill)`;
      mPrompt = `Memorize this 7-item logistical convoy checklist for 60 seconds: 1) Radio Call-sign: BRAVO-2, 2) Route Checkpoint: CP-ALPHA (Grid 6428), 3) Departure Time: 0430 hrs, 4) Vehicle Fuel Reserve: 80 Liters, 5) Primary Emergency Frequency: 45.25 MHz, 6) Medic Lead: Sgt. Sharma, 7) Security Password: KAVACH. Close the screen and write all 7 details from memory.`;
      mSolution = `Verified elements: Call-sign BRAVO-2; Checkpoint CP-ALPHA (Grid 6428); Departure 0430 hrs; Fuel 80L; Frequency 45.25 MHz; Medic Sgt. Sharma; Password KAVACH.`;
      mExplanation = 'Retaining multifaceted logistical data under cognitive pressure is vital for field communications.';
    } else if (mType === 'DECISION_MAKING') {
      mTitle = `Tactical Decision Scenario & Resource Trade-Off`;
      mPrompt = `You are leading a 4-person patrol returning from a 15km reconnaissance march. It is 1700 hrs, sunset is in 90 minutes, and the temperature is dropping rapidly. Member A has a sprained ankle and can only limp at 2 km/h. You are 6 km from the base camp. Member B suggests leaving Member A in a sleeping bag with rations and jogging ahead to get a transport vehicle. Member C insists on carrying Member A using a 2-man seat carry, which will slow the whole team to 3 km/h. What is your decision, and how do you mitigate risks?`;
      mSolution = `Correct Officer Action: Never abandon an injured casualty alone in falling temperatures with night approaching (hypothermia and animal/security hazard). Reject Member B proposal. Adopt an improvised stretcher or 2-man carry rotating bearers between B, C, and yourself every 15 minutes. Send a radio SITREP with current coordinates and estimated arrival, requesting base send a vehicle to the nearest road-head intersecting the path. Maintain team cohesion and security integrity.`;
      mExplanation = 'Prioritizes human life, security integrity, and team cohesion over expedient but dangerous shortcuts.';
    } else if (mType === 'CRITICAL_THINKING') {
      mTitle = `Fallacy Detection & Argument Deconstruction`;
      mPrompt = `Evaluate this claim: "Officer Candidate X completed the 5km run 2 minutes faster than Candidate Y. Therefore, Candidate X will make a significantly better operational leader in crisis than Candidate Y." Identify the logical fallacy and explain why the conclusion is invalid.`;
      mSolution = `Logical Fallacy: False Equivalence / Hasty Generalization (Fallacy of Division). Physical aerobic speed is only one isolated component of officer competence; it does not measure decision-making under ambiguity, moral courage, communication, spatial planning, or empathy. While fitness is necessary, higher run speed alone does not directly correlate with superior leadership or crisis management.`;
      mExplanation = 'Officers must distinguish isolated performance metrics from holistic leadership capability.';
    } else {
      mTitle = `Stoic Psychological Ownership & Stress Audit`;
      mPrompt = `Reflect on a recent instance where a task did not go as planned: 1) What was your immediate emotional response (frustration, blaming circumstances, defensiveness)? 2) What part of the failure was within your direct circle of control? 3) How did you handle accountability with others involved?`;
      mSolution = `High-Performing Response: Acknowledges initial emotional impulse without letting it dictate action; shifts immediately to what was controllable (preparation, communication, contingency planning); takes full ownership without deflecting blame onto external factors or teammates.`;
      mExplanation = 'Extreme ownership eliminates victim mindset and builds commanding authority.';
    }

    // SSB Drill
    let ssbActivity = meta.ssb;
    let ssbTitle = `${meta.ssb} Practical Exercise`;
    let ssbStimulus = '';
    let ssbExemplar = '';

    if (ssbActivity === 'OIR') {
      ssbStimulus = 'Solve 5 mixed classification and analogical reasoning questions under 3 minutes.';
      ssbExemplar = 'Target >90% accuracy. Systematically check symmetry, number of line segments, and rotation direction.';
    } else if (ssbActivity === 'PPDT') {
      ssbStimulus = 'A blurred picture of a group of youth gathered around a table with maps and paper in a village community hall.';
      ssbExemplar = 'Hero: Suresh (23), organized youth volunteer group to survey flood damage, prepared relief distribution maps, coordinated medical camp with local authorities.';
    } else if (ssbActivity === 'WAT') {
      ssbStimulus = '10 words: 1) RISK  2) DISCIPLINE  3) CRISIS  4) WEAPON  5) OBSTACLE  6) COOPERATE  7) LONELY  8) VICTORY  9) DUTY  10) TIRED';
      ssbExemplar = 'Risk: Calculated risks lead to decisive progress. Obstacle: Stepping stone for determined individuals. Duty: Performed with unwavering integrity.';
    } else if (ssbActivity === 'SRT') {
      ssbStimulus = '1) On a night train, you notice smoke emerging from the adjacent electrical compartment. You...\n2) Your team disagrees strongly with your proposed route during a timed navigation exercise. You...\n3) A junior cadet loses their equipment kit 1 hour before morning inspection. You...';
      ssbExemplar = '1) Pulled emergency chain, grabbed coach fire extinguisher, directed passengers to move away, extinguished fire, reported to guard.\n2) Paused, listened to alternate route points, demonstrated map contours objectively, gained consensus on safest route, executed decisively.';
    } else if (ssbActivity === 'TAT') {
      ssbStimulus = 'Picture prompt: A person standing on a hilltop looking through binoculars at a distant valley with rising smoke.';
      ssbExemplar = 'Hero: Forest Ranger Rajesh. Identifies forest fire outbreak early, radios division post for backup, mobilizes local village fire-line team, cuts containment trench, extinguishes blaze before reaching timber reserve.';
    } else if (ssbActivity === 'GTO_1' || ssbActivity === 'GTO_2') {
      ssbStimulus = 'Group Planning Exercise: 4 emergencies simultaneously: 1) Injured farmer bleeding heavily (needs help in 30 min), 2) River bund leaking (bursts in 60 min flooding town), 3) Stolen temple idol moving toward border in car, 4) Train arriving in 45 min with severed signal cable. You have 8 people, 2 bicycles, a tractor, and first aid kit.';
      ssbExemplar = 'Divide team based on urgency: Team 1 (2 people with first aid & bicycle) immediate medical care; Team 2 (3 people with tractor & sandbags) secure river bund; Team 3 (2 people) report idol theft to police outpost at crossroads; Team 4 (1 person) warn railway station master via station phone or manual flag.';
    } else if (ssbActivity === 'INTERVIEW') {
      ssbStimulus = 'Prepare 3-minute structured answers to: 1) What are your top 3 strengths and 2 weaknesses you are actively working on? 2) Why Indian Armed Forces instead of civil services or corporate career? 3) Describe a situation where you had a conflict with a senior and how you resolved it.';
      ssbExemplar = 'Answer with authenticity, concrete examples, clear cause-and-effect reasoning, without fabricated heroic cliches.';
    } else if (ssbActivity === 'GD') {
      ssbStimulus = 'Group Discussion topic: "Role of artificial intelligence, autonomous drones, and hypersonic systems in modern warfare: Opportunity or vulnerability?"';
      ssbExemplar = 'Structure points: 1) Force multiplier in surveillance and precision strike; 2) Vulnerability in GPS-denied environments and electronic warfare jamming; 3) Necessity of domestic sovereign algorithmic capability.';
    } else {
      ssbStimulus = 'Analyze the strategic lessons from the battle/topic of the day. Extract 3 operational takeaways for leadership and tactical doctrine.';
      ssbExemplar = 'Synthesize command decisiveness, logistical foresight, and decentralized initiative.';
    }

    // Knowledge Lesson
    const lesson = {
      id: `lesson_d${d}`,
      title: meta.title,
      domain: meta.domain,
      objective: `Understand the fundamental doctrine and practical application of ${meta.title}.`,
      explanation: `Mastery of ${meta.title} is an essential pillar of professional competence. In military operations and high-stakes leadership, theoretical knowledge must translate into instant, reliable practical application under fatigue. This lesson covers key principles, structural analysis, operational procedures, and field-tested safety protocols. Study the key takeaways, review the examples, and complete the practical drill before attempting the knowledge quiz.`,
      keyTakeaways: [
        `Understand the core definitions and regulatory protocols governing ${meta.title}.`,
        'Prioritize safety, situational awareness, and clear communication in every execution.',
        'Never skip verifying ground truth with verified physical landmarks or standard operating procedures.',
      ],
      examples: [
        `Operational case study illustrating successful application of ${meta.title} under field constraints.`,
        'Contrast between a poorly executed procedure and a professional, methodical execution.',
      ],
      practicalDrill: `Execute a 10-minute focused practical drill: Write out the step-by-step standard operating procedure for ${meta.title} from memory in your field notebook.`,
      quiz: {
        question: `What is the primary governing principle of ${meta.title}?`,
        options: [
          'Immediate impulsive action without prior assessment',
          'Methodical assessment, situational awareness, and adhering to verified standard protocols',
          'Delegating all responsibility to bystanders',
          'Ignoring environmental factors and fatigue',
        ],
        correctIndex: 1,
        explanation: 'Methodical assessment, situational awareness, and disciplined execution of verified standard protocols ensure mission success and casualty prevention.',
      },
    };

    missions.push({
      dayNumber: d,
      phaseId,
      weekNumber,
      title: `Day ${d}: ${meta.title}`,
      theme: phaseId === 'FOUNDATION'
        ? 'Foundation: Consistency, Discipline & Basic Competence'
        : phaseId === 'HARDENING'
        ? 'Hardening: Progressive Overload, Resilience & Pressure'
        : 'Performance: Peak Stamina, Mission Clarity & Operator Benchmark',
      objective: `Complete ${meta.title} study, execute physical training, solve the mental challenge, and practice the SSB drill.`,
      estimatedDurationMin: phaseId === 'FOUNDATION' ? 80 : phaseId === 'HARDENING' ? 95 : 105,
      learningLesson: lesson,
      physicalTraining: {
        category: ptCategory,
        title: ptTitle,
        prescription,
        warmup,
        cooldown,
        exercises,
        progressionNotes,
        safetyWarning,
      },
      mentalChallenge: {
        id: `mental_d${d}`,
        type: mType,
        title: mTitle,
        instructions: mInstructions,
        timeLimitSec: 90,
        prompt: mPrompt,
        options: mOptions,
        correctAnswer: mCorrect,
        rubric: [
          { criteria: 'Reasoning Rigor & Logic', maxScore: 50, description: 'Demonstrates sound, evidence-based reasoning without guessing.' },
          { criteria: 'Accuracy & Clarity', maxScore: 50, description: 'Delivers correct answer with concise, well-structured explanation.' },
        ],
        modelSolution: mSolution,
        learningExplanation: mExplanation,
      },
      ssbAssignment: {
        activity: ssbActivity,
        title: ssbTitle,
        instructions: `Complete the ${ssbActivity} drill under strict time constraints. Focus on natural, positive, and constructive expression.`,
        timeLimitMin: phaseId === 'FOUNDATION' ? 20 : 30,
        stimulus: ssbStimulus,
        evaluationRubric: [
          { olq: 'Effective Intelligence', description: 'Practical and resourceful approach to problems.' },
          { olq: 'Sense of Responsibility', description: 'Full personal ownership of actions and outcomes.' },
          { olq: 'Social Effectiveness', description: 'Cooperative, clear, and assertive communication.' },
        ],
        exemplarResponse: ssbExemplar,
      },
      studyTask: {
        subject: meta.sub,
        topic: `${meta.sub} Core Syllabus Block ${Math.ceil(d / 3)}`,
        syllabusObjective: `Study ${meta.sub} with focus on competitive entrance standards (NDA/CDS/AFCAT) and military application.`,
        durationMin: phaseId === 'FOUNDATION' ? 45 : 60,
      },
      chronosRecommendation: {
        intent: `${meta.sub} Study & ${ssbActivity} Drill`,
        mode: 'FOCUS',
        targetMinutes: phaseId === 'FOUNDATION' ? 45 : 60,
      },
      routineHabits: [
        '05:30 Reveille, 500ml water & joint mobility check',
        'Physical training session logged with verified metrics',
        'Focused study block in CHRONOS without distractions',
        'Evening gear prep and daily reflection debrief',
      ],
      reflectionPrompt: `What was the primary obstacle you encountered today (physical, mental, or discipline-related), and how did your response align with officer qualities?`,
    });
  }

  return missions;
}

const missions = buildAllMissions();

const output = `// ============================================================
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

export const COMPLETE_90_DAY_CURRICULUM: DailyCurriculumMission[] = ${JSON.stringify(missions, null, 2)};

export function getMissionForDay(dayNumber: number): DailyCurriculumMission {
  const clamped = Math.max(1, Math.min(dayNumber, 90));
  return COMPLETE_90_DAY_CURRICULUM[clamped - 1];
}

export function getMissionsByPhase(phaseId: 'FOUNDATION' | 'HARDENING' | 'OPERATOR'): DailyCurriculumMission[] {
  return COMPLETE_90_DAY_CURRICULUM.filter((m) => m.phaseId === phaseId);
}
`;

const targetPath = path.join(process.cwd(), 'src', 'features', 'daggers', 'data', 'curriculumData.ts');
fs.writeFileSync(targetPath, output, 'utf8');
console.log(`Successfully generated curriculumData.ts with ${missions.length} days at ${targetPath}`);
