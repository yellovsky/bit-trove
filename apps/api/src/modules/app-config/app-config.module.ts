// global modules
import { ConfigModule } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';

// local modules
import { APP_CONFIG_SRV } from './app-config.constants';
import { AppConfigServiceClass } from './app-config.service';

const serviceRef = {
  provide: APP_CONFIG_SRV,
  useClass: AppConfigServiceClass,
};

@Global()
@Module({
  exports: [serviceRef],
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [serviceRef],
})
export class AppConfigModule {}
