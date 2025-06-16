import { Module } from '@nestjs/common';

import { TAGS_REPOSITORY } from './domain/repositories/tags.repository';

import { TagsServiceImpl } from './application/services/tags.service';
import { TAGS_SRV } from './application/services/tags.service.interface';
import { GetAllTagsUseCase } from './application/use-cases/get-all-tags.use-case';

import { PrismaTagsRepository } from './infrastructure/repositories/tags.repository';

import { CasbinModule } from '../casbin';
import { PrismaModule } from '../prisma';
import { TagsController } from './presentation/tags.controller';

@Module({
  controllers: [TagsController],
  exports: [TAGS_SRV],
  imports: [PrismaModule, CasbinModule],
  providers: [
    { provide: TAGS_REPOSITORY, useClass: PrismaTagsRepository },
    { provide: TAGS_SRV, useClass: TagsServiceImpl },
    GetAllTagsUseCase,
  ],
})
export class TagsModule {}
