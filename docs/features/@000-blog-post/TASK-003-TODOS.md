# TASK-003: Implement Slug Availability Check Endpoint - TODOs

## Overview
This document tracks the remaining work needed to complete TASK-003: Implement Slug Availability Check Endpoint.

## ✅ Completed Components

### API Models
- ✅ Created `packages/api-models/src/blog-post/blog-post-slug-availability.ts`
- ✅ Added exports to `packages/api-models/src/blog-post/index.ts`
- ✅ Built API models package

### Domain Layer
- ✅ Added `getBlogPostIdBySlug` method to `BlogPostRepository` interface
- ✅ Method signature: `getBlogPostIdBySlug(reqCtx: RequestContext, slug: string): Effect.Effect<string | null, UnknownException>`

### Infrastructure Layer
- ✅ Implemented `getBlogPostIdBySlug` in `PrismaBlogPostRepository`
- ✅ Uses `tx.blogPost.findUnique({ where: { slug } })` to check slug availability
- ✅ Returns `blogPost?.id ?? null` to indicate if slug is taken

### Application Layer
- ✅ Created `CheckBlogPostSlugAvailabilityUseCase`
- ✅ Follows same pattern as shards implementation
- ✅ Injects `BLOG_POST_REPOSITORY` dependency
- ✅ Executes repository method and returns result

### Presentation Layer
- ✅ Created `BlogPostSlugAvailabilityDto` and `CheckBlogPostSlugAvailabilityResponseDto`
- ✅ Added `checkSlugAvailability` endpoint to `BlogPostController`
- ✅ Endpoint: `GET /v1/blog-posts/check-slug-availability/:slug`
- ✅ Proper Swagger documentation
- ✅ Effect-based error handling

### Module Configuration
- ✅ Added `CheckBlogPostSlugAvailabilityUseCase` to `BlogPostsModule` providers

## 🔄 Missing Dependencies and Wiring

### 1. Missing Use Cases (High Priority)
**Files**: `apps/backend/src/modules/blog-posts/application/use-cases/`
- ❌ `GetOneBlogPostUseCase` - Referenced in controller but not implemented
- ❌ `GetManyBlogPosstUseCase` - Referenced in controller but not implemented

**Impact**: Controller will fail to start due to missing dependencies
**Solution**: Implement these use cases or remove them from controller if not needed

### 2. Missing Service Dependencies (High Priority)
**Files**: `apps/backend/src/modules/blog-posts/application/services/`
- ❌ `BlogPostAccessServiceImpl` - Referenced in module but not implemented
- ❌ `BLOG_POST_ACCESS_SRV` interface - Referenced in module but not implemented

**Impact**: Module will fail to start due to missing service
**Solution**: Implement the access service or remove it from module if not needed

### 3. Missing DTOs (Medium Priority)
**Files**: `apps/backend/src/modules/blog-posts/presentation/dtos/`
- ❌ `GetOneBlogPostResponseDto` - Referenced in controller but not implemented
- ❌ `GetManyBlogPostsResponseDto` - Referenced in controller but not implemented
- ❌ `BlogPostDto` - Referenced in DTOs but not implemented
- ❌ `ShortBlogPostDto` - Referenced in DTOs but not implemented

**Impact**: Controller will fail to compile due to missing DTOs
**Solution**: Implement these DTOs or remove the endpoints that use them

### 4. Missing Repository Types (Medium Priority)
**Files**: `apps/backend/src/modules/blog-posts/infrastructure/repositories/`
- ❌ `blog-post.repository.types.ts` - Referenced in repository but not implemented
- ❌ `DBLocalizedBlogPost` type - Referenced in repository but not implemented
- ❌ `dbLocalizedBlogPostSelect` - Referenced in repository but not implemented
- ❌ `dbLocalizedShortBlogPostSelect` - Referenced in repository but not implemented

