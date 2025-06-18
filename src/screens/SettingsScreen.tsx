import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, getGlobalStyles } from '../styles/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { SettingsStackParamList } from '../types';

const SettingsItem: React.FC<{
  title: string;
  description?: string;
  onPress?: () => void;
  icon?: string;
}> = ({ title, description, onPress, icon }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? colors.dark : colors.light;
  
  return (
    <TouchableOpacity
      onPress={onPress}
      style={localStyles.itemContainer}
      activeOpacity={0.7}
    >
      <View style={localStyles.itemContent}>
        {icon && (
          <Ionicons 
            name={icon} 
            size={24} 
            color={theme.primary} 
            style={localStyles.itemIcon}
          />
        )}
        <View style={localStyles.itemText}>
          <Text style={[localStyles.itemTitle, { color: theme.text }]}>{title}</Text>
          {description && (
            <Text style={[localStyles.itemDescription, { color: theme.subText }]}>
              {description}
            </Text>
          )}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme.subText} />
    </TouchableOpacity>
  );
};

type SettingsScreenNavigationProp = NativeStackNavigationProp<
  SettingsStackParamList,
  'SettingsMain'
>;

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? colors.dark : colors.light;
  const styles = getGlobalStyles(isDarkMode);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView style={localStyles.scrollView}>
        <Text style={[styles.header, { color: theme.text }]}>Settings</Text>

        <SettingsItem
          title="General Settings"
          description="Display, theme, and time format"
          icon="settings-outline"
          onPress={() => navigation.navigate('GeneralSettings')}
        />
        <SettingsItem
          title="Default Settings"
          description="Sleep duration and cycle preferences"
          icon="bed-outline"
          onPress={() => navigation.navigate('DefaultSettings')}
        />
        <SettingsItem
          title="Notifications"
          description="Wind-down reminders and alerts"
          icon="notifications-outline"
          onPress={() => navigation.navigate('NotificationsSettings')}
        />
        <SettingsItem
          title="About"
          description="App information and legal"
          icon="information-circle-outline"
          onPress={() => navigation.navigate('AboutSettings')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.light.border,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemIcon: {
    marginRight: 12,
  },
  itemText: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemDescription: {
    fontSize: 14,
    marginTop: 2,
  },
});

export default SettingsScreen;
