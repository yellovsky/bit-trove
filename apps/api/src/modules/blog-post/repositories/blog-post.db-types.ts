// common modules
import type { DBBlogPostSelect } from 'src/db/schema';
import type { DBArticle, DBArticleShort } from 'src/modules/article';

export type DBBlogPostShort = DBBlogPostSelect & {
  article: DBArticleShort;
};

export interface DBBlogPost extends DBBlogPostShort {
  article: DBArticle;
}
