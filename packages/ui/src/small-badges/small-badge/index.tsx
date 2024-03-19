import cn from 'classnames';
import Link, { type LinkProps } from 'next/link';
import type { ComponentProps, FC, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { holder as holderCn, link as linkCn, narrow as narrowCn } from './small-badge.module.scss';

interface CommonSmallBadgeProps {
  icon?: ReactNode;
  narrow?: boolean;
}

type SmallBadgeLinkProps = ComponentProps<typeof Link> & CommonSmallBadgeProps;
type SmallBadgeDivProps = HTMLAttributes<HTMLDivElement> & CommonSmallBadgeProps;

type SmallBadgeProps = SmallBadgeLinkProps | SmallBadgeDivProps;

export const SmallBadge: FC<SmallBadgeProps> = ({ narrow, icon, ...rest }) => {
  const content = (
    <>
      {icon ? <div>{icon}</div> : null}
      <div>{rest.children}</div>
    </>
  );

  const commonCn = cn(rest.className, holderCn, narrow && narrowCn);

  return 'href' in rest ? (
    <Link {...rest} className={cn(commonCn, linkCn)}>
      {content}
    </Link>
  ) : (
    <div {...rest} className={commonCn}>
      {content}
    </div>
  );
};
