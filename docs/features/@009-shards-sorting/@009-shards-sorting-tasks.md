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

- [ ] 1.0 FSD Refactoring - Restructure shards page according to FSD principles
  - [x] 1.1 Create lib directory and move load-data.ts
  - [x] 1.2 Create ui directory and move page.tsx as ShardsPage.tsx
  - [x] 1.3 Update imports in index.tsx to reference new file locations
  - [x] 1.4 Verify FSD structure follows existing patterns
- [ ] 2.0 URL Search Parameter Integration - Implement sort state management in URL
- [ ] 3.0 Sorting UI Component - Create dropdown component for sort options
- [ ] 4.0 API Integration - Extend API calls to support sorting parameters
- [ ] 5.0 Meta Tags Implementation - Add proper SEO meta tags for sorted pages