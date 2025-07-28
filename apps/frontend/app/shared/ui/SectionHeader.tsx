import type { FC, ReactNode } from 'react';

import { Heading } from '@repo/ui/components/Typography';
import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * SectionHeader
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'SectionHeader';

type SectionHeaderProps = {
  title: ReactNode;
  titleId?: string;
  order?: 1 | 2 | 3;
  action?: ReactNode;
  className?: string;
};

const SectionHeader: FC<SectionHeaderProps> = ({ title, titleId, order = 2, action, className }) => (
  <div className={cn('flex items-center justify-between', className)}>
    <Heading id={titleId} order={order}>
      {title}
    </Heading>

    {action && <div className="flex items-center">{action}</div>}
  </div>
);

SectionHeader.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { SectionHeader };

export type { SectionHeaderProps };
