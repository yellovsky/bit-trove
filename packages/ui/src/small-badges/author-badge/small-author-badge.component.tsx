// global modules
import Image from 'next/image';
import type { FC } from 'react';
import { SmallBadge } from '@repo/ui/small-badge';
import type { Author } from '@repo/api-models/author';
import { getUploadFileUrl } from '@repo/api-models/upload-file';

// local modules
import { holder as holderCn, img as imgCn } from './small-author-badge.module.scss';

interface SmallAuthorBadgeProps {
  author: Author;
}

export const SmallAuthorBadge: FC<SmallAuthorBadgeProps> = ({ author }) => (
  <SmallBadge
    className={holderCn}
    icon={
      author.avatar.data ? (
        <Image
          alt="avatar"
          className={imgCn}
          src={getUploadFileUrl(author.avatar.data.attributes, 'thumbnail')}
          width={20}
          height={20}
        />
      ) : null
    }
  >
    {author.display_name}
  </SmallBadge>
);
