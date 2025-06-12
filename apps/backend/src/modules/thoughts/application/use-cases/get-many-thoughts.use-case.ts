import { Inject, Injectable } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { GetManyThoughtsQuery } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { sortToOrderBy } from '../../../../shared/utils/sort-to-order-by';
import type { LocalizedShortThoughtModel } from '../../domain/models/localized-short-thought.model';
import { type FindManyThoughtsParams, THOUGHTS_REPOSITORY } from '../../domain/repositories/thoughts.repository';
import { THOUGHTS_ACCESS_SRV } from '../services/thoughts-access.service.interface';

@Injectable()
export class GetManyThoughtsUseCase {
  constructor(
    @Inject(THOUGHTS_REPOSITORY)
    private readonly repository: IdentifierOf<typeof THOUGHTS_REPOSITORY>,

    @Inject(THOUGHTS_ACCESS_SRV)
    private readonly accessSrv: IdentifierOf<typeof THOUGHTS_ACCESS_SRV>
  ) {}

  execute(
    reqCtx: RequestContext,
    query: GetManyThoughtsQuery
  ): Effect.Effect<
    { items: Array<ExclusionReason | LocalizedShortThoughtModel>; total: number },
    ExclusionReason | UnknownException
  > {
    const params: FindManyThoughtsParams = {
      filter: {
        languageCodeIn: query.filter?.languageCodeIn,
        published: true,
      },
      orderBy: sortToOrderBy(query.sort),
      skip: query.page.offset,
      take: query.page.limit,
    };

    return Effect.all({
      items: this.repository
        .findManyLocalized(reqCtx, params)
        .pipe(Effect.flatMap((items) => this.accessSrv.filterCanReadLocalizedShortThoughtList(reqCtx, items))),
      total: this.repository.findTotalLocalized(reqCtx, params),
    });
  }
}
