# Task List: Shards Page Sorting Feature

## Relevant Files

- `apps/frontend/app/pages/shards/index.tsx` - Route handler for shards page
- `apps/frontend/app/pages/shards/page.tsx` - Current shards page component (to be moved)
- `apps/frontend/app/pages/shards/load-data.ts` - Data loading logic (to be moved)
- `apps/frontend/app/pages/shards/lib/load-data.ts` - New location for data loading logic
- `apps/frontend/app/pages/shards/ui/ShardsPage.tsx` - New location for page component
- `apps/frontend/app/pages/shards/ui/ShardsSorting.tsx` - New sorting dropdown component
- `apps/frontend/app/pages/shards/+types.ts` - Route types
- `apps/frontend/app/entities/shards/api/get-many-shards.ts` - API integration for shards
- `apps/frontend/app/entities/shards/model/shards.model.ts` - Shards data models
- `apps/frontend/app/shared/lib/url-search-params.ts` - URL parameter utilities
- `apps/frontend/app/pages/shards/index.test.tsx` - Tests for route handler
- `apps/frontend/app/pages/shards/ui/ShardsPage.test.tsx` - Tests for page component
- `apps/frontend/app/pages/shards/ui/ShardsSorting.test.tsx` - Tests for sorting component
- `apps/frontend/app/pages/shards/lib/load-data.test.ts` - Tests for data loading logic

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `yarn test [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [x] 1.0 FSD Refactoring - Restructure shards page according to FSD principles
  - [x] 1.1 Create lib directory and move load-data.ts
  - [x] 1.2 Create ui directory and move page.tsx as ShardsPage.tsx
  - [x] 1.3 Update imports in index.tsx to reference new file locations
  - [x] 1.4 Verify FSD structure follows existing patterns
- [ ] 2.0 URL Search Parameter Integration - Implement sort state management in URL
  - [x] 2.1 Add nuqs dependency if not present
  - [x] 2.2 Implement useSearchParam hook for sort in ShardsRoute
  - [x] 2.3 Update ShardsPage to accept sort as a prop
  - [x] 2.4 Pass sort param to data loader and API
  - [x] 2.5 Ensure sort param is reflected in the URL and updates on change
  - [ ] 2.6 Add tests for URL sort param integration
- [x] 3.0 Sorting UI Component - Create dropdown component for sort options
  - [x] 3.1 Add Shadcn UI Select component to ShardsPage
  - [x] 3.2 Implement sort options: Newest, Oldest, Most Popular, Least Popular
  - [x] 3.3 Style dropdown responsively with Tailwind CSS
  - [x] 3.4 Ensure accessibility with proper labels and ARIA attributes
  - [x] 3.5 Connect dropdown to setSort function for URL updates
- [x] 4.0 API Integration - Extend API calls to support sorting parameters
  - [x] 4.1 Verify sort parameter is passed to loadShardsRouteData
  - [x] 4.2 Confirm sort parameter is validated and used in API calls
  - [x] 4.3 Ensure API supports the implemented sort options
- [x] 5.0 Meta Tags Implementation - Add proper SEO meta tags for sorted pages
  - [x] 5.1 Add sort-specific meta title keys for newest, oldest, most popular, least popular
  - [x] 5.2 Add sort-specific meta description keys for each sort option
  - [x] 5.3 Update loadShardsRouteData to use dynamic meta tags based on sort parameter
  - [x] 5.4 Add i18n keys in both English and Russian for sort-specific meta tags
  - [x] 5.5 Ensure meta tags update when URL sort parameter changes