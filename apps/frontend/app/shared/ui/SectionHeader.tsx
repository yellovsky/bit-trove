import type { FC, ReactNode } from 'react';

import { Heading } from '@repo/ui/components/Typography';

interface SectionHeaderProps {
  title: ReactNode;
  titleId?: string;
  order?: 1 | 2 | 3;
  action?: ReactNode;
  className?: string;
}

export const SectionHeader: FC<SectionHeaderProps> = ({ title, titleId, order = 2, action, className = '' }) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <Heading id={titleId} order={order}>
        {title}
      </Heading>
      {action && <div className="flex items-center">{action}</div>}
    </div>
  );
};
