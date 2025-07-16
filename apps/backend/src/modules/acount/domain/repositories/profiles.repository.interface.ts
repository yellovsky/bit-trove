import type { UnknownException } from 'effect/Cause';
import type { Effect } from 'effect/index';

import type { ExclusionReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';

import type { TransactionContext } from 'src/modules/prisma';

import type { ProfileModel } from '../models/profile.model';

export interface FindProfileByIdQuery {
  id: string;
}

export interface FindAccountRootProfileQuery {
  accountId: string;
}

export interface ProfilesRepository {
  findProfileById(
    txCtx: TransactionContext,
    query: FindProfileByIdQuery
  ): Effect.Effect<ProfileModel, ExclusionReason | UnknownException>;

  findAccountRootProfile(
    txCtx: TransactionContext,
    query: FindAccountRootProfileQuery
  ): Effect.Effect<ProfileModel, ExclusionReason | UnknownException>;
}

export const PROFILES_REPO = 'PROFILES_REPO' as InjectableIdentifier<ProfilesRepository>;
