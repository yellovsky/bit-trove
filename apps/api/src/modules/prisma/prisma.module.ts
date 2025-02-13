// global modules
import { Module } from '@nestjs/common';

// local modules
import { PrismaService } from './services/prisma.service';

@Module({
  exports: [PrismaService],
  providers: [PrismaService],
})
export class PrismaModule {}
