// global modules
import { Suspense, type FC } from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { Divider } from '@bit-trove/ui/divider';

// local modules
import { FooterCategories, FooterCategoriesPending } from './footer-categories';
import { pagePadding as pagePaddingCn } from './layout.module.scss';

export const Footer: FC = () => (
  <Box as="footer" bg="black" className={pagePaddingCn} color="gray.400">
    <Box>
      {/* <Suspense fallback={<FooterCategoriesPending />}>
        <FooterCategories />
      </Suspense> */}
    </Box>

    <Divider />

    <SimpleGrid columns={{ lg: 3, sm: 1 }} spacing="2rem">
      <Box>Find your trove</Box>
      <Box>links</Box>
      <Box>newsletter</Box>
    </SimpleGrid>

    <Divider />
    <Box>copyrigt</Box>
  </Box>
);
