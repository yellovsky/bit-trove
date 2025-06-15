import { Inject, Injectable } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import { AccessDeniedReason, type ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { ShardModel } from '../../domain/models/shard.model';
import { SHARDS_SRV } from '../services/shards.service.interface';

@Injectable()
export class GetMyShardUseCase {
  constructor(
    @Inject(SHARDS_SRV)
    private readonly shardsSrv: IdentifierOf<typeof SHARDS_SRV>
  ) {}

  execute(reqCtx: RequestContext, id: string): Effect.Effect<ShardModel, ExclusionReason | UnknownException> {
    const accountId = reqCtx.accountId;
    if (!accountId) return Effect.fail(new AccessDeniedReason());

    return this.shardsSrv.getShardById(reqCtx, { authorId: accountId, id });
  }
}
