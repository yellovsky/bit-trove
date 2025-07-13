# Article Unification Tasks

## Relevant Files

- `apps/backend/prisma/schema/article.prisma` - New unified article schema that combines blog posts and shards
- `apps/backend/prisma/schema/language.prisma` - Updated to include Article relation
- `apps/backend/prisma/schema/account.prisma` - Updated to include Article and ArticleEntry relations
- `apps/backend/prisma/schema/tag.prisma` - Updated to include ArticleTag relation
- `apps/backend/prisma/schema/migrations/20250712132218_add_unified_articles_table/migration.sql` - Database migration for new articles table
- `apps/backend/prisma/schema/migrations/20250712132543_add_article_indexes/migration.sql` - Database indexes for optimal query performance
- `apps/backend/scripts/migrate-to-articles.ts` - Data migration script to populate articles table from existing blog_posts and shards

## Tasks

- [x] 1.0 Database Schema Refactoring
  - [x] 1.1 Create unified Article schema with type discriminator field
  - [x] 1.2 Create database migration for new articles table
  - [x] 1.3 Create data migration script to populate articles table from existing blog_posts and shards
  - [x] 1.4 Add database indexes for optimal query performance
- [ ] 2.0 Backend API Unification
  - [x] 2.1 Implement unified articles API: get many
  - [x] 2.2 Implement unified articles API: get one
  - [x] 2.3 Implement unified articles API: create
  - [x] 2.4 Implement unified articles API: update
  - [x] 2.5 Implement unified articles API: check slug availability
- [x] 3.0 Frontend Component Updates
  - [x] 3.1 Create unified articles API functions
  - [x] 3.2 Create unified article card component
  - [x] 3.3 Create unified article search result component
  - [x] 3.4 Update search command to use unified articles API
- [x] 4.0 Search System Integration
  - [x] 4.1 Update articles repository with comprehensive search functionality
  - [x] 4.2 Add count method for pagination support
  - [x] 4.3 Update articles use case to return paginated results
  - [x] 4.4 Update articles controller to handle search parameters
- [x] 5.0 Migration and Deployment
  - [x] 5.1 Create data migration script
  - [x] 5.2 Create deployment guide
  - [x] 5.3 Document rollback procedures
  - [x] 5.4 Document monitoring and verification steps