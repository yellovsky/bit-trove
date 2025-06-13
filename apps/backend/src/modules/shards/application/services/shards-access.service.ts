import { Inject, Logger } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import { AccessDeniedReason, ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { CASBIN_SRV } from 'src/modules/casbin';

import type { LocalizedShardModel } from '../../domain/models/localized-shard.model';
import type { LocalizedShortShardModel } from '../../domain/models/localized-short-shard.model';
import type { ShardsAccessService } from './shards-access.service.interface';

export class ShardsAccessServiceImpl implements ShardsAccessService {
  #logger = new Logger(ShardsAccessServiceImpl.name);

  constructor(
    @Inject(CASBIN_SRV)
    private readonly casbinSrv: IdentifierOf<typeof CASBIN_SRV>
  ) {}

  canCreateShard(reqCtx: RequestContext): Effect.Effect<true, ExclusionReason | UnknownException> {
    this.#logger.debug('Checking if can create shard');

    return Effect.tryPromise(() => this.casbinSrv.checkRequestPermission(reqCtx, 'create', 'shard', {})).pipe(
      Effect.flatMap((canCreate) => {
        this.#logger.debug(`  > canCreate: ${canCreate}`);
        return canCreate ? Effect.succeed(true) : Effect.fail(new AccessDeniedReason());
      })
    );
  }

  filterCanReadLocalizedShard(
    reqCtx: RequestContext,
    shard: LocalizedShardModel
  ): Effect.Effect<LocalizedShardModel, ExclusionReason | UnknownException> {
    return Effect.tryPromise(() => this.casbinSrv.checkRequestPermission(reqCtx, 'read', 'shard', shard)).pipe(
      Effect.flatMap((canRead) => {
        return canRead ? Effect.succeed(shard) : Effect.fail(new AccessDeniedReason());
      })
    );
  }

  filterCanReadShortLocalizedShard(
    reqCtx: RequestContext,
    shard: LocalizedShortShardModel
  ): Effect.Effect<LocalizedShortShardModel, ExclusionReason | UnknownException> {
    return Effect.tryPromise(() => this.casbinSrv.checkRequestPermission(reqCtx, 'read', 'shard', shard)).pipe(
      Effect.flatMap((canRead) => (canRead ? Effect.succeed(shard) : Effect.fail(new AccessDeniedReason())))
    );
  }

  filterCanReadLocalizedShortShardList(
    reqCtx: RequestContext,
    shards: LocalizedShortShardModel[]
  ): Effect.Effect<Array<LocalizedShortShardModel | ExclusionReason>, UnknownException> {
    return Effect.all(
      shards.map((shard) =>
        this.filterCanReadShortLocalizedShard(reqCtx, shard).pipe(
          Effect.catchAll((err) => (err instanceof ExclusionReason ? Effect.succeed(err) : Effect.fail(err)))
        )
      )
    );
  }
}
