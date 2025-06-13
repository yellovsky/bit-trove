import { Module } from '@nestjs/common';

import { SHARDS_REPOSITORY } from './domain/repositories/shards.repository';

import { ShardsAccessServiceImpl } from './application/services/shards-access.service';
import { SHARDS_ACCESS_SRV } from './application/services/shards-access.service.interface';
import { CheckShardSlugAvailabilityUseCase } from './application/use-cases/check-shard-slug-availability.use-case';
import { CreateShardUseCase } from './application/use-cases/create-shard.use-case';
import { GetManyShardsUseCase } from './application/use-cases/get-many-shards.use-case';
import { GetMyManyShardsUseCase } from './application/use-cases/get-my-many-shards.use-case';

import { PrismaShardsRepository } from './infrastructure/repositories/shards.repository';

import { CasbinModule } from '../casbin';
import { PrismaModule } from '../prisma';
import { MyShardsController } from './presentation/my-shards.controller';
import { ShardSlugAvailabilityController } from './presentation/shard-slug-availability.controller';
import { ShardsController } from './presentation/shards.controller';

@Module({
  controllers: [ShardsController, ShardSlugAvailabilityController, MyShardsController],
  imports: [PrismaModule, CasbinModule],
  providers: [
    { provide: SHARDS_REPOSITORY, useClass: PrismaShardsRepository },
    { provide: SHARDS_ACCESS_SRV, useClass: ShardsAccessServiceImpl },
    CreateShardUseCase,
    CheckShardSlugAvailabilityUseCase,
    GetMyManyShardsUseCase,
    GetManyShardsUseCase,
  ],
})
export class ShardsModule {}
