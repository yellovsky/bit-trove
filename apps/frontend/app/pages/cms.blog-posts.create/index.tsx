import { useTranslation } from 'react-i18next';

import { isBlogPost } from '@repo/api-models';
import { Heading } from '@repo/ui/components/Typography';

import { CreateBlogPostForm, getCreateBlogPostLink, type UpsertBlogPostVariables } from '@features/blog-posts';
import { type AppBreadcrumb, Breadcrumbs } from '@features/breadcrumbs';

import { useBlogPostCreateMutation } from '@entities/blog-posts';

export const handle = {
  i18n: ['cms'],
};

export default function CMSBlogPostsCreateRoute() {
  const { status, mutateAsync } = useBlogPostCreateMutation();
  const { t } = useTranslation();

  const handleSubmit = async (data: UpsertBlogPostVariables) => {
    const blogPost = await mutateAsync(data);
    if (!isBlogPost(blogPost.data)) throw new Error('Invalid response');
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
