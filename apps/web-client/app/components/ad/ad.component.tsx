// global modules
import { AspectRatio } from '@bit-trove/ui/aspect-ratio';
import type { FC } from 'react';
import { Skeleton } from '@bit-trove/ui/skeleton';

interface AdProps {
  layout: 'horizontal' | 'square';
}

export const Ad: FC<AdProps> = ({ layout }) => (
  <AspectRatio ratio={layout === 'square' ? 1 : 728 / 90}>
    <Skeleton br="sm" />
  </AspectRatio>
);
