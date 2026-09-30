// ============================================================
// DAGGERS EXERCISE LIBRARY
// Professional movement library with regressions, progressions,
// step-by-step technique, safety protocols and coaching cues
// ============================================================

export type ExerciseDifficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
export type MuscleGroup =
  | 'CHEST'
  | 'SHOULDERS'
  | 'TRICEPS'
  | 'BACK'
  | 'BICEPS'
  | 'QUADRICEPS'
  | 'HAMSTRINGS'
  | 'GLUTES'
  | 'CALVES'
  | 'CORE'
  | 'CARDIOVASCULAR'
  | 'FULL_BODY';

export interface ExerciseDefinition {
  id: string;
  name: string;
  category: 'PUSH' | 'PULL' | 'LEGS' | 'CORE' | 'CARDIO' | 'MOBILITY' | 'RECOVERY';
  targetMuscleGroups: MuscleGroup[];
  purpose: string;
  equipment: string;
  difficulty: ExerciseDifficulty;
  stepByStepTechnique: string[];
  setsAndRepsRecommendation: {
    foundation: string;
    hardening: string;
    operator: string;
  };
  restPeriodSeconds: number;
  easierVariation: { name: string; description: string };
  harderVariation: { name: string; description: string };
  commonErrors: string[];
  safetyInstructions: string;
  coachingCue: string;
}

