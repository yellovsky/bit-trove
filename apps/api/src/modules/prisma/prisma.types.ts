// global modules
import { PrismaClient } from '@prisma/client';

export interface PrismaService extends PrismaClient {}
export const PRISMA_SRV = 'PRISMA_SRV';
