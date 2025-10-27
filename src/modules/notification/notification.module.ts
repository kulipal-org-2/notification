import { Module } from '@nestjs/common';
import { NotificationController } from './controllers';
import { MailModule } from '../../mail/mail.module';
import { PushNotificationModule } from '../../push-notification/push-notification.module';

@Module({
  imports: [MailModule, PushNotificationModule.register('firebase')],
  controllers: [NotificationController],
})
export class NotificationModule {}
