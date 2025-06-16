import { Module } from '@nestjs/common';

import { SHARDS_REPOSITORY } from './domain/repositories/shards.repository';

import { ShardsServiceImpl } from './application/services/shards.service';
import { SHARDS_SRV } from './application/services/shards.service.interface';
import { ShardsAccessServiceImpl } from './application/services/shards-access.service';
import { SHARDS_ACCESS_SRV } from './application/services/shards-access.service.interface';
import { CheckShardSlugAvailabilityUseCase } from './application/use-cases/check-shard-slug-availability.use-case';
import { CreateShardUseCase } from './application/use-cases/create-shard.use-case';
import { GetManyShardsUseCase } from './application/use-cases/get-many-shards.use-case';
import { GetMyManyShardsUseCase } from './application/use-cases/get-my-many-shards.use-case';
import { GetMyShardUseCase } from './application/use-cases/get-my-shard.use-case';
import { GetOneShardUseCase } from './application/use-cases/get-one-shard.use-case';
import { PublishShardUseCase } from './application/use-cases/publish-shard.use-case';
import { UnpublishShardUseCase } from './application/use-cases/unpublish-shard.use-case';
import { UpdateShardUseCase } from './application/use-cases/update-shard.use-case';

import { PrismaShardsRepository } from './infrastructure/repositories/shards.repository';

import { CasbinModule } from '../casbin';
import { PrismaModule } from '../prisma';
import { TagsModule } from '../tags';
import { CmsShardsController } from './presentation/cms-shards.controller';
import { MyShardsController } from './presentation/my-shards.controller';
import { ShardsController } from './presentation/shards.controller';

@Module({
  controllers: [ShardsController, CmsShardsController, MyShardsController],
  imports: [PrismaModule, CasbinModule, TagsModule],
  providers: [
    { provide: SHARDS_REPOSITORY, useClass: PrismaShardsRepository },
    { provide: SHARDS_ACCESS_SRV, useClass: ShardsAccessServiceImpl },
    { provide: SHARDS_SRV, useClass: ShardsServiceImpl },
    CreateShardUseCase,
    CheckShardSlugAvailabilityUseCase,
    GetMyManyShardsUseCase,
    GetManyShardsUseCase,
    GetOneShardUseCase,
    PublishShardUseCase,
    UnpublishShardUseCase,
    GetMyShardUseCase,
    UpdateShardUseCase,
  ],
})
export class ShardsModule {}
