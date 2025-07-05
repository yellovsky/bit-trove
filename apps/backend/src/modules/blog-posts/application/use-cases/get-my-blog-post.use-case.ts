import { Inject, Injectable } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import { AccessDeniedReason, type ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { LocalizedBlogPostModel } from '../../domain/models/localized-blog-post.model';
import { BLOG_POST_REPOSITORY } from '../../domain/repositories/blog-post.repository';
import { BLOG_POST_ACCESS_SRV } from '../services/blog-post-access.service.interface';

@Injectable()
export class GetMyBlogPostUseCase {
  constructor(
    @Inject(BLOG_POST_REPOSITORY)
    private readonly blogPostRepository: IdentifierOf<typeof BLOG_POST_REPOSITORY>,

    @Inject(BLOG_POST_ACCESS_SRV)
    private readonly blogPostAccessSrv: IdentifierOf<typeof BLOG_POST_ACCESS_SRV>
  ) {}

  execute(
    reqCtx: RequestContext,
    id: string
  ): Effect.Effect<LocalizedBlogPostModel, ExclusionReason | UnknownException> {
    const accountId = reqCtx.accountId;
    if (!accountId) return Effect.fail(new AccessDeniedReason());

    return Effect.gen(this, function* () {
      // Check authorization
      yield* this.blogPostAccessSrv.canReadMyBlogPost(reqCtx, id);

      // Get the blog post
      const blogPost = yield* this.blogPostRepository.findOneLocalizedByIdForAuthor(reqCtx, id, accountId);

      return blogPost;
    });
  }
}
