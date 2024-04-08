// global modules
import 'server-only';
import cn from 'classnames';
import type { FC } from 'react';
import { getUploadFileUrl } from '@bit-trove/api-models/upload-file';
import { SimpleSquareCard } from '@bit-trove/ui/simple-square-card';
import type { SupportedLocale } from '@bit-trove/localization/config';

import {
  categoryLink,
  type CategorySegmentEntity,
  fetchQuickCategoryCollection,
} from '@bit-trove/api-models/category';

// local modules
import {
  categories as categoriesCn,
  categoryCard as categoryCardCn,
  footerCategories as footerCategoriesCn,
  subtitle as subtitleCn,
  title as titleCn,
} from './footer-categories.module.scss';

const CARDS_LIMIT = 6;

interface FooterCategoriesProps {
  className?: string;
  locale: SupportedLocale;
}

export const FooterCategories: FC<FooterCategoriesProps> = async ({ locale, className }) => {
  const { data } = await fetchQuickCategoryCollection({ locale });

  const categories = data?.attributes.categories.data;

  const renderCard = (category: CategorySegmentEntity) => (
    <SimpleSquareCard
      className={categoryCardCn}
      cover={
        category.attributes.cover.data
          ? getUploadFileUrl(category.attributes.cover.data.attributes)
          : undefined
      }
      href={categoryLink(category.attributes)}
      key={category.attributes.slug}
      name={category.attributes.name}
    />
  );

  return !categories?.length ? null : (
    <section className={cn(className, footerCategoriesCn)}>
      <h3 className={titleCn}>Browse</h3>
      <div className={subtitleCn}>Discover all the latest posts you're interested in</div>
      <div className={categoriesCn}>{categories.slice(0, CARDS_LIMIT).map(renderCard)}</div>
    </section>
  );
};
