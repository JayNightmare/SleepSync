import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { deleteHistoryEntry, loadAppSettings, loadSleepHistory } from '../utils/storage';
import { SleepHistoryEntry } from '../types';
import { colors, getGlobalStyles } from '../styles/theme';
import { formatTime } from '../utils/sleepCalculator';

const HistoryScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const [appSettings, setAppSettings] = useState<any>(null);
  const [history, setHistory] = useState<SleepHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Use app settings for dark mode if available, otherwise use system
  const isDarkMode = appSettings?.theme === 'system'
    ? colorScheme === 'dark'
    : appSettings?.theme === 'dark';
    
  const theme = isDarkMode ? colors.dark : colors.light;
  const styles = getGlobalStyles(isDarkMode);

  // Load history
  const fetchHistory = async () => {
    setIsLoading(true);
    const settings = await loadAppSettings();
    setAppSettings(settings);
    
    const savedHistory = await loadSleepHistory();
    if (savedHistory) {
      setHistory(savedHistory);
    }
    setIsLoading(false);
    setRefreshing(false);
  };

  // Pull to refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchHistory();
  };

  // Load on initial component mount
  useEffect(() => {
    fetchHistory();
  }, []);

  // Refresh history when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchHistory();
    }, [])
  );

  // Format the date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Format sleep duration
  const formatSleepDuration = (hours: number) => {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    
    if (minutes === 0) {
      return `${wholeHours}h`;
    } else {
      return `${wholeHours}h ${minutes}m`;
    }
  };

  // Confirm delete entry
  const confirmDelete = (entry: SleepHistoryEntry) => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this sleep plan?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => handleDelete(entry.id) 
        }
      ]
    );
  };

  // Delete entry
  const handleDelete = async (id: string) => {
    await deleteHistoryEntry(id);
    fetchHistory(); // Refresh the list
  };

  // Get appropriate text for when the entry was created
  const getTimeAgoText = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffDays > 0) {
      return diffDays === 1 ? 'Yesterday' : `${diffDays} days ago`;
    } else if (diffHours > 0) {
      return `${diffHours}h ago`;
    } else {
      return diffMins < 1 ? 'Just now' : `${diffMins}m ago`;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={localStyles.headerContainer}>
        <Text style={styles.header}>Sleep History</Text>
        <TouchableOpacity 
          style={localStyles.refreshButton} 
          onPress={onRefresh}
          disabled={isLoading || refreshing}
        >
          <Ionicons 
            name="refresh" 
            size={24} 
            color={theme.primary}
            style={isLoading || refreshing ? styles.dimmed : undefined}
          />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={localStyles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.primary]}
            tintColor={theme.primary}
          />
        }
      >
        {isLoading && history.length === 0 && (
          <View style={[styles.card, localStyles.loadingContainer]}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={styles.captionWithSpacing}>Loading history...</Text>
          </View>
        )}
        
        {history.length === 0 && !isLoading && (
          <View style={[styles.card, localStyles.emptyState]}>
            <Ionicons name="moon" size={48} color={theme.subText} />
            <Text style={[styles.subHeader, localStyles.emptyText]}>No history yet</Text>
            <Text style={[styles.caption, localStyles.centerText]}>
              Your saved sleep plans will appear here
            </Text>
          </View>
        )}
        
        {history.map((entry) => (
          <View key={entry.id} style={styles.card}>
            <View style={localStyles.historyHeader}>
              <Text style={styles.subHeader}>
                {formatDate(entry.wakeUpTime)}
              </Text>
              <Text style={[styles.caption, { color: theme.subText }]}>
                {getTimeAgoText(entry.createdAt)}
              </Text>
            </View>
            
            <View style={localStyles.detailsRow}>
              <View style={localStyles.detail}>
                <Text style={styles.caption}>Wake up</Text>
                <Text style={styles.text}>
                  {formatTime(entry.wakeUpTime, appSettings?.use24HourFormat || false)}
                </Text>
              </View>
              
              <View style={localStyles.detail}>
                <Text style={styles.caption}>Sleep duration</Text>
                <Text style={styles.text}>
                  {formatSleepDuration(entry.sleepDuration)}
                </Text>
              </View>
              
              <View style={localStyles.detail}>
                <Text style={styles.caption}>Wind-down</Text>
                <Text style={styles.text}>{entry.windDownPeriod} min</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={localStyles.deleteButton}
              onPress={() => confirmDelete(entry)}
            >
              <Ionicons name="trash-outline" size={20} color={theme.danger} />
              <Text style={localStyles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  refreshButton: {
    padding: 8,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detail: {
    flex: 1,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    padding: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 32,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 32,
  },
  emptyText: {
    marginTop: 16,
    marginBottom: 8,
  },
  centerText: {
    textAlign: 'center',
  },
  deleteText: {
    marginLeft: 4,
    color: '#DC3545', // Using delete color directly since we can't directly access theme here
  }
});

export default HistoryScreen;
