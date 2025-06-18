import type { TFunction } from 'i18next';

import { getMetaTitle } from '@shared/lib/meta';

export const loadHomeRouteData = async (t: TFunction) => {
  return {
    metaDescription: t('meta_general_description'),
    metaKeywords: t('meta_general_keywords'),
    metaTitle: getMetaTitle('', t('meta_title_suffix')),
  };
};
