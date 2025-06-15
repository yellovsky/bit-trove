import { Controller, Get, Inject, Param, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Effect, pipe } from 'effect';

import { type ExclusionReason, ensureKnownReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import { ReqCtx, type RequestContext } from 'src/shared/utils/request-context';

import { PRISMA_SRV } from 'src/modules/prisma';

import { CheckShardSlugAvailabilityUseCase } from '../application/use-cases/check-shard-slug-availability.use-case';
import { PublishShardUseCase } from '../application/use-cases/publish-shard.use-case';
import { UnpublishShardUseCase } from '../application/use-cases/unpublish-shard.use-case';
import { GetOneShardResponseDto } from './dtos/get-one-shard-reponse.dto';
import {
  CheckShardSlugAvailabilityResponseDto,
  ShardSlugAvailabilityDto,
} from './dtos/shard-slug-availability-response.dto';

@ApiTags('Shards')
@Controller({ path: 'cms-shards', version: '1' })
export class CmsShardsController {
  constructor(
    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>,

    @Inject(CheckShardSlugAvailabilityUseCase)
    private readonly checkShardSlugAvailabilityUseCase: CheckShardSlugAvailabilityUseCase,

    @Inject(PublishShardUseCase)
    private readonly publishShardUseCase: PublishShardUseCase,

    @Inject(UnpublishShardUseCase)
    private readonly unpublishShardUseCase: UnpublishShardUseCase
  ) {}

  @Get('check-slug-availability/:slug')
  @ApiOperation({ summary: 'Check if a shard slug is available' })
  @ApiResponse({ description: 'Returns the availability of the shard slug', status: 200 })
  async check(
    @ReqCtx() reqCtx: RequestContext,
    @Param('slug') slug: string
  ): Promise<CheckShardSlugAvailabilityResponseDto> {
    const pipeline: Effect.Effect<CheckShardSlugAvailabilityResponseDto, ExclusionReason> =
      this.checkShardSlugAvailabilityUseCase.execute(reqCtx, slug).pipe(
        Effect.map((takenBy) => {
          return new CheckShardSlugAvailabilityResponseDto({
            data: new ShardSlugAvailabilityDto(takenBy ? { available: false, takenBy } : { available: true }),
          });
        }),
        Effect.mapError(ensureKnownReason)
      );

    return Effect.runPromise(pipeline);
  }

  @Patch('publish/:id')
  @ApiOperation({ description: 'Publish a shard', summary: 'Publish a shard' })
  @ApiResponse({ description: 'Returns the published shard', status: 200 })
  async publish(@ReqCtx() reqCtx: RequestContext, @Param('id') id: string): Promise<GetOneShardResponseDto> {
    return this.prismaSrv.$transaction(async (tx) => {
      const reqCtxWithTx = reqCtx.withTx(tx);

      const pipeline: Effect.Effect<GetOneShardResponseDto, ExclusionReason> = pipe(
        this.publishShardUseCase.execute(reqCtxWithTx, id),
        Effect.flatMap((shard) => GetOneShardResponseDto.fromModel(shard)),
        Effect.mapError(ensureKnownReason)
      );

      return Effect.runPromise(pipeline);
    });
  }

  @Patch('unpublish/:id')
  @ApiOperation({ description: 'Unpublish a shard', summary: 'Unpublish a shard' })
  @ApiOkResponse({ type: GetOneShardResponseDto })
  async unpublish(@ReqCtx() reqCtx: RequestContext, @Param('id') id: string): Promise<GetOneShardResponseDto> {
    return this.prismaSrv.$transaction(async (tx) => {
      const reqCtxWithTx = reqCtx.withTx(tx);

      const pipeline: Effect.Effect<GetOneShardResponseDto, ExclusionReason> = pipe(
        this.unpublishShardUseCase.execute(reqCtxWithTx, id),
        Effect.flatMap((shard) => GetOneShardResponseDto.fromModel(shard)),
        Effect.mapError(ensureKnownReason)
      );

      return Effect.runPromise(pipeline);
    });
  }
}
