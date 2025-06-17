import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Switch,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppSettings, WindDownOption } from '../types';
import { colors, getGlobalStyles } from '../styles/theme';
import { loadAppSettings, saveAppSettings } from '../utils/storage';
import WindDownSelector from '../components/WindDownSelector';
import TimePicker from '../components/TimePicker';
import { scheduleDailyWindDownReminder } from '../utils/notifications';

const SettingsScreen: React.FC = () => {
  const deviceColorScheme = useColorScheme();
  const [settings, setSettings] = useState<AppSettings>({
    use24HourFormat: false,
    theme: 'system',
    optimizeSleepCycles: false,
    defaultSleepDuration: 8,
    defaultWindDownPeriod: 30,
    lockdownMode: false,
    windDownReminderTime: null,
  });

  // Use app settings for dark mode if available, otherwise use system
  const isDarkMode = settings.theme === 'system'
    ? deviceColorScheme === 'dark'
    : settings.theme === 'dark';

  const theme = isDarkMode ? colors.dark : colors.light;
  const styles = getGlobalStyles(isDarkMode);

  // Load settings
  useEffect(() => {
    const loadSettings = async () => {
      const savedSettings = await loadAppSettings();
      if (savedSettings) {
        setSettings(savedSettings);
        if (savedSettings.windDownReminderTime) {
          scheduleDailyWindDownReminder(savedSettings.windDownReminderTime);
        }
      }
    };

    loadSettings();
  }, []);

  // Save when settings change
  const updateSettings = (updates: Partial<AppSettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    saveAppSettings(newSettings);
    if (updates.windDownReminderTime) {
      scheduleDailyWindDownReminder(updates.windDownReminderTime);
    }
  };

  // Format sleep duration display
  const formatSleepDuration = (hours: number): string => {
    const wholeHours = Math.floor(hours);
    const minutes = (hours - wholeHours) * 60;

    if (minutes === 0) {
      return `${wholeHours} hours`;
    } else {
      return `${wholeHours} hours ${minutes} min`;
    }
  };

  const parseTime = (timeStr: string): Date => {
    const [h, m] = timeStr.split(':').map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d;
  };

  const toTimeString = (date: Date): string => {
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  };

  // Wind-down period options
  const windDownOptions: WindDownOption[] = [15, 30, 45, 60];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={localStyles.scrollView}>
        <Text style={styles.header}>Settings</Text>

        {/* Display & Time Settings */}
        <View style={styles.card}>
          <Text style={styles.subHeader}>Display & Time</Text>

          <View style={localStyles.settingRow}>
            <Text style={styles.text}>Use 24-hour format</Text>
            <Switch
              value={settings.use24HourFormat}
              onValueChange={(value) => updateSettings({ use24HourFormat: value })}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor={theme.card}
            />
          </View>

          <View style={localStyles.settingRow}>
            <Text style={styles.text}>Dark Theme</Text>
            <View style={localStyles.themeSelector}>
              <TouchableOpacity
                style={[
                  localStyles.themeOption,
                  settings.theme === 'light' && localStyles.selectedTheme,
                  { borderColor: theme.border }
                ]}
                onPress={() => updateSettings({ theme: 'light' })}
              >
                <Ionicons
                  name={settings.theme === 'light' ? 'checkmark-circle' : 'ellipse-outline'}
                  size={16}
                  color={theme.primary}
                />
                <Text style={[styles.caption, localStyles.themeText]}>Light</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  localStyles.themeOption,
                  settings.theme === 'dark' && localStyles.selectedTheme,
                  { borderColor: theme.border }
                ]}
                onPress={() => updateSettings({ theme: 'dark' })}
              >
                <Ionicons
                  name={settings.theme === 'dark' ? 'checkmark-circle' : 'ellipse-outline'}
                  size={16}
                  color={theme.primary}
                />
                <Text style={[styles.caption, localStyles.themeText]}>Dark</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  localStyles.themeOption,
                  settings.theme === 'system' && localStyles.selectedTheme,
                  { borderColor: theme.border }
                ]}
                onPress={() => updateSettings({ theme: 'system' })}
              >
                <Ionicons
                  name={settings.theme === 'system' ? 'checkmark-circle' : 'ellipse-outline'}
                  size={16}
                  color={theme.primary}
                />
                <Text style={[styles.caption, localStyles.themeText]}>System</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Sleep Settings */}
        <View style={styles.card}>
          <Text style={styles.subHeader}>Default Sleep Settings</Text>

          <View style={localStyles.settingRow}>
            <Text style={styles.text}>Optimize for sleep cycles</Text>
            <Switch
              value={settings.optimizeSleepCycles}
              onValueChange={(value) => updateSettings({ optimizeSleepCycles: value })}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor={theme.card}
            />
          </View>

          <Text style={[styles.caption, { marginTop: 8 }]}>
            When enabled, sleep duration will be adjusted to complete full 90-minute sleep cycles
          </Text>

          <View style={[styles.sliderContainer, { marginTop: 20 }]}>
            <View style={styles.sliderLabel}>
              <Text style={styles.text}>Default Sleep Duration</Text>
              <Text style={[styles.sliderValue, { color: theme.primary }]}>
                {formatSleepDuration(settings.defaultSleepDuration)}
              </Text>
            </View>
            <Slider
              value={settings.defaultSleepDuration}
              onValueChange={(value) => updateSettings({ defaultSleepDuration: value })}
              minimumValue={6}
              maximumValue={10}
              step={0.25}
              minimumTrackTintColor={theme.primary}
              maximumTrackTintColor={theme.border}
              thumbTintColor={theme.primary}
              style={styles.slider}
            />
          </View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.text}>Default Wind-down Period</Text>
          <WindDownSelector
            options={windDownOptions}
            selectedOption={settings.defaultWindDownPeriod}
            onSelect={(value) => updateSettings({ defaultWindDownPeriod: value })}
            isDarkMode={isDarkMode}
          />
        </View>
      </View>

      {/* Notifications */}
      <View style={styles.card}>
        <Text style={styles.subHeader}>Wind-down Notifications</Text>

        <View style={localStyles.settingRow}>
          <Text style={styles.text}>Lockdown Mode</Text>
          <Switch
            value={settings.lockdownMode}
            onValueChange={(value) => updateSettings({ lockdownMode: value })}
            trackColor={{ false: theme.border, true: theme.primary }}
            thumbColor={theme.card}
          />
        </View>

        <TimePicker
          label="Reminder Time"
          value={parseTime(settings.windDownReminderTime || '21:00')}
          onChange={(date) =>
            updateSettings({ windDownReminderTime: toTimeString(date) })
          }
          isDarkMode={isDarkMode}
          use24HourFormat={true}
        />
        <Text style={[styles.caption, { marginTop: 4 }]}>Daily reminder to start winding down</Text>
      </View>

        {/* About */}
        <View style={styles.card}>
          <Text style={styles.subHeader}>About</Text>
          <Text style={styles.text}>SleepSync v1.0.0</Text>
          <Text style={[styles.caption, { marginTop: 8 }]}>
            A simple tool to help you optimize your sleep schedule
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  themeSelector: {
    flexDirection: 'row',
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  selectedTheme: {
    borderWidth: 2,
  },
  themeText: {
    marginLeft: 4,
  }
});

export default SettingsScreen;
