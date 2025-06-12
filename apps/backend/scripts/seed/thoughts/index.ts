import type { PrismaClient } from '@generated/prisma';

import { seedFixTablerIconsViteBlogPost } from './fix-tabler-icons-vite.blog-post-seed';

export const thoughtsSeeder = {
  clear: async (tx: PrismaClient) => {
    await tx.thought.deleteMany();
    await tx.localizedThought.deleteMany();
  },
  seed: async (tx: PrismaClient) => {
    await seedFixTablerIconsViteBlogPost(tx);
  },
};
