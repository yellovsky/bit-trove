import * as parser from 'accept-language-parser';
import type { Request } from 'express';

import { FALLBACK_LNG, SUPPORTED_LNGS } from 'src/shared/config/i18n';

import { ProfileModel } from 'src/modules/acount';
import type { PrismaTransactionOrContext } from 'src/modules/prisma';

import type { BaseRequestContext, TxRequestContext } from './request-context.types';

const getRequestLocale = (request: Request): string => {
  const queryLocale = request.query.locale;
  if (queryLocale && typeof queryLocale === 'string') return queryLocale;

  const header = request.headers['accept-language'];
  const headerLocale = header ? parser.pick(SUPPORTED_LNGS, header) : undefined;

  if (headerLocale) return headerLocale;
  return FALLBACK_LNG;
};

interface RequestContextData {
  getLocale: () => string;
  accountId: string | null;
  profileId: string | null;
}

export class BaseRequestContextImpl implements BaseRequestContext {
  #resolverLocale: string | null = null;

  static fromRequest(request: Request): BaseRequestContext {
    const profile = request.user instanceof ProfileModel ? request.user : null;

    return BaseRequestContextImpl.from({
      accountId: profile?.accountId || null,
      getLocale: () => getRequestLocale(request),
      profileId: profile?.id || null,
    });
  }

  static from(params: RequestContextData): BaseRequestContext {
    return new BaseRequestContextImpl(params.getLocale, params.accountId, params.profileId);
  }

  constructor(
    protected readonly getLocale: () => string,
    public readonly accountId: string | null,
    public readonly profileId: string | null
  ) {}

  get locale() {
    if (!this.#resolverLocale) this.#resolverLocale = this.getLocale();
    return this.#resolverLocale;
  }

  isAuthorized(): this is { accountId: string; profileId: string } {
    return !!this.accountId && !!this.profileId;
  }

  withTx(tx: PrismaTransactionOrContext): TxRequestContext {
    return TxRequestContextImpl.from({
      accountId: this.accountId,
      getLocale: this.getLocale,
      profileId: this.profileId,
      tx,
    });
  }
}

interface TxRequestContextData extends RequestContextData {
  tx: PrismaTransactionOrContext;
}

class TxRequestContextImpl extends BaseRequestContextImpl implements TxRequestContext {
  static from(params: TxRequestContextData): TxRequestContext {
    return new TxRequestContextImpl(params.getLocale, params.accountId, params.profileId, params.tx);
  }

  constructor(
    readonly getLocale: () => string,
    readonly accountId: string | null,
    readonly profileId: string | null,
    public readonly tx: PrismaTransactionOrContext
  ) {
    super(getLocale, accountId, profileId);
  }
}
