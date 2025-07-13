import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { isBlogPost } from '@repo/api-models';
import { Skeleton } from '@repo/ui/components/Skeleton';
import { Heading } from '@repo/ui/components/Typography';

import { CreateBlogPostForm, getCmsBlogPostsLink, type UpsertBlogPostVariables } from '@features/blog-posts';
import { type AppBreadcrumb, Breadcrumbs } from '@features/breadcrumbs';

import { useBlogPostUpdateMutation, useMyBlogPostQuery } from '@entities/blog-posts';

export default function CMSBlogPostsEditRoute(props: { params: { id: string } }) {
  const navigate = useNavigate();

  const { status, mutateAsync } = useBlogPostUpdateMutation();
  const { t, i18n } = useTranslation();
  const { t: tBlogPosts } = useTranslation('blog_posts');

  const {
    data: blogPost,
    isLoading: isLoadingBlogPost,
    error: blogPostError,
    isError: isBlogPostError,
  } = useMyBlogPostQuery({ id: props.params.id, locale: i18n.language });

  const handleSubmit = async (data: Omit<UpsertBlogPostVariables, 'id'>) => {
    const blogPost = await mutateAsync({ ...data, id: props.params.id, type: 'blog_post' });
    if (!isBlogPost(blogPost.data)) throw new Error('Invalid response');
    return blogPost.data;
  };

  const handleSuccess = () => navigate(`/${i18n.language}${getCmsBlogPostsLink()}`);
  const breadcrumbs = [
    { label: t('menu_items.home.title'), to: '/' },
    { label: 'CMS', to: '/cms' },
    { label: t('menu_items.blog.title'), to: '/cms/blog-posts' },
    { label: tBlogPosts('Edit blog post'), to: `/cms/blog-posts/edit/${props.params.id}` },
  ].filter(Boolean) as AppBreadcrumb[];

  const defaultValues: UpsertBlogPostVariables | undefined = !blogPost
    ? undefined
    : {
        contentJSON: blogPost.data.contentJSON ?? [],
        entryId: blogPost.data.entryId,
        languageCode: blogPost.data.languageCode,
        published: blogPost.data.publishedAt !== null,
        seoDescription: blogPost.data.seo.description,
        seoKeywords: blogPost.data.seo.keywords,
        seoTitle: blogPost.data.seo.title,
        shortDescription: blogPost.data.shortDescription,
        slug: blogPost.data.slug,
        tags: blogPost.data.tags.map((tag) => tag.name),
        title: blogPost.data.title,
      };

  if (isLoadingBlogPost) {
    return (
      <div>
        <Breadcrumbs className="mb-4" items={breadcrumbs} />
        <Heading className="mb-4" order={2}>
          {tBlogPosts('Edit blog post')}
        </Heading>
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (isBlogPostError || !blogPost) {
    return (
      <div>
        <Breadcrumbs className="mb-4" items={breadcrumbs} />
        <Heading className="mb-4" order={2}>
          {tBlogPosts('Edit blog post')}
        </Heading>
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
          <p className="text-destructive">
            {blogPostError ? tBlogPosts('Error loading blog post') : tBlogPosts('Blog post not found')}
          </p>
          {blogPostError && (
            <p className="mt-2 text-muted-foreground text-sm">
              {blogPostError.error?.message || 'Unknown error occurred'}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs className="mb-4" items={breadcrumbs} />

      <Heading className="mb-4" order={2}>
        {tBlogPosts('Edit blog post')}
      </Heading>

      <CreateBlogPostForm
        defaultValues={defaultValues}
        id={props.params.id}
        isLoading={status === 'pending'}
        mode="update"
        onSubmit={handleSubmit}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
