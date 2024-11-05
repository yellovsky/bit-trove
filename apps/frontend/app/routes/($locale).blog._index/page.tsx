// global modules
import type { BlogPostListResponse } from '@repo/api-models';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

// common modules
import { BlogPostListCard } from '~/components/blog-post-list-card';
import { Heading } from '~/components/heading';

// local modules
import { cardsGrid as cardsGridCn, page as pageCn } from './page.module.scss';

interface BlogPageProps {
  blogPostListResponse: BlogPostListResponse;
}

export const BlogPage: FC<BlogPageProps> = ({ blogPostListResponse }) => {
  const { t } = useTranslation();

  return (
    <div className={pageCn}>
      <Heading as="h1" className="mb-8" size="lg">
        {t('BLOG_PAGE_TITLE')}
      </Heading>

      <div className={cardsGridCn}>
        {blogPostListResponse.data.map(item =>
          !item ? null : <BlogPostListCard item={item} key={item.id} />,
        )}
      </div>
    </div>
  );
};
