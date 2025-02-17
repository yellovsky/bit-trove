// global modules
import { Module } from '@nestjs/common';

// common modules
import { ArticleModule } from 'src/modules/article';
import { CasbinModule } from 'src/modules/casbin';
import { DrizzleModule } from 'src/modules/drizzle';
import { RuntimeModule } from 'src/modules/runtime';

// local modules
import { CMSTutorialsV1Controller } from './controllers/cms-tutorials.controller-v1';
import { TutorialAccessService } from './services/tutorial-access.service';
import { TutorialObfuscationService } from './services/tutorial-obfuscation.service';
import { TutorialRepository } from './repositories/tutorial.repository';
import { TutorialSerializerService } from './services/tutorial-serializer.service';
import { TutorialService } from './services/tutorial.service';
import { TutorialsV1Controller } from './controllers/tutorials.controller-v1';
import { TutorialTranslationService } from './services/tutorial-translation.service';

@Module({
  controllers: [CMSTutorialsV1Controller, TutorialsV1Controller],
  exports: [TutorialService],
  imports: [DrizzleModule, RuntimeModule, ArticleModule, CasbinModule],
  providers: [
    TutorialSerializerService,
    TutorialRepository,
    TutorialTranslationService,
    TutorialService,
    TutorialObfuscationService,
    TutorialAccessService,
  ],
})
export class TutorialModule {}
