// global modules
import { Box } from '@repo/ui/box';
import clsx from 'clsx';
import { getUploadFileUrl } from '@bit-trove/api-models/upload-file';
import { Heading } from '@repo/ui/heading';
import { Skeleton } from '@repo/ui/skeleton';
import { Text } from '@repo/ui/text';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import { SimpleSquareCard, SimpleSquareCardPending } from '@repo/ui/simple-square-card';

import {
  categoryLink,
  type CategorySegmentEntity,
  quickCategoryCollectionQueryFn,
} from '@bit-trove/api-models/category';

// local modules
import {
  cardHolder as cardHolderCn,
  cardsHolder as cardsHolderCn,
  pending as pendingCn,
  subtitleHolder as subtitleHolderCn,
  titleHolder as titleHolderCn,
} from './footer-categories.module.scss';

const CARDS_LIMIT = 5;

const FooterCategoriesLayout: FC<
  PropsWithChildren<{
    pending?: boolean;
    title?: ReactNode;
    subtitle?: ReactNode;
  }>
> = (props) => (
  <Box as="section" pb="3rem" pt="3rem">
    <Skeleton
      className={clsx(titleHolderCn, props.pending && pendingCn)}
      isLoaded={!props.pending}
      mb="0.5rem"
    >
      <Heading as="h4" size="lg">
        {props.title || <>&nbsp;</>}
      </Heading>
    </Skeleton>

    <Skeleton
      className={clsx(subtitleHolderCn, props.pending && pendingCn)}
      isLoaded={!props.pending}
      mb="1.5rem"
    >
      <Text>{props.subtitle || <>&nbsp;</>}</Text>
    </Skeleton>

    <div className={cardsHolderCn}>{props.children}</div>
  </Box>
);

export const FooterCategoriesPending: FC = () => (
  <FooterCategoriesLayout pending>
    <div className={cardHolderCn}>
      <SimpleSquareCardPending />
    </div>
    <div className={cardHolderCn}>
      <SimpleSquareCardPending />
    </div>
    <div className={cardHolderCn}>
      <SimpleSquareCardPending />
    </div>
    <div className={cardHolderCn}>
      <SimpleSquareCardPending />
    </div>
  </FooterCategoriesLayout>
);

export const FooterCategories: FC = () => {
  const { t: footerT, i18n } = useTranslation('footer');

  const { data, status } = useSuspenseQuery({
    queryFn: quickCategoryCollectionQueryFn,
    queryKey: ['quick_category', { locale: i18n.language }],
  });

  const categories = data?.data?.attributes.categories.data.slice(0, CARDS_LIMIT);

  if (status === 'error' || !categories || !categories?.length) return null;

  const renderCard = ({ id, attributes: category }: CategorySegmentEntity) => (
    <div className={cardHolderCn} key={id}>
      <SimpleSquareCard
        cover={category.cover.data ? getUploadFileUrl(category.cover.data.attributes) : undefined}
        name={category.name}
        to={categoryLink(category)}
      />
    </div>
  );

  return (
    <>
      <FooterCategoriesLayout subtitle={footerT('browse_subtitle')} title={footerT('browse_title')}>
        {categories.map(renderCard)}
      </FooterCategoriesLayout>
    </>
  );
};
