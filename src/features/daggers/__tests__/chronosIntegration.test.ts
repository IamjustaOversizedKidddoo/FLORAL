// ============================================================
// CHRONOS INTEGRATION TESTS
// Verifies safe read-only synchronization from chronos_focus_v1
// Tests session querying, focus minute calculations, and intent launching
// ============================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  CHRONOS_STORAGE_KEY,
  getChronosStore,
  getChronosHistory,
  getFocusSessionsForDate,
  getFocusMinutesForDate,
  getFocusMinutesForDateRange,
  getTotalChronosFocusMinutes,
  setFocusIntent,
  getFocusIntent,
  clearFocusIntent,
  epochToLocalDateString,
} from '../services/chronosIntegrationService';
import { FOCUS_INTENT_KEY } from '../constants';
import type { SessionRecord } from '../../../core/types';

describe('CHRONOS Integration Service', () => {
  let mockStorage: Record<string, string> = {};

  beforeEach(() => {
    mockStorage = {};
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => mockStorage[key] ?? null,
      setItem: (key: string, value: string) => {
        mockStorage[key] = value;
      },
      removeItem: (key: string) => {
        delete mockStorage[key];
      },
      clear: () => {
        mockStorage = {};
      },
    });
  });

  it('handles empty or missing CHRONOS storage gracefully', () => {
    expect(getChronosStore()).toBeNull();
    expect(getChronosHistory()).toEqual([]);
    expect(getFocusSessionsForDate('2026-03-30')).toEqual([]);
    expect(getFocusMinutesForDate('2026-03-30')).toBe(0);
    expect(getTotalChronosFocusMinutes()).toBe(0);
  });

  it('safely extracts focus sessions and ignores break sessions', () => {
    const today = new Date('2026-03-30T10:00:00Z').getTime();
    const todayStr = epochToLocalDateString(today);

    const mockChronosData = {
      version: 3,
      stats: {
        totalFocusMinutes: 75,
        history: [
          {
            id: 'session-1',
            startedAt: today,
            completedAt: today + 25 * 60 * 1000,
            mode: 'FOCUS',
            actualFocusedDurationSeconds: 1500, // 25 min
            plannedDurationMinutes: 25,
            completionType: 'COMPLETED',
          },
          {
            id: 'session-2',
            startedAt: today + 30 * 60 * 1000,
            completedAt: today + 35 * 60 * 1000,
            mode: 'SHORT_BREAK', // Should be ignored
            actualFocusedDurationSeconds: 300,
            plannedDurationMinutes: 5,
            completionType: 'COMPLETED',
          },
          {
            id: 'session-3',
            startedAt: today + 40 * 60 * 1000,
            completedAt: today + 90 * 60 * 1000,
            mode: 'FOCUS',
            actualFocusedDurationSeconds: 3000, // 50 min
            plannedDurationMinutes: 50,
            completionType: 'COMPLETED',
          },
        ] as SessionRecord[],
      },
    };

    mockStorage[CHRONOS_STORAGE_KEY] = JSON.stringify(mockChronosData);

    const sessions = getFocusSessionsForDate(todayStr);
    expect(sessions).toHaveLength(2);
    expect(sessions[0].id).toBe('session-1');
    expect(sessions[1].id).toBe('session-3');

    const totalMinutes = getFocusMinutesForDate(todayStr);
    expect(totalMinutes).toBe(75); // 25 + 50
  });

  it('calculates focus minutes across date ranges accurately', () => {
    const day1 = new Date('2026-03-01T10:00:00Z').getTime();
    const day2 = new Date('2026-03-02T10:00:00Z').getTime();
    const day5 = new Date('2026-03-05T10:00:00Z').getTime();

    mockStorage[CHRONOS_STORAGE_KEY] = JSON.stringify({
      version: 3,
      stats: {
        totalFocusMinutes: 100,
        history: [
          {
            id: 's-1',
            completedAt: day1,
            mode: 'FOCUS',
            actualFocusedDurationSeconds: 1800, // 30 min
          },
          {
            id: 's-2',
            completedAt: day2,
            mode: 'FOCUS',
            actualFocusedDurationSeconds: 2400, // 40 min
          },
          {
            id: 's-3',
            completedAt: day5, // Outside range
            mode: 'FOCUS',
            actualFocusedDurationSeconds: 1800,
          },
        ],
      },
    });

    const rangeMinutes = getFocusMinutesForDateRange(
      epochToLocalDateString(day1),
      epochToLocalDateString(day2),
    );
    expect(rangeMinutes).toBe(70); // 30 + 40
  });

  it('stores and retrieves focus session intent without modifying CHRONOS storage', () => {
    setFocusIntent({
      task: 'PPDT Story Writing & Narration',
      subject: 'SSB',
      dayNumber: 5,
      targetMinutes: 30,
      createdAt: Date.now(),
    });

    const intent = getFocusIntent();
    expect(intent).not.toBeNull();
    expect(intent?.task).toBe('PPDT Story Writing & Narration');
    expect(intent?.subject).toBe('SSB');
    expect(intent?.dayNumber).toBe(5);

    // Verify intent is stored under distinct key and CHRONOS storage key is untouched
    expect(mockStorage[FOCUS_INTENT_KEY]).toBeDefined();
    expect(mockStorage[CHRONOS_STORAGE_KEY]).toBeUndefined();

    clearFocusIntent();
    expect(getFocusIntent()).toBeNull();
  });
});
