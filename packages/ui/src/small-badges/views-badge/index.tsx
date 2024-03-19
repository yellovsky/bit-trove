// global modules
import { SmallBadge } from '@repo/ui/small-badge';
import type { FC, PropsWithChildren } from 'react';

// local modules
import { holder as holderCn, eye as eyeCn } from './views-badge.module.scss';

export const SmallViewsBadge: FC<PropsWithChildren> = ({ children }) => (
  <SmallBadge className={holderCn} icon={<div className={eyeCn} />}>
    {children}
  </SmallBadge>
);
