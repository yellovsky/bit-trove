# Product Requirements Document: Reading Time Feature for Shards

## Document Information
- **Document ID**: PRD-001
- **Version**: 1.0
- **Date**: 2024-12-19
- **Status**: Draft
- **Owner**: Product Team
- **Stakeholders**: Engineering, UX, Content Team

## Executive Summary

This PRD outlines the implementation of a reading time calculation feature for shards in our personal blog platform. The feature will automatically calculate and display estimated reading times based on the text content of each shard, enhancing user experience by setting proper expectations for content consumption.

## 1. Background & Motivation

### 1.1 Problem Statement
Currently, users have no indication of how long it will take to read a shard before they start consuming the content. This lack of information can lead to:
- Poor user experience when users start reading content that's longer than expected
- Reduced engagement for users who prefer shorter content
- Inability to plan reading sessions effectively
- Missing opportunity to showcase content value through time investment

### 1.2 Business Value
- **Improved User Experience**: Users can make informed decisions about content consumption
- **Increased Engagement**: Better content discovery and time management
- **SEO Benefits**: Reading time can be included in meta descriptions and structured data
- **Content Analytics**: Better understanding of content performance based on reading time
- **Accessibility**: Helps users with time constraints or reading preferences

### 1.3 Success Metrics
- User engagement with reading time display
- Reduction in bounce rate for long-form content
- Improved content discovery and sharing
- Positive user feedback on content preview features

## 2. Feature Overview

### 2.1 Core Functionality
The reading time feature will:
1. Automatically calculate reading time for each shard based on text content
2. Store the calculated reading time in the database
3. Display reading time in the frontend UI
4. Expose reading time through the API for external consumption

### 2.2 Reading Time Calculation
- **Standard Rate**: 200 words per minute (industry standard for average adult reading)
- **Content Sources**:
  - Primary: `contentJSON` field (TipTap JSON content)
  - Secondary: `title` and `shortDescription` fields
- **Calculation Method**: Extract plain text from JSON content, count words, divide by reading rate
- **Rounding**: Round to nearest minute, minimum 1 minute

## 3. Technical Requirements

### 3.1 Database Schema Changes

#### 3.1.1 Shard Table Modification
Add a new field to the `shards` table:

```sql
ALTER TABLE shards ADD COLUMN reading_time INTEGER NOT NULL DEFAULT 1;
```

**Field Details:**
- **Name**: `reading_time`
- **Type**: `INTEGER`
- **Constraints**: `NOT NULL`, `DEFAULT 1`
- **Description**: Estimated reading time in minutes
- **Range**: 1-999 minutes (practical limits)

### 3.2 Backend Implementation

#### 3.2.1 Reading Time Service
Create a new service in the shards module:

**Location**: `apps/backend/src/modules/shards/application/services/reading-time.service.ts`

**Responsibilities:**
- Extract plain text from TipTap JSON content
- Calculate word count
- Apply reading time formula
- Handle edge cases (empty content, media-only content)

#### 3.2.2 Content Text Extraction
Implement text extraction from TipTap JSON content:

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

#### 3.2.3 Integration Points

**Create Shard Flow:**
1. User creates shard with content
2. Reading time service calculates time from `contentJSON`
3. Reading time stored in database during creation
4. Response includes calculated reading time

**Update Shard Flow:**
1. User updates shard content
2. Reading time service recalculates time
3. Reading time updated in database
4. Response includes updated reading time

**Publish/Unpublish Flow:**
- No reading time recalculation needed
- Existing reading time preserved

### 3.3 API Changes

#### 3.3.1 Response Schema Updates
Update shard response schemas to include reading time:

**API Models Package**: `packages/api-models/src/shard/`

**Updated Schemas:**
- `shardSchema` - Full shard response
- `shortShardSchema` - Short shard response (for lists)

**New Field:**
```typescript
readingTime: zod.number().int().min(1).max(999)
```

