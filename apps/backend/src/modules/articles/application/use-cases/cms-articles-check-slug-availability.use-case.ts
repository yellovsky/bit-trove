import { Inject, Injectable } from '@nestjs/common';
import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { PRISMA_SRV } from 'src/modules/prisma';

import { ARTICLES_REPOSITORY } from '../../domain/repositories/articles.repository';

@Injectable()
export class CMSArticlesCheckSlugAvailabilityUseCase {
  constructor(
    @Inject(ARTICLES_REPOSITORY)
    private readonly repository: IdentifierOf<typeof ARTICLES_REPOSITORY>,

    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>
  ) {}

  execute(reqCtx: RequestContext, slug: string): Effect.Effect<string | null, UnknownException> {
    return this.repository.getArticleIdBySlug(reqCtx.withTx(this.prismaSrv), slug);
  }
}
