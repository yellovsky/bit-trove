# Blog Posts Page Enhancement - Task List

## Relevant Files

- `apps/frontend/app/pages/blog/index.tsx` - Main blog posts page component with meta function
- `apps/frontend/app/pages/blog/page.tsx` - Blog posts page content component (enhanced responsive layout with loading/error states)
- `apps/frontend/app/pages/blog/load-data.ts` - Data loading logic for blog posts
- `apps/frontend/app/features/blog-posts/ui/BlogPostCard.tsx` - Individual blog post card component (enhanced responsive design)
- `apps/frontend/app/features/blog-posts/ui/BlogPostCard.test.tsx` - Unit tests for blog post card
- `apps/frontend/app/shared/ui/LoadingStates.tsx` - Loading state components (created)
- `apps/frontend/app/shared/ui/ErrorStates.tsx` - Error state components (created)
- `apps/frontend/app/shared/ui/EmptyStates.tsx` - Empty state components (created)
- `apps/frontend/app/shared/lib/seo-utils.ts` - SEO utility functions (created)
- `apps/frontend/app/shared/lib/structured-data.ts` - JSON-LD structured data utilities (created)
- `apps/frontend/app/features/blog-posts/ui/SortControls.tsx` - Sorting UI component (to be created)
- `apps/frontend/app/features/blog-posts/ui/SortControls.test.tsx` - Unit tests for sort controls
- `apps/frontend/app/features/blog-posts/lib/sorting.ts` - Sorting logic utilities (to be created)
- `apps/frontend/app/features/blog-posts/translations/blog-posts.en.server.ts` - English translations for blog posts
- `apps/frontend/app/features/blog-posts/translations/blog-posts.ru.server.ts` - Russian translations for blog posts

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `yarn test [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [x] 1.0 Implement SEO Meta Tags and Structured Data
- [x] 2.0 Enhance Responsive Grid Layout
- [x] 3.0 Add Loading States and Error Handling
- [ ] 4.0 Implement Sorting Functionality
- [ ] 5.0 Improve Accessibility and Performance