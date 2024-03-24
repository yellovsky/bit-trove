// global modules
import * as R from 'ramda';
import type { Populate } from '@repo/api-models/common';
import { SEO_SEGMENT_POPULATE, type SeoSegment } from '@repo/api-models/seo';
import { UPLOAD_FILE_POPULATE, type UploadFileResponse } from '@repo/api-models/upload-file';

// ==================================================
//                    C O R E
// ==================================================
interface CategoryCore {
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description: string | null;
}

// ==================================================
//              S T A N D A L O N E
// ==================================================
export interface CategoryPopulate {
  seo: SeoSegment | null;
  cover: UploadFileResponse;
}

export interface Category extends CategoryCore, CategoryPopulate {}

export const CATEGORY_POPULATE = {
  populate: {
    seo: SEO_SEGMENT_POPULATE,
    cover: UPLOAD_FILE_POPULATE,
  } satisfies Populate<keyof CategoryPopulate>,
};

// ==================================================
//               S E G M E N T
// ==================================================
const omitted: Array<keyof CategoryPopulate> = ['seo'];
type CategorySegmentPopulate = Omit<CategoryPopulate, (typeof omitted)[number]>;
interface CategorySegment extends CategoryCore, CategorySegmentPopulate {}

export const CATEGORY_SEGMENT_POPULATE = {
  populate: R.omit(omitted, CATEGORY_POPULATE.populate) satisfies Populate<
    keyof CategorySegmentPopulate
  >,
};

export interface CategorySegmentListResponse {
  data: CategorySegment[];
}
