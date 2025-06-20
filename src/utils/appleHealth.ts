import HealthKit, { HealthKitPermissions, HealthInputOptions, HealthValue } from 'react-native-health';

const permissions: HealthKitPermissions = {
  permissions: {
    read: [HealthKit.Constants.Permissions.SleepAnalysis],
    write: [],
  },
};

export const requestHealthPermissions = async (): Promise<boolean> => {
  return new Promise(resolve => {
    HealthKit.initHealthKit(permissions, (err: string) => {
      if (err) {
        console.error('HealthKit permission error:', err);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

export interface SleepSample {
  startDate: Date;
  endDate: Date;
  value: string;
}

export const fetchSleepSamples = async (startDate: Date, endDate: Date = new Date()): Promise<SleepSample[]> => {
  return new Promise((resolve, reject) => {
    const options: HealthInputOptions = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    } as HealthInputOptions;

    HealthKit.getSleepSamples(options, (err: string, results: HealthValue[]) => {
      if (err) {
        console.error('Error fetching sleep samples:', err);
        reject(err);
        return;
      }

      const samples: SleepSample[] = results.map(sample => ({
        startDate: new Date(sample.startDate),
        endDate: new Date(sample.endDate),
        value: String(sample.value),
      }));
      resolve(samples);
    });
  });
};
