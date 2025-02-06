// global modules
import type { BlogPostSegment } from '@repo/api-models';
import { faker } from '@faker-js/faker';
import type { Meta } from '@storybook/react';
import { useState } from 'react';

// common modules
import { BlogPostTimelineBlock } from '~/components/blog-post-timeline-block';
import { useDateFormatter } from '~/utils/formatter';

// local modules
import { Timeline, TimelineBlock, TimelineDate } from './timeline.component';

export default {
  title: 'Components/Timeline',
} as Meta;

const getFakeItem = (): BlogPostSegment => {
  const created_at = faker.date.past().toISOString();

  return {
    created_at,
    id: faker.string.uuid(),
    language_code: faker.helpers.arrayElement(['ru', 'en']),
    language_codes: faker.helpers.arrayElement([['ru', 'en'], ['ru'], ['en']]),
    original_language_code: faker.helpers.arrayElement(['ru', 'en']),
    published_at: created_at,
    short_description: faker.lorem.paragraph(),
    slug: faker.lorem.word(),
    title: faker.lorem.sentence(),
  };
};

export const ButtonShowcase = () => {
  const dateFormatter = useDateFormatter('en');

  const [dateOne] = useState(() => dateFormatter.format(faker.date.past()));
  const [blogPostsOne] = useState(() => [getFakeItem(), getFakeItem(), getFakeItem()]);

  const [dateTwo] = useState(() => dateFormatter.format(faker.date.past()));
  const [blogPostsTwo] = useState(() => [getFakeItem(), getFakeItem(), getFakeItem()]);

  return (
    <Timeline>
      <TimelineDate>{dateOne}</TimelineDate>
      {blogPostsOne.map(item => (
        <TimelineBlock key={item.id}>
          <BlogPostTimelineBlock item={item} />
        </TimelineBlock>
      ))}

      <TimelineDate>{dateTwo}</TimelineDate>
      {blogPostsTwo.map(item => (
        <TimelineBlock key={item.id}>
          <BlogPostTimelineBlock item={item} />
        </TimelineBlock>
      ))}
    </Timeline>
  );
};
