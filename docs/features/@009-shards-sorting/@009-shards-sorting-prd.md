# Product Requirements Document: Shards Page Sorting Feature

## Introduction/Overview

This feature adds sorting functionality to the shards listing page, allowing users to sort shards by date (newest/oldest first) and title (A-Z/Z-A). The sorting state is reflected in the URL for shareable links and browser navigation. The implementation includes FSD (Feature Sliced Design) refactoring to improve code organization and maintainability.

**Problem Statement:** Users currently cannot organize the shards list according to their preferences, making it difficult to find specific content or browse in their preferred order.

**Goal:** Provide intuitive sorting capabilities that enhance user experience while maintaining clean, maintainable code architecture.

## Goals

1. **User Experience Enhancement**
   - Enable users to sort shards by date (newest/oldest) and title (alphabetical)
   - Provide immediate visual feedback when sorting changes
   - Maintain sort preference in URL for shareable links

2. **Technical Excellence**
   - Implement server-side sorting for optimal performance
   - Add optimistic UI updates for responsive feel
   - Refactor code according to FSD principles

3. **Maintainability**
   - Organize code into clear, logical layers
   - Separate concerns between UI, business logic, and data loading
   - Ensure type safety throughout the feature

## User Stories

1. **As a content consumer**, I want to sort shards by newest first so that I can see the latest content immediately.

2. **As a content consumer**, I want to sort shards by oldest first so that I can browse content chronologically.

3. **As a content consumer**, I want to sort shards alphabetically by title so that I can find specific content quickly.

4. **As a content consumer**, I want the sorting preference to be reflected in the URL so that I can share specific sorted views with others.

5. **As a content consumer**, I want immediate visual feedback when changing sort options so that the interface feels responsive.

## Functional Requirements

### 1. Sorting Options
- The system must provide a dropdown/select component for sorting options
- The system must support the following sorting options:
  - Newest first (default): `-createdAt`
  - Oldest first: `createdAt`
  - Title A-Z: `title`
  - Title Z-A: `-title`

### 2. URL Integration
- The system must reflect the current sort option in the URL query parameter
- The system must use the format `/shards?sort=<sortValue>`
- The system must handle URL changes and update the sort accordingly
- The system must maintain the sort parameter when navigating back/forward

### 3. Server-Side Implementation
- The system must send sort parameters to the API
- The system must NOT perform client-side sorting
- The system must handle API responses with sorted data
- The system must maintain infinite scroll functionality with sorting

### 4. UI/UX Requirements
- The system must display a dropdown/select component in the page header
- The system must provide the same UI experience on desktop and mobile
- The system must show loading states during sort changes
- The system must implement optimistic UI updates for responsive feel

### 5. FSD Refactoring
- The system must move `load-data.ts` to `pages/shards/lib/`
- The system must move `page.tsx` to `pages/shards/ui/`
- The system must maintain proper separation of concerns
- The system must follow existing FSD patterns in the codebase

### 6. Meta Tags
- The system must include proper meta tags for SEO
- The system must follow the same meta tag pattern as the blog posts page
- The system must include title, description, and keywords meta tags

## Non-Goals (Out of Scope)

1. **Client-side sorting** - All sorting must be handled server-side
2. **Additional sorting options** - Only date and title sorting are included
3. **Filtering functionality** - This feature focuses only on sorting
4. **Sort preference persistence** - No local storage of user preferences
5. **Advanced pagination controls** - Maintain existing infinite scroll
6. **Sort by relevance** - Not included in this iteration

## Design Considerations

### UI Components
- Use existing Shadcn UI Select component for the sorting dropdown
- Position the sorting control in the page header, below the title
- Maintain consistent spacing and typography with existing design
- Ensure the dropdown is accessible with proper ARIA labels

### Responsive Design
- Same UI layout for desktop and mobile
- Ensure dropdown is easily tappable on mobile devices
- Maintain readability across all screen sizes

### Loading States
- Show skeleton loading for shards during sort changes
- Implement optimistic UI updates for immediate feedback
- Maintain existing infinite scroll loading indicators

## Technical Considerations

### API Integration
- Extend existing `GetManyShardsVariables` interface to include sort parameter
- Ensure API supports the required sort options
- Handle API errors gracefully during sort changes

### State Management
- Use URL search parameters for sort state management
- Implement proper React Query cache invalidation for sort changes
- Ensure infinite scroll works correctly with different sort options

### FSD Architecture
- **Pages Layer**: Route handling, meta tags, data loading orchestration
- **UI Layer**: Presentational components, layout, styling
- **Lib Layer**: Data loading logic, API integration
- **Shared Layer**: Types, utilities, constants

### Performance Optimization
- Implement optimistic UI updates for responsive feel
- Maintain React Query caching for sorted data
- Ensure proper memoization of components

## Success Metrics

1. **User Engagement**: Measure if users utilize sorting options
2. **Performance**: Ensure sort changes complete within 500ms
3. **Accessibility**: Pass WCAG 2.1 AA compliance for sorting controls
4. **Code Quality**: Maintain or improve code coverage
5. **SEO**: Ensure proper meta tags are generated for sorted pages

## Open Questions

1. **Error Handling**: How should we handle API errors during sort changes?
2. **Cache Strategy**: Should we cache different sort results separately?
3. **Analytics**: Do we need to track which sorting options are most used?
4. **Internationalization**: Are there any locale-specific sorting considerations?
5. **Testing**: What level of testing is required for the sorting functionality?

## Implementation Notes

### File Structure Changes
```
pages/shards/
├── index.tsx (route handler)
├── lib/
│   └── load-data.ts (moved from root)
├── ui/
│   └── ShardsPage.tsx (moved from page.tsx)
└── +types.ts (route types)
```

### Key Dependencies
- `nuqs` for URL search parameter management
- Existing Shadcn UI Select component
- React Query for data fetching and caching
- Existing infinite scroll implementation

### Testing Requirements
- Unit tests for sorting logic
- Integration tests for API calls
- E2E tests for sorting user flows
- Accessibility tests for sorting controls