#### 3.3.2 API Endpoints Affected
All shard-related endpoints will automatically include reading time:

- `GET /api/v1/shard/:slugOrId` - Single shard
- `GET /api/v1/shards` - Shard list
- `GET /api/v1/my-shards` - User's shards
- `POST /api/v1/cms-shards` - Create shard
- `PATCH /api/v1/cms-shards/:id` - Update shard
- `PATCH /api/v1/cms-shards/publish/:id` - Publish shard
- `PATCH /api/v1/cms-shards/unpublish/:id` - Unpublish shard

### 3.4 Frontend Implementation

#### 3.4.1 Reading Time Display Component
Create a reusable reading time component:

**Location**: `apps/frontend/app/shared/ui/ReadingTime.tsx`

**Features:**
- Display reading time with appropriate icon
- Support for different display formats (compact, detailed)
- Internationalization support
- Accessibility features

#### 3.4.2 Integration Points

**Shard Detail Page**: `apps/frontend/app/pages/shard/page.tsx`
- Display reading time below title and date
- Position: Between creation date and tags

**Shard List Pages**: `apps/frontend/app/pages/shards/`
- Display reading time in shard cards/previews
- Compact format for list views

**CMS Pages**: `apps/frontend/app/pages/cms.shards/`
- Show reading time in shard management interface
- Real-time updates when content changes

## 4. User Stories

### 4.1 Content Consumers

**Story 1: Content Discovery**
- **As a** blog reader
- **I want to** see the estimated reading time for each shard
- **So that** I can choose content that fits my available time

**Story 2: Reading Planning**
- **As a** busy professional
- **I want to** know how long a shard will take to read
- **So that** I can plan my reading sessions effectively

**Story 3: Content Filtering**
- **As a** user with limited time
- **I want to** filter shards by reading time
- **So that** I can find content that matches my time constraints

### 4.2 Content Creators

**Story 4: Content Optimization**
- **As a** content creator
- **I want to** see the reading time for my shards
- **So that** I can optimize content length for my target audience

**Story 5: Content Planning**
- **As a** blogger
- **I want to** know the reading time of my drafts
- **So that** I can plan content series with consistent time commitments

### 4.3 System Administrators

**Story 6: Content Analytics**
- **As a** system administrator
- **I want to** track reading time statistics
- **So that** I can understand content consumption patterns

## 5. Technical Considerations

### 5.1 Performance Considerations

**Calculation Performance:**
- Reading time calculation should be fast (< 100ms for typical content)
- Implement efficient text extraction from JSON content
- Cache calculation results when possible

**Database Performance:**
- Reading time field indexed for efficient queries
- Consider composite indexes for filtering by reading time + other criteria

**API Performance:**
- Reading time included in existing queries (no additional API calls)
- Minimal impact on response times

### 5.2 Edge Cases & Error Handling

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

### 5.3 Internationalization

**Reading Time Display:**
- Support for different time formats (e.g., "5 min read", "5 minutes")
- Localized reading time labels
- Consider different reading speeds for different languages

**Content Language:**
- Reading time calculation works for all supported languages
- No language-specific adjustments to reading speed

### 5.4 Accessibility

**Screen Reader Support:**
- Proper ARIA labels for reading time
- Semantic HTML structure
- Clear reading time announcements

**Visual Design:**
- High contrast reading time display
- Consistent iconography
- Responsive design for all screen sizes

## 6. Implementation Plan

### 6.1 Phase 1: Backend Foundation
1. Database schema migration
2. Reading time service implementation
3. Text extraction from TipTap JSON
4. Integration with create/update flows
5. API schema updates

### 6.2 Phase 2: Frontend Integration
1. Reading time component development
2. Integration with shard detail page
3. Integration with shard list pages
4. CMS interface updates

### 6.3 Phase 3: Enhancement & Polish
1. Performance optimization
2. Edge case handling
3. Accessibility improvements
4. Testing and bug fixes

