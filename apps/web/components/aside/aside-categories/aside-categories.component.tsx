// global modules
import 'server-only';
import { apiHost } from '@bit-trove/utils/api-host';
import type { FC } from 'react';
import { fetchQuickCategoryCollection } from '@bit-trove/api-models/category';
import { PlateLink } from '@bit-trove/ui/plate-link';
import { SectionTitle } from '@bit-trove/ui/section-title';
import type { SupportedLocale } from '@bit-trove/localization/config';

// local modules
import { links as linksCn } from './aside-categories.module.scss';

interface AsideCategoriesProps {
  locale: SupportedLocale;
}

export const AsideCategories: FC<AsideCategoriesProps> = async ({ locale }) => {
  const { data } = await fetchQuickCategoryCollection({ locale });

  return !data?.length ? null : (
    <div>
      <SectionTitle>Categories</SectionTitle>
      <div className={linksCn}>
        {data.map((category) => (
          <PlateLink
            href={`/${locale}/categories/${category.attributes.slug}`}
            image={apiHost(category.attributes.cover.data?.attributes.url)}
            key={category.id}
          >
            {category.attributes.name}
          </PlateLink>
        ))}
      </div>
    </div>
  );
};
