// global modules
import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';
import { SmallViewsBadge } from '@bit-trove/ui/small-views-badge';
import { SmallAuthorBadge } from '@bit-trove/ui/small-author-badge';
import { SmallCategoryBadge } from '@bit-trove/ui/small-category-badge';
import { generateFakeAuthorSegment } from '@bit-trove/api-models/author';
import { PublishDateBadge } from '@bit-trove/ui/small-publish-date-badge';
import { generateFakeCatgorySegmentResponseCollection } from '@bit-trove/api-models/category';

// local modules
import { ContentPageHeader } from './content-page-header.component';

const fakeAuthor = generateFakeAuthorSegment().data.attributes;
const fakeCategories = generateFakeCatgorySegmentResponseCollection().data;

const meta: Meta<typeof ContentPageHeader> = {
  title: 'ContentPage/Header',
  component: ContentPageHeader,

  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 1000 }}>{Story()}</div>],

  render: (props) => (
    <ContentPageHeader
      {...props}
      bottomBadges={
        !props.bottomBadges ? undefined : (
          <>
            <PublishDateBadge date={faker.date.anytime()} />
            <SmallAuthorBadge author={fakeAuthor} />
          </>
        )
      }
      topBadges={
        !props.topBadges ? undefined : (
          <>
            {fakeCategories.map(({ attributes: category }) => (
              <SmallCategoryBadge href="#">{category.name}</SmallCategoryBadge>
            ))}

            <SmallViewsBadge viewsCount={faker.number.int({ max: 1_000_000 })} />
          </>
        )
      }
    />
  ),
  argTypes: {
    background: {
      type: { name: 'string' },
      control: { type: 'text' },
      description: 'Background image url',
      table: { category: 'Component props', type: { summary: 'string' } },
    },

    bottomBadges: {
      control: { type: 'boolean' },
      description: 'Bottom badges',
      type: { name: 'other', value: 'ReactNode' },
      table: { category: 'Component props', type: { summary: 'ReactNode' } },
    },

    topBadges: {
      control: { type: 'boolean' },
      description: 'Top badges',
      type: { name: 'other', value: 'ReactNode' },
      table: { category: 'Component props', type: { summary: 'ReactNode' } },
    },

    children: {
      control: { type: 'text' },
      description: 'Title content',
      type: { name: 'other', value: 'ReactNode' },
      table: { category: 'Component props', type: { summary: 'string' } },
    },

    className: {
      control: false,
      type: { name: 'string' },
      description: 'Class name',
      table: { category: 'Component props', type: { summary: 'string' } },
    },
  },

  args: {
    topBadges: true,
    bottomBadges: true,
    children: faker.lorem.sentence(),
    background: faker.image.urlPicsumPhotos({ width: 270, height: 100 }),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
