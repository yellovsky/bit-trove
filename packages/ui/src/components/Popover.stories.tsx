import type { Meta, StoryObj } from '@storybook/react';
import { Bell, Info, Mail, Settings, User } from 'lucide-react';
import { useState } from 'react';

import { Button } from './Button';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';
import popoverMdx from './Popover.mdx';

const meta: Meta<typeof Popover> = {
  argTypes: {},
  component: Popover,
  parameters: {
    docs: {
      page: popoverMdx,
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Popover',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-muted-foreground text-sm">Set the dimensions for the layer.</p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="width">Width</label>
              <input
                className="col-span-2 h-8 rounded-md border border-input bg-background px-3 text-sm"
                defaultValue="100%"
                id="width"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="maxWidth">Max. width</label>
              <input
                className="col-span-2 h-8 rounded-md border border-input bg-background px-3 text-sm"
                defaultValue="300px"
                id="maxWidth"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="height">Height</label>
              <input
                className="col-span-2 h-8 rounded-md border border-input bg-background px-3 text-sm"
                defaultValue="25px"
                id="height"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="maxHeight">Max. height</label>
              <input
                className="col-span-2 h-8 rounded-md border border-input bg-background px-3 text-sm"
                defaultValue="none"
                id="maxHeight"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button aria-label="Settings" size="icon" variant="outline">
          <Settings className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Settings</h4>
            <p className="text-muted-foreground text-sm">Configure your application settings.</p>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center space-x-2">
              <input className="rounded" id="notifications" type="checkbox" />
              <label className="text-sm" htmlFor="notifications">
                Enable notifications
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input className="rounded" id="dark-mode" type="checkbox" />
              <label className="text-sm" htmlFor="dark-mode">
                Dark mode
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input className="rounded" id="auto-save" type="checkbox" />
              <label className="text-sm" htmlFor="auto-save">
                Auto-save
              </label>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const UserProfile: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button aria-label="User profile" size="icon" variant="ghost">
          <User className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            <User className="size-6 text-primary-foreground" />
          </div>
          <div className="space-y-1">
            <h4 className="font-medium">John Doe</h4>
            <p className="text-muted-foreground text-sm">john.doe@example.com</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Button className="w-full justify-start" variant="ghost">
            <User className="mr-2 size-4" />
            Profile
          </Button>
          <Button className="w-full justify-start" variant="ghost">
            <Settings className="mr-2 size-4" />
            Settings
          </Button>
          <Button className="w-full justify-start" variant="ghost">
            <Mail className="mr-2 size-4" />
            Messages
          </Button>
          <div className="border-t pt-2">
            <Button className="w-full justify-start text-destructive" variant="ghost">
              Sign out
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const Notifications: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button aria-label="Notifications" className="relative" size="icon" variant="ghost">
          <Bell className="size-4" />
          <span className="-top-1 -right-1 absolute flex h-3 w-3 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs">
            3
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <div className="space-y-2">
          <h4 className="font-medium">Notifications</h4>
          <div className="space-y-2">
            <div className="flex items-start gap-3 rounded-md p-2 hover:bg-accent">
              <div className="mt-2 h-2 w-2 rounded-full bg-primary" />
              <div className="space-y-1">
                <p className="font-medium text-sm">New message received</p>
                <p className="text-muted-foreground text-xs">You have a new message from Sarah.</p>
                <p className="text-muted-foreground text-xs">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-md p-2 hover:bg-accent">
              <div className="mt-2 h-2 w-2 rounded-full bg-primary" />
              <div className="space-y-1">
                <p className="font-medium text-sm">Task completed</p>
                <p className="text-muted-foreground text-xs">Your task "Update documentation" is complete.</p>
                <p className="text-muted-foreground text-xs">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-md p-2 hover:bg-accent">
              <div className="mt-2 h-2 w-2 rounded-full bg-primary" />
              <div className="space-y-1">
                <p className="font-medium text-sm">System update</p>
                <p className="text-muted-foreground text-xs">System maintenance scheduled for tonight.</p>
                <p className="text-muted-foreground text-xs">3 hours ago</p>
              </div>
            </div>
          </div>
          <div className="border-t pt-2">
            <Button className="w-full text-sm" variant="ghost">
              View all notifications
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const InfoTooltip: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button aria-label="Information" size="icon" variant="ghost">
          <Info className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Help & Information</h4>
          <p className="text-muted-foreground text-sm">
            This feature allows you to manage your account settings and preferences. You can customize various aspects
            of your experience here.
          </p>
          <div className="flex gap-2">
            <Button size="sm">Learn More</Button>
            <Button size="sm" variant="outline">
              Contact Support
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button variant="outline">{open ? 'Close Popover' : 'Open Popover'}</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2">
            <h4 className="font-medium">Controlled Popover</h4>
            <p className="text-muted-foreground text-sm">This popover is controlled by React state.</p>
            <Button onClick={() => setOpen(false)} size="sm">
              Close
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

export const DifferentAlignments: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Start</Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-60">
          <div className="space-y-2">
            <h4 className="font-medium">Aligned to Start</h4>
            <p className="text-muted-foreground text-sm">This popover is aligned to the start of the trigger.</p>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Center</Button>
        </PopoverTrigger>
        <PopoverContent align="center" className="w-60">
          <div className="space-y-2">
            <h4 className="font-medium">Aligned to Center</h4>
            <p className="text-muted-foreground text-sm">This popover is aligned to the center of the trigger.</p>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">End</Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-60">
          <div className="space-y-2">
            <h4 className="font-medium">Aligned to End</h4>
            <p className="text-muted-foreground text-sm">This popover is aligned to the end of the trigger.</p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};
