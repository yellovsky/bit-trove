// global modules
import Link, { type LinkProps } from 'next/link';
import type { FC, PropsWithChildren } from 'react';

// local modules
import { plateLink as plateLinkCn, text as textCn } from './plate-link.module.scss';

interface PlateLinkProps extends PropsWithChildren, LinkProps {
  image?: string;
}

export const PlateLink: FC<PlateLinkProps> = ({ ...rest }) => {
  return (
    <Link {...rest} className={plateLinkCn} style={{ backgroundImage: `url("${rest.image}")` }}>
      <div className={textCn}>{rest.children}</div>
    </Link>
  );
};
