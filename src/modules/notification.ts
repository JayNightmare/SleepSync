declare module 'react-native-push-notification' {
  export enum Importance {
    DEFAULT = 3,
    HIGH = 4,
    LOW = 2,
    MIN = 1,
    NONE = 0,
    UNSPECIFIED = -1,
  }

  export interface PushNotificationConfig {
    onNotification: (notification: any) => void;
    requestPermissions?: boolean;
  }

  export interface ChannelObject {
    channelId: string;
    channelName: string;
    importance?: Importance;
  }

  export interface LocalNotificationSchedule {
    channelId: string;
    message: string;
    date: Date;
    allowWhileIdle?: boolean;
  }

  export function configure(config: PushNotificationConfig): void;
  export function createChannel(
    channel: ChannelObject,
    callback?: (created: boolean) => void
  ): void;
  export function localNotificationSchedule(
    notification: LocalNotificationSchedule
  ): void;
  export function cancelLocalNotification(options: { channelId: string }): void;
}