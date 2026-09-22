// ============================================================
// TIMER WEB WORKER — Dedicated off-thread ticker
//
// WHY: Browser throttles setInterval/setTimeout in background
// tabs to once per minute (or completely freezes during sleep).
// Running this in a dedicated worker gets us a more reliable
// heartbeat. Crucially, the worker reports wall-clock
// Date.now() with each tick, so the main thread always
// reconciles against real elapsed time — not tick counts.
//
// The worker still throttles in some browsers when inactive,
// but the timestamp-based architecture means any drift
// corrects itself on the very next tick when the tab is active.
// ============================================================

let intervalId: ReturnType<typeof setInterval> | null = null;

interface WorkerCommand {
  command: 'START' | 'STOP';
  intervalMs?: number;
}

interface WorkerMessage {
  type: 'TICK';
  timestamp: number;
}

self.onmessage = (e: MessageEvent<WorkerCommand>) => {
  if (e.data.command === 'START') {
    // Clear any existing interval before starting a new one
    if (intervalId !== null) {
      clearInterval(intervalId);
    }
    const intervalMs = e.data.intervalMs ?? 100;
    intervalId = setInterval(() => {
      const message: WorkerMessage = { type: 'TICK', timestamp: Date.now() };
      self.postMessage(message);
    }, intervalMs);
  } else if (e.data.command === 'STOP') {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
};

export {};
