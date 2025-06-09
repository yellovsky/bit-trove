import { Inject, Injectable } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { GetManyBlogPostsQuery } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { sortToOrderBy } from '../../../../shared/utils/sort-to-order-by';
import type { LocalizedShortBlogPostModel } from '../../domain/models/localized-short-blog-post.model';
import { BLOG_POST_REPOSITORY, type FindManyBlogPostsParams } from '../../domain/repositories/blog-post.repository';
import { BLOG_POST_ACCESS_SRV } from '../services/blog-post-access.service.interface';

@Injectable()
export class GetManyBlogPosstUseCase {
  constructor(
    @Inject(BLOG_POST_REPOSITORY)
    private readonly repository: IdentifierOf<typeof BLOG_POST_REPOSITORY>,

    @Inject(BLOG_POST_ACCESS_SRV)
    private readonly accessSrv: IdentifierOf<typeof BLOG_POST_ACCESS_SRV>
  ) {}

  execute(
    reqCtx: RequestContext,
    query: GetManyBlogPostsQuery
  ): Effect.Effect<
    { items: Array<ExclusionReason | LocalizedShortBlogPostModel>; total: number },
    ExclusionReason | UnknownException
  > {
    const params: FindManyBlogPostsParams = {
      filter: {
        languageCodeIn: query.filter?.languageCodeIn,
        published: true,
      },
      orderBy: sortToOrderBy(query.sort),
      skip: query.page.offset,
      take: query.page.limit,
    };

    return Effect.all({
      items: this.repository
        .findManyLocalized(reqCtx, params)
        .pipe(Effect.flatMap((items) => this.accessSrv.filterCanReadLocalizedShortBlogPostList(reqCtx, items))),
      total: this.repository.findTotalLocalized(reqCtx, params),
    });
  }
}
