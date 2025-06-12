import type { PrismaClient } from '@generated/prisma';
import * as bcrypt from 'bcrypt';

const ROUNDS_OF_HASHING = 10;

export const testAccountId = '325e5751-784d-4f6c-a75d-f1bb6153b879';
export const testProfileId = '57fc1df9-c4e8-4bf6-9050-3936ed628298';

const seedTestUser = async (tx: PrismaClient) => {
  await tx.account.create({
    data: {
      authProviders: {
        createMany: {
          data: [
            {
              email: 'test@email.com',
              passwordHash: await bcrypt.hash('password', ROUNDS_OF_HASHING),
              providerType: 'EMAIL',
            },
          ],
        },
      },
      id: testAccountId,
      profiles: {
        createMany: {
          data: [
            {
              id: testProfileId,
              isRoot: true,
              name: 'Test',
            },
          ],
        },
      },
    },
  });

  await tx.casbinRule.createMany({
    data: [
      { ptype: 'g', v0: testAccountId, v1: 'admin' },
      { ptype: 'g', v0: testProfileId, v1: testAccountId },
    ],
  });
};

export const accountsSeeder = {
  clear: (tx: PrismaClient) => tx.account.deleteMany(),

  seed: async (tx: PrismaClient) => {
    await seedTestUser(tx);
  },
};
