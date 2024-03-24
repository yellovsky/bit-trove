// global modules
import type { FC } from 'react';
import { apiHost } from '@repo/utils/api-host';
import { Link } from '@bit-trove/localization/link';
import { blogPostLink, type BlogpostSegment } from '@repo/api-models/blog-post';

// local modules
import { blogPostHorizontalPreview as blogPostHorizontalPreviewCn } from './blog-post-horizontal-preview.module.scss';

interface BlogPostHorizontalPreviewProps {
  blogpost: BlogpostSegment;
}

export const BlogPostHorizontalPreview: FC<BlogPostHorizontalPreviewProps> = ({ blogpost }) => (
  <Link className={blogPostHorizontalPreviewCn} href={blogPostLink(blogpost)}>
    <img src={apiHost(blogpost.cover.data?.attributes.url)} />
    <div>{blogpost.title}</div>
  </Link>
);
