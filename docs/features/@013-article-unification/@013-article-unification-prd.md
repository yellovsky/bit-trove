# Article Unification PRD

## Introduction/Overview

Currently, the system maintains separate database tables and APIs for "shards" and "blog posts", which are essentially the same content type with different purposes. This creates code duplication, maintenance overhead, API inconsistencies, and makes implementing unified search functionality difficult. This refactoring will unify these entities into a single "Article" system with a type discriminator, simplifying the codebase while maintaining backward compatibility during the transition.

## Goals

1. **Eliminate Code Duplication**: Consolidate shared functionality between shards and blog posts into a single article system
2. **Simplify Database Schema**: Replace separate tables with one unified articles table
3. **Unify API Endpoints**: Create a single `/api/articles` endpoint that handles both content types
4. **Enable Unified Search**: Implement cross-type search functionality across all article types
5. **Maintain Backward Compatibility**: Keep existing systems running during transition period
6. **Prepare for Future Extensibility**: Design system to easily accommodate new article types (news, tutorials, documentation)

## User Stories

1. **As a developer**, I want a unified article system so that I can maintain less code and implement features more efficiently
2. **As a content creator**, I want to search across all content types so that I can find relevant information regardless of whether it's a blog post or shard
3. **As a system administrator**, I want simplified database management so that I can perform operations on all content types through a single interface
4. **As a frontend developer**, I want consistent API patterns so that I can build features that work across all content types
5. **As a user**, I want seamless content discovery so that I can find relevant articles regardless of their type classification

## Functional Requirements

### Database Requirements
1. The system must create a new `articles` table that replaces both `blog_posts` and `shards` tables
2. The articles table must include a `type` field with enum values: "blog_post" | "shard"
3. The articles table must include all shared fields from both existing tables
4. The articles table must support type-specific metadata through a flexible JSON field
5. The system must maintain referential integrity for existing foreign key relationships

### API Requirements
6. The system must provide a unified `/api/articles` endpoint that handles CRUD operations for all article types
7. The API must support filtering by type using query parameters (e.g., `?filter[type]=blog_post`)
8. The API must support filtering by multiple types (e.g., `?type=blog_post&type=shard`)
9. The API must maintain backward compatibility with existing `/api/blog-posts` and `/api/shards` endpoints during transition
10. The API must return consistent response formats for all article types

### Search Requirements
11. The system must implement unified search functionality across all article types
12. Search must support filtering by article type
13. Search must maintain existing search capabilities (title, content, tags, etc.)
14. Search results must include the article type in the response

### Frontend Requirements
15. All frontend components must be updated to use the new unified `/api/articles` endpoint
16. Components must handle the new `type` field in article data structures
17. UI must clearly distinguish between different article types where necessary
18. Search interfaces must support filtering by article type

### Migration Requirements
19. The system must run both old and new systems in parallel during transition
20. Data synchronization must be maintained between old and new systems
21. Migration scripts must be provided to move existing data to the new structure
22. Rollback procedures must be documented and tested

## Non-Goals (Out of Scope)

1. **Content Type Changes**: This refactoring will not change the fundamental nature of blog posts vs shards - they will remain distinct content types
2. **UI/UX Overhaul**: The refactoring focuses on backend unification, not redesigning the user interface
3. **Performance Optimization**: While some performance improvements may occur, this is not the primary goal
4. **New Features**: This refactoring will not add new functionality beyond what currently exists
5. **Third-party Integration Changes**: External integrations will continue to work through backward compatibility

## Design Considerations

### Database Design
- Use a single `articles` table with a `type` discriminator field
- Implement type-specific metadata using a JSON field for flexibility
- Maintain existing indexes and constraints where applicable
- Consider partitioning strategies if the unified table becomes very large

### API Design
- RESTful design following existing patterns
- Consistent error handling and response formats
- Support for bulk operations where beneficial
- Proper HTTP status codes and error messages

### Frontend Considerations
- Update API client libraries to use new endpoints
- Maintain existing component interfaces where possible
- Add type indicators in UI where content type is relevant
- Update routing to handle unified article URLs

## Technical Considerations

### Dependencies
- Must integrate with existing Auth module for authorization
- Must work with existing Prisma ORM setup
- Must maintain compatibility with existing caching layer
- Must preserve existing permission policies

### Performance
- Consider query optimization for type-based filtering
- Implement proper indexing on the `type` field
- Monitor query performance during transition period
- Consider read replicas if needed for high-traffic scenarios

### Security
- Maintain existing authorization rules for different content types
- Ensure type-based access controls are properly enforced
- Validate type field in API requests to prevent unauthorized type changes

## Success Metrics

1. **Code Reduction**: Reduce duplicate code by at least 60% in affected modules
2. **API Consistency**: Achieve 100% consistency in response formats across all article endpoints
3. **Search Performance**: Maintain or improve search response times with unified search
4. **Zero Downtime**: Complete migration without any service interruptions
5. **Developer Productivity**: Reduce time to implement new article-related features by 40%
6. **Error Reduction**: Decrease API-related bugs by 30% due to unified codebase

## Open Questions

1. **Metadata Schema**: What specific metadata fields are unique to each content type that should be stored in the JSON field?
2. **URL Structure**: Should we maintain separate URL patterns for different article types or use a unified structure?
3. **Caching Strategy**: How should we handle caching for the unified article system?
4. **Analytics**: How should we track usage metrics for different article types in the unified system?
5. **Future Types**: What specific requirements should we consider for the planned future article types (news, tutorials, documentation)?
6. **Migration Timeline**: What is the preferred timeline for completing the transition from old to new system?