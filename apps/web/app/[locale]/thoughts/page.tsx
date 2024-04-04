'use client';

// global modules
import { Title } from '@repo/ui/title';
import { useEffect, useState } from 'react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getNextPageParam, initialPageParam } from '@repo/api-models/common';

import {
  fetchThoughtSegmentCollection,
  type ThoughtSegmentResponseCollection,
} from '@repo/api-models/thought';

// local modules
import type { RSCPageProps } from '~/src/rsc';
import { PageContent } from '~/components/page-content';
import { ThoughtsTimeline } from '~/components/thoughts-timeline';
import { thoughtsPage as thoughtsPageCn, title as titleCn } from './page.module.scss';

import {
  addTreeNodes,
  type ThoughtTree,
} from '~/components/thoughts-timeline/thoughts-timeline.tree';

const addPagesToTree = (tree: ThoughtTree, pages?: ThoughtSegmentResponseCollection[]) =>
  !pages ? tree : pages.reduce((accum, page) => addTreeNodes(accum, page), tree);

export default function ThoughtsPage({ params }: RSCPageProps) {
  const { locale } = params;

  const { data } = useSuspenseInfiniteQuery({
    getNextPageParam,
    initialPageParam,
    queryKey: ['thought_segment_collection', { locale }],
    queryFn: fetchThoughtSegmentCollection,
  });

  const [tree, setTree] = useState<ThoughtTree>(addPagesToTree([], data?.pages));

  useEffect(() => setTree((prev) => addPagesToTree(prev, data?.pages)), [data]);

  return (
    <PageContent className={thoughtsPageCn} locale={locale}>
      <Title as="h1" className={titleCn}>
        Thoughts
      </Title>

      <ThoughtsTimeline tree={tree} locale={locale} />
    </PageContent>
  );
}
