import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  type IPushNotificationData,
  type IPushNotificationProvider,
} from './interfaces';

@Injectable()
export class PushNotificationService {
  private readonly logger = new Logger(PushNotificationService.name);

  constructor(
    @Inject('PUSH_NOTIFICATION_PROVIDER')
    private readonly provider: IPushNotificationProvider,
  ) {}

  async send(notificationData: IPushNotificationData) {
    try {
      await Promise.all([
        // this.provider.send(notificationData),
        this.provider.sendToTopic(notificationData),
      ]);
    } catch (error: any) {
      this.logger.error(`Failed to send push notification: ${error.message}`);
      //   throw error;
    }
  }
}
