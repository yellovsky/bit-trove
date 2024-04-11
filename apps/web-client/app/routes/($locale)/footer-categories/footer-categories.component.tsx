// global modules
import { getUploadFileUrl } from '@bit-trove/api-models/upload-file';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Box, Flex, Heading, Skeleton, Text } from '@chakra-ui/react';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import { SimpleSquareCard, SimpleSquareCardPending } from '@bit-trove/ui/simple-square-card';

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
      <Heading mb="0.5rem" textAlign="center">
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

    <Flex flexWrap="wrap" gap="2rem" justifyContent="center">
      {props.children}
    </Flex>
  </Box>
);

export const FooterCategoriesPending: FC = () => (
  <FooterCategoriesLayout pending>
    <Box w="12rem">
      <SimpleSquareCardPending />
    </Box>
    <Box w="12rem">
      <SimpleSquareCardPending />
    </Box>
    <Box w="12rem">
      <SimpleSquareCardPending />
    </Box>
    <Box w="12rem">
      <SimpleSquareCardPending />
    </Box>
  </FooterCategoriesLayout>
);

export const FooterCategories: FC = () => {
  const { t: footerT, i18n, ready } = useTranslation('footer', { useSuspense: false });

  const { data, status } = useQuery({
    queryFn: quickCategoryCollectionQueryFn,
    queryKey: ['quick_category', { locale: i18n.language }],
  });

  const categories = data?.data?.attributes.categories.data.slice(0, CARDS_LIMIT);
  if (status === 'pending' || !ready) return <FooterCategoriesPending />;
  if (status === 'error' || !categories || !categories?.length) return null;

  const renderCard = ({ id, attributes: category }: CategorySegmentEntity) => (
    <Box key={id} w="12rem">
      <SimpleSquareCard
        cover={category.cover.data ? getUploadFileUrl(category.cover.data.attributes) : undefined}
        name={category.name}
        to={categoryLink(category)}
      />
    </Box>
  );

  return (
    <>
      <FooterCategoriesLayout subtitle={footerT('browse_subtitle')} title={footerT('browse_title')}>
        {categories.map(renderCard)}
      </FooterCategoriesLayout>
    </>
  );
};
