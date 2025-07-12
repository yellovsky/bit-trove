# BitTrove Technical Requirements Document

## Project Overview

BitTrove is a personal programming blog built as a modern full-stack application that serves three primary purposes:

1. **✍️ Long-form Blog Posts**: Standalone posts, series-based content, and tagged articles
2. **🧠 Shards (Fleeting Notes)**: Small, unstructured notes similar to Zettelkasten methodology
3. **📚 Meta-Blog**: Documentation of how BitTrove itself is built and architected

## Architecture Principles

### Current Implementation
The project follows a sophisticated layered architecture that extends beyond traditional MVC:

- **Frontend**: Feature-Sliced Design (FSD) with React Router 7.x
- **Backend**: Domain-Driven Design (DDD) with NestJS
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: Jotai + TanStack Query
- **UI**: Radix UI + Shadcn/ui with TailwindCSS 4.x

### Architectural Layers

#### Frontend (FSD Architecture)
```
app/
├── app/                  # Application core (routing, providers)
├── entities/             # Business entities (blog-posts, shards, tags)
├── features/             # Feature modules (auth, blog-posts, shards, theme)
├── pages/               # Route components (Views)
├── shared/              # Shared utilities and configurations
├── widgets/             # Reusable UI blocks
└── server/              # Server-side utilities
```

#### Backend (DDD Architecture)
```
src/
├── modules/              # Feature modules
│   ├── auth/            # Authentication & authorization
│   ├── blog-posts/      # Blog post management
│   ├── shards/          # Content management
│   ├── tags/            # Tag management
│   ├── casbin/          # RBAC system
│   ├── cache/           # Caching layer
│   ├── i18n/            # Internationalization
│   └── prisma/          # Database access
├── shared/              # Shared utilities and DTOs
└── main.ts              # Application entry point
```

Each module follows DDD layers:
- **Domain**: Entities, value objects, domain services
- **Application**: Use cases, application services
- **Infrastructure**: Repositories, external services
- **Presentation**: Controllers, DTOs

## Technology Stack

### Frontend
- **Framework**: React Router 7.x (file-based routing)
- **Language**: TypeScript 5.8
- **Styling**: TailwindCSS 4.x with custom design system
- **State Management**: Jotai + TanStack Query
- **UI Components**: Radix UI + Shadcn/ui
- **Rich Text**: TipTap editor with JSON content storage
- **Testing**: Vitest + Playwright + Storybook
- **Code Quality**: Biome
- **Internationalization**: i18next

### Backend
- **Framework**: NestJS 11.x
- **Language**: TypeScript 5.8
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT + Passport.js
- **Authorization**: Casbin RBAC
- **Caching**: Redis
- **API Documentation**: Swagger/OpenAPI
- **Logging**: Winston with daily rotation
- **Testing**: Vitest

### Shared Packages
- **API Models**: Shared TypeScript types and Zod schemas
- **UI Package**: Shared React component library
- **TypeScript Config**: Shared TypeScript configuration

## Feature Requirements & Implementation Status

### ✅ Fully Implemented Features

#### 1. Blog Posts Management
**Status**: ✅ Fully Implemented
- **CRUD Operations**: Complete create, read, update, delete functionality
- **Multilingual Support**: i18next integration with locale-based routing
- **Content Workflow**: Draft → published → archived status management
- **SEO Optimization**: Meta titles, descriptions, and slug generation
- **Rich Text Editing**: TipTap editor with JSON content storage
- **Reading Time**: Automatic calculation at 200 words per minute
- **Series Support**: Posts can belong to series with chronological ordering
- **Tag System**: Multiple tags per post with tag cloud and filtering

#### 2. Shards (Notes) Management
**Status**: ✅ Fully Implemented
- **Lightweight Editor**: Markdown-based content with TipTap
- **Quick Creation**: Streamlined creation interface
- **Search & Filter**: Full-text search with reading time filtering
- **Tagging System**: Optional tagging for organization
- **Reading Time**: Automatic calculation and display
- **Publishing Workflow**: Draft/published status management
- **Responsive Design**: Mobile-first approach with infinite scrolling
- **Sorting**: URL-based sorting by date and title with shareable links

