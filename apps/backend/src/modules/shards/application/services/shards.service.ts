import { Inject } from '@nestjs/common';
import { Effect, pipe } from 'effect';
import type { UnknownException } from 'effect/Cause';
import { validate as isUUID } from 'uuid';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { ShardModel } from '../../domain/models/shard.model';
import { SHARDS_REPOSITORY } from '../../domain/repositories/shards.repository';
import type {
  CreateShardParams,
  GetManyShardsParams,
  GetShardByIdParams,
  GetShardBySlugOrIdParams,
  GetShardBySlugParams,
  ShardsService,
  UpdateShardParams,
} from './shards.service.interface';
import { SHARDS_ACCESS_SRV } from './shards-access.service.interface';

export class ShardsServiceImpl implements ShardsService {
  constructor(
    @Inject(SHARDS_ACCESS_SRV)
    private readonly shardsAccessSrv: IdentifierOf<typeof SHARDS_ACCESS_SRV>,

    @Inject(SHARDS_REPOSITORY)
    private readonly repository: IdentifierOf<typeof SHARDS_REPOSITORY>
  ) {}

  getShardById(
    reqCtx: RequestContext,
    params: GetShardByIdParams
  ): Effect.Effect<ShardModel, ExclusionReason | UnknownException> {
    return pipe(
      this.repository.findOneShardById(reqCtx, params),
      Effect.flatMap((shard) => this.shardsAccessSrv.filterCanReadShard(reqCtx, shard))
    );
  }

  getShardBySlug(
    reqCtx: RequestContext,
    params: GetShardBySlugParams
  ): Effect.Effect<ShardModel, ExclusionReason | UnknownException> {
    return pipe(
      this.repository.findOneShardBySlug(reqCtx, params),
      Effect.flatMap((shard) => this.shardsAccessSrv.filterCanReadShard(reqCtx, shard))
    );
  }

  getShardBySlugOrId(
    reqCtx: RequestContext,
    params: GetShardBySlugOrIdParams
  ): Effect.Effect<ShardModel, ExclusionReason | UnknownException> {
    return isUUID(params.slugOrId)
      ? this.getShardById(reqCtx, { id: params.slugOrId, published: params.published })
      : this.getShardBySlug(reqCtx, { published: params.published, slug: params.slugOrId });
  }

  getManyShards(
    reqCtx: RequestContext,
    params: GetManyShardsParams
  ): Effect.Effect<Array<ShardModel | ExclusionReason>, ExclusionReason | UnknownException> {
    return pipe(
      this.repository.findManyShards(reqCtx, params),
      Effect.flatMap((items) => this.shardsAccessSrv.filterCanReadShardList(reqCtx, items))
    );
  }

  createShard(
    reqCtx: RequestContext,
    body: CreateShardParams
  ): Effect.Effect<ShardModel, ExclusionReason | UnknownException> {
    return pipe(
      this.shardsAccessSrv.canCreateShard(reqCtx),
      Effect.flatMap(() => this.repository.createShard(reqCtx, body))
    );
  }

  updateShard(
    reqCtx: RequestContext,
    id: string,
    body: UpdateShardParams
  ): Effect.Effect<ShardModel, ExclusionReason | UnknownException> {
    return pipe(
      this.getShardById(reqCtx, { id }),
      Effect.flatMap((shard) => this.shardsAccessSrv.canUpdateShard(reqCtx, shard)),
      Effect.flatMap(() => this.repository.updateShard(reqCtx, id, body))
    );
  }

  publishShard(reqCtx: RequestContext, id: string): Effect.Effect<ShardModel, ExclusionReason | UnknownException> {
    return pipe(
      this.getShardById(reqCtx, { id }),
      Effect.flatMap((shard) => this.shardsAccessSrv.canUpdateShard(reqCtx, shard)),
      Effect.flatMap(() => this.repository.setShardPublished(reqCtx, id, true)),
      Effect.flatMap((shard) => this.shardsAccessSrv.filterCanReadShard(reqCtx, shard))
    );
  }

  unpublishShard(reqCtx: RequestContext, id: string): Effect.Effect<ShardModel, ExclusionReason | UnknownException> {
    return pipe(
      this.getShardById(reqCtx, { id }),
      Effect.flatMap((shard) => this.shardsAccessSrv.canUpdateShard(reqCtx, shard)),
      Effect.flatMap(() => this.repository.setShardPublished(reqCtx, id, false)),
      Effect.flatMap((shard) => this.shardsAccessSrv.filterCanReadShard(reqCtx, shard))
    );
  }
}
