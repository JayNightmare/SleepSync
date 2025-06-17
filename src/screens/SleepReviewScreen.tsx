import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { SleepHistoryEntry } from '../types';
import { updateHistoryEntry } from '../utils/storage';
import { colors, getGlobalStyles } from '../styles/theme';

interface Props {
  visible: boolean;
  entry: SleepHistoryEntry | null;
  onClose: () => void;
  isDarkMode: boolean;
}

const SleepReviewScreen: React.FC<Props> = ({ visible, entry, onClose, isDarkMode }) => {
  const theme = isDarkMode ? colors.dark : colors.light;
  const styles = getGlobalStyles(isDarkMode);
  const [quality, setQuality] = useState<number>(entry?.quality ?? 3);
  const [technique, setTechnique] = useState(entry?.technique ?? '');
  if (!entry) return null;

  const handleSave = async () => {
    await updateHistoryEntry(entry.id, { quality, technique });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={local.overlay}>
        <View style={[styles.card, local.container]}>
          <Text style={styles.header}>Review Your Sleep</Text>
          <Text style={[styles.text, local.label]}>Quality: {quality}</Text>
          <Slider
            minimumValue={1}
            maximumValue={5}
            step={1}
            value={quality}
            onValueChange={setQuality}
            minimumTrackTintColor={theme.primary}
            maximumTrackTintColor={theme.border}
            thumbTintColor={theme.primary}
          />
          <TextInput
            placeholder="Technique used (optional)"
            placeholderTextColor={theme.subText}
            value={technique}
            onChangeText={setTechnique}
            style={[styles.text, local.input, { borderColor: theme.border, color: theme.text }]}
          />
          <TouchableOpacity style={styles.buttonWithMargin} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Text style={[styles.caption, { color: theme.danger }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const local = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginTop: 16,
  },
  label: {
    marginTop: 8,
    marginBottom: 8,
  },
});

export default SleepReviewScreen;
