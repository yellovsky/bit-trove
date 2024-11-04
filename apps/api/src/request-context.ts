// global modules
import { LogLevel } from 'effect';
import type { Request } from 'express';
import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

// common modules
import type { AppAbility } from 'src/types/ability';
import { getPreferredLocale } from 'src/utils/accepted-language';
import type { PrismaTransaction } from 'src/types/prisma-transaction';
import type { RequestContext } from 'src/types/context';

import {
  defaultTranslationsStrategy,
  type GetTranslationsStrategy,
  SUPPORTED_LANGUAGES,
} from 'src/utils/translation-strategy';

export class RequestContextClass implements RequestContext {
  #ability: AppAbility;
  #request: Request;

  readonly tx: PrismaTransaction | null;
  readonly can: AppAbility['can'];
  readonly user: null;
  readonly logLevel: LogLevel.LogLevel | undefined;
  readonly getTranslations: GetTranslationsStrategy;

  constructor(params: {
    request: Request;
    ability: AppAbility;
    user: null;
    tx?: PrismaTransaction | null;
  }) {
    this.#ability = params.ability;
    this.#request = params.request;

    const locale = params.request.query.locale;

    this.getTranslations = defaultTranslationsStrategy(
      typeof locale === 'string'
        ? locale
        : getPreferredLocale(
            params.request.headers['accept-language'] || '',
            SUPPORTED_LANGUAGES,
          ),
    );

    this.tx = params.tx || null;
    this.user = params.user;
    this.can = params.ability.can.bind(params.ability);

    this.logLevel =
      params.request.query._log === 'debug'
        ? LogLevel.Debug
        : params.request.query._log === 'info'
          ? LogLevel.Info
          : undefined;
  }

  withTx(tx: PrismaTransaction): RequestContext {
    return new RequestContextClass({
      ability: this.#ability,
      request: this.#request,
      tx,
      user: this.user,
    });
  }
}

export const ReqContext = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return new RequestContextClass({
      ability: request.ability,
      request,
      user: request.user,
    });
  },
);
