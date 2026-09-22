// ============================================================
// STATS MODAL — Productivity Intelligence & Analytics Layer
//
// DESIGN:
// - Obsidian Layered Architecture (mirrors SettingsModal spatial depth)
// - Minimalist, calm typography-first layout (no corporate dashboard clutter)
// - Pure CSS bar visualizations & monthly consistency matrix
// - 100% Local-First & Privacy Preserving
// ============================================================

import { useState, useMemo, useEffect, useRef } from 'react';
import type { ProductivityStats } from '../../core/types';
import {
  computeDailyStats,
  computeWeeklyStats,
  computeMonthlyStats,
  computeStreaks,
  computeInsights,
  formatDurationMinutes,
  getLocalDateISO,
} from '../../core/productivityAnalytics';
import styles from './StatsModal.module.css';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: ProductivityStats;
  onDeleteHistory: () => void;
  onUpdateGoals: (targetMinutes: number, targetSessions: number) => void;
}

type StatsTab = 'summary' | 'trends' | 'history';

export function StatsModal({
  isOpen,
  onClose,
  stats,
  onDeleteHistory,
  onUpdateGoals,
}: StatsModalProps) {
  const [activeTab, setActiveTab] = useState<StatsTab>('summary');
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      triggerElementRef.current = document.activeElement as HTMLElement | null;
      setConfirmClearOpen(false);

      requestAnimationFrame(() => {
        const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable && focusable.length > 0) {
          focusable[0].focus();
        }
      });
    } else if (triggerElementRef.current) {
      triggerElementRef.current.focus();
      triggerElementRef.current = null;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (confirmClearOpen) {
          setConfirmClearOpen(false);
        } else {
          onClose();
        }
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, confirmClearOpen, onClose]);

  // Memoized aggregations (only compute when modal is opened or history changes)
  const todayISO = useMemo(() => getLocalDateISO(), []);
  const todayStats = useMemo(
    () => computeDailyStats(stats.history, todayISO),
    [stats.history, todayISO],
  );
  const weeklyStats = useMemo(
    () => computeWeeklyStats(stats.history),
    [stats.history],
  );
  const monthlyStats = useMemo(
    () => computeMonthlyStats(stats.history),
    [stats.history],
  );
  const streakInfo = useMemo(
    () => computeStreaks(stats.history, todayISO),
    [stats.history, todayISO],
  );
  const insights = useMemo(
    () => computeInsights(stats.history, stats),
    [stats.history, stats],
  );

  if (!isOpen) return null;

  // Maximum value for weekly chart normalization
  const maxWeeklyMinutes = Math.max(
    60,
    ...weeklyStats.days.map((d) => d.focusMinutes),
    stats.dailyTargetMinutes,
  );

  const goalPercent = Math.min(
    100,
    stats.dailyTargetMinutes > 0
      ? Math.round((todayStats.focusMinutes / stats.dailyTargetMinutes) * 100)
      : 0,
  );

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="stats-modal-title"
    >
      <div className={styles.modal} ref={modalRef}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.titleWrapper}>
            <h2 id="stats-modal-title" className={styles.title}>
              Focus Analytics
            </h2>
            <span className={styles.subtitle}>Private on device</span>
          </div>

          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close analytics modal"
            type="button"
          >
            <CloseIcon />
          </button>
        </header>

        {/* Navigation Tabs */}
        <div className={styles.tabBar} role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'summary'}
            className={`${styles.tabButton} ${activeTab === 'summary' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('summary')}
            type="button"
          >
            Overview
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'trends'}
            className={`${styles.tabButton} ${activeTab === 'trends' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('trends')}
            type="button"
          >
            Trends
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'history'}
            className={`${styles.tabButton} ${activeTab === 'history' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('history')}
            type="button"
          >
            History ({stats.history.length})
          </button>
        </div>

        {/* Content Body */}
        <div className={styles.content}>
          {/* TAB 1: SUMMARY */}
          {activeTab === 'summary' && (
            <div className={styles.tabPane}>
              {/* Primary Focus Metric Cards */}
              <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                  <span className={styles.metricLabel}>Today's Focus</span>
                  <span className={styles.metricValue}>
                    {formatDurationMinutes(todayStats.focusMinutes)}
                  </span>
                  <span className={styles.metricSub}>
                    {todayStats.completedSessions} completed {todayStats.completedSessions === 1 ? 'session' : 'sessions'}
                  </span>
                </div>

                <div className={styles.metricCard}>
                  <span className={styles.metricLabel}>This Week</span>
                  <span className={styles.metricValue}>
                    {formatDurationMinutes(weeklyStats.weeklyTotalMinutes)}
                  </span>
                  <span className={styles.metricSub}>
                    Avg {formatDurationMinutes(weeklyStats.dailyAverageMinutes)} / day
                  </span>
                </div>

                <div className={styles.metricCard}>
                  <span className={styles.metricLabel}>Active Streak</span>
                  <span className={styles.metricValue}>
                    {streakInfo.currentStreakDays} <span className={styles.metricUnit}>days</span>
                  </span>
                  <span className={styles.metricSub}>
                    Best: {streakInfo.longestStreakDays} days
                  </span>
                </div>

                <div className={styles.metricCard}>
                  <span className={styles.metricLabel}>Completion Rate</span>
                  <span className={styles.metricValue}>
                    {todayStats.completionRate}%
                  </span>
                  <span className={styles.metricSub}>
                    {todayStats.interruptedSessions} interrupted
                  </span>
                </div>
              </div>

              {/* Daily Target Progress */}
              <div className={styles.goalSection}>
                <div className={styles.goalHeader}>
                  <div className={styles.goalInfo}>
                    <span className={styles.goalTitle}>Daily Target</span>
                    <span className={styles.goalSubtitle}>
                      {todayStats.focusMinutes}m of {stats.dailyTargetMinutes}m goal reached
                    </span>
                  </div>
                  <span className={styles.goalPercentBadge}>{goalPercent}%</span>
                </div>

                <div className={styles.goalTrack} aria-hidden="true">
                  <div
                    className={styles.goalFill}
                    style={{ width: `${goalPercent}%` }}
                  />
                </div>

                {/* Quick Target Adjustments */}
                <div className={styles.targetAdjusters}>
                  <span className={styles.targetAdjusterLabel}>Set Target:</span>
                  {[30, 60, 90, 120].map((mins) => (
                    <button
                      key={mins}
                      className={`${styles.targetBtn} ${
                        stats.dailyTargetMinutes === mins ? styles.targetBtnActive : ''
                      }`}
                      onClick={() => onUpdateGoals(mins, Math.round(mins / 25))}
                      type="button"
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
              </div>

              {/* Derived Insights */}
              {insights.length > 0 && (
                <div className={styles.insightsSection}>
                  <h3 className={styles.sectionHeading}>Insights</h3>
                  <div className={styles.insightsList}>
                    {insights.map((insight) => (
                      <div key={insight.id} className={styles.insightItem}>
                        <span className={styles.insightDot} aria-hidden="true" />
                        <span className={styles.insightText}>{insight.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: TRENDS */}
          {activeTab === 'trends' && (
            <div className={styles.tabPane}>
              {/* Weekly Visualization */}
              <div className={styles.chartSection}>
                <div className={styles.chartHeader}>
                  <h3 className={styles.sectionHeading}>Weekly Rhythm</h3>
                  <span className={styles.chartSubtitle}>Monday – Sunday</span>
                </div>

                <div
                  className={styles.weeklyChart}
                  role="img"
                  aria-label="Weekly focus minutes chart"
                >
                  {weeklyStats.days.map((day) => {
                    const barHeightPercent = Math.max(
                      6,
                      Math.round((day.focusMinutes / maxWeeklyMinutes) * 100),
                    );
                    const isToday = day.dateISO === todayISO;

                    return (
                      <div key={day.dateISO} className={styles.chartCol}>
                        <div className={styles.barTrack}>
                          <div
                            className={`${styles.barFill} ${
                              isToday ? styles.barToday : ''
                            } ${day.focusMinutes > 0 ? styles.barActive : ''}`}
                            style={{ height: `${barHeightPercent}%` }}
                            title={`${day.dayName} (${day.dateISO}): ${formatDurationMinutes(
                              day.focusMinutes,
                            )}`}
                          />
                        </div>
                        <span
                          className={`${styles.colLabel} ${isToday ? styles.labelToday : ''}`}
                        >
                          {day.dayName}
                        </span>
                        <span className={styles.colMinutes}>
                          {day.focusMinutes > 0 ? `${day.focusMinutes}m` : '—'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Monthly Consistency Rhythm */}
              <div className={styles.monthSection}>
                <div className={styles.chartHeader}>
                  <h3 className={styles.sectionHeading}>
                    {monthlyStats.monthName} {monthlyStats.year}
                  </h3>
                  <span className={styles.chartSubtitle}>
                    {monthlyStats.activeDaysCount} active days ·{' '}
                    {formatDurationMinutes(monthlyStats.monthlyTotalMinutes)}
                  </span>
                </div>

                <div
                  className={styles.monthGrid}
                  role="grid"
                  aria-label={`${monthlyStats.monthName} focus consistency`}
                >
                  {monthlyStats.days.map((day) => {
                    const isToday = day.dateISO === todayISO;
                    return (
                      <div
                        key={day.dayNumber}
                        className={`${styles.dayCell} ${
                          day.hasActivity ? styles.dayActive : ''
                        } ${isToday ? styles.dayToday : ''}`}
                        title={`${day.dateISO}: ${formatDurationMinutes(day.focusMinutes)}`}
                      >
                        <span className={styles.dayNumber}>{day.dayNumber}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HISTORY */}
          {activeTab === 'history' && (
            <div className={styles.tabPane}>
              {stats.history.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>○</div>
                  <h4 className={styles.emptyTitle}>No focus history recorded</h4>
                  <p className={styles.emptyDesc}>
                    Your completed and tracked sessions will appear here automatically.
                  </p>
                </div>
              ) : (
                <div className={styles.historyContainer}>
                  <div className={styles.historyHeader}>
                    <span className={styles.historyCount}>
                      {stats.history.length} logged sessions
                    </span>
                    <button
                      className={styles.clearBtn}
                      onClick={() => setConfirmClearOpen(true)}
                      type="button"
                    >
                      Clear History
                    </button>
                  </div>

                  <div className={styles.historyList} role="feed">
                    {stats.history.map((record) => {
                      const completedAt = record.completedAt || record.timestamp || Date.now();
                      const dateObj = new Date(completedAt);
                      const timeStr = dateObj.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      });
                      const dateStr = getLocalDateISO(dateObj);
                      const isCompleted =
                        record.completionType === 'COMPLETED' || record.completed === true;

                      const durationSec =
                        record.actualFocusedDurationSeconds ??
                        (record.durationMinutes ? record.durationMinutes * 60 : 0);
                      const displayMinutes = Math.round(durationSec / 60);

                      return (
                        <div key={record.id} className={styles.historyItem}>
                          <div className={styles.itemMeta}>
                            <span className={styles.itemMode}>{record.mode}</span>
                            <span className={styles.itemTime}>
                              {dateStr} · {timeStr}
                            </span>
                          </div>

                          <div className={styles.itemStatus}>
                            <span className={styles.itemDuration}>
                              {displayMinutes > 0 ? `${displayMinutes} min` : '< 1 min'}
                            </span>
                            <span
                              className={`${styles.badge} ${
                                isCompleted ? styles.badgeSuccess : styles.badgeMuted
                              }`}
                            >
                              {record.completionType || (isCompleted ? 'COMPLETED' : 'RESET')}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Confirmation Modal Overlay for Clearing History */}
        {confirmClearOpen && (
          <div className={styles.confirmOverlay} role="alertdialog">
            <div className={styles.confirmBox}>
              <h4 className={styles.confirmTitle}>Delete Focus History?</h4>
              <p className={styles.confirmDesc}>
                This will delete your local session timeline and reset your streak counters to zero.
                Your timer settings will remain untouched.
              </p>
              <div className={styles.confirmActions}>
                <button
                  className={styles.cancelBtn}
                  onClick={() => setConfirmClearOpen(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className={styles.dangerBtn}
                  onClick={() => {
                    onDeleteHistory();
                    setConfirmClearOpen(false);
                  }}
                  type="button"
                >
                  Delete History
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
    </svg>
  );
}
