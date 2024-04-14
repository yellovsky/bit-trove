// global modules
import { getUploadFileUrl } from '@bit-trove/api-models/upload-file';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Box } from '@bit-trove/ui/box';
import { Skeleton } from '@bit-trove/ui/skeleton';
import { Heading } from '@bit-trove/ui/heading';
import { Text } from '@bit-trove/ui/text';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import { SimpleSquareCard, SimpleSquareCardPending } from '@bit-trove/ui/simple-square-card';
import {
  cardsHolder as cardsHolderCn,
  cardHolder as cardHolderCn,
} from './footer-categories.module.scss';
import {
  categoryLink,
  type CategorySegmentEntity,
  quickCategoryCollectionQueryFn,
} from '@bit-trove/api-models/category';

const CARDS_LIMIT = 5;

const FooterCategoriesLayout: FC<
  PropsWithChildren<{
    pending?: boolean;
    title?: ReactNode;
    subtitle?: ReactNode;
  }>
> = (props) => (
  <Box as="section" mb="3rem" mt="3rem">
    <Skeleton
      isLoaded={!props.pending}
      margin={!props.pending ? undefined : '0 auto'}
      maxW={!props.pending ? undefined : '20rem'}
    >
      <Heading as="h4" mb="0.5rem" textAlign="center">
        {props.title || <>&nbsp;</>}
      </Heading>
    </Skeleton>

    <Skeleton
      isLoaded={!props.pending}
      margin={!props.pending ? undefined : '0 auto'}
      maxW={!props.pending ? undefined : '30rem'}
    >
      <Text mb="1.5rem" textAlign="center">
        {props.subtitle || <>&nbsp;</>}
      </Text>
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
  const { t: footerT, i18n, ready } = useTranslation('footer', { useSuspense: true });

  const { data, status } = useSuspenseQuery({
    queryFn: quickCategoryCollectionQueryFn,
    queryKey: ['quick_category', { locale: i18n.language }],
  });

  const categories = data?.data?.attributes.categories.data.slice(0, CARDS_LIMIT);
  if (status === 'pending' || !ready) return <FooterCategoriesPending />;
  if (status === 'error' || !categories || !categories?.length) return null;

  const renderCard = ({ attributes: category }: CategorySegmentEntity, id) => (
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
