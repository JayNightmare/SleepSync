import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { RootStackParamList } from '../types';
import { colors } from '../styles/theme';
import HomeScreen from '../screens/HomeScreen';
import SleepCalculatorScreen from '../screens/SleepCalculatorScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Tab navigator
const Tab = createBottomTabNavigator<RootStackParamList>();

// Define mapping of route names to icons (outside of component)
const routeIcons: Record<string, { active: string; inactive: string }> = {
  Home: { active: 'home', inactive: 'home-outline' },
  SleepCalculator: { active: 'calculator', inactive: 'calculator-variant' },
  History: { active: 'history', inactive: 'history' },
  Settings: { active: 'cog', inactive: 'cog-outline' },
};

interface NavigationProps {
  isDarkMode: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ theme }) => {
  const systemColorScheme = useColorScheme();
  const isDarkMode = theme === 'system'
    ? systemColorScheme === 'dark'
    : theme === 'dark';

  // Use correct theme colors
  // Create a custom theme for react-navigation
  const navigationTheme = {
    dark: isDarkMode,
    colors: {
      primary: isDarkMode ? colors.dark.primary : colors.light.primary,
      background: isDarkMode ? colors.dark.background : colors.light.background,
      card: isDarkMode ? colors.dark.card : colors.light.card,
      text: isDarkMode ? colors.dark.text : colors.light.text,
      border: isDarkMode ? colors.dark.border : colors.light.border,
      notification: isDarkMode ? colors.dark.accent : colors.light.accent,
    },
  } as const;

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          tabBarActiveTintColor: isDarkMode ? colors.dark.primary : colors.light.primary,
          tabBarInactiveTintColor: isDarkMode ? colors.dark.subText : colors.light.subText,
          tabBarStyle: {
            backgroundColor: isDarkMode ? colors.dark.card : colors.light.card,
            borderTopColor: isDarkMode ? colors.dark.border : colors.light.border,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'SleepCalculator') {
              iconName = focused ? 'calculator' : 'calculator-variant';
            } else if (route.name === 'History') {
              iconName = focused ? 'history' : 'history';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'cog' : 'cog-outline';
            }

            return <Icon name={iconName || 'help'} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'SleepSync',
            headerStyle: {
              backgroundColor: isDarkMode ? colors.dark.card : colors.light.card,
            },
            headerTintColor: isDarkMode ? colors.dark.text : colors.light.text,
          }}
        />
        <Tab.Screen
          name="SleepCalculator"
          component={SleepCalculatorScreen}
          options={{
            title: 'Sleep Calculator',
            headerStyle: {
              backgroundColor: isDarkMode ? colors.dark.card : colors.light.card,
            },
            headerTintColor: isDarkMode ? colors.dark.text : colors.light.text,
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{
            title: 'History',
            headerStyle: {
              backgroundColor: isDarkMode ? colors.dark.card : colors.light.card,
            },
            headerTintColor: isDarkMode ? colors.dark.text : colors.light.text,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings',
            headerStyle: {
              backgroundColor: isDarkMode ? colors.dark.card : colors.light.card,
            },
            headerTintColor: isDarkMode ? colors.dark.text : colors.light.text,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
