// global modules
import type { Author } from '@bit-trove/api-models/author';
import type { FC } from 'react';
import { getUploadFileUrl } from '@bit-trove/api-models/upload-file';
import { SmallBadge } from '@bit-trove/ui/small-badge';

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
        <div
          className={imgCn}
          style={{
            backgroundImage: `url("${getUploadFileUrl(author.avatar.data.attributes, 'thumbnail')}")`,
          }}
        />
      ) : null
    }
  >
    {author.display_name}
  </SmallBadge>
);
