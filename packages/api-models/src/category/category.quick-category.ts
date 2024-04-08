// global modules
import { type APIResponse, type APIResponseData, getApiClient } from '@bit-trove/api-models/common';

// local modules
import {
  CATEGORY_SEGMENT_POPULATE,
  type CatgorySegmentResponseCollection,
} from './category.segment';

export type QuickCategoryCollectionFP = {
  locale: string;
};

export interface QuickCategoryCollection {
  locale: string;
  categories: CatgorySegmentResponseCollection;
}

export type QuickCategoryCollectionData = APIResponseData<QuickCategoryCollection>;
export type QuickCategoryResponse = APIResponse<QuickCategoryCollection>;

const QUICK_CATEGORY_POPULATE = {
  populate: {
    categories: CATEGORY_SEGMENT_POPULATE,
  },
};

export const fetchQuickCategoryCollection = ({
  locale,
}: QuickCategoryCollectionFP): Promise<QuickCategoryResponse> =>
  getApiClient()
    .get<QuickCategoryResponse>('/quick-category', {
      params: { ...QUICK_CATEGORY_POPULATE, locale },
    })
    .then((response) => response.data);
