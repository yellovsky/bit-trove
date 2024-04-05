// global modules
import * as R from 'ramda';
import { faker } from '@faker-js/faker';
import { generateFakeUploadFileResponse } from '@bit-trove/api-models/upload-file';

import type {
  Populate,
  APIResponseData,
  APIResponseCollection,
} from '@bit-trove/api-models/common';

// local modules
import type { CategoryCore } from './category.core';
import { CATEGORY_POPULATE, type CategoryPopulate } from './category.standalone';

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
      name: faker.lorem.word(),
      slug: faker.lorem.word(),
      description: faker.lorem.paragraph(),
      cover: generateFakeUploadFileResponse(),
      createdAt: faker.date.anytime().toUTCString(),
      updatedAt: faker.date.anytime().toUTCString(),
      publishedAt: faker.date.anytime().toUTCString(),
    },
  }) satisfies CatgorySegmentResponseData;

export const generateFakeCatgorySegmentResponseCollection = () => {
  const total = faker.number.int({ max: 3 });

  return {
    data: R.times(generateFakeCatgorySegmentResponseData, total),
    meta: { pagination: { limit: total, start: 0, total } },
  } satisfies CatgorySegmentResponseCollection;
};
