import type { FC } from 'react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

import { useColorScheme } from '@repo/ui/lib/color-scheme-atom';

/* -------------------------------------------------------------------------------------------------
 * Toaster
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'Toaster';

const Toaster: FC<ToasterProps> = ({ ...props }) => {
  const colorScheme = useColorScheme();

  return (
    <Sonner
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--color-popover)',
          '--normal-border': 'var(--color-border)',
          '--normal-text': 'var(--color-popover-foreground)',
        } as React.CSSProperties
      }
      theme={colorScheme}
      {...props}
    />
  );
};

Toaster.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { Toaster };
export type { ToasterProps };
