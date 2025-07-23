import type { ChangeEvent } from 'react';

import type { UpsertArticleVariables } from '../types';

export const nullableStringTransform = {
  input: (value: string | null) => value || '',
  output: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): string | null =>
    event.target.value.trim() || null,
};

export const getDefaultValues = (languageCode: string): UpsertArticleVariables => ({
  contentJSON: [],
  entryId: null,
  languageCode,
  published: false,
  relatedArticles: [],
  seoDescription: '',
  seoKeywords: '',
  seoTitle: '',
  shortDescription: '',
  slug: '',
  tags: [],
  title: '',
});
