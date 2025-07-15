import { Inject, Injectable } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { PRISMA_SRV } from 'src/modules/prisma';

import { ArticleWithRelationModel } from '../../domain/models/article-with-relation.model';
import {
  ARTICLE_RELATION_SERVICE,
  type GetRelatedArticlesCommand,
} from '../services/article-relation.service.interface';

@Injectable()
export class RelatedArticlesGetUseCase {
  constructor(
    @Inject(ARTICLE_RELATION_SERVICE)
    private readonly relationSrv: IdentifierOf<typeof ARTICLE_RELATION_SERVICE>,

    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>
  ) {}

  execute(
    reqCtx: RequestContext,
    id: string
  ): Effect.Effect<ArticleWithRelationModel[], ExclusionReason | UnknownException> {
    const params: GetRelatedArticlesCommand = {
      filter: { relatedTo: id },
    };

    return this.relationSrv
      .getRelatedArticles(reqCtx.withTx(this.prismaSrv), params)
      .pipe(Effect.map((items) => items.filter((item) => item instanceof ArticleWithRelationModel)));
  }
}
