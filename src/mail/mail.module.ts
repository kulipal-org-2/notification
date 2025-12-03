import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailEventListeners } from './events/event-listeners.service';
import { EmailTemplateRegistry } from './templates/template.registry';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('EMAIL_HOST'),
          secure: config.get('NODE_ENV') === 'production',
          port: config.get('EMAIL_PORT'),
          auth: {
            user: config.get('EMAIL_USERNAME'),
            pass: config.get('EMAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"Kulipal" <${config.get('EMAIL_FROM')}>`,
        },
      }),
    }),
  ],
  providers: [MailService, MailEventListeners, EmailTemplateRegistry],
  exports: [MailService],
})
export class MailModule {}
