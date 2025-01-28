// common modules
import * as R from 'ramda';
import type { BlogPostSegment } from '@repo/api-models';

interface TimelineData {
  date: string;
  blogPosts: BlogPostSegment[];
}

export const getTimelineData = (
  locale: string,
  rawData: (BlogPostSegment | null)[] | undefined,
): TimelineData[] => {
  if (!rawData) return [];

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  });

  const data = rawData.filter(val => !!val);
  const dates = R.uniq(data.map(item => dateFormatter.format(new Date(item.created_at))));
  const byDates = R.groupBy(item => dateFormatter.format(new Date(item.created_at)), data);

  return dates.reduce(
    (accum, date) => (!byDates[date] ? accum : [...accum, { blogPosts: byDates[date], date }]),
    [] as TimelineData[],
  );
};
