# ARCHITECTURAL SPECIFICATION & TECHNICAL BLUEPRINT
## Autonomous Focus & Pomodoro Engine (Codename: "Chronos / Pure Focus")
**Principal Product Architect**: Gemini 3.8 Flash  
**Implementation Engineer Target**: Claude Sonnet  
**Document Version**: 1.0.0 — Production Grade  
**Date**: September 2026

---

## EXECUTIVE SUMMARY & DESIGN PHILOSOPHY

### The North Star
A productivity timer should not compete for the user's dopamine or cognitive bandwidth. Most productivity tools fail by becoming noisy command centers packed with widgets, graphs, social features, and vibrant gradients. 

This product is engineered around a singular conviction: **The timer is the hero of the universe.** 

The interface embodies:
- **Apple-level simplicity**: Intuitive restraint, frictionless defaults, invisible chrome, and quiet confidence.
- **Linear-level product polish**: Sub-millisecond responsiveness, keyboard-first velocity, hairline borders (`rgba(255,255,255,0.08)`), and pixel-perfect dark mode depth.
- **Vercel-level visual minimalism**: Rigorous monochrome palette, tabular typography, mathematical negative space, and functional zero-clutter surfaces.
- **Awwwards-level interaction design**: Organic spring-physics transitions, cinematic idle fade, tactile press states, and synthesized zero-latency audio cues.

---

## SECTION A: PRODUCT ARCHITECTURE

### 1. Visual Hierarchy & Spatial Distribution
The interface is constructed along a strict vertical and Z-index gravity plane:

```
+-------------------------------------------------------------------+
| Top Bar (Z: 20): Status Pill [Focus 1/4]        Settings Icon [,] |
| (Opacity: 0.35 -> 1.0 on hover/movement; fades out on idle)       |
+-------------------------------------------------------------------+
|                                                                   |
|                                                                   |
|                         [ MODE BADGE ]                            |
|                          F O C U S                                |
|                                                                   |
|                    2 5 : 0 0                                      |
|             (Giant Tabular Display: 14vw)                         |
|                                                                   |
|                                                                   |
|                      [  START  ]  (Space)                         |
|                     Reset (R)  Skip (S)                           |
|                                                                   |
|                                                                   |
+-------------------------------------------------------------------+
| Bottom Bar (Z: 20): Today: 2h 45m (Streak: 4d)   Fullscreen (F)   |
| (Subordinate, 12px, tracking-wide, quiet gray)                    |
+-------------------------------------------------------------------+
```

### 2. State & Data Flow Architecture
The application runs as a **Local-First, Zero-Latency Client Application**:

```mermaid
graph TD
    UserAction([User Interaction: Click / Keypress]) --> ActionDispatcher[Action Dispatcher / Reducer]
    WebWorker[Dedicated Web Worker Ticker] -->|100ms Monotonic Heartbeat| ActionDispatcher
    VisibilityEvent[Page Visibility / OS Wake Event] -->|Reconcile Wall Clock Date.now()| ActionDispatcher
    
    ActionDispatcher --> TimerStateMachine[Deterministic Timer State Machine]
    TimerStateMachine --> StateStore[Centralized App State Store]
    
    StateStore --> SoundEngine[Web Audio API Native Synthesizer]
    StateStore --> NotificationEngine[Web Notification API Service]
    StateStore --> PersistenceEngine[IndexedDB / LocalStorage Sync]
    StateStore --> DocumentHeadEngine[Dynamic Favicon & Title Synchronizer]
    StateStore --> ViewLayer[React 19 View Hierarchy & Design Tokens]
```

### 3. Idle Camouflage (Cinematic Focus)
When the timer is in the `RUNNING` state and no pointer/keyboard activity is detected for 3.5 seconds:
- Top bar, bottom bar, and secondary controls fade out to `opacity: 0` with a smooth 800ms transition.
- The mouse cursor disappears (`cursor: none`).
- Only the hero countdown remains visible on a pure obsidian background.
- Any pointer movement or keypress instantly revives the controls with a 150ms spring response.

---

## SECTION B: TECHNOLOGY RECOMMENDATION & RATIONALE

