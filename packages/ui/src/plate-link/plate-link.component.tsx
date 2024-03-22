// global modules
import { Link } from '@bit-trove/localization/link';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

// local modules
import { plateLink as plateLinkCn, text as textCn } from './plate-link.module.scss';

interface PlateLinkProps extends PropsWithChildren, ComponentProps<typeof Link> {
  image?: string;
}

export const PlateLink: FC<PlateLinkProps> = ({ ...rest }) => (
  <Link {...rest} className={plateLinkCn} style={{ backgroundImage: `url("${rest.image}")` }}>
    <div className={textCn}>{rest.children}</div>
  </Link>
);
