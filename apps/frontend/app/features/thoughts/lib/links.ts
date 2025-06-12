import type { ShortThought } from '@repo/api-models';

export const getCreateThoughtLink = (): string => '/cms/thoughts/create';
export const getThoughtLink = (thought: Pick<ShortThought, 'slug'>): string => `/thoughts/${thought.slug}`;
