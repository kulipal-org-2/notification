import { EntityRepository } from '@mikro-orm/postgresql';
import { DeviceToken } from '../entities/device-token.entity';

export class DeviceTokenRepository extends EntityRepository<DeviceToken> {}
