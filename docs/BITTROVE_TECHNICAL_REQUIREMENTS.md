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
- **Backend**: Layered Architecture (Clean/Hexagonal Architecture) with NestJS
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: Jotai + TanStack Query
- **UI**: Radix UI + Shadcn/ui with TailwindCSS 4.x

### Architectural Layers

#### Frontend (FSD Architecture)
```
app/
├── app/                  # Application core (routing, providers)
├── entities/             # Business entities (blog-posts, shards, tags)
├── features/             # Feature modules (auth, blog-posts, shards, theme, search)
├── pages/               # Route components (Views)
├── shared/              # Shared utilities and configurations
├── widgets/             # Reusable UI blocks
└── server/              # Server-side utilities
```

#### Backend (Layered Architecture)
```
src/
├── modules/              # Feature modules
│   ├── auth/            # Authentication & authorization
│   ├── articles/        # Article management (unified blog-posts and shards)
│   ├── acount/          # Account and profile management
│   ├── tags/            # Tag management
│   ├── casbin/          # RBAC system
│   ├── cache/           # Caching layer
│   ├── i18n/            # Internationalization
│   └── prisma/          # Database access
├── shared/              # Shared utilities and DTOs
└── main.ts              # Application entry point
```

Each module follows layered architecture:
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
- **Error Handling**: Effect monad for functional error handling

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
- **JWT Authentication**: Secure token-based authentication with HTTP-only cookies
- **RBAC System**: Role-based access control with Casbin
- **Multi-provider Support**: Local and OAuth providers (Google support in schema)
- **Session Management**: HTTP-only cookies for security
- **Permission Policies**: Granular permission management
- **Effect-based Error Handling**: Functional error handling with Effect monad

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

#### 10. Backend Architecture
**Status**: ✅ Fully Implemented
- **Layered Architecture**: Consistent implementation across all modules
- **Transaction Management**: Robust transaction handling with Effect monad
- **Error Handling**: Standardized functional error handling
- **Type Safety**: Comprehensive TypeScript usage with proper interfaces
- **Modular Design**: Well-organized modules with clear responsibilities
- **Testing Infrastructure**: Proper test setup with Vitest and Playwright

#### 11. CMS System
**Status**: ✅ Fully Implemented
- **Content Management**: Complete CMS for blog posts and shards
- **Editor Interface**: Rich text editor with TipTap integration
- **Content Workflow**: Draft, publish, and edit workflows
- **SEO Management**: Meta title, description, and keyword management
- **Related Content**: Article relationship management
- **Tag Management**: Tag creation and assignment

### 🚧 Partially Implemented Features

#### 12. Keyboard Navigation (Partial)
**Status**: 🚧 Partially Implemented
- **Editor Keyboard Shortcuts**: TipTap editor with comprehensive keyboard shortcuts
- **Search Keyboard Navigation**: Full keyboard support in search interface
- **Sidebar Toggle**: Keyboard shortcut for sidebar toggle (Cmd/Ctrl + /)
- **Menu Navigation**: Keyboard navigation in editor menus and toolbars
- **Missing**: Global keyboard shortcuts for content creation and navigation

#### 13. Meta-Blog Documentation
**Status**: 🚧 Partially Implemented
- **Current State**: Basic documentation structure exists in `/docs/` directory
- **Missing**: Comprehensive meta-blog content about BitTrove architecture
- **Needed**: Internal links to code, design decisions, architecture choices
- **Required**: Developer-friendly layout for technical documentation

### ❌ Not Yet Implemented Features

#### 14. Advanced Search & Discovery
**Status**: ❌ Not Implemented
- **Graph View**: Zettelkasten-inspired tag relationship visualization
- **Advanced Filtering**: Complex search queries with multiple criteria
- **Content Recommendations**: Related content suggestions
- **Search Analytics**: Search behavior tracking and optimization

#### 15. Developer Experience Features
**Status**: ❌ Not Implemented
- **Global Keyboard Navigation**: Enhanced keyboard shortcuts for content management
- **Offline Support**: PWA capabilities for offline-first experience
- **GitHub Integration**: Sync posts with GitHub repositories
- **RSS Feeds**: RSS feed generation for content syndication

#### 16. Performance & Analytics
**Status**: ❌ Not Implemented
- **Performance Monitoring**: Real-time performance metrics
- **User Analytics**: Content engagement and user behavior tracking
- **SEO Analytics**: Search engine optimization metrics
- **Content Performance**: Individual post/shard performance tracking

#### 17. Advanced Content Features
**Status**: ❌ Not Implemented
- **Content Scheduling**: Scheduled publishing of posts and shards
- **Content Versioning**: Version history and rollback capabilities
- **Bulk Operations**: Bulk edit/delete operations for content management
- **Content Import/Export**: Import from external sources (GitHub, etc.)

