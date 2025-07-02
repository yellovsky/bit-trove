import type { FC, PropsWithChildren } from 'react';

import { cn } from '@repo/ui/lib/utils';

interface PaperProps extends PropsWithChildren {
  className?: string;
}

export const Paper: FC<PaperProps> = ({ children, className }) => {
  return <div className={cn('rounded-default border border-border bg-gray-2 p-4', className)}>{children}</div>;
};