| Layer | Chosen Technology | Architectural Rationale (The "WHY") |
| :--- | :--- | :--- |
| **Build & Runtime** | **Vite + React 19 + TypeScript (Strict)** | **Why not Next.js?** Next.js adds SSR hydration complexity, Node server dependencies, and hydration mismatches with client-side wall clocks and local storage. A Pomodoro timer is fundamentally a client-side real-time utility. Vite delivers instant HMR, zero-overhead static distribution, sub-50ms cold starts, and a production bundle under 45KB gzipped. |
| **Styling** | **Pure Vanilla CSS Modules + CSS Custom Properties** | **Why not Tailwind?** Tailwind injects hundreds of utility classes into the DOM, making extreme micro-interactions and custom typography adjustments clumsy. Pure Vanilla CSS provides native CSS variables (`var(--color-bg)`), native fluid scaling via `clamp()`, sub-pixel rendering control, and zero runtime CSS-in-JS cost. |
| **Timing Core** | **Web Worker Monotonic Engine + Wall-Clock Reconciliation** | **Why not setInterval?** Browsers heavily throttle `setInterval` in inactive tabs (down to once per minute or paused completely) and freeze it during laptop sleep. Our dual-layer architecture pairs an off-thread Web Worker with monotonic `performance.now()` and absolute `Date.now()` reconciliation. |
| **Audio Core** | **Native Web Audio API (Synthesizer)** | **Why not MP3 audio files?** MP3 files require network fetch, can fail on offline use, suffer from decoding latency, and cannot dynamically alter pitch, resonance, or decay based on mode. Web Audio API synthesizes lush Tibetan singing bowl harmonics, crisp mechanical clicks, and warm chimes entirely in code (<2KB total, zero network requests). |
| **State Management**| **Custom Reducer + React Context (Zero External State Libs)** | **Why not Redux/Zustand?** For this domain, external dependencies add bundle bloat and unnecessary abstraction layers. A strictly typed custom state reducer with predictable message passing gives 100% testability and zero overhead. |
| **Persistence** | **LocalStorage with Schema Versioning + Migration Layer** | Synchronous, instantaneous load eliminates layout shift or blank flash during initialization. Structured with JSON validation and automated migrations. |

---

## SECTION C: FOLDER STRUCTURE

```
d:/STUDY- TIMER/
├── index.html                     # Entry HTML, SEO meta, preload fonts, SVG favicon canvas
├── package.json                   # Scripts, TypeScript, React, Vite
├── tsconfig.json                  # Strict TypeScript configuration
├── tsconfig.node.json
├── vite.config.ts                 # Vite config with Web Worker support
├── public/
│   ├── favicon.svg                # Fallback static favicon
│   ├── manifest.json              # PWA manifest for installable desktop/mobile experience
│   └── robots.txt
└── src/
    ├── main.tsx                   # React 19 root bootstrap
    ├── App.tsx                    # Top-level layout container & keyboard listener
    │
    ├── assets/                    # Static vectors (icons) if needed
    │   └── icons/                 # Minimal SVGs (Settings, Fullscreen, Play, Pause, Reset, Skip)
    │
    ├── core/                      # Pure TypeScript business logic (Zero React dependencies)
    │   ├── constants.ts           # Durations, storage keys, cycle limits, sound presets
    │   ├── types.ts               # Core domain types, modes, states, config interfaces
    │   ├── stateMachine.ts        # Pure functional timer reducer and transition table
    │   ├── monotonicTimer.ts      # Drift-proof timestamp calculation engine
    │   └── worker/
    │       └── timer.worker.ts    # Dedicated ticker thread posting tick pulses
    │
    ├── services/                  # Browser platform integrations
    │   ├── audioService.ts        # Web Audio API harmonic sound synthesizer
    │   ├── notificationService.ts # Desktop Web Notifications & permission manager
    │   ├── storageService.ts      # LocalStorage wrapper with schema migrations & error handling
    │   ├── documentService.ts     # Document title updater & dynamic canvas favicon renderer
    │   └── fullscreenService.ts   # HTML5 Fullscreen cross-browser abstraction
    │
    ├── hooks/                     # Custom React hooks
    │   ├── useTimer.ts            # Connects React view layer to stateMachine + Web Worker
    │   ├── useKeyboardShortcuts.ts# Global hotkey mapping (Space, Esc, R, S, M, F, etc.)
    │   ├── useIdleTimer.ts        # Pointer inactivity detection for cinematic UI fade
    │   ├── useTheme.ts            # Dark/light/monochrome theme switcher via data-theme
    │   └── useAudio.ts            # Sound preference triggers and volume controls
    │
    ├── styles/                    # Global design tokens and resets
    │   ├── tokens.css             # CSS variables: colors, typography, spacing, shadows, easing
    │   ├── reset.css              # Box-sizing, font-smoothing, default zeroing
    │   ├── typography.css         # Tabular figures, clamp() scales, letter-spacing
    │   └── animations.css         # Keyframes, spring easing curves, reduce-motion overrides
    │
    └── components/                # Modular React UI components
        ├── TimerHero/             # The central visual focus
        │   ├── TimerHero.tsx      # Giant digits, mode badge, progress ring/bar
        │   └── TimerHero.module.css
        ├── Controls/              # Tactile primary and secondary buttons
        │   ├── Controls.tsx       # Start/Pause, Skip, Reset buttons with keyboard hints
        │   └── Controls.module.css
        ├── Header/                # Ambient top bar
        │   ├── Header.tsx         # Cycle indicators (dots), settings toggle, mode pills
        │   └── Header.module.css
        ├── Footer/                # Ambient bottom bar
        │   ├── Footer.tsx         # Today's session counter, focus hours, streak pill
        │   └── Footer.module.css
        ├── SettingsModal/         # Slide-over or floating minimalist settings panel
        │   ├── SettingsModal.tsx  # Custom durations, auto-start, sounds, theme selection
        │   └── SettingsModal.module.css
        ├── StatsDrawer/           # Minimal history and productivity drawer
        │   ├── StatsDrawer.tsx    # Day/week distribution, streaks, completed logs
        │   └── StatsDrawer.module.css
        ├── KeyboardCheatSheet/    # Minimalist hotkey overlay (triggered by '?')
        │   ├── KeyboardCheatSheet.tsx
        │   └── KeyboardCheatSheet.module.css
        └── Common/                # Atomic primitives
            ├── Button.tsx
            ├── Switch.tsx
            ├── Slider.tsx
            └── ModalBackdrop.tsx
```

