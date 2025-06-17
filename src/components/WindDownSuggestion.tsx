import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles/theme';
import defaultSuggestions from '../data/windDownSuggestions';

interface WindDownSuggestionProps {
  isDarkMode: boolean;
  /**
   * Optional custom suggestions list.
   * When provided it replaces the defaults.
   */
  suggestions?: string[];
}

const WindDownSuggestion: React.FC<WindDownSuggestionProps> = ({
  isDarkMode,
  suggestions = defaultSuggestions,
}) => {
  const [index, setIndex] = useState(0);
  const theme = isDarkMode ? colors.dark : colors.light;

  useEffect(() => {
    // Pick a random suggestion when mounted
    const randomIndex = Math.floor(Math.random() * suggestions.length);
    setIndex(randomIndex);
  }, [suggestions]);

  const next = () => {
    setIndex(prev => (prev + 1) % suggestions.length);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.title, { color: theme.text }]}>Wind-down suggestion</Text>
      <Text style={[styles.suggestion, { color: theme.primary }]}>{suggestions[index]}</Text>
      {suggestions.length > 1 && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.accent }]}
          onPress={next}
          accessibilityLabel="Next wind-down tip"
        >
          <Text style={styles.buttonText}>Another Tip</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    marginVertical: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  suggestion: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default WindDownSuggestion;
