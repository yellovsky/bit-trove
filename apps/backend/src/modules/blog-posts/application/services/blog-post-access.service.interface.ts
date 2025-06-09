import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ExclusionReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { LocalizedBlogPostModel } from '../../domain/models/localized-blog-post.model';
import type { LocalizedShortBlogPostModel } from '../../domain/models/localized-short-blog-post.model';

export interface BlogPostAccessService {
  filterCanReadLocalizedBlogPost(
    reqCtx: RequestContext,
    blogPost: LocalizedBlogPostModel
  ): Effect.Effect<LocalizedBlogPostModel, ExclusionReason | UnknownException>;

  filterCanReadShortLocalizedBlogPost(
    reqCtx: RequestContext,
    blogPost: LocalizedShortBlogPostModel
  ): Effect.Effect<LocalizedShortBlogPostModel, ExclusionReason | UnknownException>;

  filterCanReadLocalizedShortBlogPostList(
    reqCtx: RequestContext,
    blogPosts: LocalizedShortBlogPostModel[]
  ): Effect.Effect<Array<LocalizedShortBlogPostModel | ExclusionReason>, UnknownException>;
}

export const BLOG_POST_ACCESS_SRV = 'BLOG_POST_ACCESS_SRV' as InjectableIdentifier<BlogPostAccessService>;
