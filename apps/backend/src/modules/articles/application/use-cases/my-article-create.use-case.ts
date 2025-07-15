import { Inject, Injectable, Logger } from '@nestjs/common';
import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ArticleUpsertBody } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { PRISMA_SRV } from 'src/modules/prisma';

import type { ArticleModel } from '../../domain/models/article.model';
import { ARTICLES_SRV } from '../services/articles.service.interface';

@Injectable()
export class MyArticleCreateUseCase {
  #logger = new Logger(MyArticleCreateUseCase.name);

  constructor(
    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>,

    @Inject(ARTICLES_SRV)
    private readonly articlesSrv: IdentifierOf<typeof ARTICLES_SRV>
  ) {}

  execute(
    reqCtx: RequestContext,
    body: ArticleUpsertBody
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException> {
    this.#logger.debug('Creating article');
    this.#logger.debug(`  > body: ${JSON.stringify(body)}`);

    return this.articlesSrv.createArticle(reqCtx.withTx(this.prismaSrv), {
      authorId: reqCtx.accountId,
      contentJSON: body.contentJSON,
      entryId: body.entryId,
      languageCode: body.languageCode,
      published: body.published,
      relatedArticles: body.relatedArticles,
      seoDescription: body.seoDescription,
      seoKeywords: body.seoKeywords,
      seoTitle: body.seoTitle,
      shortDescription: body.shortDescription,
      slug: body.slug,
      tags: body.tags,
      title: body.title,
      type: body.type,
    });
  }
}
