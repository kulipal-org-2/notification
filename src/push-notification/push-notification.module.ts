import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PushNotificationService } from './push-notification.service';
import { PushNotificationEventListener } from './events';
import { FirebasePushProvider } from './providers';
import { IPushNotificationProvider } from './interfaces';

export type PushProviderType = 'firebase';

@Module({})
export class PushNotificationModule {
  static register(provider: PushProviderType): DynamicModule {
    const providers: Provider[] = [
      PushNotificationService,
      PushNotificationEventListener,
      {
        provide: 'PUSH_NOTIFICATION_PROVIDER',
        inject: [ConfigService],
        useFactory: (config: ConfigService): IPushNotificationProvider => {
          switch (provider) {
            case 'firebase':
              const firebaseCredentials = config.get('firebase.credentials');
              return new FirebasePushProvider(firebaseCredentials);

            // add more providers here

            default:
              throw new Error(
                `Unsupported push notification provider: ${provider}`,
              );
          }
        },
      },
    ];

    return {
      module: PushNotificationModule,
      providers,
      exports: [PushNotificationService],
    };
  }
}
