import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from '../screens/SettingsScreen';
import GeneralSettingsScreen from '../screens/GeneralSettingsScreen';
import DefaultSettingsScreen from '../screens/DefaultSettingsScreen';
import NotificationsSettingsScreen from '../screens/NotificationsSettingsScreen';
import AboutSettingsScreen from '../screens/AboutSettingsScreen';

export type SettingsStackParamList = {
  SettingsMain: undefined;
  GeneralSettings: undefined;
  DefaultSettings: undefined;
  NotificationsSettings: undefined;
  AboutSettings: undefined;
};

const Stack = createNativeStackNavigator<SettingsStackParamList>();

const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SettingsMain" screenOptions={{ headerShown: true }}>
      <Stack.Screen name="SettingsMain" component={SettingsScreen} options={{ title: 'Settings' }} />
      <Stack.Screen name="GeneralSettings" component={GeneralSettingsScreen} options={{ title: 'General Settings' }} />
      <Stack.Screen name="DefaultSettings" component={DefaultSettingsScreen} options={{ title: 'Default Settings' }} />
      <Stack.Screen name="NotificationsSettings" component={NotificationsSettingsScreen} options={{ title: 'Notifications' }} />
      <Stack.Screen name="AboutSettings" component={AboutSettingsScreen} options={{ title: 'About' }} />
    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;
