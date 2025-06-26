import type { Meta, StoryObj } from '@storybook/react';
import { Check, Hash, Mail } from 'lucide-react';

import { TextInput, type TextInputProps } from './TextInput';

const render = (args: TextInputProps) => (
  <>
    <div style={{ display: 'grid', gap: '0.5rem', gridTemplateColumns: 'min-content 1fr' }}>
      <div className="text-nowrap text-sm">Plain</div>
      <div>
        <TextInput {...args} />
      </div>

      <div className="text-nowrap text-sm">With Left Element</div>
      <div>
        <TextInput {...args} leftElement={<Mail />} />
      </div>

      <div className="text-nowrap text-sm">With Right Element</div>
      <div>
        <TextInput {...args} rightElement={<Check />} />
      </div>

      <div className="text-nowrap text-sm">Both Elements</div>
      <div>
        <TextInput {...args} leftElement={<Mail />} rightElement={<Check />} />
      </div>
    </div>
  </>
);

const meta = {
  args: {
    disabled: false,
    placeholder: 'Placeholder text',
  },
  argTypes: {},
  component: TextInput,
  render,
  title: 'UI/TextInput',
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Hash />
        Badge
      </>
    ),
  },
};
