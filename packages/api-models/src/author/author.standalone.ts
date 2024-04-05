// global modules
import type { APIResponse, APIResponseData, Populate } from '@bit-trove/api-models/common';
import { UPLOAD_FILE_POPULATE, type UploadFileResponse } from '@bit-trove/api-models/upload-file';

// local modules
import type { AuthorCore } from './author.core';

// ==================================================
//              S T A N D A L O N E
// ==================================================
export interface AuthorPopulate {
  avatar: UploadFileResponse;
}

export interface Author extends AuthorCore, AuthorPopulate {}

export const AUTHOR_POPULATE = {
  populate: {
    avatar: UPLOAD_FILE_POPULATE,
  } satisfies Populate<keyof AuthorPopulate>,
};

export type AuthorResponseData = APIResponseData<Author>;
export type AuthorResponse = APIResponse<Author>;
