export type { TagCore } from './tag.core';
export { filterByTagLink } from './tag.helpers';

export type {
  TagSegment,
  TagSegmentResponse,
  TagSegmentResponseData,
  TagSegmentResponseCollection,
} from './tag.segment';

export {
  TAG_SEGMENT_POPULATE,
  generateFakeTagSegment,
  generateFakeTagSegmentResponseCollection,
} from './tag.segment';

export type {
  Tag,
  TagPopulate,
  TagResponse,
  TagResponseData,
  TagResponseCollection,
} from './tag.standalone';
