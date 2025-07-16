import { Inject, Injectable } from '@nestjs/common';
import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { TxRequestContext } from 'src/shared/utils/request-context';

import type { ProfileModel } from '../../domain/models/profile.model';
import { PROFILES_REPO } from '../../domain/repositories/profiles.repository.interface';
import type { GetProfileByIdCommand, ProfilesService } from './profiles.service.interface';

@Injectable()
export class ProfilesServiceImpl implements ProfilesService {
  constructor(
    @Inject(PROFILES_REPO)
    private readonly profilesRepo: IdentifierOf<typeof PROFILES_REPO>
  ) {}

  getProfileById(
    txReqCtx: TxRequestContext,
    command: GetProfileByIdCommand
  ): Effect.Effect<ProfileModel, ExclusionReason | UnknownException> {
    return this.profilesRepo.findProfileById(txReqCtx, command);
  }
}
