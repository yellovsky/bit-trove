// global modules
import { Module } from '@nestjs/common';

// common modules
import { CaslModule } from 'src/modules/casl';
import { RuntimeModule } from 'src/modules/runtime';

// local modules
import { JwtStrategy } from './auth-jwt.strategy';

@Module({
  imports: [RuntimeModule, CaslModule],
  providers: [JwtStrategy],
})
export class JwtAuthModule {}
