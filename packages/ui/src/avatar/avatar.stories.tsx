// global modules
import type { ComponentProps } from 'react';
import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';

// local modules
import { Avatar, AvatarPending } from './avatar.component';

const AVATAR_SIZES = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

const meta = {
  component: Avatar,
  title: 'UI/Avatar',

  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {
    size: {
      control: 'select',
      description: 'Avatar size',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      table: {
        category: 'Component props',
        type: { summary: "'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl" },
      },
      type: { name: 'other', value: "'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl" },
    },
    src: {
      control: { type: 'text' },
      description: 'Image src attribute',
      table: { category: 'Component props', type: { summary: 'string' } },
      type: { name: 'other', value: 'string' },
    },
  },

  args: {
    src: faker.image.urlPicsumPhotos({ height: 500, width: 500 }),
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

const renderAvatarSet = (props: ComponentProps<typeof Avatar>) => (
  <>
    <div style={{ alignItems: 'center', display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
      {AVATAR_SIZES.map((size) => (
        <div key={size}>
          <Avatar {...props} size={size} />
        </div>
      ))}
    </div>
    <div style={{ alignItems: 'center', display: 'flex', gap: '1rem' }}>
      {AVATAR_SIZES.map((size) => (
        <div key={size}>
          <AvatarPending {...props} size={size} />
        </div>
      ))}
    </div>
  </>
);

export const Playground: Story = { render: renderAvatarSet };
