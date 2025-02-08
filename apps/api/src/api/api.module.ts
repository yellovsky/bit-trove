// global modules
import { Module } from '@nestjs/common';

// common modules
import { CaslModule } from 'src/modules/casl';
import { RuntimeModule } from 'src/modules/runtime';

// local modules
import { AuthApiModule } from './auth';
import { BlogPostsApiModule } from './blog-posts';
import { TutorialsApiModule } from './tutorials';

@Module({
  imports: [
    RuntimeModule,
    CaslModule,
    BlogPostsApiModule,
    TutorialsApiModule,
    AuthApiModule,
  ],
})
export class ApiModule {}