---

## SECTION D: COMPONENT HIERARCHY

```
App (Root Container, Theme Provider, Idle Listener)
 │
 ├── DynamicHeadController (Renders title `(24:59) Focus` & dynamic favicon)
 │
 ├── TopNavigation [Header]
 │    ├── BrandMark ("CHRONOS" or quiet minimalist logo)
 │    ├── ModeSelector (Focus | Short Break | Long Break tabs)
 │    ├── CyclePills (Visual indicator: 4 dots for sessions in current cycle)
 │    └── SettingsTriggerButton (Hotkeys: `,` or icon click)
 │
 ├── MainStage (Centered Flexbox Hero Area)
 │    └── TimerHero
 │         ├── ModeLabel ("DEEP FOCUS" / "SHORT REST" / "RESTORATIVE BREAK")
 │         ├── DigitalDisplay (Enormous `25:00` with tabular-nums & sub-pixel smoothing)
 │         ├── AmbientProgressGlow (Hairline SVG circumference or bottom track)
 │         └── PrimaryActionCluster [Controls]
 │              ├── SecondaryAction (Reset Button [R])
 │              ├── HeroPlayPauseButton (Start / Pause [Space] with tactile spring)
 │              └── SecondaryAction (Skip Phase Button [S])
 │
 ├── BottomStatus [Footer]
 │    ├── DailyProductivitySummary ("Today: 3.5 hrs · 7 sessions")
 │    ├── StreakBadge ("🔥 5-day streak")
 │    ├── ShortcutsHintButton ("Press ? for shortcuts")
 │    └── FullscreenToggleButton ([F])
 │
 ├── OverlayLayer (Portals mounted at document body)
 │    ├── SettingsModal (Drawer/Modal: Durations, Toggles, Audio, Visuals)
 │    ├── StatsModal (Session breakdown, streak log)
 │    └── KeyboardCheatSheet (Instant overlay showing all hotkeys)
 │
 └── NotificationAudioLayer (Headless service bridge for Web Audio & Notifications)
```

---

## SECTION E: HIGH-PRECISION TIMER STATE MACHINE & TIMING ENGINE

### 1. Why `setInterval` Fails (The Technical Problem)
Standard timers run `setInterval(() => setSeconds(s => s - 1), 1000)`.  
This causes fatal flaws in production:
1. **Browser Tab Throttling**: Chrome, Safari, and Edge throttle inactive background tabs to run timers only once per second or once per 60 seconds.
2. **OS Sleep / Laptop Lid Close**: When a user closes their laptop for 10 minutes, `setInterval` suspends entirely. When opened, only 1 second has elapsed instead of 10 minutes.
3. **Cumulative Drift**: JavaScript execution delays add 2–5ms per tick; over 25 minutes, a naive timer can drift by several seconds.

### 2. The High-Precision Timestamp Architecture
Our engine is anchored to **Real Elapsed Epoch Time** reconciled with **High-Resolution Monotonic Clocks**:

