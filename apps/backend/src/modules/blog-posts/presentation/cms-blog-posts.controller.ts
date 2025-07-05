import { Controller, Inject, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Effect } from 'effect';

import { ExclusionReason, UnknownReason } from 'src/shared/excluded';
import { ReqCtx, type RequestContext } from 'src/shared/utils/request-context';

import { PublishBlogPostUseCase } from '../application/use-cases/publish-blog-post.use-case';
import { UnpublishBlogPostUseCase } from '../application/use-cases/unpublish-blog-post.use-case';
import { GetOneBlogPostResponseDto } from './dtos/get-one-blog-post-reponse.dto';

@ApiTags('CMS Blog Posts')
@Controller({ path: 'cms-blog-posts', version: '1' })
export class CMSBlogPostsController {
  constructor(
    @Inject(PublishBlogPostUseCase)
    private readonly publishBlogPostUseCase: PublishBlogPostUseCase,

    @Inject(UnpublishBlogPostUseCase)
    private readonly unpublishBlogPostUseCase: UnpublishBlogPostUseCase
  ) {}

  @Patch('publish/:id')
  @ApiOperation({ summary: 'Publish a blog post' })
  @ApiResponse({ description: 'Returns the published blog post', status: 200 })
  async publish(@ReqCtx() reqCtx: RequestContext, @Param('id') id: string): Promise<GetOneBlogPostResponseDto> {
    const pipeline: Effect.Effect<GetOneBlogPostResponseDto, ExclusionReason> = this.publishBlogPostUseCase
      .execute(reqCtx, id)
      .pipe(
        Effect.flatMap((blogPost) => GetOneBlogPostResponseDto.fromModel(blogPost)),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }

  @Patch('unpublish/:id')
  @ApiOperation({ summary: 'Unpublish a blog post' })
  @ApiResponse({ description: 'Returns the unpublished blog post', status: 200 })
  async unpublish(@ReqCtx() reqCtx: RequestContext, @Param('id') id: string): Promise<GetOneBlogPostResponseDto> {
    const pipeline: Effect.Effect<GetOneBlogPostResponseDto, ExclusionReason> = this.unpublishBlogPostUseCase
      .execute(reqCtx, id)
      .pipe(
        Effect.flatMap((blogPost) => GetOneBlogPostResponseDto.fromModel(blogPost)),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }
}
