import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { RootStackParamList } from '../types';
import { colors } from '../styles/theme';
import HomeScreen from '../screens/HomeScreen';
import SleepCalculatorScreen from '../screens/SleepCalculatorScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Tab navigator
const Tab = createBottomTabNavigator<RootStackParamList>();


interface NavigationProps {
  isDarkMode: boolean;
}

const getTabBarIcon = (routeName: string, isDarkMode: boolean) => 
  ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
      let iconName: string;

      switch (routeName) {
        case 'Home':
          iconName = focused ? 'home' : 'home-outline';
          break;
        case 'SleepCalculator':
          iconName = focused ? 'bed' : 'bed-outline';
          break;
        case 'History':
          iconName = focused ? 'time' : 'time-outline';
          break;
        case 'Settings':
          iconName = focused ? 'settings' : 'settings-outline';
          break;
        default:
          iconName = 'help-circle-outline';
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    };


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
          headerShown: false,
          tabBarActiveTintColor: isDarkMode ? colors.dark.primary : colors.light.primary,
          tabBarInactiveTintColor: isDarkMode ? colors.dark.subText : colors.light.subText,
          tabBarStyle: {
            backgroundColor: isDarkMode ? colors.dark.card : colors.light.card,
            borderTopColor: isDarkMode ? colors.dark.border : colors.light.border,
          },
          tabBarIcon: getTabBarIcon(route.name, isDarkMode),
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          // options={{
          //   title: 'SleepSync',
          //   headerStyle: {
          //     backgroundColor: isDarkMode ? colors.dark.card : colors.light.card,
          //   },
          //   headerTintColor: isDarkMode ? colors.dark.text : colors.light.text,
          // }}
        />
        <Tab.Screen
          name="SleepCalculator"
          component={SleepCalculatorScreen}
          // options={{
          //   title: 'Sleep Calculator',
          //   headerStyle: {
          //     backgroundColor: isDarkMode ? colors.dark.card : colors.light.card,
          //   },
          //   headerTintColor: isDarkMode ? colors.dark.text : colors.light.text,
          // }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          // options={{
          //   title: 'History',
          //   headerStyle: {
          //     backgroundColor: isDarkMode ? colors.dark.card : colors.light.card,
          //   },
          //   headerTintColor: isDarkMode ? colors.dark.text : colors.light.text,
          // }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          // options={{
          //   title: 'Settings',
          //   headerStyle: {
          //     backgroundColor: isDarkMode ? colors.dark.card : colors.light.card,
          //   },
          //   headerTintColor: isDarkMode ? colors.dark.text : colors.light.text,
          // }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
