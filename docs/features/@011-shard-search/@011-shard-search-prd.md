# Product Requirements Document: Shard Search Feature

## Introduction/Overview

The Shard Search feature adds text-based search functionality to the existing `getMany` shards endpoints, allowing users to find shards by searching through their titles and content. This feature enhances content discovery by enabling users to quickly locate relevant shards based on text content rather than relying solely on tags or manual browsing.

**Problem Statement**: Users currently have limited ways to find specific shards beyond browsing by tags or chronological order. There's no way to search for shards containing specific text or concepts.

**Goal**: Implement a fast, reliable search mechanism that allows users to find shards by searching text content in both titles and shard content.

## Goals

1. **Enable Text-Based Discovery**: Allow users to find shards by searching for specific words or phrases in titles and content
2. **Maintain Performance**: Ensure search queries are efficient and don't significantly impact response times
3. **Preserve Existing Functionality**: Integrate search seamlessly with existing pagination, filtering, and sorting
4. **Support Multiple Use Cases**: Work for both public shard discovery and personal shard management
5. **Provide Consistent Results**: Return search results in the same format as existing endpoints

## User Stories

1. **As a content consumer**, I want to search for shards about specific topics so that I can quickly find relevant content without browsing through all available shards.

2. **As a content creator**, I want to search through my own shards so that I can quickly locate and reference previous work or avoid duplicating content.

3. **As a researcher**, I want to search for shards containing specific technical terms so that I can find related knowledge and insights.

4. **As a developer**, I want to search for shards about specific technologies or concepts so that I can learn from existing content and examples.

## Functional Requirements

### 1. Search Query Parameter
- The system must accept a new query parameter `search` on existing `getMany` shards endpoints
- The search parameter must be optional and not break existing functionality when not provided
- The search parameter must accept string values with a minimum length of 3 characters

### 2. Search Scope
- The system must search through shard titles (case-insensitive)
- The system must search through shard content stored in PoseMirror JSON format
- The system must specifically search within Text nodes of the PoseMirror content
- The system must NOT search through shard tags

### 3. Search Behavior
- The system must perform case-insensitive searches
- The system must support partial word matching (e.g., "react" matches "React.js", "reactive")
- The system must support multiple word searches (e.g., "react hooks" finds shards containing both "react" and "hooks")
- The system must return shards that match ANY of the search terms (OR logic)

### 4. Result Integration
- The system must integrate search results with existing pagination parameters
- The system must integrate search results with existing filtering parameters
- The system must respect existing sorting parameters for result ordering
- The system must return results in the same format as existing endpoints

### 5. Performance Requirements
- The system must implement a minimum search term length of 3 characters
- The system must return results within acceptable response times (< 500ms for typical queries)
- The system must handle search queries without significantly impacting other endpoint performance

### 6. Endpoint Coverage
- The system must implement search functionality for public shards endpoint
- The system must implement search functionality for user's own shards endpoint
- Both endpoints must maintain their existing authorization and access controls

### 7. Error Handling
- The system must return appropriate error responses for search terms shorter than 3 characters
- The system must handle special characters in search terms gracefully
- The system must return empty results (not errors) when no matches are found

## Non-Goals (Out of Scope)

1. **Advanced Search Operators**: No support for quotes, boolean operators, or complex search syntax
2. **Search Result Highlighting**: No highlighting of matched terms in returned content
3. **Search Suggestions/Autocomplete**: No search suggestions or autocomplete functionality
4. **Search Analytics**: No tracking or analytics of search behavior
5. **Search Result Caching**: No caching of search results
6. **Full-Text Search Indexing**: No implementation of specialized search indexing (may be considered later)
7. **Search in Tags**: No searching through shard tags
8. **Search Result Ranking**: No relevance-based ranking beyond existing sort parameters
9. **Search Result Snippets**: No preview snippets showing where matches were found

## Design Considerations

### API Design
- Add `search` query parameter to existing endpoints:
  - `GET /api/v1/shards?search=react`
  - `GET /api/v1/shards/my?search=typescript`
- Maintain backward compatibility with existing query parameters
- Follow existing API response patterns and error handling

### Database Considerations
- Implement search using SQL LIKE or ILIKE operators for initial implementation
- Consider full-text search indexing (PostgreSQL tsvector) for future performance optimization
- Ensure search queries are optimized to avoid full table scans

### Content Parsing
- Parse PoseMirror JSON content to extract text from Text nodes
- Handle nested content structures appropriately
- Ensure proper handling of malformed JSON content

## Technical Considerations

### Backend Implementation
- Extend existing shard repository methods to support search functionality
- Implement search logic in the application service layer
- Add search validation and sanitization
- Ensure proper integration with existing DDD patterns

### Database Queries
- Use parameterized queries to prevent SQL injection
- Implement efficient search queries that work with existing indexes
- Consider adding database indexes for search performance

### Error Handling
- Implement proper validation for search parameters
- Handle database query errors gracefully
- Provide meaningful error messages for invalid search terms

## Success Metrics

1. **Functionality**: Search returns relevant results for valid search terms
2. **Performance**: Search queries complete within 500ms for typical use cases
3. **Integration**: Search works seamlessly with existing pagination, filtering, and sorting
4. **Reliability**: Search functionality doesn't break existing endpoint behavior
5. **Coverage**: Search works for both public and private shard endpoints

## Open Questions

1. **Search Algorithm**: Should we implement exact phrase matching or fuzzy matching for better results?
2. **Performance Monitoring**: How should we monitor search performance and identify optimization opportunities?
3. **Future Enhancements**: What search features should be prioritized for future iterations?
4. **Testing Strategy**: How should we test search functionality to ensure comprehensive coverage?
5. **Documentation**: What level of API documentation is needed for the search feature?

## Implementation Notes

### Priority
This feature is marked as **high priority** and should be implemented as soon as possible to improve user experience and content discovery.

### Dependencies
- No external dependencies required
- Leverages existing shard infrastructure and data models
- Integrates with existing authentication and authorization systems

### Testing Requirements
- Unit tests for search logic and validation
- Integration tests for API endpoints with search functionality
- Performance tests to ensure search response times
- Edge case testing for special characters and malformed content