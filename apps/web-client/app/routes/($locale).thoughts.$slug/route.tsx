// global modules
import { categoryLink } from '@bit-trove/api-models/category';
import type { FC } from 'react';
import { filterByTagLink } from '@bit-trove/api-models/tag';
import { Link } from '@bit-trove/ui/link';
import { QueryKeyOf } from '@bit-trove/api-models/common';
// import { SmallCategoryBadge } from '@bit-trove/ui/small-category-badge';
import { Stack } from '@bit-trove/ui/stack';
import { dehydrate, DehydratedState, hydrate } from '@tanstack/query-core';
import { getThoughtMetadata, thoughtQueryFn } from '@bit-trove/api-models/thought';
import { HydrationBoundary, QueryClient, useQuery } from '@tanstack/react-query';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { type Params, useLoaderData, useParams } from '@remix-run/react';

// local modules
import { Ad } from '~/components/ad';
import { AuthorBadge } from '~/components/badge/author-badge';
import { Blocks } from '~/components/blocks';
import { ContentPageHeader } from '~/components/content-page-header';
import { PageContent } from '~/components/page-content';
import { PublishDateBadge } from '~/components/badge/publish-date-badge';
import { TagBadge } from '../../components/badge/tag-badge';

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
      {/* {thought.categories.data.map(({ id, attributes: category }) => (
        <SmallCategoryBadge to={categoryLink(category)} key={id}>
          {category.name}
        </SmallCategoryBadge>
      ))} */}
    </>
  );
  const bottomBadges = (
    <>
      <PublishDateBadge date={thought.publishedAt} />
      {thought.author.data && <AuthorBadge author={thought.author.data.attributes} />}
    </>
  );

  const header = (
    <ContentPageHeader bottomBadges={bottomBadges} topBadges={topBadges}>
      {thought.title}
    </ContentPageHeader>
  );

  return (
    <PageContent header={header}>
      <Link variant="standalone" to="/thoughts/typography-heading-elements">
        /thoughts/typography-heading-elements
      </Link>
      <br />
      <Link variant="standalone" to="/thoughts/recursive-typings-tree-structure">
        /thoughts/recursive-typings-tree-structure
      </Link>

      <div className={'marginbottom2remCn'}>
        <Blocks blocks={thought.blocks} />
      </div>

      <Stack mb="2rem" orientation="horizontal">
        {thought.tags.data.map(({ id, attributes: tag }) => (
          <TagBadge key={id} name={tag.name} to={filterByTagLink(tag)} />
        ))}
      </Stack>

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
