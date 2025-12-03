import { Controller, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GrpcMethod } from '@nestjs/microservices';
import { NotificationEvents } from '../../../common';
import { type IGenericEmailEvent } from '../../../mail/interface';
import { type IPushNotificationData } from '../../../push-notification/interfaces';
import { type ISmsEvent } from '../../../sms/interfaces/sms-event.interface';

@Controller()
export class NotificationController {
  private readonly logger = new Logger(NotificationController.name);

  constructor(private eventEmitter: EventEmitter2) {}

  @GrpcMethod('NotificationService', 'Email')
  handleEmailNotification(data: IGenericEmailEvent) {
    this.eventEmitter.emit(NotificationEvents.email, data);
    this.logger.log(`email event dispatched`);
  }

  @GrpcMethod('NotificationService', 'Push')
  handlePushNotification(data: IPushNotificationData) {
    this.eventEmitter.emit(NotificationEvents.push, data);
    this.logger.log(`push notification event dispatched`);
  }

  @GrpcMethod('NotificationService', 'Sms')
  handleSmsNotification(data: ISmsEvent) {
    this.eventEmitter.emit(NotificationEvents.sms, data);
    this.logger.log(`sms event dispatched`);
  }
}
