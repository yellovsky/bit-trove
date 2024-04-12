// global modules
import { Fragment, type FC } from 'react';
import { Skeleton as SkeletonCh, AspectRatio, DarkMode } from '@chakra-ui/react';
import { Skeleton } from '@bit-trove/ui/skeleton';

import { Button } from '@bit-trove/ui/button';

interface AdProps {
  layout: 'horizontal' | 'square';
}

const css = [
  'primary',
  'yellow',
  'gray',
  'red',
  'green',
  'orange',
  'black-alpha',
  'white-alpha',
] as const;
export const Ad: FC<AdProps> = ({ layout }) => (
  <>
    <div>
      {css.map((colorSchema) => (
        <Fragment key={colorSchema}>
          <Button variant="filled" br="none" colorSchema={colorSchema}>
            {colorSchema}
          </Button>
          <br />
        </Fragment>
      ))}

      {css.map((colorSchema) => (
        <Fragment key={colorSchema}>
          <Button variant="outline" colorSchema={colorSchema}>
            {colorSchema}
          </Button>
          <br />
        </Fragment>
      ))}
    </div>
    <DarkMode>
      <AspectRatio ratio={layout === 'square' ? 1 : 728 / 90}>
        <Skeleton br="sm" />
      </AspectRatio>
      <AspectRatio ratio={layout === 'square' ? 1 : 728 / 90}>
        <SkeletonCh br="sm" />
      </AspectRatio>
    </DarkMode>
  </>
);
