export interface IPushNotificationData {
  title: string;
  body: string;
  data?: Record<string, string>;
  tokens: string[];
  userId?: string; // Optional: if provided, will fetch tokens from database
}

export interface IPushNotificationProvider {
  send(notification: IPushNotificationData): Promise<void>;
  sendToTopic(notification: IPushNotificationData): Promise<void>;
}
