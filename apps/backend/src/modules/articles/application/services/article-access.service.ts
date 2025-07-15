import { Inject } from '@nestjs/common';
import { Effect, pipe } from 'effect';
import type { UnknownException } from 'effect/Cause';

import { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { TxRequestContext } from 'src/shared/utils/request-context';

import { CASBIN_SRV } from 'src/modules/casbin';

import type { ArticleModel } from '../../domain/models/article.model';
import type { ArticleAccessService } from './article-access.service.interface';

export class ArticleAccessServiceImpl implements ArticleAccessService {
  constructor(
    @Inject(CASBIN_SRV)
    private readonly casbinSrv: IdentifierOf<typeof CASBIN_SRV>
  ) {}

  canCreateArticle(txReqCtx: TxRequestContext): Effect.Effect<true, ExclusionReason | UnknownException> {
    return this.casbinSrv.checkRequestPermission(txReqCtx, 'create', 'article', {});
  }

  filterCanReadArticle(
    txReqCtx: TxRequestContext,
    article: ArticleModel
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException> {
    return pipe(
      this.casbinSrv.checkRequestPermission(txReqCtx, 'read', 'article', article),
      Effect.map(() => article)
    );
  }

  filterCanReadArticleList(
    txReqCtx: TxRequestContext,
    articles: ArticleModel[]
  ): Effect.Effect<Array<ArticleModel | ExclusionReason>, UnknownException> {
    return Effect.all(
      articles.map((article) =>
        this.filterCanReadArticle(txReqCtx, article).pipe(
          Effect.catchAll((err) => (err instanceof ExclusionReason ? Effect.succeed(err) : Effect.fail(err)))
        )
      )
    );
  }

  canUpdateArticle(
    txReqCtx: TxRequestContext,
    article: ArticleModel
  ): Effect.Effect<true, ExclusionReason | UnknownException> {
    return this.casbinSrv.checkRequestPermission(txReqCtx, 'update', 'article', article);
  }
}
