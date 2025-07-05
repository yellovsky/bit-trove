# Feature: Reading Time Calculation for Shards

## Introduction/Overview

This feature automatically calculates and displays estimated reading times for shards based on their text content, improving user experience and engagement.

**Problem**: Users lack information about how long it will take to read a shard, leading to poor planning and reduced engagement.

**Goal**: Provide accurate reading time estimates for all shards, display them in the UI, and support filtering and analytics based on reading time.

## Goals

1. **Reading Time Calculation**: Automatically calculate reading time for all shards using a standard reading speed
2. **Frontend Display**: Show reading time in all relevant UI components (cards, detail pages, search results)
3. **Filtering**: Allow users to filter shards by reading time
4. **Analytics**: Track and analyze reading time distribution and engagement
5. **Accessibility**: Ensure reading time is accessible to all users

## User Stories

### Content Consumers
- **US-001**: As a reader, I want to see the estimated reading time for each shard so I can choose content that fits my available time
- **US-002**: As a busy professional, I want to know how long a shard will take to read so I can plan my reading sessions
- **US-003**: As a user with limited time, I want to filter shards by reading time so I can find content that matches my time constraints

### Content Creators
- **US-004**: As a content creator, I want to see the reading time for my shards so I can optimize content length
- **US-005**: As a blogger, I want to know the reading time of my drafts so I can plan content series

### System Administrators
- **US-006**: As an admin, I want to track reading time statistics so I can understand content consumption patterns

## Functional Requirements

1. **Reading Time Calculation**: Use 200 words per minute as the standard rate; extract text from TipTap JSON, title, and description
2. **Display**: Show reading time in minutes, rounded to the nearest minute (min 1, max 999)
3. **Filtering**: Support filtering by reading time in search and list views
4. **Analytics**: Provide reading time distribution and engagement analytics
5. **Accessibility**: Ensure reading time is accessible to screen readers

## Non-Goals (Out of Scope)

- Personalized reading speed per user
- Advanced content type detection for reading speed
- Real-time collaborative editing
- Social media integration

## Design Considerations

- **Frontend**: Use Shadcn UI, Radix UI, and Tailwind for components and styling
- **Backend**: Use NestJS and Prisma for calculation and storage
- **Database**: Store reading time as an integer field (1-999 minutes)
- **API**: Expose reading time in all relevant endpoints
- **Caching**: Use Redis for performance if needed

## Success Metrics

- **Accuracy**: 95%+ of reading time estimates are within 1 minute of actual reading time
- **Performance**: Reading time calculation < 100ms per shard
- **Adoption**: 90%+ of shards display reading time
- **User Satisfaction**: 4.5+ rating on content discoverability

## Open Questions

1. Should we allow users to set their own reading speed?
2. Should we support reading time for other content types (e.g., blog posts, comments)?
3. Should we display reading time in email digests and notifications?