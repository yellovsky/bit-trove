import { Body, Controller, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Effect } from 'effect';
import type * as zod from 'zod';

import {
  createBlogPostBodySchema,
  getManyBlogPostsQuerySchema,
  getOneBlogPostQuerySchema,
  updateBlogPostBodySchema,
} from '@repo/api-models';

import { Public } from 'src/shared/decorators/public';
import { ListResponsePaginationDto } from 'src/shared/dto/list-response-pagination.dto';
import { ExclusionReason, UnknownReason } from 'src/shared/excluded';
import { ReqCtx, type RequestContext } from 'src/shared/utils/request-context';
import { ZodValidationPipe } from 'src/shared/utils/zod-validation-pipe';

import { CheckBlogPostSlugAvailabilityUseCase } from '../application/use-cases/check-blog-post-slug-availability.use-case';
import { CreateBlogPostUseCase } from '../application/use-cases/create-blog-post.use-case';
import { GetManyBlogPosstUseCase } from '../application/use-cases/get-many-blog-posts.use-case';
import { GetOneBlogPostUseCase } from '../application/use-cases/get-one-blog-post.use-case';
import { UpdateBlogPostUseCase } from '../application/use-cases/update-blog-post.use-case';
import { LocalizedShortBlogPostModel } from '../domain/models/localized-short-blog-post.model';
import {
  BlogPostSlugAvailabilityDto,
  CheckBlogPostSlugAvailabilityResponseDto,
} from './dtos/blog-post-slug-availability-response.dto';
import { GetManyBlogPostsResponseDto } from './dtos/get-many-blog-posts-reponse.dto';
import { GetOneBlogPostResponseDto } from './dtos/get-one-blog-post-reponse.dto';

@ApiTags('Blog Posts')
@Controller({ path: 'blog-posts', version: '1' })
export class BlogPostController {
  constructor(
    @Inject(CreateBlogPostUseCase)
    private readonly createBlogPostUseCase: CreateBlogPostUseCase,

    @Inject(UpdateBlogPostUseCase)
    private readonly updateBlogPostUseCase: UpdateBlogPostUseCase,

    @Inject(GetOneBlogPostUseCase)
    private readonly getOneBlogPostUseCase: GetOneBlogPostUseCase,

    @Inject(GetManyBlogPosstUseCase)
    private readonly getManyBlogPosstUseCase: GetManyBlogPosstUseCase,

    @Inject(CheckBlogPostSlugAvailabilityUseCase)
    private readonly checkBlogPostSlugAvailabilityUseCase: CheckBlogPostSlugAvailabilityUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a blog post' })
  @ApiResponse({ description: 'Returns the created blog post', status: 200 })
  async create(
    @ReqCtx() reqCtx: RequestContext,
    @Body(new ZodValidationPipe(createBlogPostBodySchema))
    body: zod.infer<typeof createBlogPostBodySchema>
  ): Promise<GetOneBlogPostResponseDto> {
    const pipeline: Effect.Effect<GetOneBlogPostResponseDto, ExclusionReason> = this.createBlogPostUseCase
      .execute(reqCtx, body)
      .pipe(
        Effect.map((blogPostModel) => GetOneBlogPostResponseDto.fromModel(blogPostModel)),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a blog post' })
  @ApiResponse({ description: 'Returns the updated blog post', status: 200 })
  async update(
    @ReqCtx() reqCtx: RequestContext,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateBlogPostBodySchema))
    body: zod.infer<typeof updateBlogPostBodySchema>
  ): Promise<GetOneBlogPostResponseDto> {
    const pipeline: Effect.Effect<GetOneBlogPostResponseDto, ExclusionReason> = this.updateBlogPostUseCase
      .execute(reqCtx, id, body)
      .pipe(
        Effect.map((blogPostModel) => GetOneBlogPostResponseDto.fromModel(blogPostModel)),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }

  @Get('check-slug-availability/:slug')
  @ApiOperation({ summary: 'Check if a blog post slug is available' })
  @ApiResponse({ description: 'Returns the availability of the blog post slug', status: 200 })
  async checkSlugAvailability(
    @ReqCtx() reqCtx: RequestContext,
    @Param('slug') slug: string
  ): Promise<CheckBlogPostSlugAvailabilityResponseDto> {
    const pipeline: Effect.Effect<CheckBlogPostSlugAvailabilityResponseDto, ExclusionReason> =
      this.checkBlogPostSlugAvailabilityUseCase.execute(reqCtx, slug).pipe(
        Effect.map((takenBy) => {
          return new CheckBlogPostSlugAvailabilityResponseDto({
            data: new BlogPostSlugAvailabilityDto(takenBy ? { available: false, takenBy } : { available: true }),
          });
        }),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get many blog posts' })
  @ApiResponse({ description: 'Returns the blog posts', status: 200 })
  async getMany(
    @ReqCtx() reqCtx: RequestContext,
    @Query(new ZodValidationPipe(getManyBlogPostsQuerySchema))
    query: zod.infer<typeof getManyBlogPostsQuerySchema>
  ): Promise<GetManyBlogPostsResponseDto> {
    const pipeline: Effect.Effect<GetManyBlogPostsResponseDto, ExclusionReason> = this.getManyBlogPosstUseCase
      .execute(reqCtx, query)
      .pipe(
        Effect.map(({ items, total }) => {
          const filtered: LocalizedShortBlogPostModel[] = [];
          const skipped: number[] = [];

          items.forEach((item, index) => {
            if (item instanceof LocalizedShortBlogPostModel) filtered.push(item);
            else skipped.push(index);
          });

          return GetManyBlogPostsResponseDto.fromModel(
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
  @ApiOperation({ summary: 'Get a blog post by slug or ID' })
  @ApiResponse({ description: 'Returns the blog post', status: 200 })
  async getOne(
    @ReqCtx() reqCtx: RequestContext,
    @Param('slugOrId') slugOrId: string,
    @Query(new ZodValidationPipe(getOneBlogPostQuerySchema))
    query: zod.infer<typeof getOneBlogPostQuerySchema>
  ): Promise<GetOneBlogPostResponseDto> {
    const pipeline: Effect.Effect<GetOneBlogPostResponseDto, ExclusionReason> = this.getOneBlogPostUseCase
      .execute(reqCtx, slugOrId, query)
      .pipe(
        Effect.map((blogPostModel) => GetOneBlogPostResponseDto.fromModel(blogPostModel)),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }
}
