import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ExclusionReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { TxRequestContext } from 'src/shared/utils/request-context';

import type { ProfileModel } from '../../domain/models/profile.model';

export interface GetProfileByIdCommand {
  id: string;
}

export interface ProfilesService {
  getProfileById(
    txReqCtx: TxRequestContext,
    command: GetProfileByIdCommand
  ): Effect.Effect<ProfileModel, ExclusionReason | UnknownException>;
}

export const PROFILES_SRV = 'PROFILES_SRV' as InjectableIdentifier<ProfilesService>;
