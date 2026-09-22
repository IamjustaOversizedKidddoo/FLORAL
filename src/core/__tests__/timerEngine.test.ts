import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  createInitialState,
  timerReducer,
} from '../stateMachine';
import { msToDisplay, formatTime } from '../monotonicTimer';
import { timerEvents } from '../timerEvents';
import type { PersistedSessionState } from '../types';

describe('Timer Engine & State Machine Test Suite', () => {
  const BASE_TIME = 1700000000000; // Fixed timestamp for deterministic testing

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(BASE_TIME);
    timerEvents.removeAllListeners();
  });

  // ============================================================
  // 1. INITIAL STATE
  // ============================================================
  it('1. Initial state: correctly initializes default values, modes, and counters', () => {
    const state = createInitialState();

    expect(state.status).toBe('IDLE');
    expect(state.mode).toBe('FOCUS');
    expect(state.remainingMs).toBe(25 * 60 * 1000);
    expect(state.totalDurationMs).toBe(25 * 60 * 1000);
    expect(state.elapsedMs).toBe(0);
    expect(state.progress).toBe(0);
    expect(state.startedAt).toBeNull();
    expect(state.pausedAt).toBeNull();
    expect(state.targetEndTimestamp).toBeNull();
    expect(state.completedFocusSessions).toBe(0);
    expect(state.currentCycle).toBe(1);
    expect(state.completedInCycle).toBe(0);
    expect(state.settings.sessionsBeforeLongBreak).toBe(4);
    expect(state.settings.focusDurationMin).toBe(25);
    expect(state.settings.shortBreakDurationMin).toBe(5);
    expect(state.settings.longBreakDurationMin).toBe(15);
  });

  // ============================================================
  // 2. START ACTION
  // ============================================================
  it('2. Start: transitions from IDLE to RUNNING and calculates targetEndTimestamp', () => {
    const initial = createInitialState();
    const running = timerReducer(initial, { type: 'START', timestamp: BASE_TIME });

    expect(running.status).toBe('RUNNING');
    expect(running.startedAt).toBe(BASE_TIME);
    expect(running.pausedAt).toBeNull();
    expect(running.targetEndTimestamp).toBe(BASE_TIME + 25 * 60 * 1000);
    expect(running.remainingMs).toBe(25 * 60 * 1000);

    // Repeated START while already RUNNING must be a no-op
    const redundant = timerReducer(running, { type: 'START', timestamp: BASE_TIME + 1000 });
    expect(redundant).toBe(running);
  });

  // ============================================================
  // 3. PAUSE ACTION
  // ============================================================
  it('3. Pause: freezes remaining duration, calculates elapsed, clears target timestamp', () => {
    const initial = createInitialState();
    const running = timerReducer(initial, { type: 'START', timestamp: BASE_TIME });

    // Tick 5 minutes later
    const elapsed5Min = 5 * 60 * 1000;
    const ticked = timerReducer(running, { type: 'TICK', timestamp: BASE_TIME + elapsed5Min });
    expect(ticked.remainingMs).toBe(20 * 60 * 1000);
    expect(ticked.elapsedMs).toBe(5 * 60 * 1000);

    // Pause at 5 minutes
    const paused = timerReducer(ticked, { type: 'PAUSE', timestamp: BASE_TIME + elapsed5Min });
    expect(paused.status).toBe('PAUSED');
    expect(paused.pausedAt).toBe(BASE_TIME + elapsed5Min);
    expect(paused.targetEndTimestamp).toBeNull();
    expect(paused.remainingMs).toBe(20 * 60 * 1000);
    expect(paused.elapsedMs).toBe(5 * 60 * 1000);
    expect(paused.progress).toBeCloseTo(5 / 25, 3);

    // Pause while already PAUSED is a no-op
    const doublePause = timerReducer(paused, { type: 'PAUSE', timestamp: BASE_TIME + elapsed5Min });
    expect(doublePause).toBe(paused);
  });

  // ============================================================
  // 4. RESUME ACTION
  // ============================================================
  it('4. Resume: continues from exact frozen remaining duration with new targetEndTimestamp', () => {
    const initial = createInitialState();
    const running = timerReducer(initial, { type: 'START', timestamp: BASE_TIME });
    const paused = timerReducer(running, { type: 'PAUSE', timestamp: BASE_TIME + 60000 }); // 1 min elapsed

    expect(paused.remainingMs).toBe(24 * 60 * 1000);

    // Resume 10 minutes later (laptop was paused for 10 minutes)
    const resumeTime = BASE_TIME + 600000;
    const resumed = timerReducer(paused, { type: 'RESUME', timestamp: resumeTime });

    expect(resumed.status).toBe('RUNNING');
    expect(resumed.startedAt).toBe(resumeTime);
    expect(resumed.pausedAt).toBeNull();
    expect(resumed.remainingMs).toBe(24 * 60 * 1000);
    // Target timestamp must equal resumeTime + 24 minutes
    expect(resumed.targetEndTimestamp).toBe(resumeTime + 24 * 60 * 1000);

    // Tick 4 minutes after resuming
    const ticked = timerReducer(resumed, { type: 'TICK', timestamp: resumeTime + 4 * 60 * 1000 });
    expect(ticked.remainingMs).toBe(20 * 60 * 1000);
    expect(ticked.elapsedMs).toBe(5 * 60 * 1000);
  });

  // ============================================================
  // 5. RESET ACTION
  // ============================================================
  it('5. Reset: restores current mode to configured duration in IDLE state', () => {
    const initial = createInitialState();
    const running = timerReducer(initial, { type: 'START', timestamp: BASE_TIME });
    const ticked = timerReducer(running, { type: 'TICK', timestamp: BASE_TIME + 10 * 60 * 1000 });
    const reset = timerReducer(ticked, { type: 'RESET', timestamp: BASE_TIME + 10 * 60 * 1000 });

    expect(reset.status).toBe('IDLE');
    expect(reset.remainingMs).toBe(25 * 60 * 1000);
    expect(reset.totalDurationMs).toBe(25 * 60 * 1000);
    expect(reset.elapsedMs).toBe(0);
    expect(reset.progress).toBe(0);
    expect(reset.targetEndTimestamp).toBeNull();
    expect(reset.startedAt).toBeNull();
    expect(reset.pausedAt).toBeNull();
    // Session counters must be preserved
    expect(reset.completedFocusSessions).toBe(0);
    expect(reset.currentCycle).toBe(1);
    expect(reset.completedInCycle).toBe(0);
  });

  // ============================================================
  // 6. SKIP ACTION
  // ============================================================
  it('6. Skip: advances to next mode without crediting completed focus session', () => {
    const initial = createInitialState();
    const running = timerReducer(initial, { type: 'START', timestamp: BASE_TIME });
    const skipped = timerReducer(running, { type: 'SKIP', timestamp: BASE_TIME + 5000 });

    expect(skipped.status).toBe('IDLE');
    expect(skipped.mode).toBe('SHORT_BREAK');
    expect(skipped.remainingMs).toBe(5 * 60 * 1000);
    expect(skipped.totalDurationMs).toBe(5 * 60 * 1000);
    // Crucial: skipped focus must NOT count as completed!
    expect(skipped.completedFocusSessions).toBe(0);
    expect(skipped.completedInCycle).toBe(0);
    expect(skipped.currentCycle).toBe(1);
  });

  // ============================================================
  // 7. FOCUS COMPLETION
  // ============================================================
  it('7. Focus completion: credits stats, increments focus counters, sets COMPLETED', () => {
    const initial = createInitialState();
    const running = timerReducer(initial, { type: 'START', timestamp: BASE_TIME });

    // Tick exactly at completion time (25 mins)
    const targetEnd = running.targetEndTimestamp!;
    const completed = timerReducer(running, { type: 'TICK', timestamp: targetEnd });

    expect(completed.status).toBe('COMPLETED');
    expect(completed.remainingMs).toBe(0);
    expect(completed.elapsedMs).toBe(25 * 60 * 1000);
    expect(completed.progress).toBe(1.0);
    expect(completed.targetEndTimestamp).toBeNull();
    expect(completed.completedFocusSessions).toBe(1);
    expect(completed.completedInCycle).toBe(1);
    expect(completed.stats.dailyCompletedSessions).toBe(1);
    expect(completed.stats.dailyFocusMinutes).toBe(25);
    expect(completed.stats.totalFocusMinutes).toBe(25);
    expect(completed.stats.history.length).toBe(1);
    expect(completed.stats.history[0].completed).toBe(true);
    expect(completed.stats.history[0].durationMinutes).toBe(25);
  });

  // ============================================================
  // 8. SHORT BREAK COMPLETION
  // ============================================================
  it('8. Short break completion: transitions back to FOCUS and preserves completedInCycle', () => {
    let state = createInitialState();
    // Complete Focus 1
    state = timerReducer(state, { type: 'START', timestamp: BASE_TIME });
    state = timerReducer(state, { type: 'TICK', timestamp: state.targetEndTimestamp! });
    expect(state.completedInCycle).toBe(1);

    // Advance to SHORT_BREAK
    state = timerReducer(state, { type: 'ADVANCE', timestamp: BASE_TIME + 25 * 60 * 1000 });
    expect(state.mode).toBe('SHORT_BREAK');
    expect(state.completedInCycle).toBe(1);

    // Start & complete Short Break
    state = timerReducer(state, { type: 'START', timestamp: BASE_TIME + 26 * 60 * 1000 });
    state = timerReducer(state, { type: 'TICK', timestamp: state.targetEndTimestamp! });
    expect(state.status).toBe('COMPLETED');
    expect(state.completedFocusSessions).toBe(1); // Not incremented for breaks

    // Advance after Short Break
    state = timerReducer(state, { type: 'ADVANCE', timestamp: BASE_TIME + 31 * 60 * 1000 });
    expect(state.mode).toBe('FOCUS');
    expect(state.completedInCycle).toBe(1); // Remains 1
  });

  // ============================================================
  // 9. LONG BREAK COMPLETION
  // ============================================================
  it('9. Long break completion: resets cycle counter to 0, increments currentCycle, returns to FOCUS', () => {
    let state = createInitialState({ sessionsBeforeLongBreak: 2 }); // 2 sessions for fast test

    // Focus 1
    state = timerReducer(state, { type: 'START', timestamp: BASE_TIME });
    state = timerReducer(state, { type: 'TICK', timestamp: state.targetEndTimestamp! });
    state = timerReducer(state, { type: 'ADVANCE', timestamp: BASE_TIME + 25 * 60 * 1000 });
    expect(state.mode).toBe('SHORT_BREAK');

    // Short Break 1
    state = timerReducer(state, { type: 'START', timestamp: BASE_TIME + 26 * 60 * 1000 });
    state = timerReducer(state, { type: 'TICK', timestamp: state.targetEndTimestamp! });
    state = timerReducer(state, { type: 'ADVANCE', timestamp: BASE_TIME + 31 * 60 * 1000 });
    expect(state.mode).toBe('FOCUS');

    // Focus 2 (reaches threshold: 2 of 2)
    state = timerReducer(state, { type: 'START', timestamp: BASE_TIME + 32 * 60 * 1000 });
    state = timerReducer(state, { type: 'TICK', timestamp: state.targetEndTimestamp! });
    expect(state.completedInCycle).toBe(2);

    // Advance from Focus 2 -> Must be LONG_BREAK!
    state = timerReducer(state, { type: 'ADVANCE', timestamp: BASE_TIME + 57 * 60 * 1000 });
    expect(state.mode).toBe('LONG_BREAK');
    expect(state.remainingMs).toBe(15 * 60 * 1000);

    // Complete Long Break
    state = timerReducer(state, { type: 'START', timestamp: BASE_TIME + 58 * 60 * 1000 });
    state = timerReducer(state, { type: 'TICK', timestamp: state.targetEndTimestamp! });
    expect(state.status).toBe('COMPLETED');

    // Advance from Long Break -> Must reset completedInCycle to 0 and increment currentCycle!
    state = timerReducer(state, { type: 'ADVANCE', timestamp: BASE_TIME + 73 * 60 * 1000 });
    expect(state.mode).toBe('FOCUS');
    expect(state.completedInCycle).toBe(0);
    expect(state.currentCycle).toBe(2);
    expect(state.completedFocusSessions).toBe(2);
  });

  // ============================================================
  // 10. SESSION COUNTING
  // ============================================================
  it('10. Session counting: strictly distinguishes completed sessions from skipped or reset sessions', () => {
    let state = createInitialState();

    // 1. Reset does not increment
    state = timerReducer(state, { type: 'START', timestamp: BASE_TIME });
    state = timerReducer(state, { type: 'RESET', timestamp: BASE_TIME + 10000 });
    expect(state.completedFocusSessions).toBe(0);

    // 2. Skip does not increment
    state = timerReducer(state, { type: 'START', timestamp: BASE_TIME + 11000 });
    state = timerReducer(state, { type: 'SKIP', timestamp: BASE_TIME + 12000 });
    expect(state.completedFocusSessions).toBe(0);

    // 3. Natural completion DOES increment
    state = timerReducer(state, { type: 'CHANGE_MODE', mode: 'FOCUS' });
    state = timerReducer(state, { type: 'START', timestamp: BASE_TIME + 13000 });
    state = timerReducer(state, { type: 'TICK', timestamp: state.targetEndTimestamp! });
    expect(state.completedFocusSessions).toBe(1);
    expect(state.completedInCycle).toBe(1);
  });

  // ============================================================
  // 11. CYCLE COUNTING (Full 4-session cycle)
  // ============================================================
  it('11. Cycle counting: full 4 focus session cycle transitions correctly to Long Break and Cycle 2', () => {
    let state = createInitialState({ sessionsBeforeLongBreak: 4 });
    let t = BASE_TIME;

    for (let session = 1; session <= 4; session++) {
      expect(state.mode).toBe('FOCUS');
      expect(state.completedInCycle).toBe(session - 1);

      // Complete focus session
      state = timerReducer(state, { type: 'START', timestamp: t });
      t = state.targetEndTimestamp!;
      state = timerReducer(state, { type: 'TICK', timestamp: t });
      expect(state.completedFocusSessions).toBe(session);
      expect(state.completedInCycle).toBe(session);

      // Advance
      state = timerReducer(state, { type: 'ADVANCE', timestamp: t + 1000 });
      t += 1000;

      if (session < 4) {
        expect(state.mode).toBe('SHORT_BREAK');
        // Complete short break
        state = timerReducer(state, { type: 'START', timestamp: t });
        t = state.targetEndTimestamp!;
        state = timerReducer(state, { type: 'TICK', timestamp: t });
        state = timerReducer(state, { type: 'ADVANCE', timestamp: t + 1000 });
        t += 1000;
      } else {
        // After 4th session: must be LONG_BREAK!
        expect(state.mode).toBe('LONG_BREAK');
      }
    }

    // Complete the long break
    state = timerReducer(state, { type: 'START', timestamp: t });
    t = state.targetEndTimestamp!;
    state = timerReducer(state, { type: 'TICK', timestamp: t });
    state = timerReducer(state, { type: 'ADVANCE', timestamp: t + 1000 });

    // Cycle 2 begins!
    expect(state.mode).toBe('FOCUS');
    expect(state.completedInCycle).toBe(0);
    expect(state.currentCycle).toBe(2);
    expect(state.completedFocusSessions).toBe(4);
  });

  // ============================================================
  // 12. AUTO-START BEHAVIOR
  // ============================================================
  it('12. Auto-start: respects autoStartFocus and autoStartBreaks flags', () => {
    // A. autoStartBreaks = true, autoStartFocus = false
    let state = createInitialState({
      autoStartBreaks: true,
      autoStartFocus: false,
    });

    state = timerReducer(state, { type: 'START', timestamp: BASE_TIME });
    state = timerReducer(state, { type: 'TICK', timestamp: state.targetEndTimestamp! });
    // Advance to SHORT_BREAK -> should auto-start (RUNNING)
    state = timerReducer(state, { type: 'ADVANCE', timestamp: BASE_TIME + 25 * 60 * 1000 });
    expect(state.mode).toBe('SHORT_BREAK');
    expect(state.status).toBe('RUNNING');
    expect(state.targetEndTimestamp).not.toBeNull();

    // Complete short break
    state = timerReducer(state, { type: 'TICK', timestamp: state.targetEndTimestamp! });
    // Advance to FOCUS -> should NOT auto-start (IDLE) because autoStartFocus is false
    state = timerReducer(state, { type: 'ADVANCE', timestamp: BASE_TIME + 30 * 60 * 1000 });
    expect(state.mode).toBe('FOCUS');
    expect(state.status).toBe('IDLE');
    expect(state.targetEndTimestamp).toBeNull();
  });

  // ============================================================
  // 13. PERSISTENCE SERIALIZATION
  // ============================================================
  it('13. Persistence: captures complete state necessary for exact session reconstruction', () => {
    const state = createInitialState();
    const running = timerReducer(state, { type: 'START', timestamp: BASE_TIME });
    const paused = timerReducer(running, { type: 'PAUSE', timestamp: BASE_TIME + 5 * 60 * 1000 });

    const persisted: PersistedSessionState = {
      status: paused.status,
      mode: paused.mode,
      remainingMs: paused.remainingMs,
      totalDurationMs: paused.totalDurationMs,
      elapsedBeforeCurrentRunMs: paused.elapsedBeforeCurrentRunMs,
      startedAt: paused.startedAt,
      pausedAt: paused.pausedAt,
      targetEndTimestamp: paused.targetEndTimestamp,
      completedFocusSessions: paused.completedFocusSessions,
      currentCycle: paused.currentCycle,
      completedInCycle: paused.completedInCycle,
    };

    expect(persisted.status).toBe('PAUSED');
    expect(persisted.remainingMs).toBe(20 * 60 * 1000);
    expect(persisted.totalDurationMs).toBe(25 * 60 * 1000);
    expect(persisted.elapsedBeforeCurrentRunMs).toBe(5 * 60 * 1000);
  });

  // ============================================================
  // 14. REFRESH RECOVERY
  // ============================================================
  it('14. Refresh recovery: correctly reconciles running, paused, and expired sessions', () => {
    const initial = createInitialState();

    // Case A: Page refreshed while timer was RUNNING with 15 minutes left
    const nowA = BASE_TIME + 10 * 60 * 1000;
    vi.setSystemTime(nowA);
    const persistedRunning: PersistedSessionState = {
      status: 'RUNNING',
      mode: 'FOCUS',
      remainingMs: 15 * 60 * 1000,
      totalDurationMs: 25 * 60 * 1000,
      elapsedBeforeCurrentRunMs: 0,
      startedAt: BASE_TIME,
      pausedAt: null,
      targetEndTimestamp: BASE_TIME + 25 * 60 * 1000, // 15 mins remaining from nowA
      completedFocusSessions: 1,
      currentCycle: 1,
      completedInCycle: 1,
    };

    const recoveredRunning = timerReducer(initial, {
      type: 'LOAD_PERSISTED',
      state: persistedRunning,
    });

    expect(recoveredRunning.status).toBe('RUNNING');
    expect(recoveredRunning.remainingMs).toBe(15 * 60 * 1000);
    expect(recoveredRunning.elapsedMs).toBe(10 * 60 * 1000);
    expect(recoveredRunning.progress).toBeCloseTo(10 / 25, 3);
    expect(recoveredRunning.completedFocusSessions).toBe(1);

    // Case B: Session finished while page was closed
    const nowB = BASE_TIME + 30 * 60 * 1000; // 5 minutes past expiration
    vi.setSystemTime(nowB);

    const recoveredExpired = timerReducer(initial, {
      type: 'LOAD_PERSISTED',
      state: persistedRunning, // expired at BASE_TIME + 25 mins
    });

    expect(recoveredExpired.status).toBe('COMPLETED');
    expect(recoveredExpired.remainingMs).toBe(0);
    expect(recoveredExpired.progress).toBe(1.0);
    expect(recoveredExpired.completedFocusSessions).toBe(2); // Credited the completed session
    expect(recoveredExpired.completedInCycle).toBe(2);
    expect(recoveredExpired.stats.dailyCompletedSessions).toBe(1);

    // Case C: Paused session restored
    const persistedPaused: PersistedSessionState = {
      status: 'PAUSED',
      mode: 'SHORT_BREAK',
      remainingMs: 3 * 60 * 1000,
      totalDurationMs: 5 * 60 * 1000,
      elapsedBeforeCurrentRunMs: 2 * 60 * 1000,
      startedAt: BASE_TIME,
      pausedAt: BASE_TIME + 2 * 60 * 1000,
      targetEndTimestamp: null,
      completedFocusSessions: 2,
      currentCycle: 1,
      completedInCycle: 2,
    };

    const recoveredPaused = timerReducer(initial, {
      type: 'LOAD_PERSISTED',
      state: persistedPaused,
    });

    expect(recoveredPaused.status).toBe('PAUSED');
    expect(recoveredPaused.mode).toBe('SHORT_BREAK');
    expect(recoveredPaused.remainingMs).toBe(3 * 60 * 1000);
    expect(recoveredPaused.elapsedMs).toBe(2 * 60 * 1000);
    expect(recoveredPaused.targetEndTimestamp).toBeNull();
  });

  // ============================================================
  // 15. TIMER ACCURACY & DRIFT RESISTANCE (Laptop Sleep / Wake)
  // ============================================================
  it('15. Timer accuracy: wall-clock timestamp arithmetic correctly absorbs laptop sleep', () => {
    const initial = createInitialState();
    const running = timerReducer(initial, { type: 'START', timestamp: BASE_TIME });

    // Laptop sleeps for 12 minutes (no ticks occur during this time)
    const sleepWakeTime = BASE_TIME + 12 * 60 * 1000;
    vi.setSystemTime(sleepWakeTime);

    // First tick upon wake
    const woke = timerReducer(running, { type: 'TICK', timestamp: sleepWakeTime });

    expect(woke.remainingMs).toBe(13 * 60 * 1000); // 25 - 12 = 13 mins remaining
    expect(woke.elapsedMs).toBe(12 * 60 * 1000);
    expect(woke.progress).toBeCloseTo(12 / 25, 3);
    expect(woke.status).toBe('RUNNING');
  });

  // ============================================================
  // 16. SETTINGS CHANGES
  // ============================================================
  it('16. Settings changes: updates immediately when IDLE; preserves in-flight timer when RUNNING', () => {
    let state = createInitialState();

    // A. Changing while IDLE updates current mode duration
    state = timerReducer(state, {
      type: 'UPDATE_SETTINGS',
      settings: { focusDurationMin: 50 },
    });
    expect(state.remainingMs).toBe(50 * 60 * 1000);
    expect(state.totalDurationMs).toBe(50 * 60 * 1000);

    // B. Start timer (now running with 50 minutes)
    state = timerReducer(state, { type: 'START', timestamp: BASE_TIME });
    state = timerReducer(state, { type: 'TICK', timestamp: BASE_TIME + 5 * 60 * 1000 });
    expect(state.remainingMs).toBe(45 * 60 * 1000);

    // User changes settings while timer is RUNNING to 20 mins
    state = timerReducer(state, {
      type: 'UPDATE_SETTINGS',
      settings: { focusDurationMin: 20 },
    });

    // In-flight timer must NOT be corrupted! It continues with its 45 mins left.
    expect(state.remainingMs).toBe(45 * 60 * 1000);
    expect(state.totalDurationMs).toBe(50 * 60 * 1000);
    expect(state.settings.focusDurationMin).toBe(20);

    // C. Resetting applies the new setting
    state = timerReducer(state, { type: 'RESET', timestamp: BASE_TIME + 6 * 60 * 1000 });
    expect(state.remainingMs).toBe(20 * 60 * 1000);
    expect(state.totalDurationMs).toBe(20 * 60 * 1000);
  });

  // ============================================================
  // 17. RAPID USER ACTIONS
  // ============================================================
  it('17. Rapid user actions: rapid start/pause/resume clicks preserve state integrity', () => {
    let state = createInitialState();
    let t = BASE_TIME;

    // User clicks Start -> Pause -> Resume -> Pause -> Resume in 500ms
    state = timerReducer(state, { type: 'START', timestamp: t }); // 0ms
    t += 100;
    state = timerReducer(state, { type: 'PAUSE', timestamp: t }); // 100ms
    t += 50;
    state = timerReducer(state, { type: 'RESUME', timestamp: t }); // 150ms
    t += 100;
    state = timerReducer(state, { type: 'PAUSE', timestamp: t }); // 250ms
    t += 200;
    state = timerReducer(state, { type: 'RESUME', timestamp: t }); // 450ms

    expect(state.status).toBe('RUNNING');
    expect(state.targetEndTimestamp).not.toBeNull();
    // Verify remaining is close to 25 mins minus total elapsed running time (200ms)
    const expectedRemaining = 25 * 60 * 1000 - 200;
    expect(state.remainingMs).toBe(expectedRemaining);
    expect(Number.isNaN(state.remainingMs)).toBe(false);
  });

  // ============================================================
  // 18. EDGE CASES AROUND ZERO
  // ============================================================
  it('18. Edge cases around zero: boundary checks prevent negative numbers and handle time jumps', () => {
    const initial = createInitialState();
    const running = timerReducer(initial, { type: 'START', timestamp: BASE_TIME });
    const targetEnd = running.targetEndTimestamp!;

    // 1ms before completion
    const almostDone = timerReducer(running, { type: 'TICK', timestamp: targetEnd - 1 });
    expect(almostDone.status).toBe('RUNNING');
    expect(almostDone.remainingMs).toBe(1);

    // Exactly at completion
    const exactDone = timerReducer(running, { type: 'TICK', timestamp: targetEnd });
    expect(exactDone.status).toBe('COMPLETED');
    expect(exactDone.remainingMs).toBe(0);

    // Overshoot by 1 hour (e.g. laptop closed or NTP sync jump)
    const overshoot = timerReducer(running, { type: 'TICK', timestamp: targetEnd + 3600000 });
    expect(overshoot.status).toBe('COMPLETED');
    expect(overshoot.remainingMs).toBe(0);
    expect(overshoot.elapsedMs).toBe(initial.totalDurationMs);
    expect(overshoot.progress).toBe(1.0);
  });

  // ============================================================
  // 19. DECOUPLED EVENT ARCHITECTURE
  // ============================================================
  it('19. Event system: timerEvents emit and allow clean decoupling from side effects', () => {
    let sessionCompletedData: unknown = null;
    const unsub = timerEvents.on('SESSION_COMPLETED', (data) => {
      sessionCompletedData = data;
    });

    timerEvents.emit('SESSION_COMPLETED', {
      mode: 'FOCUS',
      nextMode: 'SHORT_BREAK',
      completedInCycle: 1,
      currentCycle: 1,
      totalCompletedSessions: 1,
    });

    expect(sessionCompletedData).toEqual({
      mode: 'FOCUS',
      nextMode: 'SHORT_BREAK',
      completedInCycle: 1,
      currentCycle: 1,
      totalCompletedSessions: 1,
    });

    // Test unsubscribe
    unsub();
    sessionCompletedData = null;
    timerEvents.emit('SESSION_COMPLETED', {
      mode: 'SHORT_BREAK',
      nextMode: 'FOCUS',
      completedInCycle: 1,
      currentCycle: 1,
      totalCompletedSessions: 1,
    });
    expect(sessionCompletedData).toBeNull();
  });

  // ============================================================
  // 20. HOURS DISPLAY & TIME FORMATTING
  // ============================================================
  it('20. Hours formatting: correctly handles sub-hour (MM:SS) and multi-hour (H:MM:SS) displays', () => {
    // 25 minutes
    const subHour = msToDisplay(25 * 60 * 1000);
    expect(subHour.hasHours).toBe(false);
    expect(subHour.minutes).toBe(25);
    expect(subHour.seconds).toBe(0);
    expect(formatTime(subHour.minutes, subHour.seconds)).toBe('25:00');

    // 60 minutes (1 hour)
    const exactHour = msToDisplay(60 * 60 * 1000);
    expect(exactHour.hasHours).toBe(true);
    expect(exactHour.hours).toBe(1);
    expect(exactHour.minutes).toBe(0);
    expect(exactHour.seconds).toBe(0);
    expect(formatTime(exactHour.minutes, exactHour.seconds, exactHour.hours)).toBe('1:00:00');

    // 1 hour 15 minutes 30 seconds
    const multiHour = msToDisplay((75 * 60 + 30) * 1000);
    expect(multiHour.hasHours).toBe(true);
    expect(multiHour.hours).toBe(1);
    expect(multiHour.minutes).toBe(15);
    expect(multiHour.seconds).toBe(30);
    expect(formatTime(multiHour.minutes, multiHour.seconds, multiHour.hours)).toBe('1:15:30');
  });
});
