import { Module } from '@nestjs/common';

import { THOUGHTS_REPOSITORY } from './domain/repositories/thoughts.repository';

import { ThoughtsAccessServiceImpl } from './application/services/thoughts-access.service';
import { THOUGHTS_ACCESS_SRV } from './application/services/thoughts-access.service.interface';
import { CheckThoughtSlugAvailabilityUseCase } from './application/use-cases/check-thought-slug-availability.use-case';
import { CreateThoughtUseCase } from './application/use-cases/create-thought.use-case';
import { GetManyThoughtsUseCase } from './application/use-cases/get-many-thoughts.use-case';
import { GetMyManyThoughtsUseCase } from './application/use-cases/get-my-many-thoughts.use-case';

import { PrismaThoughtsRepository } from './infrastructure/repositories/thoughts.repository';

import { CasbinModule } from '../casbin';
import { PrismaModule } from '../prisma';
import { MyThoughtsController } from './presentation/my-thoughts.controller';
import { ThoughtSlugAvailabilityController } from './presentation/thought-slug-availability.controller';
import { ThoughtsController } from './presentation/thoughts.controller';

@Module({
  controllers: [ThoughtsController, ThoughtSlugAvailabilityController, MyThoughtsController],
  imports: [PrismaModule, CasbinModule],
  providers: [
    { provide: THOUGHTS_REPOSITORY, useClass: PrismaThoughtsRepository },
    { provide: THOUGHTS_ACCESS_SRV, useClass: ThoughtsAccessServiceImpl },
    CreateThoughtUseCase,
    CheckThoughtSlugAvailabilityUseCase,
    GetMyManyThoughtsUseCase,
    GetManyThoughtsUseCase,
  ],
})
export class ThoughtsModule {}
