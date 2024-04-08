// global modules
import cn from 'classnames';
import Image from 'next/image';
import { Link } from '@bit-trove/localization/link';
import type { UrlObject } from 'url';
import type { FC, ReactNode } from 'react';

// local modules
import {
  cardHolder as cardHolderCn,
  imageHolder as imageHolderCn,
  textHolder as textHolderCn,
} from './simple-square-card.module.scss';

interface SimpleSquareCardProps {
  name: ReactNode;
  className?: string;
  href: string | UrlObject;
  cover: string | undefined;
}

export const SimpleSquareCard: FC<SimpleSquareCardProps> = ({ className, href, cover, name }) => (
  <Link className={cn(cardHolderCn, className)} href={href}>
    <div className={imageHolderCn}>
      {cover ? (
        <Image fill unoptimized alt="cover" src={cover} style={{ objectFit: 'cover' }} />
      ) : null}
    </div>
    <div className={textHolderCn}>{name}</div>
  </Link>
);
