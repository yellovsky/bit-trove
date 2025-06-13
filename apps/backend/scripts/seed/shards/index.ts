import type { PrismaClient } from '@generated/prisma';

import { seedCssEnvIsUnderratedShard } from './css-env-is-underrated.shard-seed';
import { seedFixTablerIconsViteShard } from './fix-tabler-icons-vite.shard-seed';

export const shardsSeeder = {
  clear: async (tx: PrismaClient) => {
    await tx.shard.deleteMany();
    await tx.shardEntry.deleteMany();
  },
  seed: async (tx: PrismaClient) => {
    await seedFixTablerIconsViteShard(tx);
    await seedCssEnvIsUnderratedShard(tx);
  },
};