$$\text{RemainingMs} = \text{TargetEndTimestamp} - \text{CurrentTimestamp}$$

- When starting:
  $$\text{targetEndTimestamp} = \text{Date.now()} + \text{remainingMs}$$
- While running:
  A **dedicated Web Worker** (`timer.worker.ts`) runs on an isolated background thread unaffected by main-thread UI lag. It posts a `TICK` message every 100ms.
- On each tick:
  $$\text{remainingMs} = \max(0, \text{targetEndTimestamp} - \text{Date.now()})$$
- When paused:
  $$\text{remainingMs} = \text{frozenRemainingMs}$$
  Web Worker is stopped.
- On Resume:
  $$\text{targetEndTimestamp} = \text{Date.now()} + \text{remainingMs}$$
- On Page Visibility Change (`document.visibilityState === 'visible'`) or Window Focus:
  The application immediately forces an instant recalculation against `Date.now()`, ensuring zero delay when switching back to the tab.

### 3. State Machine Transition Diagram

```
                 +-------------------+
                 |       IDLE        | <------------------------+
                 +-------------------+                          |
                   |               ^                            |
             START |               | RESET                      |
                   v               |                            |
                 +-------------------+                          |
        +------> |      RUNNING      |                          |
        |        +-------------------+                          |
 RESUME |          |               |                            |
        |    PAUSE |               | TICK (remainingMs <= 0)    | RESET
        |          v               v                            |
        |        +-------------------+                          |
        +------- |      PAUSED       |                          |
                 +-------------------+                          |
                           |                                    |
                           | SKIP                               |
                           v                                    |
                 +-------------------+                          |
                 |     COMPLETED     | -------------------------+
                 +-------------------+
                           |
             [Auto-transition / User Action]
                           v
                 +-------------------+
                 |   TRANSITIONING   |
                 +-------------------+
                           | (Calculates Next Mode & Cycle)
                           v
                     [New Mode IDLE]
```

### 4. Mathematical State Transition Table

| Current State | Event | Next State | Actions Triggered |
| :--- | :--- | :--- | :--- |
| `IDLE` | `START` | `RUNNING` | Calculate `targetEndTimestamp`, spawn Web Worker ticker, sound tick cue |
| `IDLE` | `CHANGE_MODE` | `IDLE` | Load new mode durations, reset progress, update theme accent |
| `RUNNING` | `PAUSE` | `PAUSED` | Freeze `remainingMs`, terminate Web Worker ticker, play soft click |
| `RUNNING` | `TICK` (rem > 0) | `RUNNING` | Update remaining display, update document title, sync dynamic favicon |
| `RUNNING` | `TICK` (rem <= 0)| `COMPLETED` | Stop ticker, play completion chime, push desktop notification, record stats |
| `RUNNING` | `RESET` | `IDLE` | Restore mode default duration, stop ticker, clear target timestamp |
| `RUNNING` | `SKIP` | `TRANSITIONING` | Terminate current session as skipped, calculate next mode |
| `PAUSED` | `RESUME` | `RUNNING` | Recalculate `targetEndTimestamp`, restart Web Worker ticker |
| `PAUSED` | `RESET` | `IDLE` | Reset remaining to initial mode duration |
| `PAUSED` | `SKIP` | `TRANSITIONING` | Advance to next mode |
| `COMPLETED` | `ADVANCE` | `IDLE` or `RUNNING` | Switch mode (Focus -> Short Break -> Focus -> Long Break). If `autoStart`, `RUNNING`; else `IDLE` |

### 5. Pomodoro Cycle Progression Algorithm
```typescript
function getNextMode(currentMode: Mode, completedInCycle: number, sessionsBeforeLongBreak: number): { nextMode: Mode; nextCycleCount: number } {
  if (currentMode === 'FOCUS') {
    const newCount = completedInCycle + 1;
    if (newCount >= sessionsBeforeLongBreak) {
      return { nextMode: 'LONG_BREAK', nextCycleCount: 0 };
    }
    return { nextMode: 'SHORT_BREAK', nextCycleCount: newCount };
  } else {
    // Both SHORT_BREAK and LONG_BREAK lead back to FOCUS
    return { nextMode: 'FOCUS', nextCycleCount: completedInCycle };
  }
}
```

---

## SECTION F: DATA MODEL & TYPESCRIPT DEFINITIONS

