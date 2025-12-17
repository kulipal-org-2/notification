import { Controller, HttpStatus, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GrpcMethod } from '@nestjs/microservices';
import { NotificationEvents } from '../../../common';
import { type IGenericEmailEvent } from '../../../mail/interface';
import { type IPushNotificationData } from '../../../push-notification/interfaces';
import {
  type IRegisterDeviceTokenDto,
  type IUnregisterDeviceTokenDto,
} from '../../../push-notification/interfaces';
import { type ISmsEvent } from '../../../sms/interfaces/sms-event.interface';
import { DeviceTokenService } from '../../../push-notification/services';

@Controller()
export class NotificationController {
  private readonly logger = new Logger(NotificationController.name);

  constructor(
    private eventEmitter: EventEmitter2,
    private readonly deviceTokenService: DeviceTokenService,
  ) {}

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

  @GrpcMethod('NotificationService', 'RegisterDeviceToken')
  async registerDeviceToken(data: IRegisterDeviceTokenDto) {
    try {
      await this.deviceTokenService.registerToken(data);

      return {
        message: 'Device token registered successfully',
        statusCode: HttpStatus.OK,
        success: true,
      };
    } catch (error: any) {
      this.logger.error(
        `Error registering device token: ${error.message}`,
        error.stack,
      );
      return {
        message: 'Failed to register device token',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
      };
    }
  }

  @GrpcMethod('NotificationService', 'UnregisterDeviceToken')
  async unregisterDeviceToken(data: IUnregisterDeviceTokenDto) {
    try {
      await this.deviceTokenService.unregisterToken(data);

      return {
        message: 'Device token unregistered successfully',
        statusCode: HttpStatus.OK,
        success: true,
      };
    } catch (error: any) {
      this.logger.error(
        `Error unregistering device token: ${error.message}`,
        error.stack,
      );
      return {
        message: 'Failed to unregister device token',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
      };
    }
  }
}
