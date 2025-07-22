import type { ComponentProps, FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Paper
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'Paper';

type PaperProps = ComponentProps<'div'>;

const Paper: FC<PaperProps> = ({ className, ...rest }) => (
  <div className={cn('rounded-default border border-border bg-panel p-4', className)} {...rest} />
);

Paper.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { Paper };
export type { PaperProps };
