import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { navigationRef } from './RootNavigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { RootStackParamList } from '../types';
import { colors } from '../styles/theme';
import HomeScreen from '../screens/HomeScreen';
import SleepCalculatorScreen from '../screens/SleepCalculatorScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsStackNavigator from './SettingsStackNavigator';
import WindDownScreen from '../screens/WindDownScreen';

const Tab = createBottomTabNavigator<RootStackParamList>();

type NavigationProps = {
  isDarkMode: boolean;
};

const tabBarIcon = (routeName: string, isDarkMode: boolean) =>
  ({ focused, size }: { focused: boolean; size: number }) => {
    let iconName: string;
    const color = isDarkMode ? 'white' : 'black';

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
      case 'WindDown':
        iconName = focused ? 'moon' : 'moon-outline';
        break;
      default:
        iconName = 'help-circle-outline';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  };

const AppNavigator: React.FC<NavigationProps> = ({ isDarkMode }) => {
  const theme = isDarkMode ? colors.dark : colors.light;

  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.subText,
          tabBarStyle: {
            backgroundColor: theme.card,
            borderTopColor: theme.border,
          },
          tabBarIcon: tabBarIcon(route.name, isDarkMode),
          headerStyle: {
            backgroundColor: theme.card,
          },
          headerTintColor: theme.text,
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'SleepSync' }}
        />
        <Tab.Screen
          name="SleepCalculator"
          component={SleepCalculatorScreen}
          options={{ title: 'Sleep Calculator' }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{ title: 'History' }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsStackNavigator}
          options={{ title: 'Settings' }}
        />
        <Tab.Screen
          name="WindDown"
          component={WindDownScreen}
          options={{
            title: 'Wind Down',
            tabBarButton: () => null,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
