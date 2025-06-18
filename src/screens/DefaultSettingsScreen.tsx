import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, useColorScheme } from 'react-native';
import Slider from '@react-native-community/slider';
import { colors, getGlobalStyles } from '../styles/theme';
import { AppSettings } from '../types';
import { loadAppSettings, saveAppSettings } from '../utils/storage';

const DefaultSettingsScreen: React.FC = () => {
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

  const formatSleepDuration = (hours: number): string => {
    const wholeHours = Math.floor(hours);
    const minutes = (hours - wholeHours) * 60;
    return minutes === 0 ? `${wholeHours} hours` : `${wholeHours} hours ${minutes} min`;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background, padding: 16 }]}>
      <View style={localStyles.settingRow}>
        <Text style={[styles.text, { color: theme.text }]}>Optimize for sleep cycles</Text>
        <Switch
          value={settings.optimizeSleepCycles}
          onValueChange={(value) => updateSettings({ optimizeSleepCycles: value })}
          trackColor={{ false: theme.border, true: theme.primary }}
          thumbColor={theme.card}
        />
      </View>

      <Text style={[styles.caption, { marginTop: 8, color: theme.text }]}>
        When enabled, sleep duration will be adjusted to complete full 90-minute sleep cycles
      </Text>

      <View style={localStyles.sliderContainer}>
        <Text style={[styles.text, { color: theme.text }]}>Default Sleep Duration</Text>
        <Text style={[styles.caption, { color: theme.primary }]}>
          {formatSleepDuration(settings.defaultSleepDuration)}
        </Text>
        <Slider
          value={settings.defaultSleepDuration}
          onValueChange={(value) => updateSettings({ defaultSleepDuration: value })}
          minimumValue={6}
          maximumValue={10}
          step={0.25}
          minimumTrackTintColor={theme.primary}
          maximumTrackTintColor={theme.border}
          thumbTintColor={theme.primary}
        />
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
  },
  sliderContainer: {
    marginTop: 16,
  },
});

export default DefaultSettingsScreen;
