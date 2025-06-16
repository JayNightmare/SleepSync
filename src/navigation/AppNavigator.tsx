import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { RootStackParamList } from '../types';
import { colors } from '../styles/theme';
import HomeScreen from '../screens/HomeScreen';
import SleepCalculatorScreen from '../screens/SleepCalculatorScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';

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
    iconName = focused ? 'calculator' : 'calculator-variant';
  } else if (route === 'History') {
    iconName = focused ? 'history' : 'history';
  } else if (route === 'Settings') {
    iconName = focused ? 'cog' : 'cog-outline';
  }

  return <Icon name={iconName} size={size} color={color} />;
};

type NavigationProps = {
  isDarkMode: boolean;
};

const AppNavigator: React.FC<NavigationProps> = ({ isDarkMode }) => {
  const theme = isDarkMode ? colors.dark : colors.light;

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.subText,
          tabBarStyle: {
            backgroundColor: theme.card,
            borderTopColor: theme.border,
          },
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              route={route.name as keyof RootStackParamList}
              focused={focused}
              color={color}
              size={size}
            />
          ),
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
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
