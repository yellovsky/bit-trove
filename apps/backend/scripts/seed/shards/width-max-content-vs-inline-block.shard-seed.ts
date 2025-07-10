import type { PrismaClient } from '@generated/prisma';

import { testAccountId } from '../account.seed';

const contentJSON = {
  content: [
    {
      attrs: { textAlign: null },
      content: [
        { marks: [{ type: 'code' }], text: 'width: max-content', type: 'text' },
        {
          text: ' is often a better choice than ',
          type: 'text',
        },
        { marks: [{ type: 'code' }], text: 'display: inline-block', type: 'text' },
        {
          text: ' when you want an element to size itself to its content.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: { textAlign: null },
      content: [{ text: 'Why?', type: 'text' }],
      type: 'paragraph',
    },
    {
      attrs: { textAlign: null },
      content: [
        {
          text: 'With ',
          type: 'text',
        },
        { marks: [{ type: 'code' }], text: 'inline-block', type: 'text' },
        {
          text: ', the element still respects text alignment and can have unexpected spacing. ',
          type: 'text',
        },
        { marks: [{ type: 'code' }], text: 'width: max-content', type: 'text' },
        {
          text: ' gives you a block-level element that sizes to its content without the inline behavior quirks.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: { textAlign: null },
      content: [{ text: 'Example:', type: 'text' }],
      type: 'paragraph',
    },
    {
      attrs: { language: 'css' },
      content: [
        {
          text: '/* Instead of this */\n.button {\n  display: inline-block;\n  padding: 0.5rem 1rem;\n}\n\n/* Use this */\n.button {\n  width: max-content;\n  padding: 0.5rem 1rem;\n}',
          type: 'text',
        },
      ],
      type: 'codeBlock',
    },
    {
      attrs: { textAlign: null },
      content: [
        {
          text: 'The result? Cleaner layout behavior, no unexpected whitespace issues, and more predictable sizing.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
  ],
  type: 'doc',
};

export const seedWidthMaxContentVsInlineBlockShard = async (tx: PrismaClient) => {
  const createdAt = new Date('2025-05-03T21:00:00.000Z');
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
        'Learn why width: max-content is often better than display: inline-block for content-sized elements in CSS.',
      seoKeywords: 'css, width max-content, inline-block, layout, responsive design, css tips',
      seoTitle: 'width: max-content vs display: inline-block - CSS Layout Tips',
      shortDescription:
        'A quick comparison of two CSS approaches for content-sized elements and why max-content often wins.',
      slug: 'width-max-content-vs-inline-block',
      title: 'width: max-content instead of display: inline-block',
    },
  });
};
