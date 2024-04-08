// global modules
import cn from 'classnames';
import { Link } from '@bit-trove/localization/link';
import type { ComponentProps, FC, HTMLAttributes, ReactNode } from 'react';

// local modules
import {
  big as bigCn,
  icon as iconCn,
  link as linkCn,
  small as smallCn,
  holder as holderCn,
  narrow as narrowCn,
  pending as pendingCn,
} from './small-badge.module.scss';

interface CommonSmallBadgeProps {
  icon?: ReactNode;
  narrow?: boolean;
  noLinkStyle?: boolean;
  textClassName?: string;
  iconSize?: 'big' | 'small';
}

type SmallBadgeLinkProps = ComponentProps<typeof Link> & CommonSmallBadgeProps;
type SmallBadgeButtonProps = HTMLAttributes<HTMLButtonElement> & CommonSmallBadgeProps;
type SmallBadgeDivProps = Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> & CommonSmallBadgeProps;

type SmallBadgeProps = SmallBadgeLinkProps | SmallBadgeButtonProps | SmallBadgeDivProps;

export const SmallBadge: FC<SmallBadgeProps> = ({
  icon,
  narrow,
  iconSize,
  noLinkStyle,
  textClassName,
  ...rest
}) => {
  const content = (
    <>
      {icon ? (
        <div className={cn(iconCn, iconSize === 'big' && bigCn, iconSize === 'small' && smallCn)}>
          {icon}
        </div>
      ) : null}
      <div className={textClassName}>{rest.children}</div>
    </>
  );

  const commonCn = cn(rest.className, holderCn, narrow && narrowCn);

  return 'href' in rest ? (
    <Link {...rest} className={cn(commonCn, !noLinkStyle && linkCn)}>
      {content}
    </Link>
  ) : 'onClick' in rest ? (
    <button {...rest} className={cn(commonCn, !noLinkStyle && linkCn)}>
      {content}
    </button>
  ) : (
    <div {...(rest as Omit<HTMLAttributes<HTMLDivElement>, 'onClick'>)} className={commonCn}>
      {content}
    </div>
  );
};

export const SmallBadgePending: FC<{ className?: string }> = ({ ...rest }) => (
  <div {...rest} className={cn(rest.className, pendingCn, holderCn)}>
    &nbsp;
  </div>
);
