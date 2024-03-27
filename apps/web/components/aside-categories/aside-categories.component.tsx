// global modules
import type { FC } from 'react';
import { apiHost } from '@repo/utils/api-host';
import { PlateLink } from '@repo/ui/plate-link';
import { SectionTitle } from '@repo/ui/section-title';
import type { QueryKeyOf } from '@repo/api-models/common';
import type { SupportedLocale } from '@bit-trove/localization/config';

import {
  fetchQuickCategoryCollection,
  type CatgorySegmentResponseCollection,
} from '@repo/api-models/category';

// local modules
import { getQueryClient } from '~/src/query-client';
import { links as linksCn } from './aside-categories.module.scss';

interface AsideCategoriesProps {
  locale: SupportedLocale;
}

const getQuickCategoryCollectionQueryKey = ({
  locale,
}: AsideCategoriesProps): QueryKeyOf<typeof fetchQuickCategoryCollection> => [
  'quick_category_collection',
  { locale },
];

export const AsideCategories: FC<AsideCategoriesProps> = async ({ locale }) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: getQuickCategoryCollectionQueryKey({ locale }),
    queryFn: fetchQuickCategoryCollection,
  });

  const quickCategoryCollectionResponse =
    queryClient.getQueryData<CatgorySegmentResponseCollection>(
      getQuickCategoryCollectionQueryKey({ locale })
    );

  const categoryDatum = quickCategoryCollectionResponse?.data;

  return !categoryDatum?.length ? null : (
    <div>
      <SectionTitle>Categories</SectionTitle>
      <div className={linksCn}>
        {categoryDatum.map((category) => (
          <PlateLink
            key={category.id}
            href={`/${locale}/categories/${category.attributes.slug}`}
            image={apiHost(category.attributes.cover.data?.attributes.url)}
          >
            {category.attributes.name}
          </PlateLink>
        ))}
      </div>
    </div>
  );
};
