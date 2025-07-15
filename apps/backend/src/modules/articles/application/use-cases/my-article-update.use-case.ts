import { Inject, Injectable, Logger } from '@nestjs/common';
import { Effect, pipe } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ArticleUpsertBody } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { PRISMA_SRV, TRANSACTION_SRV } from 'src/modules/prisma';

import type { ArticleModel } from '../../domain/models/article.model';
import { ARTICLE_RELATION_SERVICE } from '../services/article-relation.service.interface';
import { ARTICLES_SRV } from '../services/articles.service.interface';

@Injectable()
export class MyArticleUpdateUseCase {
  #logger = new Logger(MyArticleUpdateUseCase.name);

  constructor(
    @Inject(ARTICLES_SRV)
    private readonly articlesSrv: IdentifierOf<typeof ARTICLES_SRV>,

    @Inject(ARTICLE_RELATION_SERVICE)
    private readonly articleRelationSrv: IdentifierOf<typeof ARTICLE_RELATION_SERVICE>,

    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>,

    @Inject(TRANSACTION_SRV)
    private readonly transactionSrv: IdentifierOf<typeof TRANSACTION_SRV>
  ) {}

  execute(
    reqCtx: RequestContext,
    id: string,
    body: ArticleUpsertBody
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException> {
    this.#logger.debug('Updating article');
    this.#logger.debug(`  > body: ${JSON.stringify(body)}`);

    return this.transactionSrv.withTransaction(reqCtx.withTx(this.prismaSrv), (txCtx) =>
      pipe(
        this.articleRelationSrv.updateArticleRelations(txCtx, {
          articleId: id,
          relations: body.relatedArticles.map((relation) => ({
            relationType: relation.relationType,
            targetArticleId: relation.articleId,
          })),
        }),
        Effect.flatMap(() =>
          this.articlesSrv.updateArticle(txCtx.withTx(this.prismaSrv), {
            articleId: id,
            data: { ...body, authorId: txCtx.accountId },
          })
        ),
        Effect.tapError((err) => {
          console.error(err);
          return Effect.void;
        })
      )
    );
  }
}
