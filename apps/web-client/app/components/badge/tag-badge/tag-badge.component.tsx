// global modules
import type { FC } from 'react';
import { Icon } from '@repo/ui/icon';
import type { To } from 'history';
import { Tag, TagLabel, TagLeftIcon, TagPending } from '@repo/ui/tag';

interface TagBadgeProps {
  name: string;
  to: To;
}

export const TagBadge: FC<TagBadgeProps> = (props) => (
  <Tag colorScheme="gray" to={props.to} variant="outline">
    <TagLeftIcon>
      <Icon type="tag" />
    </TagLeftIcon>
    <TagLabel>{props.name}</TagLabel>
  </Tag>
);

export const TagBadgePending: FC = () => <TagPending />;
