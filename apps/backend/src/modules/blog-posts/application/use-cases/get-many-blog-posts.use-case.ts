import { Inject, Injectable } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { GetManyBlogPostsQuery } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { sortToOrderBy } from '../../../../shared/utils/sort-to-order-by';
import type { BlogPostModel } from '../../domain/models/blog-post.model';
import { BLOG_POSTS_REPOSITORY, type FindManyBlogPostsParams } from '../../domain/repositories/blog-posts.repository';

@Injectable()
export class GetManyBlogPostsUseCase {
  constructor(
    @Inject(BLOG_POSTS_REPOSITORY)
    private readonly repository: IdentifierOf<typeof BLOG_POSTS_REPOSITORY>
  ) {}

  execute(
    reqCtx: RequestContext,
    query: GetManyBlogPostsQuery
  ): Effect.Effect<
    { items: Array<ExclusionReason | BlogPostModel>; total: number },
    ExclusionReason | UnknownException
  > {
    const params: FindManyBlogPostsParams = {
      filter: {
        languageCodeIn: query.filter?.languageCodeIn,
        published: true,
        search: query.search,
      },
      orderBy: sortToOrderBy(query.sort),
      skip: query.page.offset,
      take: query.page.limit,
    };

    return Effect.all({
      items: this.repository.findManyBlogPosts(reqCtx, params),
      total: this.repository.findTotalBlogPosts(reqCtx, params),
    });
  }
}
