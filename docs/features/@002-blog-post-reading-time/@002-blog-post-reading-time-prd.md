# Feature: Blog Post Reading Time Display

## Introduction/Overview

This feature displays estimated reading times for blog posts on both blog post cards and individual blog post pages, helping users make informed decisions about content consumption and improving SEO.

**Problem**: Users don't know how long blog posts will take to read, leading to poor time management and reduced engagement.

**Goal**: Display reading time consistently across blog post interfaces using the same calculation method and UI components as the existing shard reading time feature.

## Goals

1. **Consistent Reading Time Display**: Show reading time on blog post cards and individual blog post pages
2. **Reuse Existing Infrastructure**: Leverage the existing reading time calculation service and UI components from shards
3. **SEO Enhancement**: Improve search engine optimization with reading time metadata
4. **User Experience**: Help users choose content that fits their available time
5. **Consistency**: Maintain visual and functional consistency with the existing shard reading time feature

## User Stories

### Content Consumers
- **US-001**: As a blog reader, I want to see the reading time so I can choose posts that fit my available time

## Functional Requirements

1. **Reading Time Display on Cards**: The system must display reading time on blog post cards using the same UI component as shard cards
2. **Reading Time Display on Pages**: The system must display reading time on individual blog post pages using ReadingTimeLabelIcon component
3. **Consistent Calculation**: The system must use the same reading time calculation method as shards (200 words per minute)
4. **Database Integration**: The system must read the existing reading_time field from the blog post database
5. **API Integration**: The system must use the existing readingTime field in blog post API responses
6. **Minimum Display**: The system must display a minimum of 1 minute reading time for all posts
7. **Maximum Display**: The system must handle posts up to 30 minutes without special formatting
8. **Empty Content Handling**: The system must display 1 minute reading time for posts with empty content

## Non-Goals (Out of Scope)

- Personalized reading speed per user
- Different calculation methods for different content types
- Reading time for other content types (comments, etc.)
- Manual reading time override by authors
- Reading time analytics or statistics
- Reading time in email digests or notifications

## Design Considerations

- **Frontend**: Use existing UI components from shard reading time feature
- **Card Display**: Use the same card component pattern as ShardHorizontalCard
- **Page Display**: Use ReadingTimeLabelIcon component like in shard page
- **Styling**: Follow existing design patterns and Tailwind classes
- **Icons**: Use ClockIcon from Lucide React for consistency

## Technical Considerations

- **Backend**: Reading time is already calculated and stored in the database
- **API**: Reading time is already included in blog post API responses
- **Calculation**: Reuse existing reading time calculation service from shards
- **Database**: Use existing reading_time field in blog_posts table
- **Frontend**: Reuse existing UI components and translation keys

## Success Metrics

- **Display Coverage**: 100% of blog post cards and pages show reading time
- **User Engagement**: Measurable increase in user time spent on blog post pages
- **SEO Impact**: Improved search engine visibility with reading time metadata
- **Consistency**: Visual and functional consistency with shard reading time feature
- **Performance**: No negative impact on page load times or API response times

## Open Questions

1. Should reading time be displayed in blog post search results?
2. Should reading time be included in blog post RSS feeds?
3. Should reading time be displayed in blog post previews in the CMS?
4. Should we add reading time to blog post meta tags for social sharing?