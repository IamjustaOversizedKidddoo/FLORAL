// ============================================================
// SETTINGS VALIDATION — Strict boundary enforcement & sanitization
//
// Ensures invalid, NaN, infinite, negative, or absurd values
// never corrupt the state machine or local storage.
// ============================================================

import type { TimerSettings, SoundTheme, ColorTheme, BackgroundStyle, TimerFormatPreference } from './types';
import { DEFAULT_SETTINGS, SETTING_BOUNDS } from './constants';

const VALID_SOUND_THEMES: readonly SoundTheme[] = ['ZEN_BOWL', 'SOFT_BELL', 'MECHANICAL', 'MUTED'];
const VALID_COLOR_THEMES: readonly ColorTheme[] = ['DARK_DEEP', 'LIGHT_PAPER', 'SYSTEM'];
const VALID_BG_STYLES: readonly BackgroundStyle[] = ['OBSIDIAN_PURE', 'SUBTLE_ATMOSPHERE', 'SUBTLE_GRAIN'];
const VALID_TIMER_FORMATS: readonly TimerFormatPreference[] = ['AUTO', 'MM_SS', 'HH_MM_SS'];

/**
 * Sanitize a numerical setting: clamps, floors to whole integer, guards against NaN/infinity.
 */
export function sanitizeInt(val: unknown, min: number, max: number, fallback: number): number {
  if (typeof val !== 'number' || Number.isNaN(val) || !Number.isFinite(val)) {
    if (typeof val === 'string' && /^-?\d+(\.\d+)?$/.test(val.trim())) {
      const parsed = Math.floor(parseFloat(val));
      if (!Number.isNaN(parsed)) {
        return Math.max(min, Math.min(max, parsed));
      }
    }
    return fallback;
  }
  const floored = Math.floor(val);
  return Math.max(min, Math.min(max, floored));
}

/**
 * Sanitize a floating point setting (e.g. volume 0.0 - 1.0).
 */
export function sanitizeFloat(val: unknown, min: number, max: number, fallback: number): number {
  if (typeof val !== 'number' || Number.isNaN(val) || !Number.isFinite(val)) {
    if (typeof val === 'string') {
      const parsed = parseFloat(val);
      if (!Number.isNaN(parsed) && Number.isFinite(parsed)) {
        return Math.max(min, Math.min(max, parsed));
      }
    }
    return fallback;
  }
  return Math.max(min, Math.min(max, val));
}

/**
 * Sanitize a boolean setting.
 */
export function sanitizeBool(val: unknown, fallback: boolean): boolean {
  if (typeof val === 'boolean') return val;
  return fallback;
}

/**
 * Sanitize an enum setting against a list of allowed keys.
 */
export function sanitizeEnum<T extends string>(val: unknown, allowed: readonly T[], fallback: T): T {
  if (typeof val === 'string' && (allowed as readonly string[]).includes(val)) {
    return val as T;
  }
  return fallback;
}

/**
 * Validate and sanitize partial or complete settings, merging onto a base settings object.
 */
