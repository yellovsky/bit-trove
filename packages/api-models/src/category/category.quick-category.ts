// global modules
import { getApiClient } from '@bit-trove/api-models/common';

// local modules
import {
  CATEGORY_SEGMENT_POPULATE,
  type CatgorySegmentResponseCollection,
} from './category.segment';

export type QuickCategoryCollectionFP = {
  locale: string;
};

export type QuickCategoryResponseCollection = CatgorySegmentResponseCollection;

// TODO: await for https://github.com/strapi/strapi/issues/19901 and add SingleType to strappi
export const fetchQuickCategoryCollection = ({
  locale,
}: QuickCategoryCollectionFP): Promise<QuickCategoryResponseCollection> =>
  getApiClient()
    .get<QuickCategoryResponseCollection>('/categories', {
      params: {
        ...CATEGORY_SEGMENT_POPULATE,
        sort: 'name:asc',
        pagination: { start: 0, limit: 8 },
        locale,
      },
    })
    .then((response) => response.data);