// global modules
import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';

// local modules
import { Info } from './info.component';

const meta = {
  component: Info,
  tags: ['autodocs'],
  title: 'Components/Info',

  args: { children: faker.lorem.words(3) },
  argTypes: {},
} satisfies Meta<typeof Info>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
