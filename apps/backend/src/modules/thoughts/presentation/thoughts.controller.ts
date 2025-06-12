import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Effect } from 'effect';
import type * as zod from 'zod';

import { createThoughtBodySchema, getManyThoughtsQuerySchema } from '@repo/api-models';

import { Public } from 'src/shared/decorators/public';
import { ListResponsePaginationDto } from 'src/shared/dto/list-response-pagination.dto';
import { ExclusionReason, UnknownReason } from 'src/shared/excluded';
import { ReqCtx, type RequestContext } from 'src/shared/utils/request-context';
import { ZodValidationPipe } from 'src/shared/utils/zod-validation-pipe';

import { CreateThoughtUseCase } from '../application/use-cases/create-thought.use-case';
import { GetManyThoughtsUseCase } from '../application/use-cases/get-many-thoughts.use-case';
import { LocalizedShortThoughtModel } from '../domain/models/localized-short-thought.model';
import { GetManyThoughtsResponseDto } from './dtos/get-many-thoughts-reponse.dto';
import { GetOneThoughtResponseDto } from './dtos/get-one-thought-reponse.dto';

@ApiTags('Thoughts')
@Controller({ path: 'thoughts', version: '1' })
export class ThoughtsController {
  constructor(
    @Inject(CreateThoughtUseCase)
    private readonly createThoughtUseCase: CreateThoughtUseCase,

    @Inject(GetManyThoughtsUseCase)
    private readonly getManyThoughtsUseCase: GetManyThoughtsUseCase
  ) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get many thoughts' })
  @ApiResponse({ description: 'Returns the thoughts', status: 200 })
  async getMany(
    @ReqCtx() reqCtx: RequestContext,
    @Query(new ZodValidationPipe(getManyThoughtsQuerySchema))
    query: zod.infer<typeof getManyThoughtsQuerySchema>
  ): Promise<GetManyThoughtsResponseDto> {
    const pipeline: Effect.Effect<GetManyThoughtsResponseDto, ExclusionReason> = this.getManyThoughtsUseCase
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

  @Post()
  @ApiOperation({ summary: 'Create a thought' })
  @ApiResponse({ description: 'Returns the created thought', status: 200 })
  async create(
    @ReqCtx() reqCtx: RequestContext,
    @Body(new ZodValidationPipe(createThoughtBodySchema))
    body: zod.infer<typeof createThoughtBodySchema>
  ): Promise<GetOneThoughtResponseDto> {
    const pipeline: Effect.Effect<GetOneThoughtResponseDto, ExclusionReason> = this.createThoughtUseCase
      .execute(reqCtx, body)
      .pipe(
        Effect.map((thoughtModel) => {
          return GetOneThoughtResponseDto.fromModel(thoughtModel);
        }),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }
}
