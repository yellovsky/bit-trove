import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Checkbox } from './Checkbox';
import checkboxMd from './Checkbox.mdx';

const meta: Meta<typeof Checkbox> = {
  argTypes: {
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
  component: Checkbox,
  parameters: {
    docs: {
      page: checkboxMd,
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Checkbox',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const WithLabel: Story = {
  args: {
    checked: false,
    label: 'Accept terms and conditions',
  },
};

export const WithDescription: Story = {
  args: {
    checked: false,
    description: 'Receive updates about new features and releases.',
    label: 'Subscribe to newsletter',
  },
};

export const Indeterminate: Story = {
  args: {
    checked: 'indeterminate',
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    label: 'Disabled checkbox',
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'Disabled checked checkbox',
  },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <Checkbox
        checked={checked}
        label="Controlled checkbox"
        onCheckedChange={(checked) => setChecked(checked as boolean)}
      />
    );
  },
};

export const ControlledIndeterminate: Story = {
  render: () => {
    const [state, setState] = useState<'unchecked' | 'checked' | 'indeterminate'>('unchecked');

    const handleChange = (checked: boolean) => {
      if (checked) {
        setState('checked');
      } else {
        setState('unchecked');
      }
    };

    return (
      <div className="space-y-4">
        <Checkbox
          checked={state === 'indeterminate' ? 'indeterminate' : state === 'checked'}
          label="Controlled indeterminate checkbox"
          onCheckedChange={handleChange}
        />
        <div className="space-x-2">
          <button className="rounded border px-3 py-1 text-sm" onClick={() => setState('unchecked')} type="button">
            Unchecked
          </button>
          <button className="rounded border px-3 py-1 text-sm" onClick={() => setState('indeterminate')} type="button">
            Indeterminate
          </button>
          <button className="rounded border px-3 py-1 text-sm" onClick={() => setState('checked')} type="button">
            Checked
          </button>
        </div>
      </div>
    );
  },
};

export const MultipleCheckboxes: Story = {
  render: () => {
    const [items, setItems] = useState([
      { checked: false, id: '1', label: 'Item 1' },
      { checked: false, id: '2', label: 'Item 2' },
      { checked: false, id: '3', label: 'Item 3' },
    ]);

    const allChecked = items.every((item) => item.checked);
    const someChecked = items.some((item) => item.checked);
    const indeterminate = someChecked && !allChecked;

    const handleSelectAll = (checked: boolean) => {
      setItems(items.map((item) => ({ ...item, checked })));
    };

    const handleSelectItem = (id: string, checked: boolean) => {
      setItems(items.map((item) => (item.id === id ? { ...item, checked } : item)));
    };

    return (
      <div className="space-y-4">
        <Checkbox
          checked={indeterminate ? 'indeterminate' : allChecked}
          label="Select all"
          onCheckedChange={handleSelectAll}
        />
        <div className="space-y-2">
          {items.map((item) => (
            <Checkbox
              checked={item.checked}
              key={item.id}
              label={item.label}
              onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
            />
          ))}
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      newsletter: false,
      notifications: false,
      terms: false,
    });

    const handleChange = (key: keyof typeof formData, checked: boolean) => {
      setFormData((prev) => ({ ...prev, [key]: checked }));
    };

    return (
      <div className="w-80 space-y-4">
        <h3 className="font-medium text-lg">Registration Form</h3>
        <Checkbox
          checked={formData.terms}
          description="You must accept the terms to continue."
          label="I agree to the terms and conditions"
          onCheckedChange={(checked) => handleChange('terms', checked as boolean)}
        />
        <Checkbox
          checked={formData.newsletter}
          description="Receive updates about new features and releases."
          label="Subscribe to newsletter"
          onCheckedChange={(checked) => handleChange('newsletter', checked as boolean)}
        />
        <Checkbox
          checked={formData.notifications}
          description="Get notified about important updates."
          label="Enable push notifications"
          onCheckedChange={(checked) => handleChange('notifications', checked as boolean)}
        />
        <div className="pt-4">
          <pre className="rounded bg-muted p-2 text-sm">{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </div>
    );
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox checked={true} className="h-4 w-4" label="Default size checkbox" />
      <Checkbox checked={true} className="h-6 w-6" label="Large checkbox" />
      <Checkbox checked={true} className="h-3 w-3" label="Small checkbox" />
    </div>
  ),
};
