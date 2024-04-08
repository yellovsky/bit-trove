// global modules
import * as R from 'ramda';
import { faker } from '@faker-js/faker';

import type {
  APIResponse,
  APIResponseCollection,
  APIResponseData,
} from '@bit-trove/api-models/common';

// local modules
import type { TagCore } from './tag.core';
import { type Tag, TAG_POPULATE, type TagPopulate } from './tag.standalone';

type TagSegmentPopulate = TagPopulate;
export interface TagSegment extends TagCore, TagSegmentPopulate {}
export const TAG_SEGMENT_POPULATE = TAG_POPULATE;

export type TagSegmentResponseData = APIResponseData<Tag>;
export type TagSegmentResponse = APIResponse<Tag>;
export type TagSegmentResponseCollection = APIResponseCollection<Tag>;

export const generateFakeTagSegment = (): TagSegment => ({
  createdAt: faker.date.anytime().toUTCString(),
  image: { data: null },
  name: faker.lorem.word(),
  publishedAt: faker.date.anytime().toUTCString(),
  slug: faker.lorem.word(),
  updatedAt: faker.date.anytime().toUTCString(),
});

export const generateFakeTagSegmentResponseCollection = (): TagSegmentResponseCollection => {
  const total = faker.number.int({ max: 4, min: 0 });

  return {
    data: R.times((id) => ({ attributes: generateFakeTagSegment(), id }), total),
    meta: { pagination: { limit: total, start: 0, total } },
  };
};
