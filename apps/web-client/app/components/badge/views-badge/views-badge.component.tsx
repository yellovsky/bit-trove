// global modules
import type { FC } from 'react';
import { Icon } from '@repo/ui/icon';
import { shortenItemsCount } from '@bit-trove/utils/shorten-items-count';
import { Tag, TagLabel, TagLeftIcon } from '@repo/ui/tag';

interface ViewsBadgeProps {
  viewsCount: number;
}

export const ViewsBadge: FC<ViewsBadgeProps> = (props) => (
  <Tag colorScheme="gray" variant="outline">
    <TagLeftIcon>
      <Icon type="eye" />
    </TagLeftIcon>
    <TagLabel>
      {props.viewsCount === undefined ? null : shortenItemsCount(props.viewsCount)}
    </TagLabel>
  </Tag>
);
