'use client';

// global modules
import { type FC, useState, useEffect } from 'react';
import { ShortThought } from '@repo/ui/short-thought';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ShortThoughtYear } from '@repo/ui/short-thought-year';
import { ShortThoughtHolder } from '@repo/ui/short-thought-holder';
import { ShortThoughtMonth } from '@repo/ui/short-thought-month';
import type { SupportedLocale } from '@bit-trove/localization/config';
import { initialPageParam, getNextPageParam, type QueryKeyOf } from '@repo/api-models/common';

import {
  fetchThoughtSegmentCollection,
  ThoughtSegmentResponseCollection,
} from '@repo/api-models/thought';

// local modules
import { ThoughtTimelineContent } from './thought-timeline-content';

import {
  addTreeNodes,
  type Node,
  type ThoughtTree,
  type ThoughtTreeNodeType,
} from './thoughts-timeline.tree';

const NodesComponent: FC<{
  initial?: boolean;
  locale: SupportedLocale;
  nodes: Array<Node<ThoughtTreeNodeType>>;
}> = ({ locale, nodes, initial }) =>
  nodes.map((node) => {
    switch (node.type) {
      case 'timestamp':
        return (
          <ShortThought
            key={node.children.id}
            itemKey={node.children.id}
            header={node.children.attributes.title}
            // initialEntered={initial}
            publishDate={node.children.attributes.publishedAt}
          >
            <ThoughtTimelineContent locale={locale} slug={node.children.attributes.slug} />
          </ShortThought>
        );

      case 'year':
        return (
          <>
            <ShortThoughtYear year={node.value} />
            {<NodesComponent locale={locale} initial={initial} nodes={node.children} />}
          </>
        );

      case 'month':
        return (
          <>
            <ShortThoughtMonth month={node.value} />
            {<NodesComponent locale={locale} initial={initial} nodes={node.children} />}
          </>
        );

      case 'date':
        return (
          <>
            {node.children.length > 1 ? `${node.type}: ${node.value}` : null}
            {<NodesComponent locale={locale} initial={initial} nodes={node.children} />}
          </>
        );

      default:
        return null;
    }
  });

interface ThoughtsTimelineClientProps {
  queryKey: QueryKeyOf<typeof fetchThoughtSegmentCollection>;
}

const addPages = (tree: ThoughtTree, pages?: ThoughtSegmentResponseCollection[]) =>
  !pages ? tree : pages.reduce((accum, page) => addTreeNodes(accum, page), tree);

export const ThoughtsTimelineClient: FC<ThoughtsTimelineClientProps> = ({ queryKey }) => {
  const { data } = useInfiniteQuery({
    queryKey,
    queryFn: fetchThoughtSegmentCollection,
    getNextPageParam,
    initialPageParam,
  });
  const [tree, setTree] = useState<ThoughtTree>(addPages([], data?.pages));

  useEffect(() => setTree((prev) => addPages(prev, data?.pages)), [data]);

  return (
    <ShortThoughtHolder>
      <NodesComponent initial locale={queryKey[1].locale} nodes={tree} />
    </ShortThoughtHolder>
  );
};
