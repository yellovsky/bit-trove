import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ExclusionReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { TxRequestContext } from 'src/shared/utils/request-context';

import type { ArticleModel } from '../../domain/models/article.model';

export interface ArticleAccessService {
  filterCanReadArticle(
    txReqCtx: TxRequestContext,
    article: ArticleModel
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException>;

  filterCanReadArticleList(
    txReqCtx: TxRequestContext,
    articles: ArticleModel[]
  ): Effect.Effect<Array<ArticleModel | ExclusionReason>, UnknownException>;

  canCreateArticle(txReqCtx: TxRequestContext): Effect.Effect<true, ExclusionReason | UnknownException>;

  canUpdateArticle(
    txReqCtx: TxRequestContext,
    article: ArticleModel
  ): Effect.Effect<true, ExclusionReason | UnknownException>;
}

export const ARTICLE_ACCESS_SRV = 'ARTICLE_ACCESS_SRV' as InjectableIdentifier<ArticleAccessService>;
