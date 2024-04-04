// global modules
import type { FC, PropsWithChildren } from 'react';
import { SmallBadge } from '@bit-trove/ui/small-badge';

// local modules
import { holder as holderCn, icon as iconCn } from './comments-count-badge.module.scss';

export const SmallCommentsCountBadge: FC<PropsWithChildren> = ({ children }) => (
  <SmallBadge narrow className={holderCn} icon={<div className={iconCn} />}>
    {children}
  </SmallBadge>
);
