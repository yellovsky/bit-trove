// global modules
import { faker } from '@faker-js/faker';
import { generateFakeUploadFileResponse } from '@bit-trove/api-models/upload-file';

import {
  type Author,
  AUTHOR_POPULATE,
  type AuthorResponse,
  type AuthorResponseData,
} from './author.standalone';

export type AuthorSegment = Author;
export const AUTHOR_SEGMENT_POPULATE = AUTHOR_POPULATE;
export type AuthorSegmentResponseData = AuthorResponseData;
export type AuthorSegmentResponse = AuthorResponse;

export const generateFakeAuthorSegment = () =>
  ({
    avatar: generateFakeUploadFileResponse({ height: 100, width: 100 }),
    createdAt: faker.date.anytime().toUTCString(),
    display_name: faker.lorem.words(2),
    first_name: null,
    last_name: null,
    publishedAt: faker.date.anytime().toUTCString(),
    updatedAt: faker.date.anytime().toUTCString(),
  }) satisfies AuthorSegment;

export const generateFakeAuthorSegmentResponse = () =>
  ({
    data: { attributes: generateFakeAuthorSegment(), id: faker.number.int() },
  }) satisfies AuthorSegmentResponse;
