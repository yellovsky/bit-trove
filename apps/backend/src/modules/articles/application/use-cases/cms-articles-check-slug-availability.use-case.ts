import { Inject, Injectable } from '@nestjs/common';
import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { ARTICLES_REPOSITORY } from '../../domain/repositories/articles.repository';

@Injectable()
export class CMSArticlesCheckSlugAvailabilityUseCase {
  constructor(
    @Inject(ARTICLES_REPOSITORY)
    private readonly repository: IdentifierOf<typeof ARTICLES_REPOSITORY>
  ) {}

  execute(reqCtx: RequestContext, slug: string): Effect.Effect<string | null, UnknownException> {
    return this.repository.getArticleIdBySlug(reqCtx, slug);
  }
}
