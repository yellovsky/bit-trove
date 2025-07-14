# Related Articles Endpoint - Implementation Tasks

## Relevant Files

- `apps/backend/prisma/schema/article-relation.prisma` - Database schema for article relations table
- `apps/backend/src/modules/articles/domain/models/article-with-relation.model.ts` - Article with relation model
- `apps/backend/src/modules/articles/infrastructure/repositories/article-relations.repository.ts` - Repository for article relation operations
- `apps/backend/src/modules/articles/application/services/article-relation.service.ts` - Business logic for article relations
- `apps/backend/src/modules/articles/application/use-cases/get-related-articles.use-case.ts` - Use case for getting related articles
- `apps/backend/src/modules/articles/presentation/articles.controller.ts` - Main articles controller (includes related articles endpoint)
- `apps/backend/src/modules/articles/presentation/dtos/get-related-articles-response.dto.ts` - DTO for related articles response
- `apps/backend/src/modules/articles/presentation/dtos/article-with-relation.dto.ts` - DTO for article with relation data
- `packages/api-models/src/article-relation/article-relation.ts` - API model for article relations
- `packages/api-models/src/article-relation/get-related-articles.ts` - API model for related articles response
- `apps/frontend/app/entities/articles/api/article-relation.api.ts` - Frontend API client for article relations
- `apps/frontend/app/features/articles/model/article-relation.model.ts` - Frontend model for article relations
- `apps/frontend/app/features/articles/ui/RelatedArticles.tsx` - Frontend component for displaying related articles
- `apps/frontend/app/widgets/blog-post-sidebar/RelatedArticles.tsx` - Widget for blog post sidebar integration

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `yarn test [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [x] 1.0 Database Schema and Entity Setup
    - [x] 1.1 Create Prisma schema for article_relations table
    - [x] 1.2 Create article with relation model
    - [x] 1.3 Create database migration
    - [x] 1.4 Update articles module to include article relations
- [x] 2.0 Repository and Service Layer Implementation
    - [x] 2.1 Create article relation repository interface
    - [x] 2.2 Implement Prisma article relation repository
    - [x] 2.3 Create article relation service interface
    - [x] 2.4 Implement article relation service
- [x] 3.0 API Controllers and DTOs
    - [x] 3.1 Create DTOs for article relation operations
    - [x] 3.2 Add related articles endpoint to main articles controller
    - [x] 3.3 Update articles module to register new providers and use cases
    - [x] 3.4 Add API documentation (Swagger/OpenAPI)
- [x] 4.0 Frontend Integration and API Models
    - [x] 4.1 Create frontend API client for article relations
    - [x] 4.2 Create frontend model for article relations
    - [x] 4.3 Create frontend components for displaying related articles
    - [x] 4.4 Integrate related articles into existing article pages
- [x] 5.0 Testing and Documentation
    - [x] 5.1 Create unit tests for frontend components
    - [x] 5.2 Create comprehensive documentation
    - [x] 5.3 Update task list with completion status
- [x] 6.0 API Model Updates
    - [x] 6.1 Update API models to match new structure
    - [x] 6.2 Update backend DTOs and controllers
    - [x] 6.3 Update frontend API client and components
    - [x] 6.4 Test API model compilation
- [x] 7.0 Seeding and Data Setup
    - [x] 7.1 Create article relations seeder
    - [x] 7.2 Add sample article relations for testing
    - [x] 7.3 Verify seeding works correctly

## Future Tasks (Not Implemented)

- [ ] 8.0 CRUD API Endpoints for Relation Management
    - [ ] 8.1 Create article relation controller
    - [ ] 8.2 Implement create article relation endpoint
    - [ ] 8.3 Implement delete article relation endpoint
    - [ ] 8.4 Add proper authentication and authorization
- [ ] 9.0 Pagination Support
    - [ ] 9.1 Add pagination to related articles endpoint
    - [ ] 9.2 Update frontend to handle pagination
    - [ ] 9.3 Add pagination controls to UI
- [ ] 10.0 Advanced Features
    - [ ] 10.1 Add relation type filtering
    - [ ] 10.2 Add relation ordering controls
    - [ ] 10.3 Add bulk operations for relations
    - [ ] 10.4 Add relation analytics and metrics