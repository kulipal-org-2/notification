import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ISmsEvent } from './interfaces/sms-event.interface';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);

  constructor(private readonly configService: ConfigService) {}

  async sendSms(payload: ISmsEvent): Promise<void> {
    const apiKey = this.configService.get<string>('TERMII_API_KEY');
    const senderId =
      payload.senderId ?? this.configService.get<string>('TERMII_SENDER_ID');
    const channel =
      payload.channel ?? this.configService.get<string>('TERMII_CHANNEL');

    if (!apiKey) {
      this.logger.error('TERMII_API_KEY is not configured');
      return;
    }

    if (!senderId) {
      this.logger.error('TERMII_SENDER_ID is not configured');
      return;
    }

    const baseUrl =
      this.configService.get<string>('TERMII_BASE_URL') ??
      'https://api.ng.termii.com/api';

    const endpoint = `${baseUrl.replace(/\/$/, '')}/sms/send`;

    const requestBody = {
      api_key: apiKey,
      to: payload.phoneNumber,
      from: senderId,
      sms: payload.message,
      type: 'plain',
      channel: channel ?? 'generic',
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Termii responded with status ${response.status}: ${errorBody}`,
        );
      }

      this.logger.log(`SMS sent to ${payload.phoneNumber}`);
    } catch (error: any) {
      this.logger.error(
        `Failed to send SMS to ${payload.phoneNumber}: ${error?.message ?? error}`,
      );
    }
  }
}