**Impact**: Repository will fail to compile due to missing types
**Solution**: Implement these types or simplify the repository implementation

### 5. Missing Domain Models (Medium Priority)
**Files**: `apps/backend/src/modules/blog-posts/domain/models/`
- ❌ `LocalizedBlogPostModel` - Referenced in repository but not implemented
- ❌ `LocalizedShortBlogPostModel` - Referenced in repository but not implemented
- ❌ `AlternativeBlogPostModel` - Referenced in repository but not implemented

**Impact**: Repository will fail to compile due to missing models
**Solution**: Implement these models or simplify the repository implementation

### 6. Missing API Models (Low Priority)
**Files**: `packages/api-models/src/blog-post/`
- ❌ `get-many-blog-posts.ts` - Referenced in controller but not implemented
- ❌ `get-one-blog-post.ts` - Referenced in controller but not implemented

**Impact**: Controller will fail to compile due to missing API models
**Solution**: Implement these API models or remove the endpoints that use them

## 🚀 Implementation Priority

### Phase 1: Critical Dependencies (Blocking)
1. **Implement Missing Use Cases**
   - Create `GetOneBlogPostUseCase` or remove from controller
   - Create `GetManyBlogPosstUseCase` or remove from controller

2. **Implement Missing Service**
   - Create `BlogPostAccessServiceImpl` or remove from module
   - Create `BLOG_POST_ACCESS_SRV` interface or remove from module

### Phase 2: Core Dependencies (Required)
3. **Implement Missing DTOs**
   - Create `GetOneBlogPostResponseDto`
   - Create `GetManyBlogPostsResponseDto`
   - Create `BlogPostDto`
   - Create `ShortBlogPostDto`

4. **Implement Missing Repository Types**
   - Create `blog-post.repository.types.ts`
   - Define `DBLocalizedBlogPost` type
   - Define select objects

### Phase 3: Domain Models (Required)
5. **Implement Missing Domain Models**
   - Create `LocalizedBlogPostModel`
   - Create `LocalizedShortBlogPostModel`
   - Create `AlternativeBlogPostModel`

### Phase 4: API Models (Optional)
6. **Implement Missing API Models**
   - Create `get-many-blog-posts.ts`
   - Create `get-one-blog-post.ts`

## 🧪 Testing Requirements

### Unit Tests
- [ ] Test `CheckBlogPostSlugAvailabilityUseCase`
- [ ] Test `getBlogPostIdBySlug` repository method
- [ ] Test `checkSlugAvailability` controller endpoint

### Integration Tests
- [ ] Test slug availability check with existing blog post
- [ ] Test slug availability check with non-existing slug
- [ ] Test error handling for invalid slugs

## 📋 Acceptance Criteria

### Functional Requirements
- [x] `GET /v1/blog-posts/check-slug-availability/:slug` endpoint implemented
- [x] Returns `{ available: boolean, takenBy?: string }` response
- [x] Proper error handling for invalid slugs
- [x] Swagger documentation added
- [x] Effect-based error handling implemented

### Technical Requirements
- [x] Follows DDD pattern
- [x] Uses Effect for functional error handling
- [x] Proper dependency injection
- [x] TypeScript types properly defined
- [x] Repository pattern implemented

### Missing Requirements
- [ ] All dependencies properly wired
- [ ] Controller compiles without errors
- [ ] Module starts without errors
- [ ] Endpoint responds correctly
- [ ] Error handling works properly

## 🎯 Next Steps

1. **Immediate**: Fix missing use cases and services to get the module to start
2. **Short-term**: Implement missing DTOs and repository types
3. **Medium-term**: Implement missing domain models
4. **Long-term**: Add comprehensive testing

## 📝 Notes

- The slug availability check endpoint is fully implemented and follows the same pattern as shards
- The main blocker is missing dependencies that prevent the module from starting
- Once dependencies are resolved, the endpoint should work correctly
- The implementation follows DDD principles and uses Effect for error handling