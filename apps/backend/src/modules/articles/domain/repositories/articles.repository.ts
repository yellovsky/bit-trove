import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { JSONContent } from '@repo/api-models';

import type { ExclusionReason, UnknownReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { OrderBy } from 'src/shared/utils/sort-to-order-by';

import type { TransactionContext } from 'src/modules/prisma';

import type { ArticleModel } from '../models/article.model';

// ============================================================================
// ARTICLE TYPES - Domain constants
// ============================================================================

/**
 * Supported article types
 */
type ArticleType = 'blog_post' | 'shard';

// ============================================================================
// CREATE/UPDATE TYPES - Data persistence parameters
// ============================================================================

/**
 * Parameters for creating a new article
 */
export interface CreateArticlePayload {
  /** Article content in JSON format */
  contentJSON: JSONContent | null;
  /** Language code (e.g., 'en', 'ru') */
  languageCode: string;
  /** Whether the article is published */
  published: boolean;
  /** Short description for previews */
  shortDescription: string | null;
  /** URL-friendly slug */
  slug: string;
  /** Article title */
  title: string;
  /** SEO title for search engines */
  seoTitle: string | null;
  /** SEO description for search engines */
  seoDescription: string | null;
  /** SEO keywords for search engines */
  seoKeywords: string | null;
  /** Optional entry ID for grouping articles */
  entryId: string | null;
  /** List of tag names */
  tagIds: string[];
  /** Article type (blog_post or shard) */
  type: ArticleType;
  /** Author ID */
  authorId: string | null;
}

/**
 * Parameters for updating an existing article
 */
export interface UpdateArticlePayload {
  /** Article ID to update */
  articleId: string;
  /** Article update parameters */
  data: CreateArticlePayload;
}

// ============================================================================
// QUERY TYPES - Data retrieval parameters
// ============================================================================

/**
 * Supported ordering fields for article queries
 */
type ArticleOrderBy = OrderBy<'title' | 'publishedAt' | 'createdAt'>;

/**
 * Filter criteria for article queries
 */
interface ArticleFilter {
  /** Filter by publication status */
  published?: boolean;
  /** Filter by author ID */
  authorId?: string | null;
  /** Filter by language codes */
  languageCodeIn?: string[];
  /** Search in title and content */
  search?: string;
  /** Filter by article types */
  typeIn?: ArticleType[];
}

/**
 * Parameters for finding multiple articles
 */
export interface FindArticlesQuery {
  /** Number of articles to return */
  take: number;
  /** Number of articles to skip (for pagination) */
  skip: number;
  /** Ordering criteria */
  orderBy: ArticleOrderBy;
  /** Filter criteria */
  filter: ArticleFilter;
}

/**
 * Parameters for finding an article by slug
 */
export interface FindArticleBySlugQuery {
  /** Article slug to search for */
  slug: string;
  /** Optional filter criteria */
  filter?: {
    /** Filter by author ID */
    authorId?: string;
    /** Filter by publication status */
    published?: boolean;
    /** Filter by article types */
    typeIn?: ArticleType[];
  };
}

/**
 * Parameters for finding an article by ID
 */
export interface FindArticleByIdQuery {
  /** Article ID to search for */
  id: string;
  /** Optional filter criteria */
  filter?: {
    /** Filter by author ID */
    authorId?: string;
    /** Filter by publication status */
    published?: boolean;
    /** Filter by article types */
    typeIn?: ArticleType[];
  };
}

// ============================================================================
// REPOSITORY INTERFACE - Data access operations
// ============================================================================

/**
 * Repository for article data access operations
 */
export interface ArticlesRepository {
  /**
   * Create a new article
   *
   * @param reqCtx - Request context with transaction information
   * @param payload - Article creation parameters
   * @returns Created article model
   */
  createArticle(
    txCtx: TransactionContext,
    payload: CreateArticlePayload
  ): Effect.Effect<ArticleModel, UnknownReason | UnknownException>;

  /**
   * Update an existing article
   *
   * @param reqCtx - Request context with transaction information
   * @param payload - Article update parameters
   * @returns Updated article model
   */
  updateArticle(
    txCtx: TransactionContext,
    payload: UpdateArticlePayload
  ): Effect.Effect<ArticleModel, UnknownReason | UnknownException>;

  /**
   * Get article ID by slug
   *
   * @param reqCtx - Request context with transaction information
   * @param slug - Article slug to search for
   * @returns Article ID if found, null otherwise
   */
  getArticleIdBySlug(txCtx: TransactionContext, slug: string): Effect.Effect<string | null, UnknownException>;

  /**
   * Find multiple articles with pagination and filtering
   *
   * @param reqCtx - Request context with transaction information
   * @param query - Query parameters for finding articles
   * @returns Array of article models
   */
  findArticles(
    txCtx: TransactionContext,
    query: FindArticlesQuery
  ): Effect.Effect<ArticleModel[], ExclusionReason | UnknownException>;

  /**
   * Get total count of articles matching the query
   *
   * @param reqCtx - Request context with transaction information
   * @param query - Query parameters for counting articles
   * @returns Total count of matching articles
   */
  findArticlesTotal(txCtx: TransactionContext, query: FindArticlesQuery): Effect.Effect<number, UnknownException>;

  /**
   * Find a single article by ID
   *
   * @param reqCtx - Request context with transaction information
   * @param query - Query parameters for finding the article
   * @returns Article model if found
   */
  findArticleById(
    txCtx: TransactionContext,
    query: FindArticleByIdQuery
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException>;

  /**
   * Find a single article by slug
   *
   * @param reqCtx - Request context with transaction information
   * @param query - Query parameters for finding the article
   * @returns Article model if found
   */
  findArticleBySlug(
    txCtx: TransactionContext,
    query: FindArticleBySlugQuery
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException>;

  /**
   * Update article publication status
   *
   * @param reqCtx - Request context with transaction information
   * @param id - Article ID to update
   * @param published - New publication status
   * @returns Updated article model
   */
  setArticlePublished(
    txCtx: TransactionContext,
    id: string,
    published: boolean
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException>;
}

// ============================================================================
// INJECTION TOKEN
// ============================================================================

export const ARTICLES_REPOSITORY = 'ARTICLES_REPOSITORY' as InjectableIdentifier<ArticlesRepository>;
