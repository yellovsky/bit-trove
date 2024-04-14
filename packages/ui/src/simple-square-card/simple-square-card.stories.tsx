// global modules
import type { Meta, StoryObj } from '@storybook/react';

// local modules
import { SimpleSquareCard, SimpleSquareCardPending } from './simple-square-card.component';

const meta: Meta<typeof SimpleSquareCard> = {
  component: SimpleSquareCard,
  title: 'Cards/SimpleSquareCard',

  decorators: [(Story) => <div style={{ width: '12rem' }}>{Story()}</div>],
  parameters: { layout: 'centered' },
  tags: ['autodocs'],

  argTypes: {
    cover: {
      control: { type: 'text' },
      description: 'Card cover image url',
      table: { category: 'Component props', type: { summary: 'string' } },
      type: { name: 'string' },
    },
    name: {
      control: { type: 'text' },
      description: 'Card name text',
      table: { category: 'Component props', type: { summary: 'string' } },
      type: { name: 'other', value: 'ReactNode' },
    },
    to: {
      control: false,
      description: 'Card link',
      table: { category: 'Component props', type: { summary: 'string | UrlObject' } },
      type: { name: 'other', value: 'string | UrlObject' },
    },
  },

  args: {
    cover: 'https://picsum.photos/200/200',
    name: 'name',
    to: '#',
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

export const Pending: Story = {
  render: () => <SimpleSquareCardPending />,
};
