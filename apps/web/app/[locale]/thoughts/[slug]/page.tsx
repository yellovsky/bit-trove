// global modules
import { notFound } from 'next/navigation';
import { Link } from '@bit-trove/localization/link';
import { categoryLink } from '@repo/api-models/category';
import { SmallAuthorBadge } from '@repo/ui/small-author-badge';
import { ContentPageHeader } from '@repo/ui/content-page-header';
import { SmallCategoryBadge } from '@repo/ui/small-category-badge';
import { PublishDateBadge } from '@repo/ui/small-publish-date-badge';
import { fetchThought, type ThoughtFP } from '@repo/api-models/thought';

// local modules
import { Blocks } from '~/components/blocks';
import type { RSCPageProps } from '~/src/rsc';
import { PageContent } from '~/components/page-content';

type ThoughtPageProps = RSCPageProps<{ slug: string }>;

const getThoughtFP = (props: ThoughtPageProps): ThoughtFP => ({
  slug: props.params.slug,
  locale: props.params.locale,
});

// ==========================================================
//                    M E T A D A T A
// ==========================================================
export async function generateMetadata(props: ThoughtPageProps) {
  const blogpostResponse = await fetchThought(getThoughtFP(props));
  return (
    blogpostResponse?.data?.attributes.seo ?? { title: blogpostResponse.data?.attributes.title }
  );
}

// ==========================================================
//                    C O M P O N E N T
// ==========================================================
export default async function ThoughtPage(props: ThoughtPageProps) {
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
      <PageContent header={header} locale={props.params.locale}>
        <Link href="/thoughts/typography-heading-elements">
          /thoughts/typography-heading-elements
        </Link>
        <br />
        <Link href="/thoughts/recursive-typings-tree-structure">
          /thoughts/recursive-typings-tree-structure
        </Link>

        <Blocks blocks={thought.blocks} />
      </PageContent>
    </>
  );
}
