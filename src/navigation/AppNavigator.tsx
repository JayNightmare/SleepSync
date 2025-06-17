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
import SettingsScreen from '../screens/SettingsScreen';
import WindDownScreen from '../screens/WindDownScreen';

const Tab = createBottomTabNavigator<RootStackParamList>();

const TabBarIcon = (props: {
  route: keyof RootStackParamList;
  focused: boolean;
  color: string;
  size: number;
}) => {
  const { route, focused, color, size } = props;
  let iconName = 'help-circle';

  if (route === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route === 'SleepCalculator') {
    iconName = focused ? 'calculator' : 'calculator-outline';
  } else if (route === 'History') {
    iconName = focused ? 'time' : 'time-outline';
  } else if (route === 'Settings') {
    iconName = focused ? 'settings' : 'settings-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

type NavigationProps = {
  isDarkMode: boolean;
};

const tabBarIcon = (
  route: keyof RootStackParamList,
  _theme: typeof colors.light | typeof colors.dark
) => ({ focused, color, size }: { focused: boolean; color: string; size: number }) => (
  <TabBarIcon
    route={route}
    focused={focused}
    color={color}
    size={size}
  />
);

const AppNavigator: React.FC<NavigationProps> = ({ isDarkMode }) => {
  const theme = isDarkMode ? colors.dark : colors.light;

  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.subText,
          tabBarStyle: {
            backgroundColor: theme.card,
            borderTopColor: theme.border,
          },
          tabBarIcon: tabBarIcon(route.name as keyof RootStackParamList, theme),
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
          component={SettingsScreen}
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
