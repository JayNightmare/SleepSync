import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, useColorScheme } from 'react-native';
import { calculateSleepTimes } from '../utils/sleepCalculator';
import { loadAppSettings, loadSleepSettings } from '../utils/storage';
import { getGlobalStyles } from '../styles/theme';
import ResultCard from '../components/ResultCard';

const WindDownScreen: React.FC = () => {
  const scheme = useColorScheme();
  const [appSettings, setAppSettings] = useState<any>(null);
  const [bedtime, setBedtime] = useState<Date | null>(null);
  const [windDownTime, setWindDownTime] = useState<Date | null>(null);

  useEffect(() => {
    const load = async () => {
      const a = await loadAppSettings();
      const s = await loadSleepSettings();
      setAppSettings(a);
      if (s) {
        const times = calculateSleepTimes(
          s.wakeUpTime,
          s.sleepDuration,
          s.windDownPeriod,
        );
        setBedtime(times.bedtime);
        setWindDownTime(times.windDownTime);
      }
    };
    load();
  }, []);

  const isDarkMode = appSettings?.theme === 'system'
    ? scheme === 'dark'
    : appSettings?.theme === 'dark';
  const styles = getGlobalStyles(isDarkMode);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ padding: 16 }}>
        <Text style={styles.header}>Wind-down Tips</Text>
        {bedtime && windDownTime && (
          <ResultCard
            bedtime={bedtime}
            windDownTime={windDownTime}
            isDarkMode={isDarkMode}
            use24HourFormat={appSettings?.use24HourFormat}
          />
        )}
        <Text style={[styles.subHeader, { marginTop: 12 }]}>Suggestions</Text>
        <Text style={styles.text}>• Dim the lights and reduce screen use.</Text>
        <Text style={styles.text}>• Try meditation or gentle stretching.</Text>
        <Text style={styles.text}>• Prepare for tomorrow to clear your mind.</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WindDownScreen;
