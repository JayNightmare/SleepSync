import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../styles/theme';

interface TimePickerProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  isDarkMode: boolean;
  use24HourFormat?: boolean;
}

const TimePicker: React.FC<TimePickerProps> = ({
  label,
  value,
  onChange,
  isDarkMode,
  use24HourFormat = false,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const theme = isDarkMode ? colors.dark : colors.light;

  const formatTime = (date: Date) => {
    if (use24HourFormat) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    } else {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    }
  };

  const handleChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const showTimepicker = () => {
    setShowPicker(true);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      <TouchableOpacity
        style={[styles.timeButton, { backgroundColor: theme.card, borderColor: theme.border }]}
        onPress={showTimepicker}
      >
        <Text style={[styles.timeText, { color: theme.primary }]}>{formatTime(value)}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={value}
          mode="time"
          display="default"
          onChange={handleChange}
          is24Hour={use24HourFormat}
          themeVariant={isDarkMode ? 'dark' : 'light'}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  timeButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default TimePicker;
