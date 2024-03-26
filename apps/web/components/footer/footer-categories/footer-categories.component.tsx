// global modules
import cn from 'classnames';
import type { FC } from 'react';
import { SimpleSquareCard } from '@repo/ui/simple-square-card';
import { getUploadFileUrl } from '@repo/api-models/upload-file';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import type { SupportedLocale } from '@bit-trove/localization/config';

import {
  categoryLink,
  type CategorySegment,
  fetchQuickCategoryCollection,
  type QuickCategoryCollectionQueryKey,
  type QuickCategoryResponseCollection,
} from '@repo/api-models/category';

// local modules
import { getQueryClient } from '~/src/query-client';

import {
  title as titleCn,
  subtitle as subtitleCn,
  categories as categoriesCn,
  categoryCard as categoryCardCn,
  footerCategories as footerCategoriesCn,
} from './footer-categories.module.scss';

const CARDS_LIMIT = 6;

interface FooterCategoriesProps {
  className?: string;
  locale: SupportedLocale;
}

export const FooterCategories: FC<FooterCategoriesProps> = async ({ locale, className }) => {
  const queryClient = getQueryClient();

  const queryKey = [
    'quick_category_collection',
    { locale },
  ] satisfies QuickCategoryCollectionQueryKey;

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: fetchQuickCategoryCollection,
  });

  const response = queryClient.getQueryData<QuickCategoryResponseCollection>(queryKey);

  const categories = response?.data.map((data) => data.attributes);

  const renderCard = (category: CategorySegment) => (
    <SimpleSquareCard
      key={category.slug}
      className={categoryCardCn}
      cover={category.cover.data ? getUploadFileUrl(category.cover.data.attributes) : undefined}
      href={categoryLink(category)}
      name={category.name}
    />
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {!categories?.length ? null : (
        <section className={cn(className, footerCategoriesCn)}>
          <h3 className={titleCn}>Browse</h3>
          <div className={subtitleCn}>Discover all the latest posts you're interested in</div>
          <div className={categoriesCn}>{categories.slice(0, CARDS_LIMIT).map(renderCard)}</div>
        </section>
      )}
    </HydrationBoundary>
  );
};
