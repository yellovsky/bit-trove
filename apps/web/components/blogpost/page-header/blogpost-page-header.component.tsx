// global modules
import type { FC } from 'react';
import { categoryLink } from '@repo/api-models/category';
import { SmallAuthorBadge } from '@repo/ui/small-author-badge';
import { ContentPageHeader } from '@repo/ui/content-page-header';
import { SmallCategoryBadge } from '@repo/ui/small-category-badge';
import { PublishDateBadge } from '@repo/ui/small-publish-date-badge';
import type { BlogpostResponseData } from '@repo/api-models/blog-post';

// local modules
import { BlogpostViewsCount } from '../views-count';

interface BlogpostPageHeaderProps {
  blogpostResponseData: BlogpostResponseData;
}

export const BlogpostPageHeader: FC<BlogpostPageHeaderProps> = ({ blogpostResponseData }) => {
  const { id, attributes: blogpost } = blogpostResponseData;

  const topBadges = (
    <>
      {blogpost.categories.data.map(({ attributes: category }) => (
        <SmallCategoryBadge href={categoryLink(category)}>{category.name}</SmallCategoryBadge>
      ))}

      <BlogpostViewsCount increment id={id} />
    </>
  );

  const bottomBadges = (
    <>
      <PublishDateBadge date={blogpost.publishedAt} />
      {blogpost.author.data && <SmallAuthorBadge author={blogpost.author.data.attributes} />}
    </>
  );

  return (
    <ContentPageHeader bottomBadges={bottomBadges} topBadges={topBadges}>
      {blogpost.title}
    </ContentPageHeader>
  );
};
