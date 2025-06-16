import type { PrismaClient } from '@generated/prisma';

const seedTags = async (tx: PrismaClient) =>
  tx.tag.createMany({
    data: [
      { name: 'CSS' },
      { name: 'JavaScript' },
      { name: 'React' },
      { name: 'Tailwind CSS' },
      { name: 'TypeScript' },
      { name: 'Node.js' },
      { name: 'Idea' },
      { name: 'Vite' },
      { name: 'i18n' },
    ],
  });

export const tagsSeeder = {
  clear: async (tx: PrismaClient) => {
    await tx.tag.deleteMany();
  },
  seed: async (tx: PrismaClient) => {
    await seedTags(tx);
  },
};
