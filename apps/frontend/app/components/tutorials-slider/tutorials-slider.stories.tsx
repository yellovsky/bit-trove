// global modules
import type { Meta, StoryObj } from '@storybook/react';

// common modules
import { makeTutorialSegmentMock } from '~/utils/mocks/tutorial';

// local modules
import { TutorialsSlider } from './tutorials-slider.component';

const tutorials = [
  makeTutorialSegmentMock(),
  makeTutorialSegmentMock(),
  makeTutorialSegmentMock(),
  makeTutorialSegmentMock(),
];

const meta = {
  component: TutorialsSlider,
  tags: ['autodocs'],
  title: 'Components/TutorialsSlider',

  args: { hasNextPage: true, pending: false, tutorials },
  argTypes: {
    tutorials: {
      control: false,
    },
  },
} satisfies Meta<typeof TutorialsSlider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
