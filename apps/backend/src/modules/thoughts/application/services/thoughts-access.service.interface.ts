import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ExclusionReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { LocalizedShortThoughtModel } from '../../domain/models/localized-short-thought.model';
import type { LocalizedThoughtModel } from '../../domain/models/localized-thought.model';

export interface ThoughtsAccessService {
  filterCanReadLocalizedThought(
    reqCtx: RequestContext,
    thought: LocalizedThoughtModel
  ): Effect.Effect<LocalizedThoughtModel, ExclusionReason | UnknownException>;

  filterCanReadShortLocalizedThought(
    reqCtx: RequestContext,
    thought: LocalizedShortThoughtModel
  ): Effect.Effect<LocalizedShortThoughtModel, ExclusionReason | UnknownException>;

  filterCanReadLocalizedShortThoughtList(
    reqCtx: RequestContext,
    thoughts: LocalizedShortThoughtModel[]
  ): Effect.Effect<Array<LocalizedShortThoughtModel | ExclusionReason>, UnknownException>;

  canCreateThought(reqCtx: RequestContext): Effect.Effect<true, ExclusionReason | UnknownException>;
}

export const THOUGHTS_ACCESS_SRV = 'THOUGHTS_ACCESS_SRV' as InjectableIdentifier<ThoughtsAccessService>;
