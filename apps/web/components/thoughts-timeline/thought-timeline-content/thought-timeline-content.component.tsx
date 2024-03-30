// global modules
import type { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { thoughtQueryFn } from '@repo/api-models/thought';
import type { SupportedLocale } from '@bit-trove/localization/config';

// local modules
import { Blocks } from '../../blocks';
import { ThoughtTimelineContentPending } from './thought-timeline-content.pending';

interface ThoughtTimelineContentProps {
  slug: string;
  locale: SupportedLocale;
}

export const ThoughtTimelineContent: FC<ThoughtTimelineContentProps> = ({ slug, locale }) => {
  const { data, status } = useQuery({
    queryKey: ['thought', { locale, slug }],
    queryFn: thoughtQueryFn,
  });

  if (status === 'error') return <div>error</div>;
  if (status === 'pending') return <ThoughtTimelineContentPending />;
  return !data.data ? null : <Blocks blocks={data.data.attributes.blocks} />;
};
