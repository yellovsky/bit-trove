import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import type { BlogPost } from '@repo/api-models';

import { Breadcrumbs } from '@features/breadcrumbs';

/* -------------------------------------------------------------------------------------------------
 * BlogPostBreadcrumbs
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'BlogPostBreadcrumbs';

interface BlogPostBreadcrumbsProps {
  blogPost: BlogPost;
  className?: string;
}

const BlogPostBreadcrumbs: FC<BlogPostBreadcrumbsProps> = ({ blogPost, className }) => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { label: t('menu_items.home.title'), to: '/' },
    { label: t('menu_items.blog.title'), to: '/blog' },
    { label: blogPost.title, to: `/blog/${blogPost.slug}` },
  ];

  return <Breadcrumbs className={className} items={breadcrumbItems} />;
};

BlogPostBreadcrumbs.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { BlogPostBreadcrumbs };

export type { BlogPostBreadcrumbsProps };
