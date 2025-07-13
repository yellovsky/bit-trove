import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ArticleUpsertBody } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';
import type { OrderBy } from 'src/shared/utils/sort-to-order-by';

import type { ArticleModel } from '../../domain/models/article.model';

export interface GetArticleByIdParams {
  id: string;
  authorId?: string;
  published?: boolean;
  type?: string;
}

export interface GetArticleBySlugParams {
  slug: string;
  authorId?: string;
  published?: boolean;
  type?: string;
}

export interface GetArticleBySlugOrIdParams {
  slugOrId: string;
  authorId?: string;
  published?: boolean;
  type?: string;
}

export interface GetManyArticlesParams {
  take: number;
  skip: number;
  orderBy: OrderBy<'title' | 'createdAt'>;

  filter: {
    published?: boolean;
    authorId?: string | null;
    languageCodeIn?: string[];
  };
}

export type CreateArticleParams = ArticleUpsertBody;
export type UpdateArticleParams = ArticleUpsertBody;

export interface ArticlesService {
  getArticleById(
    reqCtx: RequestContext,
    params: GetArticleByIdParams
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException>;

  getArticleBySlug(
    reqCtx: RequestContext,
    params: GetArticleBySlugParams
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException>;

  getArticleBySlugOrId(
    reqCtx: RequestContext,
    params: GetArticleBySlugOrIdParams
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException>;

  getManyArticles(
    reqCtx: RequestContext,
    params: GetManyArticlesParams
  ): Effect.Effect<Array<ArticleModel | ExclusionReason>, ExclusionReason | UnknownException>;

  createArticle(
    reqCtx: RequestContext,
    body: CreateArticleParams
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException>;

  updateArticle(
    reqCtx: RequestContext,
    id: string,
    body: UpdateArticleParams
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException>;

  publishArticle(reqCtx: RequestContext, id: string): Effect.Effect<ArticleModel, ExclusionReason | UnknownException>;
  unpublishArticle(reqCtx: RequestContext, id: string): Effect.Effect<ArticleModel, ExclusionReason | UnknownException>;
}

export const ARTICLES_SRV = 'ARTICLES_SRV' as InjectableIdentifier<ArticlesService>;
