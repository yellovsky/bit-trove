import { Inject, Injectable } from '@nestjs/common';
import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { BLOG_POST_REPOSITORY } from '../../domain/repositories/blog-post.repository';

@Injectable()
export class CheckBlogPostSlugAvailabilityUseCase {
  constructor(
    @Inject(BLOG_POST_REPOSITORY)
    private readonly repository: IdentifierOf<typeof BLOG_POST_REPOSITORY>
  ) {}

  execute(reqCtx: RequestContext, slug: string): Effect.Effect<string | null, UnknownException> {
    return this.repository.getBlogPostIdBySlug(reqCtx, slug);
  }
}
