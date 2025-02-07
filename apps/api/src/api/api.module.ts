// global modules
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

// common modules
import { CaslModule } from 'src/modules/casl';
import { JwtGuard } from 'src/modules/auth-jwt';
import { RuntimeModule } from 'src/modules/runtime';

// local modules
import { BlogPostsApiModule } from './blog-posts';
import { TutorialsApiModule } from './tutorials';

@Module({
  imports: [RuntimeModule, CaslModule, BlogPostsApiModule, TutorialsApiModule],
  providers: [{ provide: APP_GUARD, useClass: JwtGuard }],
})
export class ApiModule {}
