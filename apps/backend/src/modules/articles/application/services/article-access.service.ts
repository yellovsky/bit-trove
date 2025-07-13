import { Inject } from '@nestjs/common';
import { Effect, pipe } from 'effect';
import type { UnknownException } from 'effect/Cause';

import { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { CASBIN_SRV } from 'src/modules/casbin';

import type { ArticleModel } from '../../domain/models/article.model';
import type { ArticleAccessService } from './article-access.service.interface';

export class ArticleAccessServiceImpl implements ArticleAccessService {
  constructor(
    @Inject(CASBIN_SRV)
    private readonly casbinSrv: IdentifierOf<typeof CASBIN_SRV>
  ) {}

  canCreateArticle(reqCtx: RequestContext): Effect.Effect<true, ExclusionReason | UnknownException> {
    return this.casbinSrv.checkRequestPermission(reqCtx, 'create', 'article', {});
  }

  filterCanReadArticle(
    reqCtx: RequestContext,
    article: ArticleModel
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException> {
    return pipe(
      this.casbinSrv.checkRequestPermission(reqCtx, 'read', 'article', article),
      Effect.map(() => article)
    );
  }

  filterCanReadArticleList(
    reqCtx: RequestContext,
    articles: ArticleModel[]
  ): Effect.Effect<Array<ArticleModel | ExclusionReason>, UnknownException> {
    return Effect.all(
      articles.map((article) =>
        this.filterCanReadArticle(reqCtx, article).pipe(
          Effect.catchAll((err) => (err instanceof ExclusionReason ? Effect.succeed(err) : Effect.fail(err)))
        )
      )
    );
  }

  canUpdateArticle(
    reqCtx: RequestContext,
    article: ArticleModel
  ): Effect.Effect<true, ExclusionReason | UnknownException> {
    return this.casbinSrv.checkRequestPermission(reqCtx, 'update', 'article', article);
  }
}
