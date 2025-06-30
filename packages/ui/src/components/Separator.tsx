import * as SeparatorPrimitive from '@radix-ui/react-separator';
import type { ComponentProps, FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

export const Separator: FC<ComponentProps<typeof SeparatorPrimitive.Root>> = ({
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
