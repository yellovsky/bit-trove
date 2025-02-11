// global modules
import { Module } from '@nestjs/common';

// common modules
import { RequestContextModule } from 'src/modules/request-context';
import { RuntimeModule } from 'src/modules/runtime';
import { TutorialModule } from 'src/modules/tutorial';

// local modules
import { CMSTutorialsApiV1Controller } from './cms-tutorials-api.controller-v1';

@Module({
  controllers: [CMSTutorialsApiV1Controller],
  imports: [RequestContextModule, RuntimeModule, TutorialModule],
})
export class CMSTutorialsApiModule {}