### 6.4 Phase 4: Analytics & Monitoring
1. Reading time analytics
2. Performance monitoring
3. User feedback collection
4. Documentation updates

## 7. Testing Strategy

### 7.1 Unit Testing
- Reading time calculation accuracy
- Text extraction from various content types
- Edge case handling
- Performance benchmarks

### 7.2 Integration Testing
- API endpoint responses
- Database operations
- Frontend component rendering
- End-to-end user flows

### 7.3 User Acceptance Testing
- Reading time display accuracy
- User interface usability
- Performance under load
- Accessibility compliance

## 8. Success Criteria

### 8.1 Functional Requirements
- [ ] Reading time calculated correctly for all content types
- [ ] Reading time displayed consistently across all UI surfaces
- [ ] API responses include reading time field
- [ ] Database stores reading time accurately
- [ ] Performance impact < 10% on existing operations

### 8.2 User Experience Requirements
- [ ] Reading time helps users make content decisions
- [ ] No negative impact on page load times
- [ ] Reading time display is accessible
- [ ] Internationalization support works correctly

### 8.3 Technical Requirements
- [ ] Code follows existing architectural patterns
- [ ] Comprehensive test coverage (>90%)
- [ ] Documentation is complete and accurate
- [ ] Performance benchmarks met

## 9. Future Enhancements

### 9.1 Advanced Features
- **Personalized Reading Speed**: User-specific reading time calculations
- **Content Type Adjustments**: Different reading speeds for different content types
- **Reading Progress**: Track actual reading time vs. estimated time
- **Content Recommendations**: Suggest content based on available time

### 9.2 Analytics Features
- **Reading Time Distribution**: Analyze content length patterns
- **Engagement Correlation**: Study relationship between reading time and engagement
- **A/B Testing**: Test different reading time display formats

### 9.3 Integration Opportunities
- **Search Filters**: Filter content by reading time
- **Email Digests**: Include reading time in email summaries
- **Social Sharing**: Include reading time in social media previews
- **RSS Feeds**: Include reading time in feed items

## 10. Risk Assessment

### 10.1 Technical Risks
- **Performance Impact**: Reading time calculation could slow down content operations
- **Content Parsing**: Complex TipTap JSON might be difficult to parse accurately
- **Database Migration**: Adding new field to existing table requires careful planning

### 10.2 Mitigation Strategies
- **Performance**: Implement efficient text extraction and caching
- **Parsing**: Comprehensive testing with various content types
- **Migration**: Thorough testing in staging environment

### 10.3 User Experience Risks
- **Inaccurate Estimates**: Reading time might not match actual reading time
- **UI Clutter**: Reading time display might make interfaces too busy
- **User Confusion**: Users might not understand reading time significance

### 10.4 Mitigation Strategies
- **Accuracy**: Use industry-standard reading speed and thorough testing
- **UI Design**: Clean, minimal reading time display
- **User Education**: Clear labeling and help text

## 11. Implementation Status

### 11.1 Current Implementation Progress

**Last Updated**: 2024-12-19
**Overall Status**: ~90% Complete (MVP Ready)

#### ✅ Completed Components

**Database Layer:**
- **Prisma Schema**: `apps/backend/prisma/schema/shard.prisma` - `readingTime` field added with proper constraints

**Backend Domain Layer:**
- **Domain Model**: `apps/backend/src/modules/shards/domain/models/shard.model.ts` - `readingTime` field integrated
- **Repository Interface**: No changes needed - interface supports reading time through params

**Backend Infrastructure Layer:**
- **Repository Implementation**: `apps/backend/src/modules/shards/infrastructure/repositories/shards.repository.ts` - Reading time calculation integrated in create/update flows
- **Repository Types**: `apps/backend/src/modules/shards/infrastructure/repositories/shards.repository.types.ts` - `readingTime` field included in database selects

