// global modules
import { faker } from '@faker-js/faker';
import type { Populate } from '@bit-trove/api-models/common';

import {
  UPLOAD_FILE_POPULATE,
  type UploadFileResponse,
  generateFakeUploadFileResponse,
} from '@bit-trove/api-models/upload-file';

// ==================================================
//                    C O R E
// ==================================================
interface AuthorCore {
  updatedAt: string;
  createdAt: string;
  publishedAt: string;
  display_name: string;
  last_name: string | null;
  first_name: string | null;
}

// ==================================================
//              S T A N D A L O N E
// ==================================================
interface AuthorPopulate {
  avatar: UploadFileResponse;
}

export interface Author extends AuthorCore, AuthorPopulate {}

export const AUTHOR_POPULATE = {
  populate: {
    avatar: UPLOAD_FILE_POPULATE,
  } satisfies Populate<keyof AuthorPopulate>,
};

export interface AuthorEntity {
  id: number;
  attributes: Author;
}

export interface AuthorResponse {
  data: AuthorEntity | null;
}

// ==================================================
//                S E G M E N T
// ==================================================
export type AuthorSegment = Author;
export const AUTHOR_SEGMENT_POPULATE = AUTHOR_POPULATE;
export type AuthorSegmentEntity = AuthorEntity;
export type AuthorSegmentResponse = AuthorResponse;

export const generateFakeAuthorSegment = () =>
  ({
    data: {
      id: faker.number.int(),
      attributes: {
        last_name: null,
        first_name: null,
        display_name: faker.lorem.words(2),
        createdAt: faker.date.anytime().toUTCString(),
        updatedAt: faker.date.anytime().toUTCString(),
        publishedAt: faker.date.anytime().toUTCString(),
        avatar: generateFakeUploadFileResponse({ height: 100, width: 100 }),
      },
    },
  }) satisfies AuthorSegmentResponse;
