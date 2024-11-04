// global modules
import { Module } from '@nestjs/common';

// local modules
import { PRISMA_SRV } from './prisma.types';
import { PrismaServiceClass } from './prisma.service';

@Module({
  exports: [{ provide: PRISMA_SRV, useClass: PrismaServiceClass }],
  providers: [{ provide: PRISMA_SRV, useClass: PrismaServiceClass }],
})
export class PrismaModule {}
