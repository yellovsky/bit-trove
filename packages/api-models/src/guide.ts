// local modules
import type { ArticleBlock } from './article';
import type { ItemResponse, ListResponse, PaginationFP, SortWithDirection } from './response';

export interface GuideTranslations {
  language_code: string;
  title: string;
  blocks: ArticleBlock[];
}

// ==========================================================
//           G U I D E   S E G M E N T
// ==========================================================
export interface GuideItemListFP {
  page: PaginationFP;
  locale: string;
  sort: SortWithDirection<'created_at'>;
}

export interface GuideItemSegment {
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

export type GuideItemListResponse = ListResponse<GuideItemSegment>;

// ==========================================================
//           G U I D E   I T E M
// ==========================================================
export interface GuideItem extends GuideItemSegment {
  blocks: ArticleBlock[];
  seo_title: string | null;
  seo_keywords: string | null;
  seo_description: string | null;
}

export type GuideItemResponse = ItemResponse<GuideItem>;
