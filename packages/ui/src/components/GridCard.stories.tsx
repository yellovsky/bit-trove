import type { Meta, StoryObj } from '@storybook/react';
import { ClockIcon } from 'lucide-react';

import * as GridCardPrimitive from './GridCard';

const meta = {
  title: 'UI/GridCard',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const BlogPost: Story = {
  render: () => (
    <GridCardPrimitive.Root asChild>
      <a href="/">
        <GridCardPrimitive.CardHeader>
          <GridCardPrimitive.CardHeaderContent>
            <GridCardPrimitive.CardIcon generateOn={'advanced-typescript-patterns-react.ts'} />
            <GridCardPrimitive.CardHeaderText>
              {'advanced-typescript-patterns-react.ts'}
            </GridCardPrimitive.CardHeaderText>
          </GridCardPrimitive.CardHeaderContent>
          <GridCardPrimitive.CardHeaderBullet generateOn={'advanced-typescript-patterns-react.ts'} />
        </GridCardPrimitive.CardHeader>

        <GridCardPrimitive.CardContent>
          <GridCardPrimitive.CardSeriesInfo progress={3} title="TypeScript Mastery" total={5} />
          <GridCardPrimitive.CardTitle>Advanced TypeScript Patterns for React Applications</GridCardPrimitive.CardTitle>
          <GridCardPrimitive.CardDescription>
            Explore advanced TypeScript patterns including conditional types, mapped types, and template literal types
            to build more robust React applications with better type safety.
          </GridCardPrimitive.CardDescription>

          <GridCardPrimitive.CardTagsList>
            {['#typescript', '#react', '#patterns'].map((tag) => (
              <GridCardPrimitive.CardTag key={tag}>{tag}</GridCardPrimitive.CardTag>
            ))}
            <GridCardPrimitive.CardMoreTags>+1 more</GridCardPrimitive.CardMoreTags>
          </GridCardPrimitive.CardTagsList>

          <GridCardPrimitive.CardFooter>
            <GridCardPrimitive.CardFooterGroup>
              <GridCardPrimitive.CardAuthor>Sarah Chen</GridCardPrimitive.CardAuthor>
              <GridCardPrimitive.CardDate>7 months ago</GridCardPrimitive.CardDate>
            </GridCardPrimitive.CardFooterGroup>
            <GridCardPrimitive.CardTextWithIcon icon={<ClockIcon size={14} strokeWidth={1.5} />}>
              12 min read
            </GridCardPrimitive.CardTextWithIcon>
          </GridCardPrimitive.CardFooter>
        </GridCardPrimitive.CardContent>
      </a>
    </GridCardPrimitive.Root>
  ),
};

export const Shard: Story = {
  render: () => (
    <GridCardPrimitive.Root asChild>
      <a href="/">
        <GridCardPrimitive.CardHeader>
          <GridCardPrimitive.CardHeaderContent>
            <GridCardPrimitive.CardIcon generateOn={'python-list-comprehension-performance.py'} />
            <GridCardPrimitive.CardHeaderText>
              {'python-list-comprehension-performance.py'}
            </GridCardPrimitive.CardHeaderText>
            <GridCardPrimitive.CardHeaderBadge color="blue">Shard</GridCardPrimitive.CardHeaderBadge>
          </GridCardPrimitive.CardHeaderContent>
          <GridCardPrimitive.CardHeaderBullet generateOn={'python-list-comprehension-performance.py'} />
        </GridCardPrimitive.CardHeader>

        <GridCardPrimitive.CardContent>
          <GridCardPrimitive.CardSeriesInfo progress={3} title="Python Mastery" total={5} />
          <GridCardPrimitive.CardTitle>Python List Comprehension Performance</GridCardPrimitive.CardTitle>
          <GridCardPrimitive.CardDescription>
            List comprehensions are not just more readable - they're also faster than traditional loops. Here's why and
            when to use them.
          </GridCardPrimitive.CardDescription>

          <GridCardPrimitive.CardTagsList>
            {['#python', '#performance', '#optimization'].map((tag) => (
              <GridCardPrimitive.CardTag key={tag}>{tag}</GridCardPrimitive.CardTag>
            ))}
            <GridCardPrimitive.CardMoreTags>+1 more</GridCardPrimitive.CardMoreTags>
          </GridCardPrimitive.CardTagsList>

          <GridCardPrimitive.CardFooter>
            <GridCardPrimitive.CardFooterGroup>
              <GridCardPrimitive.CardAuthor>John Doe</GridCardPrimitive.CardAuthor>
              <GridCardPrimitive.CardDate>1 year ago</GridCardPrimitive.CardDate>
            </GridCardPrimitive.CardFooterGroup>
            <GridCardPrimitive.CardTextWithIcon icon={<ClockIcon size={14} strokeWidth={1.5} />}>
              5 min read
            </GridCardPrimitive.CardTextWithIcon>
          </GridCardPrimitive.CardFooter>
        </GridCardPrimitive.CardContent>
      </a>
    </GridCardPrimitive.Root>
  ),
};

export const Series: Story = {
  render: () => (
    <GridCardPrimitive.Root asChild>
      <a href="/">
        <GridCardPrimitive.CardHeader>
          <GridCardPrimitive.CardHeaderContent>
            <GridCardPrimitive.CardIcon generateOn={'typescript-mastery/'} />
            <GridCardPrimitive.CardHeaderText>{'typescript-mastery/'}</GridCardPrimitive.CardHeaderText>
            <GridCardPrimitive.CardHeaderBadge color="yellow">Series</GridCardPrimitive.CardHeaderBadge>
          </GridCardPrimitive.CardHeaderContent>
          <GridCardPrimitive.CardSeriesTotal total={8} />
        </GridCardPrimitive.CardHeader>

        <GridCardPrimitive.CardContent>
          <GridCardPrimitive.CardSeriesInfo progress={3} title="TypeScript Mastery" total={5} />
          <GridCardPrimitive.CardTitle>TypeScript Mastery</GridCardPrimitive.CardTitle>
          <GridCardPrimitive.CardDescription>
            A comprehensive series covering TypeScript from basics to advanced patterns. Learn to leverage TypeScript's
            type system for better code quality and developer experience.
          </GridCardPrimitive.CardDescription>

          <GridCardPrimitive.CardSeriesDetail
            progress={3}
            progressText="Progress"
            readTime={12}
            readTimeText="Read Time"
            total={5}
            totalText="Posts"
          />

          <GridCardPrimitive.CardTagsList>
            {['#typescript', '#series', '#tutorial'].map((tag) => (
              <GridCardPrimitive.CardTag key={tag}>{tag}</GridCardPrimitive.CardTag>
            ))}
            <GridCardPrimitive.CardMoreTags>+1 more</GridCardPrimitive.CardMoreTags>
          </GridCardPrimitive.CardTagsList>

          <GridCardPrimitive.CardFooter>
            <GridCardPrimitive.CardFooterGroup>
              <GridCardPrimitive.CardAuthor>Sarah Chen</GridCardPrimitive.CardAuthor>
              <GridCardPrimitive.CardDate>7 months ago</GridCardPrimitive.CardDate>
            </GridCardPrimitive.CardFooterGroup>
            <GridCardPrimitive.CardTextWithIcon icon={<ClockIcon size={14} strokeWidth={1.5} />}>
              5 min read
            </GridCardPrimitive.CardTextWithIcon>
          </GridCardPrimitive.CardFooter>
        </GridCardPrimitive.CardContent>
      </a>
    </GridCardPrimitive.Root>
  ),
};
