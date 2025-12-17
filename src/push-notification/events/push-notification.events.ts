import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PushNotificationService } from '../push-notification.service';
import { type IPushNotificationData } from '../interfaces';
import { NotificationEvents } from '../../common';

@Injectable()
export class PushNotificationEventListener {
  private readonly logger = new Logger(PushNotificationEventListener.name);

  constructor(
    private readonly pushNotificationService: PushNotificationService,
  ) {}

  @OnEvent(NotificationEvents.push)
  async handlePushNotification(payload: IPushNotificationData) {
    try {
      const tokenCount = payload.tokens?.length ?? 0;
      this.logger.log(
        payload.userId
          ? `Received push notification event for user ${payload.userId} (${tokenCount} direct tokens provided)`
          : `Received push notification event for ${tokenCount} devices`,
      );

      const result = await this.pushNotificationService.send(payload);
      if (!result) {
        this.logger.warn('Push notification skipped (no tokens)');
        return;
      }

      if (result.failureCount > 0 && result.successCount === 0) {
        this.logger.error(
          `Push notification failed: Success: ${result.successCount}, Failure: ${result.failureCount}`,
        );
        return;
      }

      if (result.failureCount > 0) {
        this.logger.warn(
          `Push notification partially succeeded: Success: ${result.successCount}, Failure: ${result.failureCount}`,
        );
        return;
      }

      this.logger.log(
        `Push notification processed successfully: Success: ${result.successCount}, Failure: ${result.failureCount}`,
      );
    } catch (error: any) {
      this.logger.error(
        `Failed to process push notification: ${error.message}`,
      );
    }
  }
}
