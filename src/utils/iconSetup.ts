/**
 * This file ensures that all Ionicons are properly registered and accessible.
 */
import { Platform, UIManager } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Register the icon font
export const registerIcons = async () => {
  try {
    // LayoutAnimation configuration for Android
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }

    // Force font loading for Ionicons
    await Ionicons.loadFont();

    console.log('Icons registered successfully');
  } catch (error) {
    console.error('Failed to register icons', error);
  }
};
