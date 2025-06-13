import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Effect } from 'effect';
import type * as zod from 'zod';

import { createShardBodySchema, getManyShardsQuerySchema } from '@repo/api-models';

import { Public } from 'src/shared/decorators/public';
import { ListResponsePaginationDto } from 'src/shared/dto/list-response-pagination.dto';
import { ExclusionReason, UnknownReason } from 'src/shared/excluded';
import { ReqCtx, type RequestContext } from 'src/shared/utils/request-context';
import { ZodValidationPipe } from 'src/shared/utils/zod-validation-pipe';

import { CreateShardUseCase } from '../application/use-cases/create-shard.use-case';
import { GetManyShardsUseCase } from '../application/use-cases/get-many-shards.use-case';
import { LocalizedShortShardModel } from '../domain/models/localized-short-shard.model';
import { GetManyShardsResponseDto } from './dtos/get-many-shards-reponse.dto';
import { GetOneShardResponseDto } from './dtos/get-one-shard-reponse.dto';

@ApiTags('Shards')
@Controller({ path: 'shards', version: '1' })
export class ShardsController {
  constructor(
    @Inject(CreateShardUseCase)
    private readonly createShardUseCase: CreateShardUseCase,

    @Inject(GetManyShardsUseCase)
    private readonly getManyShardsUseCase: GetManyShardsUseCase
  ) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get many shards' })
  @ApiResponse({ description: 'Returns the shards', status: 200 })
  async getMany(
    @ReqCtx() reqCtx: RequestContext,
    @Query(new ZodValidationPipe(getManyShardsQuerySchema))
    query: zod.infer<typeof getManyShardsQuerySchema>
  ): Promise<GetManyShardsResponseDto> {
    const pipeline: Effect.Effect<GetManyShardsResponseDto, ExclusionReason> = this.getManyShardsUseCase
      .execute(reqCtx, query)
      .pipe(
        Effect.map(({ items, total }) => {
          const filtered: LocalizedShortShardModel[] = [];
          const skipped: number[] = [];

          items.forEach((item, index) => {
            if (item instanceof LocalizedShortShardModel) filtered.push(item);
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

  @Post()
  @ApiOperation({ summary: 'Create a shard' })
  @ApiResponse({ description: 'Returns the created shard', status: 200 })
  async create(
    @ReqCtx() reqCtx: RequestContext,
    @Body(new ZodValidationPipe(createShardBodySchema))
    body: zod.infer<typeof createShardBodySchema>
  ): Promise<GetOneShardResponseDto> {
    const pipeline: Effect.Effect<GetOneShardResponseDto, ExclusionReason> = this.createShardUseCase
      .execute(reqCtx, body)
      .pipe(
        Effect.map((shardModel) => {
          return GetOneShardResponseDto.fromModel(shardModel);
        }),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }
}
