import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/modules/prisma';

import { ACCOUNTS_REPO } from './domain/repositories/accounts.repository.interface';
import { AUTH_PROVIDERS_REPO } from './domain/repositories/auth-providers.repository.interface';
import { PROFILES_REPO } from './domain/repositories/profiles.repository.interface';

import { AccountsServiceImpl } from './application/services/accounts.service';
import { ACCOUNTS_SRV } from './application/services/accounts.service.interface';
import { AuthProvidersServiceImpl } from './application/services/auth-providers.service';
import { AUTH_PROVIDERS_SRV } from './application/services/auth-providers.service.interface';
import { ProfilesServiceImpl } from './application/services/profiles.service';
import { PROFILES_SRV } from './application/services/profiles.service.interface';

import { AccountsRepositoryImpl } from './infrastructure/repositories/accounts.repository';
import { AuthProvidersRepositoryImpl } from './infrastructure/repositories/auth-providers.repository';
import { ProfilesRepositoryImpl } from './infrastructure/repositories/profiles.repository';

@Module({
  exports: [ACCOUNTS_SRV, AUTH_PROVIDERS_SRV, PROFILES_SRV],
  imports: [PrismaModule],
  providers: [
    { provide: AUTH_PROVIDERS_REPO, useClass: AuthProvidersRepositoryImpl },
    { provide: AUTH_PROVIDERS_SRV, useClass: AuthProvidersServiceImpl },
    { provide: ACCOUNTS_REPO, useClass: AccountsRepositoryImpl },
    { provide: PROFILES_REPO, useClass: ProfilesRepositoryImpl },
    { provide: ACCOUNTS_SRV, useClass: AccountsServiceImpl },
    { provide: PROFILES_SRV, useClass: ProfilesServiceImpl },
  ],
})
export class AccountsModule {}
