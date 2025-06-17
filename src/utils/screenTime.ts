import { NativeModules } from 'react-native';

const { ScreenTimeModule } = NativeModules;

export interface UsageStats {
  [packageName: string]: number;
}

export const isScreenTimeAvailable = (): boolean => {
  return !!ScreenTimeModule;
};

export const getScreenTimeReport = async (): Promise<UsageStats | null> => {
  if (!ScreenTimeModule || typeof ScreenTimeModule.getScreenTimeReport !== 'function') {
    return null;
  }
  try {
    return await ScreenTimeModule.getScreenTimeReport();
  } catch (e) {
    console.warn('Failed to get screen time report', e);
    return null;
  }
};

export const setAppBlocking = async (
  packages: string[],
  start: Date,
  end: Date,
): Promise<boolean> => {
  if (!ScreenTimeModule || typeof ScreenTimeModule.setAppBlocking !== 'function') {
    return false;
  }
  try {
    await ScreenTimeModule.setAppBlocking(packages, start.getTime(), end.getTime());
    return true;
  } catch (e) {
    console.warn('Failed to set app blocking', e);
    return false;
  }
};
