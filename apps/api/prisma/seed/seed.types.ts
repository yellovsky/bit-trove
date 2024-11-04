// global modules
import type { DefaultArgs } from '@prisma/client/runtime/library';
import type { Effect } from 'effect';
import type { Prisma, PrismaClient } from '@prisma/client';

export type PrismaTransaction = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

export interface Seeder {
  seed(tx: PrismaTransaction): Effect.Effect<void, Error>;
  clear?: (tx: PrismaTransaction) => Effect.Effect<void, Error>;
}
