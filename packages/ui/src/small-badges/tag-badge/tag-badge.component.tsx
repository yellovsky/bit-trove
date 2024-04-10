// global modules
import cn from 'classnames';
import { Icon } from '@bit-trove/ui/icon';
import { SmallBadge } from '@bit-trove/ui/small-badge';
import type { UrlObject } from 'url';
import type { FC, MouseEventHandler } from 'react';

// local modules
import { holder as holderCn } from './tag-badge.module.scss';

interface SmallTagBadgeProps {
  children: string;
  href?: string | UrlObject;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const SmallTagBadge: FC<SmallTagBadgeProps> = (props) => (
  <SmallBadge
    {...props}
    noLinkStyle
    className={cn(holderCn)}
    icon={<Icon type="tag" />}
    iconSize="small"
  />
);
