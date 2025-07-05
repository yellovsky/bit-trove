# TASK-004: Implement My Blog Post Query Endpoint - TODOs

## Overview
This document lists the missing dependencies and TODOs for TASK-004 implementation.

## Completed Implementation

### ✅ Backend Implementation
- ✅ Added `findOneLocalizedByIdForAuthor` method to `BlogPostRepository` interface
- ✅ Implemented `findOneLocalizedByIdForAuthor` in `PrismaBlogPostRepository`
- ✅ Added `canReadMyBlogPost` method to `BlogPostAccessService` interface
- ✅ Implemented `canReadMyBlogPost` in `BlogPostAccessServiceImpl`
- ✅ Created `GetMyBlogPostUseCase`
- ✅ Created `MyBlogPostsController`
- ✅ Updated `BlogPostsModule` with new controller and use case

## Missing Dependencies

### 🔴 High Priority

#### 1. Casbin Policy Configuration
**Files**: `apps/backend/src/modules/casbin/`
**Description**: Need to configure Casbin policies for blog post read permissions
**TODO**:
- [ ] Add policy rules for blog post read access
- [ ] Test authorization with different user roles
- [ ] Verify policy enforcement for "my" blog post access

#### 2. Database Schema Validation
**Files**: `apps/backend/prisma/schema/blog-post.prisma`
**Description**: Verify database schema supports author-based queries
**TODO**:
- [ ] Check if `blogPost` table has proper `authorId` foreign key
- [ ] Verify indexes for `authorId` queries
- [ ] Test database queries for author-based filtering

#### 3. API Models for My Blog Posts
**Files**: `packages/api-models/src/blog-post/`
**Description**: Create API models for my blog post responses
**TODO**:
- [ ] Create `get-my-blog-post.ts` API model
- [ ] Add proper Zod schemas for my blog post responses
- [ ] Export types from `packages/api-models/src/blog-post/index.ts`

### 🟡 Medium Priority

#### 4. Frontend API Integration
**Files**: `apps/frontend/app/entities/blog-posts/api/`
**Description**: Create frontend API hooks for my blog posts
**TODO**:
- [ ] Create `get-my-blog-post.ts` API function
- [ ] Create `useMyBlogPostQuery` hook
- [ ] Add proper error handling and loading states
- [ ] Test API integration

#### 5. CMS Interface Updates
**Files**: `apps/frontend/app/pages/cms.blog-posts/`
**Description**: Update CMS interface to use my blog post endpoint
**TODO**:
- [ ] Update edit form to fetch blog post using my endpoint
- [ ] Add proper loading states for my blog post fetching
- [ ] Handle authorization errors gracefully
- [ ] Test CMS integration

#### 6. Error Handling Enhancement
**Files**: `apps/backend/src/modules/blog-posts/`
**Description**: Add specific error handling for my blog post access
**TODO**:
- [ ] Add validation for invalid blog post IDs
- [ ] Add proper error messages for access denied scenarios
- [ ] Add logging for my blog post access attempts
- [ ] Test error scenarios

### 🟢 Low Priority

#### 7. Testing
**Files**: `apps/backend/src/modules/blog-posts/`
**Description**: Add comprehensive tests for my blog post functionality
**TODO**:
- [ ] Create unit tests for `GetMyBlogPostUseCase`
- [ ] Create unit tests for `MyBlogPostsController`
- [ ] Create integration tests for my blog post endpoint
- [ ] Test authorization scenarios
- [ ] Test error handling scenarios

#### 8. Documentation
**Files**: `docs/features/@000-blog-post/`
**Description**: Update documentation for my blog post endpoint
**TODO**:
- [ ] Update API documentation
- [ ] Add usage examples
- [ ] Document authorization requirements
- [ ] Add troubleshooting guide

## Implementation Notes

### Authorization Pattern
The implementation follows the existing pattern from shards:
- Uses Casbin for authorization checks
- Requires authenticated user with `accountId`
- Checks permissions before accessing data
- Returns `AccessDeniedReason` for unauthorized access

### Database Pattern
The implementation follows the existing repository pattern:
- Uses Effect for functional error handling
- Implements proper transaction handling
- Uses Prisma for database access
- Follows DDD repository interface pattern

### API Pattern
The implementation follows the existing API pattern:
- Uses Effect for functional programming
- Implements proper error mapping
- Uses DTOs for response formatting
- Follows RESTful conventions

## Next Steps

1. **High Priority**: Configure Casbin policies for blog post read access
2. **High Priority**: Validate database schema supports author-based queries
3. **High Priority**: Create API models for my blog post responses
4. **Medium Priority**: Implement frontend API integration
5. **Medium Priority**: Update CMS interface
6. **Medium Priority**: Enhance error handling
7. **Low Priority**: Add comprehensive testing
8. **Low Priority**: Update documentation

## Dependencies

```
TASK-004 → Casbin Policy Configuration
TASK-004 → Database Schema Validation
TASK-004 → API Models for My Blog Posts
TASK-004 → Frontend API Integration
TASK-004 → CMS Interface Updates
TASK-004 → Error Handling Enhancement
TASK-004 → Testing
TASK-004 → Documentation
```

## Success Criteria

- [x] Backend endpoint implemented (`GET /v1/my/blog-posts/:id`)
- [x] Authorization checks implemented
- [x] Repository method implemented
- [x] Use case implemented
- [x] Controller implemented
- [x] Module updated
- [ ] Casbin policies configured
- [ ] Database schema validated
- [ ] API models created
- [ ] Frontend integration implemented
- [ ] CMS interface updated
- [ ] Error handling enhanced
- [ ] Tests implemented
- [ ] Documentation updated