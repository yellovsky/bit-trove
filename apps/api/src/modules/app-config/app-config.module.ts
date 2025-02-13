// global modules
import { ConfigModule } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';

// local modules
import { AppConfigService } from './services/app-config.service';

@Global()
@Module({
  exports: [AppConfigService],
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [AppConfigService],
})
export class AppConfigModule {}
