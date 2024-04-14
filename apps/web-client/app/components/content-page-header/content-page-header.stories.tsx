// global modules
import { faker } from '@faker-js/faker';
import { generateFakeAuthorSegmentResponse } from '@bit-trove/api-models/author';
import { generateFakeCatgorySegmentResponseCollection } from '@bit-trove/api-models/category';
import { PublishDateBadge } from '@bit-trove/ui/small-publish-date-badge';
import { SmallAuthorBadge } from '@bit-trove/ui/small-author-badge';
import { SmallCategoryBadge } from '@bit-trove/ui/small-category-badge';
import { SmallViewsBadge } from '@bit-trove/ui/small-views-badge';
import type { Meta, StoryObj } from '@storybook/react';

// local modules
import { ContentPageHeader } from './content-page-header.component';
import { ViewsBadge } from '../badge/views-badge';

const fakeAuthor = generateFakeAuthorSegmentResponse().data.attributes;
const fakeCategories = generateFakeCatgorySegmentResponseCollection().data;

const meta: Meta<typeof ContentPageHeader> = {
  component: ContentPageHeader,
  title: 'ContentPage/Header',

  decorators: [(Story) => <div style={{ width: 1000 }}>{Story()}</div>],
  parameters: { layout: 'centered' },
  tags: ['autodocs'],

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
            {/* {fakeCategories.map(({ attributes: category }) => (
              <SmallCategoryBadge href="#">{category.name}</SmallCategoryBadge>
            ))} */}

            <ViewsBadge viewsCount={faker.number.int({ max: 1_000_000 })} />
          </>
        )
      }
    />
  ),

  argTypes: {
    background: {
      control: { type: 'text' },
      description: 'Background image url',
      table: { category: 'Component props', type: { summary: 'string' } },
      type: { name: 'string' },
    },

    bottomBadges: {
      control: { type: 'boolean' },
      description: 'Bottom badges',
      table: { category: 'Component props', type: { summary: 'ReactNode' } },
      type: { name: 'other', value: 'ReactNode' },
    },

    topBadges: {
      control: { type: 'boolean' },
      description: 'Top badges',
      table: { category: 'Component props', type: { summary: 'ReactNode' } },
      type: { name: 'other', value: 'ReactNode' },
    },

    children: {
      control: { type: 'text' },
      description: 'Title content',
      table: { category: 'Component props', type: { summary: 'string' } },
      type: { name: 'other', value: 'ReactNode' },
    },

    className: {
      control: false,
      description: 'Class name',
      table: { category: 'Component props', type: { summary: 'string' } },
      type: { name: 'string' },
    },
  },

  args: {
    background: faker.image.urlPicsumPhotos({ height: 100, width: 270 }),
    bottomBadges: true,
    children: faker.lorem.sentence(),
    topBadges: true,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
