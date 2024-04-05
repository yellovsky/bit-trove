// global modules
import { UPLOAD_FILE_POPULATE, type UploadFileResponse } from '@bit-trove/api-models/upload-file';

import type {
  Populate,
  APIResponse,
  APIResponseData,
  APIResponseCollection,
} from '@bit-trove/api-models/common';

// local modules
import type { TagCore } from './tag.core';

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
