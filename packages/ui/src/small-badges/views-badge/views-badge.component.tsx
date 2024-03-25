// global modules
import cn from 'classnames';
import type { FC } from 'react';
import { SmallBadge } from '@repo/ui/small-badge';
import { shortenItemsCount } from '@repo/utils/shorten-items-count';

// local modules
import {
  holder as holderCn,
  eye as eyeCn,
  hidden as hiddenCn,
  textClassName as textClassNameCn,
} from './views-badge.module.scss';

interface SmallViewsBadgeProps {
  className?: string;
  viewsCount: number | undefined;
}

export const SmallViewsBadge: FC<SmallViewsBadgeProps> = ({ className, viewsCount }) => (
  <SmallBadge
    className={cn(holderCn, className)}
    textClassName={textClassNameCn}
    icon={<div className={cn(eyeCn, viewsCount === undefined && hiddenCn)} />}
  >
    {viewsCount === undefined ? null : shortenItemsCount(viewsCount)}
  </SmallBadge>
);
