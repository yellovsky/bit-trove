// global modules
import cn from 'classnames';
import type { ComponentProps, FC } from 'react';
import { SmallBadge } from '@bit-trove/ui/small-badge';
import type { UrlObject } from 'url';

// local modules
import {
  holder as holderCn,
  type1 as type1Cn,
  type2 as type2Cn,
  type3 as type3Cn,
  type4 as type4Cn,
  type5 as type5Cn,
  type6 as type6Cn,
} from './category-badge.module.scss';
import { Tag } from '@chakra-ui/react';
import { Link } from '../../link';

const typeCn = [type1Cn, type2Cn, type3Cn, type4Cn, type5Cn, type6Cn] as const;
const getTypeCh = (text: string): string => {
  const typeIndex = text.charCodeAt(0) % typeCn.length;
  return typeCn[typeIndex] || typeCn[0];
};

interface SmallCategoryBadgeProps {
  to: ComponentProps<typeof Link>['to'];
  children: string;
}

export const SmallCategoryBadge: FC<SmallCategoryBadgeProps> = ({ children, to }) => {
  return (
    <Tag
      plain
      className={cn(holderCn, getTypeCh(children))}
      size="md"
      as={Link}
      to={to}
      boxShadow="none"
      variant="outline"
      colorScheme="gray"
    >
      {/* <SmallBadge className={cn(holderCn, getTypeCh(children))} href={href}> */}
      {children}
      {/* </SmallBadge> */}
    </Tag>
  );
};
