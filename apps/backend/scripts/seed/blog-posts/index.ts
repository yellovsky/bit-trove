import type { PrismaClient } from '@generated/prisma';

import { seedLocalizationBlogPost } from './localization.blog-post-seed';

export const blogPostsSeeder = {
  clear: async (tx: PrismaClient) => {
    await tx.blogPost.deleteMany();
    await tx.blogPostEntry.deleteMany();
  },
  seed: async (tx: PrismaClient) => {
    await seedLocalizationBlogPost(tx);
  },
};
