// global modules
import { useDebounce } from '@uidotdev/usehooks';
import { useTranslation } from 'react-i18next';
import { type FC, Fragment, useCallback } from 'react';

// common modules
import { getBlogRouteLink } from '~/utils/links';
import { OnIntersectingChange } from '~/components/on-intersecting-change';
import { useDateFormatter } from '~/utils/formatter';
import { Timeline, TimelineBlock, TimelineDate, TimelineDatePending } from '~/components/timeline';

import {
  type FetchBlogPostListInfiniteVariables,
  useBlogPostListInfiniteQuery,
} from '~/api/blog-post';

import {
  BlogPostTimelineBlock,
  BlogPostTimelineBlockPending,
} from '~/components/blog-post-timeline-block';

// local modules
import { getTimelineData } from './helpers';
import { SectionLink } from './section-link';

interface TimelineSectionProps {
  blogPostListVariables: FetchBlogPostListInfiniteVariables;
}

export const TimelineSection: FC<TimelineSectionProps> = ({ blogPostListVariables }) => {
  const { t } = useTranslation();
  const blogListQuery = useBlogPostListInfiniteQuery(blogPostListVariables);

  const blogPosts = blogListQuery.data?.pages.map(page => page.data).flat();
  const dateFormatter = useDateFormatter();
  const timelineData = getTimelineData(dateFormatter, blogPosts);

  const debouncedIsFetchingNextPage = useDebounce(blogListQuery.isFetchingNextPage, 200);
  const showLoadNext = !blogListQuery.isFetched || debouncedIsFetchingNextPage;

  const handleIntersectingChange = useCallback((isIntersecting: boolean) => {
    if (isIntersecting) blogListQuery.fetchNextPage();
  }, []);

  return (
    <>
      <SectionLink to={getBlogRouteLink()}>{t('BLOG_PAGE_TITLE')}</SectionLink>

      <Timeline>
        {timelineData.map(tdata => (
          <Fragment key={tdata.date}>
            <TimelineDate>{tdata.date}</TimelineDate>

            {tdata.blogPosts?.map(item =>
              !item ? null : (
                <TimelineBlock key={item.id}>
                  <BlogPostTimelineBlock item={item} />
                </TimelineBlock>
              ),
            )}
          </Fragment>
        ))}

        {!blogListQuery.isFetched && <TimelineDatePending />}

        {showLoadNext && (
          <>
            <TimelineBlock>
              <BlogPostTimelineBlockPending />
            </TimelineBlock>

            <TimelineBlock>
              <BlogPostTimelineBlockPending />
            </TimelineBlock>
          </>
        )}
      </Timeline>

      {!blogListQuery.isFetching && blogListQuery.hasNextPage && (
        <OnIntersectingChange onChange={handleIntersectingChange} />
      )}
    </>
  );
};
