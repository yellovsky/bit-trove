import { Body, Controller, Get, Inject, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Effect } from 'effect';
import type * as zod from 'zod';

import { createBlogPostBodySchema, getManyBlogPostsQuerySchema, getOneBlogPostQuerySchema } from '@repo/api-models';

import { Public } from 'src/shared/decorators/public';
import { ListResponsePaginationDto } from 'src/shared/dto/list-response-pagination.dto';
import { ExclusionReason, UnknownReason } from 'src/shared/excluded';
import { ReqCtx, type RequestContext } from 'src/shared/utils/request-context';
import { ZodValidationPipe } from 'src/shared/utils/zod-validation-pipe';

import { CreateBlogPostUseCase } from '../application/use-cases/create-blog-post.use-case';
import { GetManyBlogPosstUseCase } from '../application/use-cases/get-many-blog-posts.use-case';
import { GetOneBlogPostUseCase } from '../application/use-cases/get-one-blog-post.use-case';
import { LocalizedShortBlogPostModel } from '../domain/models/localized-short-blog-post.model';
import { GetManyBlogPostsResponseDto } from './dtos/get-many-blog-posts-reponse.dto';
import { GetOneBlogPostResponseDto } from './dtos/get-one-blog-post-reponse.dto';

@ApiTags('Blog Posts')
@Controller({ path: 'blog-posts', version: '1' })
export class BlogPostController {
  constructor(
    @Inject(CreateBlogPostUseCase)
    private readonly createBlogPostUseCase: CreateBlogPostUseCase,

    @Inject(GetOneBlogPostUseCase)
    private readonly getOneBlogPostUseCase: GetOneBlogPostUseCase,

    @Inject(GetManyBlogPosstUseCase)
    private readonly getManyBlogPosstUseCase: GetManyBlogPosstUseCase
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

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get a blog post by slug or ID' })
  @ApiResponse({ description: 'Returns the blog post', status: 200 })
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
