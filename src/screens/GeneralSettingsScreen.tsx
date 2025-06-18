import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, useColorScheme } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, getGlobalStyles } from '../styles/theme';
import { AppSettings } from '../types';
import { loadAppSettings, saveAppSettings } from '../utils/storage';

const GeneralSettingsScreen: React.FC = () => {
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
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={localStyles.settingRow}>
        <Text style={[styles.text, { color: theme.text }]}>Use 24-hour format</Text>
        <Switch
          value={settings.use24HourFormat}
          onValueChange={(value) => updateSettings({ use24HourFormat: value })}
          trackColor={{ false: theme.border, true: theme.primary }}
          thumbColor={theme.card}
        />
      </View>

      <View style={localStyles.settingRow}>
        <Text style={[styles.text, { color: theme.text }]}>Enable Watch Tracking</Text>
        <Switch
          value={settings.enableWatchTracking}
          onValueChange={(value) => updateSettings({ enableWatchTracking: value })}
          trackColor={{ false: theme.border, true: theme.primary }}
          thumbColor={theme.card}
        />
      </View>

      <View style={localStyles.settingRow}>
        <Text style={[styles.text, { color: theme.text }]}>Dark Theme</Text>
        <View style={localStyles.themeSelector}>
          {['light', 'dark', 'system'].map((themeOption) => (
            <Ionicons
              key={themeOption}
              name={settings.theme === themeOption ? 'checkmark-circle' : 'ellipse-outline'}
              size={24}
              color={theme.primary}
              style={{ marginHorizontal: 8 }}
              onPress={() => updateSettings({ theme: themeOption as 'light' | 'dark' | 'system' })}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  themeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default GeneralSettingsScreen;
