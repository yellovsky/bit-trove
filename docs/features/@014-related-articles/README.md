# Related Articles Feature

## Overview

The Related Articles feature provides a comprehensive system for managing and displaying relationships between articles in the BitTrove platform. It supports bidirectional relations with different types and efficient querying for content discovery.

## Features

- **Bidirectional Relations**: Articles can be related in both directions (source/target)
- **Multiple Relation Types**: Support for "related" and "furtherReading" relation types
- **Extensible Design**: Easy to add new relation types in the future
- **Efficient Querying**: Optimized database queries with proper indexing
- **Frontend Integration**: Seamless integration with blog posts and shards pages
- **Read Operations**: Focused on retrieving related articles (create/delete via database operations)

## Architecture

### Database Schema

The feature uses a dedicated `article_relations` table with the following structure:

```sql
CREATE TABLE article_relations (
  id TEXT PRIMARY KEY DEFAULT uuid(),
  source_id TEXT NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  target_id TEXT NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  relation_type TEXT NOT NULL DEFAULT 'related',
  order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(source_id, target_id, relation_type)
);

-- Indexes for performance
CREATE INDEX article_relations_source_id_idx ON article_relations(source_id);
CREATE INDEX article_relations_target_id_idx ON article_relations(target_id);
CREATE INDEX article_relations_relation_type_idx ON article_relations(relation_type);
CREATE INDEX article_relations_source_id_relation_type_idx ON article_relations(source_id, relation_type);
CREATE INDEX article_relations_target_id_relation_type_idx ON article_relations(target_id, relation_type);
CREATE INDEX article_relations_source_id_order_idx ON article_relations(source_id, order);
CREATE INDEX article_relations_target_id_order_idx ON article_relations(target_id, order);
```

### Backend Structure

The backend follows a clean architecture pattern:

- **Domain Layer**: `ArticleWithRelationModel` with business logic
- **Infrastructure Layer**: Prisma repository implementation
- **Application Layer**: Service layer and use cases
- **Presentation Layer**: REST API endpoint in main articles controller

### Frontend Structure

The frontend is organized using Feature-Sliced Design:

- **Entities**: API client and data models
- **Features**: UI components and business logic
- **Widgets**: Reusable component compositions
- **Pages**: Integration with existing pages

## API Endpoints

### Get Related Articles
```
GET /v1/articles/{articleId}/related
```

**Query Parameters:**
- `locale` (required): Language locale (e.g., 'en')
- `filter.related_to` (optional): Filter by specific article ID

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "article": {
        "id": "uuid",
        "title": "Article Title",
        "slug": "article-slug",
        "publishedAt": "2024-01-01T00:00:00Z",
        "readingTime": 5,
        "shortDescription": "Article description"
      },
      "relationType": "related",
      "direction": "source",
      "order": 1
    }
  ]
}
```

## Frontend Components

### RelatedArticles Component

The main component for displaying related articles:

```tsx
<RelatedArticles
  articleId="article-uuid"
  className="custom-class"
/>
```

**Props:**
- `articleId`: ID of the article to get relations for
- `className`: Additional CSS classes

### Features

- **Loading States**: Skeleton loading indicators
- **Error Handling**: Graceful error display
- **Empty States**: User-friendly empty state messages
- **Responsive Design**: Mobile-first responsive layout
- **Accessibility**: Proper ARIA labels and semantic HTML
- **Lazy Loading**: Intersection observer for performance optimization

## Integration Points

### Blog Post Pages
Related articles are displayed in two locations:
1. **Sidebar**: Compact list of related articles with lazy loading
2. **Bottom Section**: Full-width section with more details

### Shard Pages
Similar integration as blog posts with sidebar and bottom sections.

## Usage Examples

### Basic Usage
```tsx
import { RelatedArticles } from '@features/articles/ui/RelatedArticles';

function BlogPostPage({ articleId }) {
  return (
    <div>
      {/* Article content */}
      <RelatedArticles articleId={articleId} />
    </div>
  );
}
```

### Widget Integration
```tsx
import { RelatedArticles } from '@widgets/blog-post-sidebar/RelatedArticles';

function BlogPostSidebar({ articleId }) {
  return (
    <aside>
      <RelatedArticles articleId={articleId} className="space-y-3" />
    </aside>
  );
}
```

## Configuration

### Relation Types
Currently supported relation types:
- `related`: General related articles
- `furtherReading`: Articles for further reading

To add new relation types:
1. Update the database schema
2. Update the API models
3. Update the frontend types and components

### Seeding
Article relations are seeded via the database seeder:

```typescript
// apps/backend/scripts/seed/article-relations/index.ts
export const articleRelationsSeeder = {
  clear: async (tx: PrismaClient) => {
    await tx.articleRelation.deleteMany();
  },
  seed: async (tx: PrismaClient) => {
    // Create sample relations
  },
};
```

## Testing

### Backend Tests
- Unit tests for models, repository, and service layers
- Integration tests for API endpoints
- Database migration tests

### Frontend Tests
- Component rendering tests
- API integration tests
- User interaction tests

Run tests with:
```bash
# Backend tests
cd apps/backend && npm test

# Frontend tests
cd apps/frontend && npm test
```

## Performance Considerations

- **Database Indexing**: Proper indexes on `source_id`, `target_id`, and `relation_type`
- **Optimized Queries**: Efficient queries to avoid N+1 problems
- **React Query Caching**: Caching for API responses
- **Lazy Loading**: Intersection observer for better UX
- **Suspense Boundaries**: Proper loading states

## Current Limitations

- **No Pagination**: Related articles are returned in a single response
- **No CRUD API**: Create/delete operations are done via database operations
- **No Filtering**: Limited filtering options in the current implementation
- **No Bulk Operations**: No support for bulk relation management

## Future Enhancements

- **Weighted Relations**: Support for relation weights/strengths
- **Automatic Suggestions**: AI-powered article relation suggestions
- **Bulk Operations**: Batch create/delete operations
- **Analytics**: Track relation usage and effectiveness
- **Visual Editor**: UI for managing article relations
- **Pagination**: Support for articles with many relations
- **Advanced Filtering**: Filter by relation type, date, etc.
- **CRUD API**: Full API endpoints for relation management

## Troubleshooting

### Common Issues

1. **Missing Relations**: Ensure both source and target articles exist
2. **Duplicate Relations**: Check for unique constraint violations
3. **Performance Issues**: Verify database indexes are in place
4. **Frontend Errors**: Check API response format matches expected schema

### Debug Mode
Enable debug logging by setting the appropriate environment variables in the backend configuration.

## Contributing

When contributing to this feature:

1. Follow the existing code patterns and architecture
2. Add appropriate tests for new functionality
3. Update documentation for any API changes
4. Ensure backward compatibility when possible
5. Follow the project's coding standards and conventions