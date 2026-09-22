// ============================================================
// useKeyboardShortcuts — Global hotkey binding
//
// DESIGN:
// - Hotkeys are disabled when any <input>, <textarea>, or
//   <select> is focused (prevents misfires in settings forms)
// - Hotkeys are disabled when a modal is open (except Escape)
// - Respects settings.keyboardShortcutsEnabled and settings.spaceToStartPause
// ============================================================

import { useEffect, useCallback } from 'react';
import { SHORTCUTS } from '../core/constants';

interface ShortcutHandlers {
  onStartPause: () => void;
  onReset: () => void;
  onSkip: () => void;
  onFullscreen: () => void;
  onSettings: () => void;
  onHelp: () => void;
  onMute: () => void;
  onEscape: () => void;
  disabled?: boolean;
  shortcutsEnabled?: boolean;
  spaceToStartPause?: boolean;
}

function isInputFocused(): boolean {
  const el = document.activeElement;
  if (!el) return false;
  const tag = el.tagName.toLowerCase();
  return (
    tag === 'input' ||
    tag === 'textarea' ||
    tag === 'select' ||
    (el as HTMLElement).isContentEditable ||
    el.getAttribute('role') === 'textbox'
  );
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Escape always works regardless of focus state
      if (e.key === 'Escape') {
        handlers.onEscape();
        return;
      }

      // Check if global shortcuts are disabled or user is typing in form field
      if (
        isInputFocused() ||
        handlers.disabled ||
        handlers.shortcutsEnabled === false
      ) {
        return;
      }

      // Check for Spacebar (e.code === 'Space' or e.key === ' ' or 'Space')
      const isSpace = e.code === 'Space' || e.key === ' ' || e.key === 'Space';
      if (isSpace) {
        if (handlers.spaceToStartPause !== false) {
          // If a button or link is currently focused, let native keyboard activation occur
          const activeTag = document.activeElement?.tagName.toLowerCase();
          if (activeTag === 'button' || activeTag === 'a') {
            return;
          }
          e.preventDefault();
          handlers.onStartPause();
        }
        return;
      }

      // Case-insensitive match for letter shortcuts
      const keyLower = e.key.toLowerCase();

      switch (keyLower) {
        case SHORTCUTS.RESET.toLowerCase():
          handlers.onReset();
          break;
        case SHORTCUTS.SKIP.toLowerCase():
          handlers.onSkip();
          break;
        case SHORTCUTS.FULLSCREEN.toLowerCase():
          e.preventDefault();
          handlers.onFullscreen();
          break;
        case SHORTCUTS.SETTINGS:
          handlers.onSettings();
          break;
        case SHORTCUTS.HELP:
          handlers.onHelp();
          break;
        case SHORTCUTS.MUTE.toLowerCase():
          handlers.onMute();
          break;
      }
    },
    [handlers],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
