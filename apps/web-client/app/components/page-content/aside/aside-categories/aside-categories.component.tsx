// global modules
import { apiHost } from '@bit-trove/utils/api-host';
import { quickCategoryCollectionQueryFn } from '@bit-trove/api-models/category';
import { SectionTitle } from '@bit-trove/ui/section-title';
import { Skeleton } from '@bit-trove/ui/skeleton';
import { Stack } from '@bit-trove/ui/stack';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import { PlateLink, PlateLinkPending } from '@bit-trove/ui/plate-link';

const AsideCategoriesLayout: FC<PropsWithChildren<{ title: ReactNode }>> = ({
  title,
  children,
}) => (
  <div>
    {title}
    <Stack orientation="vertical">{children}</Stack>
  </div>
);

export const AsideCategories: FC = () => {
  const { t } = useTranslation();
  const locale = useTranslation().i18n.language;
  const { data, status } = useSuspenseQuery({
    queryFn: quickCategoryCollectionQueryFn,
    queryKey: ['quick_category', { locale }],
  });

  const categories = data?.data?.attributes.categories.data;

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

export const AsideCategoriesPending: FC = () => (
  <AsideCategoriesLayout
    title={
      <Skeleton br="sm">
        <SectionTitle>&nbsp; </SectionTitle>
      </Skeleton>
    }
  >
    <PlateLinkPending />
    <PlateLinkPending />
    <PlateLinkPending />
  </AsideCategoriesLayout>
);
