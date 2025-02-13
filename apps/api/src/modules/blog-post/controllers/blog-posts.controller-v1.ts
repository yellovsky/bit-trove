// global modules
import { Effect } from 'effect';
import type { Request } from 'express';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Inject, Param, Query, Req } from '@nestjs/common';

// common modules
import { ApiCommonErrorResponses } from 'src/utils/swagger';
import { Public } from 'src/utils/access-control';
import { RequestContextService } from 'src/modules/request-context';
import { RuntimeService } from 'src/modules/runtime';

// local modules
import { BlogPostListResponseEntity } from '../entities/blog-post-list-response.entity';
import { BlogPostResponseEntity } from '../entities/blog-post-response.entity';
import { BlogPostService } from '../services/blog-post.service';
import { FindManyBlogPostsDTO } from '../dto/find-many-blog-posts.dto';
import { serializeBlogPostListResponse } from '../serializers/blog-post-list-response.serializer';
import { serializeBlogPostResponse } from '../serializers/blog-post-response.serializer';

@ApiTags('Blogpost')
@Controller({ path: 'blog-posts', version: '1' })
export class BlogPostsV1Controller {
  constructor(
    @Inject()
    private readonly runtimeSrv: RuntimeService,

    @Inject()
    private readonly blogPostSrv: BlogPostService,

    @Inject()
    private readonly requestContextSrv: RequestContextService,
  ) {}

  @ApiOperation({ description: 'Get one blog posts' })
  @ApiOkResponse({ type: BlogPostListResponseEntity })
  @ApiCommonErrorResponses('bad_request')
  @Get()
  @Public()
  async getBlogPostList(
    @Req() req: Request,
    @Query() query: FindManyBlogPostsDTO,
  ): Promise<BlogPostListResponseEntity> {
    const program = Effect.gen(this, function* () {
      yield* Effect.logDebug('query', query);

      const reqCtx = yield* this.requestContextSrv.get(req);
      const founded = yield* this.blogPostSrv.getMany(reqCtx, {
        ...query,
        publishingFilter: 'published',
      });

      return yield* serializeBlogPostListResponse(reqCtx, {
        ...founded,
        ...query.page,
      });
    });

    return this.runtimeSrv.runPromise(program);
  }

  @ApiOperation({ description: 'Get blog posts list' })
  @ApiOkResponse({ type: BlogPostResponseEntity })
  @ApiCommonErrorResponses('not_found')
  @Public()
  @Get(':slugOrID')
  async getBlogPost(
    @Req() req: Request,
    @Param('slugOrID') slugOrID: string,
  ): Promise<BlogPostResponseEntity> {
    const program = Effect.gen(this, function* () {
      const reqCtx = yield* this.requestContextSrv.get(req);
      const founded = yield* this.blogPostSrv.getOne(reqCtx, {
        publishingFilter: 'published',
        slugOrID,
      });

      return yield* serializeBlogPostResponse(reqCtx, founded);
    });

    return this.runtimeSrv.runPromise(program);
  }
}
