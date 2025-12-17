import { CreateRequestContext, EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CustomLogger as Logger } from 'kulipal-shared';
import {
  DeviceToken,
  Platform,
} from '../../database/entities/device-token.entity';
import {
  type IUnregisterDeviceTokenDto,
  type IRegisterDeviceTokenDto,
} from '../interfaces/device-token.interface';

@Injectable()
export class DeviceTokenService {
  private readonly logger = new Logger(DeviceTokenService.name);

  constructor(private readonly em: EntityManager) {}

  @CreateRequestContext()
  async registerToken(data: IRegisterDeviceTokenDto): Promise<DeviceToken> {
    const { userId, token, platform, deviceId } = data;
    this.logger.log(
      `Registering device token for user ${userId}, platform: ${platform ?? 'not provided'}`,
    );

    const existing = await this.em.findOne(DeviceToken, { token });

    if (existing) {
      if (existing.userId !== userId) {
        this.logger.warn(
          `Token ${token.substring(0, 20)}... reassigned from user ${existing.userId} to ${userId} - device likely switched users`,
        );
      }

      existing.userId = userId;
      if (platform !== undefined) {
        existing.platform = platform;
      }
      existing.isActive = true;
      if (deviceId) {
        existing.deviceId = deviceId;
      }
      await this.em.flush();
      this.logger.log(`Updated existing device token for user ${userId}`);
      return existing;
    }

    if (deviceId) {
      const existingDeviceTokens = await this.em.find(DeviceToken, {
        userId,
        deviceId,
        isActive: true,
      });

      if (existingDeviceTokens.length > 0) {
        this.logger.log(
          `Found ${existingDeviceTokens.length} existing active token(s) for device ${deviceId}, deactivating`,
        );
        for (const oldToken of existingDeviceTokens) {
          oldToken.isActive = false;
        }
      }
    }

    const newToken = this.em.create(DeviceToken, {
      ...data,
      isActive: true,
    });
    this.em.persist(newToken);
    await this.em.flush();
    this.logger.log(`Created new device token for user ${userId}`);
    return newToken;
  }

  @CreateRequestContext()
  async getActiveTokens(userId: string): Promise<DeviceToken[]> {
    return this.em.find(DeviceToken, {
      userId,
      isActive: true,
    });
  }

  @CreateRequestContext()
  async unregisterToken(data: IUnregisterDeviceTokenDto): Promise<void> {
    const { userId, token } = data;
    this.logger.log(`Unregistering device token for user ${userId}`);
    await this.em.nativeUpdate(
      DeviceToken,
      { userId, token },
      { isActive: false },
    );
  }

  @CreateRequestContext()
  async unregisterAllTokens(userId: string): Promise<void> {
    this.logger.log(`Unregistering all device tokens for user ${userId}`);
    await this.em.nativeUpdate(DeviceToken, { userId }, { isActive: false });
  }

  @CreateRequestContext()
  async deactivateTokens(tokens: string[]): Promise<void> {
    if (tokens.length === 0) return;

    this.logger.log(`Deactivating ${tokens.length} invalid tokens`);

    for (const token of tokens) {
      await this.em.nativeUpdate(DeviceToken, { token }, { isActive: false });
    }
  }
}
