import { Module } from '@nestjs/common';
import { NotificationController } from './controllers';
import { MailModule } from '../../mail/mail.module';
import { PushNotificationModule } from '../../push-notification/push-notification.module';
import { SmsModule } from '../../sms/sms.module';

@Module({
  imports: [MailModule, SmsModule, PushNotificationModule.register('firebase')],
  controllers: [NotificationController],
})
export class NotificationModule {}
