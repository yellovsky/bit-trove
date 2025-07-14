import { Body, Controller, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Effect } from 'effect';
import type * as zod from 'zod';

import { articleUpsertBodySchema, shortArticlesGetQuerySchema } from '@repo/api-models';

import { ListResponsePaginationDto } from 'src/shared/dto/list-response-pagination.dto';
import { ExclusionReason, UnknownReason } from 'src/shared/excluded';
import { ReqCtx, type RequestContext } from 'src/shared/utils/request-context';
import { ZodValidationPipe } from 'src/shared/utils/zod-validation-pipe';

import { MyArticleCreateUseCase } from '../application/use-cases/my-article-create.use-case';
import { MyArticleGetUseCase } from '../application/use-cases/my-article-get.use-case';
import { MyArticlePublishUseCase } from '../application/use-cases/my-article-publish.use-case';
import { MyArticleUnpublishUseCase } from '../application/use-cases/my-article-unpublish.use-case';
import { MyArticleUpdateUseCase } from '../application/use-cases/my-article-update.use-case';
import { MyShortArticlesGetUseCase } from '../application/use-cases/my-short-articles-get.use-case';
import { ArticleModel } from '../domain/models/article.model';
import { GetManyArticlesResponseDto } from './dtos/get-many-articles-reponse.dto';
import { GetOneArticleResponseDto } from './dtos/get-one-article-reponse.dto';

@ApiTags('My Articles')
@Controller({ path: 'my/articles', version: '1' })
export class MyArticlesController {
  constructor(
    @Inject(MyShortArticlesGetUseCase)
    private readonly myShortArticlesGetUseCase: MyShortArticlesGetUseCase,

    @Inject(MyArticleGetUseCase)
    private readonly myArticleGetUseCase: MyArticleGetUseCase,

    @Inject(MyArticleCreateUseCase)
    private readonly myArticleCreateUseCase: MyArticleCreateUseCase,

    @Inject(MyArticleUpdateUseCase)
    private readonly myArticleUpdateUseCase: MyArticleUpdateUseCase,

    @Inject(MyArticlePublishUseCase)
    private readonly myArticlePublishUseCase: MyArticlePublishUseCase,

    @Inject(MyArticleUnpublishUseCase)
    private readonly myArticleUnpublishUseCase: MyArticleUnpublishUseCase
  ) {}

  @Get()
  @ApiOperation({
    description:
      'Retrieves a paginated list of articles owned by the authenticated user. Includes both published and draft articles. Supports filtering by status, type, and search terms.',
    summary: 'Get my articles',
  })
  @ApiResponse({
    description: 'User articles retrieved successfully',
    status: 200,
    type: GetManyArticlesResponseDto,
  })
  async getMany(
    @ReqCtx() reqCtx: RequestContext,
    @Query(new ZodValidationPipe(shortArticlesGetQuerySchema))
    query: zod.infer<typeof shortArticlesGetQuerySchema>
  ): Promise<GetManyArticlesResponseDto> {
    const pipeline: Effect.Effect<GetManyArticlesResponseDto, ExclusionReason> = this.myShortArticlesGetUseCase
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
  @ApiOperation({
    description:
      'Retrieves a single article owned by the authenticated user by its ID. Returns full article data including content, metadata, and draft information.',
    summary: 'Get my article by ID',
  })
  @ApiResponse({
    description: 'User article retrieved successfully',
    status: 200,
    type: GetOneArticleResponseDto,
  })
  @ApiResponse({
    description: 'Article not found or access denied',
    status: 404,
  })
  async getOne(@ReqCtx() reqCtx: RequestContext, @Param('id') id: string): Promise<GetOneArticleResponseDto> {
    const pipeline: Effect.Effect<GetOneArticleResponseDto, ExclusionReason> = this.myArticleGetUseCase
      .execute(reqCtx, id)
      .pipe(
        Effect.flatMap((article) => GetOneArticleResponseDto.fromModel(article)),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }

  @Post()
  @ApiOperation({
    description:
      'Creates a new article owned by the authenticated user. The article is created as a draft by default. Returns the created article with full details.',
    summary: 'Create a new article',
  })
  @ApiResponse({
    description: 'Article created successfully',
    status: 201,
    type: GetOneArticleResponseDto,
  })
  @ApiResponse({
    description: 'Validation error or access denied',
    status: 400,
  })
  async create(
    @ReqCtx() reqCtx: RequestContext,
    @Body(new ZodValidationPipe(articleUpsertBodySchema))
    body: zod.infer<typeof articleUpsertBodySchema>
  ): Promise<GetOneArticleResponseDto> {
    const pipeline: Effect.Effect<GetOneArticleResponseDto, ExclusionReason> = this.myArticleCreateUseCase
      .execute(reqCtx, body)
      .pipe(
        Effect.flatMap((articleModel) => GetOneArticleResponseDto.fromModel(articleModel)),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }

  @Patch(':id')
  @ApiOperation({
    description:
      'Updates an existing article owned by the authenticated user. Only the provided fields will be updated. Returns the updated article with full details.',
    summary: 'Update my article',
  })
  @ApiResponse({
    description: 'Article updated successfully',
    status: 200,
    type: GetOneArticleResponseDto,
  })
  @ApiResponse({
    description: 'Article not found, validation error, or access denied',
    status: 404,
  })
  async update(
    @ReqCtx() reqCtx: RequestContext,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(articleUpsertBodySchema))
    body: zod.infer<typeof articleUpsertBodySchema>
  ): Promise<GetOneArticleResponseDto> {
    const pipeline: Effect.Effect<GetOneArticleResponseDto, ExclusionReason> = this.myArticleUpdateUseCase
      .execute(reqCtx, id, body)
      .pipe(
        Effect.flatMap((articleModel) => GetOneArticleResponseDto.fromModel(articleModel)),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }

  @Patch(':id/publish')
  @ApiOperation({
    description:
      'Publishes a draft article owned by the authenticated user. The article becomes publicly visible and gets a published timestamp. Returns the published article.',
    summary: 'Publish my article',
  })
  @ApiResponse({
    description: 'Article published successfully',
    status: 200,
    type: GetOneArticleResponseDto,
  })
  @ApiResponse({
    description: 'Article not found, already published, or access denied',
    status: 404,
  })
  async publish(@ReqCtx() reqCtx: RequestContext, @Param('id') id: string): Promise<GetOneArticleResponseDto> {
    const pipeline: Effect.Effect<GetOneArticleResponseDto, ExclusionReason> = this.myArticlePublishUseCase
      .execute(reqCtx, id)
      .pipe(
        Effect.flatMap((article) => GetOneArticleResponseDto.fromModel(article)),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }

  @Patch(':id/unpublish')
  @ApiOperation({
    description:
      'Unpublishes a published article owned by the authenticated user. The article becomes a draft and is no longer publicly visible. Returns the unpublished article.',
    summary: 'Unpublish my article',
  })
  @ApiResponse({
    description: 'Article unpublished successfully',
    status: 200,
    type: GetOneArticleResponseDto,
  })
  @ApiResponse({
    description: 'Article not found, already unpublished, or access denied',
    status: 404,
  })
  async unpublish(@ReqCtx() reqCtx: RequestContext, @Param('id') id: string): Promise<GetOneArticleResponseDto> {
    const pipeline: Effect.Effect<GetOneArticleResponseDto, ExclusionReason> = this.myArticleUnpublishUseCase
      .execute(reqCtx, id)
      .pipe(
        Effect.flatMap((article) => GetOneArticleResponseDto.fromModel(article)),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }
}
