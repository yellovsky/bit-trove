// global modules
import Image from 'next/image';
import type { FC } from 'react';
import { Title } from '@bit-trove/ui/title';
import { Link } from '@bit-trove/localization/link';
import { textEllipsis } from '@bit-trove/utils/text-ellipsis';
import { getUploadFileUrl } from '@bit-trove/api-models/upload-file';
import { BlogpostViewsCount } from '~/components/blogpost/views-count';

import {
  blogPostLink,
  type BlogpostResponseData,
  type BlogpostSegmentEntity,
} from '@bit-trove/api-models/blog-post';

// local modules
import { SmallAuthorBadge } from '@bit-trove/ui/small-author-badge';
import { SmallBadgesHolder } from '@bit-trove/ui/small-badges-holder';
import { PublishDateBadge } from '@bit-trove/ui/small-publish-date-badge';

import {
  text as textCn,
  title as titleCn,
  badges as badgesCn,
  viewsCount as viewsCountCn,
  coverHolder as coverHolderCn,
  coverRestrictor as coverRestrictorCn,
  blogPostHorizontalPreview as blogPostHorizontalPreviewCn,
} from './blog-post-horizontal-preview.module.scss';

interface BlogpostHorizontalPreviewProps {
  blogpostResponseData: BlogpostSegmentEntity | BlogpostResponseData;
}

export const BlogpostHorizontalPreview: FC<BlogpostHorizontalPreviewProps> = ({
  blogpostResponseData,
}) => (
  <Link
    className={blogPostHorizontalPreviewCn}
    href={blogPostLink(blogpostResponseData.attributes)}
  >
    <div className={coverRestrictorCn}>
      <div className={coverHolderCn}>
        {!blogpostResponseData.attributes.cover.data ? null : (
          <Image
            unoptimized
            alt="cover"
            layout="fill"
            objectFit="cover"
            src={getUploadFileUrl(blogpostResponseData.attributes.cover.data.attributes)}
          />
        )}
        <BlogpostViewsCount className={viewsCountCn} id={blogpostResponseData.id} />
      </div>
    </div>

    <div>
      <Title as="h4" className={titleCn}>
        {blogpostResponseData.attributes.title}
      </Title>
      <SmallBadgesHolder className={badgesCn}>
        <PublishDateBadge date={blogpostResponseData.attributes.publishedAt} />
        {!blogpostResponseData.attributes.author.data ? null : (
          <SmallAuthorBadge author={blogpostResponseData.attributes.author.data.attributes} />
        )}
      </SmallBadgesHolder>

      <div className={textCn}>
        {blogpostResponseData.attributes.short_description
          ? textEllipsis(blogpostResponseData.attributes.short_description)
          : null}
      </div>
    </div>
  </Link>
);
