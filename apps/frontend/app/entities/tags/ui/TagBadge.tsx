import { Badge, type BadgeProps } from '@mantine/core';
import { IconHash } from '@tabler/icons-react';
import type { FC } from 'react';

import type { Tag } from '@repo/api-models';

import { Link } from '@shared/ui/link';

import styles from './TagBadge.module.css';

interface TagBadgeProps extends BadgeProps {
  tag: Tag;
}

export const TagBadge: FC<TagBadgeProps> = ({ tag, ...props }) => (
  <Badge
    classNames={{ root: styles.tagBadge }}
    {...props}
    component={Link}
    key={tag.id}
    leftSection={<IconHash size={12} />}
    size="sm"
    to="/"
    underline="never"
    variant="light"
  >
    {tag.name}
  </Badge>
);
