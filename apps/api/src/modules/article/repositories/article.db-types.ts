// global modules
import type {
  DBArticleBlockSelect,
  DBArticleSelect,
  DBArticleTranslationSelect,
} from 'src/db/schema';

export type DBArticleShort = DBArticleSelect & {
  translations: DBArticleTranslationSelect[];
};

export interface DBArticleTranslations extends DBArticleTranslationSelect {
  blocks: DBArticleBlockSelect[];
}

export interface DBArticle extends DBArticleShort {
  translations: DBArticleTranslations[];
}
