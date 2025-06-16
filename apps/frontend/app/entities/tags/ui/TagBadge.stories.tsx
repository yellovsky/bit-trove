import type { Meta, StoryObj } from '@storybook/react';

import { TagBadge } from './TagBadge';

const meta = {
  args: {
    tag: { id: 'id', name: 'Tag name' },
  },
  component: TagBadge,
} satisfies Meta<typeof TagBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
