import type { PrismaClient } from '@generated/prisma';

export const cssTagId = 'b533421b-0028-46fe-a9ef-025575f8a942';
export const jsTagId = 'a1b1baf8-d33b-4dc3-84bc-dddea4cdd1c8';
export const reactTagId = '34cb3cc8-2b28-4319-a14b-7cdbcadbd793';
export const tailwindTagId = 'c8d59eca-490b-444c-9a5c-2c0365dbec5f';
export const tsTagId = 'bc40dc7d-9bd9-430f-add2-11c8f6793632';
export const nodeTagId = '82394b48-1de0-487d-a15a-bfdc3cfeb356';
export const ideaTagId = '95fe2c9d-0797-49af-866a-c5d0081cd4bf';
export const viteTagId = '9567ca40-acc9-4b69-88a8-c1ef27b9fcec';
export const i18nTagId = '5ef91799-895d-45c1-846b-c0a26f67da07';

const seedTags = async (tx: PrismaClient) =>
  tx.tag.createMany({
    data: [
      { id: cssTagId, name: 'CSS', slug: 'css' },
      { id: jsTagId, name: 'JavaScript', slug: 'javascript' },
      { id: reactTagId, name: 'React', slug: 'react' },
      { id: tailwindTagId, name: 'Tailwind CSS', slug: 'tailwind-css' },
      { id: tsTagId, name: 'TypeScript', slug: 'typescript' },
      { id: nodeTagId, name: 'Node.js', slug: 'node-js' },
      { id: ideaTagId, name: 'Idea', slug: 'idea' },
      { id: viteTagId, name: 'Vite', slug: 'vite' },
      { id: i18nTagId, name: 'i18n', slug: 'i18n' },
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
