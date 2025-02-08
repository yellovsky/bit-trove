// global modules
import { Module } from '@nestjs/common';

// common modules
import { CaslModule } from 'src/modules/casl';

// local modules
import { REQUEST_CONTEXT_SRV } from './request-context.constants';
import { RequestContextServiceClass } from './request-context.service';

const serviceRef = {
  provide: REQUEST_CONTEXT_SRV,
  useClass: RequestContextServiceClass,
};

/**
 * The OauthModule is responsible for handling OAuth authentication within the application.
 * This module will typically include services, controllers, and other providers necessary
 * for managing OAuth flows, such as token generation, validation, and user authentication.
 */
@Module({
  exports: [serviceRef],
  imports: [CaslModule],
  providers: [serviceRef],
})
export class RequestContextModule {}
