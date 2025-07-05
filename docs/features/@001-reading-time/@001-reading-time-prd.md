# Feature: Reading Time Calculation for Shards

## Overview
This feature automatically calculates and displays estimated reading times for shards based on their text content. It enhances user experience by setting proper expectations for content consumption and helps users make informed decisions about content engagement.

## Problem Statement
Currently, users have no indication of how long it will take to read a shard before they start consuming the content. This lack of information leads to:
- Poor user experience when users start reading content that's longer than expected
- Reduced engagement for users who prefer shorter content
- Inability to plan reading sessions effectively
- Missing opportunity to showcase content value through time investment

## Goals
- Provide users with accurate reading time estimates
- Improve content discovery and user engagement
- Enable better time management for content consumption
- Enhance SEO with reading time metadata
- Support accessibility for users with time constraints

## User Stories

### Content Consumers

**US-001: Content Discovery**
- **As a** blog reader
- **I want to** see the estimated reading time for each shard
- **So that** I can choose content that fits my available time
- **Acceptance Criteria:**
  - Reading time displayed prominently on shard cards
  - Reading time shown on shard detail pages
  - Reading time included in search results
  - Reading time updates when content changes

**US-002: Reading Planning**
- **As a** busy professional
- **I want to** know how long a shard will take to read
- **So that** I can plan my reading sessions effectively
- **Acceptance Criteria:**
  - Reading time displayed in minutes
  - Clear, easy-to-understand format
  - Consistent display across all interfaces
  - Accessible to screen readers

**US-003: Content Filtering**
- **As a** user with limited time
- **I want to** filter shards by reading time
- **So that** I can find content that matches my time constraints
- **Acceptance Criteria:**
  - Filter options for reading time ranges
  - Quick filters for short/medium/long content
  - Search results include reading time
  - Filter state preserved in URL

### Content Creators

**US-004: Content Optimization**
- **As a** content creator
- **I want to** see the reading time for my shards
- **So that** I can optimize content length for my target audience
- **Acceptance Criteria:**
  - Reading time displayed in CMS interface
  - Real-time reading time updates during editing
  - Reading time shown in draft previews
  - Historical reading time tracking

**US-005: Content Planning**
- **As a** blogger
- **I want to** know the reading time of my drafts
- **So that** I can plan content series with consistent time commitments
- **Acceptance Criteria:**
  - Reading time for draft content
  - Reading time trends and analytics
  - Content planning tools with reading time
  - Series planning with time estimates

### System Administrators

**US-006: Content Analytics**
- **As a** system administrator
- **I want to** track reading time statistics
- **So that** I can understand content consumption patterns
- **Acceptance Criteria:**
  - Reading time distribution analytics
  - Popular reading time ranges
  - Content performance by reading time
  - User engagement correlation

## Functional Requirements

### Reading Time Calculation
- **Standard Rate**: 200 words per minute (industry standard)
- **Content Sources**:
  - Primary: `contentJSON` field (TipTap JSON content)
  - Secondary: `title` and `shortDescription` fields
- **Calculation Method**: Extract plain text, count words, divide by reading rate
- **Rounding**: Round to nearest minute, minimum 1 minute
- **Maximum**: Cap at 999 minutes for practical limits

### Content Text Extraction
**Supported Content Types:**
- Paragraphs (`paragraph` nodes)
- Headings (`heading` nodes)
- Lists (`bulletList`, `orderedList`, `listItem` nodes)
- Blockquotes (`blockquote` nodes)
- Code blocks (`codeBlock` nodes)

**Excluded Content Types:**
- Images (`image` nodes)
- Videos (`video` nodes)
- Embeds (`embed` nodes)
- Interactive elements

### Database Schema
The `reading_time` field is already present in the database schema with the following details:

**Field Details:**
- **Name**: `reading_time`
- **Type**: `INTEGER`
- **Constraints**: `NOT NULL`, `DEFAULT 1`
- **Description**: Estimated reading time in minutes
- **Range**: 1-999 minutes

### API Integration
**Updated Schemas:**
- `shardSchema` - Full shard response
- `shortShardSchema` - Short shard response (for lists)

**New Field:**
```typescript
readingTime: zod.number().int().min(1).max(999)
```

