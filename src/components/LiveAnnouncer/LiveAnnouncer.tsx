// ============================================================
// LiveAnnouncer — Screen reader polite milestone announcements
//
// DESIGN:
// - Visually hidden, announces only meaningful state changes
// - Does NOT announce every tick (that would be unusable)
// - Uses aria-live="polite" so it won't interrupt speech
// - Announcements: Start, Pause, Complete, Mode Change
// ============================================================

import { useEffect, useRef, useState } from 'react';
import type { TimerStatus, TimerMode } from '../../core/types';
import { msToDisplay, formatTime } from '../../core/monotonicTimer';
import { MODE_LABELS } from '../../core/constants';

interface LiveAnnouncerProps {
  status: TimerStatus;
  mode: TimerMode;
  remainingMs: number;
}

const VISUALLY_HIDDEN: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

export function LiveAnnouncer({ status, mode, remainingMs }: LiveAnnouncerProps) {
  const [announcement, setAnnouncement] = useState('');
  const prevStatusRef = useRef<TimerStatus | null>(null);
  const prevModeRef = useRef<TimerMode | null>(null);
  const announcedMilestonesRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const prevStatus = prevStatusRef.current;
    const prevMode = prevModeRef.current;
    const modeLabel = MODE_LABELS[mode] ?? mode;
    const { minutes, seconds } = msToDisplay(remainingMs);
    const timeStr = formatTime(minutes, seconds);

    let message = '';

    // Clear milestones when starting fresh or resetting
    if (status !== 'RUNNING') {
      announcedMilestonesRef.current.clear();
    }

    if (prevStatus !== status) {
      switch (status) {
        case 'RUNNING':
          message = `${modeLabel} timer started. ${timeStr} remaining.`;
          break;
        case 'PAUSED':
          message = `Timer paused at ${timeStr}.`;
          break;
        case 'COMPLETED':
          message = `${modeLabel} complete. Well done!`;
          break;
        case 'IDLE':
          if (prevStatus !== null) {
            message = `Timer reset. ${timeStr} ready.`;
          }
          break;
      }
    } else if (status === 'RUNNING') {
      // Milestone announcements (only at key thresholds: 5 min and 1 min)
      const totalSeconds = Math.ceil(remainingMs / 1000);
      if (totalSeconds === 300 && !announcedMilestonesRef.current.has(300)) {
        announcedMilestonesRef.current.add(300);
        message = '5 minutes remaining.';
      } else if (totalSeconds === 60 && !announcedMilestonesRef.current.has(60)) {
        announcedMilestonesRef.current.add(60);
        message = '1 minute remaining.';
      }
    }

    if (prevMode !== null && prevMode !== mode && status !== 'RUNNING') {
      message = `Switched to ${modeLabel}. ${timeStr} ready.`;
    }

    if (message) {
      setAnnouncement(message);
    }

    prevStatusRef.current = status;
    prevModeRef.current = mode;
  }, [status, mode, remainingMs]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      style={VISUALLY_HIDDEN}
    >
      {announcement}
    </div>
  );
}
