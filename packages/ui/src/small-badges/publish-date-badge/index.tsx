// global modules
import { SmallBadge } from '@repo/ui/small-badge';
import type { FC, PropsWithChildren } from 'react';

// local modules
import { holder as holderCn, icon as iconCn } from './views-badge.module.scss';

export const PublishDateBadge: FC<PropsWithChildren> = ({ children }) => (
  <SmallBadge narrow className={holderCn} icon={<div className={iconCn} />}>
    {children}
  </SmallBadge>
);
