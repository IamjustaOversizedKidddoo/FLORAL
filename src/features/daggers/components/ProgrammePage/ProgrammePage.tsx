// ============================================================
// ProgrammePage — 90-Day plan structure with phase breakdown
// ============================================================

import styles from './ProgrammePage.module.css';

interface PhasePlan {
  id: string;
  label: string;
  days: string;
  color: string;
  description: string;
  objectives: string[];
  pt: string[];
  ssb: string[];
  academic: string[];
  milestones: string[];
}

const PROGRAMME: PhasePlan[] = [
  {
    id: 'FOUNDATION',
    label: 'Phase I — Foundation',
    days: 'Days 1–30',
    color: '#4d6b48',
    description:
      'Establish baseline fitness, build disciplined study habits, and develop foundational SSB awareness. The goal is consistency over intensity.',
    objectives: [
      'Establish a fixed morning routine by Day 7',
      'Complete PT every day without skipping',
      'Begin reading current affairs daily (30 min minimum)',
      'Complete OIR and WAT practice sets (1 per day)',
      'Log daily reflections for 30 consecutive days',
    ],
    pt: [
      'Morning run: build from 2 km to 5 km',
      'Push-ups: 3 × 20 → 3 × 40 by Day 30',
      'Pull-ups: 3 × 5 → 3 × 12 by Day 30',
      'Sit-ups: 3 × 25 → 3 × 50 by Day 30',
      'Gym routine: 3 × per week (user-defined)',
      'Swimming or obstacle circuit (optional, 1 × per week)',
    ],
    ssb: [
      'OIR practice: 10 questions/day',
      'WAT: 1 set of 60 words per session',
      'SRT: 60 situations, 2 × per week',
      'TAT: 11 pictures, 1 × per week',
      'PPDT: 1 picture + group narration, 1 × per week',
      'Self Description: draft and refine once per week',
      'Current Affairs: 30 min daily reading',
    ],
    academic: [
      'Mathematics: revisit weak topics',
      'Geography and History: 1 chapter per day',
      'English comprehension: 1 passage per day',
      'Military history: 20 min per day',
    ],
    milestones: ['Day 7: Morning routine established', 'Day 14: First mock OIR', 'Day 30: 5 km run target'],
  },
  {
    id: 'HARDENING',
    label: 'Phase II — Hardening',
    days: 'Days 31–60',
    color: '#8b7535',
    description:
      'Progressive overload on physical training. Full SSB battery in rotation. Intensive study with mock tests. Stress inoculation and mental toughness.',
    objectives: [
      'Run 8 km continuously by Day 50',
      'Complete full SSB battery in sequence each week',
      'Score 70%+ on weekly OIR mock tests',
      'Finish 2 mock GTO outdoor scenarios',
      'Maintain unbroken reflection streak',
    ],
    pt: [
      'Morning run: 5 km → 8 km',
      'Push-ups: 3 × 40 → 3 × 60',
      'Pull-ups: 3 × 12 → 3 × 18',
      'Sit-ups: 3 × 50 → 3 × 70',
      'Weekly long run: 10–12 km on Saturday',
      'Ruck march: 5–8 km with 10 kg (bi-weekly)',
    ],
    ssb: [
      'OIR mock tests: timed, 1 × per week',
      'WAT: full 60-word set daily',
      'SRT: 60 situations under time pressure',
      'TAT: 12-picture full set, 2 × per week',
      'GTO: indoor and outdoor tasks with group simulation',
      'Personal Interview: prepare PIQ and life events',
      'Mock full SSB: 1 complete simulation by Day 55',
    ],
    academic: [
      'Weekly mock test for each subject',
      'Current Affairs: newspaper analysis + quiz',
      'Leadership and ethics: case studies',
      'English: essay writing (500 words twice per week)',
    ],
    milestones: [
      'Day 40: 6 km run',
      'Day 45: First full SSB simulation',
      'Day 50: 8 km run target',
      'Day 55: Second mock SSB',
      'Day 60: Full review and adjustment',
    ],
  },
  {
    id: 'OPERATOR',
    label: 'Phase III — Operator',
    days: 'Days 61–90',
    color: '#7a1c1c',
    description:
      'Peak physical conditioning. Consolidate SSB performance. Sharpen current affairs and interview polish. Exit with full confidence.',
    objectives: [
      'Maintain 8 km+ run pace at sub-6 min/km',
      'Complete 2 full mock SSBs with feedback',
      'Achieve OIR score of 80%+ consistently',
      'Perfect self description and PIQ responses',
      'Reduce missed days to zero in this phase',
    ],
    pt: [
      'Morning run: 8–12 km (maintain pace)',
      'Push-ups: 3 × 60 → maintain',
      'Pull-ups: 3 × 18 → maintain',
      'Sprint intervals: 6 × 200 m (twice per week)',
      'Ruck march: 10 km with 15 kg (weekly)',
      'Recovery sessions: yoga or light stretching (alternate days)',
    ],
    ssb: [
      'Full SSB mock: 2 × complete simulations',
      'TAT: master narrative technique',
      'GTO: refine group leadership behaviours',
      'Personal Interview: 10 mock interviews with feedback',
      'Current Affairs: mastery-level quiz daily',
      'Lecturette: 3-minute prepared talks (5 topics)',
    ],
    academic: [
      'Final revision across all subjects',
      'Defence-specific current affairs (last 6 months)',
      'Leadership quotes and historical battles',
      'Geography of strategic importance to India',
    ],
    milestones: [
      'Day 70: Second full SSB mock',
      'Day 80: Final fitness assessment',
      'Day 85: Interview readiness review',
      'Day 90: Programme complete — ready for selection',
    ],
  },
];

