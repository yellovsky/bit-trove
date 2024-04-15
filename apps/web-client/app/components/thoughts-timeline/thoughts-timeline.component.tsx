// global modules
import { useEffect, useState, type FC } from 'react';
import { Link } from '@repo/ui/link';
import type { QueryKeyOf } from '@bit-trove/api-models/common';
import { useQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import {
  fetchThoughtSegmentCollection,
  thoughtLink,
  type ThoughtSegmentResponseCollection,
} from '@bit-trove/api-models/thought';
import { ShortThoughtHolder } from '../thought/short-thought-holder';
import { ShortThoughtYear } from '../thought/short-thought-year';
import { ShortThoughtMonth } from '../thought/short-thought-month';
import { ShortThought } from '../thought/short-thought';
import {
  addTreeNodes,
  type DateThoughtNode,
  type MonthThoughtNode,
  type ThoughtTree,
  type TimestampThoughtNode,
  type YearThoughtNode,
} from './thoughts-timeline.tree';

import { getNextPageParam, initialPageParam } from '@bit-trove/api-models/common';
import { ThoughtTimelineContent } from './thought-timeline-content';
import { useLocale } from '~/utils/use-locale';

interface TimestampNodeProps {
  node: TimestampThoughtNode;
}

const TimestampNode: FC<TimestampNodeProps> = ({ node }) => {
  const locale = useLocale();

  return (
    <ShortThought
      header={node.children.attributes.title}
      itemKey={node.children.id}
      key={node.children.id}
      publishDate={node.children.attributes.publishedAt}
    >
      {JSON.stringify(node.children.attributes.tags)}
      <ThoughtTimelineContent locale={locale} slug={node.children.attributes.slug} />
    </ShortThought>
  );
};

interface DateNodeProps {
  node: DateThoughtNode;
}

const DateNode: FC<DateNodeProps> = ({ node }) => (
  <>
    {node.children.length > 1 ? `${node.type}: ${node.value}` : null}
    {node.children.map((timestampNode) => (
      <TimestampNode key={timestampNode.value} node={timestampNode} />
    ))}
  </>
);

interface MonthNodeProps {
  node: MonthThoughtNode;
}

const MonthNode: FC<MonthNodeProps> = ({ node }) => (
  <>
    <ShortThoughtMonth month={node.value} />
    {node.children.map((timestampNode) => (
      <DateNode key={timestampNode.value} node={timestampNode} />
    ))}
  </>
);

interface YearNodeProps {
  node: YearThoughtNode;
}

const YearNode: FC<YearNodeProps> = ({ node }) => (
  <>
    <ShortThoughtYear year={node.value} />
    {node.children.map((timestampNode) => (
      <MonthNode key={timestampNode.value} node={timestampNode} />
    ))}
  </>
);

const addPagesToTree = (tree: ThoughtTree, pages?: ThoughtSegmentResponseCollection[]) =>
  !pages ? tree : pages.reduce((accum, page) => addTreeNodes(accum, page), tree);

interface ThoughtsTimelineProps {
  queryKey: QueryKeyOf<typeof fetchThoughtSegmentCollection>;
}

export const ThoughtsTimeline: FC<ThoughtsTimelineProps> = ({ queryKey }) => {
  const { data } = useSuspenseInfiniteQuery({
    getNextPageParam,
    initialPageParam,
    queryFn: fetchThoughtSegmentCollection,
    queryKey,
  });

  const [tree, setTree] = useState<ThoughtTree>(addPagesToTree([], data?.pages));

  useEffect(() => setTree((prev) => addPagesToTree(prev, data?.pages)), [data]);

  return (
    <ShortThoughtHolder>
      {tree.map((yearNode) => (
        <YearNode key={yearNode.value} node={yearNode} />
      ))}
    </ShortThoughtHolder>
  );
};
