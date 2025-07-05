import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Heading } from '@repo/ui/components/Typography';

import { CreateBlogPostForm, getCmsBlogPostsLink } from '@features/blog-posts';
import { type AppBreadcrumb, Breadcrumbs } from '@features/breadcrumbs';

import { type UpdateBlogPostVariables, useMyBlogPostQuery, useUpdateBlogPostMutation } from '@entities/blog-posts';

export default function CMSBlogPostsEditRoute(props: { params: { id: string } }) {
  const navigate = useNavigate();

  const { status, mutateAsync } = useUpdateBlogPostMutation();
  const { t, i18n } = useTranslation();

  const { data: blogPost, isLoading: isLoadingBlogPost } = useMyBlogPostQuery({ id: props.params.id });

  const handleSubmit = async (data: Omit<UpdateBlogPostVariables, 'id'>) => {
    const blogPost = await mutateAsync({ ...data, id: props.params.id });
    return blogPost.data;
  };

  const handleSuccess = () => navigate(`/${i18n.language}${getCmsBlogPostsLink()}`);
  const breadcrumbs = [
    { label: t('menu_items.home.title'), to: '/' },
    { label: 'CMS', to: '/cms' },
    { label: t('menu_items.blog.title'), to: '/cms/blog-posts' },
    { label: 'Edit Blog Post', to: `/cms/blog-posts/edit/${props.params.id}` },
  ].filter(Boolean) as AppBreadcrumb[];

  if (isLoadingBlogPost) {
    return <div>Loading...</div>;
  }

  if (!blogPost) {
    return <div>Blog post not found</div>;
  }

  return (
    <div>
      <Breadcrumbs className="mb-4" items={breadcrumbs} />

      <Heading className="mb-4" order={2}>
        Edit Blog Post
      </Heading>

      <CreateBlogPostForm
        defaultValues={{
          contentJSON: blogPost.data.contentJSON,
          languageCode: blogPost.data.languageCode,
          published: blogPost.data.publishedAt !== null,
          seoDescription: blogPost.data.seo.description,
          seoKeywords: blogPost.data.seo.keywords,
          seoTitle: blogPost.data.seo.title,
          shortDescription: blogPost.data.shortDescription,
          slug: blogPost.data.slug,
          title: blogPost.data.title,
        }}
        id={props.params.id}
        isLoading={status === 'pending'}
        mode="update"
        onSubmit={handleSubmit}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
