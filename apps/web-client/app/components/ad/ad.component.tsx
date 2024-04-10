// global modules
import type { FC } from 'react';
import { AspectRatio, Skeleton } from '@chakra-ui/react';

interface AdProps {
  layout: 'horizontal' | 'square';
}

export const Ad: FC<AdProps> = ({ layout }) => (
  <AspectRatio ratio={layout === 'square' ? 1 : 728 / 90}>
    <Skeleton h="100%" w="100%" />
  </AspectRatio>
);
