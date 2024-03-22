// global modules
import type { FC } from 'react';
import { useLocale } from 'next-intl';
import { PlateLink } from '@repo/ui/plate-link';
import { apiHost } from '@repo/utils/api-host';
import { SectionTitle } from '@repo/ui/section-title';
import type { PatrialCategoryFragment } from '@repo/api-models/category';

// local modules
import { links as linksCn } from './aside-categories.module.scss';

interface AsideCategoriesProps {
  categories: PatrialCategoryFragment[];
}

export const AsideCategories: FC<AsideCategoriesProps> = ({ categories }) => {
  const locale = useLocale();

  return (
    <>
      <SectionTitle>Categories</SectionTitle>
      <div className={linksCn}>
        {categories.map((category) => (
          <PlateLink
            key={category.id}
            href={`/${locale}/categories/${category.attributes.slug}`}
            image={apiHost(category.attributes.cover.data?.attributes.url) }
          >
            {category.attributes.name}
          </PlateLink>
        ))}
      </div>
    </>
  );
};
