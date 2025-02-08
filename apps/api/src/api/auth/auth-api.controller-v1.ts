// global modules
import { ApiTags } from '@nestjs/swagger';
import { Effect } from 'effect';
import type { Request } from 'express';
import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';

// common modules
import type { LoginResponseEntity } from 'src/entities/auth';
import { Public } from 'src/utils/access-control';
import { RUNTIME_SRV, type RuntimeService } from 'src/modules/runtime';

import {
  OAUTH_ACCESS_TOKEN_SRV,
  type OauthAccessTokenService,
} from 'src/modules/oauth';

import {
  AUTH_SERIALIZER_SRV,
  AuthEmailGuard,
  type AuthSerializerService,
} from 'src/modules/auth';

// local modules
import { LoginWithEmailDTO } from './dto/login-with-email.dto';
import {
  REQUEST_CONTEXT_SRV,
  type RequestContextService,
} from '../../modules/request-context';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthApiV1Controller {
  constructor(
    @Inject(RUNTIME_SRV)
    private readonly runtimeSrv: RuntimeService,

    @Inject(AUTH_SERIALIZER_SRV)
    private readonly authSerializerSrv: AuthSerializerService,

    @Inject(OAUTH_ACCESS_TOKEN_SRV)
    private readonly oauthAccessTokenSrv: OauthAccessTokenService,

    @Inject(REQUEST_CONTEXT_SRV)
    private readonly requestContextSrv: RequestContextService,
  ) {}

  @Post()
  @Public()
  @UseGuards(AuthEmailGuard)
  async loginWithEmail(
    @Req() req: Request,
    @Body() body: LoginWithEmailDTO,
  ): Promise<LoginResponseEntity> {
    const program = Effect.gen(this, function* () {
      yield* Effect.logDebug('body', body);

      const accessToken = yield* this.oauthAccessTokenSrv.generate({
        email: body.email,
      });

      const reqCtx = yield* this.requestContextSrv.get(req);
      return yield* this.authSerializerSrv.loginResponse(reqCtx, accessToken);
    });

    return this.runtimeSrv.runPromise(program);
  }
}
