import { Inject, Injectable, Logger } from '@nestjs/common';
import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { UpsertShardBody } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { ShardModel } from '../../domain/models/shard.model';
import { SHARDS_REPOSITORY } from '../../domain/repositories/shards.repository';

@Injectable()
export class UpdateShardUseCase {
  #logger = new Logger(UpdateShardUseCase.name);

  constructor(
    @Inject(SHARDS_REPOSITORY)
    private readonly repository: IdentifierOf<typeof SHARDS_REPOSITORY>
  ) {}

  execute(
    reqCtx: RequestContext,
    id: string,
    body: UpsertShardBody
  ): Effect.Effect<ShardModel, ExclusionReason | UnknownException> {
    this.#logger.debug('Updating shard');
    this.#logger.debug(`  > body: ${JSON.stringify(body)}`);
    return this.repository.updateShard(reqCtx, id, body);
  }
}