```typescript
// src/core/types.ts

export type TimerMode = 'FOCUS' | 'SHORT_BREAK' | 'LONG_BREAK';

export type TimerStatus = 'IDLE' | 'RUNNING' | 'PAUSED' | 'COMPLETED' | 'TRANSITIONING';

export type SoundTheme = 'ZEN_BOWL' | 'DIGITAL_PULSE' | 'SOFT_BELL' | 'MECHANICAL' | 'MUTED';

export type BackgroundStyle = 'OBSIDIAN_PURE' | 'SUBTLE_GRAIN' | 'AMBIENT_RADIAL';

export type ColorTheme = 'DARK_DEEP' | 'LIGHT_PAPER' | 'MONOCHROME_OLED';

export interface TimerSettings {
  focusDurationMin: number;        // e.g. 25
  shortBreakDurationMin: number;   // e.g. 5
  longBreakDurationMin: number;    // e.g. 15
  sessionsBeforeLongBreak: number; // e.g. 4
  autoStartBreaks: boolean;        // e.g. false
  autoStartFocus: boolean;         // e.g. false
  soundEnabled: boolean;           // e.g. true
  soundTheme: SoundTheme;          // e.g. 'ZEN_BOWL'
  soundVolume: number;             // 0.0 to 1.0
  tickSoundEnabled: boolean;       // e.g. false
  notificationsEnabled: boolean;   // e.g. true
  theme: ColorTheme;               // e.g. 'DARK_DEEP'
  backgroundStyle: BackgroundStyle;// e.g. 'OBSIDIAN_PURE'
  showRemainingInTitle: boolean;   // e.g. true
}

export interface SessionRecord {
  id: string;                      // UUID
  timestamp: number;               // Epoch ms
  mode: TimerMode;
  durationMinutes: number;
  completed: boolean;              // false if skipped early
}

export interface ProductivityStats {
  dailyCompletedSessions: number;  // Today's total count
  dailyFocusMinutes: number;       // Today's accumulated focus time
  totalFocusMinutes: number;       // All-time accumulated focus time
  currentStreakDays: number;       // Consecutive days with >= 1 completed focus session
  lastActiveDate: string;          // YYYY-MM-DD
  history: SessionRecord[];        // Recent history log (max 500 records)
}

export interface TimerState {
  status: TimerStatus;
  mode: TimerMode;
  remainingMs: number;
  totalDurationMs: number;
  targetEndTimestamp: number | null;
  completedInCycle: number;        // 0 to sessionsBeforeLongBreak - 1
  settings: TimerSettings;
  stats: ProductivityStats;
}
```

---

## SECTION G: PERSISTENCE STRATEGY & DRIFT RECOVERY

### 1. Storage Schema & Key Architecture
To avoid global namespace collisions and support schema evolution:
- Storage Key: `chronos_focus_v1_state`
- Storage Format: JSON envelope with version tag:
```json
{
  "version": 1,
  "lastSavedTimestamp": 1790000000000,
  "settings": { ... },
  "stats": { ... },
  "savedSession": {
    "status": "RUNNING",
    "mode": "FOCUS",
    "remainingMs": 842000,
    "totalDurationMs": 1500000,
    "targetEndTimestamp": 1790000842000,
    "completedInCycle": 2
  }
}
```

### 2. Accidental Refresh & Tab Crash Recovery Algorithm
When the user reloads or closes/re-opens the browser window:
1. `storageService.loadState()` is called synchronously before initial DOM render.
2. If `savedSession.status === 'RUNNING'`:
   - Calculate: `elapsedSinceUnload = Date.now() - savedSession.targetEndTimestamp`
   - **Case A (Timer expired during absence)**:
     If `Date.now() >= savedSession.targetEndTimestamp`:
     Timer has concluded while tab was closed. Advance to `COMPLETED` state, register completed session in `ProductivityStats`, but do *not* fire jarring audio; display a quiet prompt: *"Focus session concluded while away."*
   - **Case B (Timer still has time remaining)**:
     New `remainingMs = savedSession.targetEndTimestamp - Date.now()`.
     Restore state seamlessly as `RUNNING` with exact remaining milliseconds.
3. If `savedSession.status === 'PAUSED'`:
   Restore exact frozen `remainingMs`.
4. If corruption or JSON parse failure occurs:
   Gracefully catch error, backup corrupted string to `chronos_corrupted_backup`, and boot clean factory default state without ever crashing the UI.

### 3. Cross-Tab Coordination (BroadcastChannel)
When the user opens multiple tabs:
- A lightweight `BroadcastChannel('chronos_timer_channel')` transmits state updates (`START`, `PAUSE`, `RESET`).
- Secondary tabs mirror the primary timer's state in real time, preventing confusing duplicate chimes or competing countdowns.

---

