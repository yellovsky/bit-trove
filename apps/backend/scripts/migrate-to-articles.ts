/* eslint-disable no-console */
import { PrismaClient } from '@generated/prisma';

const prisma = new PrismaClient();

async function migrateToArticles() {
  console.log('Starting migration to unified articles table...');

  try {
    // Migrate blog posts to articles
    console.log('Migrating blog posts...');
    const blogPosts = await prisma.blogPost.findMany({
      include: {
        entry: true,
        tags: {
          include: {
            tag: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    for (const blogPost of blogPosts) {
      // Create article entry if it doesn't exist
      let articleEntry = await prisma.articleEntry.findUnique({
        where: { id: blogPost.entryId },
      });

      if (!articleEntry) {
        articleEntry = await prisma.articleEntry.create({
          data: {
            authorId: blogPost.entry.authorId,
            createdAt: blogPost.entry.createdAt,
            id: blogPost.entryId,
            publishedAt: blogPost.entry.publishedAt,
            updatedAt: blogPost.entry.updatedAt,
          },
        });
      }

      // Create article
      const article = await prisma.article.create({
        data: {
          authorId: blogPost.authorId,
          contentJSON: blogPost.contentJSON || undefined,
          createdAt: blogPost.createdAt,
          entryId: blogPost.entryId,
          id: blogPost.id,
          languageCode: blogPost.languageCode,
          metadata: {},
          publishedAt: blogPost.publishedAt,
          readingTime: blogPost.readingTime,
          seoDescription: blogPost.seoDescription,
          seoKeywords: blogPost.seoKeywords,
          seoTitle: blogPost.seoTitle,
          shortDescription: blogPost.shortDescription,
          slug: blogPost.slug,
          title: blogPost.title,
          type: 'blog_post', // Empty metadata for blog posts
          updatedAt: blogPost.updatedAt,
        },
      });

      // Migrate tags
      for (const blogPostTag of blogPost.tags) {
        await prisma.articleTag.create({
          data: {
            articleId: article.id,
            order: blogPostTag.order,
            tagId: blogPostTag.tagId,
          },
        });
      }

      console.log(`Migrated blog post: ${blogPost.slug}`);
    }

    // Migrate shards to articles
    console.log('Migrating shards...');
    const shards = await prisma.shard.findMany({
      include: {
        entry: true,
        tags: {
          include: {
            tag: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    for (const shard of shards) {
      // Create article entry if it doesn't exist
      let articleEntry = await prisma.articleEntry.findUnique({
        where: { id: shard.entryId },
      });

      if (!articleEntry) {
        articleEntry = await prisma.articleEntry.create({
          data: {
            authorId: shard.entry.authorId,
            createdAt: shard.entry.createdAt,
            id: shard.entryId,
            publishedAt: shard.entry.publishedAt,
            updatedAt: shard.entry.updatedAt,
          },
        });
      }

      // Create article
      const article = await prisma.article.create({
        data: {
          authorId: shard.authorId,
          contentJSON: shard.contentJSON || undefined,
          createdAt: shard.createdAt,
          entryId: shard.entryId,
          id: shard.id,
          languageCode: shard.languageCode,
          metadata: {},
          publishedAt: shard.publishedAt,
          readingTime: shard.readingTime,
          seoDescription: shard.seoDescription,
          seoKeywords: shard.seoKeywords,
          seoTitle: shard.seoTitle,
          shortDescription: shard.shortDescription,
          slug: shard.slug,
          title: shard.title,
          type: 'shard', // Empty metadata for shards
          updatedAt: shard.updatedAt,
        },
      });

      // Migrate tags
      for (const shardTag of shard.tags) {
        await prisma.articleTag.create({
          data: {
            articleId: article.id,
            order: shardTag.order,
            tagId: shardTag.tagId,
          },
        });
      }

      console.log(`Migrated shard: ${shard.slug}`);
    }

    console.log('Migration completed successfully!');
    console.log(`Migrated ${blogPosts.length} blog posts and ${shards.length} shards to articles.`);
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run migration if this script is executed directly
if (require.main === module) {
  migrateToArticles()
    .then(() => {
      console.log('Migration script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration script failed:', error);
      process.exit(1);
    });
}

export { migrateToArticles };
