// global modules
import cn from 'classnames';
import type { FC } from 'react';
import type { UrlObject } from 'url';
import { SmallBadge } from '@bit-trove/ui/small-badge';

// local modules
import {
  holder as holderCn,
  type1 as type1Cn,
  type2 as type2Cn,
  type3 as type3Cn,
  type4 as type4Cn,
  type5 as type5Cn,
  type6 as type6Cn,
} from './category-badge.module.scss';

const typeCn = [type1Cn, type2Cn, type3Cn, type4Cn, type5Cn, type6Cn] as const;
const getTypeCh = (text: string): string => {
  const typeIndex = text.charCodeAt(0) % typeCn.length;
  return typeCn[typeIndex] || typeCn[0];
};

interface SmallCategoryBadgeProps {
  href: string | UrlObject;
  children: string;
}

export const SmallCategoryBadge: FC<SmallCategoryBadgeProps> = ({ children, href }) => {
  return (
    <SmallBadge className={cn(holderCn, getTypeCh(children))} href={href}>
      {children}
    </SmallBadge>
  );
};
