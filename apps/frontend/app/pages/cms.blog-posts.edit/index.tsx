import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { isBlogPost } from '@repo/api-models';
import { Skeleton } from '@repo/ui/components/Skeleton';
import { Heading } from '@repo/ui/components/Typography';

import { UpsertArticleForm, type UpsertArticleVariables } from '@features/articles';
import { getCmsBlogPostsLink } from '@features/blog-posts';
import { type AppBreadcrumb, Breadcrumbs } from '@features/breadcrumbs';

import { useRelatedArticlesQuery } from '@entities/articles';
import { useBlogPostUpdateMutation, useMyBlogPostQuery } from '@entities/blog-posts';

export const handle = {
  i18n: ['cms', 'cms_articles', 'blog_posts'],
};

export default function CMSBlogPostsEditRoute(props: { params: { id: string } }) {
  const navigate = useNavigate();

  const { status, mutateAsync } = useBlogPostUpdateMutation();
  const { t, i18n } = useTranslation();
  const { t: tBlogPosts } = useTranslation('blog_posts');

  const blogPostQuery = useMyBlogPostQuery({ id: props.params.id, locale: i18n.language });
  const relatedArticlesQuery = useRelatedArticlesQuery({ id: props.params.id, locale: i18n.language });

  const handleSubmit = async (data: Omit<UpsertArticleVariables, 'id'>) => {
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

  const defaultValues: UpsertArticleVariables | undefined =
    !blogPostQuery.data || !relatedArticlesQuery.data
      ? undefined
      : {
          contentJSON: blogPostQuery.data.data.contentJSON ?? [],
          entryId: blogPostQuery.data.data.entryId,
          languageCode: blogPostQuery.data.data.languageCode,
          published: blogPostQuery.data.data.publishedAt !== null,
          relatedArticles: relatedArticlesQuery.data.data.map((article) => ({
            articleId: article.id,
            relationType: article.relationType,
          })),
          seoDescription: blogPostQuery.data.data.seo.description,
          seoKeywords: blogPostQuery.data.data.seo.keywords,
          seoTitle: blogPostQuery.data.data.seo.title,
          shortDescription: blogPostQuery.data.data.shortDescription,
          slug: blogPostQuery.data.data.slug,
          tags: blogPostQuery.data.data.tags.map((tag) => tag.name),
          title: blogPostQuery.data.data.title,
        };

  if (blogPostQuery.isLoading || relatedArticlesQuery.isLoading) {
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

  if (blogPostQuery.isError || !blogPostQuery.data || relatedArticlesQuery.isError || !relatedArticlesQuery.data) {
    return (
      <div>
        <Breadcrumbs className="mb-4" items={breadcrumbs} />
        <Heading className="mb-4" order={2}>
          {tBlogPosts('Edit blog post')}
        </Heading>
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
          <p className="text-destructive">
            {blogPostQuery.error ? tBlogPosts('Error loading blog post') : tBlogPosts('Blog post not found')}
          </p>
          {blogPostQuery.error && (
            <p className="mt-2 text-muted-foreground text-sm">
              {blogPostQuery.error.error?.message || 'Unknown error occurred'}
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

      <UpsertArticleForm
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
