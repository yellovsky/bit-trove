// global modules
import cn from 'classnames';
import type { FC } from 'react';
import { shortenItemsCount } from '@bit-trove/utils/shorten-items-count';
import { SmallBadge } from '@bit-trove/ui/small-badge';

// local modules
import {
  eye as eyeCn,
  hidden as hiddenCn,
  holder as holderCn,
  textClassName as textClassNameCn,
} from './views-badge.module.scss';

interface SmallViewsBadgeProps {
  className?: string;
  viewsCount: number | undefined;
}

export const SmallViewsBadge: FC<SmallViewsBadgeProps> = ({ className, viewsCount }) => (
  <SmallBadge
    className={cn(holderCn, className)}
    icon={<div className={cn(eyeCn, viewsCount === undefined && hiddenCn)} />}
    textClassName={textClassNameCn}
  >
    {viewsCount === undefined ? null : shortenItemsCount(viewsCount)}
  </SmallBadge>
);
