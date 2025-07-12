import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Heading, Paragraph } from '@repo/ui/components/Typography';

import type { GetManyBlogPostsVariables } from '@entities/blog-posts';
import type { GetManyShardsVariables } from '@entities/shards';

import { BlogPostsSection } from './BlogPostsSection';
import { ShardsSection } from './ShardsSection';

interface HomePageProps {
  shardsVariables: GetManyShardsVariables;
  blogPostsVariables: GetManyBlogPostsVariables;
}

export const HomePage: FC<HomePageProps> = ({ shardsVariables, blogPostsVariables }) => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-7xl space-y-12">
      <Heading order={1}>{t('home_page.title')}</Heading>
      <Paragraph>{t('home_page.description')}</Paragraph>

      <ShardsSection variables={shardsVariables} />
      <BlogPostsSection blogPostsVars={blogPostsVariables} />
    </div>
  );
};
