// global modules
import { useTranslation } from 'react-i18next';
import { type FC, useMemo } from 'react';

// common modules
import { BlogPostListCard } from '~/components/blog-post-list-card';
import { Heading } from '~/components/heading';

import {
  type FetchBlogPostListInfiniteVariables,
  useBlogPostListInfiniteQuery,
} from '~/api/blog-post';

// local modules
import { cardsGrid as cardsGridCn, page as pageCn } from './page.module.scss';

interface BlogPageProps {
  blogPostListVariables: FetchBlogPostListInfiniteVariables;
}

export const BlogPage: FC<BlogPageProps> = ({ blogPostListVariables }) => {
  const { t } = useTranslation();
  const { data } = useBlogPostListInfiniteQuery(blogPostListVariables);

  const blogPosts = useMemo(
    () =>
      data?.pages
        .map(page => page.data)
        .flat()
        .filter(val => !!val),
    [data?.pages],
  );

  return (
    <div className={pageCn}>
      <Heading as="h1" className="mb-8" size="lg">
        {t('BLOG_PAGE_TITLE')}
      </Heading>

      <div className={cardsGridCn}>
        {blogPosts?.map(item => <BlogPostListCard item={item} key={item.id} />)}
      </div>
    </div>
  );
};
