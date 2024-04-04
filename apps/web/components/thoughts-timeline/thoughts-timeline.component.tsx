'use client';

// global modules
import { type FC } from 'react';
import { ShortThought } from '@repo/ui/short-thought';
import { ShortThoughtYear } from '@repo/ui/short-thought-year';
import { ShortThoughtHolder } from '@repo/ui/short-thought-holder';
import { ShortThoughtMonth } from '@repo/ui/short-thought-month';
import type { SupportedLocale } from '@bit-trove/localization/config';

// local modules
import { ThoughtTimelineContent } from './thought-timeline-content';

import type {
  ThoughtTree,
  DateThoughtNode,
  YearThoughtNode,
  MonthThoughtNode,
  TimestampThoughtNode,
} from './thoughts-timeline.tree';

interface TimestampNodeProps {
  locale: SupportedLocale;
  node: TimestampThoughtNode;
}

const TimestampNode: FC<TimestampNodeProps> = ({ locale, node }) => (
  <ShortThought
    key={node.children.id}
    itemKey={node.children.id}
    header={node.children.attributes.title}
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
      <TimestampNode key={timestampNode.value} node={timestampNode} locale={locale} />
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
      <DateNode key={timestampNode.value} node={timestampNode} locale={locale} />
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
      <MonthNode key={timestampNode.value} node={timestampNode} locale={locale} />
    ))}
  </>
);

interface ThoughtsTimelineClientProps {
  tree: ThoughtTree;
  locale: SupportedLocale;
}

export const ThoughtsTimeline: FC<ThoughtsTimelineClientProps> = ({ locale, tree }) => (
  <ShortThoughtHolder>
    {tree.map((yearNode) => (
      <YearNode locale={locale} node={yearNode} key={yearNode.value} />
    ))}
  </ShortThoughtHolder>
);
