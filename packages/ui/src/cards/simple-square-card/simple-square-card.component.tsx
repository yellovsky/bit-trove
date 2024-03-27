// global modules
import cn from 'classnames';
import Image from 'next/image';
import type { UrlObject } from 'url';
import type { FC, ReactNode } from 'react';
import { Link } from '@bit-trove/localization/link';

// local modules
import {
  cardHolder as cardHolderCn,
  textHolder as textHolderCn,
  imageHolder as imageHolderCn,
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
        <Image fill unoptimized style={{ objectFit: 'cover' }} alt="cover" src={cover} />
      ) : null}
    </div>
    <div className={textHolderCn}>{name}</div>
  </Link>
);
