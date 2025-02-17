// local modules
import type { DBArticleWithAutjorEmailSeedData } from '../articles';
import { tutorials } from '../../schema';

export type DBTutorialWithAuthorSeedData = Omit<
  typeof tutorials.$inferInsert,
  'author_id' | 'article_id'
> & {
  article: DBArticleWithAutjorEmailSeedData;
  authorEmail: string;
};
