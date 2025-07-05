import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Effect } from 'effect';
import type * as zod from 'zod';

import { getManyBlogPostsQuerySchema } from '@repo/api-models';

import { ListResponsePaginationDto } from 'src/shared/dto/list-response-pagination.dto';
import { ExclusionReason, UnknownReason } from 'src/shared/excluded';
import { ReqCtx, type RequestContext } from 'src/shared/utils/request-context';
import { ZodValidationPipe } from 'src/shared/utils/zod-validation-pipe';

import { GetMyBlogPostUseCase } from '../application/use-cases/get-my-blog-post.use-case';
import { GetMyManyBlogPostsUseCase } from '../application/use-cases/get-my-many-blog-posts.use-case';
import { BlogPostModel } from '../domain/models/blog-post.model';
import { GetManyBlogPostsResponseDto } from './dtos/get-many-blog-posts-reponse.dto';
import { GetOneBlogPostResponseDto } from './dtos/get-one-blog-post-reponse.dto';

@ApiTags('Blog Posts')
@Controller({ path: 'my/blog-posts', version: '1' })
export class MyBlogPostsController {
  constructor(
    @Inject(GetMyManyBlogPostsUseCase)
    private readonly getMyManyBlogPostsUseCase: GetMyManyBlogPostsUseCase,

    @Inject(GetMyBlogPostUseCase)
    private readonly getMyBlogPostUseCase: GetMyBlogPostUseCase
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get my blog posts' })
  @ApiResponse({ description: 'Returns the blog posts', status: 200 })
  async getMany(
    @ReqCtx() reqCtx: RequestContext,
    @Query(new ZodValidationPipe(getManyBlogPostsQuerySchema))
    query: zod.infer<typeof getManyBlogPostsQuerySchema>
  ): Promise<GetManyBlogPostsResponseDto> {
    const pipeline: Effect.Effect<GetManyBlogPostsResponseDto, ExclusionReason> = this.getMyManyBlogPostsUseCase
      .execute(reqCtx, query)
      .pipe(
        Effect.flatMap(({ items, total }) => {
          const filtered: BlogPostModel[] = [];
          const skipped: number[] = [];

          items.forEach((item, index) => {
            if (item instanceof BlogPostModel) filtered.push(item);
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

  @Get(':id')
  @ApiOperation({ summary: 'Get my blog posts' })
  @ApiResponse({ description: 'Returns the blog posts', status: 200 })
  async getOne(@ReqCtx() reqCtx: RequestContext, @Param('id') id: string): Promise<GetOneBlogPostResponseDto> {
    const pipeline: Effect.Effect<GetOneBlogPostResponseDto, ExclusionReason> = this.getMyBlogPostUseCase
      .execute(reqCtx, id)
      .pipe(
        Effect.flatMap((blogPost) => GetOneBlogPostResponseDto.fromModel(blogPost)),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }
}
