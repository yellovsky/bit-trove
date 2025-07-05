import { Inject, Injectable } from '@nestjs/common';
import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { BLOG_POSTS_REPOSITORY } from '../../domain/repositories/blog-posts.repository';

@Injectable()
export class CheckBlogPostSlugAvailabilityUseCase {
  constructor(
    @Inject(BLOG_POSTS_REPOSITORY)
    private readonly repository: IdentifierOf<typeof BLOG_POSTS_REPOSITORY>
  ) {}

  execute(reqCtx: RequestContext, slug: string): Effect.Effect<string | null, UnknownException> {
    return this.repository.getBlogPostIdBySlug(reqCtx, slug);
  }
}
