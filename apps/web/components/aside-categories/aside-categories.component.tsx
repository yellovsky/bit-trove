// global modules
import type { FC } from 'react';
import { useLocale } from 'next-intl';
import { PlateLink } from '@repo/ui/plate-link';
import { apiHost } from '@repo/utils/api-host';
import { SectionTitle } from '@repo/ui/section-title';
import { fetchQuickCategoryCollection } from '@repo/api-models/category';

// local modules
import { links as linksCn } from './aside-categories.module.scss';
import { useQuery } from '@tanstack/react-query';

export const AsideCategories: FC = () => {
  const locale = useLocale();
  const { data } = useQuery({
    queryFn: fetchQuickCategoryCollection,
    queryKey: ['quick_category_collection', { locale }],
  });

  return (
    <div>
      <SectionTitle>Categories</SectionTitle>
      <div className={linksCn}>
        {data?.data.map((category) => (
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
