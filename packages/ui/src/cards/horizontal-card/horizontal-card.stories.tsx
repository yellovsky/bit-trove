// global modules
import * as R from 'ramda';
import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';
// local modules
import { HorizontalCard, HorizontalCardPending } from './horizontal-card.component';
import { generateFakeUploadFileResponse } from '@bit-trove/api-models/upload-file';
import { generateFakeTagSegment } from '@bit-trove/api-models/tag';
import { generateFakeAuthorSegment } from '@bit-trove/api-models/author';

const meta: Meta<typeof HorizontalCard> = {
  title: 'Cards/HorizontalCard',
  component: HorizontalCard,
  decorators: [(Story) => <div style={{ width: '50rem' }}>{Story()}</div>],
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    img: {
      control: false,
      description: 'Card image',
      table: { category: 'Component props', type: { summary: 'UploadFile' } },
      type: { name: 'other', value: 'UploadFile' },
    },
    title: {
      control: { type: 'text' },
      description: 'Card title',
      table: { category: 'Component props', type: { summary: 'ReactNode' } },
      type: { name: 'other', value: 'ReactNode' },
    },
    description: {
      control: { type: 'text' },
      description: 'Card description',
      table: { category: 'Component props', type: { summary: 'ReactNode' } },
      type: { name: 'other', value: 'ReactNode' },
    },
    author: {
      control: false,
      description: 'Card author info',
      table: { category: 'Component props', type: { summary: 'AuthorSegment' } },
      type: { name: 'other', value: 'AuthorSegment' },
    },
    tags: {
      control: false,
      description: 'Card tags list',
      table: { category: 'Component props', type: { summary: 'TagSegment[]' } },
      type: { name: 'other', value: 'TagSegment[]' },
    },
    publishedAt: {
      control: false,
      description: 'Card published at date',
      table: { category: 'Component props', type: { summary: 'string | number | Date' } },
      type: { name: 'other', value: 'string | number | Date' },
    },
    href: {
      control: false,
      description: 'Card link',
      table: { category: 'Component props', type: { summary: 'string | UrlObject' } },
      type: { name: 'other', value: 'string | UrlObject' },
    },
  },

  args: {
    href: '#',
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    author: generateFakeAuthorSegment(),
    tags: R.times(generateFakeTagSegment, 2),
    publishedAt: faker.date.anytime().toUTCString(),
    img: generateFakeUploadFileResponse().data.attributes,
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
