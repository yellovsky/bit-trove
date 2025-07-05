import { Inject, Injectable } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import { AccessDeniedReason, type ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { BlogPostModel } from '../../domain/models/blog-post.model';
import { BLOG_POSTS_SRV } from '../services/blog-posts.service.interface';

@Injectable()
export class GetMyBlogPostUseCase {
  constructor(
    @Inject(BLOG_POSTS_SRV)
    private readonly blogPostsSrv: IdentifierOf<typeof BLOG_POSTS_SRV>
  ) {}

  execute(reqCtx: RequestContext, id: string): Effect.Effect<BlogPostModel, ExclusionReason | UnknownException> {
    const accountId = reqCtx.accountId;
    if (!accountId) return Effect.fail(new AccessDeniedReason());

    return this.blogPostsSrv.getBlogPostById(reqCtx, { authorId: accountId, id });
  }
}
