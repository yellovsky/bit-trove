import { Inject, Injectable, Logger } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { GetManyShardsQuery } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { sortToOrderBy } from '../../../../shared/utils/sort-to-order-by';
import type { ShardModel } from '../../domain/models/shard.model';
import { type FindManyShardsParams, SHARDS_REPOSITORY } from '../../domain/repositories/shards.repository';
import { SHARDS_ACCESS_SRV } from '../services/shards-access.service.interface';

@Injectable()
export class GetMyManyShardsUseCase {
  #logger = new Logger(GetMyManyShardsUseCase.name);

  constructor(
    @Inject(SHARDS_REPOSITORY)
    private readonly repository: IdentifierOf<typeof SHARDS_REPOSITORY>,

    @Inject(SHARDS_ACCESS_SRV)
    private readonly accessSrv: IdentifierOf<typeof SHARDS_ACCESS_SRV>
  ) {}

  execute(
    reqCtx: RequestContext,
    query: GetManyShardsQuery
  ): Effect.Effect<{ items: Array<ExclusionReason | ShardModel>; total: number }, ExclusionReason | UnknownException> {
    this.#logger.log(` > query ${JSON.stringify(query)}`);

    const params: FindManyShardsParams = {
      filter: { authorId: reqCtx.accountId, languageCodeIn: query.filter?.languageCodeIn },
      orderBy: sortToOrderBy(query.sort),
      skip: query.page.offset,
      take: query.page.limit,
    };

    return Effect.all({
      items: this.repository.findManyShards(reqCtx, params).pipe(
        Effect.tap((items) => this.#logger.log(` > items ${JSON.stringify(items)}`)),
        Effect.flatMap((items) => this.accessSrv.filterCanReadShardList(reqCtx, items)),
        Effect.tap((items) => this.#logger.log(` > items ${JSON.stringify(items)}`))
      ),
      total: this.repository.findTotalShards(reqCtx, params),
    });
  }
}