export const EXERCISE_LIBRARY: Record<string, ExerciseDefinition> = {
  push_ups: {
    id: 'push_ups',
    name: 'Standard Push-Up',
    category: 'PUSH',
    targetMuscleGroups: ['CHEST', 'SHOULDERS', 'TRICEPS', 'CORE'],
    purpose: 'Build horizontal pushing endurance, anterior shoulder stability, and core anti-extension strength.',
    equipment: 'Flat surface / Exercise mat',
    difficulty: 'INTERMEDIATE',
    stepByStepTechnique: [
      'Assume a high plank position with hands slightly wider than shoulder-width, fingers spread forward.',
      'Establish a straight line from heels to ears by bracing the core, squeezing glutes, and tucking the pelvis.',
      'Inhale and lower your chest under control until it sits approximately 2-3 inches above the floor, elbows angled at 45 degrees relative to torso (arrow shape, never flared T-shape).',
      'Pause for a fraction of a second without resting on the deck.',
      'Exhale and push the floor away aggressively to full arm lockout while maintaining spinal rigidity.',
    ],
    setsAndRepsRecommendation: {
      foundation: '3-4 sets of 8-15 reps (or knee push-ups)',
      hardening: '4-5 sets of 15-25 reps',
      operator: '4-6 sets of 25-40 reps (with strict cadence)',
    },
    restPeriodSeconds: 60,
    easierVariation: {
      name: 'Incline Push-Up (Bench / Wall)',
      description: 'Place hands elevated on a bench or sturdy counter to reduce the percentage of bodyweight loaded.',
    },
    harderVariation: {
      name: 'Decline Push-Up / Diamond Push-Up',
      description: 'Elevate feet onto a box to shift loading toward the upper chest and anterior deltoids, or narrow hand spacing.',
    },
    commonErrors: [
      'Sagging lower back (lumbar hyperextension) due to inactive abdominal core.',
      'Flaring elbows out at 90 degrees, which places excessive anterior shear on the shoulder capsule.',
      'Craning the neck toward the floor instead of lowering the sternum.',
      'Cutting the range of motion short at the top or bottom.',
    ],
    safetyInstructions: 'Stop immediately if you feel sharp anterior shoulder pain or lower back pinch. Regress to incline push-ups until core endurance can maintain rigid alignment.',
    coachingCue: 'Screw your palms into the ground and pull your collarbones down away from your ears.',
  },

  incline_push_ups: {
    id: 'incline_push_ups',
    name: 'Incline Push-Up',
    category: 'PUSH',
    targetMuscleGroups: ['CHEST', 'SHOULDERS', 'TRICEPS', 'CORE'],
    purpose: 'Regression for building horizontal pressing mechanics and solid trunk stability without overwhelming shoulder joints.',
    equipment: 'Bench, sturdy table, or plyo box (30-60cm height)',
    difficulty: 'BEGINNER',
    stepByStepTechnique: [
      'Place hands shoulder-width on an elevated bench or bar.',
      'Walk feet back until body forms a 30 to 45-degree angled straight plank.',
      'Brace glutes and abs to prevent hip sag.',
      'Lower sternum toward the edge of the elevated surface with elbows tracking back at 45 degrees.',
      'Press through full palms back to lockout, actively spreading shoulder blades at the top.',
    ],
    setsAndRepsRecommendation: {
      foundation: '3-4 sets of 10-15 reps',
      hardening: '3 sets of 20 reps (warmup or drop-set)',
      operator: 'High-rep active recovery work',
    },
    restPeriodSeconds: 45,
    easierVariation: {
      name: 'Wall Push-Up',
      description: 'Perform with hands against a wall at eye level with feet 2 feet away.',
    },
    harderVariation: {
      name: 'Standard Floor Push-Up',
      description: 'Transition hands down to floor level.',
    },
    commonErrors: [
      'Bending at hips (piking) instead of maintaining straight plank.',
      'Bouncing chest off the surface edge.',
    ],
    safetyInstructions: 'Ensure the elevated platform is completely anchored and will not slip forward under pushing pressure.',
    coachingCue: 'Maintain tension from heel to head as if you were standing at attention.',
  },

  bodyweight_squats: {
    id: 'bodyweight_squats',
    name: 'Bodyweight Air Squat',
    category: 'LEGS',
    targetMuscleGroups: ['QUADRICEPS', 'HAMSTRINGS', 'GLUTES', 'CORE'],
    purpose: 'Develop foundational lower-limb endurance, hip mobility, knee tracking integrity, and ankle dorsiflexion.',
    equipment: 'Bodyweight only',
    difficulty: 'BEGINNER',
    stepByStepTechnique: [
      'Stand with feet shoulder-width apart, toes turned outward 10-20 degrees.',
      'Initiate the movement by hinging hips back and bending knees simultaneously.',
      'Descend until hip crease is parallel with or slightly below the top of the patella (kneecap).',
      'Keep knees tracking in line with toes, chest tall, and heels glued firmly to the deck.',
      'Drive through the midfoot and heel to stand tall, finishing with full hip extension without hyperextending.',
    ],
    setsAndRepsRecommendation: {
      foundation: '3-4 sets of 15-20 reps',
      hardening: '4 sets of 25-35 reps',
      operator: '5 sets of 30-50 reps or timed density intervals',
    },
    restPeriodSeconds: 60,
    easierVariation: {
      name: 'Box / Chair Squat',
      description: 'Squat back to a 45cm chair or bench, pause lightly, and drive back up.',
    },
    harderVariation: {
      name: 'Jump Squat / Tempo 3-1-3 Squat',
      description: 'Explosive drive off the floor or slow 3-second eccentric descent.',
    },
    commonErrors: [
      'Knee valgus (knees caving inwards upon descent or ascent).',
      'Heels lifting off the ground, shifting load entirely to patellar tendon.',
      'Excessive forward torso lean collapsing the thoracic spine.',
    ],
    safetyInstructions: 'Do not bounce out of the bottom position. If knee discomfort occurs, check foot stance width and limit depth to comfortable parallel.',
    coachingCue: 'Spread the floor apart with your feet and keep your chest proud.',
  },

  reverse_lunges: {
    id: 'reverse_lunges',
    name: 'Reverse Lunge',
    category: 'LEGS',
    targetMuscleGroups: ['QUADRICEPS', 'GLUTES', 'HAMSTRINGS', 'CALVES', 'CORE'],
    purpose: 'Build unilateral leg strength, eliminate bilateral imbalances, and enhance decelerative knee stability.',
    equipment: 'Bodyweight only',
    difficulty: 'INTERMEDIATE',
    stepByStepTechnique: [
      'Stand upright with feet hip-width apart and hands on hips or at chest.',
      'Take a controlled, deliberate step backwards with one leg onto the ball of the foot.',
      'Lower your hips straight down until both knees are flexed at approximately 90 degrees; back knee hovered 1 inch above the floor.',
      'Keep front knee directly stacked above front ankle, front foot flat.',
      'Drive forcefully through the front heel to return to the starting upright position.',
    ],
    setsAndRepsRecommendation: {
      foundation: '3 sets of 10-12 reps per leg',
      hardening: '4 sets of 15-18 reps per leg',
      operator: '4 sets of 20 reps per leg with weighted pack',
    },
    restPeriodSeconds: 60,
    easierVariation: {
      name: 'Supported Reverse Lunge',
      description: 'Hold a wall or door frame for balance while executing the stride.',
    },
    harderVariation: {
      name: 'Walking Lunges / Deficit Reverse Lunge',
      description: 'Perform continuous forward strides or step back off a 4-inch raised platform.',
    },
    commonErrors: [
      'Slamming the rear knee into the hard ground.',
      'Front knee drifting inward or shifting excessively forward past toes.',
      'Leaning the torso sideways to compensate for gluteus medius weakness.',
    ],
    safetyInstructions: 'Ensure smooth, controlled deceleration on every repetition. Never allow the rear knee to smash against hard surfaces.',
    coachingCue: 'Drop your back knee like an elevator straight down, not an escalator drifting forward.',
  },

  plank: {
    id: 'plank',
    name: 'Forearm Core Plank',
    category: 'CORE',
    targetMuscleGroups: ['CORE', 'SHOULDERS', 'GLUTES'],
    purpose: 'Develop anti-extension core endurance, protecting the lumbar spine under load and running fatigue.',
    equipment: 'Mat / flat deck',
    difficulty: 'BEGINNER',
    stepByStepTechnique: [
      'Place forearms on the floor with elbows directly below the shoulder joints.',
      'Extend legs straight back with feet together or hip-width.',
      'Actively contract quadriceps, squeeze glutes, and draw belly button inward toward spine.',
      'Maintain a neutral cervical spine by gazing slightly forward of your hands.',
      'Create active tension by gently pulling forearms toward toes without moving them.',
    ],
    setsAndRepsRecommendation: {
      foundation: '3-4 sets of 30-45 second holds',
      hardening: '4 sets of 60-90 second holds',
      operator: '3-4 sets of 90-120 second holds with active tension',
    },
    restPeriodSeconds: 45,
    easierVariation: {
      name: 'Incline Plank or Kneeling Plank',
      description: 'Perform plank from the knees or with elbows on an elevated bench.',
    },
    harderVariation: {
      name: 'RKC Plank / Extended Lever Plank',
      description: 'Walk elbows 4 inches forward and maximally contract every muscle in the body for 20-30 seconds.',
    },
    commonErrors: [
      'Allowing hips to sag down toward the floor, causing lumbar pinching.',
      'Piking hips high in the air to offload abdominal wall.',
      'Holding your breath instead of practicing steady rhythmic diaphragmatic breathing.',
    ],
    safetyInstructions: 'Terminate the hold immediately if your lower back begins to arch or experience discomfort.',
    coachingCue: 'Tuck your tailbone between your legs and breathe smoothly into your belly.',
  },

  side_plank: {
    id: 'side_plank',
    name: 'Forearm Side Plank',
    category: 'CORE',
    targetMuscleGroups: ['CORE', 'GLUTES', 'SHOULDERS'],
    purpose: 'Build lateral core endurance (quadratus lumborum and obliques) to stabilize the pelvis during unilateral locomotion and running.',
    equipment: 'Mat / flat deck',
    difficulty: 'INTERMEDIATE',
    stepByStepTechnique: [
      'Lie on your side with elbow directly beneath shoulder, forearm perpendicular to body.',
      'Stack legs on top of each other, or stagger feet heel-to-toe for added stability.',
      'Lift hips off the floor until a diagonal line is formed from head to ankles.',
      'Hold position with top hip rotated slightly forward, neck in line with spine.',
      'Perform for prescribed duration before switching sides.',
    ],
    setsAndRepsRecommendation: {
      foundation: '3 sets of 20-35 seconds per side',
      hardening: '3-4 sets of 45-60 seconds per side',
      operator: '3-4 sets of 60-75 seconds per side',
    },
    restPeriodSeconds: 45,
    easierVariation: {
      name: 'Knee Side Plank',
      description: 'Bend knees at 90 degrees and support weight between elbow and knees.',
    },
    harderVariation: {
      name: 'Side Plank with Top Leg Abduction (Star Plank)',
      description: 'Raise top leg 12 inches into abduction and hold.',
    },
    commonErrors: [
      'Allowing bottom hip to drop toward floor.',
      'Shoulder rolling forward or sagging into the joint capsule.',
    ],
    safetyInstructions: 'Keep shoulder packed down away from ear. If shoulder pain occurs, regress to knee side plank.',
    coachingCue: 'Push the floor away with your bottom elbow and reach your ribcage toward the sky.',
  },

  glute_bridges: {
    id: 'glute_bridges',
    name: 'Glute Bridge',
    category: 'LEGS',
    targetMuscleGroups: ['GLUTES', 'HAMSTRINGS', 'CORE'],
    purpose: 'Activate posterior chain musculature, improve hip extension, and counteract prolonged sitting posture.',
    equipment: 'Mat / flat surface',
    difficulty: 'BEGINNER',
    stepByStepTechnique: [
      'Lie supine on back with knees bent at 90 degrees, feet flat on the floor hip-width apart.',
      'Rest arms flat by your sides, palms facing down.',
      'Brace core lightly and drive through your heels to raise hips off the floor.',
      'Extend hips until thighs and torso align in a straight plane.',
      'Squeeze glutes hard at peak contraction for a 2-second hold, then lower under control.',
    ],
    setsAndRepsRecommendation: {
      foundation: '3 sets of 15-20 reps with 2s pause',
      hardening: '3 sets of 25 reps or single-leg variations',
      operator: '4 sets of 20 single-leg glute bridges per leg',
    },
    restPeriodSeconds: 45,
    easierVariation: {
      name: 'Short Lever Glute Bridge',
      description: 'Bring heels closer to glutes to minimize hamstring involvement.',
    },
    harderVariation: {
      name: 'Single-Leg Glute Bridge',
      description: 'Extend one leg straight in the air while driving solely through the planted foot.',
    },
    commonErrors: [
      'Overextending the lumbar spine (arching lower back) instead of hinging from hips.',
      'Pushing through the toes instead of through the heels.',
    ],
    safetyInstructions: 'Ensure movement originates from the hips and glutes, never the lumbar spine.',
    coachingCue: 'Imagine holding a coin between your buttocks at the top of every rep.',
  },

  calf_raises: {
    id: 'calf_raises',
    name: 'Standing Calf Raise',
    category: 'LEGS',
    targetMuscleGroups: ['CALVES', 'CORE'],
    purpose: 'Strengthen gastrocnemius, soleus, and Achilles tendon resilience against running impact and shin splints.',
    equipment: 'Flat deck or ledge/step for extra stretch',
    difficulty: 'BEGINNER',
    stepByStepTechnique: [
      'Stand upright with feet hip-width apart, toes pointing straight forward.',
      'Optionally place fingertips on a wall for light balance support.',
      'Press through the balls of both feet to elevate your heels as high as possible.',
      'Hold the peak contraction at the top for 1 full second.',
      'Lower heels slowly over 2-3 seconds until touching the deck or slightly below a ledge.',
    ],
    setsAndRepsRecommendation: {
      foundation: '3 sets of 20-25 reps',
      hardening: '4 sets of 25-30 reps or single-leg reps',
      operator: '4 sets of 20 single-leg calf raises per leg',
    },
    restPeriodSeconds: 45,
    easierVariation: {
      name: 'Seated Calf Raise',
      description: 'Sit in a chair and press knees upwards through the calves.',
    },
    harderVariation: {
      name: 'Single-Leg Deficit Calf Raise',
      description: 'Stand on one leg on the edge of a step, lowering heel into deep dorsiflexion.',
    },
    commonErrors: [
      'Rolling weight onto outside edges of feet.',
      'Bouncing rapidly without controlling the eccentric descent.',
    ],
    safetyInstructions: 'Control the descent to protect the Achilles tendon from sudden reactive snap.',
    coachingCue: 'Drive your big toe knuckle into the floor and pause at the apex.',
  },

  assisted_pull_ups: {
    id: 'assisted_pull_ups',
    name: 'Assisted Pull-Up / Dead Hang Progression',
    category: 'PULL',
    targetMuscleGroups: ['BACK', 'BICEPS', 'SHOULDERS', 'CORE'],
    purpose: 'Develop vertical pulling strength, latissimus dorsi activation, grip strength, and scapular depression.',
    equipment: 'Pull-up bar + Resistance band OR low bar for Australian pull-ups',
    difficulty: 'BEGINNER',
    stepByStepTechnique: [
      'Loop an elastic resistance band over the pull-up bar, placing one foot or knee into the bottom loop (or set up bar at chest height for inverted rows).',
      'Grip the bar overhand (pronated) slightly wider than shoulder-width.',
      'Initiate the movement by depressing shoulder blades (pulling shoulders down away from ears).',
      'Pull your chest up toward the bar, driving elbows downward and back.',
      'Clear the bar with your chin, pause briefly, and lower slowly to a full dead hang stretch.',
    ],
    setsAndRepsRecommendation: {
      foundation: '3-4 sets of 4-8 assisted reps (or 20-30s dead hangs)',
      hardening: '4-5 sets of 6-10 assisted reps or eccentric negatives',
      operator: 'Transitioning to unassisted strict pull-ups (5-15 strict reps)',
    },
    restPeriodSeconds: 90,
    easierVariation: {
      name: 'Inverted Bodyweight Row (Australian Pull-up)',
      description: 'Lie under a bar set at waist height with heels on floor, pulling chest up to bar.',
    },
    harderVariation: {
      name: 'Strict Bodyweight Pull-Up',
      description: 'Perform without band assistance, zero swinging, from dead hang to chin-over-bar.',
    },
    commonErrors: [
      'Kipping or swinging the legs to generate momentum.',
      'Failing to reach full extension at the bottom of the repetition (half reps).',
      'Reaching with the chin upward instead of pulling chest to bar.',
    ],
    safetyInstructions: 'Ensure the resistance band is securely anchored so it cannot slip off foot. Do not drop rapidly into bottom lockout.',
    coachingCue: 'Lead with your collarbones and drive your elbows into your back pockets.',
  },

  running_intervals: {
    id: 'running_intervals',
    name: 'Run-Walk Intervals & Aerobic Base Running',
    category: 'CARDIO',
    targetMuscleGroups: ['CARDIOVASCULAR', 'QUADRICEPS', 'HAMSTRINGS', 'CALVES'],
    purpose: 'Build mitochondrial density, cardiac stroke volume, running economy, and aerobic threshold without injury.',
    equipment: 'Running shoes / outdoor track or road',
    difficulty: 'BEGINNER',
    stepByStepTechnique: [
      'Begin with a 5-minute brisk walking warmup followed by dynamic leg swings.',
      'Jog at an easy conversational pace (Zone 2: you should be able to speak full sentences without gasping).',
      'Maintain an upright posture, slight forward lean from ankles, and a cadence around 165-180 steps per minute.',
      'When prescribed run-walk intervals, jog for the target duration (e.g. 2 min) and walk for recovery (e.g. 1 min).',
      'Finish with a 5-minute easy walk and static calf/hamstring/hip flexor stretches.',
    ],
    setsAndRepsRecommendation: {
      foundation: '2.5km to 4.5km total volume (alternating 2m run / 1m walk, progressing to continuous)',
      hardening: '5.0km to 7.0km continuous easy runs + weekly 400m controlled intervals',
      operator: '7.5km to 10.0km tempo pacing & endurance baseline benchmarks',
    },
    restPeriodSeconds: 60,
    easierVariation: {
      name: 'Brisk Incline Walking / Power Walk',
      description: 'Walk continuously at 5.5-6.5 km/h on flat or slight incline to preserve joint health.',
    },
    harderVariation: {
      name: 'Tempo Intervals (e.g. 4x800m at 5k pace)',
      description: 'Controlled threshold runs with 200m walking recoveries.',
    },
    commonErrors: [
      'Running too fast on easy days (running in the "black hole" of fatigue where recovery is compromised).',
      'Overstriding (landing with heel far out in front of center of mass), creating braking force.',
      'Ignoring early signs of shin splints or plantar pain.',
    ],
    safetyInstructions: 'Stop immediately if you experience chest pain, sudden dizziness, acute joint sharp pain, or severe breathlessness.',
    coachingCue: 'Keep footsteps quiet and light, landing softly underneath your center of mass.',
  },

  mobility_flow: {
    id: 'mobility_flow',
    name: 'Full Body Joint Mobility Flow',
    category: 'MOBILITY',
    targetMuscleGroups: ['FULL_BODY'],
    purpose: 'Restore joint range of motion, reduce muscle stiffness, enhance synovial fluid circulation, and prevent injury.',
    equipment: 'Mat / open floor space',
    difficulty: 'BEGINNER',
    stepByStepTechnique: [
      'World’s Greatest Stretch: Step forward into deep lunge, place inside hand on ground, rotate opposite arm toward ceiling (5 reps per side).',
      'Cat-Cow: On hands and knees, cycle between gentle spinal flexion and extension with synchronized breathing (10 cycles).',
      'Deep Squat Pry: Hold bottom of bodyweight squat while using elbows to gently nudge knees outward, shifting weight heel to heel (45 seconds).',
      '90/90 Hip Swivels: Sit on floor with knees bent at 90-degree angles; smoothly rotate hips side to side without using hands if possible (8 reps per side).',
      'Thoracic Reach-Through: In quadruped position, thread one arm beneath chest, lowering shoulder to deck, then reach up to sky (6 reps per side).',
    ],
    setsAndRepsRecommendation: {
      foundation: '10-15 minutes daily pre-workout or evening recovery',
      hardening: '15 minutes daily as mandatory non-negotiable recovery',
      operator: '15-20 minutes daily integrating deep diaphragmatic breath',
    },
    restPeriodSeconds: 30,
    easierVariation: {
      name: 'Chair & Wall Supported Mobility',
      description: 'Perform thoracic extensions and ankle mobility with hands bracing a chair.',
    },
    harderVariation: {
      name: 'Loaded Cossack Squats & CARs',
      description: 'Deep lateral squats with full ankle dorsiflexion and controlled articular rotations.',
    },
    commonErrors: [
      'Rushing through positions without pausing in end-range stretch.',
      'Holding breath instead of deep exhale into resistance.',
    ],
    safetyInstructions: 'Never force a joint into painful impingement. Respect anatomical boundaries.',
    coachingCue: 'Breathe smoothly through the nose into areas of tightness.',
  },

  box_breathing: {
    id: 'box_breathing',
    name: 'Tactical Box Breathing Down-Regulation',
    category: 'RECOVERY',
    targetMuscleGroups: ['CORE', 'FULL_BODY'],
    purpose: 'Activate parasympathetic nervous system (rest-and-digest), lower heart rate, reduce cortisol, and accelerate physical recovery.',
    equipment: 'Quiet space / seated or supine position',
    difficulty: 'BEGINNER',
    stepByStepTechnique: [
      'Sit comfortably with spine erect or lie flat on back with knees bent.',
      'Exhale all air through your mouth completely.',
      'Phase 1: Inhale smoothly through your nose into lower belly for a count of 4.',
      'Phase 2: Hold your lungs full of air gently for a count of 4 without clamping the throat.',
      'Phase 3: Exhale smoothly through your mouth or nose for a count of 4.',
      'Phase 4: Hold your lungs empty for a count of 4 before beginning the next cycle.',
      'Repeat for 5 to 10 consecutive minutes post-workout or prior to sleep.',
    ],
    setsAndRepsRecommendation: {
      foundation: '5 minutes daily (approx 15-20 cycles)',
      hardening: '7-10 minutes daily post strenuous sessions',
      operator: '10 minutes daily or whenever stress/fatigue peaks',
    },
    restPeriodSeconds: 0,
    easierVariation: {
      name: '3-3-3-3 Box Breathing',
      description: 'Shorten each phase to 3 seconds if 4 seconds causes mild air hunger.',
    },
    harderVariation: {
      name: '5-5-5-5 Cadence / 4-7-8 Breath',
      description: 'Lengthen the duration to 5-second phases for deeper autonomic reset.',
    },
    commonErrors: [
      'Chest breathing (shoulders rising) instead of 360-degree belly expansion.',
      'Tensing jaw and neck muscles during holds.',
    ],
    safetyInstructions: 'Do not perform while driving or operating machinery. If lightheadedness occurs, return to normal natural breathing.',
    coachingCue: 'Expand your lower ribs like an umbrella opening in all directions.',
  },
};

export function getExerciseById(id: string): ExerciseDefinition | undefined {
  return EXERCISE_LIBRARY[id];
}

export function getAllExercises(): ExerciseDefinition[] {
  return Object.values(EXERCISE_LIBRARY);
}
