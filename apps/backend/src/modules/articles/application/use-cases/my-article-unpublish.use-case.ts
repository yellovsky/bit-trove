import { Inject, Injectable } from '@nestjs/common';
import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { PRISMA_SRV } from 'src/modules/prisma';

import type { ArticleModel } from '../../domain/models/article.model';
import { ARTICLES_SRV } from '../services/articles.service.interface';

@Injectable()
export class MyArticleUnpublishUseCase {
  constructor(
    @Inject(ARTICLES_SRV)
    private readonly articlesSrv: IdentifierOf<typeof ARTICLES_SRV>,

    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>
  ) {}

  execute(reqCtx: RequestContext, id: string): Effect.Effect<ArticleModel, ExclusionReason | UnknownException> {
    return this.articlesSrv.unpublishArticle(reqCtx.withTx(this.prismaSrv), id);
  }
}
