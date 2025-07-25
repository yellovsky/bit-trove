import type { ComponentProps, FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

import { getShortcutKey } from '../lib';

/* -------------------------------------------------------------------------------------------------
 * ShortcutKey
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'ShortcutKey';

type ShortcutKeyProps = ComponentProps<'span'> & { keys: string[] };

const ShortcutKey: FC<ShortcutKeyProps> = ({ className, keys, ...props }) => {
  const modifiedKeys = keys.map((key) => getShortcutKey(key));
  const ariaLabel = modifiedKeys.map((shortcut) => shortcut.readable).join(' + ');

  return (
    // biome-ignore lint/a11y/useAriaPropsSupportedByRole: it's a keyboard shortcut
    <span aria-label={ariaLabel} className={cn('inline-flex items-center gap-0.5', className)} {...props}>
      {modifiedKeys.map((shortcut) => (
        <kbd
          className={cn(
            'inline-block min-w-2.5 text-center align-baseline font-medium font-sans text-gray-a10 text-xs capitalize',
            className
          )}
          key={shortcut.symbol}
          {...props}
        >
          {shortcut.symbol}
        </kbd>
      ))}
    </span>
  );
};

ShortcutKey.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { ShortcutKey };
export type { ShortcutKeyProps };
