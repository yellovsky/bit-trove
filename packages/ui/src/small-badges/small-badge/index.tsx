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

export const SmallBadge: FC<SmallBadgeProps> = (props) => {
  const content = (
    <>
      {props.icon ? <div>{props.icon}</div> : null}
      <div>{props.children}</div>
    </>
  );

  const commonCn = cn(props.className, holderCn, props.narrow && narrowCn);

  return 'href' in props ? (
    <Link {...props} className={cn(commonCn, linkCn)}>
      {content}
    </Link>
  ) : (
    <div {...props} className={commonCn}>
      {content}
    </div>
  );
};
