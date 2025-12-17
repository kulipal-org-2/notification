import { Inject, Injectable, Logger, Optional } from '@nestjs/common';
import {
  type IPushNotificationData,
  type IPushNotificationProvider,
} from './interfaces';
import { DeviceTokenService } from './services';

@Injectable()
export class PushNotificationService {
  private readonly logger = new Logger(PushNotificationService.name);

  constructor(
    @Inject('PUSH_NOTIFICATION_PROVIDER')
    private readonly provider: IPushNotificationProvider,
    private readonly deviceTokenService: DeviceTokenService,
  ) {}

  async send(notificationData: IPushNotificationData) {
    try {
      let tokens = notificationData.tokens;

      if (notificationData.userId) {
        const deviceTokens = await this.deviceTokenService.getActiveTokens(
          notificationData.userId,
        );
        tokens = deviceTokens.map((dt) => dt.token);

        if (tokens.length === 0) {
          this.logger.warn(
            `No active device tokens found for user ${notificationData.userId}`,
          );
          return;
        }

        this.logger.log(
          `Found ${tokens.length} active device tokens for user ${notificationData.userId}`,
        );
      }

      // Create notification data with fetched tokens
      const notificationWithTokens: IPushNotificationData = {
        ...notificationData,
        tokens,
      };

      // Send using multicast (supports multiple tokens)
      await this.provider.send(notificationWithTokens);
    } catch (error: any) {
      this.logger.error(`Failed to send push notification: ${error.message}`);
      //   throw error;
    }
  }
}
