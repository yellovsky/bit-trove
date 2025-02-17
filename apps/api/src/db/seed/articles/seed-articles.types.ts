// local modules
import type {
  articleBlocks,
  articles,
  articleTranslations,
} from '../../schema';

export type DBArticleBlockSeedData = Omit<
  typeof articleBlocks.$inferInsert,
  'order' | 'article_translations_id'
>;

export type DBArticleTranslationSeedData = Omit<
  typeof articleTranslations.$inferInsert,
  'article_id'
> & { blocks: DBArticleBlockSeedData[] };

export type DBArticleSeedData = Omit<
  typeof articles.$inferInsert,
  'author_id'
> & { translations: DBArticleTranslationSeedData[] };

export type DBArticleWithAutjorEmailSeedData = DBArticleSeedData & {
  authorEmail: string;
};
