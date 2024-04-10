// global modules
import cn from 'classnames';
import type { FC } from 'react';
import Image from 'next/image';
import type { SupportedLocale } from '@bit-trove/localization/config';

// local modules
// import { FooterCategories } from './footer-categories';

import {
  categoryStripe as categoryStripeCn,
  copyrightHolder as copyrightHolderCn,
  logo as logoCn,
  mainStripe as mainStripeCn,
  pagePadding as pagePaddingCn,
  slogan as sloganCn,
  socialHolder as socialHolderCn,
  socialMediaPlaceholder as socialMediaPlaceholderCn,
  pagePadding as pagePaddingCn,
} from './layout.module.scss';
import { Box, Button, DarkMode, Divider, SimpleGrid, Text } from '@chakra-ui/react';
import { FooterCategories } from './footer-categories';

interface FooterProps {}

export const Footer: FC<FooterProps> = ({}) => (
  <Box className={pagePaddingCn} as="footer" bg="black" color="gray.400">
    <Box>
      <FooterCategories className={cn(pagePaddingCn, categoryStripeCn)} />
    </Box>

    <Divider borderColor="gray.600" />

    <SimpleGrid columns={{ sm: 1, lg: 3 }} spacing="2rem">
      <Box>Find your trove</Box>
      <Box>links</Box>
      <Box>newsletter</Box>
    </SimpleGrid>

    <Divider borderColor="gray.600" />
    <Box>copyrigt</Box>
  </Box>
);
