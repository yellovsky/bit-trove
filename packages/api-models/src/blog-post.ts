// local modules
import type { ArticleBlock } from './article';
import type { ItemResponse, ListResponse, PaginationFP, SortWithDirection } from './response';

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
  language_code: string;
  language_codes: string[];
  published_at: string | null;
  original_language_code: string;
  short_description: string;
}

export type BlogPostListResponse = ListResponse<BlogPostSegment>;

// ==========================================================
//           P B L O G   P O S T   I T E M
// ==========================================================
export interface GetOneBlogPostFP {
  locale: string;
}

export interface BlogPost extends BlogPostSegment {
  blocks: ArticleBlock[];
  seo_title: string | null;
  seo_keywords: string | null;
  seo_description: string | null;
}

export type BlogPostResponse = ItemResponse<BlogPost>;
