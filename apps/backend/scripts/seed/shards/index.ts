import type { PrismaClient } from '@generated/prisma';

import { seedFixTablerIconsViteBlogPost } from './fix-tabler-icons-vite.blog-post-seed';

export const shardsSeeder = {
  clear: async (tx: PrismaClient) => {
    await tx.shard.deleteMany();
    await tx.localizedShard.deleteMany();
  },
  seed: async (tx: PrismaClient) => {
    await seedFixTablerIconsViteBlogPost(tx);
  },
};
