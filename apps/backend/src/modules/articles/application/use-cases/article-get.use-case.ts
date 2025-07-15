import { Inject, Injectable } from '@nestjs/common';
import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ArticleGetQuery } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { PRISMA_SRV } from 'src/modules/prisma';

import type { ArticleModel } from '../../domain/models/article.model';
import { ARTICLES_SRV } from '../services/articles.service.interface';

@Injectable()
export class ArticleGetUseCase {
  constructor(
    @Inject(ARTICLES_SRV)
    private readonly articlesSrv: IdentifierOf<typeof ARTICLES_SRV>,

    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>
  ) {}

  execute(
    reqCtx: RequestContext,
    slugOrId: string,
    query: ArticleGetQuery
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException> {
    return this.articlesSrv.getArticleBySlugOrId(reqCtx.withTx(this.prismaSrv), {
      published: true,
      slugOrId,
      type: query.type,
    });
  }
}
