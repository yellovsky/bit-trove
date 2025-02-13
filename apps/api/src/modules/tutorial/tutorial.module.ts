// global modules
import { Module } from '@nestjs/common';

// common modules
import { ArticleModule } from 'src/modules/article';
import { PrismaModule } from 'src/modules/prisma';
import { RequestContextModule } from 'src/modules/request-context';
import { RuntimeModule } from 'src/modules/runtime';

// local modules
import { CMSTutorialsV1Controller } from './controllers/cms-tutorials.controller-v1';
import { TutorialAccessControlService } from './services/tutorial-access-control.service';
import { TutorialPublishingrService } from './services/tutorial-publishing.service';
import { TutorialRepositoryService } from './repositories/tutorial.repository';
import { TutorialService } from './services/tutorial.service';
import { TutorialsV1Controller } from './controllers/tutorials.controller-v1';

@Module({
  controllers: [CMSTutorialsV1Controller, TutorialsV1Controller],
  exports: [TutorialService],
  imports: [RuntimeModule, RequestContextModule, PrismaModule, ArticleModule],
  providers: [
    TutorialRepositoryService,
    TutorialAccessControlService,
    TutorialPublishingrService,
    TutorialService,
  ],
})
export class TutorialModule {}
