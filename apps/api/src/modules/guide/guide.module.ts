// global modules
import { Module } from '@nestjs/common';

// common modules
import { ArticleModule } from 'src/modules/article';
import { PrismaModule } from 'src/modules/prisma';

// local modules
import { GuideAccessControlServiceClass } from './guide.access-control';
import { GuidePublishingrServiceClass } from './guide.publishing';
import { GuideRepositoryServiceClass } from './guide.repository';
import { GuideSerializerServiceClass } from './guide.serializer';
import { GuideServiceClass } from './guide.service';

import {
  GUIDE_ACCESS_CONTROL_SRV,
  GUIDE_PUBLISHING_SRV,
  GUIDE_REPOSITORY_SRV,
  GUIDE_SERIALIZER_SRV,
  GUIDE_SRV,
} from './guide.constants';

const repositoryRef = {
  provide: GUIDE_REPOSITORY_SRV,
  useClass: GuideRepositoryServiceClass,
};

const accessControlRef = {
  provide: GUIDE_ACCESS_CONTROL_SRV,
  useClass: GuideAccessControlServiceClass,
};

const publishingRef = {
  provide: GUIDE_PUBLISHING_SRV,
  useClass: GuidePublishingrServiceClass,
};

const serializerRef = {
  provide: GUIDE_SERIALIZER_SRV,
  useClass: GuideSerializerServiceClass,
};

const serviceRef = {
  provide: GUIDE_SRV,
  useClass: GuideServiceClass,
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
export class GuideModule {}
