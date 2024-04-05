// local modules
import type { ThoughtCore } from './thought.core';

export const thoughtLink = (thought: ThoughtCore): string => `/thoughts/${thought.slug}`;
