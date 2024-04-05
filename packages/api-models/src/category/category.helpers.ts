// local modules
import type { CategoryCore } from './category.core';

export const categoryLink = (category: CategoryCore): string => `/categories/${category.slug}`;
