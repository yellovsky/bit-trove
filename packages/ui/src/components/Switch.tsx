import type { SwitchProps } from '@radix-ui/react-switch';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import type { FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

export const Switch: FC<SwitchProps & React.RefAttributes<HTMLButtonElement>> = ({ className, ...props }) => (
  <SwitchPrimitive.Root
    className={cn(
      'peer inset-ring inset-ring-input-border inline-flex h-4 w-7 shrink-0 items-center rounded-full border border-transparent shadow-xs outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-accent data-[state=unchecked]:bg-input-bg',
      className
    )}
    data-slot="switch"
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        'pointer-events-none block size-3.5 rounded-full bg-white ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0'
      )}
      data-slot="switch-thumb"
    />
  </SwitchPrimitive.Root>
);
