import type { TFunction } from 'i18next';

import { getApiClient } from '@shared/lib/api-client';

import { checkArticleSlugAvailability } from '@entities/articles';

export const createTitleValidator = (t: TFunction) => async (title: string) => {
  if (!title) return t('error.field_is_required.text');
  return undefined;
};

export const createSlugValidator = (t: TFunction, id?: string) => async (slug: string) => {
  if (!slug) return t('error.field_is_required.text');

  try {
    const response = await checkArticleSlugAvailability(getApiClient())(slug);
    return response.data.available || response.data.takenBy === id ? undefined : 'Slug is already taken';
  } catch {
    return 'Can not check slug availability';
  }
};