interface ProgrammePageProps {
  currentDayNumber: number;
}

export function ProgrammePage({ currentDayNumber }: ProgrammePageProps) {
  const activePhaseId =
    currentDayNumber >= 61 ? 'OPERATOR' :
    currentDayNumber >= 31 ? 'HARDENING' :
    'FOUNDATION';

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>90-Day Programme</h2>
        <p className={styles.pageSubtitle}>
          Three phases. Ninety days. One objective.
        </p>
      </div>

      <div className={styles.phases}>
        {PROGRAMME.map((phase) => {
          const isActive = phase.id === activePhaseId;
          const isPast =
            (phase.id === 'FOUNDATION' && currentDayNumber > 30) ||
            (phase.id === 'HARDENING' && currentDayNumber > 60);

          return (
            <section
              key={phase.id}
              className={`${styles.phaseCard} ${isActive ? styles.phaseActive : ''} ${isPast ? styles.phasePast : ''}`}
              style={{ '--phase-accent': phase.color } as React.CSSProperties}
              aria-current={isActive ? 'true' : undefined}
            >
              <div className={styles.phaseHeader}>
                <div className={styles.phaseTitle}>
                  <div
                    className={styles.phaseStripe}
                    aria-hidden
                  />
                  <div>
                    <div className={styles.phaseName}>{phase.label}</div>
                    <div className={styles.phaseDays}>{phase.days}</div>
                  </div>
                </div>
                {isActive && (
                  <span className={styles.activePill} aria-label="Current phase">
                    Active
                  </span>
                )}
                {isPast && (
                  <span className={styles.pastPill} aria-label="Completed phase">
                    Complete
                  </span>
                )}
              </div>

              <p className={styles.phaseDesc}>{phase.description}</p>

              <div className={styles.phaseGrid}>
                <PhaseSection title="Objectives" items={phase.objectives} icon="objective" />
                <PhaseSection title="Physical Training" items={phase.pt} icon="pt" />
                <PhaseSection title="SSB Preparation" items={phase.ssb} icon="ssb" />
                <PhaseSection title="Academic" items={phase.academic} icon="academic" />
              </div>

              <div className={styles.milestones}>
                <div className={styles.milestonesTitle}>Key Milestones</div>
                <div className={styles.milestoneList}>
                  {phase.milestones.map((m, i) => (
                    <div key={i} className={styles.milestone}>
                      <div className={styles.milestoneDot} aria-hidden />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Reading list */}
      <section className={styles.readingCard}>
        <div className={styles.sectionTitle}>Recommended Reading</div>
        <div className={styles.readingGrid}>
          {[
            { title: 'The Officer Selection: What It Takes', cat: 'SSB' },
            { title: "India's Special Forces", cat: 'Military' },
            { title: "Man's Search for Meaning — Viktor Frankl", cat: 'Psychology' },
            { title: 'Extreme Ownership — Jocko Willink', cat: 'Leadership' },
            { title: 'Atomic Habits — James Clear', cat: 'Discipline' },
            { title: 'The Art of War — Sun Tzu', cat: 'Strategy' },
            { title: 'Daily newspaper (national + defence)', cat: 'Current Affairs' },
            { title: 'Service-specific gazette & orders', cat: 'Regulatory' },
          ].map(({ title, cat }) => (
            <div key={title} className={styles.readingItem}>
              <div className={styles.readingCat}>{cat}</div>
              <div className={styles.readingTitle}>{title}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ---- Sub-component: section list ----

const ICONS: Record<string, React.ReactNode> = {
  objective: (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="6" cy="6" r="4.5" />
      <circle cx="6" cy="6" r="2" />
    </svg>
  ),
  pt: (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M1 6h2l2-4 2 8 2-4 1 0" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  ssb: (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="2" y="2" width="8" height="8" rx="1" />
      <path d="M4 5h4M4 7h2" strokeLinecap="round" />
    </svg>
  ),
  academic: (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M2 3h8M2 6h6M2 9h4" strokeLinecap="round" />
    </svg>
  ),
};

function PhaseSection({ title, items, icon }: { title: string; items: string[]; icon: string }) {
  return (
    <div className={styles.phaseSection}>
      <div className={styles.phaseSectionTitle}>
        <span className={styles.phaseSectionIcon}>{ICONS[icon]}</span>
        {title}
      </div>
      <ul className={styles.phaseSectionList} role="list">
        {items.map((item, i) => (
          <li key={i} className={styles.phaseSectionItem}>
            <span className={styles.itemBullet} aria-hidden>—</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
