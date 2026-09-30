// ============================================================
// useDaggers — Master state hook for the Daggers tracker
// ============================================================

import { useState, useCallback } from 'react';
import {
  loadDaggersStore,
  updateDayEntry,
  updateConfig,
  addChronosFocusMinutes,
  resetDaggersStore,
  todayDayNumber,
} from '../storageService';
import type { DaggersPersistedStore, DayEntry, ProgrammeConfig } from '../types';
import { TOTAL_DAYS } from '../constants';
import { useChronosLink } from './useChronosLink';

export function useDaggers() {
  const [store, setStore] = useState<DaggersPersistedStore>(() => loadDaggersStore());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const currentDayNumber = todayDayNumber(store.config.startDate);

  // Overall progress: average completion score of active/past days
  const activeDays = store.days.filter((d) => d.dayNumber <= Math.min(currentDayNumber, TOTAL_DAYS));
  const overallProgress =
    activeDays.length > 0
      ? Math.round(activeDays.reduce((sum, d) => sum + d.completionScore, 0) / activeDays.length)
      : 0;

  // ---- Day actions ----
  const updateDay = useCallback((dayNumber: number, patch: Partial<DayEntry>) => {
    setStore((prev) => updateDayEntry(prev, dayNumber, patch));
  }, []);

  // ---- Config actions ----
  const updateProgrammeConfig = useCallback((patch: Partial<ProgrammeConfig>) => {
    setStore((prev) => updateConfig(prev, patch));
  }, []);

  // ---- CHRONOS integration ----
  const addFocusMinutes = useCallback((minutes: number) => {
    setStore((prev) => addChronosFocusMinutes(prev, minutes));
  }, []);

  useChronosLink(addFocusMinutes);

  // ---- Reset ----
  const resetAll = useCallback(() => {
    const fresh = resetDaggersStore();
    setStore(fresh);
    setSelectedDay(null);
  }, []);

  return {
    store,
    days: store.days,
    config: store.config,
    selectedDay,
    currentDayNumber: Math.max(0, Math.min(currentDayNumber, TOTAL_DAYS)),
    overallProgress,
    selectDay: setSelectedDay,
    updateDay,
    updateProgrammeConfig,
    addFocusMinutes,
    resetAll,
    setStore,
  };
}
