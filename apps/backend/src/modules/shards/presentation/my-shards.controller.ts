import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Effect } from 'effect';
import type * as zod from 'zod';

import { getManyShardsQuerySchema } from '@repo/api-models';

import { ListResponsePaginationDto } from 'src/shared/dto/list-response-pagination.dto';
import { ExclusionReason, UnknownReason } from 'src/shared/excluded';
import { ReqCtx, type RequestContext } from 'src/shared/utils/request-context';
import { ZodValidationPipe } from 'src/shared/utils/zod-validation-pipe';

import { GetMyManyShardsUseCase } from '../application/use-cases/get-my-many-shards.use-case';
import { LocalizedShortShardModel } from '../domain/models/localized-short-shard.model';
import { GetManyShardsResponseDto } from './dtos/get-many-shards-reponse.dto';

@ApiTags('Shards')
@Controller({ path: 'my/shards', version: '1' })
export class MyShardsController {
  constructor(
    @Inject(GetMyManyShardsUseCase)
    private readonly getMyManyShardsUseCase: GetMyManyShardsUseCase
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
}
