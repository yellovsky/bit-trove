import * as SwitchPrimitive from '@radix-ui/react-switch';
import type { FC } from 'react';

import { getPaletteClassName, type WithPalette } from '@repo/ui/lib/palette';
import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Switch
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'Switch';

type SwitchProps = SwitchPrimitive.SwitchProps & WithPalette;

const Switch: FC<SwitchProps> = ({ className, palette, ...props }) => (
  <SwitchPrimitive.Root
    className={cn(
      'peer focus-visible-outline inset-ring inset-ring-gray-a5 inline-flex h-5 w-8.5 shrink-0 cursor-pointer items-center rounded-full shadow-xs transition-all disabled:cursor-not-allowed data-[disabled]:bg-gray-a3 not-data-[disabled]:data-[state=checked]:bg-primary-track not-data-[disabled]:data-[state=unchecked]:bg-gray-a3',
      palette && getPaletteClassName(palette),
      className
    )}
    data-slot="switch"
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        'pointer-events-none block size-4.5 rounded-full bg-white ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-3px)] data-[state=unchecked]:translate-x-px'
      )}
      data-slot="switch-thumb"
    />
  </SwitchPrimitive.Root>
);

Switch.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { Switch };

export type { SwitchProps };
