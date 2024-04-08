// global modules
import * as R from 'ramda';
import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';

// local modules
import { generateFakeAuthorSegment } from '@bit-trove/api-models/author';
import { generateFakeTagSegment } from '@bit-trove/api-models/tag';
import { generateFakeUploadFileResponse } from '@bit-trove/api-models/upload-file';
import { HorizontalCard, HorizontalCardPending } from './horizontal-card.component';

const meta: Meta<typeof HorizontalCard> = {
  component: HorizontalCard,
  title: 'Cards/HorizontalCard',

  decorators: [(Story) => <div style={{ width: '50rem' }}>{Story()}</div>],
  parameters: { layout: 'centered' },
  tags: ['autodocs'],

  argTypes: {
    author: {
      control: false,
      description: 'Card author info',
      table: { category: 'Component props', type: { summary: 'AuthorSegment' } },
      type: { name: 'other', value: 'AuthorSegment' },
    },
    description: {
      control: { type: 'text' },
      description: 'Card description',
      table: { category: 'Component props', type: { summary: 'ReactNode' } },
      type: { name: 'other', value: 'ReactNode' },
    },
    href: {
      control: false,
      description: 'Card link',
      table: { category: 'Component props', type: { summary: 'string | UrlObject' } },
      type: { name: 'other', value: 'string | UrlObject' },
    },
    img: {
      control: false,
      description: 'Card image',
      table: { category: 'Component props', type: { summary: 'UploadFile' } },
      type: { name: 'other', value: 'UploadFile' },
    },
    publishedAt: {
      control: false,
      description: 'Card published at date',
      table: { category: 'Component props', type: { summary: 'string | number | Date' } },
      type: { name: 'other', value: 'string | number | Date' },
    },
    tags: {
      control: false,
      description: 'Card tags list',
      table: { category: 'Component props', type: { summary: 'TagSegment[]' } },
      type: { name: 'other', value: 'TagSegment[]' },
    },
    title: {
      control: { type: 'text' },
      description: 'Card title',
      table: { category: 'Component props', type: { summary: 'ReactNode' } },
      type: { name: 'other', value: 'ReactNode' },
    },
  },

  args: {
    author: generateFakeAuthorSegment(),
    description: faker.lorem.paragraph(),
    href: '#',
    img: generateFakeUploadFileResponse().data.attributes,
    publishedAt: faker.date.anytime().toUTCString(),
    tags: R.times(generateFakeTagSegment, 2),
    title: faker.lorem.sentence(),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Card to display (mainly) category card in the footer',
      },
    },
  },
};

export const WithoutImage: Story = {
  args: { img: undefined },
};

export const Pending: Story = {
  render: () => <HorizontalCardPending />,
};
