import { Body, Controller, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Effect } from 'effect';
import type * as zod from 'zod';

import { getManyShardsQuerySchema, getOneShardQuerySchema, upsertShardBodySchema } from '@repo/api-models';

import { Public } from 'src/shared/decorators/public';
import { ListResponsePaginationDto } from 'src/shared/dto/list-response-pagination.dto';
import { ExclusionReason, UnknownReason } from 'src/shared/excluded';
import { ReqCtx, type RequestContext } from 'src/shared/utils/request-context';
import { ZodValidationPipe } from 'src/shared/utils/zod-validation-pipe';

import { CreateShardUseCase } from '../application/use-cases/create-shard.use-case';
import { GetManyShardsUseCase } from '../application/use-cases/get-many-shards.use-case';
import { GetOneShardUseCase } from '../application/use-cases/get-one-shard.use-case';
import { UpdateShardUseCase } from '../application/use-cases/update-shard.use-case';
import { ShardModel } from '../domain/models/shard.model';
import { GetManyShardsResponseDto } from './dtos/get-many-shards-reponse.dto';
import { GetOneShardResponseDto } from './dtos/get-one-shard-reponse.dto';

@ApiTags('Shards')
@Controller({ path: 'shards', version: '1' })
export class ShardsController {
  constructor(
    @Inject(CreateShardUseCase)
    private readonly createShardUseCase: CreateShardUseCase,

    @Inject(GetManyShardsUseCase)
    private readonly getManyShardsUseCase: GetManyShardsUseCase,

    @Inject(GetOneShardUseCase)
    private readonly getOneShardUseCase: GetOneShardUseCase,

    @Inject(UpdateShardUseCase)
    private readonly updateShardUseCase: UpdateShardUseCase
  ) {}

  @Get()
  @Public()
  @ApiOperation({
    description:
      'Retrieve a list of shards with optional search functionality. Supports searching in titles, descriptions, and content.',
    summary: 'Get many shards',
  })
  @ApiResponse({ description: 'Returns the shards', status: 200 })
  async getMany(
    @ReqCtx() reqCtx: RequestContext,
    @Query(new ZodValidationPipe(getManyShardsQuerySchema))
    query: zod.infer<typeof getManyShardsQuerySchema>
  ): Promise<GetManyShardsResponseDto> {
    const pipeline: Effect.Effect<GetManyShardsResponseDto, ExclusionReason> = this.getManyShardsUseCase
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

  @Post()
  @ApiOperation({ summary: 'Create a shard' })
  @ApiResponse({ description: 'Returns the created shard', status: 200 })
  async create(
    @ReqCtx() reqCtx: RequestContext,
    @Body(new ZodValidationPipe(upsertShardBodySchema))
    body: zod.infer<typeof upsertShardBodySchema>
  ): Promise<GetOneShardResponseDto> {
    const pipeline: Effect.Effect<GetOneShardResponseDto, ExclusionReason> = this.createShardUseCase
      .execute(reqCtx, body)
      .pipe(
        Effect.flatMap((shardModel) => GetOneShardResponseDto.fromModel(shardModel)),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a shard' })
  @ApiResponse({ description: 'Returns the updated shard', status: 200 })
  async update(
    @ReqCtx() reqCtx: RequestContext,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(upsertShardBodySchema))
    body: zod.infer<typeof upsertShardBodySchema>
  ): Promise<GetOneShardResponseDto> {
    const pipeline: Effect.Effect<GetOneShardResponseDto, ExclusionReason> = this.updateShardUseCase
      .execute(reqCtx, id, body)
      .pipe(
        Effect.flatMap((shardModel) => GetOneShardResponseDto.fromModel(shardModel)),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }

  @Get(':slugOrId')
  @Public()
  @ApiOperation({ summary: 'Get a shard by slug or ID' })
  @ApiResponse({ description: 'Returns the shard', status: 200 })
  async getOne(
    @ReqCtx() reqCtx: RequestContext,
    @Param('slugOrId') slugOrId: string,
    @Query(new ZodValidationPipe(getOneShardQuerySchema))
    query: zod.infer<typeof getOneShardQuerySchema>
  ): Promise<GetOneShardResponseDto> {
    const pipeline: Effect.Effect<GetOneShardResponseDto, ExclusionReason> = this.getOneShardUseCase
      .execute(reqCtx, slugOrId, query)
      .pipe(
        Effect.flatMap((shardModel) => GetOneShardResponseDto.fromModel(shardModel)),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }
}
