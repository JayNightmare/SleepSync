export type WindDownOption = 15 | 30 | 45 | 60;

export interface SleepSettings {
  wakeUpTime: Date;
  sleepDuration: number; // in hours (with 0.25 increments)
  windDownPeriod: WindDownOption;
}

export interface SleepHistoryEntry extends SleepSettings {
  id: string;
  createdAt: Date;
  title?: string;
  /** Rating from 1 (poor) to 5 (great) */
  quality?: number;
  /** Meditation or wind-down technique used */
  technique?: string;
}

export type ThemeMode = 'light' | 'dark';

// Navigation Types
export type RootStackParamList = {
  Home: undefined;
  SleepCalculator: undefined;
  History: undefined;
  Settings: undefined;
  WindDown: undefined;
};

export interface AppSettings {
  use24HourFormat: boolean;
  theme: ThemeMode | 'system';
  optimizeSleepCycles: boolean;
  defaultSleepDuration: number;
  defaultWindDownPeriod: WindDownOption;
  lockdownMode: boolean;
  windDownReminderTime: string | null;
}
