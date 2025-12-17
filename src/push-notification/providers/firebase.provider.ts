import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import {
  IPushNotificationData,
  IPushNotificationProvider,
  IPushNotificationSendResult,
} from '../interfaces';

@Injectable()
export class FirebasePushProvider implements IPushNotificationProvider {
  private readonly logger = new Logger(FirebasePushProvider.name);
  private readonly firebaseAdmin: admin.app.App;

  private redactToken(token: string): string {
    if (!token) return '<empty>';
    if (token.length <= 12) return '<redacted>';
    return `${token.slice(0, 6)}...${token.slice(-6)}`;
  }

  constructor(credentials: admin.ServiceAccount) {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(credentials),
      });
    }
    this.firebaseAdmin = admin.apps[0]!;
  }

  async send(
    notificationData: IPushNotificationData,
  ): Promise<IPushNotificationSendResult> {
    try {
      const { title, body, data } = notificationData;
      const tokens = notificationData.tokens ?? [];

      if (tokens.length === 0) {
        this.logger.warn('No tokens provided for push notification');
        return { successCount: 0, failureCount: 0 };
      }

      const message: admin.messaging.MulticastMessage = {
        notification: {
          title,
          body,
        },
        data: data || {},
        tokens,
        apns: {
          payload: {
            aps: {
              sound: 'default',
              badge: 1,
            },
          },
        },
        android: {
          priority: 'high',
          notification: {
            sound: 'default',
            channelId: 'default',
          },
        },
      };

      const response = await this.firebaseAdmin
        .messaging()
        .sendEachForMulticast(message);

      const result: IPushNotificationSendResult = {
        successCount: response.successCount,
        failureCount: response.failureCount,
      };

      if (result.failureCount > 0) {
        const failures = response.responses
          .map((r, idx) => ({ r, idx }))
          .filter(({ r }) => !r.success)
          .slice(0, 10)
          .map(({ r, idx }) => ({
            index: idx,
            token: this.redactToken(tokens[idx] ?? ''),
            code: (r.error as any)?.code,
            message: (r.error as any)?.message,
          }));

        this.logger.warn(
          `Firebase multicast failures (showing up to 10): ${JSON.stringify(failures)}`,
        );
      }

      if (result.failureCount > 0 && result.successCount === 0) {
        this.logger.warn(
          `Push notification failed for all tokens: Success: ${result.successCount}, Failure: ${result.failureCount}`,
        );
      } else if (result.failureCount > 0) {
        this.logger.warn(
          `Push notification partially succeeded: Success: ${result.successCount}, Failure: ${result.failureCount}`,
        );
      } else {
        this.logger.log(
          `Push notification sent successfully: Success: ${result.successCount}, Failure: ${result.failureCount}`,
        );
      }

      return result;
    } catch (error: any) {
      this.logger.error(
        `Failed to send push notification: ${error?.code ?? ''} ${error?.message ?? error}`,
        error?.stack,
      );
      return { successCount: 0, failureCount: 1 };
    }
  }

  async sendToTopic(
    notificationData: IPushNotificationData,
  ): Promise<IPushNotificationSendResult> {
    try {
      const { title, body, data } = notificationData;
      const tokens = notificationData.tokens ?? [];

      if (tokens.length === 0) {
        this.logger.warn('No tokens provided for push notification');
        return { successCount: 0, failureCount: 0 };
      }

      const results = await Promise.allSettled(
        tokens.map(async (token) => {
          const message: admin.messaging.Message = {
            notification: {
              title,
              body,
            },
            data,
            topic: token,
            android: {
              priority: 'high',
              notification: {
                sound: 'default',
                imageUrl: data?.image ?? undefined,
                icon: data?.image ?? undefined,
              },
            },
            apns: {
              payload: {
                aps: {
                  contentAvailable: true,
                  sound: 'default',
                },
              },
              fcmOptions: {
                imageUrl: data?.image ?? undefined,
              },
            },
          };

          return await this.firebaseAdmin.messaging().send(message);
        }),
      );

      const successCount = results.filter(
        (r) => r.status === 'fulfilled',
      ).length;
      const failureCount = results.length - successCount;

      const result: IPushNotificationSendResult = {
        successCount,
        failureCount,
      };

      if (result.failureCount > 0) {
        const failures = results
          .map((r, idx) => ({ r, idx }))
          .filter(({ r }) => r.status === 'rejected')
          .slice(0, 10)
          .map(({ r, idx }) => {
            const reason: any = (r as PromiseRejectedResult).reason;
            return {
              index: idx,
              topic: this.redactToken(tokens[idx] ?? ''),
              code: reason?.code,
              message: reason?.message ?? String(reason),
            };
          });

        this.logger.warn(
          `Firebase topic failures (showing up to 10): ${JSON.stringify(failures)}`,
        );
      }

      if (result.failureCount > 0 && result.successCount === 0) {
        this.logger.warn(
          `Topic push failed for all: Success: ${result.successCount}, Failure: ${result.failureCount}`,
        );
      } else if (result.failureCount > 0) {
        this.logger.warn(
          `Topic push partially succeeded: Success: ${result.successCount}, Failure: ${result.failureCount}`,
        );
      } else {
        this.logger.log(
          `Topic push sent successfully: Success: ${result.successCount}, Failure: ${result.failureCount}`,
        );
      }

      return result;
    } catch (error: any) {
      this.logger.error(
        `Failed to send push notification: ${error?.code ?? ''} ${error?.message ?? error}`,
        error?.stack,
      );
      return { successCount: 0, failureCount: 1 };
    }
  }
}
