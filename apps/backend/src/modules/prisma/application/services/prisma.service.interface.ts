import type { PrismaClient } from '@generated/prisma';
import type { OnModuleInit } from '@nestjs/common';

import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';

export interface PrismaService extends PrismaClient, OnModuleInit {}

export const PRISMA_SRV = 'PRISMA_SRV' as InjectableIdentifier<PrismaClient>;
