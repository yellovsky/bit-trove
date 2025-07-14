import { Body, Controller, Get, HttpStatus, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Effect } from 'effect';
import type * as zod from 'zod';

import { articleGetQuerySchema, articleUpsertBodySchema, shortArticlesGetQuerySchema } from '@repo/api-models';

import { Public } from 'src/shared/decorators/public';
import { ListResponsePaginationDto } from 'src/shared/dto/list-response-pagination.dto';
import { ExclusionReason, UnknownReason } from 'src/shared/excluded';
import { ReqCtx, type RequestContext } from 'src/shared/utils/request-context';
import { ZodValidationPipe } from 'src/shared/utils/zod-validation-pipe';

import { CheckArticleSlugAvailabilityUseCase } from '../application/use-cases/check-article-slug-availability.use-case';
import { CreateArticleUseCase } from '../application/use-cases/create-article.use-case';
import { GetManyArticlesUseCase } from '../application/use-cases/get-many-articles.use-case';
import { GetOneArticleUseCase } from '../application/use-cases/get-one-article.use-case';
import { GetRelatedArticlesUseCase } from '../application/use-cases/get-related-articles.use-case';
import { UpdateArticleUseCase } from '../application/use-cases/update-article.use-case';
import { ArticleModel } from '../domain/models/article.model';
import {
  ArticleSlugAvailabilityDto,
  CheckArticleSlugAvailabilityResponseDto,
} from './dtos/article-slug-availability-response.dto';
import { GetManyArticlesResponseDto } from './dtos/get-many-articles-reponse.dto';
import { GetOneArticleResponseDto } from './dtos/get-one-article-reponse.dto';
import { GetRelatedArticlesResponseDto } from './dtos/get-related-articles-response.dto';

@ApiTags('Articles')
@Controller({ path: 'articles', version: '1' })
export class ArticlesController {
  constructor(
    @Inject(CreateArticleUseCase)
    private readonly createArticleUseCase: CreateArticleUseCase,

    @Inject(UpdateArticleUseCase)
    private readonly updateArticleUseCase: UpdateArticleUseCase,

    @Inject(GetOneArticleUseCase)
    private readonly getOneArticleUseCase: GetOneArticleUseCase,

    @Inject(GetManyArticlesUseCase)
    private readonly getManyArticlesUseCase: GetManyArticlesUseCase,

    @Inject(CheckArticleSlugAvailabilityUseCase)
    private readonly checkArticleSlugAvailabilityUseCase: CheckArticleSlugAvailabilityUseCase,

    @Inject(GetRelatedArticlesUseCase)
    private readonly getRelatedArticlesUseCase: GetRelatedArticlesUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create an article' })
  @ApiResponse({ description: 'Returns the created article', status: 200 })
  async create(
    @ReqCtx() reqCtx: RequestContext,
    @Body(new ZodValidationPipe(articleUpsertBodySchema))
    body: zod.infer<typeof articleUpsertBodySchema>
  ): Promise<GetOneArticleResponseDto> {
    const pipeline: Effect.Effect<GetOneArticleResponseDto, ExclusionReason> = this.createArticleUseCase
      .execute(reqCtx, body)
      .pipe(
        Effect.flatMap((articleModel) => GetOneArticleResponseDto.fromModel(articleModel)),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a article' })
  @ApiResponse({ description: 'Returns the updated article', status: 200 })
  async update(
    @ReqCtx() reqCtx: RequestContext,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(articleUpsertBodySchema))
    body: zod.infer<typeof articleUpsertBodySchema>
  ): Promise<GetOneArticleResponseDto> {
    const pipeline: Effect.Effect<GetOneArticleResponseDto, ExclusionReason> = this.updateArticleUseCase
      .execute(reqCtx, id, body)
      .pipe(
        Effect.flatMap((articleModel) => GetOneArticleResponseDto.fromModel(articleModel)),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }

  @Get('check-slug-availability/:slug')
  @ApiOperation({ summary: 'Check if a article slug is available' })
  @ApiResponse({ description: 'Returns the availability of the article slug', status: 200 })
  async checkSlugAvailability(
    @ReqCtx() reqCtx: RequestContext,
    @Param('slug') slug: string
  ): Promise<CheckArticleSlugAvailabilityResponseDto> {
    const pipeline: Effect.Effect<CheckArticleSlugAvailabilityResponseDto, ExclusionReason> =
      this.checkArticleSlugAvailabilityUseCase.execute(reqCtx, slug).pipe(
        Effect.map((takenBy) => {
          return new CheckArticleSlugAvailabilityResponseDto({
            data: new ArticleSlugAvailabilityDto(takenBy ? { available: false, takenBy } : { available: true }),
          });
        }),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get many articles' })
  @ApiResponse({ description: 'Returns the articles', status: 200 })
  async getMany(
    @ReqCtx() reqCtx: RequestContext,
    @Query(new ZodValidationPipe(shortArticlesGetQuerySchema))
    query: zod.infer<typeof shortArticlesGetQuerySchema>
  ): Promise<GetManyArticlesResponseDto> {
    const pipeline: Effect.Effect<GetManyArticlesResponseDto, ExclusionReason> = this.getManyArticlesUseCase
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

  @Get(':slugOrId')
  @Public()
  @ApiOperation({ summary: 'Get a article by slug or ID' })
  @ApiResponse({ description: 'Returns the article', status: 200 })
  async getOne(
    @ReqCtx() reqCtx: RequestContext,
    @Param('slugOrId') slugOrId: string,
    @Query(new ZodValidationPipe(articleGetQuerySchema))
    query: zod.infer<typeof articleGetQuerySchema>
  ): Promise<GetOneArticleResponseDto> {
    const pipeline: Effect.Effect<GetOneArticleResponseDto, ExclusionReason> = this.getOneArticleUseCase
      .execute(reqCtx, slugOrId, query)
      .pipe(
        Effect.flatMap((articleModel) => GetOneArticleResponseDto.fromModel(articleModel)),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }

  // REFACTORED
  @Get('/:id/related')
  @Public()
  @ApiOperation({
    description:
      'Retrieves paginated list of articles related to the specified article. Supports filtering by relation type and includes direction context.',
    summary: 'Get related articles for a specific article',
  })
  @ApiResponse({
    description: 'Related articles retrieved successfully',
    status: HttpStatus.OK,
    type: GetRelatedArticlesResponseDto,
  })
  @ApiResponse({
    description: 'Article not found',
    status: HttpStatus.NOT_FOUND,
  })
  async getRelatedArticles(
    @ReqCtx() reqCtx: RequestContext,
    @Param('id') id: string
  ): Promise<GetRelatedArticlesResponseDto> {
    const pipeline: Effect.Effect<GetRelatedArticlesResponseDto, ExclusionReason> = this.getRelatedArticlesUseCase
      .execute(reqCtx, id)
      .pipe(
        Effect.flatMap((items) => GetRelatedArticlesResponseDto.fromModel(items)),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }
}
