import { Inject, Injectable } from '@nestjs/common';
import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { ShardModel } from '../../domain/models/shard.model';
import { SHARDS_SRV } from '../services/shards.service.interface';

@Injectable()
export class UnpublishShardUseCase {
  constructor(
    @Inject(SHARDS_SRV)
    private readonly shardsSrv: IdentifierOf<typeof SHARDS_SRV>
  ) {}

  execute(reqCtx: RequestContext, id: string): Effect.Effect<ShardModel, ExclusionReason | UnknownException> {
    return this.shardsSrv.unpublishShard(reqCtx, id);
  }
}
