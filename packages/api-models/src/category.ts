// global modules
import * as R from 'ramda';
import { faker } from '@faker-js/faker';
import { SEO_SEGMENT_POPULATE, type SeoSegment } from '@bit-trove/api-models/seo';
import {
  UPLOAD_FILE_POPULATE,
  type UploadFileResponse,
  generateFakeUploadFileResponse,
} from '@bit-trove/api-models/upload-file';

import {
  getApiClient,
  type Populate,
  type APIResponseData,
  type APIResponseCollection,
} from '@bit-trove/api-models/common';

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
const omitted = ['seo'] as const;
type CategorySegmentPopulate = Omit<CategoryPopulate, (typeof omitted)[number]>;
export interface CategorySegment extends CategoryCore, CategorySegmentPopulate {}

export const CATEGORY_SEGMENT_POPULATE = {
  populate: R.omit(omitted, CATEGORY_POPULATE.populate) satisfies Populate<
    keyof CategorySegmentPopulate
  >,
};

export interface CategorySegmentEntity {
  id: number;
  attributes: CategorySegment;
}

export type CatgorySegmentResponseData = APIResponseData<CategorySegment>;
export type CatgorySegmentResponseCollection = APIResponseCollection<CategorySegment>;

export const generateFakeCatgorySegmentResponseData = () =>
  ({
    id: faker.number.int(),
    attributes: {
      cover: generateFakeUploadFileResponse(),
      createdAt: faker.date.anytime().toUTCString(),
      publishedAt: faker.date.anytime().toUTCString(),
      updatedAt: faker.date.anytime().toUTCString(),
      description: faker.lorem.paragraph(),
      name: faker.lorem.word(),
      slug: faker.lorem.word(),
    },
  }) satisfies CatgorySegmentResponseData;

export const generateFakeCatgorySegmentResponseCollection = () => {
  const total = faker.number.int({ max: 3 });
  return {
    data: R.times(generateFakeCatgorySegmentResponseData, total),
    meta: { pagination: { limit: total, start: 0, total } },
  } satisfies CatgorySegmentResponseCollection;
};

// ==========================================================
//   Q U I C K   C O L L E C T I O N   C O L L E C T I O N
// ==========================================================
export type QuickCategoryCollectionFP = {
  locale: string;
};

export type QuickCategoryResponseCollection = CatgorySegmentResponseCollection;
export type QuickCategoryCollectionQueryKey = [
  'quick_category_collection',
  QuickCategoryCollectionFP,
];

// TODO: await for https://github.com/strapi/strapi/issues/19901 and add SingleType to strappi
export const fetchQuickCategoryCollection = ({
  locale,
}: QuickCategoryCollectionFP): Promise<QuickCategoryResponseCollection> =>
  getApiClient()
    .get<QuickCategoryResponseCollection>('/categories', {
      params: {
        ...CATEGORY_SEGMENT_POPULATE,
        sort: 'name:asc',
        pagination: { start: 0, limit: 8 },
        locale,
      },
    })
    .then((response) => response.data);

// ==========================================================
//                      L I N K
// ==========================================================
export const categoryLink = (category: CategoryCore): string => `/categories/${category.slug}`;