## SECTION H: DESIGN TOKEN SYSTEM (PURE MINIMALISM)

### 1. Color Tokens (Pitch Black & Off-White Hierarchy)
Avoid plain saturated primaries. Use curated HSL tokens with strict alpha-channel layering:

```css
/* src/styles/tokens.css */
:root {
  /* Surface Tokens (Dark - Default) */
  --bg-canvas: #000000;              /* Pure OLED Black */
  --bg-surface-lowest: #050507;      /* Barely perceptible elevation */
  --bg-surface-elevated: #0e0e11;    /* Modal / Drawer background */
  --bg-surface-hover: rgba(255, 255, 255, 0.04);
  --bg-surface-active: rgba(255, 255, 255, 0.08);

  /* Border & Hairline Tokens */
  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-medium: rgba(255, 255, 255, 0.12);
  --border-focus: rgba(255, 255, 255, 0.28);

  /* Text & Typographic Hierarchy */
  --text-hero: #ffffff;             /* Giant timer digits */
  --text-primary: #ededed;          /* Mode badge, button text */
  --text-secondary: #88888e;        /* Secondary metrics, shortcuts */
  --text-muted: #424248;            /* Labels, inactive cycle dots */
  --text-disabled: #222226;

  /* Mode Identity (Extremely Restrained Accents) */
  --mode-focus-accent: #ffffff;
  --mode-focus-subtle: rgba(255, 255, 255, 0.05);

  --mode-short-break-accent: #34d399; /* Soft Scandinavian Sage */
  --mode-short-break-subtle: rgba(52, 211, 153, 0.08);

  --mode-long-break-accent: #60a5fa;  /* Horizon Indigo Mist */
  --mode-long-break-subtle: rgba(96, 165, 250, 0.08);

  /* Elevation Shadows */
  --shadow-modal: 0 24px 48px -12px rgba(0, 0, 0, 0.85), 0 0 0 1px var(--border-subtle);
  --shadow-glow-focus: 0 0 80px -20px rgba(255, 255, 255, 0.06);

  /* Motion & Physics */
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);    /* Linear/Apple signature ease-out-expo */
  --ease-in-out-smooth: cubic-bezier(0.65, 0, 0.35, 1);
  --duration-tactile: 120ms;
  --duration-normal: 240ms;
  --duration-fade: 400ms;
  --duration-idle: 800ms;

  /* Spacing Grid (4px baseline) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;

  /* Radii */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-full: 9999px;
}

/* Light Theme (Paper White - Optional User Selection) */
[data-theme="LIGHT_PAPER"] {
  --bg-canvas: #fafafa;
  --bg-surface-lowest: #f4f4f5;
  --bg-surface-elevated: #ffffff;
  --bg-surface-hover: rgba(0, 0, 0, 0.03);
  --bg-surface-active: rgba(0, 0, 0, 0.06);

  --border-subtle: rgba(0, 0, 0, 0.06);
  --border-medium: rgba(0, 0, 0, 0.12);
  --border-focus: rgba(0, 0, 0, 0.28);

  --text-hero: #0a0a0c;
  --text-primary: #18181b;
  --text-secondary: #71717a;
  --text-muted: #a1a1aa;
  --text-disabled: #e4e4e7;

  --mode-focus-accent: #09090b;
  --mode-focus-subtle: rgba(0, 0, 0, 0.04);
  --mode-short-break-accent: #059669;
  --mode-short-break-subtle: rgba(5, 150, 105, 0.08);
  --mode-long-break-accent: #2563eb;
  --mode-long-break-subtle: rgba(37, 99, 235, 0.08);

  --shadow-modal: 0 24px 48px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px var(--border-subtle);
  --shadow-glow-focus: 0 0 80px -20px rgba(0, 0, 0, 0.04);
}
```

### 2. Typography Strategy & Tabular Figures
The most common rookie flaw in timer apps is **numerical digit jitter** (the timer wobbling horizontally as numbers change from `1` to `0`).  
We eliminate this through strict typographic rules:
```css
/* src/styles/typography.css */
.timer-digits {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif;
  font-size: clamp(5.5rem, 16vw, 13.5rem);
  font-weight: 250; /* Ultra-crisp thin architecture */
  line-height: 0.95;
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums lining-nums;
  font-feature-settings: "tnum" 1, "lnum" 1;
  user-select: none;
  color: var(--text-hero);
  text-align: center;
}

.mode-badge {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-secondary);
}
```

---

## SECTION I: ZERO-ASSET WEB AUDIO ENGINE

