// global modules
import type { AuthorSegment } from '@bit-trove/api-models/author';
import { Avatar } from '@repo/ui/avatar';
import type { FC } from 'react';
import { getUploadFileUrl } from '@bit-trove/api-models/upload-file';
import { Tag, TagLabel, TagLeftIcon } from '@repo/ui/tag';

interface AuthorBadgeProps {
  author: AuthorSegment;
}

export const AuthorBadge: FC<AuthorBadgeProps> = ({ author }) => {
  const avatartSrc = author.avatar.data?.attributes;

  return (
    <Tag colorScheme="gray" size="md" variant="borderless">
      <TagLeftIcon>
        <Avatar
          size="2xs"
          src={avatartSrc ? getUploadFileUrl(avatartSrc, 'thumbnail') : undefined}
        />
      </TagLeftIcon>
      <TagLabel>{author.display_name}</TagLabel>
    </Tag>
  );
};
