import { StyleSheet } from 'react-native';

export const colors = {
    light: {
        background: '#F8F9FA',
        card: '#FFFFFF',
        text: '#212529',
        subText: '#6C757D',
        primary: '#3949AB',
        accent: '#5C6BC0',
        border: '#DEE2E6',
        success: '#28A745',
        danger: '#DC3545',
        warning: '#FFC107',
        info: '#17A2B8',
        shadow: 'rgba(0, 0, 0, 0.1)',
    },
    dark: {
        background: '#121212',
        card: '#1E1E1E',
        text: '#F8F9FA',
        subText: '#ADB5BD',
        primary: '#5C6BC0',
        accent: '#7986CB',
        border: '#343A40',
        success: '#28A745',
        danger: '#DC3545',
        warning: '#FFC107',
        info: '#17A2B8',
        shadow: 'rgba(0, 0, 0, 0.3)',
    },
};

export const getGlobalStyles = (isDark: boolean) => {
    const theme = isDark ? colors.dark : colors.light;

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
            padding: 16,
        },
        scrollView: {
            flex: 1,
        },
        scrollViewFull: {
            flex: 1,
        },
        scrollContent: {
            flexGrow: 1,
            padding: 16,
        },
        card: {
            backgroundColor: theme.card,
            borderRadius: 12,
            padding: 16,
            marginVertical: 8,
            shadowColor: theme.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
        },
        header: {
            fontSize: 24,
            fontWeight: 'bold',
            color: theme.text,
            marginBottom: 8,
            textAlign: 'center',
        },
        subHeader: {
            textAlign: 'center',
            fontSize: 18,
            fontWeight: '600',
            color: theme.text,
            marginBottom: 6,
        },
        text: {
            fontSize: 16,
            color: theme.text,
            marginBottom: 4,
        },
        caption: {
            fontSize: 14,
            color: theme.subText,
            textAlign: 'center',

        },
        captionCentered: {
            fontSize: 14,
            color: theme.subText,
            textAlign: 'center',
            marginTop: 16,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 8,
        },
        separator: {
            height: 1,
            backgroundColor: theme.border,
            marginVertical: 12,
        },
        button: {
            backgroundColor: theme.primary,
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 8,
        },
        buttonText: {
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: '600',
        },
        sliderContainer: {
            marginVertical: 16,
        },
        slider: {
            marginTop: 8,
        },
        sliderLabel: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        sliderValue: {
            fontSize: 16,
            color: theme.text,
            fontWeight: '600',
        },
        timeDisplay: {
            fontSize: 28,
            fontWeight: 'bold',
            color: theme.text,
            textAlign: 'center',
            marginVertical: 8,
        },
        resultContainer: {
            marginTop: 24,
            alignItems: 'center',
        },
        infoCard: {
            backgroundColor: theme.card,
            borderRadius: 12,
            padding: 20,
            marginVertical: 16,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: theme.primary,
            width: '100%',
        },
        logo: {
            fontSize: 32,
            fontWeight: 'bold',
            color: theme.primary,
            marginBottom: 24,
        },
        captionWithMargin: {
            fontSize: 14,
            color: theme.subText,
            marginTop: 8,
        },
        buttonWithMargin: {
            backgroundColor: theme.primary,
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 16,
        },
        withMargin: {
            marginTop: 20,
        },
        withSmallMargin: {
            marginTop: 12,
        },
        textCenter: {
            textAlign: 'center',
        },
        // New styles for fixing inline styles in HistoryScreen
        dimmed: {
            opacity: 0.5,
        },
        captionWithSpacing: {
            fontSize: 14,
            color: theme.subText,
            marginTop: 16,
        },
        iconContainer: {
            padding: 8,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
        },
    });
};
