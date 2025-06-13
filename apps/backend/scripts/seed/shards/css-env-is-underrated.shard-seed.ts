import type { PrismaClient } from '@generated/prisma';

import { testAccountId } from '../account.seed';

const contentJSON = {
  content: [
    {
      attrs: { textAlign: null },
      content: [
        { marks: [{ type: 'code' }], text: 'env()', type: 'text' },
        {
          text: ' in CSS is super useful for mobile layouts, especially on devices with notches or bottom bars.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    { attrs: { textAlign: null }, content: [{ text: 'Example:', type: 'text' }], type: 'paragraph' },
    {
      attrs: { language: 'css' },
      content: [{ text: 'padding-bottom: env(safe-area-inset-bottom);', type: 'text' }],
      type: 'codeBlock',
    },
    {
      attrs: { textAlign: null },
      content: [
        {
          text: 'No media queries, no messy hacks—just built-in support for safe zones. Perfect for PWAs and full-screen apps.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: { textAlign: null },
      content: [{ text: 'Not widely used yet, but it should be.', type: 'text' }],
      type: 'paragraph',
    },
  ],
  type: 'doc',
};

export const seedCssEnvIsUnderratedShard = async (tx: PrismaClient) => {
  const createdAt = new Date('Fri, 13 Jun 2025 07:46:51 GMT');
  const publishedAt = createdAt;

  const entry = await tx.shardEntry.create({
    data: {
      authorId: testAccountId,
      createdAt,
      publishedAt,
    },
  });

  await tx.shard.create({
    data: {
      authorId: testAccountId,
      contentJSON,
      createdAt,
      entryId: entry.id,
      languageCode: 'en',
      publishedAt,
      seoDescription:
        'Learn how env() helps with safe area insets in mobile browsers and why it’s useful for responsive design.',
      seoKeywords: 'css env, safe-area-inset, responsive design, mobile css, css tips',
      seoTitle: 'Why CSS env() Deserves More Attention',
      shortDescription: 'A quick look at how env() makes handling safe areas on mobile cleaner and easier.',
      slug: 'css-env-is-underrated',
      title: 'env() is underrated',
    },
  });
};