#### 3. Authentication & Authorization
**Status**: ✅ Fully Implemented
- **JWT Authentication**: Secure token-based authentication
- **RBAC System**: Role-based access control with Casbin
- **Multi-provider Support**: Local and OAuth providers (Google support in schema)
- **Session Management**: HTTP-only cookies for security
- **Permission Policies**: Granular permission management

#### 4. Content Organization
**Status**: ✅ Fully Implemented
- **Tag System**: Tag cloud, tag filtering, and tag-based navigation
- **Series Management**: Chronological view of posts within series
- **Archive System**: Year/month-based content archiving
- **Search Functionality**: Full-text search across all content
- **Breadcrumb Navigation**: Contextual navigation paths

#### 5. UI/UX Features
**Status**: ✅ Fully Implemented
- **Theme System**: Light/dark mode with CSS variables
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Accessibility**: WCAG AA compliance with Radix UI
- **Internationalization**: Multi-language support with RTL
- **Performance**: Code splitting, lazy loading, and caching

#### 6. Reading Time System
**Status**: ✅ Fully Implemented
- **Shard Reading Time**: Automatic calculation and display for all shards
- **Blog Post Reading Time**: Consistent reading time display for blog posts
- **Calculation Method**: 200 words per minute standard rate
- **Content Extraction**: Reading time calculated from TipTap JSON content, titles, and descriptions
- **Range Support**: Reading time range from 1 minute (minimum) to 999 minutes (maximum)
- **Filtering**: Reading time-based filtering for shards
- **UI Components**: Consistent reading time display across cards and detail pages

#### 7. Content Pages & Navigation
**Status**: ✅ Fully Implemented
- **Blog Posts Page**: SEO-optimized listing with infinite scroll, loading states, and comprehensive meta tags
- **Blog Post Detail Page**: Enhanced detail page with structured layout, reading progress, table of contents, and comprehensive SEO
- **Main Page**: IDE-inspired landing page with curated shards grid and infinite blog posts timeline
- **Shards Page**: Sorting functionality with URL-based state management and FSD architecture
- **Breadcrumb Navigation**: Consistent navigation patterns across all content pages

#### 8. Enhanced Content Features
**Status**: ✅ Fully Implemented
- **Enhanced Code Blocks**: Language specification, file names, and copy functionality
- **Callout TipTap Extension**: Visual highlighting with predefined types (info, warning, danger, etc.)
- **Editor Widget FSD Refactor**: Reorganized editor following FSD principles with improved state management
- **Content Rendering**: PoseDocument component for consistent content display

#### 9. Search System
**Status**: ✅ Fully Implemented
- **Global Search**: Command-style search dialog accessible from header
- **Real-time Search**: Debounced search with 3+ character minimum
- **Multi-content Search**: Search across both blog posts and shards
- **Search Results**: Rich result display with metadata and navigation
- **Keyboard Navigation**: Full keyboard support for search interface
- **Loading States**: Proper loading and error states for search results

#### 10. Keyboard Navigation (Partial)
**Status**: 🚧 Partially Implemented
- **Editor Keyboard Shortcuts**: TipTap editor with comprehensive keyboard shortcuts
- **Search Keyboard Navigation**: Full keyboard support in search interface
- **Sidebar Toggle**: Keyboard shortcut for sidebar toggle (Cmd/Ctrl + /)
- **Menu Navigation**: Keyboard navigation in editor menus and toolbars
- **Missing**: Global keyboard shortcuts for content creation and navigation

### 🚧 Partially Implemented Features

#### 11. Meta-Blog Documentation
**Status**: 🚧 Partially Implemented
- **Current State**: Basic documentation structure exists in `/docs/` directory
- **Missing**: Comprehensive meta-blog content about BitTrove architecture
- **Needed**: Internal links to code, design decisions, architecture choices
- **Required**: Developer-friendly layout for technical documentation

### ❌ Not Yet Implemented Features

#### 12. Advanced Search & Discovery
**Status**: ❌ Not Implemented
- **Graph View**: Zettelkasten-inspired tag relationship visualization
- **Advanced Filtering**: Complex search queries with multiple criteria
- **Content Recommendations**: Related content suggestions
- **Search Analytics**: Search behavior tracking and optimization

