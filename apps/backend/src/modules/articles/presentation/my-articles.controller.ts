import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Effect } from 'effect';
import type * as zod from 'zod';

import { shortArticlesGetQuerySchema } from '@repo/api-models';

import { ListResponsePaginationDto } from 'src/shared/dto/list-response-pagination.dto';
import { ExclusionReason, UnknownReason } from 'src/shared/excluded';
import { ReqCtx, type RequestContext } from 'src/shared/utils/request-context';
import { ZodValidationPipe } from 'src/shared/utils/zod-validation-pipe';

import { GetMyArticleUseCase } from '../application/use-cases/get-my-article.use-case';
import { GetMyManyArticlesUseCase } from '../application/use-cases/get-my-many-articles.use-case';
import { ArticleModel } from '../domain/models/article.model';
import { GetManyArticlesResponseDto } from './dtos/get-many-articles-reponse.dto';
import { GetOneArticleResponseDto } from './dtos/get-one-article-reponse.dto';

@ApiTags('Articles')
@Controller({ path: 'my/articles', version: '1' })
export class MyArticlesController {
  constructor(
    @Inject(GetMyManyArticlesUseCase)
    private readonly getMyManyArticlesUseCase: GetMyManyArticlesUseCase,

    @Inject(GetMyArticleUseCase)
    private readonly getMyArticleUseCase: GetMyArticleUseCase
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get my articles' })
  @ApiResponse({ description: 'Returns the articles', status: 200 })
  async getMany(
    @ReqCtx() reqCtx: RequestContext,
    @Query(new ZodValidationPipe(shortArticlesGetQuerySchema))
    query: zod.infer<typeof shortArticlesGetQuerySchema>
  ): Promise<GetManyArticlesResponseDto> {
    const pipeline: Effect.Effect<GetManyArticlesResponseDto, ExclusionReason> = this.getMyManyArticlesUseCase
      .execute(reqCtx, query)
      .pipe(
        Effect.flatMap(({ items, total }) => {
          const filtered: ArticleModel[] = [];
          const skipped: number[] = [];

          items.forEach((item, index) => {
            if (item instanceof ArticleModel) filtered.push(item);
            else skipped.push(index);
          });

          return GetManyArticlesResponseDto.fromModel(
            filtered,
            ListResponsePaginationDto.from({ limit: query.page.limit, offset: query.page.offset, skipped, total })
          );
        }),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get my articles' })
  @ApiResponse({ description: 'Returns the articles', status: 200 })
  async getOne(@ReqCtx() reqCtx: RequestContext, @Param('id') id: string): Promise<GetOneArticleResponseDto> {
    const pipeline: Effect.Effect<GetOneArticleResponseDto, ExclusionReason> = this.getMyArticleUseCase
      .execute(reqCtx, id)
      .pipe(
        Effect.flatMap((article) => GetOneArticleResponseDto.fromModel(article)),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }
}
