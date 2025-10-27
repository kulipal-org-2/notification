import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { IEmailData } from './interface';

@Injectable()
export class MailService {
  private logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendMail(data: IEmailData) {
    try {
      const { to, subject, html } = data;

      const options: ISendMailOptions = {
        to,
        subject,
        html,
      };

      await this.mailerService.sendMail(options);
    } catch (error) {
      this.logger.warn(error);
    }
  }
}
