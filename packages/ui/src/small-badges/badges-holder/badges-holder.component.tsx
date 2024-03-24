// gloval modules
import cn from 'classnames';
import type { FC, PropsWithChildren } from 'react';

// local modules
import { badgesHolder as badgesHolderCn } from './badges-holder.module.scss';

interface SmallBadgesHolderProps extends PropsWithChildren {
  className?: string;
}

export const SmallBadgesHolder: FC<SmallBadgesHolderProps> = ({ className, children }) => (
  <div className={cn(badgesHolderCn, className)}>{children}</div>
);
