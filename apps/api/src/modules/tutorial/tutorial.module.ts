// global modules
import { Module } from '@nestjs/common';

// common modules
import { ArticleModule } from 'src/modules/article';
import { PrismaModule } from 'src/modules/prisma';

// local modules
import { TutorialAccessControlServiceClass } from './tutorial.access-control';
import { TutorialPublishingrServiceClass } from './tutorial.publishing';
import { TutorialRepositoryServiceClass } from './tutorial.repository';
import { TutorialSerializerServiceClass } from './tutorial.serializer';
import { TutorialServiceClass } from './tutorial.service';

import {
  TUTORIAL_ACCESS_CONTROL_SRV,
  TUTORIAL_PUBLISHING_SRV,
  TUTORIAL_REPOSITORY_SRV,
  TUTORIAL_SERIALIZER_SRV,
  TUTORIAL_SRV,
} from './tutorial.constants';

const repositoryRef = {
  provide: TUTORIAL_REPOSITORY_SRV,
  useClass: TutorialRepositoryServiceClass,
};

const accessControlRef = {
  provide: TUTORIAL_ACCESS_CONTROL_SRV,
  useClass: TutorialAccessControlServiceClass,
};

const publishingRef = {
  provide: TUTORIAL_PUBLISHING_SRV,
  useClass: TutorialPublishingrServiceClass,
};

const serializerRef = {
  provide: TUTORIAL_SERIALIZER_SRV,
  useClass: TutorialSerializerServiceClass,
};

const serviceRef = {
  provide: TUTORIAL_SRV,
  useClass: TutorialServiceClass,
};

@Module({
  exports: [serializerRef, serviceRef],
  imports: [PrismaModule, ArticleModule],
  providers: [
    repositoryRef,
    accessControlRef,
    publishingRef,
    serializerRef,
    serviceRef,
  ],
})
export class TutorialModule {}
