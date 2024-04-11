// global modules
import cn from 'classnames';
import { Icon } from '@bit-trove/ui/icon';
import { SmallBadge } from '@bit-trove/ui/small-badge';
import type { UrlObject } from 'url';
import type { ComponentProps, FC, MouseEventHandler } from 'react';

// local modules
import { holder as holderCn } from './tag-badge.module.scss';
import { Tag, TagLeftIcon, createIcon, Link as ChakraLink } from '@chakra-ui/react';
import { Link } from '../../link';

import { TagLink } from '@bit-trove/ui/tag-link';

interface SmallTagBadgeProps {
  children: string;
  to?: ComponentProps<typeof Link>['to'];
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const TagIcon = createIcon({
  displayName: 'UpDownIcon',
  viewBox: '0 0 32 32',

  path: (
    <path
      d="M31.999 13.008l-0-10.574c0-1.342-1.092-2.434-2.433-2.434h-10.793c-0.677 0-1.703 0-2.372 0.67l-15.81 15.811c-0.38 0.38-0.59 0.884-0.59 1.421 0 0.538 0.209 1.043 0.589 1.423l12.088 12.085c0.379 0.381 0.883 0.59 1.421 0.59s1.042-0.209 1.421-0.589l15.811-15.812c0.678-0.677 0.674-1.65 0.67-2.591zM29.915 14.186l-15.826 15.811-12.086-12.101 15.794-15.797c0.159-0.099 0.732-0.099 0.968-0.099l0.45 0.002 10.35-0.002c0.239 0 0.433 0.195 0.433 0.434v10.582c0.002 0.38 0.004 1.017-0.084 1.169zM24 4c-2.209 0-4 1.791-4 4s1.791 4 4 4c2.209 0 4-1.791 4-4s-1.791-4-4-4zM24 10c-1.105 0-2-0.896-2-2s0.895-2 2-2 2 0.896 2 2-0.895 2-2 2z"
      fill="currentColor"
    />
  ),
});

export const SmallTagBadge: FC<SmallTagBadgeProps> = (props) => (
  <>
    <Tag
      // to={props.to || ''}
      // className={cn(holderCn)}
      size="md"
      variant="link"
      // colorScheme="none"
    >
      <TagLeftIcon boxSize="12px" mr={1} as={TagIcon} />

      {/* <SmallBadge className={cn(holderCn, getTypeCh(children))} href={href}> */}
      {props.children}
      {/* </SmallBadge> */}
    </Tag>
    <ChakraLink href="/">ChakraLink</ChakraLink>
  </>

  // <SmallBadge
  //   {...props}
  //   noLinkStyle
  //   className={cn(holderCn)}
  //   icon={<Icon type="tag" />}
  //   iconSize="small"
  // />
);
