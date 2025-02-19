// local modules
import type { ArticleBlock } from './article';
import type { ItemResponse, ListResponse, PaginationFP, SortWithDirection } from './response';

export interface TutorialTranslations {
  language_code: string;
  title: string;
  blocks: ArticleBlock[];
}

// ============================================================================
//                 T U T O R I A L   S E G M E N T
// ============================================================================
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

// ============================================================================
//                   T U T O R I A L   I T E M
// ============================================================================
export interface GetOneTutorialFP {
  locale: string;
}

export interface Tutorial extends TutorialSegment {
  blocks: ArticleBlock[];
  seo_title: string;
  seo_keywords: string;
  seo_description: string;
}

export type TutorialResponse = ItemResponse<Tutorial>;

// ============================================================================
//                                C M S
// ============================================================================
export interface CMSTutorialTranslations {
  language_code: string;
  seo_title: string;
  seo_keywords: string;
  seo_description: string;
  blocks: ArticleBlock[];
  title: string;
  short_description: string;
}

export interface CMSTutorial {
  original_language_code: string;
  translations: CMSTutorialTranslations[];
}

export type CMSTutorialResponse = ItemResponse<CMSTutorial>;
