// global modules
import type { BlogPost } from '@repo/api-models';
import { useLocale } from '@repo/remix-i18n';
import { type FC, useCallback } from 'react';

// common modules
import { AnyBlock } from '~/components/blocks/any-block';
import { Heading } from '~/components/heading';
import { LanguageMismatchInfo } from '~/components/language-mismatch-info';

// local modules
import { BlogpostPageLayout } from './layout';

interface BlogPostPageProps {
  blogPost: BlogPost;
}

export const BlogPostPage: FC<BlogPostPageProps> = ({ blogPost }) => {
  const locale = useLocale();

  const getLink = useCallback(() => `/blog/${blogPost.slug}`, [blogPost]);

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
