// common modules
import type { DBTutorialSelect } from 'src/db/schema';
import type { DBArticle, DBArticleShort } from 'src/modules/article';

export type DBTutorialShort = DBTutorialSelect & {
  article: DBArticleShort;
};

export interface DBTutorial extends DBTutorialShort {
  article: DBArticle;
}
