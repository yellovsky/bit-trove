# TASK-002: Update Blog Post Endpoint - TODOs

## Completed Implementation

✅ **Backend API Endpoint**: PUT `/v1/blog-posts/:id` endpoint implemented
✅ **Request Validation**: Zod schema validation with `updateBlogPostBodySchema`
✅ **Error Handling**: Proper error handling with Effect pipeline
✅ **Database Transaction**: Transaction handling in repository
✅ **Authorization**: Basic authorization checks with Casbin RBAC
✅ **DDD Pattern**: Following Domain-Driven Design principles

## Files Created/Modified

### Domain Layer
- ✅ `apps/backend/src/modules/blog-posts/domain/repositories/blog-post.repository.ts`
  - Added `UpdateBlogPostParams` interface
  - Added `updateBlogPost` method to repository interface

### Infrastructure Layer
- ✅ `apps/backend/src/modules/blog-posts/infrastructure/repositories/blog-post.repository.ts`
  - Implemented `updateBlogPost` method in Prisma repository
  - Added proper transaction handling
  - Added logging and error handling
  - Added existence check before update

### Application Layer
- ✅ `apps/backend/src/modules/blog-posts/application/use-cases/update-blog-post.use-case.ts`
  - Created use case following DDD pattern
  - Added authorization checks
  - Added logging

### Presentation Layer
- ✅ `apps/backend/src/modules/blog-posts/presentation/blog-post.controller.ts`
  - Added PATCH endpoint with proper validation
  - Added Swagger documentation
  - Added Effect pipeline for error handling

### Authorization
- ✅ `apps/backend/src/modules/blog-posts/application/services/blog-post-access.service.interface.ts`
  - Added `canUpdateBlogPost` method interface
- ✅ `apps/backend/src/modules/blog-posts/application/services/blog-post-access.service.ts`
  - Implemented `canUpdateBlogPost` method with Casbin integration

### Module Configuration
- ✅ `apps/backend/src/modules/blog-posts/blog-posts.module.ts`
  - Added `UpdateBlogPostUseCase` to providers

## Missing Dependencies & Wiring

### 🔴 High Priority TODOs

#### 1. Database Schema Validation
**TODO**: Verify that the database schema supports blog post updates
- [ ] Check if `blogPost` table supports updates
- [ ] Check if `localizedBlogPost` table supports updates
- [ ] Verify foreign key relationships for updates
- [ ] Test database migration if needed

**Files to check**:
- `apps/backend/prisma/schema/blog-post.prisma`
- `apps/backend/prisma/schema/account.prisma`

#### 2. Casbin Policy Configuration
**TODO**: Configure Casbin policies for blog post updates
- [ ] Add policy rules for blog post updates
- [ ] Test authorization with different user roles
- [ ] Verify policy enforcement for updates
- [ ] Test ownership-based permissions

**Files to check**:
- `apps/backend/src/modules/casbin/`
- Casbin policy configuration files

#### 3. API Models Export
**TODO**: Ensure API models are properly exported
- [ ] Verify `updateBlogPostBodySchema` is exported from `@repo/api-models`
- [ ] Check if all required types are available

**Files to check**:
- `packages/api-models/src/blog-post/index.ts`
- `packages/api-models/src/blog-post/update-blog-post.ts`

### 🟡 Medium Priority TODOs

#### 4. Error Handling Enhancement
**TODO**: Add more specific error handling for updates
- [ ] Add validation for unique slug constraint on updates
- [ ] Add proper error messages for different failure scenarios
- [ ] Add conflict resolution for duplicate slugs during updates
- [ ] Add validation for blog post existence

**Implementation Steps**:
1. Add unique slug validation for updates
2. Create specific error types for update failures
3. Implement conflict resolution for updates
4. Add user-friendly error messages
5. Test error scenarios

#### 5. Logging Enhancement
**TODO**: Improve logging for debugging updates
- [ ] Add structured logging with correlation IDs
- [ ] Add performance metrics for updates
- [ ] Add audit logging for blog post updates
- [ ] Add before/after logging for changes

**Implementation Steps**:
1. Implement structured logging for updates
2. Add correlation ID tracking
3. Add performance metrics for updates
4. Create audit logging for updates
5. Test logging functionality

#### 6. Testing
**TODO**: Add comprehensive tests for update functionality
- [ ] Unit tests for update use case
- [ ] Integration tests for update repository
- [ ] E2E tests for update API endpoint
- [ ] Authorization tests for updates

