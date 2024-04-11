// global modules
import cn from 'classnames';
import { Link } from '@bit-trove/ui/link';
import type { ComponentProps, FC } from 'react';
import { Tag, TagProps } from '@chakra-ui/react';

// local modules
import { tagLink as tagLinkCn } from './tag-link.module.scss';

interface TagLinkProps extends TagProps {
  to: ComponentProps<typeof Link>['to'];
}

export const TagLink: FC<TagLinkProps> = ({ to, ...rest }) => (
  <Tag {...rest} as={Link} className={cn(rest.className, tagLinkCn)} to={to} />
);
