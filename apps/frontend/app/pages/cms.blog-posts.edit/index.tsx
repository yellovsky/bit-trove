import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Heading } from '@repo/ui/components/Typography';

import { CreateBlogPostForm, getCmsBlogPostsLink } from '@features/blog-posts';
import { type AppBreadcrumb, Breadcrumbs } from '@features/breadcrumbs';

import { type CreateBlogPostVariables, useCreateBlogPostMutation } from '@entities/blog-posts';

export default function CMSBlogPostsEditRoute(props: { params: { id: string } }) {
  const navigate = useNavigate();

  const { status, mutateAsync } = useCreateBlogPostMutation();
  const { t, i18n } = useTranslation();

  const handleSubmit = async (data: CreateBlogPostVariables) => {
    // TODO: Replace with actual update mutation when implemented
    const blogPost = await mutateAsync(data);
    return blogPost.data;
  };

  const handleSuccess = () => navigate(`/${i18n.language}${getCmsBlogPostsLink()}`);
  const breadcrumbs = [
    { label: t('menu_items.home.title'), to: '/' },
    { label: 'CMS', to: '/cms' },
    { label: t('menu_items.blog.title'), to: '/cms/blog-posts' },
    { label: 'Edit Blog Post', to: `/cms/blog-posts/edit/${props.params.id}` },
  ].filter(Boolean) as AppBreadcrumb[];

  return (
    <div>
      <Breadcrumbs className="mb-4" items={breadcrumbs} />

      <Heading className="mb-4" order={2}>
        Edit Blog Post
      </Heading>

      <CreateBlogPostForm
        id={props.params.id}
        isLoading={status === 'pending'}
        mode="update"
        onSubmit={handleSubmit}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
