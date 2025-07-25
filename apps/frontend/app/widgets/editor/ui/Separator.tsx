import type { ComponentProps, FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Separator
 * -----------------------------------------------------------------------------------------------*/
const SEPARATOR_NAME = 'Separator';

type Orientation = 'horizontal' | 'vertical';

type SeparatorProps = ComponentProps<'div'> & {
  orientation?: Orientation;
  decorative?: boolean;
};

const Separator: FC<SeparatorProps> = ({ decorative, orientation = 'vertical', className = '', ...rest }) => {
  const ariaOrientation = orientation === 'vertical' ? orientation : undefined;
  const semanticProps = decorative ? { role: 'none' } : { 'aria-orientation': ariaOrientation, role: 'separator' };

  return (
    <div
      className={cn(
        'shrink-0 bg-border data-[orientation="horizontal"]:h-px data-[orientation="vertical"]:h-4 data-[orientation="horizontal"]:w-full data-[orientation="vertical"]:w-px',
        className
      )}
      data-orientation={orientation}
      {...semanticProps}
      {...rest}
    />
  );
};

Separator.displayName = SEPARATOR_NAME;

/* -----------------------------------------------------------------------------------------------*/

export { Separator };
export type { SeparatorProps, Orientation };
