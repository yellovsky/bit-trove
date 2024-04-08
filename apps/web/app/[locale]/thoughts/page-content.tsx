'use client';

// global modules
import type { SupportedLocale } from '@bit-trove/localization/config';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { type FC, useEffect, useState } from 'react';
import { getNextPageParam, initialPageParam } from '@bit-trove/api-models/common';

import {
  fetchThoughtSegmentCollection,
  type ThoughtSegmentResponseCollection,
} from '@bit-trove/api-models/thought';

// local modules
import { ThoughtsTimeline, ThoughtsTimelinePending } from '~/components/thoughts-timeline';

import {
  addTreeNodes,
  type ThoughtTree,
} from '~/components/thoughts-timeline/thoughts-timeline.tree';

const addPagesToTree = (tree: ThoughtTree, pages?: ThoughtSegmentResponseCollection[]) =>
  !pages ? tree : pages.reduce((accum, page) => addTreeNodes(accum, page), tree);

interface ThoughtsPageContentProps {
  locale: SupportedLocale;
}

export const ThoughtsPageContent: FC<ThoughtsPageContentProps> = ({ locale }) => {
  const { data } = useSuspenseInfiniteQuery({
    getNextPageParam,
    initialPageParam,
    queryFn: fetchThoughtSegmentCollection,
    queryKey: ['thought_segment_collection', { locale }],
  });

  const [tree, setTree] = useState<ThoughtTree>(addPagesToTree([], data?.pages));

  useEffect(() => setTree((prev) => addPagesToTree(prev, data?.pages)), [data]);

  return <ThoughtsTimeline locale={locale} tree={tree} />;
};

export const ThoughtsPageContentPending: FC = () => <ThoughtsTimelinePending />;
