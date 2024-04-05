// global modules
import { type Populate } from '@bit-trove/api-models/common';
import { SEO_SEGMENT_POPULATE, type SeoSegment } from '@bit-trove/api-models/seo';
import { UPLOAD_FILE_POPULATE, type UploadFileResponse } from '@bit-trove/api-models/upload-file';

// local modules
import type { CategoryCore } from './category.core';

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
