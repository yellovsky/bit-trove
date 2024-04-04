// global modules
import type { FC } from 'react';
import { categoryLink } from '@bit-trove/api-models/category';
import { SmallAuthorBadge } from '@bit-trove/ui/small-author-badge';
import { ContentPageHeader } from '@bit-trove/ui/content-page-header';
import { SmallCategoryBadge } from '@bit-trove/ui/small-category-badge';
import { PublishDateBadge } from '@bit-trove/ui/small-publish-date-badge';
import type { BlogpostResponseData } from '@bit-trove/api-models/blog-post';

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
