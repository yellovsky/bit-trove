import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Effect } from 'effect';

import { ExclusionReason, UnknownReason } from 'src/shared/excluded';
import { ReqCtx, type RequestContext } from 'src/shared/utils/request-context';

import { GetMyBlogPostUseCase } from '../application/use-cases/get-my-blog-post.use-case';
import { GetOneBlogPostResponseDto } from './dtos/get-one-blog-post-reponse.dto';

@ApiTags('My Blog Posts')
@Controller({ path: 'my/blog-posts', version: '1' })
export class MyBlogPostsController {
  constructor(
    @Inject(GetMyBlogPostUseCase)
    private readonly getMyBlogPostUseCase: GetMyBlogPostUseCase
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get my blog post' })
  @ApiResponse({ description: 'Returns the blog post', status: 200 })
  async getOne(@ReqCtx() reqCtx: RequestContext, @Param('id') id: string): Promise<GetOneBlogPostResponseDto> {
    const pipeline: Effect.Effect<GetOneBlogPostResponseDto, ExclusionReason> = this.getMyBlogPostUseCase
      .execute(reqCtx, id)
      .pipe(
        Effect.map((blogPost) => GetOneBlogPostResponseDto.fromModel(blogPost)),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }
}
