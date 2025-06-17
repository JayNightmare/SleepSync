import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    AppSettings,
    SleepHistoryEntry,
    SleepSettings,
    ThemeMode,
} from '../types';

// Storage keys
const SLEEP_SETTINGS_KEY = '@SleepSync:sleepSettings';
const THEME_MODE_KEY = '@SleepSync:themeMode';
const SLEEP_HISTORY_KEY = '@SleepSync:sleepHistory';
const APP_SETTINGS_KEY = '@SleepSync:appSettings';

/**
 * Save sleep settings to AsyncStorage
 */
export const saveSleepSettings = async (
    settings: SleepSettings,
): Promise<void> => {
    try {
        const jsonValue = JSON.stringify({
            ...settings,
            wakeUpTime: settings.wakeUpTime.toISOString(),
        });
        await AsyncStorage.setItem(SLEEP_SETTINGS_KEY, jsonValue);
    } catch (error) {
        console.error('Error saving sleep settings:', error);
    }
};

/**
 * Load sleep settings from AsyncStorage
 */
export const loadSleepSettings = async (): Promise<SleepSettings | null> => {
    try {
        const jsonValue = await AsyncStorage.getItem(SLEEP_SETTINGS_KEY);

        if (jsonValue !== null) {
            const parsedValue = JSON.parse(jsonValue);
            return {
                ...parsedValue,
                wakeUpTime: new Date(parsedValue.wakeUpTime),
            };
        }
        return null;
    } catch (error) {
        console.error('Error loading sleep settings:', error);
        return null;
    }
};

/**
 * Save theme mode to AsyncStorage
 */
export const saveThemeMode = async (mode: ThemeMode): Promise<void> => {
    try {
        await AsyncStorage.setItem(THEME_MODE_KEY, mode);
    } catch (error) {
        console.error('Error saving theme mode:', error);
    }
};

/**
 * Load theme mode from AsyncStorage
 */
export const loadThemeMode = async (): Promise<ThemeMode | null> => {
    try {
        const value = await AsyncStorage.getItem(THEME_MODE_KEY);
        return value as ThemeMode | null;
    } catch (error) {
        console.error('Error loading theme mode:', error);
        return null;
    }
};

/**
 * Save a sleep session to history
 */
export const saveSleepHistoryEntry = async (
    settings: SleepSettings,
    extras?: { quality?: number; technique?: string },
): Promise<void> => {
    try {
        // Get existing history
        const history = await loadSleepHistory();

        // Create a new entry with timestamp and ID
        const newEntry: SleepHistoryEntry = {
            ...settings,
            id: Date.now().toString(),
            createdAt: new Date(),
            quality: extras?.quality,
            technique: extras?.technique,
        };

        // Add to history
        const updatedHistory = [newEntry, ...(history || [])];

        // Keep only the last 20 entries
        const trimmedHistory = updatedHistory.slice(0, 20);

        // Save updated history
        await AsyncStorage.setItem(
            SLEEP_HISTORY_KEY,
            JSON.stringify(trimmedHistory),
        );
    } catch (error) {
        console.error('Error saving sleep history:', error);
    }
};

/**
 * Load sleep history from AsyncStorage
 */
export const loadSleepHistory = async (): Promise<
    SleepHistoryEntry[] | null
> => {
    try {
        const jsonValue = await AsyncStorage.getItem(SLEEP_HISTORY_KEY);

        if (jsonValue !== null) {
            const history = JSON.parse(jsonValue) as SleepHistoryEntry[];
            return history.map(entry => ({
                ...entry,
                wakeUpTime: new Date(entry.wakeUpTime),
                createdAt: new Date(entry.createdAt),
                ...(entry.watchStart ? { watchStart: new Date(entry.watchStart) } : {}),
                ...(entry.watchEnd ? { watchEnd: new Date(entry.watchEnd) } : {}),
                quality: entry.quality,
                technique: entry.technique,
            }));
        }
        return [];
    } catch (error) {
        console.error('Error loading sleep history:', error);
        return [];
    }
};

/**
 * Update a history entry with a title
 */
export const updateHistoryEntry = async (
    id: string,
    updates: Partial<SleepHistoryEntry>,
): Promise<void> => {
    try {
        const history = await loadSleepHistory();
        if (!history) return;

        const updatedHistory = history.map(entry =>
            entry.id === id ? { ...entry, ...updates } : entry,
        );

        await AsyncStorage.setItem(
            SLEEP_HISTORY_KEY,
            JSON.stringify(updatedHistory),
        );
    } catch (error) {
        console.error('Error updating history entry:', error);
    }
};

/**
 * Delete a history entry
 */
export const deleteHistoryEntry = async (id: string): Promise<void> => {
    try {
        const history = await loadSleepHistory();
        if (!history) return;

        const updatedHistory = history.filter(entry => entry.id !== id);
        await AsyncStorage.setItem(
            SLEEP_HISTORY_KEY,
            JSON.stringify(updatedHistory),
        );
    } catch (error) {
        console.error('Error deleting history entry:', error);
    }
};

/**
 * Save app settings
 */
export const saveAppSettings = async (settings: AppSettings): Promise<void> => {
    try {
        await AsyncStorage.setItem(APP_SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
        console.error('Error saving app settings:', error);
    }
};

/**
 * Load app settings
 */
export const loadAppSettings = async (): Promise<AppSettings | null> => {
    try {
        const jsonValue = await AsyncStorage.getItem(APP_SETTINGS_KEY);

        if (jsonValue !== null) {
            return JSON.parse(jsonValue) as AppSettings;
        }

        // Default settings
        return {
            use24HourFormat: false,
            theme: 'system',
            optimizeSleepCycles: false,
            defaultSleepDuration: 8,
            defaultWindDownPeriod: 30,
            enableWatchTracking: false,
            lockdownMode: false,
            windDownReminderTime: null,
        };
    } catch (error) {
        console.error('Error loading app settings:', error);
        return null;
    }
};
