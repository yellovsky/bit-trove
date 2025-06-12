import { Inject, Injectable, Logger } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { CreateThoughtBody } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { LocalizedThoughtModel } from '../../domain/models/localized-thought.model';
import { THOUGHTS_REPOSITORY } from '../../domain/repositories/thoughts.repository';
import { THOUGHTS_ACCESS_SRV } from '../services/thoughts-access.service.interface';

@Injectable()
export class CreateThoughtUseCase {
  #logger = new Logger(CreateThoughtUseCase.name);

  constructor(
    @Inject(THOUGHTS_REPOSITORY)
    private readonly repository: IdentifierOf<typeof THOUGHTS_REPOSITORY>,

    @Inject(THOUGHTS_ACCESS_SRV)
    private readonly accessSrv: IdentifierOf<typeof THOUGHTS_ACCESS_SRV>
  ) {}

  execute(
    reqCtx: RequestContext,
    body: CreateThoughtBody
  ): Effect.Effect<LocalizedThoughtModel, ExclusionReason | UnknownException> {
    return Effect.gen(this, function* () {
      this.#logger.debug('Creating thought');
      this.#logger.debug(`  > body: ${JSON.stringify(body)}`);
      yield* this.accessSrv.canCreateThought(reqCtx);
      return yield* this.repository.createThought(reqCtx, body);
    });
  }
}
