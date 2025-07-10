# Blog Page Refactor - Product Requirements Document

## Introduction/Overview

This feature refactors the blog page (`/blog`) to align with the shards page implementation by adding URL-based sorting functionality and breadcrumb navigation. The goal is to create a consistent user experience across content listing pages and improve navigation patterns.

The current blog page uses client-side state management for sorting and lacks breadcrumb navigation, while the shards page has a more robust implementation with URL parameters and proper navigation structure. This refactor will standardize the approach across both pages.

## Goals

1. **Consistent User Experience**: Align blog page sorting and navigation with the shards page pattern
2. **Improved Navigation**: Add breadcrumb navigation to help users understand their location
3. **URL-Based State**: Implement URL parameters for sorting to enable bookmarking and sharing
4. **Performance Enhancement**: Convert to infinite query pattern for better performance
5. **Code Consistency**: Standardize component patterns across content listing pages

## User Stories

1. **As a user**, I want to see breadcrumbs on the blog page so I can easily navigate back to the home page
2. **As a user**, I want to sort blog posts by newest/oldest so I can find content in my preferred order
3. **As a user**, I want to bookmark or share a sorted blog page URL so I can return to the same view later
4. **As a user**, I want consistent navigation patterns across blog and shards pages so I have a predictable experience
5. **As a developer**, I want consistent component patterns across content pages so I can maintain code more efficiently

## Functional Requirements

1. **Breadcrumb Navigation**: The blog page must display breadcrumbs showing "Home → Blog" navigation path
2. **URL-Based Sorting**: The system must support URL parameters (`?sort=newest`, `?sort=oldest`) for sorting blog posts
3. **Sorting Dropdown**: The system must replace the current `SortControls` with a `BlogSortingDropdown` component similar to `ShardsSortingDropdown`
4. **Section Header**: The system must use the `SectionHeader` component for consistent page layout with shards
5. **Infinite Query**: The system must convert from `useManyBlogPostsQuery` to `useInfiniteBlogPostsQuery` for better performance
6. **URL Parameter Validation**: The system must validate sort parameters from URL and default to `-createdAt` if invalid
7. **Meta Tags**: The system must include breadcrumb structured data in meta tags for SEO
8. **Translation Support**: The system must use the same translation keys as shards (`sort.newest`, `sort.oldest`)

## Non-Goals (Out of Scope)

1. **Advanced Filtering**: This refactor does not include adding tag filtering or search functionality
2. **Pagination Controls**: The infinite scroll pattern will be maintained, not replaced with traditional pagination
3. **Sort Options Expansion**: Only newest/oldest sorting will be implemented, not additional sort criteria
4. **Mobile-Specific Changes**: No mobile-specific layout changes beyond what the existing components provide
5. **Backend API Changes**: All changes are frontend-only, no backend modifications required

## Design Considerations

### Component Structure
- Use `SectionHeader` component for consistent page layout
- Create `BlogSortingDropdown` component following the same pattern as `ShardsSortingDropdown`
- Implement breadcrumbs using the existing `Breadcrumbs` component

### URL Structure
- Maintain current `/blog` route structure
- Add sort parameter: `/blog?sort=newest` or `/blog?sort=oldest`
- Default to `-createdAt` (newest first) when no sort parameter is provided

### Layout Pattern
```
[Breadcrumbs]
[SectionHeader with title and sorting dropdown]
[Blog posts grid with infinite scroll]
```

## Technical Considerations

### Data Loading Pattern
- Convert from `useManyBlogPostsQuery` to `useInfiniteBlogPostsQuery`
- Update `loadBlogPostsRouteData` to handle URL parameters
- Implement sort parameter validation similar to shards implementation

### Component Dependencies
- Leverage existing `SectionHeader` component from shared UI
- Use existing `Breadcrumbs` component from breadcrumbs feature
- Create new `BlogSortingDropdown` component in blog-posts feature

### Translation Requirements
- Use existing `sort.newest` and `sort.oldest` translation keys
- Ensure proper i18n namespace loading for blog posts

### SEO Considerations
- Include breadcrumb structured data in meta tags
- Maintain existing meta title and description functionality
- Ensure proper canonical URLs for sorted views

## Success Metrics

1. **User Experience**: Blog page navigation and sorting behavior matches shards page exactly
2. **Performance**: Infinite query implementation provides smooth scrolling experience
3. **URL Functionality**: Users can bookmark and share sorted blog page URLs successfully
4. **Code Consistency**: Component patterns are standardized across blog and shards pages
5. **SEO**: Breadcrumb structured data is properly implemented for search engines

## Open Questions

1. **Query Client Integration**: Should the infinite query be prefetched in the loader similar to shards?
2. **Error Handling**: How should sorting errors be handled if invalid parameters are provided?
3. **Loading States**: Should loading states be updated to match the infinite query pattern?
4. **Testing Strategy**: What specific test cases should be added for the new sorting functionality?

## Implementation Notes

### Files to Modify
- `apps/frontend/app/pages/blog/page.tsx` - Main page component
- `apps/frontend/app/pages/blog/load-data.ts` - Data loading logic
- `apps/frontend/app/pages/blog/index.tsx` - Route component

### Files to Create
- `apps/frontend/app/features/blog-posts/ui/BlogSortingDropdown.tsx` - New sorting component
- `apps/frontend/app/entities/blog-posts/api/useInfiniteBlogPostsQuery.ts` - Infinite query hook

### Dependencies
- Existing `SectionHeader` component from shared UI
- Existing `Breadcrumbs` component from breadcrumbs feature
- Existing translation keys from shards feature