import { Inject, Injectable } from '@nestjs/common';
import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { SHARDS_REPOSITORY } from '../../domain/repositories/shards.repository';

@Injectable()
export class CheckShardSlugAvailabilityUseCase {
  constructor(
    @Inject(SHARDS_REPOSITORY)
    private readonly repository: IdentifierOf<typeof SHARDS_REPOSITORY>
  ) {}

  execute(reqCtx: RequestContext, slug: string): Effect.Effect<boolean, UnknownException> {
    return this.repository.checkShardSlugAvailability(reqCtx, slug);
  }
}
