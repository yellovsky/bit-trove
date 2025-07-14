import { Controller, Get, HttpStatus, Inject, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Effect } from 'effect';
import type * as zod from 'zod';

import { articleGetQuerySchema, shortArticlesGetQuerySchema } from '@repo/api-models';

import { Public } from 'src/shared/decorators/public';
import { ListResponsePaginationDto } from 'src/shared/dto/list-response-pagination.dto';
import { ExclusionReason, UnknownReason } from 'src/shared/excluded';
import { ReqCtx, type RequestContext } from 'src/shared/utils/request-context';
import { ZodValidationPipe } from 'src/shared/utils/zod-validation-pipe';

import { ArticleGetUseCase } from '../application/use-cases/article-get.use-case';
import { CMSArticlesCheckSlugAvailabilityUseCase } from '../application/use-cases/cms-articles-check-slug-availability.use-case';
import { MyArticleUpdateUseCase } from '../application/use-cases/my-article-update.use-case';
import { RelatedArticlesGetUseCase } from '../application/use-cases/related-articles-get.use-case';
import { ShortArticlesGetUseCase } from '../application/use-cases/short-articles-get.use-case';
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
    @Inject(MyArticleUpdateUseCase)
    private readonly articleUpdateUseCase: MyArticleUpdateUseCase,

    @Inject(ArticleGetUseCase)
    private readonly articleGetUseCase: ArticleGetUseCase,

    @Inject(ShortArticlesGetUseCase)
    private readonly shortArticlesGetUseCase: ShortArticlesGetUseCase,

    @Inject(CMSArticlesCheckSlugAvailabilityUseCase)
    private readonly checkArticleSlugAvailabilityUseCase: CMSArticlesCheckSlugAvailabilityUseCase,

    @Inject(RelatedArticlesGetUseCase)
    private readonly relatedArticlesGetUseCase: RelatedArticlesGetUseCase
  ) {}

  @Get()
  @Public()
  @ApiOperation({
    description:
      'Retrieves a paginated list of published articles. Supports filtering by type, language, tags, and search terms. Returns short article data suitable for listing pages.',
    summary: 'Get published articles',
  })
  @ApiResponse({
    description: 'List of published articles retrieved successfully',
    status: 200,
    type: GetManyArticlesResponseDto,
  })
  async getShortArticles(
    @ReqCtx() reqCtx: RequestContext,
    @Query(new ZodValidationPipe(shortArticlesGetQuerySchema))
    query: zod.infer<typeof shortArticlesGetQuerySchema>
  ): Promise<GetManyArticlesResponseDto> {
    const pipeline: Effect.Effect<GetManyArticlesResponseDto, ExclusionReason> = this.shortArticlesGetUseCase
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
  @ApiOperation({
    description:
      'Retrieves a single published article by its slug or ID. Returns full article data including content, metadata, and related information. Supports optional include parameters for additional data.',
    summary: 'Get article by slug or ID',
  })
  @ApiResponse({
    description: 'Article retrieved successfully',
    status: 200,
    type: GetOneArticleResponseDto,
  })
  @ApiResponse({
    description: 'Article not found',
    status: 404,
  })
  async getOne(
    @ReqCtx() reqCtx: RequestContext,
    @Param('slugOrId') slugOrId: string,
    @Query(new ZodValidationPipe(articleGetQuerySchema))
    query: zod.infer<typeof articleGetQuerySchema>
  ): Promise<GetOneArticleResponseDto> {
    const pipeline: Effect.Effect<GetOneArticleResponseDto, ExclusionReason> = this.articleGetUseCase
      .execute(reqCtx, slugOrId, query)
      .pipe(
        Effect.flatMap((articleModel) => GetOneArticleResponseDto.fromModel(articleModel)),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }

  @Get('/:id/related')
  @Public()
  @ApiOperation({
    description:
      'Retrieves a list of articles related to the specified article. Supports bidirectional relationships and different relation types (related, furtherReading). Returns articles with relation context and direction information.',
    summary: 'Get related articles',
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
    const pipeline: Effect.Effect<GetRelatedArticlesResponseDto, ExclusionReason> = this.relatedArticlesGetUseCase
      .execute(reqCtx, id)
      .pipe(
        Effect.flatMap((items) => GetRelatedArticlesResponseDto.fromModel(items)),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }

  @Get('check-slug-availability/:slug')
  @ApiOperation({
    description:
      'Checks if a given slug is available for use when creating or updating an article. Returns availability status and information about who currently owns the slug if it is taken.',
    summary: 'Check article slug availability',
  })
  @ApiResponse({
    description: 'Slug availability check completed',
    status: 200,
    type: CheckArticleSlugAvailabilityResponseDto,
  })
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
}
