import { Inject, Injectable } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { GetOneBlogPostQuery } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { ShardModel } from '../../domain/models/shard.model';
import { SHARDS_SRV } from '../services/shards.service.interface';
import { SHARDS_ACCESS_SRV } from '../services/shards-access.service.interface';

@Injectable()
export class GetOneShardUseCase {
  constructor(
    @Inject(SHARDS_ACCESS_SRV)
    private readonly accessSrv: IdentifierOf<typeof SHARDS_ACCESS_SRV>,

    @Inject(SHARDS_SRV)
    private readonly shardsSrv: IdentifierOf<typeof SHARDS_SRV>
  ) {}

  execute(
    reqCtx: RequestContext,
    slugOrId: string,
    _query: GetOneBlogPostQuery
  ): Effect.Effect<ShardModel, ExclusionReason | UnknownException> {
    return this.shardsSrv
      .getShardBySlugOrId(reqCtx, { published: true, slugOrId })
      .pipe(Effect.flatMap((shard) => this.accessSrv.filterCanReadShard(reqCtx, shard)));
  }
}
