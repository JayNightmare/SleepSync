import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  StyleSheet,
  // Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { loadAppSettings, loadSleepHistory, loadSleepSettings } from '../utils/storage';
import { calculateSleepTimes } from '../utils/sleepCalculator';
import { colors, getGlobalStyles } from '../styles/theme';
import { SleepHistoryEntry, SleepSettings } from '../types';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const [appSettings, setAppSettings] = useState<any>(null);
  const [lastSettings, setLastSettings] = useState<SleepSettings | null>(null);
  const [recentHistory, setRecentHistory] = useState<SleepHistoryEntry[]>([]);
  
  // Use app settings for dark mode if available, otherwise use system
  const isDarkMode = appSettings?.theme === 'system'
    ? colorScheme === 'dark'
    : appSettings?.theme === 'dark';
    
  const theme = isDarkMode ? colors.dark : colors.light;
  const styles = getGlobalStyles(isDarkMode);

  // Load settings
  useEffect(() => {
    const loadData = async () => {
      const settings = await loadAppSettings();
      setAppSettings(settings);

      const sleep = await loadSleepSettings();
      setLastSettings(sleep);

      const history = await loadSleepHistory();
      if (history && history.length > 0) {
        setRecentHistory(history.slice(0, 3)); // Get most recent 3 entries
      }
    };

    loadData();
  }, []);

  // Format time
  const formatTime = (date: Date) => {
    if (!date) return '';
    
    const use24Hour = appSettings?.use24HourFormat || false;
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: !use24Hour 
    });
  };

  // Go to the calculator screen
  const goToCalculator = () => {
    navigation.navigate('SleepCalculator' as never);
  };

  // Go to history screen
  const goToHistory = () => {
    navigation.navigate('History' as never);
  };

  // Go to settings screen
  const goToSettings = () => {
    navigation.navigate('Settings' as never);
  };

  // Calculate current sleep times based on last settings
  const currentTimes = lastSettings
    ? calculateSleepTimes(
        lastSettings.wakeUpTime,
        lastSettings.sleepDuration,
        lastSettings.windDownPeriod
      )
    : null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={localStyles.scrollContent}>
        <View style={localStyles.welcomeContainer}>
          <View style={[localStyles.logoContainer]}>
            <Ionicons name="moon" size={40} color={theme.primary} />
            <Text style={[styles.logo, localStyles.logo]}>SleepSync</Text>
          </View>
          <Text style={[styles.text, { color: theme.subText }]}>
            Your personal sleep schedule optimizer
          </Text>
        </View>

        {/* Last used settings card */}
        {lastSettings && currentTimes && (
          <TouchableOpacity 
            style={[styles.card, localStyles.lastUsedCard]}
            onPress={goToCalculator}
          >
            <View style={localStyles.cardHeader}>
              <Text style={styles.header}>Tonight's Sleep Plan</Text>
              <Ionicons name="chevron-forward" size={24} color={theme.primary} />
            </View>

            <View style={localStyles.timesRow}>
              <View style={localStyles.timeItem}>
                <Text style={[styles.caption, { color: theme.subText }]}>Wind down</Text>
                <Text style={[styles.timeDisplay, { fontSize: 22 }]}>
                  {formatTime(currentTimes.windDownTime)}
                </Text>
              </View>

              <View style={localStyles.timeItem}>
                <Text style={[styles.caption, { color: theme.subText }]}>Bedtime</Text>
                <Text style={[styles.timeDisplay, { fontSize: 22 }]}>
                  {formatTime(currentTimes.bedtime)}
                </Text>
              </View>

              <View style={localStyles.timeItem}>
                <Text style={[styles.caption, { color: theme.subText }]}>Wake up</Text>
                <Text style={[styles.timeDisplay, { fontSize: 22 }]}>
                  {formatTime(lastSettings.wakeUpTime)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}

        {/* Main actions */}
        <View style={localStyles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.card, localStyles.actionCard]}
            onPress={goToCalculator}
          >
            <Ionicons name="calculator" size={36} color={theme.primary} />
            <Text style={[styles.subHeader, { marginTop: 12 }]}>Calculate Sleep</Text>
            <Text style={[styles.caption, { textAlign: 'center' }]}>
              Find your optimal bedtime based on when you want to wake up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.card, localStyles.actionCard]}
            onPress={goToHistory}
          >
            <Ionicons name="time" size={36} color={theme.primary} />
            <Text style={[styles.subHeader, { marginTop: 12 }]}>Sleep History</Text>
            <Text style={[styles.caption, { textAlign: 'center' }]}>
              View your saved sleep schedules
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.card, localStyles.actionCard]}
            onPress={goToSettings}
          >
            <Ionicons name="settings" size={36} color={theme.primary} />
            <Text style={[styles.subHeader, { marginTop: 12 }]}>Settings</Text>
            <Text style={[styles.caption, { textAlign: 'center' }]}>
              Customize your app preferences
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  logo: {
    marginLeft: 8,
    marginBottom: 0,
  },
  lastUsedCard: {
    marginBottom: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  timesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeItem: {
    alignItems: 'center',
    flex: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 16,
  },
});

export default HomeScreen;
