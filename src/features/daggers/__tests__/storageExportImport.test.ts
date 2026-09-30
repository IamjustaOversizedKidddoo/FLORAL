// ============================================================
// STORAGE BACKUP EXPORT & IMPORT TESTS
// Validates backup structure, strict schema validation, rejection of
// corrupt or invalid imports, and complete CHRONOS data preservation
// ============================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  createDefaultStore,
  exportTrackerBackup,
  validateAndImportTrackerBackup,
  updateDayEntry,
  loadDaggersStore,
  saveDaggersStore,
  getLastStorageError,
} from '../storageService';
import { CHRONOS_STORAGE_KEY } from '../services/chronosIntegrationService';

describe('Storage Backup Export & Import Engine', () => {
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

  it('exports a valid, structured JSON backup file with metadata', () => {
    let store = createDefaultStore({
      startDate: '2026-03-01',
      programmeTitle: '90-Day Probation',
      targetUnit: '4 PARA SF — THE MIGHTY DAGGERS',
      candidateName: 'Vikram',
    });

    store = updateDayEntry(store, 1, {
      pt: { runDistanceKm: 5, pushUps: 30 },
      reflection: { text: 'Strong execution on Day 1.', mood: 5, overallRating: 5 },
    });

    const backupJson = exportTrackerBackup(store);
    expect(typeof backupJson).toBe('string');

    const parsed = JSON.parse(backupJson);
    expect(parsed.app).toBe('4_PARA_SF_MIGHTY_DAGGERS_PROBATION');
    expect(parsed.exportedAt).toBeTruthy();
    expect(parsed.store.config.candidateName).toBe('Vikram');
    expect(parsed.store.days).toHaveLength(90);
    expect(parsed.store.days[0].completionScore).toBeGreaterThan(0);
  });

  it('successfully validates and imports a legitimate backup file', () => {
    let store = createDefaultStore({
      startDate: '2026-03-01',
      programmeTitle: '90-Day Probation',
      targetUnit: '4 PARA SF',
    });
    store = updateDayEntry(store, 5, {
      pt: { runDistanceKm: 6, pushUps: 40 },
      reflection: { text: 'Day 5 mission completed successfully.', mood: 4, overallRating: 4 },
    });

    const exported = exportTrackerBackup(store);
    const result = validateAndImportTrackerBackup(exported);

    expect(result.success).toBe(true);
    expect(result.store).toBeDefined();
    expect(result.store?.days[4].dayNumber).toBe(5);
    expect(result.store?.days[4].completionScore).toBeGreaterThan(0);

    // Verify persisted into localStorage
    const reloaded = loadDaggersStore();
    expect(reloaded.days[4].dayNumber).toBe(5);
    expect(reloaded.days[4].completionScore).toBeGreaterThan(0);
  });

  it('rejects empty input safely', () => {
    const result = validateAndImportTrackerBackup('');
    expect(result.success).toBe(false);
    expect(result.error).toContain('empty');
  });

  it('rejects corrupted or unparseable JSON without throwing an uncaught exception', () => {
    const result = validateAndImportTrackerBackup('{ corrupt_json_missing_brace: true');
    expect(result.success).toBe(false);
    expect(result.error).toContain('Invalid JSON');
  });

  it('rejects backup missing configuration or with invalid start dates', () => {
    const invalidConfig = JSON.stringify({
      app: '4_PARA_SF_MIGHTY_DAGGERS_PROBATION',
      store: {
        config: { startDate: 'NOT_A_DATE' },
        days: new Array(90).fill({ dayNumber: 1, date: '2026-03-01' }),
      },
    });

    const result = validateAndImportTrackerBackup(invalidConfig);
    expect(result.success).toBe(false);
    expect(result.error).toContain('start date');
  });

  it('rejects backup with incomplete or wrong day count', () => {
    const partialDaysBackup = JSON.stringify({
      app: '4_PARA_SF_MIGHTY_DAGGERS_PROBATION',
      store: {
        config: { startDate: '2026-03-01', programmeTitle: 'Test' },
        days: [{ dayNumber: 1, date: '2026-03-01' }], // Only 1 day instead of 90
      },
    });

    const result = validateAndImportTrackerBackup(partialDaysBackup);
    expect(result.success).toBe(false);
    expect(result.error).toContain('expected exactly 90');
  });

  it('never modifies or overwrites CHRONOS storage during export or import', () => {
    const originalChronosData = JSON.stringify({
      version: 3,
      stats: { totalFocusMinutes: 500, history: [] },
    });
    mockStorage[CHRONOS_STORAGE_KEY] = originalChronosData;

    const store = createDefaultStore();
    const backupJson = exportTrackerBackup(store);
    validateAndImportTrackerBackup(backupJson);

    // Verify CHRONOS data is completely unchanged
    expect(mockStorage[CHRONOS_STORAGE_KEY]).toBe(originalChronosData);
  });

  it('handles localStorage failures gracefully and records error message', () => {
    const store = createDefaultStore();

    // Mock setItem throwing QuotaExceededError
    vi.stubGlobal('localStorage', {
      getItem: () => null,
      setItem: () => {
        throw new Error('QuotaExceededError: storage is full');
      },
      removeItem: () => {},
      clear: () => {},
    });

    const saved = saveDaggersStore(store);
    expect(saved).toBe(false);
    expect(getLastStorageError()).toContain('quota exceeded');
  });
});
