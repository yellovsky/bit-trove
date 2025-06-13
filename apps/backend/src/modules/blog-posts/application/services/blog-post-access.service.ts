import { Inject } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import { AccessDeniedReason, ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { CASBIN_SRV } from 'src/modules/casbin';

import type { LocalizedBlogPostModel } from '../../domain/models/localized-blog-post.model';
import type { LocalizedShortBlogPostModel } from '../../domain/models/localized-short-blog-post.model';
import type { BlogPostAccessService } from './blog-post-access.service.interface';

export class BlogPostAccessServiceImpl implements BlogPostAccessService {
  constructor(
    @Inject(CASBIN_SRV)
    private readonly casbinSrv: IdentifierOf<typeof CASBIN_SRV>
  ) {}

  filterCanReadLocalizedBlogPost(
    reqCtx: RequestContext,
    blogPost: LocalizedBlogPostModel
  ): Effect.Effect<LocalizedBlogPostModel, ExclusionReason | UnknownException> {
    return this.casbinSrv.checkRequestPermission(reqCtx, 'read', 'blog_post', blogPost).pipe(
      Effect.flatMap((canRead) => {
        return canRead ? Effect.succeed(blogPost) : Effect.fail(new AccessDeniedReason());
      })
    );
  }

  filterCanReadShortLocalizedBlogPost(
    reqCtx: RequestContext,
    blogPost: LocalizedShortBlogPostModel
  ): Effect.Effect<LocalizedShortBlogPostModel, ExclusionReason | UnknownException> {
    return this.casbinSrv
      .checkRequestPermission(reqCtx, 'read', 'blog_post', blogPost)
      .pipe(Effect.flatMap((canRead) => (canRead ? Effect.succeed(blogPost) : Effect.fail(new AccessDeniedReason()))));
  }

  filterCanReadLocalizedShortBlogPostList(
    reqCtx: RequestContext,
    blogPosts: LocalizedShortBlogPostModel[]
  ): Effect.Effect<Array<LocalizedShortBlogPostModel | ExclusionReason>, UnknownException> {
    return Effect.all(
      blogPosts.map((blogPost) =>
        this.filterCanReadShortLocalizedBlogPost(reqCtx, blogPost).pipe(
          Effect.catchAll((err) => (err instanceof ExclusionReason ? Effect.succeed(err) : Effect.fail(err)))
        )
      )
    );
  }
}
