export interface SleepSession {
  startTime: string;
  endTime: string;
  title: string;
  notes: string;
}

export interface HealthConnectModule {
  requestPermissions(): Promise<boolean>;
  getSleepSessions(startTime: string, endTime: string): Promise<SleepSession[]>;
}

declare module 'react-native' {
  interface NativeModulesStatic {
    HealthConnect: HealthConnectModule;
  }
}
