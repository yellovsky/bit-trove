# Feature: Blog Post Reading Time Display - Implementation Tasks

## Relevant Files

- `apps/frontend/app/features/blog-posts/ui/BlogPostCard.tsx` - Blog post card component with reading time display (MODIFIED)
- `apps/frontend/app/pages/blog-post/page.tsx` - Blog post detail page with reading time display (MODIFIED)
- `apps/frontend/app/features/blog-posts/ui/BlogPostCard.test.tsx` - Unit tests for blog post card component (CREATED)
- `apps/frontend/app/pages/blog-post/page.test.tsx` - Unit tests for blog post page component (CREATED)
- `apps/frontend/app/shared/ui/LabeledIcon.tsx` - Existing ReadingTimeLabelIcon component to reuse
- `apps/frontend/app/features/blog-posts/translations/` - Translation files for reading time labels
- `apps/backend/src/shared/utils/reading-time.ts` - Existing reading time calculation service (already implemented)

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `yarn test [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [x] 1.0 Frontend Card Display Implementation
  - [x] 1.1 Add reading time display to BlogPostCard component
- [x] 2.0 Frontend Page Display Implementation
  - [x] 2.1 Add reading time display to BlogPostPage component
- [x] 3.0 Translation and Internationalization
  - [x] 3.1 Verify translation keys are available (already exist in common translations)
- [x] 4.0 Testing and Quality Assurance
  - [x] 4.1 Write unit tests for BlogPostCard reading time display
  - [x] 4.2 Write unit tests for BlogPostPage reading time display
  - [x] 4.3 Test reading time display with different time values (1 min, 5 min, 30 min)
  - [x] 4.4 Test reading time display with missing/undefined reading time
- [x] 5.0 Integration and Validation
  - [x] 5.1 Run full test suite to ensure no regressions
  - [x] 5.2 Verify reading time displays correctly in both English and Russian
  - [x] 5.3 Validate that reading time calculation is consistent with shards
  - [x] 5.4 Final code review and cleanup