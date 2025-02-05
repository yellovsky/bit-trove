// global modules
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

// common modules
import { CaslModule } from 'src/modules/casl';
import { JwtGuard } from 'src/modules/auth-jwt';

// local modules
import { BlogPostsApiModule } from './blog-posts';
import { GuidesApiModule } from './guides';
import { RuntimeModule } from '../modules/runtime';

@Module({
  imports: [RuntimeModule, CaslModule, BlogPostsApiModule, GuidesApiModule],
  providers: [{ provide: APP_GUARD, useClass: JwtGuard }],
})
export class ApiModule {}
