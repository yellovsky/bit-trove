export { thoughtLink, getThoughtMetadata } from './thought.helpers';
export { fetchThought, thoughtQueryFn } from './thought.standalone';

export type {
  Thought,
  ThoughtFP,
  ThoughtResponse,
  ThoughtResponseData,
  ThoughtResponseCollection,
} from './thought.standalone';

export type {
  ThoughtSegment,
  ThoughtSegmentCollectionFP,
  ThoughtSegmentResponseData,
  ThoughtSegmentCollectionQueryKey,
  ThoughtSegmentResponseCollection,
} from './thought.segment';

export {
  fetchThoughtSegmentCollection,
  generateFakeThoughtSegmentResponseCollection,
} from './thought.segment';
