// global modules
import type { FC } from 'react';
import Image from 'next/image';
import { Link } from '@bit-trove/localization/link';
import { getUploadFileUrl } from '@repo/api-models/upload-file';
import { BlogpostViewsCount } from '~/components/blogpost/views-count';

import {
  blogPostLink,
  type BlogpostResponseData,
  type BlogpostSegmentEntity,
} from '@repo/api-models/blog-post';

// local modules
import {
  viewsCount as viewsCountCn,
  coverHolder as coverHolderCn,
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
    <div>{blogpostResponseData.attributes.title}</div>
  </Link>
);
