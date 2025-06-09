import { faker } from '@faker-js/faker';
import type { PrismaClient } from '@generated/prisma';

import { seedLocalizationBlogPost } from './localization.blog-post-seed';

const seedThreeLocalesBlogPosts = async (tx: PrismaClient) => {
  const publishedAt = Date.now();

  await tx.blogPost.create({
    data: {
      localizations: {
        createMany: {
          data: [
            {
              languageCode: 'en',
              publishedAt: new Date(publishedAt),
              seoDescription: faker.lorem.sentence(),
              seoKeywords: faker.lorem.words().split(' ').join(', '),
              seoTitle: faker.lorem.sentence(),
              shortDescription: faker.lorem.sentence(),
              title: `${faker.lorem.sentence()} - [en]`,
              updatedAt: faker.date.past(),
            },
            {
              languageCode: 'ru',
              publishedAt: new Date(publishedAt + 1000),
              seoDescription: faker.lorem.sentence(),
              seoKeywords: faker.lorem.words().split(' ').join(', '),
              seoTitle: faker.lorem.sentence(),
              shortDescription: faker.lorem.sentence(),
              title: 'русский текст - [ru]',
              updatedAt: faker.date.past(),
            },
            {
              languageCode: 'es',
              publishedAt: new Date(publishedAt + 2000),
              seoDescription: faker.lorem.sentence(),
              seoKeywords: faker.lorem.words().split(' ').join(', '),
              seoTitle: faker.lorem.sentence(),
              shortDescription: faker.lorem.sentence(),
              title: `${faker.lorem.sentence()} - [es]`,
              updatedAt: faker.date.past(),
            },
          ],
        },
      },
      publishedAt: new Date(publishedAt),
      slug: 'three-locales-post',
    },
  });
};

const seedTestBlogPosts = async (tx: PrismaClient) => {
  const publishedAt = Date.now();

  const author = await tx.account.findFirst({
    where: { authProviders: { some: { email: 'test@email.com' } } },
  });

  if (!author) return;

  const createdAt = Date.now();

  await tx.blogPost.create({
    data: {
      authorId: author.id,

      localizations: {
        createMany: {
          data: [
            {
              createdAt: new Date(createdAt),
              languageCode: 'en',
              publishedAt: new Date(publishedAt + 2000),
              seoDescription: faker.lorem.sentence(),
              seoKeywords: faker.lorem.words().split(' ').join(', '),
              seoTitle: faker.lorem.sentence(),
              shortDescription: faker.lorem.sentence(),
              title: `${faker.lorem.sentence()} - [en]`,
              updatedAt: faker.date.past(),
            },
            {
              createdAt: new Date(createdAt + 1000),
              languageCode: 'ru',
              publishedAt: new Date(publishedAt + 3000),
              seoDescription: faker.lorem.sentence(),
              seoKeywords: faker.lorem.words().split(' ').join(', '),
              seoTitle: faker.lorem.sentence(),
              shortDescription: faker.lorem.sentence(),
              title: 'русский текст - [ru]',
              updatedAt: faker.date.past(),
            },
            {
              createdAt: new Date(createdAt + 2000),
              languageCode: 'es',
              publishedAt: new Date(publishedAt + 4000),
              seoDescription: faker.lorem.sentence(),
              seoKeywords: faker.lorem.words().split(' ').join(', '),
              seoTitle: faker.lorem.sentence(),
              shortDescription: faker.lorem.sentence(),
              title: `${faker.lorem.sentence()} - [es]`,
              updatedAt: faker.date.past(),
            },
          ],
        },
      },
      publishedAt: new Date(publishedAt + 1000),
      slug: 'post-1',
    },
  });

  await tx.blogPost.create({
    data: {
      authorId: author.id,
      localizations: {
        createMany: {
          data: [
            {
              createdAt: new Date(createdAt + 7000),
              languageCode: 'en',
              publishedAt: new Date(publishedAt + 6000),
              seoDescription: faker.lorem.sentence(),
              seoKeywords: faker.lorem.words().split(' ').join(', '),
              seoTitle: faker.lorem.sentence(),
              shortDescription: faker.lorem.sentence(),
              title: `${faker.lorem.sentence()} - [en]`,
              updatedAt: faker.date.past(),
            },
            {
              createdAt: new Date(createdAt + 5000),
              languageCode: 'ru',
              publishedAt: new Date(publishedAt + 7000),
              seoDescription: faker.lorem.sentence(),
              seoKeywords: faker.lorem.words().split(' ').join(', '),
              seoTitle: faker.lorem.sentence(),
              shortDescription: faker.lorem.sentence(),
              title: 'а русский текст - [ru]',
              updatedAt: faker.date.past(),
            },
            {
              createdAt: new Date(createdAt + 6000),
              languageCode: 'es',
              publishedAt: new Date(publishedAt + 8000),
              seoDescription: faker.lorem.sentence(),
              seoKeywords: faker.lorem.words().split(' ').join(', '),
              seoTitle: faker.lorem.sentence(),
              shortDescription: faker.lorem.sentence(),
              title: `${faker.lorem.sentence()} - [es]`,
              updatedAt: faker.date.past(),
            },
          ],
        },
      },
      publishedAt: new Date(publishedAt + 5000),
      slug: 'post-3',
    },
  });

  await tx.blogPost.create({
    data: {
      authorId: author.id,
      localizations: {
        createMany: {
          data: [
            {
              createdAt: new Date(createdAt + 3000),
              languageCode: 'en',
              publishedAt: new Date(publishedAt + 10000),
              seoDescription: faker.lorem.sentence(),
              seoKeywords: faker.lorem.words().split(' ').join(', '),
              seoTitle: faker.lorem.sentence(),
              shortDescription: faker.lorem.sentence(),
              title: `${faker.lorem.sentence()} - [en]`,
              updatedAt: faker.date.past(),
            },
            {
              createdAt: new Date(createdAt + 4000),
              languageCode: 'es',
              publishedAt: new Date(publishedAt + 11000),
              seoDescription: faker.lorem.sentence(),
              seoKeywords: faker.lorem.words().split(' ').join(', '),
              seoTitle: faker.lorem.sentence(),
              shortDescription: faker.lorem.sentence(),
              title: `${faker.lorem.sentence()} - [es]`,
              updatedAt: faker.date.past(),
            },
          ],
        },
      },
      publishedAt: new Date(publishedAt + 9000),
      slug: 'post-2',
    },
  });
};

export const blogPostsSeeder = {
  clear: async (tx: PrismaClient) => {
    await tx.blogPost.deleteMany();
    await tx.localizedBlogPost.deleteMany();
  },
  seed: async (tx: PrismaClient) => {
    await seedLocalizationBlogPost(tx);
    await seedThreeLocalesBlogPosts(tx);
    await seedTestBlogPosts(tx);
  },
};