### 1. The Audio Synthesis Architecture
External audio files (MP3/WAV) fail if offline, introduce loading lag, and sound static.  
Our `audioService.ts` synthesizes organic acoustic acoustic signatures natively using the browser's `AudioContext`:

1. **Zen Bowl (Focus Session Completion)**:
   - Fundamental frequency: $261.63\text{ Hz}$ (Middle C)
   - Harmonically paired with high partials ($523.25\text{ Hz}$ and $784.88\text{ Hz}$)
   - Envelope: $30\text{ms}$ soft exponential attack, followed by a resonant $3.2\text{s}$ decay curve (`exponentialRampToValueAtTime`) through a gentle low-pass biquad filter ($1200\text{ Hz}$).
2. **Restorative Bell (Break Completion)**:
   - Dual-tone chime at $440\text{ Hz}$ (A4) stepping up to $587.33\text{ Hz}$ (D5) with a warm $1.8\text{s}$ reverberant decay.
3. **Tactile Mechanical Click (Button / Spacebar press)**:
   - High-pass filtered noise burst ($4000\text{ Hz}$) lasting only $8\text{ms}$ at low amplitude, giving a satisfying physical feel like an analog camera shutter.

```typescript
// Architectural Implementation Pattern for audioService.ts
class AudioService {
  private ctx: AudioContext | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playZenBowl(volume = 0.6) {
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(261.63, now); // C4

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(523.25, now); // C5 harmonic

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume * 0.7, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 3.3);
    osc2.stop(now + 3.3);
  }
}
```

---

## SECTION J: AWWWARDS-LEVEL INTERACTION & MICRO-PHYSICS

Every micro-interaction in this application has a functional purpose:

| Interaction | Visual / Physics Behavior | Purpose & Justification |
| :--- | :--- | :--- |
| **Start / Pause (Spacebar)** | Scale down `0.97` on keydown (50ms); spring back to `1.0` with `cubic-bezier(0.16, 1, 0.3, 1)` on release. Audio click fires. | Creates tactile confirmation; prevents double-taps. |
| **Mode Transition (Focus -> Break)** | Digits smoothly blur (`filter: blur(8px)`) and fade out (150ms), mode label slides up 6px, new duration blurs in from 0px (200ms). | Eliminates visual shock; signals cognitive phase shift. |
| **Idle Camouflage** | 3.5s inactivity triggers opacity fade (`0.0`) of chrome over 800ms. | Strips away all distraction during active focus. |
| **Settings Reveal** | Slides in from right or scales from center with 240ms spring; backdrop blurs `backdrop-filter: blur(12px)`. | Clear spatial context; user retains peripheral sight of timer. |
| **Session Completion** | Hero digits pulse once with a subtle scale (`1.0 -> 1.02 -> 1.0`) accompanied by an ambient radial glow expanding and dissolving over 2.5s. | Cathartic sensory reward for completing deep focus. |
| **Dynamic Favicon** | A 32x32 offscreen HTML5 `<canvas>` draws an inverted monochromatic countdown pie-slice and sets `<link rel="icon">` every 5 seconds. | Real-time progress is visible in external browser tabs without switching. |

---

## SECTION K: ACCESSIBILITY & INCLUSIVITY SPECIFICATION

1. **Screen Reader Architecture (Zero Clutter)**:
   - Do **NOT** place `aria-live="assertive"` on the timer tick! Screen readers reading every second would be an unusable nightmare.
   - Use `role="timer"` on the main countdown display with `aria-live="off"`.
   - Provide a separate visually hidden notification live-region (`aria-live="polite"`):
     - Announces only milestone events: *"Focus timer started. 25 minutes remaining."*, *"Timer paused at 14 minutes 20 seconds."*, *"Focus session complete. Short break ready."*
2. **Keyboard Navigation & Focus Trapping**:
   - Every interactive element has an explicit, high-contrast `:focus-visible` outline (`2px solid var(--border-focus)` with a 2px offset).
   - Hotkeys (`Space`, `R`, `S`, `F`, `,`) are disabled whenever an `<input>` or modal form field is active, preventing accidental hotkey triggers while editing duration settings.
   - When settings or modal overlays open, focus is trapped within the dialog with auto-focus on the first input and `Escape` bound to close.
3. **Reduced-Motion (`prefers-reduced-motion: reduce`)**:
   - All `blur()`, `scale()`, and translation transforms are completely disabled.
   - Transitions collapse to instantaneous or simple linear opacity fades.

---

## SECTION L: PERFORMANCE STRATEGY & MEMORY MANAGEMENT

