// global modules
import { Module } from '@nestjs/common';

// common modules
import { CaslModule } from 'src/modules/casl';

// local modules
import { RequestContextService } from './services/request-context.service';

/**
 * The OauthModule is responsible for handling OAuth authentication within the application.
 * This module will typically include services, controllers, and other providers necessary
 * for managing OAuth flows, such as token generation, validation, and user authentication.
 */
@Module({
  exports: [RequestContextService],
  imports: [CaslModule],
  providers: [RequestContextService],
})
export class RequestContextModule {}
