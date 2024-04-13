// global modules
import { categoryLink } from '@bit-trove/api-models/category';
import { ContentPageHeader } from '@bit-trove/ui/content-page-header';
import type { FC } from 'react';
import { filterByTagLink } from '@bit-trove/api-models/tag';
import { Link } from '@bit-trove/ui/link';
import { PublishDateBadge } from '@bit-trove/ui/small-publish-date-badge';
import { QueryKeyOf } from '@bit-trove/api-models/common';
import { SmallAuthorBadge } from '@bit-trove/ui/small-author-badge';
import { SmallBadgesHolder } from '@bit-trove/ui/small-badges-holder';
import { SmallCategoryBadge } from '@bit-trove/ui/small-category-badge';
import { SmallTagBadge } from '@bit-trove/ui/small-tag-badge';
import { dehydrate, DehydratedState, hydrate } from '@tanstack/query-core';
import { getThoughtMetadata, thoughtQueryFn } from '@bit-trove/api-models/thought';
import { HydrationBoundary, QueryClient, useQuery } from '@tanstack/react-query';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { type Params, useLoaderData, useParams } from '@remix-run/react';
import { Text } from '@bit-trove/ui/text';

// local modules
import { Ad } from '~/components/ad';
import { Blocks } from '~/components/blocks';
import { PageContent } from '~/components/page-content';

type ThoughtPageParams = 'locale' | 'slug';

interface LoaderData {
  dehydratedState: DehydratedState;
}

const getThoughtQueryKey = (
  params: Params<ThoughtPageParams>
): QueryKeyOf<typeof thoughtQueryFn> => ['thought', { locale: params.locale!, slug: params.slug! }];

export const loader: LoaderFunction = async (args): Promise<LoaderData> => {
  const params = args.params as Params<ThoughtPageParams>;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryFn: thoughtQueryFn,
    queryKey: getThoughtQueryKey(params),
  });

  return { dehydratedState: dehydrate(queryClient) };
};

export const meta: MetaFunction<typeof loader> = ({ data, params }) => {
  const queryClient = new QueryClient();
  hydrate(queryClient, data.dehydratedState);

  const thoughtResponse = queryClient.getQueryData<Awaited<ReturnType<typeof thoughtQueryFn>>>(
    getThoughtQueryKey(params)
  );

  return !thoughtResponse?.data ? [] : getThoughtMetadata(thoughtResponse.data.attributes);
};

const TmpText = () => (
  <>
    {/* <Text fontSize="6xl">(6xl) In love with React & Next</Text>
    <br />
    <Text fontSize="5xl">(5xl) In love with React & Next</Text>
    <br />
    <Text fontSize="4xl">(4xl) In love with React & Next</Text>
    <br />
    <Text fontSize="3xl">(3xl) In love with React & Next</Text>
    <br />
    <Text fontSize="2xl">(2xl) In love with React & Next</Text>
    <br />
    <Text fontSize="xl">(xl) In love with React & Next</Text>
    <br />
    <Text fontSize="lg">(lg) In love with React & Next</Text>
    <br />
    <Text fontSize="md">(md) In love with React & Next</Text>
    <br />
    <Text fontSize="sm">(sm) In love with React & Next</Text>
    <br />
    <Text fontSize="xs">(xs) In love with React & Next</Text>
    <br /> */}

    <Text as="b">Bold</Text>
    <br />
    <Text as="i">Italic</Text>
    <br />
    <Text as="u">Underline</Text>
    <br />
    <Text as="abbr">I18N</Text>
    <br />
    <Text as="cite">Citation</Text>
    <br />
    <Text as="del">Deleted</Text>
    <br />
    <Text as="em">Emphasis</Text>
    <br />
    <Text as="ins">Inserted</Text>
    <br />
    <Text as="kbd">Ctrl + C</Text>
    <br />
    <Text as="mark">Highlighted</Text>
    <br />
    <Text as="s">Strikethrough</Text>
    <br />
    <Text as="samp">Sample</Text>
    <br />
    <Text as="sub">sub</Text>
    <br />
    <Text as="sup">sup</Text>
  </>
);

const Temporary: FC = () => {
  const params = useParams<ThoughtPageParams>();

  const { data, status, error } = useQuery({
    queryFn: thoughtQueryFn,
    queryKey: getThoughtQueryKey(params),
  });

  const thought = data?.data?.attributes;

  if (!thought) return <div>nf</div>;

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
    <PageContent header={header}>
      <TmpText />
      <Link to="/thoughts/typography-heading-elements">/thoughts/typography-heading-elements</Link>
      <br />
      <Link to="/thoughts/recursive-typings-tree-structure">
        /thoughts/recursive-typings-tree-structure
      </Link>

      <div className={'marginbottom2remCn'}>
        <Blocks blocks={thought.blocks} />
      </div>

      <SmallBadgesHolder className={'marginbottom2remCn'}>
        {thought.tags.data.map(({ id, attributes: tag }) => (
          <SmallTagBadge href={filterByTagLink(tag)} key={id}>
            {tag.name}
          </SmallTagBadge>
        ))}
      </SmallBadgesHolder>

      <Ad layout="horizontal" />
    </PageContent>
  );
};

export default function UserDetails() {
  const { dehydratedState } = useLoaderData() as LoaderData;

  return (
    <HydrationBoundary state={dehydratedState}>
      <Temporary />
    </HydrationBoundary>
  );
}
