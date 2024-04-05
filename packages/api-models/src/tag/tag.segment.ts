// global modules
import * as R from 'ramda';
import { faker } from '@faker-js/faker';

import type {
  APIResponse,
  APIResponseData,
  APIResponseCollection,
} from '@bit-trove/api-models/common';

// local modules
import type { TagCore } from './tag.core';
import { TAG_POPULATE, type Tag, type TagPopulate } from './tag.standalone';

type TagSegmentPopulate = TagPopulate;
export interface TagSegment extends TagCore, TagSegmentPopulate {}
export const TAG_SEGMENT_POPULATE = TAG_POPULATE;

export type TagSegmentResponseData = APIResponseData<Tag>;
export type TagSegmentResponse = APIResponse<Tag>;
export type TagSegmentResponseCollection = APIResponseCollection<Tag>;

export const generateFakeTagSegment = (): TagSegment => ({
  image: { data: null },
  name: faker.lorem.word(),
  slug: faker.lorem.word(),
  updatedAt: faker.date.anytime().toUTCString(),
  createdAt: faker.date.anytime().toUTCString(),
  publishedAt: faker.date.anytime().toUTCString(),
});

export const generateFakeTagSegmentResponseCollection = (): TagSegmentResponseCollection => {
  const total = faker.number.int({ min: 0, max: 4 });

  return {
    data: R.times((id) => ({ id, attributes: generateFakeTagSegment() }), total),
    meta: { pagination: { limit: total, start: 0, total } },
  };
};
