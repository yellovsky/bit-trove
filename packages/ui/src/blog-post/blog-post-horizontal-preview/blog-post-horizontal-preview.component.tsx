// global modules
import type { FC } from 'react';
import { apiHost } from '@repo/utils/api-host';
import { Link } from '@bit-trove/localization/link';
import { blogPostLink, type PartialBlogPostFragment } from '@repo/api-models/blog-post';

// local modules
import { blogPostHorizontalPreview as blogPostHorizontalPreviewCn } from './blog-post-horizontal-preview.module.scss';

interface BlogPostHorizontalPreviewProps {
  blogpost: PartialBlogPostFragment;
}

export const BlogPostHorizontalPreview: FC<BlogPostHorizontalPreviewProps> = (props) => {
  return (
    <Link className={blogPostHorizontalPreviewCn} href={blogPostLink(props.blogpost)}>
      <img src={apiHost(props.blogpost.attributes.cover.data?.attributes.url)} />
      <div>{props.blogpost.attributes.title}</div>
    </Link>
  );
};
