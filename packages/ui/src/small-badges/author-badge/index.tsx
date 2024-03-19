import Image from 'next/image';
import type { FC } from 'react';
import type { UrlObject } from 'url';
import { holder as holderCn, img as imgCn } from './small-author-badge.module.scss';
import { SmallBadge } from '../small-badge';

interface SmallAuthorBadgeProps {
  name: string;
  href: string | UrlObject;
  avatar?: string;
}

export const SmallAuthorBadge: FC<SmallAuthorBadgeProps> = (props) => (
  <SmallBadge
    href={props.href}
    className={holderCn}
    icon={<img className={imgCn} src={props.avatar} width={20} height={20} />}
  >
    {props.name}
  </SmallBadge>
);
