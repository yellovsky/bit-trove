// global modules
import 'server-only';
import type { FC } from 'react';
import { notFound } from 'next/navigation';
import { Link } from '@bit-trove/localization/link';
import { categoryLink } from '@bit-trove/api-models/category';
import { SmallAuthorBadge } from '@bit-trove/ui/small-author-badge';
import { ContentPageHeader } from '@bit-trove/ui/content-page-header';
import { SmallCategoryBadge } from '@bit-trove/ui/small-category-badge';
import { PublishDateBadge } from '@bit-trove/ui/small-publish-date-badge';
import {
  fetchThought,
  getThoughtJsonLd,
  getThoughtMetadata,
  type ThoughtFP,
} from '@bit-trove/api-models/thought';

// local modules
import { Blocks } from '~/components/blocks';
import type { RSCPageProps } from '~/src/rsc';
import { PageContent } from '~/components/page-content';
import { SmallBadgesHolder } from '@bit-trove/ui/small-badges-holder';
import { SmallTagBadge } from '@bit-trove/ui/small-tag-badge';
import { filterByTagLink } from '@bit-trove/api-models/tag';

import { blocksHolder as blocksHolderCn } from './thought.module.scss';

type ThoughtPageProps = RSCPageProps<{ slug: string }>;

const getThoughtFP = (props: ThoughtPageProps): ThoughtFP => ({
  slug: props.params.slug,
  locale: props.params.locale,
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
        <SmallCategoryBadge key={id} href={categoryLink(category)}>
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
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getThoughtJsonLd(thought)) }}
      />

      <PageContent header={header} locale={props.params.locale}>
        <Link href="/thoughts/typography-heading-elements">
          /thoughts/typography-heading-elements
        </Link>
        <br />
        <Link href="/thoughts/recursive-typings-tree-structure">
          /thoughts/recursive-typings-tree-structure
        </Link>

        <div className={blocksHolderCn}>
          <Blocks blocks={thought.blocks} />
        </div>

        <SmallBadgesHolder>
          {thought.tags.data.map(({ id, attributes: tag }) => (
            <SmallTagBadge key={id} href={filterByTagLink(tag)}>
              {tag.name}
            </SmallTagBadge>
          ))}
        </SmallBadgesHolder>
      </PageContent>
    </>
  );
};

export default ThoughtPage;
