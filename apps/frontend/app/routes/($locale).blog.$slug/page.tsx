// global modules
import type { BlogPost } from '@repo/api-models';
import type { FC } from 'react';
import { useLocale } from '@repo/remix-i18n';
import { useTranslation } from 'react-i18next';

// common modules
import { AnyBlock } from '~/components/blocks/any-block';
import { Heading } from '~/components/heading';

// local modules
import { BlogpostPageLayout } from './layout';
import { Info } from '../../components/info';

interface BlogPostPageProps {
  blogPost: BlogPost;
}

export const BlogPostPage: FC<BlogPostPageProps> = ({ blogPost }) => {
  const { t } = useTranslation();
  const locale = useLocale();

  return (
    <BlogpostPageLayout>
      <Heading as="h1" className="mb-8" size="lg">
        {blogPost.title}
      </Heading>

      {!blogPost.language_codes.includes(locale) && (
        <Info className="mb-8">{t('This page is not available in the selected language')}</Info>
      )}

      {blogPost.blocks.map((block, index) => (
        <AnyBlock block={block} key={`${block.type}_${index}`} />
      ))}
    </BlogpostPageLayout>
  );
};
