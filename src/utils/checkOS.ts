import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const initializeHealthData = async () => {
    if (Platform.OS === 'ios') {
        // Initialize Apple Health if available
        try {
            const HealthKit = require('react-native-health').default;
            return await HealthKit.initHealthKit({
                permissions: {
                    read: ['Sleep'],
                    write: ['Sleep']
                }
            });
        } catch (error) {
            console.log('Apple Health not available, using local storage');
            return false;
        }
    } else {
        // For Android, use local storage or Google Fit
        console.log('Using local storage for sleep data on Android');
        return true;
    }
};

export const getSleepData = async () => {
    if (Platform.OS === 'ios') {
        // Try Apple Health first, fallback to AsyncStorage
        try {
            const HealthKit = require('react-native-health').default;
            return await HealthKit.getSamples({
                startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                endDate: new Date().toISOString(),
                type: 'Sleep'
            });
        } catch (error) {
            // Fallback to local storage
            return await getLocalSleepData();
        }
    } else {
        // Android: use local storage
        return await getLocalSleepData();
    }
};

const getLocalSleepData = async () => {
    try {
        const data = await AsyncStorage.getItem('sleepHistory');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading local sleep data:', error);
        return [];
    }
};