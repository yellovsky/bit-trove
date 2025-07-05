import { Inject, Injectable, Logger } from '@nestjs/common';
import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { UpsertBlogPostBody } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { BlogPostModel } from '../../domain/models/blog-post.model';
import { BLOG_POSTS_REPOSITORY } from '../../domain/repositories/blog-posts.repository';

@Injectable()
export class UpdateBlogPostUseCase {
  #logger = new Logger(UpdateBlogPostUseCase.name);

  constructor(
    @Inject(BLOG_POSTS_REPOSITORY)
    private readonly repository: IdentifierOf<typeof BLOG_POSTS_REPOSITORY>
  ) {}

  execute(
    reqCtx: RequestContext,
    id: string,
    body: UpsertBlogPostBody
  ): Effect.Effect<BlogPostModel, ExclusionReason | UnknownException> {
    this.#logger.debug('Updating blog post');
    this.#logger.debug(`  > body: ${JSON.stringify(body)}`);
    return this.repository.updateBlogPost(reqCtx, id, body);
  }
}
