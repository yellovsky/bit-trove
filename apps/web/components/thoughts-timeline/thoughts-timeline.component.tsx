'use client';

// global modules
import { type FC } from 'react';
import { NoResult } from '@bit-trove/ui/no-result';
import { ShortThought } from '@bit-trove/ui/short-thought';
import { ShortThoughtHolder } from '@bit-trove/ui/short-thought-holder';
import { ShortThoughtMonth } from '@bit-trove/ui/short-thought-month';
import { ShortThoughtYear } from '@bit-trove/ui/short-thought-year';
import type { SupportedLocale } from '@bit-trove/localization/config';

// local modules
import { ThoughtTimelineContent } from './thought-timeline-content';

import type {
  DateThoughtNode,
  MonthThoughtNode,
  ThoughtTree,
  TimestampThoughtNode,
  YearThoughtNode,
} from './thoughts-timeline.tree';

interface TimestampNodeProps {
  locale: SupportedLocale;
  node: TimestampThoughtNode;
}

const TimestampNode: FC<TimestampNodeProps> = ({ locale, node }) => (
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

interface DateNodeProps {
  locale: SupportedLocale;
  node: DateThoughtNode;
}

const DateNode: FC<DateNodeProps> = ({ locale, node }) => (
  <>
    {node.children.length > 1 ? `${node.type}: ${node.value}` : null}
    {node.children.map((timestampNode) => (
      <TimestampNode key={timestampNode.value} locale={locale} node={timestampNode} />
    ))}
  </>
);

interface MonthNodeProps {
  node: MonthThoughtNode;
  locale: SupportedLocale;
}

const MonthNode: FC<MonthNodeProps> = ({ locale, node }) => (
  <>
    <ShortThoughtMonth month={node.value} />
    {node.children.map((timestampNode) => (
      <DateNode key={timestampNode.value} locale={locale} node={timestampNode} />
    ))}
  </>
);

interface YearNodeProps {
  locale: SupportedLocale;
  node: YearThoughtNode;
}

const YearNode: FC<YearNodeProps> = ({ locale, node }) => (
  <>
    <ShortThoughtYear year={node.value} />
    {node.children.map((timestampNode) => (
      <MonthNode key={timestampNode.value} locale={locale} node={timestampNode} />
    ))}
  </>
);

interface ThoughtsTimelineClientProps {
  tree: ThoughtTree;
  locale: SupportedLocale;
}

export const ThoughtsTimeline: FC<ThoughtsTimelineClientProps> = ({ locale, tree }) => {
  if (!tree.length) return <NoResult />;

  return (
    <ShortThoughtHolder>
      {tree.map((yearNode) => (
        <YearNode key={yearNode.value} locale={locale} node={yearNode} />
      ))}
    </ShortThoughtHolder>
  );
};
