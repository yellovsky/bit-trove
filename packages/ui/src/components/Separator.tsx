import * as SeparatorPrimitive from '@radix-ui/react-separator';
import type { FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Separator
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'Separator';

const Separator: FC<SeparatorPrimitive.SeparatorProps> = ({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}) => (
  <SeparatorPrimitive.Root
    className={cn(
      'shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px',
      className
    )}
    data-slot="separator"
    decorative={decorative}
    orientation={orientation}
    {...props}
  />
);

Separator.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { Separator };

export type { SeparatorProps } from '@radix-ui/react-separator';
