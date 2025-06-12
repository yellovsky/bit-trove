import { type ExecutionContext, Inject, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import type { Observable } from 'rxjs';

import { IS_PUBLIC_KEY } from 'src/shared/decorators/public';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  #logger = new Logger(JwtGuard.name);

  constructor(
    @Inject(Reflector)
    private readonly reflector: Reflector
  ) {
    super();
  }

  canActivate(context: ExecutionContext): Promise<boolean> | boolean | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);

    if (isPublic) {
      this.#logger.debug('JWT guard is public');
      return true;
    }

    this.#logger.debug('JWT guard is private');
    return super.canActivate(context);
  }
}
