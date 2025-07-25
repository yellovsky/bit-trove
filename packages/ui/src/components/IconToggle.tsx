import * as TogglePrimitive from '@radix-ui/react-toggle';
import type { ComponentProps, FC } from 'react';

import type { Palette } from '@repo/ui/lib/palette';

import { IconButton } from './IconButton';

/* -------------------------------------------------------------------------------------------------
 * IconToggle
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'IconToggle';

type IconToggleProps = ComponentProps<typeof TogglePrimitive.Root> & { palette?: Palette; isActive?: boolean };

const IconToggle: FC<IconToggleProps> = ({ isActive, children, ...props }) => (
  <TogglePrimitive.Root asChild data-slot="toggle" {...props} data-state={isActive ? 'on' : 'off'}>
    <IconButton type="button" variant={isActive ? 'solid' : 'ghost'}>
      {children}
    </IconButton>
  </TogglePrimitive.Root>
);

IconToggle.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { IconToggle };
export type { IconToggleProps };
