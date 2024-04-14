// global modules
import type { FC } from 'react';
import { Icon } from '@bit-trove/ui/icon';
import { shortenItemsCount } from '@bit-trove/utils/shorten-items-count';
import { Tag, TagLabel, TagLeftIcon } from '@bit-trove/ui/tag';

interface ViewsBadgeProps {
  viewsCount: number;
}

export const ViewsBadge: FC<ViewsBadgeProps> = (props) => (
  <Tag colorScheme="gray" variant="outline">
    <TagLeftIcon>
      <Icon type="chevron_down" />
    </TagLeftIcon>
    <TagLabel>
      {props.viewsCount === undefined ? null : shortenItemsCount(props.viewsCount)}
    </TagLabel>
  </Tag>
);
