import type { Meta, StoryObj } from '@storybook/react';
import { ClockIcon } from 'lucide-react';

import * as ListCardPrimitive from './ListCard';

const meta = {
  title: 'UI/ListCard',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const BlogPost: Story = {
  render: () => (
    <ListCardPrimitive.Root asChild>
      <a href="/">
        <ListCardPrimitive.ListCardIcon generateOn={'advanced-typescript-patterns-react.ts'} />
        <ListCardPrimitive.CardContent>
          <ListCardPrimitive.CardHeader>
            <ListCardPrimitive.CardTitle>
              Advanced TypeScript Patterns for React Applications
            </ListCardPrimitive.CardTitle>
          </ListCardPrimitive.CardHeader>
          <ListCardPrimitive.ListCardDescription>
            Explore advanced TypeScript patterns including conditional types, mapped types, and template literal types
          </ListCardPrimitive.ListCardDescription>
          <ListCardPrimitive.ListCardFooter>
            <ListCardPrimitive.ListCardAuthor>Sarah Chen</ListCardPrimitive.ListCardAuthor>
            <ListCardPrimitive.ListCardDate>7 months ago</ListCardPrimitive.ListCardDate>
            <ListCardPrimitive.ListCardTextWithIcon icon={<ClockIcon size={14} strokeWidth={1.5} />}>
              5 min read
            </ListCardPrimitive.ListCardTextWithIcon>
          </ListCardPrimitive.ListCardFooter>
        </ListCardPrimitive.CardContent>

        <ListCardPrimitive.CardAside>
          <ListCardPrimitive.ListCardTagsList>
            {['#typescript', '#react'].map((tag) => (
              <ListCardPrimitive.ListCardTag key={tag}>{tag}</ListCardPrimitive.ListCardTag>
            ))}
          </ListCardPrimitive.ListCardTagsList>
        </ListCardPrimitive.CardAside>
        <ListCardPrimitive.CardArrow />
      </a>
    </ListCardPrimitive.Root>
  ),
};

export const Shard: Story = {
  render: () => (
    <ListCardPrimitive.Root asChild>
      <a href="/">
        <ListCardPrimitive.ListCardIcon generateOn={'python-list-comprehension-performance.py'} />
        <ListCardPrimitive.CardContent>
          <ListCardPrimitive.CardHeader>
            <ListCardPrimitive.CardTitle>Python List Comprehension Performance</ListCardPrimitive.CardTitle>
            <ListCardPrimitive.ListCardHeaderBadge color="blue">Shard</ListCardPrimitive.ListCardHeaderBadge>
          </ListCardPrimitive.CardHeader>
          <ListCardPrimitive.ListCardDescription>
            List comprehensions are not just more readable - they're also faster than traditional loops. Here's why and
            when to use them.
          </ListCardPrimitive.ListCardDescription>
          <ListCardPrimitive.ListCardFooter>
            <ListCardPrimitive.ListCardAuthor>John Doe</ListCardPrimitive.ListCardAuthor>
            <ListCardPrimitive.ListCardDate>1 year ago</ListCardPrimitive.ListCardDate>
            <ListCardPrimitive.ListCardTextWithIcon icon={<ClockIcon size={14} strokeWidth={1.5} />}>
              5 min read
            </ListCardPrimitive.ListCardTextWithIcon>
          </ListCardPrimitive.ListCardFooter>
        </ListCardPrimitive.CardContent>

        <ListCardPrimitive.CardAside>
          <ListCardPrimitive.ListCardTagsList>
            {['#python', '#performance'].map((tag) => (
              <ListCardPrimitive.ListCardTag key={tag}>{tag}</ListCardPrimitive.ListCardTag>
            ))}
          </ListCardPrimitive.ListCardTagsList>
        </ListCardPrimitive.CardAside>
        <ListCardPrimitive.CardArrow />
      </a>
    </ListCardPrimitive.Root>
  ),
};

export const Series: Story = {
  render: () => (
    <ListCardPrimitive.Root asChild>
      <a href="/">
        <ListCardPrimitive.ListCardIcon generateOn={'typescript-mastery/'} />
        <ListCardPrimitive.CardContent>
          <ListCardPrimitive.CardHeader>
            <ListCardPrimitive.CardTitle>TypeScript Mastery</ListCardPrimitive.CardTitle>
            <ListCardPrimitive.ListCardHeaderBadge color="yellow">Series</ListCardPrimitive.ListCardHeaderBadge>
          </ListCardPrimitive.CardHeader>
          <ListCardPrimitive.ListCardDescription>
            A comprehensive series covering TypeScript from basics to advanced patterns. Learn to leverage TypeScript's
            type system for better code quality and developer experience.
          </ListCardPrimitive.ListCardDescription>
          <ListCardPrimitive.ListCardFooter>
            <ListCardPrimitive.ListCardAuthor>Sarah Chen</ListCardPrimitive.ListCardAuthor>
            <ListCardPrimitive.ListCardDate>7 months ago</ListCardPrimitive.ListCardDate>
            <ListCardPrimitive.ListCardTextWithIcon icon={<ClockIcon size={14} strokeWidth={1.5} />}>
              12 min read
            </ListCardPrimitive.ListCardTextWithIcon>
          </ListCardPrimitive.ListCardFooter>
        </ListCardPrimitive.CardContent>

        <ListCardPrimitive.CardAside>
          <ListCardPrimitive.CardSeriesDetail className="w-16" progressPercentage={60} />
        </ListCardPrimitive.CardAside>
        <ListCardPrimitive.CardArrow />
      </a>
    </ListCardPrimitive.Root>
  ),
};
