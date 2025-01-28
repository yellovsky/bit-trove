// global modules
import type { BlogPostListFP } from '@repo/api-models';
import { useDebounce } from '@uidotdev/usehooks';
import { useLocale } from '@repo/remix-i18n';
import { type FC, Fragment, useCallback } from 'react';

// common modules
import { OnIntersectingChange } from '~/components/on-intersecting-change';
import { useBlogPostListInfiniteQuery } from '~/api/blog-post';
import { Timeline, TimelineBlock, TimelineDate, TimelineDatePending } from '~/components/timeline';

import {
  BlogPostTimelineBlock,
  BlogPostTimelineBlockPending,
} from '~/components/blog-post-timeline-block';

// local modules
import { getTimelineData } from './helpers';
import { page as pageCn } from './page.module.scss';

interface IndexPageProps {
  blogPostFP: BlogPostListFP;
}

export const IndexPage: FC<IndexPageProps> = ({ blogPostFP }) => {
  const locale = useLocale();
  const blogListQuery = useBlogPostListInfiniteQuery(blogPostFP);

  const blogPosts = blogListQuery.data?.pages.map(page => page.data).flat();
  const timelineData = getTimelineData(locale, blogPosts);

  const debouncedIsFetchingNextPage = useDebounce(blogListQuery.isFetchingNextPage, 200);
  const showLoadNext = !blogListQuery.isFetched || debouncedIsFetchingNextPage;

  const handleIntersectingChange = useCallback((isIntersecting: boolean) => {
    if (isIntersecting) blogListQuery.fetchNextPage();
  }, []);

  return (
    <div className={pageCn}>
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
    </div>
  );
};
