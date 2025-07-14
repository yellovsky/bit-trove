import { Inject, Injectable, Logger } from '@nestjs/common';
import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ArticleUpsertBody } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { ArticleModel } from '../../domain/models/article.model';
import { ARTICLES_REPOSITORY } from '../../domain/repositories/articles.repository';

@Injectable()
export class MyArticleUpdateUseCase {
  #logger = new Logger(MyArticleUpdateUseCase.name);

  constructor(
    @Inject(ARTICLES_REPOSITORY)
    private readonly repository: IdentifierOf<typeof ARTICLES_REPOSITORY>
  ) {}

  execute(
    reqCtx: RequestContext,
    id: string,
    body: ArticleUpsertBody
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException> {
    this.#logger.debug('Updating article');
    this.#logger.debug(`  > body: ${JSON.stringify(body)}`);
    return this.repository.updateArticle(reqCtx, id, body);
  }
}
