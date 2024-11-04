// global modules
import type { BlogPostResponse } from '@repo/api-models';
import { Controller, Get, Inject, Param } from '@nestjs/common';
import { Effect, LogLevel, Option } from 'effect';

// common modules
import { dbBlogPostSelect } from 'src/db-models/blog-post';
import { NotFoundAPIError } from 'src/exceptions';
import { Public } from 'src/modules/auth-jwt';
import { ReqContext } from 'src/request-context';
import type { RequestContext } from 'src/types/context';
import { BLOG_POST_SERVICE, type BlogPostService } from 'src/modules/blog-post';

import {
  BLOG_POST_PUBLISHER_SRV,
  type BlogPostPublisherService,
} from 'src/modules/blog-post-publisher';

import {
  BLOG_POST_ACCESS_CONTROL_SRV,
  type BlogPostAccessControlService,
} from 'src/modules/blog-post-access-control';

import {
  BLOG_POST_SERIALIZER_SRV,
  type BlogPostSerializerService,
} from 'src/modules/blog-post-serializer';

import {
  annotateLogs,
  RUNTIME_SRV,
  type RuntimeService,
} from 'src/modules/runtime';

@Controller({ path: 'blog-posts', version: '1' })
export class BlogPostsApiV1Controller {
  constructor(
    @Inject(RUNTIME_SRV) private readonly runtimeSrv: RuntimeService,
    @Inject(BLOG_POST_SERVICE) private readonly blogPostSrv: BlogPostService,

    @Inject(BLOG_POST_SERIALIZER_SRV)
    private readonly blogPostRerializerSrv: BlogPostSerializerService,

    @Inject(BLOG_POST_ACCESS_CONTROL_SRV)
    private readonly blogPostAccessControlSrv: BlogPostAccessControlService,

    @Inject(BLOG_POST_PUBLISHER_SRV)
    private readonly blogPostPublisherSrv: BlogPostPublisherService,
  ) {}

  @Public()
  @Get(':slugOrID')
  async getBlogPost(
    @ReqContext() reqCtx: RequestContext,
    @Param('slugOrID') slugOrID: string,
  ): Promise<BlogPostResponse> {
    const program = Effect.gen(this, function* () {
      yield* Effect.logDebug('slugOrID', slugOrID);

      const maybeResponse = yield* this.blogPostSrv
        .getOne(reqCtx, {
          published: true,
          select: dbBlogPostSelect,
          slugOrID,
        })
        .pipe(
          Effect.map(
            Option.flatMap((bp) =>
              this.blogPostAccessControlSrv.canReadBlogPost(reqCtx, bp),
            ),
          ),
          Effect.map(
            Option.flatMap((bp) =>
              this.blogPostPublisherSrv.checkBlogPost('published', bp),
            ),
          ),
          Effect.map(
            Option.flatMap((bp) =>
              this.blogPostRerializerSrv.serializeBlogPostResponse(reqCtx, bp),
            ),
          ),
        );

      if (Option.isNone(maybeResponse)) {
        yield* Effect.logDebug('blogPost not found');
        return yield* new NotFoundAPIError({});
      }

      return maybeResponse.value;
    }).pipe(
      Effect.tapError(Effect.logError),
      annotateLogs(BlogPostsApiV1Controller, 'getBlogPost', LogLevel.Debug),
    );

    return this.runtimeSrv.runPromise(program);
  }
}
