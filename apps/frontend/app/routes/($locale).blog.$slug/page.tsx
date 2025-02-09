// global modules
import type { BlogPost } from '@repo/api-models';
import { useLocale } from '@repo/remix-i18n';
import { type FC, useCallback } from 'react';

// common modules
import { AnyBlock } from '~/components/blocks/any-block';
import { getBlogpostRouteLink } from '~/utils/links';
import { Heading } from '~/components/heading';
import { LanguageMismatchInfo } from '~/components/language-mismatch-info';
import { type FetchBlogPostVariables, useBlogPostQuery } from '~/api/blog-post';

// local modules
import { BlogpostPageLayout } from './layout';

interface BlogPostPageContentProps {
  blogPost: BlogPost;
}

const BlogPostPageContent: FC<BlogPostPageContentProps> = ({ blogPost }) => {
  const locale = useLocale();
  const getLink = useCallback(() => getBlogpostRouteLink(blogPost), [blogPost]);

  return (
    <BlogpostPageLayout>
      <Heading as="h1" className="mb-8" size="lg">
        {blogPost.title}
      </Heading>

      {!blogPost.language_codes.includes(locale) && (
        <LanguageMismatchInfo availableLangCodes={blogPost.language_codes} getLink={getLink} />
      )}

      {blogPost.blocks.map((block, index) => (
        <AnyBlock block={block} key={`${block.type}_${index}`} />
      ))}
    </BlogpostPageLayout>
  );
};

interface BlogPostPageProps {
  blogPostVariables: FetchBlogPostVariables;
}

export const BlogPostPage: FC<BlogPostPageProps> = ({ blogPostVariables }) => {
  const blogPostQuery = useBlogPostQuery(blogPostVariables);
  const blogPost = blogPostQuery.data?.data;

  return !blogPost ? null : <BlogPostPageContent blogPost={blogPost} />;
};
