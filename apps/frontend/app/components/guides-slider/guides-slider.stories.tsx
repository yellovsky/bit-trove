// global modules
import type { Meta, StoryObj } from '@storybook/react';

// local modules
import { GuidesSlider } from './guides-slider.component';
import { makeGuideSegmentMock } from '../../utils/mocks/guide';

const guides = [
  makeGuideSegmentMock(),
  makeGuideSegmentMock(),
  makeGuideSegmentMock(),
  makeGuideSegmentMock(),
];

const meta = {
  component: GuidesSlider,
  tags: ['autodocs'],
  title: 'Components/GuidesSlider',

  args: { guides, hasNextPage: true, pending: false },
  argTypes: {
    guides: {
      control: false,
    },
  },
} satisfies Meta<typeof GuidesSlider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