#### 13. Developer Experience Features
**Status**: ❌ Not Implemented
- **Global Keyboard Navigation**: Enhanced keyboard shortcuts for content management
- **Offline Support**: PWA capabilities for offline-first experience
- **GitHub Integration**: Sync posts with GitHub repositories
- **RSS Feeds**: RSS feed generation for content syndication

#### 14. Performance & Analytics
**Status**: ❌ Not Implemented
- **Performance Monitoring**: Real-time performance metrics
- **User Analytics**: Content engagement and user behavior tracking
- **SEO Analytics**: Search engine optimization metrics
- **Content Performance**: Individual post/shard performance tracking

#### 15. Advanced Content Features
**Status**: ❌ Not Implemented
- **Content Scheduling**: Scheduled publishing of posts and shards
- **Content Versioning**: Version history and rollback capabilities
- **Bulk Operations**: Bulk edit/delete operations for content management
- **Content Import/Export**: Import from external sources (GitHub, etc.)

## MVC Architecture Mapping

### Model Layer (Backend)
**Current Implementation**: ✅ Complete
- **Domain Models**: `ShardModel`, `BlogPostModel`, `TagModel`
- **Data Access**: Prisma repositories with type-safe queries
- **Business Logic**: Domain services and value objects
- **Validation**: Zod schemas for runtime validation

### View Layer (Frontend)
**Current Implementation**: ✅ Complete
- **Page Components**: Route-based components in `pages/`
- **UI Components**: Reusable components in `shared/ui/`
- **Widgets**: Complex UI blocks in `widgets/`
- **Responsive Design**: Mobile-first with TailwindCSS

### Controller Layer (Backend)
**Current Implementation**: ✅ Complete
- **REST Controllers**: NestJS controllers with proper HTTP methods
- **Request Handling**: DTO validation and transformation
- **Response Formatting**: Consistent API response structure
- **Error Handling**: Structured error responses with i18n

### Service Layer (Extended Architecture)
**Current Implementation**: ✅ Complete
- **Application Services**: Business logic orchestration
- **Domain Services**: Core business rules
- **Infrastructure Services**: External integrations (cache, auth)
- **Use Cases**: Specific business operations

### Repository Layer (Extended Architecture)
**Current Implementation**: ✅ Complete
- **Data Access**: Prisma-based repositories
- **Query Optimization**: Efficient database queries
- **Caching**: Redis integration for performance
- **Migration Management**: Version-controlled schema changes

## Task Breakdown & Implementation Plan

### Phase 1: Meta-Blog Enhancement (Priority: High)
**Timeline**: 2-3 weeks

#### 1.1 Meta-Blog Content Structure
- [ ] Create comprehensive meta-blog section
- [ ] Document BitTrove architecture decisions
- [ ] Add internal links to code and design patterns
- [ ] Implement developer-friendly documentation layout

#### 1.2 Technical Documentation
- [ ] Document DDD implementation patterns
- [ ] Create FSD architecture guide
- [ ] Document API design decisions
- [ ] Add code examples and snippets

#### 1.3 Internal Navigation
- [ ] Add navigation between meta-blog and code
- [ ] Implement code reference links
- [ ] Create architecture diagram integration
- [ ] Add development workflow documentation

### Phase 2: Advanced Search & Discovery (Priority: Medium)
**Timeline**: 3-4 weeks

#### 2.1 Graph Visualization
- [ ] Implement tag relationship graph view
- [ ] Add interactive node-based navigation
- [ ] Create Zettelkasten-inspired linking
- [ ] Add graph filtering and search

#### 2.2 Enhanced Search
- [ ] Implement advanced search queries
- [ ] Add search result highlighting
- [ ] Create search analytics dashboard
- [ ] Add search suggestions and autocomplete

#### 2.3 Content Recommendations
- [ ] Implement related content algorithm
- [ ] Add "similar posts" functionality
- [ ] Create content discovery features
- [ ] Add personalized recommendations

### Phase 3: Developer Experience (Priority: Medium)
**Timeline**: 2-3 weeks

