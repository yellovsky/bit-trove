// global modules
import type { FC } from 'react';
import { Box, Divider, SimpleGrid } from '@chakra-ui/react';

// local modules
import { FooterCategories } from './footer-categories';
import { pagePadding as pagePaddingCn } from './layout.module.scss';

export const Footer: FC = () => (
  <Box as="footer" bg="black" className={pagePaddingCn} color="gray.400">
    <Box>
      <FooterCategories />
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
