import { useTheme } from 'next-themes';
import type { FC } from 'react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

export const Toaster: FC<ToasterProps> = ({ ...props }) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-border': 'var(--border)',
          '--normal-text': 'var(--popover-foreground)',
        } as React.CSSProperties
      }
      theme={theme as ToasterProps['theme']}
      {...props}
    />
  );
};
