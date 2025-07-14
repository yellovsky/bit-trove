import type { PrismaClient } from '@generated/prisma';

export const articleRelationsSeeder = {
  clear: async (tx: PrismaClient) => {
    await tx.articleRelation.deleteMany();
  },
  seed: async (tx: PrismaClient) => {
    const localizationArticle = await tx.article.findUnique({ where: { slug: 'how-to-localize-remix-app' } });
    const spaWithSsrArticle = await tx.article.findUnique({
      where: { slug: 'react-router-building-spas-with-server-side-rendering' },
    });

    if (!localizationArticle || !spaWithSsrArticle) throw new Error('Articles not found');

    await tx.articleRelation.create({
      data: {
        order: 0,
        relationType: 'related',
        sourceId: localizationArticle.id,
        targetId: spaWithSsrArticle.id,
      },
    });
  },
};
