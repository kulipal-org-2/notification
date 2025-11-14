import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationEvents } from '../../common';
import { SmsService } from '../sms.service';
import type { ISmsEvent } from '../interfaces/sms-event.interface';

@Injectable()
export class SmsEventListeners {
  private readonly logger = new Logger(SmsEventListeners.name);

  constructor(private readonly smsService: SmsService) {}

  @OnEvent(NotificationEvents.sms)
  async handleSms(payload: ISmsEvent) {
    try {
      await this.smsService.sendSms(payload);
    } catch (error: any) {
      this.logger.error(
        `Unhandled error while sending SMS to ${payload.phoneNumber}: ${error?.message ?? error}`,
      );
    }
  }
}
