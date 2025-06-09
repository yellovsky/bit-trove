import { Inject, Injectable } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';
import { validate as isUUID } from 'uuid';

import type { GetOneBlogPostQuery } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { LocalizedBlogPostModel } from '../../domain/models/localized-blog-post.model';
import { BLOG_POST_REPOSITORY } from '../../domain/repositories/blog-post.repository';
import { BLOG_POST_ACCESS_SRV } from '../services/blog-post-access.service.interface';

@Injectable()
export class GetOneBlogPostUseCase {
  constructor(
    @Inject(BLOG_POST_REPOSITORY)
    private readonly repository: IdentifierOf<typeof BLOG_POST_REPOSITORY>,

    @Inject(BLOG_POST_ACCESS_SRV)
    private readonly accessSrv: IdentifierOf<typeof BLOG_POST_ACCESS_SRV>
  ) {}

  execute(
    reqCtx: RequestContext,
    slugOrId: string,
    query: GetOneBlogPostQuery
  ): Effect.Effect<LocalizedBlogPostModel, ExclusionReason | UnknownException> {
    const blogPost = isUUID(slugOrId)
      ? this.repository.findOneLocalizedById(reqCtx, slugOrId)
      : this.repository.findOneLocalizedBySlug(reqCtx, { languageCode: query.locale, slug: slugOrId });

    return blogPost
      .pipe(Effect.flatMap((blogPost) => blogPost.filterPublished()))
      .pipe(Effect.flatMap((blogPost) => this.accessSrv.filterCanReadLocalizedBlogPost(reqCtx, blogPost)));
  }
}
