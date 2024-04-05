// local modules
import type { AuthorCore } from './author.core';

export const getAuthorName = (author: AuthorCore | undefined): string | undefined =>
  [author?.first_name, author?.last_name].filter(Boolean).join(' ') || undefined;
