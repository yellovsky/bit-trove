// global modules
import cn from 'classnames';
import { Icon } from '@bit-trove/ui/icon';
import { SmallBadge } from '@bit-trove/ui/small-badge';
import type { UrlObject } from 'url';
import type { FC, MouseEventHandler } from 'react';

// local modules
import {
  holder as holderCn,
  type1 as type1Cn,
  type2 as type2Cn,
  type3 as type3Cn,
  type4 as type4Cn,
  type5 as type5Cn,
  type6 as type6Cn,
} from './tag-badge.module.scss';

const typeCn = [type1Cn, type2Cn, type3Cn, type4Cn, type5Cn, type6Cn] as const;
const getTypeCh = (text: string): string => {
  const typeIndex = text.charCodeAt(0) % typeCn.length;
  return typeCn[typeIndex] || typeCn[0];
};

interface SmallTagBadgeProps {
  children: string;
  href?: string | UrlObject;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const SmallTagBadge: FC<SmallTagBadgeProps> = (props) => (
  <SmallBadge
    {...props}
    noLinkStyle
    className={cn(holderCn, getTypeCh(props.children))}
    icon={<Icon type="tag" />}
    iconSize="small"
  />
);
