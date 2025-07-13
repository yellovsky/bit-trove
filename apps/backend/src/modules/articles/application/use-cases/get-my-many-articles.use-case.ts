import { Inject, Injectable, Logger } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ShortArticlesGetQuery } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { sortToOrderBy } from '../../../../shared/utils/sort-to-order-by';
import type { ArticleModel } from '../../domain/models/article.model';
import { ARTICLES_REPOSITORY, type FindManyArticlesParams } from '../../domain/repositories/articles.repository';

@Injectable()
export class GetMyManyArticlesUseCase {
  #logger = new Logger(GetMyManyArticlesUseCase.name);

  constructor(
    @Inject(ARTICLES_REPOSITORY)
    private readonly repository: IdentifierOf<typeof ARTICLES_REPOSITORY>
  ) {}

  execute(
    reqCtx: RequestContext,
    query: ShortArticlesGetQuery
  ): Effect.Effect<
    { items: Array<ExclusionReason | ArticleModel>; total: number },
    ExclusionReason | UnknownException
  > {
    this.#logger.log(` > query ${JSON.stringify(query)}`);

    const params: FindManyArticlesParams = {
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
      items: this.repository.findManyArticles(reqCtx, params),
      total: this.repository.findTotalArticles(reqCtx, params),
    });
  }
}
