import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Effect } from 'effect';
import type * as zod from 'zod';

import { getAllTagsQuerySchema } from '@repo/api-models';

import { Public } from 'src/shared/decorators/public';
import { ExclusionReason, UnknownReason } from 'src/shared/excluded';
import { ReqCtx, type RequestContext } from 'src/shared/utils/request-context';
import { ZodValidationPipe } from 'src/shared/utils/zod-validation-pipe';

import { GetAllTagsUseCase } from '../application/use-cases/get-all-tags.use-case';
import { GetAllTagsResponseDto } from './dtos/get-all-shards-reponse.dto';

@ApiTags('Tags')
@Controller({ path: 'tags', version: '1' })
export class TagsController {
  constructor(
    @Inject(GetAllTagsUseCase)
    private readonly getAllTagsUseCase: GetAllTagsUseCase
  ) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all tags' })
  @ApiResponse({ description: 'Returns the tags', status: 200 })
  async getAll(
    @ReqCtx() reqCtx: RequestContext,
    @Query(new ZodValidationPipe(getAllTagsQuerySchema))
    query: zod.infer<typeof getAllTagsQuerySchema>
  ): Promise<GetAllTagsResponseDto> {
    const pipeline: Effect.Effect<GetAllTagsResponseDto, ExclusionReason> = this.getAllTagsUseCase
      .execute(reqCtx, query)
      .pipe(
        Effect.flatMap((tags) => GetAllTagsResponseDto.fromModel(tags)),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }
}