export function validateSettings(
  input: Partial<TimerSettings> | null | undefined,
  base: TimerSettings = DEFAULT_SETTINGS,
): TimerSettings {
  if (!input || typeof input !== 'object') {
    return { ...base };
  }
  const result: TimerSettings = { ...base };

  // 1. Durations
  if ('focusDurationMin' in input) {
    result.focusDurationMin = sanitizeInt(
      input.focusDurationMin,
      SETTING_BOUNDS.FOCUS_MIN_MIN,
      SETTING_BOUNDS.FOCUS_MIN_MAX,
      base.focusDurationMin,
    );
  }

  if ('shortBreakDurationMin' in input) {
    result.shortBreakDurationMin = sanitizeInt(
      input.shortBreakDurationMin,
      SETTING_BOUNDS.SHORT_BREAK_MIN_MIN,
      SETTING_BOUNDS.SHORT_BREAK_MIN_MAX,
      base.shortBreakDurationMin,
    );
  }

  if ('longBreakDurationMin' in input) {
    result.longBreakDurationMin = sanitizeInt(
      input.longBreakDurationMin,
      SETTING_BOUNDS.LONG_BREAK_MIN_MIN,
      SETTING_BOUNDS.LONG_BREAK_MIN_MAX,
      base.longBreakDurationMin,
    );
  }

  if ('sessionsBeforeLongBreak' in input) {
    result.sessionsBeforeLongBreak = sanitizeInt(
      input.sessionsBeforeLongBreak,
      SETTING_BOUNDS.SESSIONS_BEFORE_LONG_MIN,
      SETTING_BOUNDS.SESSIONS_BEFORE_LONG_MAX,
      base.sessionsBeforeLongBreak,
    );
  }

  // 2. Automation
  if ('autoStartBreaks' in input) {
    result.autoStartBreaks = sanitizeBool(input.autoStartBreaks, base.autoStartBreaks);
  }

  if ('autoStartFocus' in input) {
    result.autoStartFocus = sanitizeBool(input.autoStartFocus, base.autoStartFocus);
  }

  if ('autoStartCycle' in input) {
    result.autoStartCycle = sanitizeBool(input.autoStartCycle, base.autoStartCycle);
  }

  // 3. Sound
  if ('soundEnabled' in input) {
    result.soundEnabled = sanitizeBool(input.soundEnabled, base.soundEnabled);
  }

  if ('soundTheme' in input) {
    result.soundTheme = sanitizeEnum(input.soundTheme, VALID_SOUND_THEMES, base.soundTheme);
  }

  if ('breakSoundTheme' in input) {
    result.breakSoundTheme = sanitizeEnum(input.breakSoundTheme, VALID_SOUND_THEMES, base.breakSoundTheme);
  }

  if ('longBreakSoundTheme' in input) {
    result.longBreakSoundTheme = sanitizeEnum(input.longBreakSoundTheme, VALID_SOUND_THEMES, base.longBreakSoundTheme);
  }

  if ('soundVolume' in input) {
    result.soundVolume = sanitizeFloat(
      input.soundVolume,
      SETTING_BOUNDS.VOLUME_MIN,
      SETTING_BOUNDS.VOLUME_MAX,
      base.soundVolume,
    );
  }

  if ('tickSoundEnabled' in input) {
    result.tickSoundEnabled = sanitizeBool(input.tickSoundEnabled, base.tickSoundEnabled);
  }

  // 4. Notifications
  if ('notificationsEnabled' in input) {
    result.notificationsEnabled = sanitizeBool(input.notificationsEnabled, base.notificationsEnabled);
  }

  if ('focusNotificationEnabled' in input) {
    result.focusNotificationEnabled = sanitizeBool(input.focusNotificationEnabled, base.focusNotificationEnabled);
  }

  if ('breakNotificationEnabled' in input) {
    result.breakNotificationEnabled = sanitizeBool(input.breakNotificationEnabled, base.breakNotificationEnabled);
  }

  // 5. Appearance
  if ('theme' in input) {
    result.theme = sanitizeEnum(input.theme, VALID_COLOR_THEMES, base.theme);
  }

  if ('backgroundStyle' in input) {
    result.backgroundStyle = sanitizeEnum(input.backgroundStyle, VALID_BG_STYLES, base.backgroundStyle);
  }

  // 6. Display Options
  if ('showRemainingInTitle' in input) {
    result.showRemainingInTitle = sanitizeBool(input.showRemainingInTitle, base.showRemainingInTitle);
  }

  if ('showSessionDots' in input) {
    result.showSessionDots = sanitizeBool(input.showSessionDots, base.showSessionDots);
  }

  if ('showModeTabs' in input) {
    result.showModeTabs = sanitizeBool(input.showModeTabs, base.showModeTabs);
  }

  if ('timerFormat' in input) {
    result.timerFormat = sanitizeEnum(input.timerFormat, VALID_TIMER_FORMATS, base.timerFormat);
  }

  // 7. Behavior
  if ('confirmReset' in input) {
    result.confirmReset = sanitizeBool(input.confirmReset, base.confirmReset);
  }

  if ('confirmSkip' in input) {
    result.confirmSkip = sanitizeBool(input.confirmSkip, base.confirmSkip);
  }

  if ('spaceToStartPause' in input) {
    result.spaceToStartPause = sanitizeBool(input.spaceToStartPause, base.spaceToStartPause);
  }

  if ('keyboardShortcutsEnabled' in input) {
    result.keyboardShortcutsEnabled = sanitizeBool(input.keyboardShortcutsEnabled, base.keyboardShortcutsEnabled);
  }

  if ('keepScreenAwake' in input) {
    result.keepScreenAwake = sanitizeBool(input.keepScreenAwake, base.keepScreenAwake);
  }

  return result;
}
