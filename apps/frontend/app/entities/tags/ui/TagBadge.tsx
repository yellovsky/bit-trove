import { HashIcon } from 'lucide-react';
import type { FC } from 'react';

import type { Tag } from '@repo/api-models';
import { Badge, type BadgeProps } from '@repo/ui/components/Badge';
import { Link } from '@repo/ui/components/Link';

interface TagBadgeProps extends BadgeProps {
  tag: Tag;
  nonInteractive?: boolean;
}

export const TagBadge: FC<TagBadgeProps> = ({ tag, nonInteractive, ...props }) => {
  const badgeProps: BadgeProps = { ...props };

  return nonInteractive ? (
    <Badge {...badgeProps}>
      <HashIcon />
      {tag.name}
    </Badge>
  ) : (
    <Badge {...badgeProps} asChild>
      <Link to="/" variant="unstyled">
        <HashIcon />
        {tag.name}
      </Link>
    </Badge>
  );
};
