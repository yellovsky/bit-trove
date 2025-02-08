// global modules
import { Inject } from '@nestjs/common';
import type { Request } from 'express';
import { Effect, LogLevel } from 'effect';

// common modules
import type { ApiError } from 'src/exceptions';
import type { AppAbility } from 'src/types/ability';
import type { DBUser } from 'src/db-models/user';
import { getPreferredLocale } from 'src/utils/accepted-language';
import type { RequestContext } from 'src/types/context';
import { CASL_SRV, type CaslService } from 'src/modules/casl';

import {
  defaultTranslationsStrategy,
  type GetTranslationsStrategy,
  SUPPORTED_LANGUAGES,
} from 'src/utils/translation-strategy';

// local modules
import type { RequestContextService } from './request-context.types';

// ====================================================
//              S E R V I C E
// ====================================================
export class RequestContextServiceClass implements RequestContextService {
  constructor(@Inject(CASL_SRV) private readonly caslSrv: CaslService) {}

  get(request: Request): Effect.Effect<RequestContext, ApiError> {
    return Effect.gen(this, function* () {
      return yield* Effect.all({
        can: this.#getCan(request),
        getTranslations: this.#getGetTranslations(request),
        language: this.#getLanguage(request),
        logLevel: this.#getLogLevel(request),
        tx: Effect.succeed(null),
        user: this.#getUser(request),
      });
    });
  }

  #getLanguage(request: Request): Effect.Effect<string> {
    return Effect.gen(function* () {
      return typeof request.query.locale === 'string'
        ? request.query.locale
        : getPreferredLocale(
            request.headers['accept-language'] || '',
            SUPPORTED_LANGUAGES,
          );
    });
  }

  #getGetTranslations(
    request: Request,
  ): Effect.Effect<GetTranslationsStrategy> {
    return Effect.gen(this, function* () {
      const language = yield* this.#getLanguage(request);
      return defaultTranslationsStrategy(language);
    });
  }

  #getLogLevel(request: Request): Effect.Effect<LogLevel.LogLevel | undefined> {
    return Effect.gen(function* () {
      return request.query._log === 'debug'
        ? LogLevel.Debug
        : request.query._log === 'info'
          ? LogLevel.Info
          : undefined;
    });
  }

  #getUser(request: Request): Effect.Effect<DBUser | null> {
    return Effect.gen(function* () {
      return (request.user as DBUser) || null;
    });
  }

  #getCan(request: Request): Effect.Effect<AppAbility['can']> {
    return Effect.gen(this, function* () {
      const user = yield* this.#getUser(request);
      const ability = this.caslSrv.getAppAbility(user);
      return ability.can.bind(ability);
    });
  }
}
