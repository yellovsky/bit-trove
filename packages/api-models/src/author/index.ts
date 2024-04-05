export { getAuthorName } from './author.helpers';
export type { AuthorCore } from './author.core';
export type { Author, AuthorResponse, AuthorResponseData } from './author.standalone';

export {
  AUTHOR_SEGMENT_POPULATE,
  generateFakeAuthorSegment,
  generateFakeAuthorSegmentResponse,
} from './author.segment';

export type {
  AuthorSegment,
  AuthorSegmentResponse,
  AuthorSegmentResponseData,
} from './author.segment';
