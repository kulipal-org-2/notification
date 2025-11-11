import { Injectable, Logger } from '@nestjs/common';
import { MailService } from '../mail.service';
import { OnEvent } from '@nestjs/event-emitter';
import { IEmailData, type IGenericEmailEvent } from '../interface';
import { render } from '@react-email/components';
import { EmailTemplateRegistry } from '../templates/template.registry';
import { NotificationEvents } from '../../common';

@Injectable()
export class MailEventListeners {
  private readonly logger = new Logger(MailEventListeners.name);

  constructor(
    private readonly mailService: MailService,
    private readonly templateRegistry: EmailTemplateRegistry,
  ) {}

  @OnEvent(NotificationEvents.email)
  async handleEmail(payload: IGenericEmailEvent) {
    try {
      this.logger.log(`Received email event for template: ${payload.template}`);

      const Template = this.templateRegistry.getTemplate(payload.template);
      if (!Template) {
        this.logger.warn(`Template ${payload.template} not found`);
        return;
      }

      const emailConfig: IEmailData = {
        to: payload.email,
        subject: payload.subject,
        html: await render(Template(payload.data)),
      };

      await this.mailService.sendMail(emailConfig);

      this.logger.log(
        `Email sent to ${payload.email} using template ${payload.template}`,
      );
    } catch (error: any) {
      this.logger.error(`Failed to send email: ${error.message}`);
    }
  }
}
