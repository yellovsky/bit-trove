// global modules
import { Effect } from 'effect';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import { AppConfigService } from 'src/modules/app-config';
import { PrismaService } from 'src/modules/prisma';
import type { RepositoryContext } from 'src/types/context';

// local modules
import type { DBAccount } from './account.db-models';

@Injectable()
export class AccountRepository {
  constructor(
    @Inject() private readonly appConfigSrv: AppConfigService,
    @Inject() private readonly prismaSrv: PrismaService,
  ) {}

  findUnique(
    _ctx: RepositoryContext,
    params: { email: string },
  ): Effect.Effect<DBAccount | null, Error> {
    return Effect.gen(this, function* () {
      return this.appConfigSrv.adminEmail === params.email
        ? {
            email: params.email,
            id: 'ae250e41-3623-4a9b-9b7f-2fd730fec085',
            roles: ['admin'],
          }
        : null;
    });
  }
}
