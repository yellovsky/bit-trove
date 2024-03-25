// global modules
import type { Populate } from '@repo/api-models/common';
import { UPLOAD_FILE_POPULATE, type UploadFileResponse } from '@repo/api-models/upload-file';

// ==================================================
//                    C O R E
// ==================================================
interface AuthorCore {
  createdAt: string;
  updatedAt: string;
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
