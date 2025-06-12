import { Inject, Logger } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import { AccessDeniedReason, ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { CASBIN_SRV } from 'src/modules/casbin';

import type { LocalizedShortThoughtModel } from '../../domain/models/localized-short-thought.model';
import type { LocalizedThoughtModel } from '../../domain/models/localized-thought.model';
import type { ThoughtsAccessService } from './thoughts-access.service.interface';

export class ThoughtsAccessServiceImpl implements ThoughtsAccessService {
  #logger = new Logger(ThoughtsAccessServiceImpl.name);

  constructor(
    @Inject(CASBIN_SRV)
    private readonly casbinSrv: IdentifierOf<typeof CASBIN_SRV>
  ) {}

  canCreateThought(reqCtx: RequestContext): Effect.Effect<true, ExclusionReason | UnknownException> {
    this.#logger.debug('Checking if can create thought');

    return Effect.tryPromise(() => this.casbinSrv.checkRequestPermission(reqCtx, 'create', 'thought', {})).pipe(
      Effect.flatMap((canCreate) => {
        this.#logger.debug(`  > canCreate: ${canCreate}`);
        return canCreate ? Effect.succeed(true) : Effect.fail(new AccessDeniedReason());
      })
    );
  }

  filterCanReadLocalizedThought(
    reqCtx: RequestContext,
    thought: LocalizedThoughtModel
  ): Effect.Effect<LocalizedThoughtModel, ExclusionReason | UnknownException> {
    return Effect.tryPromise(() => this.casbinSrv.checkRequestPermission(reqCtx, 'read', 'thought', thought)).pipe(
      Effect.flatMap((canRead) => {
        return canRead ? Effect.succeed(thought) : Effect.fail(new AccessDeniedReason());
      })
    );
  }

  filterCanReadShortLocalizedThought(
    reqCtx: RequestContext,
    thought: LocalizedShortThoughtModel
  ): Effect.Effect<LocalizedShortThoughtModel, ExclusionReason | UnknownException> {
    return Effect.tryPromise(() => this.casbinSrv.checkRequestPermission(reqCtx, 'read', 'thought', thought)).pipe(
      Effect.flatMap((canRead) => (canRead ? Effect.succeed(thought) : Effect.fail(new AccessDeniedReason())))
    );
  }

  filterCanReadLocalizedShortThoughtList(
    reqCtx: RequestContext,
    thoughts: LocalizedShortThoughtModel[]
  ): Effect.Effect<Array<LocalizedShortThoughtModel | ExclusionReason>, UnknownException> {
    return Effect.all(
      thoughts.map((thought) =>
        this.filterCanReadShortLocalizedThought(reqCtx, thought).pipe(
          Effect.catchAll((err) => (err instanceof ExclusionReason ? Effect.succeed(err) : Effect.fail(err)))
        )
      )
    );
  }
}
