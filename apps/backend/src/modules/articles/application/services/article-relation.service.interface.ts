import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ArticleRelationType } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { TxRequestContext } from 'src/shared/utils/request-context';

import type { ArticleWithRelationModel } from '../../domain/models/article-with-relation.model';

// ============================================================================
// COMMAND TYPES - Business operation parameters
// ============================================================================

/**
 * Command to retrieve articles with their relations
 */
export interface GetRelatedArticlesCommand {
  /** Filter criteria for article relations */
  filter: {
    /** Filter articles related to a specific article ID */
    relatedTo?: string;
  };
}

/**
 * Individual article relation command
 */
export interface ArticleRelationCommand {
  /** Target article ID to relate to */
  targetArticleId: string;
  /** Type of relation to establish */
  relationType: ArticleRelationType;
  /** Optional priority/weight of the relation (higher = more important) */
  priority?: number;
}

/**
 * Command to update article relations
 */
export interface UpdateArticleRelationsCommand {
  /** The article ID to update relations for */
  articleId: string;
  /** List of relations to establish */
  relations: ArticleRelationCommand[];
}

// ============================================================================
// SERVICE INTERFACE - Business operations
// ============================================================================

/**
 * Service for managing article relations and related content discovery
 */
export interface ArticleRelationService {
  /**
   * Retrieve articles with their relation information
   *
   * @param reqCtx - Request context with user and locale information
   * @param command - Command containing filter criteria
   * @returns Articles with relation metadata, or exclusion reasons for filtered items
   */
  getRelatedArticles(
    txReqCtx: TxRequestContext,
    command: GetRelatedArticlesCommand
  ): Effect.Effect<Array<ArticleWithRelationModel | ExclusionReason>, ExclusionReason | UnknownException>;

  /**
   * Update relations for a specific article
   *
   * @param reqCtx - Request context with user and locale information
   * @param command - Command containing article ID and relations to update
   * @returns Updated articles with relation information
   */
  updateArticleRelations(
    txReqCtx: TxRequestContext,
    command: UpdateArticleRelationsCommand
  ): Effect.Effect<ArticleWithRelationModel[], ExclusionReason | UnknownException>;
}

// ============================================================================
// INJECTION TOKEN
// ============================================================================

export const ARTICLE_RELATION_SERVICE = 'ARTICLE_RELATION_SERVICE' as InjectableIdentifier<ArticleRelationService>;
