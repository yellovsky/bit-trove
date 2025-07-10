# Blog Page Refactor - Implementation Tasks

## Relevant Files

- `apps/frontend/app/pages/blog/page.tsx` - Main blog page component that needs refactoring
- `apps/frontend/app/pages/blog/page.test.tsx` - Unit tests for the blog page component
- `apps/frontend/app/pages/blog/load-data.ts` - Data loading logic for blog route
- `apps/frontend/app/pages/blog/load-data.test.ts` - Unit tests for load-data logic
- `apps/frontend/app/pages/blog/index.tsx` - Route component that handles meta tags and SEO
- `apps/frontend/app/pages/blog/index.test.tsx` - Unit tests for the route component
- `apps/frontend/app/features/blog-posts/ui/BlogSortingDropdown.tsx` - New sorting dropdown component
- `apps/frontend/app/features/blog-posts/ui/BlogSortingDropdown.test.tsx` - Unit tests for the sorting dropdown
- `apps/frontend/app/entities/blog-posts/api/useInfiniteBlogPostsQuery.ts` - New infinite query hook
- `apps/frontend/app/entities/blog-posts/api/useInfiniteBlogPostsQuery.test.ts` - Unit tests for the infinite query hook
- `apps/frontend/app/features/blog-posts/lib/links.ts` - Blog post link utilities (may need updates)
- `apps/frontend/app/features/blog-posts/lib/links.test.ts` - Unit tests for link utilities

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `yarn test [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [x] 1.0 Create BlogSortingDropdown Component
- [x] 2.0 Implement Infinite Query Hook for Blog Posts
- [x] 3.0 Update Data Loading Logic with URL Parameters
- [x] 4.0 Refactor Blog Page Component Structure
- [ ] 5.0 Add Breadcrumb Navigation and Meta Tags