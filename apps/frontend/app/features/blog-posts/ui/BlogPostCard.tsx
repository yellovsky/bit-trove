import { Card, Text } from '@mantine/core';
import type { FC } from 'react';

import type { ShortBlogPost } from '@repo/api-models';
import { Link } from '@repo/ui/components/link';

import { getBlogPostLink } from '../lib/links';
import styles from './BlogPostCard.module.css';

interface BlogPostCardProps {
  blogPost: ShortBlogPost;
}

export const BlogPostCard: FC<BlogPostCardProps> = ({ blogPost }) => {
  return (
    <Card className={styles.blogpostCard} radius="sm" withBorder>
      <Text className={styles.title} component={Link} fw={500} to={getBlogPostLink(blogPost)}>
        {blogPost.title}
      </Text>

      <Text c="dimmed" fz="sm" lineClamp={4}>
        {blogPost.shortDescription}
      </Text>
    </Card>
  );
};
