import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ArticleUpsertBody } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { TxRequestContext } from 'src/shared/utils/request-context';
import type { OrderBy } from 'src/shared/utils/sort-to-order-by';

import type { ArticleModel } from '../../domain/models/article.model';

// ============================================================================
// COMMAND TYPES - Business operation parameters
// ============================================================================

/**
 * Command for retrieving an article by ID
 */
export interface GetArticleByIdCommand {
  /** Article ID to retrieve */
  id: string;
  /** Optional filter by author ID */
  authorId?: string;
  /** Optional filter by publication status */
  published?: boolean;
  /** Optional filter by article type */
  type?: string;
}

/**
 * Command for retrieving an article by slug
 */
export interface GetArticleBySlugCommand {
  /** Article slug to retrieve */
  slug: string;
  /** Optional filter by author ID */
  authorId?: string;
  /** Optional filter by publication status */
  published?: boolean;
  /** Optional filter by article type */
  type?: string;
}

/**
 * Command for retrieving an article by slug or ID
 */
export interface GetArticleBySlugOrIdCommand {
  /** Article slug or ID to retrieve */
  slugOrId: string;
  /** Optional filter by author ID */
  authorId?: string;
  /** Optional filter by publication status */
  published?: boolean;
  /** Optional filter by article type */
  type?: string;
}

/**
 * Command for retrieving multiple articles
 */
export interface GetArticlesCommand {
  /** Number of articles to return */
  take: number;
  /** Number of articles to skip (for pagination) */
  skip: number;
  /** Ordering criteria */
  orderBy: OrderBy<'title' | 'createdAt'>;
  /** Filter criteria */
  filter: {
    /** Filter by publication status */
    published?: boolean;
    /** Filter by author ID */
    authorId?: string | null;
    /** Filter by language codes */
    languageCodeIn?: string[];
  };
}

/**
 * Command for creating a new article
 */
export type CreateArticleCommand = ArticleUpsertBody & { authorId: string | null };

/**
 * Command for updating an existing article
 */
export interface UpdateArticleCommand {
  /** Article ID to update */
  articleId: string;
  /** Article update parameters */
  data: ArticleUpsertBody & { authorId: string | null };
}

// ============================================================================
// SERVICE INTERFACE - Business operations
// ============================================================================

/**
 * Service for managing articles and article-related business operations
 */
export interface ArticlesService {
  /**
   * Retrieve an article by its ID
   *
   * @param reqCtx - Request context with user and locale information
   * @param command - Command parameters for finding the article
   * @returns Article model if found
   */
  getArticleById(
    txReqCtx: TxRequestContext,
    command: GetArticleByIdCommand
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException>;

  /**
   * Retrieve an article by its slug
   *
   * @param reqCtx - Request context with user and locale information
   * @param command - Command parameters for finding the article
   * @returns Article model if found
   */
  getArticleBySlug(
    txReqCtx: TxRequestContext,
    command: GetArticleBySlugCommand
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException>;

  /**
   * Retrieve an article by its slug or ID
   *
   * @param reqCtx - Request context with user and locale information
   * @param command - Command parameters for finding the article
   * @returns Article model if found
   */
  getArticleBySlugOrId(
    txReqCtx: TxRequestContext,
    command: GetArticleBySlugOrIdCommand
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException>;

  /**
   * Retrieve multiple articles with pagination and filtering
   *
   * @param reqCtx - Request context with user and locale information
   * @param command - Command parameters for finding articles
   * @returns Array of article models, or exclusion reasons for filtered items
   */
  getArticles(
    txReqCtx: TxRequestContext,
    command: GetArticlesCommand
  ): Effect.Effect<Array<ArticleModel | ExclusionReason>, ExclusionReason | UnknownException>;

  /**
   * Create a new article
   *
   * @param reqCtx - Request context with user and locale information
   * @param command - Article creation command
   * @returns Created article model
   */
  createArticle(
    txReqCtx: TxRequestContext,
    command: CreateArticleCommand
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException>;

  /**
   * Update an existing article
   *
   * @param reqCtx - Request context with user and locale information
   * @param command - Article update command
   * @returns Updated article model
   */
  updateArticle(
    txReqCtx: TxRequestContext,
    command: UpdateArticleCommand
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException>;

  /**
   * Publish an article (make it publicly visible)
   *
   * @param reqCtx - Request context with user and locale information
   * @param id - Article ID to publish
   * @returns Published article model
   */
  publishArticle(
    txReqCtx: TxRequestContext,
    id: string
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException>;

  /**
   * Unpublish an article (make it private/draft)
   *
   * @param reqCtx - Request context with user and locale information
   * @param id - Article ID to unpublish
   * @returns Unpublished article model
   */
  unpublishArticle(
    txReqCtx: TxRequestContext,
    id: string
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException>;
}

// ============================================================================
// INJECTION TOKEN
// ============================================================================

export const ARTICLES_SRV = 'ARTICLES_SRV' as InjectableIdentifier<ArticlesService>;
