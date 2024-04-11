// global modules
import cn from 'classnames';
import { Link } from '@bit-trove/ui/link';
import type { ComponentProps, FC, HTMLAttributes, ReactNode } from 'react';

// local modules
import {
  big as bigCn,
  holder as holderCn,
  icon as iconCn,
  link as linkCn,
  narrow as narrowCn,
  pending as pendingCn,
  small as smallCn,
} from './small-badge.module.scss';
import { Skeleton, Tag } from '@chakra-ui/react';

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

  return 'to' in rest ? (
    <Link {...rest} plain className={cn(commonCn, !noLinkStyle && linkCn)}>
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
  <Skeleton borderRadius="md">
    <Tag size="md" w="5rem" />
  </Skeleton>
);
