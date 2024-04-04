// global modules
import * as R from 'ramda';
import { faker } from '@faker-js/faker';
import { UPLOAD_FILE_POPULATE, type UploadFileResponse } from '@repo/api-models/upload-file';

import type {
  Populate,
  APIResponse,
  APIResponseData,
  APIResponseCollection,
} from '@repo/api-models/common';

// ==================================================
//                    C O R E
// ==================================================
interface TagCore {
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ==================================================
//              S T A N D A L O N E
// ==================================================
export interface TagPopulate {
  image: UploadFileResponse;
}

export interface Tag extends TagCore, TagPopulate {}

export const TAG_POPULATE = {
  populate: {
    image: UPLOAD_FILE_POPULATE,
  } satisfies Populate<keyof TagPopulate>,
};

export type TagResponseData = APIResponseData<Tag>;
export type TagResponse = APIResponse<Tag>;
export type TagResponseCollection = APIResponseCollection<Tag>;

// ==================================================
//               S E G M E N T
// ==================================================
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
