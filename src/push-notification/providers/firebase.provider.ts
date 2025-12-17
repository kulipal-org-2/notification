import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import {
  IPushNotificationData,
  IPushNotificationProvider,
} from '../interfaces';

@Injectable()
export class FirebasePushProvider implements IPushNotificationProvider {
  private readonly logger = new Logger(FirebasePushProvider.name);
  private readonly firebaseAdmin: admin.app.App;

  constructor(credentials: admin.ServiceAccount) {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(credentials),
      });
    }
    this.firebaseAdmin = admin.apps[0]!;
  }

  async send(notificationData: IPushNotificationData): Promise<void> {
    try {
      const { title, body, data, tokens } = notificationData;

      if (tokens.length === 0) {
        this.logger.warn('No tokens provided for push notification');
        return;
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

      this.logger.log(
        `Push notification sent: Success: ${response.successCount}, Failure: ${response.failureCount}`,
      );
    } catch (error: any) {
      this.logger.error(`Failed to send push notification: ${error.message}`);
      //   throw error;
    }
  }

  async sendToTopic(notificationData: IPushNotificationData) {
    try {
      const { title, body, data, tokens } = notificationData;

      if (tokens.length === 0) {
        this.logger.warn('No tokens provided for push notification');
        return;
      }

      tokens.forEach(async (token) => {
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

        const response = await this.firebaseAdmin.messaging().send(message);

        this.logger.log(`Push notification sent: Success: ${response}`);
      });
    } catch (error: any) {
      this.logger.error(`Failed to send push notification: ${error.message}`);
      //   throw error;
    }
  }
}
