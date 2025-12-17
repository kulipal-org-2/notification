export interface IPushNotificationData {
  title: string;
  body: string;
  data?: Record<string, string>;
  tokens?: string[];
  userId?: string; // Optional: if provided, will fetch tokens from database
}

export interface IPushNotificationSendResult {
  successCount: number;
  failureCount: number;
  invalidTokens?: string[];
}

export interface IPushNotificationProvider {
  send(
    notification: IPushNotificationData,
  ): Promise<IPushNotificationSendResult>;
  sendToTopic(
    notification: IPushNotificationData,
  ): Promise<IPushNotificationSendResult>;
}
