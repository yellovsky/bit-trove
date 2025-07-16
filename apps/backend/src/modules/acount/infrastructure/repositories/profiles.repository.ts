import { Injectable } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import { type ExclusionReason, NotFoundReason } from 'src/shared/excluded';

import type { TransactionContext } from 'src/modules/prisma';

import type { ProfileModel } from '../../domain/models/profile.model';
import type {
  FindAccountRootProfileQuery,
  FindProfileByIdQuery,
  ProfilesRepository,
} from '../../domain/repositories/profiles.repository.interface';
import { mapToProfileModel } from './model-mappers';
import { dbProfileSelect } from './profiles.repository.types';

@Injectable()
export class ProfilesRepositoryImpl implements ProfilesRepository {
  findProfileById(
    txCtx: TransactionContext,
    query: FindProfileByIdQuery
  ): Effect.Effect<ProfileModel, ExclusionReason | UnknownException> {
    return Effect.tryPromise(() =>
      txCtx.tx.profile.findUnique({
        select: dbProfileSelect,
        where: { id: query.id },
      })
    ).pipe(
      Effect.flatMap((dbProfile) =>
        !dbProfile ? Effect.fail(new NotFoundReason()) : Effect.succeed(mapToProfileModel(dbProfile))
      )
    );
  }

  findAccountRootProfile(
    txCtx: TransactionContext,
    query: FindAccountRootProfileQuery
  ): Effect.Effect<ProfileModel, ExclusionReason | UnknownException> {
    return Effect.tryPromise(() =>
      txCtx.tx.profile.findFirst({
        select: dbProfileSelect,
        where: { accountId: query.accountId, isRoot: true },
      })
    ).pipe(
      Effect.flatMap((dbProfile) =>
        !dbProfile ? Effect.fail(new NotFoundReason()) : Effect.succeed(mapToProfileModel(dbProfile))
      )
    );
  }
}
