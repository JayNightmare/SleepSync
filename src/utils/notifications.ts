import PushNotification, { Importance } from 'react-native-push-notification';
import { Platform } from 'react-native';
import { navigate } from '../navigation/RootNavigation';

export const initNotifications = () => {
  PushNotification.configure({
    onNotification: notification => {
      if (notification.userInteraction) {
        navigate('WindDown');
      }
      // @ts-ignore
      notification.finish && notification.finish();
    },
    requestPermissions: Platform.OS === 'ios',
  });

  if (Platform.OS === 'android') {
    PushNotification.createChannel(
      {
        channelId: 'winddown',
        channelName: 'Wind Down',
        importance: Importance.DEFAULT,
      },
      () => {},
    );
  }
};

export const scheduleWindDownNotification = (date: Date) => {
  PushNotification.localNotificationSchedule({
    channelId: 'winddown',
    message: 'Time to wind down for bed',
    date,
    allowWhileIdle: true,
  });
};

export const scheduleDailyWindDownReminder = (timeString: string) => {
  const [h, m] = timeString.split(':').map(Number);
  const date = new Date();
  date.setHours(h, m, 0, 0);
  if (date < new Date()) {
    date.setDate(date.getDate() + 1);
  }
  PushNotification.cancelAllLocalNotifications();
  scheduleWindDownNotification(date);
};
