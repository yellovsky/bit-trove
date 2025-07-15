import { PrismaClient } from '@generated/prisma';
import { Injectable } from '@nestjs/common';

import type { PrismaService } from './prisma.service.interface';

@Injectable()
export class PrismaServiceImpl extends PrismaClient implements PrismaService {
  async onModuleInit() {
    await this.$connect();
  }
}
