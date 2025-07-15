import { Inject, Injectable } from '@nestjs/common';
import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { GetAllTagsQuery } from '@repo/api-models';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { PRISMA_SRV } from 'src/modules/prisma';

import type { TagModel } from '../../domain/models/tag.model';
import { type FindAllTagsParams, TAGS_REPOSITORY } from '../../domain/repositories/tags.repository';

@Injectable()
export class GetAllTagsUseCase {
  constructor(
    @Inject(TAGS_REPOSITORY)
    private readonly repository: IdentifierOf<typeof TAGS_REPOSITORY>,

    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>
  ) {}

  execute(reqCtx: RequestContext, query: GetAllTagsQuery): Effect.Effect<TagModel[], UnknownException> {
    const params: FindAllTagsParams = {
      filter: query.filter,
    };

    return this.repository.findAll(reqCtx.withTx(this.prismaSrv), params);
  }
}
