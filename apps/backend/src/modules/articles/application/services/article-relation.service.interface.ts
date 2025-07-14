import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ExclusionReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { ArticleWithRelationModel } from '../../domain/models/article-with-relation.model';

export interface GetManyRelatedArticlesParams {
  filter: {
    related_to?: string;
  };
}

export interface ArticleRelationService {
  getManyArticlesWithRelation(
    reqCtx: RequestContext,
    params: GetManyRelatedArticlesParams
  ): Effect.Effect<Array<ArticleWithRelationModel | ExclusionReason>, ExclusionReason | UnknownException>;
}

export const ARTICLE_RELATION_SERVICE = 'ARTICLE_RELATION_SERVICE' as InjectableIdentifier<ArticleRelationService>;
