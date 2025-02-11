// global modules
import { addDays } from 'date-fns';
import { ApiTags } from '@nestjs/swagger';
import { Effect } from 'effect';
import type { Request, Response } from 'express';

import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

// common modules
import { IsAuthorizedResponseEntity } from 'src/entities/auth';
import { Public } from 'src/utils/access-control';
import { ACCESS_TOKEN_COOKIE_KEY, AuthEmailGuard } from 'src/modules/auth';
import { RUNTIME_SRV, type RuntimeService } from 'src/modules/runtime';

import {
  OAUTH_ACCESS_TOKEN_SRV,
  type OauthAccessTokenService,
} from 'src/modules/oauth';

// local modules
import { LoginWithEmailDTO } from './dto/login-with-email.dto';
import { StatusSuccessResponseEntity } from '../../entities/status-success';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthApiV1Controller {
  constructor(
    @Inject(RUNTIME_SRV)
    private readonly runtimeSrv: RuntimeService,

    @Inject(OAUTH_ACCESS_TOKEN_SRV)
    private readonly oauthAccessTokenSrv: OauthAccessTokenService,
  ) {}

  @Post('login')
  @Public()
  @UseGuards(AuthEmailGuard)
  async loginWithEmail(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() body: LoginWithEmailDTO,
  ): Promise<StatusSuccessResponseEntity> {
    const program = Effect.gen(this, function* () {
      yield* Effect.logDebug('body', body);

      const accessToken = yield* this.oauthAccessTokenSrv.generate({
        email: body.email,
      });

      res.cookie(ACCESS_TOKEN_COOKIE_KEY, accessToken, {
        domain: '127.0.0.1',
        expires: addDays(Date.now(), 7),
        httpOnly: true,
        sameSite: 'lax',
      });

      return new StatusSuccessResponseEntity();
    });

    return this.runtimeSrv.runPromise(program);
  }

  @Get('is-authorized')
  @Public()
  async isAuthorized(@Req() req: Request): Promise<IsAuthorizedResponseEntity> {
    const isAuthorized = !!req.cookies?.[ACCESS_TOKEN_COOKIE_KEY];
    return new IsAuthorizedResponseEntity(isAuthorized);
  }

  @Post('logout')
  async logout(
    @Res({ passthrough: true }) res: Response,
  ): Promise<StatusSuccessResponseEntity> {
    res.cookie(ACCESS_TOKEN_COOKIE_KEY, '', { expires: new Date(Date.now()) });
    return new StatusSuccessResponseEntity();
  }
}
