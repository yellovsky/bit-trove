// global modules
import type { Author } from '@bit-trove/api-models/author';
import type { FC } from 'react';
import { getUploadFileUrl } from '@bit-trove/api-models/upload-file';
import { SmallBadge } from '@bit-trove/ui/small-badge';

// local modules
import { holder as holderCn, img as imgCn } from './small-author-badge.module.scss';
import { Avatar, Tag, TagLabel } from '@chakra-ui/react';

interface SmallAuthorBadgeProps {
  author: Author;
}

export const SmallAuthorBadge: FC<SmallAuthorBadgeProps> = ({ author }) => (
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
