// global modules
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

// common modules
import { AppConfigModule } from 'src/modules/app-config';

// local modules
import { OauthAccessTokenServiceClass } from './oauth.access-token';
import { OauthBcryptServiceClass } from './oauth.bcrypt-service';
import { OAUTH_ACCESS_TOKEN_SRV, OAUTH_BCRYPT_SRV } from './oauth.constants';

const bcryptServiceRef = {
  provide: OAUTH_BCRYPT_SRV,
  useClass: OauthBcryptServiceClass,
};

const jwtServiceRef = {
  provide: OAUTH_ACCESS_TOKEN_SRV,
  useClass: OauthAccessTokenServiceClass,
};

/**
 * The OauthModule is responsible for handling OAuth authentication within the application.
 * This module will typically include services, controllers, and other providers necessary
 * for managing OAuth flows, such as token generation, validation, and user authentication.
 */
@Module({
  exports: [bcryptServiceRef, jwtServiceRef],
  imports: [AppConfigModule, JwtModule],
  providers: [bcryptServiceRef, jwtServiceRef],
})
export class OauthModule {}
