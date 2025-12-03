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
      this.logger.log(
        `Received push notification event for ${payload.tokens.length} devices`,
      );

      await this.pushNotificationService.send(payload);

      this.logger.log('Push notification processed successfully');
    } catch (error: any) {
      this.logger.error(
        `Failed to process push notification: ${error.message}`,
      );
    }
  }
}
