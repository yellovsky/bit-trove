import { Inject } from '@nestjs/common';
import { Effect, pipe } from 'effect';
import type { UnknownException } from 'effect/Cause';

import { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { CASBIN_SRV } from 'src/modules/casbin';

import type { BlogPostModel } from '../../domain/models/blog-post.model';
import type { BlogPostAccessService } from './blog-post-access.service.interface';

export class BlogPostAccessServiceImpl implements BlogPostAccessService {
  constructor(
    @Inject(CASBIN_SRV)
    private readonly casbinSrv: IdentifierOf<typeof CASBIN_SRV>
  ) {}

  canCreateBlogPost(reqCtx: RequestContext): Effect.Effect<true, ExclusionReason | UnknownException> {
    return this.casbinSrv.checkRequestPermission(reqCtx, 'create', 'blog_post', {});
  }

  filterCanReadBlogPost(
    reqCtx: RequestContext,
    blogPost: BlogPostModel | BlogPostModel
  ): Effect.Effect<BlogPostModel | BlogPostModel, ExclusionReason | UnknownException> {
    return pipe(
      this.casbinSrv.checkRequestPermission(reqCtx, 'read', 'blog_post', blogPost),
      Effect.map(() => blogPost)
    );
  }

  filterCanReadBlogPostList(
    reqCtx: RequestContext,
    blogPosts: BlogPostModel[]
  ): Effect.Effect<Array<BlogPostModel | ExclusionReason>, UnknownException> {
    return Effect.all(
      blogPosts.map((blogPost) =>
        this.filterCanReadBlogPost(reqCtx, blogPost).pipe(
          Effect.catchAll((err) => (err instanceof ExclusionReason ? Effect.succeed(err) : Effect.fail(err)))
        )
      )
    );
  }

  canUpdateBlogPost(
    reqCtx: RequestContext,
    blogPost: BlogPostModel
  ): Effect.Effect<true, ExclusionReason | UnknownException> {
    return this.casbinSrv.checkRequestPermission(reqCtx, 'update', 'blog_post', blogPost);
  }
}
