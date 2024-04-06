// local modules
import type { TagCore } from './tag.core';

export const filterByTagLink = (tag: TagCore): string => `/tags/${tag.slug}`;
