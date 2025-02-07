// global modules
import { Module } from '@nestjs/common';

// common modules
import { RuntimeModule } from 'src/modules/runtime';
import { TutorialModule } from 'src/modules/tutorial';

// local modules
import { TutorialsApiV1Controller } from './tutorials-api.controller-v1';

@Module({
  controllers: [TutorialsApiV1Controller],
  imports: [RuntimeModule, TutorialModule],
})
export class TutorialsApiModule {}
