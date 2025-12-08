import { Injectable, Logger } from '@nestjs/common';
import { EmailVerificationOTP, PasswordReset } from './customer';
import { WalletPinResetOTP } from './customer/wallet/wallet-pin-reset-otp';

@Injectable()
export class EmailTemplateRegistry {
  private readonly logger = new Logger(EmailTemplateRegistry.name);
  private templates: Map<string, any> = new Map();

  constructor() {
    this.registerDefaultTemplates();
  }

  private registerDefaultTemplates() {
    // register all templates here
    this.registerTemplate('signup-otp', EmailVerificationOTP);
    this.registerTemplate('password-reset-request', PasswordReset);
     this.registerTemplate('wallet-pin-reset-otp', WalletPinResetOTP);
  }

  registerTemplate(name: string, template: any) {
    this.templates.set(name, template);
    this.logger.log(`Registered email template: ${name}`);
  }

  getTemplate(name: string): any {
    const template = this.templates.get(name);
    if (!template) {
      this.logger.warn(`Template not found: ${name}`);
    }
    return template;
  }

  hasTemplate(name: string): boolean {
    return this.templates.has(name);
  }

  getAllTemplateNames(): string[] {
    return Array.from(this.templates.keys());
  }
}
