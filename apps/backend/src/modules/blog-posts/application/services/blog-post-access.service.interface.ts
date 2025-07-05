import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ExclusionReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { BlogPostModel } from '../../domain/models/blog-post.model';

export interface BlogPostAccessService {
  filterCanReadBlogPost(
    reqCtx: RequestContext,
    blogPost: BlogPostModel
  ): Effect.Effect<BlogPostModel, ExclusionReason | UnknownException>;

  filterCanReadBlogPostList(
    reqCtx: RequestContext,
    blogPosts: BlogPostModel[]
  ): Effect.Effect<Array<BlogPostModel | ExclusionReason>, UnknownException>;

  canCreateBlogPost(reqCtx: RequestContext): Effect.Effect<true, ExclusionReason | UnknownException>;
  canUpdateBlogPost(
    reqCtx: RequestContext,
    blogPost: BlogPostModel
  ): Effect.Effect<true, ExclusionReason | UnknownException>;
}

export const BLOG_POST_ACCESS_SRV = 'BLOG_POST_ACCESS_SRV' as InjectableIdentifier<BlogPostAccessService>;
