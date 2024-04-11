// global modules
import type { FC } from 'react';
import { AspectRatio, Button, DarkMode } from '@chakra-ui/react';
import { Skeleton } from '@bit-trove/ui/skeleton';

interface AdProps {
  layout: 'horizontal' | 'square';
}

export const Ad: FC<AdProps> = ({ layout }) => (
  <>
    <Button>123</Button>
    <Button colorScheme="blue">123</Button>
    <Button variant="outline" colorScheme="blue">
      123
    </Button>
    <DarkMode>
      <Button>123</Button>
      <Button colorScheme="blue">123</Button>
      <Button variant="outline" colorScheme="blue">
        123
      </Button>
    </DarkMode>

    <AspectRatio ratio={layout === 'square' ? 1 : 728 / 90}>
      <Skeleton br="3xl" />
    </AspectRatio>
  </>
);
