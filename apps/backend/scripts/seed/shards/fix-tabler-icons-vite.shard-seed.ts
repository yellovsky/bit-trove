import type { PrismaClient } from '@generated/prisma';

import { testAccountId } from '../account.seed';

const contentJSON = {
  content: [
    {
      attrs: { textAlign: null },
      content: [
        { text: 'If you’re using ', type: 'text' },
        { marks: [{ type: 'code' }], text: '@tabler/icons-react', type: 'text' },
        {
          text: ' in a Vite + React project and you’re noticing a lot of network requests for individual icon files, you’re not alone. This usually happens because each icon is treated as a separate chunk, especially when combined with React Router and code splitting.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: { textAlign: null },
      content: [
        {
          text: 'There’s a quick workaround for this. You can set up an alias in your Vite config that points to the ',
          type: 'text',
        },
        { marks: [{ type: 'italic' }], text: 'static export', type: 'text' },
        { text: ' version of the icon package. Like this:', type: 'text' },
      ],
      type: 'paragraph',
    },
    {
      attrs: { language: 'js' },
      content: [
        {
          text: "export default defineConfig({\n  plugins: [react()],\n  resolve: {\n    alias: {\n      // This version exports all icons statically, so Vite won't create separate chunks for each one\n      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',\n    },\n  },\n})",
          type: 'text',
        },
      ],
      type: 'codeBlock',
    },
    {
      attrs: { textAlign: null },
      content: [{ text: 'This reduces the number of requests and can speed things up.', type: 'text' }],
      type: 'paragraph',
    },
    {
      attrs: { textAlign: null },
      content: [
        {
          text: 'But heads up: this approach relies heavily on tree shaking to keep your bundle size small. So if your setup doesn’t handle tree shaking well, it might end up pulling in more icons than you actually use.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: { textAlign: null },
      content: [{ text: 'Not perfect, but better than hundreds of small requests.', type: 'text' }],
      type: 'paragraph',
    },
  ],
  type: 'doc',
};

export const seedFixTablerIconsViteShard = async (tx: PrismaClient) => {
  const createdAt = new Date('2025-06-12T19:00:32.618Z');
  const publishedAt = null;

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
        'Learn how to reduce the number of network requests when using @tabler/icons-react with Vite and React Router.',
      seoKeywords: 'vite, tabler, icons, react, optimization, alias, tree shaking',
      seoTitle: 'How to Fix Excessive Requests from Tabler Icons in Vite',
      shortDescription:
        'Reduce network requests in Vite when using @tabler/icons-react by aliasing to the static export. Just watch out—it relies on tree shaking to avoid bloating your bundle.',
      slug: 'fix-tabler-icons-vite',
      title: 'Too Many Tabler Icons? Here’s a Quick Fix',
    },
  });
};
