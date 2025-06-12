import { Text, Timeline } from '@mantine/core';
import { differenceInDays } from 'date-fns';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import type { ShortThought } from '@repo/api-models';

import { Link } from '@shared/ui/link';

import { getThoughtLink } from '../lib/links';

interface ThoughtTimelineItemProps {
  thought: ShortThought;
}

export const ThoughtTimelineItem: FC<ThoughtTimelineItemProps> = ({ thought }) => {
  const { i18n } = useTranslation();
  const dayDiff = differenceInDays(new Date(), new Date(thought.publishedAt ?? thought.createdAt));
  const rtf = new Intl.RelativeTimeFormat(i18n.language, { numeric: 'auto' });

  return (
    <Timeline.Item
      bullet
      title={
        <Link to={getThoughtLink(thought)} underline="never" variant="text">
          {thought.title}
        </Link>
      }
    >
      <Text c="dimmed" size="sm">
        {thought.shortDescription}
      </Text>
      <Text className="capitalize" mt={4} size="xs">
        {rtf.format(dayDiff, 'day')}
      </Text>
    </Timeline.Item>
  );
};
