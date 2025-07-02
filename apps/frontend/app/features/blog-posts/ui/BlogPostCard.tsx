import type { FC } from 'react';

import type { ShortBlogPost } from '@repo/api-models';
import { Link } from '@repo/ui/components/link';
import { cn } from '@repo/ui/lib/utils';

import { getBlogPostLink } from '../lib/links';
import styles from './BlogPostCard.module.css';

interface BlogPostCardProps {
  blogPost: ShortBlogPost;
}

export const BlogPostCard: FC<BlogPostCardProps> = ({ blogPost }) => {
  return (
    <div className={styles.blogpostCard}>
      <Link className={cn(styles.title, 'font-medium')} to={getBlogPostLink(blogPost)}>
        {blogPost.title}
      </Link>

      <div className="text-muted-foreground text-sm">{blogPost.shortDescription}</div>
    </div>
  );
};
