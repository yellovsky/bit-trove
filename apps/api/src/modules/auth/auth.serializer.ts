// global modules
import { Effect } from 'effect';
import { Injectable } from '@nestjs/common';

// common modules
import type { ApiError } from 'src/exceptions';
import { LoginResponseEntity } from '../../entities/auth';
import type { SerializerContext } from 'src/types/context';

// local modules
import type { AuthSerializerService } from './auth.types';

@Injectable()
export class AuthSerializerServiceClass implements AuthSerializerService {
  loginResponse(
    _ctx: SerializerContext,
    access_token: string,
  ): Effect.Effect<LoginResponseEntity, ApiError> {
    return Effect.gen(function* () {
      return new LoginResponseEntity({ meta: { access_token } });
    });
  }
}
