// global modules
import { Module } from '@nestjs/common';

// common modules
import { GuideModule } from 'src/modules/guide';
import { RuntimeModule } from 'src/modules/runtime';

// local modules
import { GuidesApiV1Controller } from './guides-api.controller-v1';

@Module({
  controllers: [GuidesApiV1Controller],
  imports: [RuntimeModule, GuideModule],
})
export class GuidesApiModule {}
