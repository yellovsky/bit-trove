import { Module } from '@nestjs/common';

import { PrismaServiceImpl } from './application/services/prisma.service';
import { PRISMA_SRV } from './application/services/prisma.service.interface';
import { TransactionServiceImpl } from './application/services/transaction.service';
import { TRANSACTION_SRV } from './application/services/transaction.service.interface';

@Module({
  exports: [PRISMA_SRV, TRANSACTION_SRV],
  providers: [
    { provide: PRISMA_SRV, useClass: PrismaServiceImpl },
    { provide: TRANSACTION_SRV, useClass: TransactionServiceImpl },
  ],
})
export class PrismaModule {}