1. **Sub-Pixel & Layout Thrashing Prevention**:
   - Zero layout-inducing CSS properties (like `width`, `height`, `margin`, `top`) animated during ticks.
   - All visual transitions operate strictly on **compositor-only properties**: `transform` and `opacity`.
2. **Render Loop Frequency & Throttling**:
   - Digital clock display only updates state when visible `Math.floor(remainingMs / 1000)` changes. Sub-second millisecond precision is calculated internally but throttled from triggering React re-renders.
   - Dynamic favicon canvas update is throttled to once every 5 seconds, avoiding memory spikes or GC pressure.
3. **Bundle Size Ceiling**:
   - Target production bundle size: **< 40 KB gzipped** (excluding system fonts).
   - Zero external CSS frameworks, zero heavy icon packs (inline curated SVGs only).

---

## SECTION M: IMPLEMENTATION ROADMAP (8 PHASES)

```
Phase 1: Foundations & Build Setup
  └── Vite + React 19 + TypeScript + CSS Token Architecture + Reset

Phase 2: High-Precision Core Timing Engine
  └── Monotonic Timer + Web Worker Ticker + State Machine Reducer

Phase 3: Hero Typography & Tabular Display
  └── Fluid Clamp Scaling + Anti-Jitter Tabular Figures + Zero Chrome

Phase 4: Pomodoro Progression & Cycle Logic
  └── Focus / Short Break / Long Break Cycle Tracking + Auto-Transitions

Phase 5: Native Audio & Desktop Notification Pipeline
  └── Web Audio API Tibetan Chime Synthesizer + Notification Permissions

Phase 6: Keyboard Command & Idle Focus Layer
  └── Global Hotkeys + Inactivity Detection + Fullscreen + Dynamic Title/Favicon

Phase 7: Minimalist Settings & Productivity Analytics
  └── Drawer Overlay + LocalStorage Versioned Persistence + History Logs

Phase 8: Awwwards Interaction Polish, Accessibility & Audit
  └── Spring Physics + Idle Camouflage + Screen Reader Politeness + Edge Case Audit
```

---

## SECTION N: HANDOFF SPECIFICATION FOR CLAUDE SONNET

> [!IMPORTANT]
> **ENGINEER HANDOFF DIRECTIVE**  
> Claude Sonnet: Read this specification carefully. Implement the application cleanly, faithfully adhering to this architecture. Do not add superfluous cards, third-party component libraries, or SaaS widgets. Deliver a calm, cinematic, and technically uncompromising product.

### Step 1: Initialize Project Scaffolding
Execute non-interactively in `d:\STUDY- TIMER`:
```bash
npx -y create-vite@latest ./ --template react-ts
npm install
```

### Step 2: Install Zero Extra Heavy Dependencies
- Do **not** install Tailwind, Framer Motion, Redux, or Lucide-react.
- Use native CSS modules, native Web APIs (Web Audio, Web Worker, BroadcastChannel, Fullscreen), and native React 19 primitives.

### Step 3: Core Interfaces (`src/core/types.ts`)
Implement all types defined in **Section F** exactly as specified.

### Step 4: Web Worker Ticker (`src/core/worker/timer.worker.ts`)
Create an inline or dedicated worker:
```typescript
let intervalId: ReturnType<typeof setInterval> | null = null;

self.onmessage = (e: MessageEvent<{ command: 'START' | 'STOP'; intervalMs?: number }>) => {
  if (e.data.command === 'START') {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
      self.postMessage({ type: 'TICK', timestamp: Date.now() });
    }, e.data.intervalMs || 100);
  } else if (e.data.command === 'STOP') {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
};
```

### Step 5: Web Audio Synthesizer (`src/services/audioService.ts`)
Implement the zero-asset synthesizer with:
- `playZenBowl()`
- `playBell()`
- `playClick()`

### Step 6: Design Tokens & Layout (`src/styles/tokens.css`, `src/styles/typography.css`)
Implement the CSS variables from **Section H**. Set `background: #000000`, `color: #ffffff`, and configure the hero digits with `font-variant-numeric: tabular-nums`.

### Step 7: Verification & Acceptance Criteria
- [ ] Timer runs smoothly without dropping ticks in background tabs.
- [ ] Laptop sleep / wake test reconciles time accurately against `Date.now()`.
- [ ] Spacebar starts and pauses timer instantly with audio feedback.
- [ ] Fullscreen (`F`) and idle camouflage work seamlessly.
- [ ] Refreshing page preserves timer state and settings.
- [ ] Bundle size remains under 45KB gzipped.
