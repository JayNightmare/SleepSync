/**
 * SleepSync - Sleep Schedule Optimizer
 * 
 * A mobile application that helps users determine the optimal time to go to sleep
 * based on a desired wake-up time, personalized sleep duration, and wind-down buffer.
 * 
 * @format
 */

import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { loadAppSettings } from './src/utils/storage';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(colorScheme === 'dark');
  
  useEffect(() => {
    // Load saved theme preference
    const loadTheme = async () => {
      const settings = await loadAppSettings();
      if (settings?.theme) {
        setIsDarkMode(
          settings.theme === 'system' 
            ? colorScheme === 'dark'
            : settings.theme === 'dark'
        );
      }
    };
    
    loadTheme();
  }, [colorScheme]);

  return <AppNavigator isDarkMode={isDarkMode} />;
}

export default App;
