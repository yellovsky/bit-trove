// global modules
import { Effect } from 'effect';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Inject, Param, Query } from '@nestjs/common';

// common modules
import { ApiCommonErrorResponses } from 'src/utils/swagger';
import { Public } from 'src/modules/auth-jwt';
import { ReqContext } from 'src/request-context';
import type { RequestContext } from 'src/types/context';
import {
  BlogPostListResponseEntity,
  BlogPostResponseEntity,
} from 'src/entities/blog-post';
import { RUNTIME_SRV, type RuntimeService } from 'src/modules/runtime';

import {
  BLOG_POST_SERIALIZER_SRV,
  BLOG_POST_SRV,
  type BlogPostSerializerService,
  type BlogPostService,
} from 'src/modules/blog-post';

// local modules
import { FindManyBlogPostsDTO } from './dto/find-many.dto';

@ApiTags('Blogpost')
@Controller({ path: 'blog-posts', version: '1' })
export class BlogPostsApiV1Controller {
  constructor(
    @Inject(RUNTIME_SRV)
    private readonly runtimeSrv: RuntimeService,

    @Inject(BLOG_POST_SRV)
    private readonly blogPostSrv: BlogPostService,

    @Inject(BLOG_POST_SERIALIZER_SRV)
    private readonly blogPostRerializerSrv: BlogPostSerializerService,
  ) {}

  @ApiOperation({ description: 'Get one blog posts' })
  @ApiOkResponse({ type: BlogPostListResponseEntity })
  @ApiCommonErrorResponses('bad_request')
  @Get()
  @Public()
  async getBlogPostList(
    @ReqContext() reqCtx: RequestContext,
    @Query() query: FindManyBlogPostsDTO,
  ): Promise<BlogPostListResponseEntity> {
    const program = Effect.gen(this, function* () {
      yield* Effect.logDebug('query', query);

      const founded = yield* this.blogPostSrv.getMany(reqCtx, {
        ...query,
        publishingFilter: 'published',
      });

      return yield* this.blogPostRerializerSrv.serializeBlogPostListResponse(
        reqCtx,
        { ...founded, ...query.page },
      );
    });

    return this.runtimeSrv.runPromise(program);
  }

  @ApiOperation({ description: 'Get blog posts list' })
  @ApiOkResponse({ type: BlogPostResponseEntity })
  @ApiCommonErrorResponses('not_found')
  @Public()
  @Get(':slugOrID')
  async getBlogPost(
    @ReqContext() reqCtx: RequestContext,
    @Param('slugOrID') slugOrID: string,
  ): Promise<BlogPostResponseEntity> {
    const program = Effect.gen(this, function* () {
      const founded = yield* this.blogPostSrv.getOne(reqCtx, {
        publishingFilter: 'published',
        slugOrID,
      });

      return yield* this.blogPostRerializerSrv.serializeBlogPostResponse(
        reqCtx,
        founded,
      );
    });

    return this.runtimeSrv.runPromise(program);
  }
}
