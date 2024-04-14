// global modules
import { apiHost } from '@bit-trove/utils/api-host';
import { quickCategoryCollectionQueryFn } from '@bit-trove/api-models/category';
import { SectionTitle } from '@bit-trove/ui/section-title';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import { PlateLink, PlateLinkPending } from '@bit-trove/ui/plate-link';
import { Stack } from '@bit-trove/ui/stack';
import { Skeleton } from '@bit-trove/ui/skeleton';

const AsideCategoriesLayout: FC<PropsWithChildren<{ title: ReactNode }>> = ({
  title,
  children,
}) => (
  <div>
    {title}
    <Stack>{children}</Stack>
  </div>
);

export const AsideCategories: FC = () => {
  const { t } = useTranslation();
  const locale = useTranslation().i18n.language;
  const { data, status } = useQuery({
    queryFn: quickCategoryCollectionQueryFn,
    queryKey: ['quick_category', { locale }],
  });

  const categories = data?.data?.attributes.categories.data;

  if (status === 'pending') {
    return (
      <AsideCategoriesLayout
        title={
          <Skeleton br="sm">
            <SectionTitle>{t('quick_categories_title')}</SectionTitle>
          </Skeleton>
        }
      >
        <PlateLinkPending />
        <PlateLinkPending />
        <PlateLinkPending />
      </AsideCategoriesLayout>
    );
  }

  if (status === 'error' || !categories?.length) return null;

  return (
    <AsideCategoriesLayout title={<SectionTitle>{t('quick_categories_title')}</SectionTitle>}>
      {categories.map((category) => (
        <PlateLink
          image={apiHost(category.attributes.cover.data?.attributes.url)}
          key={category.id}
          to={`/${locale}/categories/${category.attributes.slug}`}
        >
          {category.attributes.name}
        </PlateLink>
      ))}
    </AsideCategoriesLayout>
  );
};
