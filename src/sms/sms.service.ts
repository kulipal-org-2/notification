import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ISmsEvent } from './interfaces/sms-event.interface';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);

  constructor(private readonly configService: ConfigService) {}

  private getTermiiConfig(): {
    apiKey: string;
    baseUrl: string;
  } {
    const apiKey = this.configService.get<string>('TERMII_API_KEY');
    const baseUrl = this.configService.get<string>('TERMII_BASE_URL');

    if (!apiKey) {
      this.logger.error('TERMII_API_KEY is not configured');
      throw new Error('TERMII_API_KEY is not configured');
    }

    if (!baseUrl) {
      this.logger.error('TERMII_BASE_URL is not configured');
      throw new Error('TERMII_BASE_URL is not configured');
    }

    return { apiKey, baseUrl };
  }

  async sendSms(payload: ISmsEvent): Promise<void> {
    try {
      const { apiKey, baseUrl } = this.getTermiiConfig();
      const senderId =
        payload.senderId ?? this.configService.get<string>('TERMII_SENDER_ID');
      const channel =
        payload.channel ?? this.configService.get<string>('TERMII_CHANNEL');

      if (!senderId) {
        this.logger.error('TERMII_SENDER_ID is not configured');
        return;
      }

      const phoneNumber = payload.phoneNumber.replace(/^\+/, '');

      const endpoint = `${baseUrl.replace(/\/$/, '')}/api/sms/send`;

      const requestBody = {
        api_key: apiKey,
        to: phoneNumber,
        from: senderId,
        sms: payload.message,
        type: 'plain',
        channel: channel ?? 'generic',
      };

      this.logger.debug(`Sending SMS to endpoint: ${endpoint}`);
      this.logger.debug(
        `Request body: ${JSON.stringify({ ...requestBody, api_key: '[REDACTED]' })}`,
      );

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        let errorMessage: string;

        try {
          const errorJson = JSON.parse(errorBody);
          if (errorJson.message) {
            errorMessage = `Termii Error (${errorJson.code || response.status}): ${errorJson.message}`;
            if (errorJson.status) {
              errorMessage += ` [Status: ${errorJson.status}]`;
            }
          } else {
            errorMessage = errorBody;
          }
        } catch {
          errorMessage = errorBody;
        }

        this.logger.error(
          `Termii API error: Status ${response.status}, Message: ${errorMessage}`,
        );
        throw new Error(
          `Termii responded with status ${response.status}: ${errorMessage}`,
        );
      }

      this.logger.log(`SMS sent to ${payload.phoneNumber}`);
    } catch (error: any) {
      if (error?.message?.includes('is not configured')) {
        return;
      }
      this.logger.error(
        `Failed to send SMS to ${payload.phoneNumber}: ${error?.message ?? error}`,
      );
      throw error;
    }
  }

  async fetchSenderIds(name?: string, status?: string): Promise<any> {
    const { apiKey, baseUrl } = this.getTermiiConfig();

    const url = new URL(`${baseUrl.replace(/\/$/, '')}/api/sender-id`);
    url.searchParams.append('api_key', apiKey);

    if (name) {
      url.searchParams.append('name', name);
    }

    if (status) {
      url.searchParams.append('status', status);
    }

    try {
      this.logger.debug(`Fetching sender IDs from: ${url.toString()}`);

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      const contentType = response.headers.get('content-type');
      const responseText = await response.text();

      this.logger.debug(
        `Response status: ${response.status}, Content-Type: ${contentType}`,
      );

      if (!response.ok) {
        this.logger.error(
          `Termii API error: Status ${response.status}, Body: ${responseText}`,
        );
        throw new Error(
          `Termii responded with status ${response.status}: ${responseText}`,
        );
      }

      if (!responseText || responseText.trim().length === 0) {
        this.logger.warn('Empty response from Termii API');
        return { data: [], message: 'No sender IDs found' };
      }

      try {
        const data = JSON.parse(responseText);
        this.logger.log('Sender IDs fetched successfully');
        return data;
      } catch (parseError: any) {
        this.logger.error(
          `Failed to parse JSON response. Response text: ${responseText}`,
        );
        throw new Error(
          `Invalid JSON response from Termii API: ${parseError.message}. Response: ${responseText}`,
        );
      }
    } catch (error: any) {
      this.logger.error(
        `Failed to fetch sender IDs: ${error?.message ?? error}`,
      );
      throw error;
    }
  }
}
