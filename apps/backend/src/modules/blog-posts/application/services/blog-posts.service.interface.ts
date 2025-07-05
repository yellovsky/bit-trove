import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { UpsertBlogPostBody } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';
import type { OrderBy } from 'src/shared/utils/sort-to-order-by';

import type { BlogPostModel } from '../../domain/models/blog-post.model';

export interface GetBlogPostByIdParams {
  id: string;
  authorId?: string;
  published?: boolean;
}

export interface GetBlogPostBySlugParams {
  slug: string;
  authorId?: string;
  published?: boolean;
}

export interface GetBlogPostBySlugOrIdParams {
  slugOrId: string;
  published?: boolean;
}

export interface GetManyBlogPostsParams {
  take: number;
  skip: number;
  orderBy: OrderBy<'title' | 'createdAt'>;

  filter: {
    published?: boolean;
    authorId?: string | null;
    languageCodeIn?: string[];
  };
}

export type CreateBlogPostParams = UpsertBlogPostBody;
export type UpdateBlogPostParams = UpsertBlogPostBody;

export interface BlogPostsService {
  getBlogPostById(
    reqCtx: RequestContext,
    params: GetBlogPostByIdParams
  ): Effect.Effect<BlogPostModel, ExclusionReason | UnknownException>;

  getBlogPostBySlug(
    reqCtx: RequestContext,
    params: GetBlogPostBySlugParams
  ): Effect.Effect<BlogPostModel, ExclusionReason | UnknownException>;

  getBlogPostBySlugOrId(
    reqCtx: RequestContext,
    params: GetBlogPostBySlugOrIdParams
  ): Effect.Effect<BlogPostModel, ExclusionReason | UnknownException>;

  getManyBlogPosts(
    reqCtx: RequestContext,
    params: GetManyBlogPostsParams
  ): Effect.Effect<Array<BlogPostModel | ExclusionReason>, ExclusionReason | UnknownException>;

  createBlogPost(
    reqCtx: RequestContext,
    body: CreateBlogPostParams
  ): Effect.Effect<BlogPostModel, ExclusionReason | UnknownException>;

  updateBlogPost(
    reqCtx: RequestContext,
    id: string,
    body: UpdateBlogPostParams
  ): Effect.Effect<BlogPostModel, ExclusionReason | UnknownException>;

  publishBlogPost(reqCtx: RequestContext, id: string): Effect.Effect<BlogPostModel, ExclusionReason | UnknownException>;
  unpublishBlogPost(
    reqCtx: RequestContext,
    id: string
  ): Effect.Effect<BlogPostModel, ExclusionReason | UnknownException>;
}

export const BLOG_POSTS_SRV = 'BLOG_POSTS_SRV' as InjectableIdentifier<BlogPostsService>;
