export { thoughtLink } from './thought.helpers';
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
  ThoughtSegmentResponseCollection,
} from './thought.segment';

export {
  fetchThoughtSegmentCollection,
  generateFakeThoughtSegmentResponseCollection,
} from './thought.segment';