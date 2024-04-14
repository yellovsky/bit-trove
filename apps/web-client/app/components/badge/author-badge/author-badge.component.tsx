// global modules
import type { Author } from '@bit-trove/api-models/author';
import type { FC } from 'react';
import { getUploadFileUrl } from '@bit-trove/api-models/upload-file';

// local modules
import { holder as holderCn, img as imgCn } from './small-author-badge.module.scss';
import { Tag, TagLabel } from '@bit-trove/ui/tag';

import { Avatar } from '@bit-trove/ui/avatar';

interface AuthorBadgeProps {
  author: Author;
}

export const AuthorBadge: FC<AuthorBadgeProps> = ({ author }) => (
  <Tag size="md" boxShadow="none" variant="outline" colorScheme="gray">
    {!author.avatar.data ? null : (
      <Avatar
        variant="outline"
        colorScheme="blackAlpha"
        src={getUploadFileUrl(author.avatar.data.attributes, 'thumbnail')}
        size="2xs"
        name={author.display_name}
        ml={-1}
        mr={1}
      />
    )}
    <TagLabel>{author.display_name}</TagLabel>
  </Tag>
  // <SmallBadge
  //   className={holderCn}
  //   icon={
  //     author.avatar.data ? (
  //       <div
  //         className={imgCn}
  //         style={{
  //           backgroundImage: `url("${getUploadFileUrl(author.avatar.data.attributes, 'thumbnail')}")`,
  //         }}
  //       />
  //     ) : null
  //   }
  // >
  //   {author.display_name}
  // </SmallBadge>
);
