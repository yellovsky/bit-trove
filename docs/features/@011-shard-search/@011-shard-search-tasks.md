# Task List: Shard Search Feature Implementation

## Relevant Files

- `apps/backend/src/modules/shards/domain/models/get-many-shards.model.ts` - Contains the DTO for getMany shards with search parameter
- `apps/backend/src/modules/shards/domain/models/get-many-shards.model.test.ts` - Unit tests for the DTO validation
- `apps/backend/src/modules/shards/application/services/shards.service.ts` - Contains the business logic for shard operations including search
- `apps/backend/src/modules/shards/application/services/shards.service.test.ts` - Unit tests for the shards service
- `apps/backend/src/modules/shards/infrastructure/repositories/shards.repository.ts` - Contains database queries for shard search functionality using JSON functions
- `apps/backend/src/modules/shards/infrastructure/repositories/shards.repository.test.ts` - Unit tests for the repository search methods
- `apps/backend/src/modules/shards/presentation/shards.controller.ts` - Contains the API endpoints that need search parameter support
- `apps/backend/src/modules/shards/presentation/shards.controller.test.ts` - Integration tests for the search endpoints
- `apps/backend/src/modules/shards/domain/validators/search-validator.ts` - Validates search parameters (minimum length, special characters)
- `apps/backend/src/modules/shards/domain/validators/search-validator.test.ts` - Unit tests for search validation

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `yarn test [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [x] 1.0 Extend Data Transfer Objects (DTOs) and Validation
  - [x] 1.1 Add search parameter to getManyShardsQuerySchema in api-models package
  - [x] 1.2 Create search validator with minimum length validation
  - [x] 1.3 Update FindManyShardsFilter interface to include search parameter
  - [x] 1.4 Add unit tests for search parameter validation
- [x] 2.0 Extend Repository Layer with Database-Level JSON Search
  - [x] 2.1 Update getWhere function to handle search parameter
  - [x] 2.2 Implement JSON search logic for PoseMirror content
  - [x] 2.3 Add search functionality to both findManyShards and findTotalShards methods
  - [x] 2.4 Test the search functionality with sample data
- [x] 3.0 Update Application Service Layer
  - [x] 3.1 Update GetManyShardsUseCase to pass search parameter to repository
  - [x] 3.2 Update GetMyManyShardsUseCase to pass search parameter to repository
  - [x] 3.3 Update ShardsService interface to include search parameter
  - [x] 3.4 Test the updated use cases with search functionality
- [x] 4.0 Update Controller Layer and API Endpoints
  - [x] 4.1 Update ShardsController to handle search parameter in getMany endpoint
  - [x] 4.2 Update MyShardsController to handle search parameter in getMany endpoint
  - [x] 4.3 Add API documentation for search parameter
  - [x] 4.4 Test the API endpoints with search functionality