#### 3.1 Global Keyboard Navigation
- [ ] Add keyboard shortcuts for content creation
- [ ] Implement global keyboard navigation
- [ ] Create keyboard shortcut documentation
- [ ] Add accessibility improvements

#### 3.2 GitHub Integration
- [ ] Implement GitHub OAuth integration
- [ ] Add post-to-GitHub sync functionality
- [ ] Create GitHub webhook handling
- [ ] Add repository-based content management

#### 3.3 RSS & Syndication
- [ ] Implement RSS feed generation
- [ ] Add content syndication features
- [ ] Create feed customization options
- [ ] Add social media integration

### Phase 4: Performance & Analytics (Priority: Low)
**Timeline**: 3-4 weeks

#### 4.1 Performance Monitoring
- [ ] Implement real-time performance metrics
- [ ] Add Core Web Vitals tracking
- [ ] Create performance optimization dashboard
- [ ] Add automated performance testing

#### 4.2 User Analytics
- [ ] Implement user behavior tracking
- [ ] Add content engagement metrics
- [ ] Create analytics dashboard
- [ ] Add privacy-compliant tracking

#### 4.3 SEO Analytics
- [ ] Implement SEO metrics tracking
- [ ] Add search engine optimization tools
- [ ] Create SEO performance dashboard
- [ ] Add automated SEO recommendations

### Phase 5: Advanced Content Features (Priority: Low)
**Timeline**: 4-5 weeks

#### 5.1 Content Scheduling
- [ ] Implement scheduled publishing
- [ ] Add content calendar view
- [ ] Create scheduling interface
- [ ] Add notification system

#### 5.2 Content Versioning
- [ ] Implement version history
- [ ] Add rollback capabilities
- [ ] Create diff visualization
- [ ] Add collaborative editing

#### 5.3 Bulk Operations
- [ ] Implement bulk edit functionality
- [ ] Add bulk delete with confirmation
- [ ] Create bulk import/export
- [ ] Add batch processing

## Technical Debt & Maintenance

### Code Quality
- [ ] Increase test coverage to 90%+
- [ ] Implement automated code quality checks
- [ ] Add performance regression testing
- [ ] Create automated dependency updates

### Documentation
- [ ] Complete API documentation
- [ ] Add comprehensive README files
- [ ] Create deployment guides
- [ ] Document troubleshooting procedures

### Security
- [ ] Implement security scanning
- [ ] Add vulnerability monitoring
- [ ] Create security incident response
- [ ] Add penetration testing

## Success Metrics

### User Experience
- **Content Creation**: 90% of users can create content within 5 minutes
- **Search Efficiency**: Users find content within 3 clicks
- **Performance**: Page load times under 2 seconds
- **Accessibility**: WCAG AA compliance maintained

### Technical Performance
- **API Response Time**: < 200ms for CRUD operations
- **Database Performance**: Query optimization and indexing
- **Frontend Performance**: Core Web Vitals optimization
- **Uptime**: 99.9% availability target

### Content Quality
- **SEO Optimization**: 95% of posts have complete metadata
- **Content Completeness**: 90% of posts have reading time
- **Tag Consistency**: 80% of content properly tagged
- **Series Completion**: 85% of series have consistent structure

## Risk Assessment

### Technical Risks
- **Complexity**: DDD/FSD architecture complexity
- **Performance**: Large content volume impact
- **Security**: Authentication and authorization vulnerabilities
- **Scalability**: Database and caching limitations

### Mitigation Strategies
- **Documentation**: Comprehensive architecture documentation
- **Testing**: Extensive automated testing
- **Monitoring**: Real-time performance monitoring
- **Backup**: Regular data backup and recovery procedures

## Conclusion

BitTrove represents a sophisticated implementation of modern web development practices, combining DDD and FSD architectures with a focus on developer experience and content management. The current implementation provides a solid foundation for the remaining features, with clear architectural patterns and established conventions.

The phased implementation plan prioritizes meta-blog enhancement and advanced discovery features, followed by developer experience improvements and performance optimizations. Each phase builds upon the existing architecture while maintaining the established patterns and conventions.

This document serves as both a comprehensive project description for AI-assisted development and a detailed task breakdown for feature implementation, ensuring consistent development practices and architectural integrity throughout the project lifecycle.