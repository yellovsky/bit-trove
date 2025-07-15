import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ArticleRelationType } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';

import type { TransactionContext } from 'src/modules/prisma';

import type { ArticleWithRelationModel } from '../models/article-with-relation.model';

// ============================================================================
// QUERY TYPES - Data retrieval parameters
// ============================================================================

/**
 * Query parameters for finding articles with relations
 */
export interface FindArticlesWithRelationsQuery {
  /** Filter criteria for article relations */
  filter: {
    /** Find articles related to this specific article ID */
    relatedTo?: string;
  };
}

// ============================================================================
// DATA TYPES - Data persistence parameters
// ============================================================================

/**
 * Data structure for updating article relations
 */
export interface UpdateArticleRelationsData {
  /** The article ID to update relations for */
  articleId: string;
  /** List of relations to establish */
  relations: ArticleRelationData[];
}

/**
 * Individual article relation data for persistence
 */
interface ArticleRelationData {
  /** Target article ID to relate to */
  targetArticleId: string;
  /** Type of relation to establish */
  relationType: ArticleRelationType;
}

// ============================================================================
// REPOSITORY INTERFACE - Data access operations
// ============================================================================

/**
 * Repository for article relation data access operations
 */
export interface ArticleRelationRepository {
  /**
   * Find articles with their relation information
   *
   * @param reqCtx - Request context with transaction information
   * @param query - Query parameters for filtering articles
   * @returns Articles with relation metadata
   */
  findArticlesWithRelations(
    txCtx: TransactionContext,
    query: FindArticlesWithRelationsQuery
  ): Effect.Effect<ArticleWithRelationModel[], ExclusionReason | UnknownException>;

  /**
   * Update relations for a specific article
   *
   * @param reqCtx - Request context with transaction information
   * @param data - Data containing article ID and relations to update
   * @returns Updated articles with relation information
   */
  updateArticleRelations(
    txCtx: TransactionContext,
    data: UpdateArticleRelationsData
  ): Effect.Effect<ArticleWithRelationModel[], ExclusionReason | UnknownException>;
}

// ============================================================================
// INJECTION TOKEN
// ============================================================================

export const ARTICLE_RELATION_REPOSITORY =
  'ARTICLE_RELATION_REPOSITORY' as InjectableIdentifier<ArticleRelationRepository>;
