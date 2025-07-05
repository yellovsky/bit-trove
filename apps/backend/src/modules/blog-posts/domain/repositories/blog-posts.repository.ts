import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { JSONContent } from '@repo/api-models';

import type { ExclusionReason, UnknownReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';
import type { OrderBy } from 'src/shared/utils/sort-to-order-by';

import type { BlogPostModel } from '../models/blog-post.model';

export interface CreateBlogPostParams {
  contentJSON: JSONContent | null;
  languageCode: string;
  published: boolean;
  shortDescription: string | null;
  slug: string;
  title: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  entryId: string | null;
  tags: string[];
}
export type UpdateBlogPostParams = CreateBlogPostParams;
type FindManyBlogPostsOrderBy = OrderBy<'title' | 'publishedAt' | 'createdAt'>;

interface FindManyBlogPostsFilter {
  published?: boolean;
  authorId?: string | null;
  languageCodeIn?: string[];
}

export interface FindManyBlogPostsParams {
  take: number;
  skip: number;
  orderBy: FindManyBlogPostsOrderBy;
  filter: FindManyBlogPostsFilter;
}

export interface FindBySlugParams {
  slug: string;
  published?: boolean;
}

export interface FindByIdParams {
  id: string;
  authorId?: string;
  published?: boolean;
}

export interface BlogPostsRepository {
  createBlogPost(
    reqCtx: RequestContext,
    params: CreateBlogPostParams
  ): Effect.Effect<BlogPostModel, UnknownReason | UnknownException>;

  updateBlogPost(
    reqCtx: RequestContext,
    id: string,
    params: UpdateBlogPostParams
  ): Effect.Effect<BlogPostModel, UnknownReason | UnknownException>;

  getBlogPostIdBySlug(reqCtx: RequestContext, slug: string): Effect.Effect<string | null, UnknownException>;

  findManyBlogPosts(
    reqCtx: RequestContext,
    params: FindManyBlogPostsParams
  ): Effect.Effect<BlogPostModel[], ExclusionReason | UnknownException>;

  findTotalBlogPosts(reqCtx: RequestContext, params: FindManyBlogPostsParams): Effect.Effect<number, UnknownException>;

  findOneBlogPostById(
    reqCtx: RequestContext,
    params: FindByIdParams
  ): Effect.Effect<BlogPostModel, ExclusionReason | UnknownException>;

  findOneBlogPostBySlug(
    reqCtx: RequestContext,
    params: FindBySlugParams
  ): Effect.Effect<BlogPostModel, ExclusionReason | UnknownException>;

  setBlogPostPublished(
    reqCtx: RequestContext,
    id: string,
    published: boolean
  ): Effect.Effect<BlogPostModel, ExclusionReason | UnknownException>;
}

export const BLOG_POSTS_REPOSITORY = 'BLOG_POSTS_REPOSITORY' as InjectableIdentifier<BlogPostsRepository>;
