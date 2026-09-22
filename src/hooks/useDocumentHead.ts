// ============================================================
// useDocumentHead — Syncs document title and favicon to timer state
//
// DESIGN:
// - Title format: "(24:59) Deep Focus — Chronos" while running
// - Title resets to "Chronos Focus" when idle
// - Dynamic canvas favicon shows a countdown pie-slice
//   (throttled to once every 5 seconds to avoid GC pressure)
// ============================================================

import { useEffect, useRef } from 'react';
import { msToDisplay, formatTime, computeProgress } from '../core/monotonicTimer';
import { MODE_LABELS } from '../core/constants';
import type { TimerMode, TimerStatus } from '../core/types';

const APP_NAME = 'Chronos Focus';
const FAVICON_UPDATE_INTERVAL_MS = 5000;

function updateFaviconCanvas(progress: number, mode: TimerMode, status: TimerStatus): void {
  try {
    const size = 32;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cx = size / 2;
    const cy = size / 2;
    const radius = 13;

    // Background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, size, size);

    // Track ring
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Progress arc
    if (status === 'RUNNING' || status === 'PAUSED') {
      const progressColor =
        mode === 'FOCUS'
          ? '#f5f5f5'
          : mode === 'SHORT_BREAK'
            ? '#34d399'
            : '#818cf8';

      const startAngle = -Math.PI / 2; // 12 o'clock
      const endAngle = startAngle + Math.PI * 2 * progress;

      ctx.beginPath();
      ctx.arc(cx, cy, radius, startAngle, endAngle);
      ctx.strokeStyle = progressColor;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Center dot
    ctx.beginPath();
    ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = status === 'RUNNING' ? '#ffffff' : 'rgba(255, 255, 255, 0.4)';
    ctx.fill();

    const dataUrl = canvas.toDataURL('image/png');
    let link = document.getElementById('dynamic-favicon') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.id = 'dynamic-favicon';
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = dataUrl;
  } catch {
    // Canvas not supported or security error — fail silently
  }
}

interface UseDocumentHeadOptions {
  remainingMs: number;
  totalDurationMs: number;
  mode: TimerMode;
  status: TimerStatus;
  showRemainingInTitle: boolean;
}

export function useDocumentHead({
  remainingMs,
  totalDurationMs,
  mode,
  status,
  showRemainingInTitle,
}: UseDocumentHeadOptions) {
  const faviconIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Title sync — runs on every render tick (cheap string operation)
  useEffect(() => {
    if (status === 'IDLE' || !showRemainingInTitle) {
      document.title = APP_NAME;
      return;
    }

    const { minutes, seconds } = msToDisplay(remainingMs);
    const timeStr = formatTime(minutes, seconds);
    const modeLabel = MODE_LABELS[mode] ?? mode;

    if (status === 'PAUSED') {
      document.title = `[Paused] ${timeStr} — ${modeLabel}`;
    } else if (status === 'COMPLETED') {
      document.title = `✓ ${modeLabel} Complete — ${APP_NAME}`;
    } else {
      document.title = `(${timeStr}) ${modeLabel} — ${APP_NAME}`;
    }
  });

  // Favicon sync — throttled to every 5s
  useEffect(() => {
    if (faviconIntervalRef.current) {
      clearInterval(faviconIntervalRef.current);
    }

    const updateFavicon = () => {
      const progress = computeProgress(remainingMs, totalDurationMs);
      updateFaviconCanvas(progress, mode, status);
    };

    updateFavicon(); // Initial update

    if (status === 'RUNNING') {
      faviconIntervalRef.current = setInterval(updateFavicon, FAVICON_UPDATE_INTERVAL_MS);
    }

    return () => {
      if (faviconIntervalRef.current) {
        clearInterval(faviconIntervalRef.current);
      }
    };
  }, [
    mode,
    status,
    totalDurationMs,
    // Intentionally coarse: only update on full-second changes for favicon
    Math.floor(remainingMs / 5000),
  ]);
}
