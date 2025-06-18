import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, useColorScheme } from 'react-native';
import { colors, getGlobalStyles } from '../styles/theme';

const AboutSettingsScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? colors.dark : colors.light;
  const styles = getGlobalStyles(isDarkMode);

  const openLink = (url: string) => {
    Linking.openURL(url).catch(() => {
      // Handle error if needed
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background, padding: 16 }]}>
      <Text style={[styles.text, { color: theme.text, marginBottom: 12 }]}>
        SleepSync v1.0.0 - A simple tool to help you optimize your sleep schedule
      </Text>

      <TouchableOpacity onPress={() => openLink('https://nexusgit.info/pages/info/TOS/tos')} style={localStyles.linkContainer}>
        <Text style={[localStyles.linkText, { color: theme.primary }]}>Terms of Service</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => openLink('https://nexusgit.info/pages/info/PP/pp')} style={localStyles.linkContainer}>
        <Text style={[localStyles.linkText, { color: theme.primary }]}>Privacy Policy</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => openLink('https://github.com/JayNightmare/SleepSync')} style={localStyles.linkContainer}>
        <Text style={[localStyles.linkText, { color: theme.primary }]}>GitHub Open Source</Text>
      </TouchableOpacity>
    </View>
  );
};

const localStyles = StyleSheet.create({
  linkContainer: {
    paddingVertical: 12,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AboutSettingsScreen;
