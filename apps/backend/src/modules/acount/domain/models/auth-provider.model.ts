interface EmailAuthProviderEntityData {
  id: string;
  accountId: string;
  providerType: 'email';
  email: string;
  passwordHash: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class EmailAuthProviderModel {
  static from(data: EmailAuthProviderEntityData): EmailAuthProviderModel {
    return new EmailAuthProviderModel(
      data.id,
      data.accountId,
      data.providerType,
      data.email,
      data.passwordHash,
      data.createdAt,
      data.updatedAt
    );
  }

  constructor(
    public readonly id: string,
    public readonly accountId: string,
    public readonly providerType: 'email',
    public readonly email: string,
    private readonly _passwordHash: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  getPasswordHash(): string | null {
    return this._passwordHash;
  }
}

interface AuthProviderEntityData {
  id: string;
  accountId: string;
  providerType: string;
  email: string | null;
  passwordHash: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const makeAuthProviderModel = (data: AuthProviderEntityData): EmailAuthProviderModel | null => {
  if (data.providerType === 'email') {
    return !data.email
      ? null
      : EmailAuthProviderModel.from({
          accountId: data.accountId,
          createdAt: data.createdAt,
          email: data.email,
          id: data.id,
          passwordHash: data.passwordHash,
          providerType: data.providerType,
          updatedAt: data.updatedAt,
        });
  }

  return null;
};
