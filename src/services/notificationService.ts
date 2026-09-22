// ============================================================
// NOTIFICATION SERVICE — Browser Web Notifications
//
// DESIGN:
// - Explicit permission requests only upon direct user interaction.
// - Graceful fallback when notifications are blocked or unsupported.
// - Supports focus vs break notification granularity.
// - Subscribes to decoupled timerEvents.
// ============================================================

import type { TimerMode } from '../core/types';
import { MODE_LABELS } from '../core/constants';
import { timerEvents } from '../core/timerEvents';

const NOTIFICATION_ICON = '/favicon.svg';

class NotificationService {
  private permission: NotificationPermission = 'default';
  private enabled = false;
  private focusNotificationEnabled = true;
  private breakNotificationEnabled = true;
  private unregisterListener: (() => void) | null = null;

  constructor() {
    this.initPermissionState();
    this.initEvents();
  }

  private initPermissionState(): void {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      this.permission = Notification.permission;
    }
  }

  private initEvents(): void {
    if (this.unregisterListener) return;

    this.unregisterListener = timerEvents.on('SESSION_COMPLETED', (event) => {
      if (event.mode === 'FOCUS' && !this.focusNotificationEnabled) return;
      if (event.mode !== 'FOCUS' && !this.breakNotificationEnabled) return;

      this.notifySessionComplete(event.mode, event.nextMode);
    });
  }

  isSupported(): boolean {
    return typeof window !== 'undefined' && 'Notification' in window;
  }

  getPermission(): NotificationPermission {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      this.permission = Notification.permission;
    }
    return this.permission;
  }

  async requestPermission(): Promise<boolean> {
    if (!this.isSupported()) return false;

    if (Notification.permission === 'granted') {
      this.permission = 'granted';
      return true;
    }
    if (Notification.permission === 'denied') {
      this.permission = 'denied';
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      this.permission = result;
      return result === 'granted';
    } catch {
      return false;
    }
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  setFocusNotificationEnabled(enabled: boolean): void {
    this.focusNotificationEnabled = enabled;
  }

  setBreakNotificationEnabled(enabled: boolean): void {
    this.breakNotificationEnabled = enabled;
  }

  private canNotify(): boolean {
    return (
      this.enabled &&
      this.isSupported() &&
      this.getPermission() === 'granted'
    );
  }

  notifySessionComplete(completedMode: TimerMode, nextMode: TimerMode): void {
    if (!this.canNotify()) return;

    const completedLabel = MODE_LABELS[completedMode] ?? completedMode;
    const nextLabel = MODE_LABELS[nextMode] ?? nextMode;

    try {
      const n = new Notification(`${completedLabel} complete!`, {
        body: `Time for ${nextLabel}. Click to return.`,
        icon: NOTIFICATION_ICON,
        badge: NOTIFICATION_ICON,
        tag: 'chronos-timer',
        silent: true, // Audio handled by AudioService
      });

      setTimeout(() => n.close(), 6000);

      n.onclick = () => {
        window.focus();
        n.close();
      };
    } catch (err) {
      console.warn('[Notification] Failed to show notification:', err);
    }
  }

  testNotification(): boolean {
    if (!this.isSupported() || this.getPermission() !== 'granted') {
      return false;
    }

    try {
      const n = new Notification('Chronos Focus Notification Test', {
        body: 'Notifications are working perfectly!',
        icon: NOTIFICATION_ICON,
        badge: NOTIFICATION_ICON,
        tag: 'chronos-test',
        silent: true,
      });
      setTimeout(() => n.close(), 5000);
      return true;
    } catch {
      return false;
    }
  }
}

export const notificationService = new NotificationService();
