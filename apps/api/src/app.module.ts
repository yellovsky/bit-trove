// global modules
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

// common modules
import { AppConfigModule } from 'src/modules/app-config';
import { BlogPostModule } from 'src/modules/blog-post';
import { PrismaModule } from 'src/modules/prisma';
import { RequestContextModule } from 'src/modules/request-context';
import { RuntimeModule } from 'src/modules/runtime';
import { TutorialModule } from 'src/modules/tutorial';
import { AuthModule, JwtGuard, JwtStrategy } from 'src/modules/auth';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    RuntimeModule,
    AppConfigModule,
    PrismaModule,
    AuthModule,
    RequestContextModule,
    TutorialModule,
    BlogPostModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtGuard }, JwtStrategy],
})
export class AppModule {}
