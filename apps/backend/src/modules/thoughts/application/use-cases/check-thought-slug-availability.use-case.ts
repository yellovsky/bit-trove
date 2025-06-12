import { Inject, Injectable } from '@nestjs/common';
import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { THOUGHTS_REPOSITORY } from '../../domain/repositories/thoughts.repository';

@Injectable()
export class CheckThoughtSlugAvailabilityUseCase {
  constructor(
    @Inject(THOUGHTS_REPOSITORY)
    private readonly repository: IdentifierOf<typeof THOUGHTS_REPOSITORY>
  ) {}

  execute(reqCtx: RequestContext, slug: string): Effect.Effect<boolean, UnknownException> {
    return this.repository.checkSlugAvailability(reqCtx, slug);
  }
}
