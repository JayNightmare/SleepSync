import { NativeModules } from 'react-native';
import { SleepSample } from './appleHealth'; // Reuse the same interface
import { SleepSession } from '../types/HealthConnect';

const { HealthConnect } = NativeModules;

export const requestHealthPermissions = async (): Promise<boolean> => {
  try {
    const granted = await HealthConnect.requestPermissions();
    return granted;
  } catch (error) {
    console.error('Health Connect permission error:', error);
    return false;
  }
};

export const fetchSleepSamples = async (startDate: Date, endDate: Date = new Date()): Promise<SleepSample[]> => {
  try {
    const sleepRecords: SleepSession[] = await HealthConnect.getSleepSessions(
      startDate.toISOString(), 
      endDate.toISOString()
    );
    
    return sleepRecords.map((record) => ({
      startDate: new Date(record.startTime),
      endDate: new Date(record.endTime),
      value: '4', // Default sleep stage value for Health Connect data
    }));
  } catch (error) {
    console.error('Error fetching sleep samples:', error);
    throw error;
  }
};
