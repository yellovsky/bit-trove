import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ExclusionReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';
import type { OrderBy } from 'src/shared/utils/sort-to-order-by';

import type { LocalizedBlogPostModel } from '../models/localized-blog-post.model';
import type { LocalizedShortBlogPostModel } from '../models/localized-short-blog-post.model';

export interface FindBySlugParams {
  slug: string;
  languageCode: string;
}

export type FindManyBlogPostsOrderBy = OrderBy<'title' | 'publishedAt' | 'createdAt'>;

export interface FindManyBlogPostsFilter {
  published?: boolean;
  authorId?: string;
  languageCode?: string;
  languageCodeIn?: string[];
}

export interface FindManyBlogPostsParams {
  take: number;
  skip: number;
  orderBy: FindManyBlogPostsOrderBy;
  filter: FindManyBlogPostsFilter;
}

export interface BlogPostRepository {
  findOneLocalizedById(
    reqCtx: RequestContext,
    id: string
  ): Effect.Effect<LocalizedBlogPostModel, ExclusionReason | UnknownException>;

  findOneLocalizedBySlug(
    reqCtx: RequestContext,
    params: FindBySlugParams
  ): Effect.Effect<LocalizedBlogPostModel, ExclusionReason | UnknownException>;

  findManyLocalized(
    reqCtx: RequestContext,
    params: FindManyBlogPostsParams
  ): Effect.Effect<LocalizedShortBlogPostModel[], ExclusionReason | UnknownException>;

  findTotalLocalized(reqCtx: RequestContext, params: FindManyBlogPostsParams): Effect.Effect<number, UnknownException>;
}

export const BLOG_POST_REPOSITORY = 'BLOG_POST_REPOSITORY' as InjectableIdentifier<BlogPostRepository>;
