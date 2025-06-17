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
  /** Optional data imported from Apple Watch */
  watchStart?: Date;
  watchEnd?: Date;
  watchQuality?: number;
}

export type ThemeMode = 'light' | 'dark';

// Navigation Types
export type RootStackParamList = {
  Home: undefined;
  SleepCalculator: undefined;
  History: undefined;
  Settings: undefined;
};

export interface AppSettings {
  use24HourFormat: boolean;
  theme: ThemeMode | 'system';
  optimizeSleepCycles: boolean;
  defaultSleepDuration: number;
  defaultWindDownPeriod: WindDownOption;
  /** When enabled, sleep data is imported from Apple Watch */
  enableWatchTracking: boolean;
}
