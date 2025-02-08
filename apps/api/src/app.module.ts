// global modules
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

// common modules
import { ApiModule } from 'src/api';
import { AppConfigModule } from 'src/modules/app-config';
import { PrismaModule } from 'src/modules/prisma';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    AppConfigModule,
    PrismaModule,
    ApiModule,
  ],
})
export class AppModule {}
