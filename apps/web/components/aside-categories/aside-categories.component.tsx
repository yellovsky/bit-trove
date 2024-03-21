import type { PatrialCategoryFragment } from '@repo/api-models/category';
import type { FC } from 'react';
import { PlateLink } from '@repo/ui/plate-link';
import { links as linksCn } from './aside-categories.module.scss';
import { SectionTitle } from '@repo/ui/section-title';
import { useLocale } from 'next-intl';

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
            image={`http://localhost:1337${category.attributes.cover.data?.attributes.url}`}
          >
            {category.attributes.name}
          </PlateLink>
        ))}
      </div>
    </>
  );
};
