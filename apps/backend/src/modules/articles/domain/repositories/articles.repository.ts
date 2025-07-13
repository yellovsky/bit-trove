import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { JSONContent } from '@repo/api-models';

import type { ExclusionReason, UnknownReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';
import type { OrderBy } from 'src/shared/utils/sort-to-order-by';

import type { ArticleModel } from '../models/article.model';

export interface CreateArticleParams {
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
  type: 'blog_post' | 'shard';
}
export type UpdateArticleParams = CreateArticleParams;
type FindManyArticlesOrderBy = OrderBy<'title' | 'publishedAt' | 'createdAt'>;

interface FindManyArticlesFilter {
  published?: boolean;
  authorId?: string | null;
  languageCodeIn?: string[];
  search?: string;
  typeIn?: string[];
}

export interface FindManyArticlesParams {
  take: number;
  skip: number;
  orderBy: FindManyArticlesOrderBy;
  filter: FindManyArticlesFilter;
}

export interface FindBySlugParams {
  slug: string;
  filter?: {
    authorId?: string;
    published?: boolean;
    typeIn?: string[];
  };
}

export interface FindByIdParams {
  id: string;
  filter?: {
    authorId?: string;
    published?: boolean;
    typeIn?: string[];
  };
}

export interface ArticlesRepository {
  createArticle(
    reqCtx: RequestContext,
    params: CreateArticleParams
  ): Effect.Effect<ArticleModel, UnknownReason | UnknownException>;

  updateArticle(
    reqCtx: RequestContext,
    id: string,
    params: UpdateArticleParams
  ): Effect.Effect<ArticleModel, UnknownReason | UnknownException>;

  getArticleIdBySlug(reqCtx: RequestContext, slug: string): Effect.Effect<string | null, UnknownException>;

  findManyArticles(
    reqCtx: RequestContext,
    params: FindManyArticlesParams
  ): Effect.Effect<ArticleModel[], ExclusionReason | UnknownException>;

  findTotalArticles(reqCtx: RequestContext, params: FindManyArticlesParams): Effect.Effect<number, UnknownException>;

  findOneArticleById(
    reqCtx: RequestContext,
    params: FindByIdParams
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException>;

  findOneArticleBySlug(
    reqCtx: RequestContext,
    params: FindBySlugParams
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException>;

  setArticlePublished(
    reqCtx: RequestContext,
    id: string,
    published: boolean
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException>;
}

export const ARTICLES_REPOSITORY = 'ARTICLES_REPOSITORY' as InjectableIdentifier<ArticlesRepository>;
