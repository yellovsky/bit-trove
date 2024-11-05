import type { ItemResponse } from './response';

export interface ArticleImageBlock {
  type: 'image';
  order: number;
  content: { url: string };
}

export interface ArticleTextBlock {
  type: 'text';
  order: number;
  content: { html: string } | { md: string };
}

export interface ArticleCodeBlock {
  type: 'code';
  order: number;
  content: { variants: Array<{ language: string; text: string }> };
}

export type ArticleBlock = ArticleImageBlock | ArticleTextBlock | ArticleCodeBlock;

export interface BlogPostTranslations {
  language_code: string;
  title: string;
  blocks: ArticleBlock[];
}

export interface BlogPost extends BlogPostTranslations {
  id: string;
  slug: string;
}

export type BlogPostResponse = ItemResponse<BlogPost>;
