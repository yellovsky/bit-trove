import { Inject, Injectable, Logger } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { UpdateBlogPostBody } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { LocalizedBlogPostModel } from '../../domain/models/localized-blog-post.model';
import { BLOG_POST_REPOSITORY } from '../../domain/repositories/blog-post.repository';
import { BLOG_POST_ACCESS_SRV } from '../services/blog-post-access.service.interface';

@Injectable()
export class UpdateBlogPostUseCase {
  #logger = new Logger(UpdateBlogPostUseCase.name);

  constructor(
    @Inject(BLOG_POST_REPOSITORY)
    private readonly repository: IdentifierOf<typeof BLOG_POST_REPOSITORY>,

    @Inject(BLOG_POST_ACCESS_SRV)
    private readonly accessSrv: IdentifierOf<typeof BLOG_POST_ACCESS_SRV>
  ) {}

  execute(
    reqCtx: RequestContext,
    id: string,
    body: UpdateBlogPostBody
  ): Effect.Effect<LocalizedBlogPostModel, ExclusionReason | UnknownException> {
    this.#logger.debug('Updating blog post');
    this.#logger.debug(`  > id: ${id}`);
    this.#logger.debug(`  > body: ${JSON.stringify(body)}`);

    return this.accessSrv.canUpdateBlogPost(reqCtx, id).pipe(
      Effect.flatMap(() =>
        this.repository.updateBlogPost(reqCtx, id, {
          contentJSON: body.contentJSON,
          languageCode: body.languageCode,
          published: body.published,
          seoDescription: body.seoDescription,
          seoKeywords: body.seoKeywords,
          seoTitle: body.seoTitle,
          shortDescription: body.shortDescription,
          slug: body.slug,
          title: body.title,
        })
      )
    );
  }
}
