import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Effect } from 'effect';
import type * as zod from 'zod';

import { getManyThoughtsQuerySchema } from '@repo/api-models';

import { ListResponsePaginationDto } from 'src/shared/dto/list-response-pagination.dto';
import { ExclusionReason, UnknownReason } from 'src/shared/excluded';
import { ReqCtx, type RequestContext } from 'src/shared/utils/request-context';
import { ZodValidationPipe } from 'src/shared/utils/zod-validation-pipe';

import { GetMyManyThoughtsUseCase } from '../application/use-cases/get-my-many-thoughts.use-case';
import { LocalizedShortThoughtModel } from '../domain/models/localized-short-thought.model';
import { GetManyThoughtsResponseDto } from './dtos/get-many-thoughts-reponse.dto';

@ApiTags('Thoughts')
@Controller({ path: 'my/thoughts', version: '1' })
export class MyThoughtsController {
  constructor(
    @Inject(GetMyManyThoughtsUseCase)
    private readonly getMyManyThoughtsUseCase: GetMyManyThoughtsUseCase
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get my thoughts' })
  @ApiResponse({ description: 'Returns the thoughts', status: 200 })
  async getMany(
    @ReqCtx() reqCtx: RequestContext,
    @Query(new ZodValidationPipe(getManyThoughtsQuerySchema))
    query: zod.infer<typeof getManyThoughtsQuerySchema>
  ): Promise<GetManyThoughtsResponseDto> {
    const pipeline: Effect.Effect<GetManyThoughtsResponseDto, ExclusionReason> = this.getMyManyThoughtsUseCase
      .execute(reqCtx, query)
      .pipe(
        Effect.map(({ items, total }) => {
          const filtered: LocalizedShortThoughtModel[] = [];
          const skipped: number[] = [];

          items.forEach((item, index) => {
            if (item instanceof LocalizedShortThoughtModel) filtered.push(item);
            else skipped.push(index);
          });

          return GetManyThoughtsResponseDto.fromModel(
            filtered,
            ListResponsePaginationDto.from({ limit: query.page.limit, offset: query.page.offset, skipped, total })
          );
        }),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }
}
