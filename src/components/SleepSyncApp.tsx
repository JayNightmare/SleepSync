import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,

  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Slider from '@react-native-community/slider';

import { calculateSleepTimes } from '../utils/sleepCalculator';
import { loadSleepSettings, saveSleepSettings } from '../utils/storage';
import { getGlobalStyles, colors } from '../styles/theme';
import { SleepSettings, WindDownOption } from '../types';

import TimePicker from '../components/TimePicker';
import WindDownSelector from '../components/WindDownSelector';
import ResultCard from '../components/ResultCard';

const SleepSyncApp: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const theme = isDarkMode ? colors.dark : colors.light;
  const styles = getGlobalStyles(isDarkMode);
  
  // Default wake-up time (7:00 AM)
  const defaultWakeTime = new Date();
  defaultWakeTime.setHours(7, 0, 0, 0);
  
  // State
  const [wakeUpTime, setWakeUpTime] = useState<Date>(defaultWakeTime);
  const [sleepDuration, setSleepDuration] = useState<number>(8); // 8 hours default
  const [windDownPeriod, setWindDownPeriod] = useState<WindDownOption>(30); // 30 min default
  const [use24HourFormat, setUse24HourFormat] = useState<boolean>(false);
  
  // Sleep time calculations
  const { bedtime, windDownTime } = calculateSleepTimes(
    wakeUpTime,
    sleepDuration,
    windDownPeriod
  );
  
  // Wind-down period options
  const windDownOptions: WindDownOption[] = [15, 30, 45, 60];
  
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
  
  // Save settings when they change
  useEffect(() => {
    const settings: SleepSettings = {
      wakeUpTime,
      sleepDuration,
      windDownPeriod,
    };
    saveSleepSettings(settings);
  }, [wakeUpTime, sleepDuration, windDownPeriod]);
  
  // Load saved settings on app start
  useEffect(() => {
    const loadSettings = async () => {
      const savedSettings = await loadSleepSettings();
      if (savedSettings) {
        setWakeUpTime(savedSettings.wakeUpTime);
        setSleepDuration(savedSettings.sleepDuration);
        setWindDownPeriod(savedSettings.windDownPeriod);
      }
    };
    
    loadSettings();
  }, []);
  
  const toggleTimeFormat = () => {
    setUse24HourFormat((prev) => !prev);
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.logo}>💤 SleepSync</Text>
        
        <View style={styles.card}>
          <Text style={styles.header}>What time do you want to wake up?</Text>
          <TimePicker
            label="Wake-up Time"
            value={wakeUpTime}
            onChange={setWakeUpTime}
            isDarkMode={isDarkMode}
            use24HourFormat={use24HourFormat}
          />
          
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: theme.accent }]}
            onPress={toggleTimeFormat}
          >
            <Text style={styles.buttonText}>
              {use24HourFormat ? 'Switch to 12h format' : 'Switch to 24h format'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.header}>How much sleep do you need?</Text>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderLabel}>
              <Text style={[styles.text, { color: theme.text }]}>Sleep Duration</Text>
              <Text style={[styles.sliderValue, { color: theme.primary }]}>
                {formatSleepDuration(sleepDuration)}
              </Text>
            </View>
            <Slider
              value={sleepDuration}
              onValueChange={setSleepDuration}
              minimumValue={6}
              maximumValue={10}
              step={0.25}
              minimumTrackTintColor={theme.primary}
              maximumTrackTintColor={theme.border}
              thumbTintColor={theme.primary}
              style={styles.slider}
            />
            <View style={styles.sliderLabel}>
              <Text style={[styles.caption, { color: theme.subText }]}>6 hours</Text>
              <Text style={[styles.caption, { color: theme.subText }]}>10 hours</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.header}>Wind-down period</Text>
          <WindDownSelector
            options={windDownOptions}
            selectedOption={windDownPeriod}
            onSelect={setWindDownPeriod}
            isDarkMode={isDarkMode}
          />
        </View>
        
        <ResultCard
          bedtime={bedtime}
          windDownTime={windDownTime}
          isDarkMode={isDarkMode}
          use24HourFormat={use24HourFormat}
        />
        
        <Text style={[styles.captionCenter]}>
          SleepSync helps you optimize your sleep schedule
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SleepSyncApp;
