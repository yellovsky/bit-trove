# TASK-005: Replace Placeholder API Calls - TODOs

## Overview
This document lists the missing dependencies and TODOs for TASK-005 implementation.

## Completed Implementation

### ✅ Frontend API Integration
- ✅ Updated `create-blog-post.ts` with real API call to `/v1/blog-posts`
- ✅ Created `update-blog-post.ts` with real API call to `/v1/blog-posts/:id`
- ✅ Updated `check-blog-post-slug-availability.ts` with real API call to `/v1/blog-posts/check-slug-availability/:slug`
- ✅ Created `get-my-one-blog-post.ts` with real API call to `/v1/my/blog-posts/:id`
- ✅ Updated `cms.blog-posts.edit/index.tsx` to use update mutation and my blog post query
- ✅ Updated `apps/frontend/app/entities/blog-posts/index.ts` to export new APIs

## Missing Dependencies

### 🔴 High Priority

#### 1. Translation Keys for Create Blog Post
**Files**: `apps/frontend/app/features/blog-posts/translations/`
**Description**: Add missing translation keys for create blog post success/failure messages
**TODO**:
- [ ] Add "Create blog post failed" translation key
- [ ] Add "Create blog post success" translation key
- [ ] Update English translations
- [ ] Update Russian translations
- [ ] Test translation keys in create form

**Implementation Steps**:
1. Add translation keys to blog-posts.en.server.ts
2. Add translation keys to blog-posts.ru.server.ts
3. Update create-blog-post.ts to use correct translation keys
4. Test create form with new translation keys

#### 2. Error Handling for API Failures
**Files**: `apps/frontend/app/entities/blog-posts/api/`
**Description**: Improve error handling for API failures
**TODO**:
- [ ] Add proper error handling for network failures
- [ ] Add retry logic for failed requests
- [ ] Add loading states for API calls
- [ ] Add error boundaries for API failures
- [ ] Test error scenarios

**Implementation Steps**:
1. Add retry logic to API calls
2. Add proper error handling for network failures
3. Add loading states for API calls
4. Add error boundaries for API failures
5. Test error scenarios

#### 3. API Client Configuration
**Files**: `apps/frontend/app/shared/lib/api-client.ts`
**Description**: Ensure API client is properly configured for blog post endpoints
**TODO**:
- [ ] Verify API client configuration
- [ ] Test API client with blog post endpoints
- [ ] Add proper error handling in API client
- [ ] Test API client error scenarios

**Implementation Steps**:
1. Review API client configuration
2. Test API client with blog post endpoints
3. Add proper error handling in API client
4. Test API client error scenarios

### 🟡 Medium Priority

#### 4. Form Validation Enhancement
**Files**: `apps/frontend/app/features/blog-posts/ui/CreateBlogPostForm.tsx`
**Description**: Enhance form validation for real API integration
**TODO**:
- [ ] Add real-time slug availability checking
- [ ] Add proper error handling for validation failures
- [ ] Add loading states for validation
- [ ] Test form validation scenarios

**Implementation Steps**:
1. Add real-time slug availability checking
2. Add proper error handling for validation failures
3. Add loading states for validation
4. Test form validation scenarios

#### 5. Loading States and UX
**Files**: `apps/frontend/app/pages/cms.blog-posts.edit/index.tsx`
**Description**: Improve loading states and user experience
**TODO**:
- [ ] Add proper loading component
- [ ] Add skeleton loading for blog post data
- [ ] Add error states for failed API calls
- [ ] Test loading and error states

**Implementation Steps**:
1. Create proper loading component
2. Add skeleton loading for blog post data
3. Add error states for failed API calls
4. Test loading and error states

#### 6. Query Invalidation
**Files**: `apps/frontend/app/entities/blog-posts/lib/invalidate-blog-posts.ts`
**Description**: Ensure proper query invalidation for blog posts
**TODO**:
- [ ] Update query invalidation for new APIs
- [ ] Test query invalidation scenarios
- [ ] Add optimistic updates
- [ ] Test optimistic updates

**Implementation Steps**:
1. Update query invalidation for new APIs
2. Test query invalidation scenarios
3. Add optimistic updates
4. Test optimistic updates

### 🟢 Low Priority

#### 7. Testing
**Files**: `apps/frontend/app/entities/blog-posts/`
**Description**: Add comprehensive tests for blog post API integration
**TODO**:
- [ ] Create unit tests for API functions
- [ ] Create integration tests for API calls
- [ ] Test error scenarios
- [ ] Test loading states
- [ ] Test form validation

**Implementation Steps**:
1. Create unit tests for API functions
2. Create integration tests for API calls
3. Test error scenarios
4. Test loading states
5. Test form validation

#### 8. Documentation
**Files**: `docs/features/@000-blog-post/`
**Description**: Update documentation for blog post API integration
**TODO**:
- [ ] Update API documentation
- [ ] Add usage examples
- [ ] Document error handling
- [ ] Add troubleshooting guide

**Implementation Steps**:
1. Update API documentation
2. Add usage examples
3. Document error handling
4. Add troubleshooting guide

## Implementation Notes

### API Integration Pattern
The implementation follows the existing shards pattern:
- Uses TanStack Query for data fetching
- Implements proper error handling with toast notifications
- Uses proper TypeScript types from API models
- Follows the same structure as shards API files

### Error Handling Pattern
The implementation follows the existing error handling pattern:
- Uses toast notifications for success/error messages
- Implements proper error boundaries
- Uses translation keys for error messages
- Follows the same error handling as shards

### Form Integration Pattern
The implementation follows the existing form pattern:
- Uses React Hook Form for form management
- Implements proper validation
- Uses proper TypeScript types
- Follows the same structure as shards forms

## Next Steps

1. **High Priority**: Add missing translation keys for create blog post
2. **High Priority**: Improve error handling for API failures
3. **High Priority**: Verify API client configuration
4. **Medium Priority**: Enhance form validation
5. **Medium Priority**: Improve loading states and UX
6. **Medium Priority**: Update query invalidation
7. **Low Priority**: Add comprehensive testing
8. **Low Priority**: Update documentation

## Dependencies

```
TASK-005 → Translation Keys for Create Blog Post
TASK-005 → Error Handling for API Failures
TASK-005 → API Client Configuration
TASK-005 → Form Validation Enhancement
TASK-005 → Loading States and UX
TASK-005 → Query Invalidation
TASK-005 → Testing
TASK-005 → Documentation
```

## Success Criteria

- [x] Create blog post API call implemented
- [x] Update blog post API call implemented
- [x] Slug availability check API call implemented
- [x] My blog post query API call implemented
- [x] Edit form updated to use real APIs
- [ ] Translation keys added for create blog post
- [ ] Error handling improved for API failures
- [ ] API client configuration verified
- [ ] Form validation enhanced
- [ ] Loading states improved
- [ ] Query invalidation updated
- [ ] Tests implemented
- [ ] Documentation updated