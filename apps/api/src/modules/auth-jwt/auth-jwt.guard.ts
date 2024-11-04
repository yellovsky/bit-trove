// global modules
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Effect, Either } from 'effect';

import {
  type CanActivate,
  type ExecutionContext,
  Inject,
  Injectable,
  SetMetadata,
} from '@nestjs/common';

// common modules
import { UnauthorizedAPIError } from 'src/exceptions';
import { CASL_SRV, type CaslService } from 'src/modules/casl';
import { RUNTIME_SRV, RuntimeService } from 'src/modules/runtime';

const IS_PUBLIC_KEY = 'IS_PUBLIC';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class JwtGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(RUNTIME_SRV) private readonly runtimeSrv: RuntimeService,
    @Inject(CASL_SRV) private readonly caslSrv: CaslService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const checkSuperActivate = () => super.canActivate(context);

    const program = Effect.gen(this, function* () {
      const request = context.switchToHttp().getRequest();

      const isPublic = !!this.reflector.get<boolean>(
        IS_PUBLIC_KEY,
        context.getHandler(),
      );

      request.ability = this.caslSrv.getAppAbility(
        isPublic ? null : request.user,
      );

      if (isPublic) return true;

      const eitherCanActivate = yield* Effect.either(
        Effect.tryPromise(async () => checkSuperActivate()),
      );

      if (Either.isLeft(eitherCanActivate)) {
        return yield* new UnauthorizedAPIError({});
      }

      return true;
    });

    return this.runtimeSrv.runPromise(program);
  }
}
