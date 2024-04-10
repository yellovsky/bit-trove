export { categoryLink } from './category.helpers';
export type { CategoryCore } from './category.core';
export type { Category, CategoryPopulate } from './category.standalone';
export {
  fetchQuickCategoryCollection,
  quickCategoryCollectionQueryFn,
} from './category.quick-category';

export type {
  CategorySegment,
  CategorySegmentEntity,
  CatgorySegmentResponseCollection,
  CatgorySegmentResponseData,
} from './category.segment';

export {
  CATEGORY_SEGMENT_POPULATE,
  generateFakeCatgorySegmentResponseCollection,
  generateFakeCatgorySegmentResponseData,
} from './category.segment';

export type {
  QuickCategoryCollectionFP,
  QuickCategoryCollection,
  QuickCategoryCollectionData,
  QuickCategoryResponse,
} from './category.quick-category';
