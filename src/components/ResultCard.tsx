import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/theme';

interface ResultCardProps {
  bedtime: Date;
  windDownTime: Date;
  isDarkMode: boolean;
  use24HourFormat?: boolean;
}

const ResultCard: React.FC<ResultCardProps> = ({
  bedtime,
  windDownTime,
  isDarkMode,
  use24HourFormat = false,
}) => {
  const theme = isDarkMode ? colors.dark : colors.light;
  
  // Format time to display in 12-hour or 24-hour format
  const formatTime = (date: Date) => {
    if (use24HourFormat) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    } else {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      <Text style={[styles.title, { color: theme.text }]}>Your Sleep Schedule</Text>
      
      <View style={styles.timeRow}>
        <View style={styles.timeItem}>
          <Text style={[styles.label, { color: theme.subText }]}>Wind down by</Text>
          <Text style={[styles.time, { color: theme.primary }]}>{formatTime(windDownTime)}</Text>
        </View>
        
        <View style={styles.separator} />
        
        <View style={styles.timeItem}>
          <Text style={[styles.label, { color: theme.subText }]}>Be asleep by</Text>
          <Text style={[styles.time, { color: theme.primary }]}>{formatTime(bedtime)}</Text>
        </View>
      </View>
      
      <Text style={[styles.tip, { color: theme.subText }]}>
        For best results, avoid screens during your wind-down period
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  timeItem: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  time: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: '#DDD',
    marginHorizontal: 16,
  },
  tip: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default ResultCard;