**Files to create**:
- `apps/backend/src/modules/blog-posts/application/use-cases/__tests__/update-blog-post.use-case.spec.ts`
- `apps/backend/src/modules/blog-posts/infrastructure/repositories/__tests__/blog-post.repository.spec.ts`
- `apps/backend/src/modules/blog-posts/presentation/__tests__/blog-post.controller.spec.ts`

### 🟢 Low Priority TODOs

#### 7. Performance Optimization
**TODO**: Optimize for update performance
- [ ] Add database indexes for update queries
- [ ] Implement optimistic locking for concurrent updates
- [ ] Add query optimization for updates
- [ ] Add update performance monitoring

**Implementation Steps**:
1. Analyze current update query performance
2. Add necessary database indexes for updates
3. Implement optimistic locking
4. Add update performance monitoring
5. Create performance benchmarks

#### 8. Advanced Features
**TODO**: Add advanced update features
- [ ] Partial updates support
- [ ] Update validation rules
- [ ] Update hooks and callbacks
- [ ] Update notifications

**Implementation Steps**:
1. Implement partial update support
2. Add update validation rules
3. Create update hooks system
4. Add update notifications
5. Test advanced features

## Testing Checklist

### Manual Testing
- [ ] Test blog post update with valid data
- [ ] Test blog post update with invalid data
- [ ] Test authorization with different user roles
- [ ] Test database transaction rollback on errors
- [ ] Test slug uniqueness validation on updates
- [ ] Test non-existent blog post updates

### Automated Testing
- [ ] Unit tests for update use case
- [ ] Unit tests for update repository
- [ ] Integration tests for update API
- [ ] Authorization tests for updates
- [ ] Error handling tests for updates

## Deployment Checklist

### Pre-deployment
- [ ] Verify database schema supports updates
- [ ] Verify Casbin policies are configured for updates
- [ ] Verify API models are properly built
- [ ] Run all tests
- [ ] Check for linting errors

### Post-deployment
- [ ] Test update endpoint in staging environment
- [ ] Verify authorization works correctly for updates
- [ ] Monitor error rates for updates
- [ ] Check performance metrics for updates

## Security Considerations

### Authorization
- [ ] Verify Casbin policies are properly configured for updates
- [ ] Test with different user roles for updates
- [ ] Ensure proper access control for updates
- [ ] Test ownership-based permissions

### Input Validation
- [ ] Verify Zod schema validation for updates
- [ ] Test with malicious input for updates
- [ ] Ensure SQL injection protection for updates
- [ ] Validate slug uniqueness on updates

### Data Protection
- [ ] Verify sensitive data is not logged during updates
- [ ] Ensure proper data sanitization for updates
- [ ] Check for PII exposure during updates
- [ ] Validate update permissions

## Next Steps

1. **Immediate**: Test the implementation manually
2. **Short-term**: Add comprehensive test coverage for updates
3. **Medium-term**: Enhance error handling and logging for updates
4. **Long-term**: Add performance optimizations and monitoring for updates

## Dependencies for Next Tasks

This implementation provides the foundation for:
- TASK-003: Slug Availability Check Endpoint
- TASK-004: My Blog Post Query Endpoint
- TASK-005: Frontend API Integration
- TASK-006: Blog Post Fetching for Editing

The repository pattern and authorization system can be reused for these subsequent tasks.

## Comparison with TASK-001

### Similarities
- Same DDD pattern implementation
- Same authorization approach
- Same error handling patterns
- Same logging structure

### Differences
- Update requires existence check
- Update modifies existing records
- Update has different authorization context
- Update requires different validation rules

## Success Metrics

### Functional Requirements
- [x] Blog post update endpoint implemented
- [x] Request validation with Zod schemas
- [x] Proper error handling and responses
- [x] Database transaction handling
- [x] Authorization checks (basic)

### Performance Requirements
- [ ] Update response time < 200ms
- [ ] Database update operations optimized
- [ ] Concurrent update handling
- [ ] Update performance monitoring

### Quality Requirements
- [x] TypeScript types complete
- [x] DDD pattern implemented
- [x] Effect-based error handling
- [x] Authorization integration
- [ ] Comprehensive test coverage
- [ ] Error handling implemented
- [ ] User acceptance testing