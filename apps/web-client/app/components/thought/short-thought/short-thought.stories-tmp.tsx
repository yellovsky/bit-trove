// global modules
import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';

// local modules
import { ShortThought } from './short-thought.component';
import { ShortThoughtHolder } from '../short-thought-holder';

const meta: Meta<typeof ShortThought> = {
  component: ShortThought,
  tags: ['autodocs'],
  title: 'Thoughts/ShortThought',

  render: (props) => (
    <ShortThoughtHolder>
      <ShortThought {...props} />
    </ShortThoughtHolder>
  ),

  argTypes: {
    header: {
      control: { type: 'text' },
      description: 'Thought title',
      table: { category: 'Component props', type: { summary: 'ReactNode' } },
      type: { name: 'other', required: true, value: 'ReactNode' },
    },

    children: {
      control: { type: 'text' },
      description: 'Thought content',
      table: { category: 'Component props', type: { summary: 'ReactNode' } },
      type: { name: 'other', required: true, value: 'ReactNode' },
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
      type: { name: 'other', required: true, value: 'string | number | Date' },
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