#### 18. Security Enhancements
**Status**: ❌ Not Implemented
- **Rate Limiting**: API rate limiting and protection
- **Security Headers**: Comprehensive security headers
- **JWT Refresh Tokens**: Token refresh mechanism with shorter expiration
- **Casbin Security**: Replace eval() with safer condition evaluation

#### 19. Monitoring & Observability
**Status**: ❌ Not Implemented
- **Health Checks**: Database, Redis, and application health endpoints
- **Application Metrics**: Performance and business metrics collection
- **Distributed Tracing**: Request flow tracing and monitoring
- **Alerting**: Automated alerting for system issues

## Revised Implementation Phases

### Phase 1: Security & Production Readiness (High Priority)
**Timeline**: 2-3 months
**Focus**: Security hardening and production deployment preparation

#### Security Hardening
- Replace Casbin eval() with safer condition evaluation
- Implement comprehensive rate limiting
- Add security headers (Helmet.js integration)
- Implement JWT refresh tokens with shorter expiration
- Add token blacklisting for logout

#### Monitoring & Health Checks
- Implement health check endpoints for all system components
- Add application metrics collection
- Set up distributed tracing
- Implement automated alerting

#### Performance Optimization
- Enhance caching strategy with adaptive TTL
- Implement cache warming and invalidation
- Add database connection pooling configuration
- Optimize query performance

### Phase 2: Meta-Blog Enhancement (High Priority)
**Timeline**: 1-2 months
**Focus**: Comprehensive meta-blog documentation

#### Meta-Blog Content Structure
- Create `/meta-blog` route structure with FSD architecture
- Implement comprehensive documentation sections
- Add internal links to code and architecture decisions
- Create developer-friendly documentation layout

#### Technical Documentation
- Architecture overview and design decisions
- Development guidelines and best practices
- API documentation and examples
- Deployment and infrastructure guides

### Phase 3: Advanced Features (Medium Priority)
**Timeline**: 3-4 months
**Focus**: Enhanced user experience and content management

#### Advanced Search & Discovery
- Implement graph view for tag relationships
- Add advanced filtering and search analytics
- Create content recommendation system
- Enhance search result relevance

#### Developer Experience
- Implement global keyboard navigation
- Add offline support with PWA capabilities
- Create GitHub integration for content sync
- Implement RSS feed generation

### Phase 4: Analytics & Performance (Medium Priority)
**Timeline**: 2-3 months
**Focus**: Performance monitoring and analytics

#### Performance Monitoring
- Real-time performance metrics collection
- User behavior analytics
- SEO performance tracking
- Content engagement analytics

#### Advanced Content Features
- Content scheduling and automation
- Version history and rollback capabilities
- Bulk operations for content management
- Import/export functionality

### Phase 5: Future Enhancements (Low Priority)
**Timeline**: Ongoing
**Focus**: Innovation and advanced features

#### Advanced Integrations
- AI-powered content suggestions
- Advanced content analytics
- Social media integration
- Newsletter and email marketing

#### Scalability Features
- Microservices architecture migration
- Advanced caching strategies
- CDN integration
- Global deployment optimization

## Success Metrics

### Technical Metrics
- **Performance**: Page load times < 2 seconds, Core Web Vitals optimization
- **Security**: Zero critical security vulnerabilities, comprehensive security audit
- **Reliability**: 99.9% uptime, comprehensive error monitoring
- **Maintainability**: Code coverage > 80%, comprehensive documentation

### User Experience Metrics
- **Engagement**: Reading time, content consumption patterns
- **Usability**: User satisfaction scores, accessibility compliance
- **Discovery**: Search effectiveness, content discovery rates
- **Retention**: User return rates, content bookmarking

## Risk Assessment

### High Risk Items
1. **Security Vulnerabilities**: Casbin eval() usage, missing rate limiting
2. **Production Readiness**: Lack of monitoring and health checks
3. **Performance**: Basic caching strategy, no performance monitoring

### Medium Risk Items
1. **Scalability**: Limited horizontal scaling preparation
2. **User Experience**: Missing advanced search and discovery features
3. **Developer Experience**: Incomplete meta-blog documentation

### Low Risk Items
1. **Advanced Features**: Nice-to-have features that don't impact core functionality
2. **Future Enhancements**: Long-term improvements and optimizations

## Conclusion

BitTrove has achieved significant progress in core functionality with a robust, well-architected foundation. The focus should now shift to security hardening, monitoring implementation, and meta-blog enhancement to achieve production readiness. The phased approach ensures systematic improvement while maintaining system stability and user experience.