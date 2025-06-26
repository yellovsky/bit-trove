import type { ComponentProps, FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

type ParagraphProps = ComponentProps<'p'>;

export const Paragraph: FC<ParagraphProps> = ({ className, ...rest }) => (
  <p {...rest} className={cn('mt-0 mb-5', className)} />
);
