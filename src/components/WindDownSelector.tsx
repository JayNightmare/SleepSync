import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../styles/theme';
import { WindDownOption } from '../types';

interface WindDownSelectorProps {
  options: WindDownOption[];
  selectedOption: WindDownOption;
  onSelect: (option: WindDownOption) => void;
  isDarkMode: boolean;
}

const WindDownSelector: React.FC<WindDownSelectorProps> = ({
  options,
  selectedOption,
  onSelect,
  isDarkMode,
}) => {
  const theme = isDarkMode ? colors.dark : colors.light;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>Wind-Down Period (minutes)</Text>
      
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.option,
              { 
                backgroundColor: selectedOption === option ? theme.primary : theme.card,
                borderColor: theme.border,
              },
            ]}
            onPress={() => onSelect(option)}
          >
            <Text
              style={[
                styles.optionText,
                { color: selectedOption === option ? '#FFFFFF' : theme.text }
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={[styles.description, { color: theme.subText }]}>
        Time to prepare for sleep before your ideal bedtime
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  option: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: 4,
  },
  optionText: {
    fontWeight: '500',
    fontSize: 16,
  },
  description: {
    fontSize: 12,
    marginTop: 4,
    fontStyle: 'italic',
  },
});

export default WindDownSelector;
