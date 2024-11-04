// global modules
import type { BlogPost } from '@repo/api-models';
import type { FC } from 'react';

// common modules
import { AnyBlock } from '~/components/blocks/any-block';
import { Heading } from '~/components/heading';

interface BlogPostPageProps {
  blogPost: BlogPost;
}
export const BlogPostPage: FC<BlogPostPageProps> = ({ blogPost }) => {
  return (
    <>
      <Heading as="h1" className="mb-8" size="lg">
        {blogPost.title}
      </Heading>
      {blogPost.blocks.map((block, index) => (
        <AnyBlock block={block} key={`${block.type}_${index}`} />
      ))}
    </>
  );
};
