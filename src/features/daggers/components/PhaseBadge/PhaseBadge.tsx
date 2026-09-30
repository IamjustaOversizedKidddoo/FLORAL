// ============================================================
// PhaseBadge — Displays current programme phase with accent colour
// ============================================================

import styles from './PhaseBadge.module.css';

export type PhaseId = 'FOUNDATION' | 'HARDENING' | 'OPERATOR';

interface PhaseInfo {
  label: string;
  dayStart: number;
  dayEnd: number;
  color: string;
}

const PHASES: Record<PhaseId, PhaseInfo> = {
  FOUNDATION: { label: 'Foundation', dayStart: 1,  dayEnd: 30, color: '#4d6b48' },
  HARDENING:  { label: 'Hardening',  dayStart: 31, dayEnd: 60, color: '#8b7535' },
  OPERATOR:   { label: 'Operator',   dayStart: 61, dayEnd: 90, color: '#7a1c1c' },
};

export function getPhaseForDay(dayNumber: number): PhaseId {
  if (dayNumber >= 61) return 'OPERATOR';
  if (dayNumber >= 31) return 'HARDENING';
  return 'FOUNDATION';
}

interface PhaseBadgeProps {
  dayNumber: number;
  compact?: boolean;
}

export function PhaseBadge({ dayNumber, compact = false }: PhaseBadgeProps) {
  const phaseId = getPhaseForDay(dayNumber);
  const phase = PHASES[phaseId];

  return (
    <span
      className={compact ? styles.compact : styles.badge}
      style={{ '--phase-color': phase.color } as React.CSSProperties}
      aria-label={`Phase: ${phase.label} (Days ${phase.dayStart}–${phase.dayEnd})`}
    >
      {phase.label}
    </span>
  );
}

export { PHASES };
