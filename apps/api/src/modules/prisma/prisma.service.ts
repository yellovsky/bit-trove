// global modules
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaServiceClass extends PrismaClient {
  constructor() {
    super({
      log: ['info', 'warn', 'error'],
    });
  }
}
