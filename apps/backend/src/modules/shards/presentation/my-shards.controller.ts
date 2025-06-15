import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Effect } from 'effect';
import type * as zod from 'zod';

import { getManyShardsQuerySchema } from '@repo/api-models';

import { ListResponsePaginationDto } from 'src/shared/dto/list-response-pagination.dto';
import { ExclusionReason, UnknownReason } from 'src/shared/excluded';
import { ReqCtx, type RequestContext } from 'src/shared/utils/request-context';
import { ZodValidationPipe } from 'src/shared/utils/zod-validation-pipe';

import { GetMyManyShardsUseCase } from '../application/use-cases/get-my-many-shards.use-case';
import { GetMyShardUseCase } from '../application/use-cases/get-my-shard.use-case';
import { ShardModel } from '../domain/models/shard.model';
import { GetManyShardsResponseDto } from './dtos/get-many-shards-reponse.dto';
import { GetOneShardResponseDto } from './dtos/get-one-shard-reponse.dto';

@ApiTags('Shards')
@Controller({ path: 'my/shards', version: '1' })
export class MyShardsController {
  constructor(
    @Inject(GetMyManyShardsUseCase)
    private readonly getMyManyShardsUseCase: GetMyManyShardsUseCase,

    @Inject(GetMyShardUseCase)
    private readonly getMyShardUseCase: GetMyShardUseCase
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get my shards' })
  @ApiResponse({ description: 'Returns the shards', status: 200 })
  async getMany(
    @ReqCtx() reqCtx: RequestContext,
    @Query(new ZodValidationPipe(getManyShardsQuerySchema))
    query: zod.infer<typeof getManyShardsQuerySchema>
  ): Promise<GetManyShardsResponseDto> {
    const pipeline: Effect.Effect<GetManyShardsResponseDto, ExclusionReason> = this.getMyManyShardsUseCase
      .execute(reqCtx, query)
      .pipe(
        Effect.flatMap(({ items, total }) => {
          const filtered: ShardModel[] = [];
          const skipped: number[] = [];

          items.forEach((item, index) => {
            if (item instanceof ShardModel) filtered.push(item);
            else skipped.push(index);
          });

          return GetManyShardsResponseDto.fromModel(
            filtered,
            ListResponsePaginationDto.from({ limit: query.page.limit, offset: query.page.offset, skipped, total })
          );
        }),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get my shards' })
  @ApiResponse({ description: 'Returns the shards', status: 200 })
  async getOne(@ReqCtx() reqCtx: RequestContext, @Param('id') id: string): Promise<GetOneShardResponseDto> {
    const pipeline: Effect.Effect<GetOneShardResponseDto, ExclusionReason> = this.getMyShardUseCase
      .execute(reqCtx, id)
      .pipe(
        Effect.flatMap((shard) => GetOneShardResponseDto.fromModel(shard)),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }
}
