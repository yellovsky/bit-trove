// global modules
import { faker } from '@faker-js/faker';
import { generateFakeAuthorSegmentResponse } from '@bit-trove/api-models/author';
import { generateFakeCatgorySegmentResponseCollection } from '@bit-trove/api-models/category';
import type { Meta, StoryObj } from '@storybook/react';

// local modules
import { AuthorBadge } from '~/components/badge/author-badge';
import { CategoryBadge } from '~/components/badge/category-badge';
import { ContentPageHeader } from './content-page-header.component';
import { PublishDateBadge } from '~/components/badge/publish-date-badge';
import { ViewsBadge } from '~/components/badge/views-badge';

const fakeAuthor = generateFakeAuthorSegmentResponse().data.attributes;
const fakeCategories = generateFakeCatgorySegmentResponseCollection().data;

const meta: Meta<typeof ContentPageHeader> = {
  component: ContentPageHeader,
  title: 'Components/ContentPage/Header',

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
            <AuthorBadge author={fakeAuthor} />
          </>
        )
      }
      topBadges={
        !props.topBadges ? undefined : (
          <>
            {fakeCategories.map(({ id, attributes: category }) => (
              <CategoryBadge category={category} key={id} />
            ))}

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
