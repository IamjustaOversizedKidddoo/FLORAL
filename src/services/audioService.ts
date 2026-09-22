// ============================================================
// AUDIO SERVICE — Zero-asset Web Audio API synthesizer
//
// DESIGN:
// - Real-time acoustic synthesis via Web Audio API.
// - Supports independent completion themes for Focus, Short Break, Long Break.
// - Provides isolated previewSound() that doesn't mutate timer state.
// - Subscribes to decoupled timerEvents.
// ============================================================

import type { SoundTheme, TimerMode } from '../core/types';
import { timerEvents } from '../core/timerEvents';

class AudioService {
  private ctx: AudioContext | null = null;
  private enabled = true;
  private volume = 0.65;
  private focusTheme: SoundTheme = 'ZEN_BOWL';
  private breakTheme: SoundTheme = 'SOFT_BELL';
  private longBreakTheme: SoundTheme = 'ZEN_BOWL';
  private unregisterListener: (() => void) | null = null;

  constructor() {
    this.initEvents();
  }

  private initEvents(): void {
    if (this.unregisterListener) return;

    this.unregisterListener = timerEvents.on('SESSION_COMPLETED', (event) => {
      this.playCompletionForMode(event.mode);
    });
  }

  // --------------------------------------------------------
  // AudioContext initialization (lazy, user-gesture-safe)
  // --------------------------------------------------------
  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      try {
        const AudioCtxClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtxClass) {
          this.ctx = new AudioCtxClass();
        }
      } catch {
        console.warn('[Audio] Web Audio API not available');
        return null;
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }

    return this.ctx;
  }

  // --------------------------------------------------------
  // Configuration Setters
  // --------------------------------------------------------
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  setFocusTheme(theme: SoundTheme): void {
    this.focusTheme = theme;
  }

  setBreakTheme(theme: SoundTheme): void {
    this.breakTheme = theme;
  }

  setLongBreakTheme(theme: SoundTheme): void {
    this.longBreakTheme = theme;
  }

  // Backward compatibility
  setTheme(theme: SoundTheme): void {
    this.focusTheme = theme;
  }

  // --------------------------------------------------------
  // ACOUSTIC SYNTHESIZERS
  // --------------------------------------------------------

  // 1. Zen Singing Bowl (fundamental + harmonics + natural 3.2s decay)
  private playZenBowl(ctx: AudioContext, vol: number): void {
    const now = ctx.currentTime;
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(0.8, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.7 * vol, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

    const frequencies = [261.63, 523.25, 784.88]; // C4, C5, G5
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      oscGain.gain.setValueAtTime(1 / (i + 1), now);

      osc.connect(oscGain);
      oscGain.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 3.3);
    });
  }

  // 2. Soft Bell (two-note melodic chime, 1.8s decay)
  private playSoftBell(ctx: AudioContext, vol: number): void {
    const now = ctx.currentTime;
    const tones = [
      { freq: 440, start: 0 },      // A4
      { freq: 587.33, start: 0.25 }, // D5
    ];

    tones.forEach(({ freq, start }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + start);

      gain.gain.setValueAtTime(0.0001, now + start);
      gain.gain.exponentialRampToValueAtTime(0.5 * vol, now + start + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + start + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + start);
      osc.stop(now + start + 1.9);
    });
  }

  // 3. Mechanical Click (precision shutter double-click)
  private playMechanical(ctx: AudioContext, vol: number): void {
    this.playClick(ctx, vol);
    setTimeout(() => {
      const c2 = this.initContext();
      if (c2) this.playClick(c2, vol);
    }, 120);
  }

  private playClick(ctx: AudioContext, vol: number): void {
    const now = ctx.currentTime;
    const bufferSize = Math.floor(ctx.sampleRate * 0.008); // 8ms
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(4000, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15 * vol, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    source.start(now);
  }

  // --------------------------------------------------------
  // Sound Synthesis Router
  // --------------------------------------------------------
  private synthesizeTheme(theme: SoundTheme, vol: number): void {
    if (theme === 'MUTED' || vol <= 0) return;
    const ctx = this.initContext();
    if (!ctx) return;

    switch (theme) {
      case 'ZEN_BOWL':
        this.playZenBowl(ctx, vol);
        break;
      case 'SOFT_BELL':
        this.playSoftBell(ctx, vol);
        break;
      case 'MECHANICAL':
        this.playMechanical(ctx, vol);
        break;
    }
  }

  // --------------------------------------------------------
  // PUBLIC API
  // --------------------------------------------------------
  playCompletionForMode(mode: TimerMode): void {
    if (!this.enabled) return;

    let theme: SoundTheme = this.focusTheme;
    if (mode === 'SHORT_BREAK') {
      theme = this.breakTheme;
    } else if (mode === 'LONG_BREAK') {
      theme = this.longBreakTheme;
    }

    this.synthesizeTheme(theme, this.volume);
  }

  playSessionComplete(): void {
    if (!this.enabled) return;
    this.synthesizeTheme(this.focusTheme, this.volume);
  }

  playBreakComplete(): void {
    if (!this.enabled) return;
    this.synthesizeTheme(this.breakTheme, this.volume);
  }

  playButtonPress(): void {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;
    this.playClick(ctx, this.volume * 0.6);
  }

  /**
   * Preview a sound theme without mutating timer state or settings.
   */
  previewSound(theme: SoundTheme, volume?: number): void {
    const vol = typeof volume === 'number' ? Math.max(0, Math.min(1, volume)) : this.volume;
    this.synthesizeTheme(theme, vol);
  }

  unlock(): void {
    this.initContext();
  }
}

export const audioService = new AudioService();
export const previewSound = (theme: SoundTheme, volume?: number) => audioService.previewSound(theme, volume);
