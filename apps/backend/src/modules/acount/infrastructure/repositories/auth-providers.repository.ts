import { Injectable } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import { type ExclusionReason, NotFoundReason } from 'src/shared/excluded';

import type { TransactionContext } from 'src/modules/prisma';

import type { EmailAuthProviderModel } from '../../domain/models/auth-provider.model';
import type {
  AuthProvidersRepository,
  FindAuthProviderByEmailQuery,
} from '../../domain/repositories/auth-providers.repository.interface';
import { dbAuthProvidersSelect } from './auth-providers.repository.types';
import { mapToEmailAuthProviderModel } from './model-mappers';

@Injectable()
export class AuthProvidersRepositoryImpl implements AuthProvidersRepository {
  findAuthProviderByEmail(
    txCtx: TransactionContext,
    query: FindAuthProviderByEmailQuery
  ): Effect.Effect<EmailAuthProviderModel, ExclusionReason | UnknownException> {
    return Effect.tryPromise(() =>
      txCtx.tx.authProvider.findFirst({ select: dbAuthProvidersSelect, where: { email: query.email } })
    ).pipe(
      Effect.flatMap((dbProfile) => {
        if (!dbProfile) return Effect.fail(new NotFoundReason());
        const model = mapToEmailAuthProviderModel(dbProfile);
        return !model ? Effect.fail(new NotFoundReason()) : Effect.succeed(model);
      })
    );
  }
}
