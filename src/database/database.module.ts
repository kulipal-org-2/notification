import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DeviceToken } from './entities';
import { DeviceTokenRepository } from './repositories';
import { MikroOrmOptions } from '../config/mikro.config';

@Module({
  imports: [
    MikroOrmModule.forRootAsync(MikroOrmOptions),
    MikroOrmModule.forFeature([DeviceToken]),
  ],
  providers: [DeviceTokenRepository],
  exports: [DeviceTokenRepository, MikroOrmModule],
})
export class DatabaseModule {}
