import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SmsEventListeners } from './events/sms-event.listener';
import { SmsService } from './sms.service';

@Module({
  imports: [ConfigModule],
  providers: [SmsService, SmsEventListeners],
  exports: [SmsService],
})
export class SmsModule {}
