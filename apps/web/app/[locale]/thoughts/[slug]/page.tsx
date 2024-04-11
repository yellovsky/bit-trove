// global modules
import 'server-only';
import { categoryLink } from '@bit-trove/api-models/category';
import { ContentPageHeader } from '@bit-trove/ui/content-page-header';
import type { FC } from 'react';
import { filterByTagLink } from '@bit-trove/api-models/tag';
import { Link } from '@bit-trove/localization/link';
import { notFound } from 'next/navigation';
import { PublishDateBadge } from '@bit-trove/ui/small-publish-date-badge';
import { SmallAuthorBadge } from '@bit-trove/ui/small-author-badge';
import { SmallBadgesHolder } from '@bit-trove/ui/small-badges-holder';
import { SmallCategoryBadge } from '@bit-trove/ui/small-category-badge';
import { SmallTagBadge } from '@bit-trove/ui/small-tag-badge';

import { fetchThought, getThoughtMetadata, type ThoughtFP } from '@bit-trove/api-models/thought';

// local modules
import { Ad } from '~/components/ad';
import { Blocks } from '~/components/blocks';
import { marginbottom2rem as marginbottom2remCn } from './thought.module.scss';
import { PageContent } from '~/components/page-content';
import type { RSCPageProps } from '~/src/rsc';

type ThoughtPageProps = RSCPageProps<{ slug: string }>;

const getThoughtFP = (props: ThoughtPageProps): ThoughtFP => ({
  locale: props.params.locale,
  slug: props.params.slug,
});

// ==========================================================
//                    M E T A D A T A
// ==========================================================
export const generateMetadata = async (props: ThoughtPageProps) => {
  const thoughtResponse = await fetchThought(getThoughtFP(props));
  const thought = thoughtResponse?.data?.attributes;
  return thought ? getThoughtMetadata(thought) : undefined;
};

// ==========================================================
//                    C O M P O N E N T
// ==========================================================
const ThoughtPage: FC<ThoughtPageProps> = async (props) => {
  const { data } = await fetchThought(getThoughtFP(props));

  const thought = data?.attributes;

  if (!thought) notFound();

  const topBadges = !thought.categories.data.length ? null : (
    <>
      {thought.categories.data.map(({ id, attributes: category }) => (
        <SmallCategoryBadge to={categoryLink(category)} key={id}>
          {category.name}
        </SmallCategoryBadge>
      ))}
    </>
  );

  const bottomBadges = (
    <>
      <PublishDateBadge date={thought.publishedAt} />
      {thought.author.data && <SmallAuthorBadge author={thought.author.data.attributes} />}
    </>
  );

  const header = (
    <ContentPageHeader bottomBadges={bottomBadges} topBadges={topBadges}>
      {thought.title}
    </ContentPageHeader>
  );

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getThoughtJsonLd(thought)) }}
        type="application/ld+json"
      />

      <PageContent header={header} locale={props.params.locale}>
        <Link href="/thoughts/typography-heading-elements">
          /thoughts/typography-heading-elements
        </Link>
        <br />
        <Link href="/thoughts/recursive-typings-tree-structure">
          /thoughts/recursive-typings-tree-structure
        </Link>

        <div className={marginbottom2remCn}>
          <Blocks blocks={thought.blocks} />
        </div>

        <SmallBadgesHolder className={marginbottom2remCn}>
          {thought.tags.data.map(({ id, attributes: tag }) => (
            <SmallTagBadge href={filterByTagLink(tag)} key={id}>
              {tag.name}
            </SmallTagBadge>
          ))}
        </SmallBadgesHolder>

        <Ad layout="horizontal" />
      </PageContent>
    </>
  );
};

export default ThoughtPage;
