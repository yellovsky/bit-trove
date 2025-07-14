import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ExclusionReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { ArticleWithRelationModel } from '../models/article-with-relation.model';

export interface FindManyArticlesWithRelationParams {
  filter: {
    related_to?: string;
  };
}

export interface ArticleRelationRepository {
  findManyArticlesWithRelation(
    reqCtx: RequestContext,
    params: FindManyArticlesWithRelationParams
  ): Effect.Effect<ArticleWithRelationModel[], ExclusionReason | UnknownException>;
}

export const ARTICLE_RELATION_REPOSITORY =
  'ARTICLE_RELATION_REPOSITORY' as InjectableIdentifier<ArticleRelationRepository>;
