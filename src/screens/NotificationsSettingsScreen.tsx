import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, useColorScheme } from 'react-native';
import { colors, getGlobalStyles } from '../styles/theme';
import { AppSettings } from '../types';
import { loadAppSettings, saveAppSettings } from '../utils/storage';
import TimePicker from '../components/TimePicker';
import { scheduleDailyWindDownReminder } from '../utils/notifications';

const NotificationsSettingsScreen: React.FC = () => {
  const deviceColorScheme = useColorScheme();
  const [settings, setSettings] = useState<AppSettings>({
    use24HourFormat: false,
    theme: 'system',
    optimizeSleepCycles: false,
    defaultSleepDuration: 8,
    defaultWindDownPeriod: 30,
    enableWatchTracking: false,
    lockdownMode: false,
    windDownReminderTime: null,
  });

  const isDarkMode = settings.theme === 'system'
    ? deviceColorScheme === 'dark'
    : settings.theme === 'dark';

  const theme = isDarkMode ? colors.dark : colors.light;
  const styles = getGlobalStyles(isDarkMode);

  useEffect(() => {
    const loadSettings = async () => {
      const savedSettings = await loadAppSettings();
      if (savedSettings) {
        setSettings(savedSettings);
      }
    };
    loadSettings();
  }, []);

  const updateSettings = (updates: Partial<AppSettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    saveAppSettings(newSettings);
    if (updates.windDownReminderTime) {
      scheduleDailyWindDownReminder(updates.windDownReminderTime);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background, padding: 16 }]}>
      <View style={localStyles.settingRow}>
        <Text style={[styles.text, { color: theme.text }]}>Lockdown Mode</Text>
        <Switch
          value={settings.lockdownMode}
          onValueChange={(value) => updateSettings({ lockdownMode: value })}
          trackColor={{ false: theme.border, true: theme.primary }}
          thumbColor={theme.card}
        />
      </View>

      <TimePicker
        label="Reminder Time"
        value={settings.windDownReminderTime ? new Date('1970-01-01T' + settings.windDownReminderTime + ':00') : new Date('1970-01-01T21:00:00')}
        onChange={(date) => updateSettings({ windDownReminderTime: date.toTimeString().slice(0,5) })}
        isDarkMode={isDarkMode}
        use24HourFormat={settings.use24HourFormat}
      />
      <Text style={[styles.caption, { marginTop: 4, color: theme.text }]}>Daily reminder to start winding down</Text>
    </View>
  );
};

const localStyles = StyleSheet.create({
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
});

export default NotificationsSettingsScreen;
