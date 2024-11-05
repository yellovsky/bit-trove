import type { ItemResponse, ListResponse, PaginationFP, SortWithDirection } from './response';

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

// ==========================================================
//           P B L O G   P O S T   S E G M E N T
// ==========================================================
export interface BlogPostListFP {
  page: PaginationFP;
  locale: string;
  sort: SortWithDirection<'created_at'>;
}

export interface BlogPostSegment {
  id: string;
  slug: string;
  title: string;
  created_at: string;
  published_at: string | null;
  original_language_code: string;
  short_description: string;
}

export type BlogPostListResponse = ListResponse<BlogPostSegment>;

// ==========================================================
//           P B L O G   P O S T   I T E M
// ==========================================================
export interface BlogPost extends BlogPostSegment {
  blocks: ArticleBlock[];
  seo_title: string | null;
  seo_keywords: string | null;
  seo_description: string | null;
}

export type BlogPostResponse = ItemResponse<BlogPost>;
