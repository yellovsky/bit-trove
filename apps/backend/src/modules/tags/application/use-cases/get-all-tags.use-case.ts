import { Inject, Injectable } from '@nestjs/common';
import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { GetAllTagsQuery } from '@repo/api-models';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { TagModel } from '../../domain/models/tag.model';
import { type FindAllTagsParams, TAGS_REPOSITORY } from '../../domain/repositories/tags.repository';

@Injectable()
export class GetAllTagsUseCase {
  constructor(
    @Inject(TAGS_REPOSITORY)
    private readonly repository: IdentifierOf<typeof TAGS_REPOSITORY>
  ) {}

  execute(reqCtx: RequestContext, query: GetAllTagsQuery): Effect.Effect<TagModel[], UnknownException> {
    const params: FindAllTagsParams = {
      filter: query.filter,
    };

    return this.repository.findAll(reqCtx, params);
  }
}
