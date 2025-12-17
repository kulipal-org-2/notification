import { Platform } from '../../database/entities/device-token.entity';

export interface IRegisterDeviceTokenDto {
  userId: string;
  token: string;
  platform?: Platform;
  deviceId?: string;
}

export interface IUnregisterDeviceTokenDto {
  userId: string;
  token: string;
}
