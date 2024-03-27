// global modules
import cn from 'classnames';
import { Link } from '@bit-trove/localization/link';
import type { ComponentProps, FC, HTMLAttributes, ReactNode } from 'react';

// local modules
import {
  link as linkCn,
  holder as holderCn,
  narrow as narrowCn,
  pending as pendingCn,
} from './small-badge.module.scss';

interface CommonSmallBadgeProps {
  icon?: ReactNode;
  narrow?: boolean;
  textClassName?: string;
}

type SmallBadgeLinkProps = ComponentProps<typeof Link> & CommonSmallBadgeProps;
type SmallBadgeDivProps = HTMLAttributes<HTMLDivElement> & CommonSmallBadgeProps;

type SmallBadgeProps = SmallBadgeLinkProps | SmallBadgeDivProps;

export const SmallBadge: FC<SmallBadgeProps> = ({ narrow, icon, textClassName, ...rest }) => {
  const content = (
    <>
      {icon ? <div>{icon}</div> : null}
      <div className={textClassName}>{rest.children}</div>
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

export const SmallBadgePending: FC<{ className?: string }> = ({ ...rest }) => (
  <div {...rest} className={cn(rest.className, pendingCn, holderCn)}>
    &nbsp;
  </div>
);
