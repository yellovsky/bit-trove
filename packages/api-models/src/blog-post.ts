import type { ItemResponse } from './response';

export interface BlogPostTranslations {
  language_code: string;
  title: string;
}

export interface BlogPost extends BlogPostTranslations {
  id: string;
  slug: string;
}

export type BlogPostResponse = ItemResponse<BlogPost>;
