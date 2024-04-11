// global modules
import { Suspense, type FC } from 'react';
import { Box, Divider, SimpleGrid } from '@chakra-ui/react';

// local modules
import { FooterCategories, FooterCategoriesPending } from './footer-categories';
import { pagePadding as pagePaddingCn } from './layout.module.scss';

export const Footer: FC = () => (
  <Box as="footer" bg="black" className={pagePaddingCn} color="gray.400">
    <Box>
      <Suspense fallback={<FooterCategoriesPending />}>
        <FooterCategories />
      </Suspense>
    </Box>

    <Divider borderColor="gray.600" />

    <SimpleGrid columns={{ lg: 3, sm: 1 }} spacing="2rem">
      <Box>Find your trove</Box>
      <Box>links</Box>
      <Box>newsletter</Box>
    </SimpleGrid>

    <Divider borderColor="gray.600" />
    <Box>copyrigt</Box>
  </Box>
);
