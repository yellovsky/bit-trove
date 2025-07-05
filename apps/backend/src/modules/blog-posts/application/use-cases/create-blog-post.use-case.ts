import { Inject, Injectable, Logger } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { UpsertBlogPostBody } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { BlogPostModel } from '../../domain/models/blog-post.model';
import { BLOG_POSTS_REPOSITORY } from '../../domain/repositories/blog-posts.repository';
import { BLOG_POST_ACCESS_SRV } from '../services/blog-post-access.service.interface';

@Injectable()
export class CreateBlogPostUseCase {
  #logger = new Logger(CreateBlogPostUseCase.name);

  constructor(
    @Inject(BLOG_POSTS_REPOSITORY)
    private readonly repository: IdentifierOf<typeof BLOG_POSTS_REPOSITORY>,

    @Inject(BLOG_POST_ACCESS_SRV)
    private readonly accessSrv: IdentifierOf<typeof BLOG_POST_ACCESS_SRV>
  ) {}

  execute(
    reqCtx: RequestContext,
    body: UpsertBlogPostBody
  ): Effect.Effect<BlogPostModel, ExclusionReason | UnknownException> {
    this.#logger.debug('Creating blog post');
    this.#logger.debug(`  > body: ${JSON.stringify(body)}`);

    return this.accessSrv.canCreateBlogPost(reqCtx).pipe(
      Effect.flatMap(() =>
        this.repository.createBlogPost(reqCtx, {
          contentJSON: body.contentJSON,
          entryId: body.entryId,
          languageCode: body.languageCode,
          published: body.published,
          seoDescription: body.seoDescription,
          seoKeywords: body.seoKeywords,
          seoTitle: body.seoTitle,
          shortDescription: body.shortDescription,
          slug: body.slug,
          tags: body.tags,
          title: body.title,
        })
      )
    );
  }
}
