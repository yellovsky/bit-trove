// local modules
import type { ArticleBlock } from './article';
import type { ItemResponse, ListResponse, PaginationFP, SortWithDirection } from './response';

export interface TutorialTranslations {
  language_code: string;
  title: string;
  blocks: ArticleBlock[];
}

// ==========================================================
//         T U T O R I A L   S E G M E N T
// ==========================================================
export interface TutorialListFP {
  page: PaginationFP;
  locale: string;
  sort: SortWithDirection<'created_at'>;
}

export interface TutorialSegment {
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

export type TutorialListResponse = ListResponse<TutorialSegment>;

// ==========================================================
//          T U T O R I A L   I T E M
// ==========================================================
export interface Tutorial extends TutorialSegment {
  blocks: ArticleBlock[];
  seo_title: string | null;
  seo_keywords: string | null;
  seo_description: string | null;
}

export type TutorialResponse = ItemResponse<Tutorial>;
