// global modules
import * as R from 'ramda';
import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';

// local modules
import { ShortThought } from '../short-thought';
import { ShortThoughtHolder } from './short-thought-holder.component';

const randomData = R.times(
  (i) => ({
    children: faker.lorem.paragraphs(3),
    header: faker.lorem.sentence(),
    publishDate: faker.date.between({
      from: new Date(2000, 10 + i),
      to: new Date(2000, 12 + i),
    }),
  }),
  10
).sort((a, b) => a.publishDate.getTime() - b.publishDate.getTime());

const meta: Meta<typeof ShortThought> = {
  title: 'Thoughts/ShortThoughtHolder',
  component: ShortThought,
  tags: ['autodocs'],
  render: (props) => (
    <ShortThoughtHolder>
      {randomData.map((data, index) => (
        <ShortThought {...data} key={index} />
      ))}
    </ShortThoughtHolder>
  ),
  argTypes: {
    header: {
      control: { type: 'text' },
      description: 'Thought title',
      table: { category: 'Component props', type: { summary: 'ReactNode' } },
      type: { required: true, name: 'other', value: 'ReactNode' },
    },

    children: {
      control: { type: 'text' },
      description: 'Thought content',
      table: { category: 'Component props', type: { summary: 'ReactNode' } },
      type: { required: true, name: 'other', value: 'ReactNode' },
    },

    initialEntered: {
      control: { type: 'boolean' },
      description: 'Initial opened (expanded) state',
      table: { category: 'Component props', type: { summary: 'boolean' } },
      type: { name: 'boolean' },
    },

    itemKey: {
      control: false,
      description: "@szhsin/react-accordion's item key",
      table: { category: 'Component props', type: { summary: 'string' } },
      type: { name: 'string' },
    },

    publishDate: {
      control: { type: 'date' },
      description: 'Thought publish date',
      table: { category: 'Component props', type: { summary: 'string | number | Date' } },
      type: { required: true, name: 'other', value: 'string | number | Date' },
    },
  },

  args: {
    children: faker.lorem.paragraphs(3),
    header: faker.lorem.sentence(),
    publishDate: faker.date.anytime(),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = { args: {} as never };
