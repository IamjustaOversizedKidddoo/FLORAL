// ============================================================
// SettingsPage — Configuration, Backup & Storage Management
// Implements safe JSON export/import and isolated persistence
// ============================================================

import { useState, useRef } from 'react';
import styles from './SettingsPage.module.css';
import type { ProgrammeConfig, DaggersPersistedStore } from '../../types';
import {
  updateConfig,
  resetDaggersStore,
  todayDayNumber,
  exportTrackerBackup,
  validateAndImportTrackerBackup,
  getLastStorageError,
} from '../../storageService';
import { DAGGERS_STORAGE_KEY } from '../../constants';

interface SettingsPageProps {
  store: DaggersPersistedStore;
  onStoreChange: (next: DaggersPersistedStore) => void;
}

export function SettingsPage({ store, onStoreChange }: SettingsPageProps) {
  const [startDate, setStartDate] = useState(store.config.startDate);
  const [candidateName, setCandidateName] = useState(store.config.candidateName ?? '');
  const [saved, setSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  // Backup import/export state
  const [importStatus, setImportStatus] = useState<{ success: boolean; msg: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const currentDay = todayDayNumber(store.config.startDate);
  const hasStarted = currentDay >= 1;
  const storageError = getLastStorageError();

  const handleSave = () => {
    const patch: Partial<ProgrammeConfig> = { startDate, candidateName: candidateName.trim() || undefined };
    const next = updateConfig(store, patch);
    onStoreChange(next);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 4000);
      return;
    }
    const fresh = resetDaggersStore();
    onStoreChange(fresh);
    setStartDate(fresh.config.startDate);
    setCandidateName('');
    setConfirmReset(false);
  };

  // Export JSON backup
  const handleExportBackup = () => {
    const backupJson = exportTrackerBackup(store);
    const blob = new Blob([backupJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    link.href = url;
    link.download = `floral_mighty_daggers_backup_${dateStr}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Import JSON backup
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const confirmed = window.confirm(
      'WARNING: Importing a backup will completely replace all your existing logged days, progress, and settings with the backup file.\n\nEnsure you have exported your current data first. Do you want to proceed?',
    );

    if (!confirmed) {
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const result = validateAndImportTrackerBackup(content);
      if (result.success && result.store) {
        onStoreChange(result.store);
        setStartDate(result.store.config.startDate);
        setCandidateName(result.store.config.candidateName ?? '');
        setImportStatus({ success: true, msg: 'Backup restored successfully! All 90 days and configurations loaded.' });
      } else {
        setImportStatus({ success: false, msg: result.error || 'Failed to import backup.' });
      }
      setTimeout(() => setImportStatus(null), 6000);
    };
    reader.onerror = () => {
      setImportStatus({ success: false, msg: 'Failed to read backup file.' });
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Programme Settings & Data</h2>
        <p className={styles.pageSubtitle}>Configure probation timeline, backup your training logs, and view persistence telemetry.</p>
      </div>

      {/* Storage failure alert */}
      {storageError && (
        <div className={styles.alertDanger} role="alert">
          ⚠ Storage Warning: {storageError}
        </div>
      )}

      {/* Import status notification */}
      {importStatus && (
        <div className={importStatus.success ? styles.alertSuccess : styles.alertDanger} role="status">
          {importStatus.success ? '✓ ' : '✕ '}
          {importStatus.msg}
        </div>
      )}

      {/* Programme Configuration */}
      <section className={styles.card}>
        <div className={styles.cardTitle}>
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <rect x="2" y="2" width="10" height="10" rx="1.5" />
            <path d="M5 7h4M7 5v4" strokeLinecap="round" />
          </svg>
          Programme Configuration
        </div>

        <div className={styles.fields}>
          {/* Start Date */}
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="start-date">
              Programme Start Date
            </label>
            <p className={styles.fieldHint}>
              Day 1 of your 90-day probation period.
              {hasStarted && currentDay <= 90
                ? ` Currently on Day ${Math.min(currentDay, 90)}.`
                : currentDay > 90
                  ? ' Programme has concluded.'
                  : ' Scheduled for the future.'}
            </p>
            <input
              id="start-date"
              className={styles.input}
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Candidate Name (optional) */}
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="candidate-name">
              Candidate Name <span className={styles.optional}>(optional)</span>
            </label>
            <p className={styles.fieldHint}>
              Displayed in the tactical header. Leave blank for anonymous tracking.
            </p>
            <input
              id="candidate-name"
              className={styles.input}
              type="text"
              placeholder="e.g. Capt. Vikram"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              maxLength={60}
            />
          </div>
        </div>

        <button
          type="button"
          className={`${styles.saveBtn} ${saved ? styles.saved : ''}`}
          onClick={handleSave}
          aria-live="polite"
        >
          {saved ? '✓ Configuration Saved' : 'Save Configuration'}
        </button>
      </section>

      {/* Data Backup & Restore */}
      <section className={styles.card}>
        <div className={styles.cardTitle}>
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M7 1v8M4 6l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 10v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2" strokeLinecap="round" />
          </svg>
          Data Persistence & Backup
        </div>

        <div className={styles.warningBox}>
          Your logs, workout records, SSB practice, and journal entries are persisted locally in browser storage.
          Export a backup regularly to safeguard your progress across devices or browser cache clears.
        </div>

        <div className={styles.backupActions}>
          <div className={styles.backupRow}>
            <div className={styles.backupDesc}>
              <span className={styles.backupTitle}>Export Tracker Backup</span>
              <span className={styles.backupSub}>Downloads a complete, verified JSON file of your entire 90-day progress.</span>
            </div>
            <button type="button" className={styles.actionBtn} onClick={handleExportBackup}>
              Export JSON Backup
            </button>
          </div>

          <div className={styles.backupRow}>
            <div className={styles.backupDesc}>
              <span className={styles.backupTitle}>Import Backup File</span>
              <span className={styles.backupSub}>Restore progress from a previous export file. Replaces current logs.</span>
            </div>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <button
                type="button"
                className={styles.actionBtn}
                onClick={() => fileInputRef.current?.click()}
              >
                Import JSON Backup
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Persistence Architecture */}
      <section className={styles.card}>
        <div className={styles.cardTitle}>
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <circle cx="7" cy="7" r="5" />
            <path d="M7 5v2l1.5 1.5" strokeLinecap="round" />
          </svg>
          Architecture & Storage Isolation
        </div>

        <div className={styles.infoGrid}>
          {[
            { label: 'Programme Name', value: store.config.programmeTitle },
            { label: 'Target Unit', value: store.config.targetUnit },
            { label: 'Tracker Storage Key', value: DAGGERS_STORAGE_KEY },
            { label: 'CHRONOS Storage Key', value: 'chronos_focus_v1 (Untouched & Isolated)' },
            { label: 'CHRONOS Integration', value: 'Read-only telemetry & intent launcher' },
            { label: 'Schema Version', value: `v${store.version}` },
            {
              label: 'Last Saved',
              value: new Date(store.lastSavedTimestamp).toLocaleTimeString(),
            },
          ].map(({ label, value }) => (
            <div key={label} className={styles.infoRow}>
              <span className={styles.infoLabel}>{label}</span>
              <span className={styles.infoValue}>{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Danger zone: reset */}
      <section className={`${styles.card} ${styles.dangerCard}`}>
        <div className={styles.cardTitle} style={{ color: 'var(--d-danger)' }}>
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M7 2L13 12H1L7 2Z" />
            <path d="M7 6v3M7 10.5v.5" strokeLinecap="round" />
          </svg>
          Danger Zone
        </div>

        <p className={styles.dangerText}>
          Resetting the programme will permanently erase all logged days, reflections, PT records, and SSB
          practice data. CHRONOS timer settings and focus history remain 100% untouched.
        </p>

        <button
          type="button"
          className={`${styles.resetBtn} ${confirmReset ? styles.resetConfirm : ''}`}
          onClick={handleReset}
          aria-label={
            confirmReset ? 'Confirm: permanently reset all programme data' : 'Reset programme data'
          }
        >
          {confirmReset ? '⚠ Confirm Reset — click again to erase all data' : 'Reset Programme'}
        </button>
      </section>
    </div>
  );
}