**API Endpoints Affected:**
- `GET /api/v1/shard/:slugOrId` - Single shard
- `GET /api/v1/shards` - Shard list
- `GET /api/v1/my-shards` - User's shards
- `POST /api/v1/cms-shards` - Create shard
- `PATCH /api/v1/cms-shards/:id` - Update shard
- `PATCH /api/v1/cms-shards/publish/:id` - Publish shard
- `PATCH /api/v1/cms-shards/unpublish/:id` - Unpublish shard

### Frontend Display
**Reading Time Component:**
- Display reading time with appropriate icon
- Support for different display formats (compact, detailed)
- Internationalization support
- Accessibility features

**Integration Points:**
- Shard detail page: Display below title and date
- Shard list pages: Display in shard cards/previews

## Technical Design

### Backend Implementation
**Reading Time Service**: `apps/backend/src/shared/utils/reading-time.ts`
- Extract plain text from TipTap JSON content
- Calculate word count efficiently
- Apply reading time formula
- Handle edge cases (empty content, media-only content)

**Integration Points:**
- Create shard flow: Calculate during creation
- Update shard flow: Recalculate on content changes
- Publish/unpublish flow: No recalculation needed

### Frontend Implementation
**UI Components:**
- `ReadingTimeLabelIcon` component with i18n support
- Clock icon with reading time display
- Responsive design for all screen sizes
- Accessibility support for screen readers

**Display Formats:**
- Compact: "5 min read"
- Detailed: "5 minutes to read"
- Internationalized labels

### Performance Considerations
**Calculation Performance:**
- Reading time calculation < 100ms for typical content
- Efficient text extraction from JSON content
- Cache calculation results when possible

**Database Performance:**
- Reading time field indexed for efficient queries
- Composite indexes for filtering by reading time + other criteria

**API Performance:**
- Reading time included in existing queries (no additional API calls)
- Minimal impact on response times

## Non-Functional Requirements

### Performance Requirements
- Reading time calculation < 100ms for typical content
- No negative impact on page load times
- Performance impact < 10% on existing operations
- Efficient database queries with proper indexing

### Quality Requirements
- Reading time calculated correctly for all content types
- Reading time displayed consistently across all UI surfaces
- Comprehensive test coverage (>90%)
- Proper error handling for edge cases

### Accessibility Requirements
- Screen reader support with proper ARIA labels
- Semantic HTML structure
- High contrast reading time display
- Clear reading time announcements

### Internationalization Requirements
- Support for different time formats
- Localized reading time labels
- Reading time calculation works for all supported languages
- No language-specific adjustments to reading speed

## Tests

### Unit Tests
- Reading time calculation accuracy
- Text extraction from various content types
- Edge case handling (empty content, media-only content)
- Performance benchmarks
- Internationalization support

### Integration Tests
- API endpoint responses include reading time
- Database operations with reading time field
- Frontend component rendering
- End-to-end user flows

### User Acceptance Tests
- Reading time display accuracy
- User interface usability
- Performance under load
- Accessibility compliance
- Internationalization support

## Notes

### Edge Cases & Error Handling
**Empty Content:**
- Minimum reading time of 1 minute
- Handle null/empty `contentJSON` gracefully

**Media-Only Content:**
- Content with only images/videos: 1 minute minimum
- Content with minimal text: 1 minute minimum

**Very Long Content:**
- Cap reading time at 999 minutes (practical limit)
- Log warnings for extremely long content

**Invalid Content:**
- Graceful handling of malformed JSON content
- Fallback to title + description calculation

### Future Enhancements
**Advanced Features:**
- Personalized reading speed based on user preferences
- Content type adjustments (different speeds for different content types)
- Reading progress tracking
- Content recommendations based on available time

**Analytics Features:**
- Reading time distribution analysis
- Engagement correlation studies
- A/B testing for different reading time display formats

**Integration Opportunities:**
- Search filters by reading time
- Email digests with reading time
- Social sharing with reading time
- RSS feeds with reading time information

### Implementation Phases
1. **Phase 1: Backend Foundation**
   - Reading time service implementation
   - Text extraction from TipTap JSON
   - Integration with create/update flows
   - API schema updates

2. **Phase 2: Frontend Integration**
   - Reading time component development
   - Integration with shard detail page
   - Integration with shard list pages

3. **Phase 3: Enhancement & Polish**
   - Performance optimization
   - Edge case handling
   - Accessibility improvements
   - Testing and bug fixes

4. **Phase 4: Analytics & Monitoring**
   - Reading time analytics
   - Performance monitoring
   - User feedback collection
   - Documentation updates