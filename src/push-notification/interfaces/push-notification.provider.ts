export interface IPushNotificationData {
  title: string;
  body: string;
  data?: Record<string, string>;
  tokens: string[];
}

export interface IPushNotificationProvider {
  send(notification: IPushNotificationData): Promise<void>;
  sendToTopic(notification: IPushNotificationData): Promise<void>;
}
