// global modules
import type { FC } from 'react';
import { thoughtQueryFn } from '@bit-trove/api-models/thought';
import { useQuery } from '@tanstack/react-query';

// local modules
import { Blocks } from '../../blocks';
import { ThoughtTimelineContentPending } from './thought-timeline-content.pending';

interface ThoughtTimelineContentProps {
  slug: string;
  locale: string;
}

export const ThoughtTimelineContent: FC<ThoughtTimelineContentProps> = ({ slug, locale }) => {
  const { data, status } = useQuery({
    queryFn: thoughtQueryFn,
    queryKey: ['thought', { locale, slug }],
  });

  if (status === 'error') return <div>error</div>;
  if (status === 'pending') return <ThoughtTimelineContentPending />;
  return !data.data ? null : <Blocks blocks={data.data.attributes.blocks} />;
};
