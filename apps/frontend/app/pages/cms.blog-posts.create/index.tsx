import { useTranslation } from 'react-i18next';

import { Heading } from '@repo/ui/components/Typography';

import { CreateBlogPostForm, getCreateBlogPostLink } from '@features/blog-posts';
import { type AppBreadcrumb, Breadcrumbs } from '@features/breadcrumbs';

import { type CreateBlogPostVariables, useCreateBlogPostMutation } from '@entities/blog-posts';

export const handle = {
  i18n: ['cms'],
};

export default function CMSBlogPostsCreateRoute() {
  const { status, mutateAsync } = useCreateBlogPostMutation();
  const { t } = useTranslation();

  const handleSubmit = async (data: CreateBlogPostVariables) => {
    const blogPost = await mutateAsync(data);
    return blogPost.data;
  };

  const breadcrumbs = [
    { label: t('menu_items.home.title'), to: '/' },
    { label: 'CMS', to: '/cms' },
    { label: t('menu_items.blog.title'), to: '/cms/blog-posts' },
    { label: 'Create Blog Post', to: getCreateBlogPostLink() },
  ].filter(Boolean) as AppBreadcrumb[];

  return (
    <div>
      <Breadcrumbs className="mb-4" items={breadcrumbs} />

      <Heading className="mb-4" order={2}>
        Create Blog Post
      </Heading>

      <CreateBlogPostForm isLoading={status === 'pending'} mode="create" onSubmit={handleSubmit} />
    </div>
  );
}
