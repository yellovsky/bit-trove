import { Inject, Injectable, Logger } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ShortArticlesGetQuery } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { PRISMA_SRV } from 'src/modules/prisma';

import { sortToOrderBy } from '../../../../shared/utils/sort-to-order-by';
import type { ArticleModel } from '../../domain/models/article.model';
import { ARTICLES_REPOSITORY, type FindArticlesQuery } from '../../domain/repositories/articles.repository';

@Injectable()
export class MyShortArticlesGetUseCase {
  #logger = new Logger(MyShortArticlesGetUseCase.name);

  constructor(
    @Inject(ARTICLES_REPOSITORY)
    private readonly repository: IdentifierOf<typeof ARTICLES_REPOSITORY>,

    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>
  ) {}

  execute(
    reqCtx: RequestContext,
    query: ShortArticlesGetQuery
  ): Effect.Effect<
    { items: Array<ExclusionReason | ArticleModel>; total: number },
    ExclusionReason | UnknownException
  > {
    this.#logger.log(` > query ${JSON.stringify(query)}`);

    const params: FindArticlesQuery = {
      filter: {
        authorId: reqCtx.accountId,
        languageCodeIn: query.filter?.languageCodeIn,
        search: query.search,
        typeIn: query.filter?.typeIn,
      },
      orderBy: sortToOrderBy(query.sort),
      skip: query.page.offset,
      take: query.page.limit,
    };

    return Effect.all({
      items: this.repository.findArticles(reqCtx.withTx(this.prismaSrv), params),
      total: this.repository.findArticlesTotal(reqCtx.withTx(this.prismaSrv), params),
    });
  }
}
