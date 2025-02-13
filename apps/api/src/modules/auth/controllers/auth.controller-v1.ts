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
import { Public } from 'src/utils/access-control';
import { RuntimeService } from 'src/modules/runtime';
import { StatusSuccessResponseEntity } from 'src/common/entities/status-success';

// local modules
import { ACCESS_TOKEN_COOKIE_KEY } from '../strategies/jwt.strategy';
import { AccessTokenService } from '../services/access-token.service';
import { IsAuthorizedResponseEntity } from '../entities/is-authorized-response.entity';
import { LocalGuard } from '../guards/local.guard';
import { LoginWithEmailDTO } from '../dto/login-with-email.dto';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthV1Controller {
  constructor(
    @Inject()
    private readonly runtimeSrv: RuntimeService,

    @Inject()
    private readonly accessTokenSrv: AccessTokenService,
  ) {}

  @Post('login')
  @Public()
  @UseGuards(LocalGuard)
  async loginWithEmail(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() body: LoginWithEmailDTO,
  ): Promise<StatusSuccessResponseEntity> {
    const program = Effect.gen(this, function* () {
      yield* Effect.logDebug('body', body);

      const accessToken = yield* this.accessTokenSrv.generate({
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
