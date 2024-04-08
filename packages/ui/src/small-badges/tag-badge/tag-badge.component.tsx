// global modules
import cn from 'classnames';
import type { FC, MouseEventHandler } from 'react';
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
} from './tag-badge.module.scss';
import { Icon } from '../../icon';

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
    iconSize="small"
    icon={<Icon type="tag" />}
    className={cn(holderCn, getTypeCh(props.children))}
  />
);
