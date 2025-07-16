import type { EmailAuthProviderModel } from './auth-provider.model';
import type { ProfileModel } from './profile.model';

interface AccountModelData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  profiles: ProfileModel[];
  authProviders: EmailAuthProviderModel[];
}

export class AccountModel {
  static from(data: AccountModelData): AccountModel {
    return new AccountModel(data.id, data.createdAt, data.updatedAt, data.profiles, data.authProviders);
  }

  constructor(
    public readonly id: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly profiles: ProfileModel[],
    public readonly authProviders: EmailAuthProviderModel[]
  ) {}
}
