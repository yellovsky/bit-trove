import { Inject, Injectable, Logger } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { CreateShardBody } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { ShardModel } from '../../domain/models/shard.model';
import { SHARDS_REPOSITORY } from '../../domain/repositories/shards.repository';
import { SHARDS_ACCESS_SRV } from '../services/shards-access.service.interface';

@Injectable()
export class CreateShardUseCase {
  #logger = new Logger(CreateShardUseCase.name);

  constructor(
    @Inject(SHARDS_REPOSITORY)
    private readonly repository: IdentifierOf<typeof SHARDS_REPOSITORY>,

    @Inject(SHARDS_ACCESS_SRV)
    private readonly accessSrv: IdentifierOf<typeof SHARDS_ACCESS_SRV>
  ) {}

  execute(
    reqCtx: RequestContext,
    body: CreateShardBody
  ): Effect.Effect<ShardModel, ExclusionReason | UnknownException> {
    return Effect.gen(this, function* () {
      this.#logger.debug('Creating shard');
      this.#logger.debug(`  > body: ${JSON.stringify(body)}`);
      yield* this.accessSrv.canCreateShard(reqCtx);
      return yield* this.repository.createShard(reqCtx, body);
    });
  }
}