**Backend Application Layer:**
- **Reading Time Service**: `apps/backend/src/shared/utils/reading-time.ts` - Complete implementation with TipTap JSON text extraction
- **Unit Tests**: `apps/backend/src/shared/utils/reading-time.spec.ts` - Comprehensive test suite (9 test cases)

**Backend Presentation Layer:**
- **API DTOs**:
  - `apps/backend/src/modules/shards/presentation/dtos/shard.dto.ts` - `readingTime` field with API documentation
  - `apps/backend/src/modules/shards/presentation/dtos/short-shard.dto.ts` - `readingTime` field with API documentation

**API Models Package:**
- **API Schemas**: `packages/api-models/src/shard/shard.ts` - `readingTime` field added to both schemas

**Frontend Shared Layer:**
- **UI Components**: `apps/frontend/app/shared/ui/LabeledIcon.tsx` - `ReadingTimeLabelIcon` component with i18n support
- **Translations**:
  - `apps/frontend/app/app/localization/common.en.server.ts` - English translation
  - `apps/frontend/app/app/localization/common.ru.server.ts` - Russian translation

**Frontend Pages Layer:**
- **Shard Detail Page**: `apps/frontend/app/pages/shard/page.tsx` - Reading time displayed with `ReadingTimeLabelIcon`
- **Shard List Page**: `apps/frontend/app/pages/shards/page.tsx` - Uses `ShardHorizontalCard` with reading time

**Frontend Features Layer:**
- **Shard Card Component**: `apps/frontend/app/features/shards/ui/ShardHorizontalCard.tsx` - Reading time displayed with clock icon

#### ⚠️ Partially Completed Components

**CMS Interface:**
- **File**: `apps/frontend/app/pages/cms.shards/index.tsx`
- **Status**: CMS table doesn't display reading time column
- **Action Needed**: Add reading time column to CMS shards table

#### ❌ Missing Components

**Database Migration:**
- **Status**: No database migration file found
- **Action Needed**: Create and run database migration to add `readingTime` column to existing shards table

### 11.2 Remaining Tasks for MVP

#### High Priority (Required for MVP)
1. **Database Migration** - Create migration to add `readingTime` column to existing shards table
2. **CMS Reading Time Display** - Add reading time column to CMS shards table

#### Low Priority (Future Enhancements)
1. **Reading Time Filtering** - Add ability to filter shards by reading time in CMS
2. **Reading Time Sorting** - Add ability to sort by reading time in CMS
3. **Performance Optimization** - Consider caching reading time calculations for large content

### 11.3 Code Quality Assessment

**Architecture Compliance:**
- ✅ Follows Feature-Sliced Design principles
- ✅ Proper separation of concerns across layers
- ✅ Domain-driven design patterns maintained

**Code Quality:**
- ✅ Comprehensive unit tests (9 test cases)
- ✅ Proper TypeScript types throughout
- ✅ Internationalization support implemented
- ✅ Accessibility considerations included
- ✅ Performance considerations (capping at 999 minutes)

**Testing Coverage:**
- ✅ Unit tests for reading time calculation
- ✅ Edge case handling tested
- ✅ Performance benchmarks included

### 11.4 Next Steps

1. **Immediate Actions:**
   - Create database migration for `readingTime` column
   - Add reading time column to CMS shards table
   - Test with real data to ensure accuracy

2. **Post-MVP Enhancements:**
   - Add reading time filtering and sorting in CMS
   - Implement reading time analytics
   - Add performance monitoring for reading time calculations

## 12. Conclusion

The reading time feature will significantly enhance the user experience of our blog platform by providing valuable information about content length. The implementation follows our existing architectural patterns and integrates seamlessly with current workflows. The feature is designed to be scalable, maintainable, and extensible for future enhancements.

This PRD provides a comprehensive roadmap for implementing reading time functionality while maintaining high quality standards and user experience excellence.