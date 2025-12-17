import { CustomBaseEntity } from './base.entity';
import { Entity, Index, Property, Unique } from '@mikro-orm/postgresql';

export enum Platform {
  IOS = 'ios',
  ANDROID = 'android',
}

@Entity({ tableName: 'device_token' })
@Index({ properties: ['userId', 'isActive'] })
@Unique({ properties: ['token'] })
export class DeviceToken extends CustomBaseEntity {
  @Property()
  userId!: string;

  @Property()
  token!: string;

  @Property({ nullable: true })
  platform?: Platform;

  @Property({ nullable: true })
  deviceId?: string;

  @Property({ default: true })
  isActive: boolean = true;
}
