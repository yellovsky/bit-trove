import { AccountModel } from '../../domain/models/account.model';
import { type EmailAuthProviderModel, makeAuthProviderModel } from '../../domain/models/auth-provider.model';
import { ProfileModel } from '../../domain/models/profile.model';
import type { DBAccount } from './accounts.repository.types';
import type { DBAuthProvider } from './auth-providers.repository.types';
import type { DBProfile } from './profiles.repository.types';

export const mapToProfileModel = (dbProfile: DBProfile): ProfileModel =>
  ProfileModel.from({
    accountId: dbProfile.accountId,
    createdAt: dbProfile.createdAt,
    id: dbProfile.id,
    isRoot: dbProfile.isRoot,
    name: dbProfile.name,
    updatedAt: dbProfile.updatedAt,
  });

export const mapToEmailAuthProviderModel = (dbAuthProvider: DBAuthProvider): EmailAuthProviderModel | null =>
  makeAuthProviderModel({
    accountId: dbAuthProvider.accountId,
    createdAt: dbAuthProvider.createdAt,
    email: dbAuthProvider.email,
    id: dbAuthProvider.id,
    passwordHash: dbAuthProvider.passwordHash,
    providerType: 'email',
    updatedAt: dbAuthProvider.updatedAt,
  });

export const mapToAccountModel = (dbAccount: DBAccount): AccountModel => {
  return AccountModel.from({
    authProviders: dbAccount.authProviders.map(mapToEmailAuthProviderModel).filter((val) => !!val),
    createdAt: dbAccount.createdAt,
    id: dbAccount.id,
    profiles: dbAccount.profiles,
    updatedAt: dbAccount.updatedAt,
  });
};
