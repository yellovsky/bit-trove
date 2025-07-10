# Bit-Trove Project Summary

## Overview

Bit-Trove is a modern full-stack monorepo built with TypeScript, following Domain-Driven Design (DDD) and Feature-Sliced Design (FSD) principles. The project consists of a React Router frontend, NestJS backend, and shared packages for API models and UI components.

## Architecture Principles

### Domain-Driven Design (DDD)
- **Backend**: Follows DDD with clear separation of domain, application, infrastructure, and presentation layers
- **Domain Layer**: Contains business entities, value objects, and domain services
- **Application Layer**: Orchestrates use cases and application services
- **Infrastructure Layer**: Handles external concerns (database, caching, external APIs)
- **Presentation Layer**: Manages HTTP controllers and API endpoints

### Feature-Sliced Design (FSD)
- **Frontend**: Organized by FSD methodology with clear layer separation
- **Layers**: `app/`, `entities/`, `features/`, `shared/`, `widgets/`
- **Features**: Self-contained modules with their own components, hooks, and utilities
- **Entities**: Business domain objects shared across features
- **Shared**: Common utilities, UI components, and configurations

## Monorepo Structure

```
bit-trove/
├── apps/
│   ├── frontend/          # React Router application
│   └── backend/           # NestJS API server
├── packages/
│   ├── api-models/        # Shared API type definitions
│   ├── ui/               # Shared UI component library
│   └── typescript-config/ # Shared TypeScript configuration
└── prds/                 # Product Requirements Documents
```

## Applications

### Frontend (`apps/frontend/`)

**Technology Stack:**
- **Framework**: React Router 7.x (file-based routing)
- **Language**: TypeScript 5.8
- **Styling**: TailwindCSS 4.x with custom design system
- **State Management**: Jotai + TanStack Query
- **UI Components**: Radix UI + Shadcn/ui
- **Rich Text**: TipTap editor with JSON content storage
- **Testing**: Vitest + Playwright + Storybook with browser/server test environments
- **Code Quality**: Biome
- **Internationalization**: i18next

**Key Features:**
- Server-side rendering with React Router
- Client-side navigation with enhanced routing
- Real-time theme switching (light/dark mode)
- Responsive design with mobile-first approach
- Rich text editing capabilities with TipTap
- Blog post management with multilingual support and workflow
- Reading time calculation and display for all content
- Comprehensive testing setup with browser/server environments

**Project Structure:**
```
app/
├── app/                  # Application core (routing, providers)
├── entities/             # Business entities (blog-posts, shards, tags)
├── features/             # Feature modules (auth, blog-posts, shards, theme)
├── pages/               # Route components
├── shared/              # Shared utilities and configurations
├── widgets/             # Reusable UI blocks
└── server/              # Server-side utilities
```

**Routing Structure:**
- File-based routing with React Router
- Locale-based routing (`/:locale/`)
- Nested layouts for CMS and public pages
- Dynamic routes for content (`/shards/:slugOrId`)

### Backend (`apps/backend/`)

**Technology Stack:**
- **Framework**: NestJS 11.x
- **Language**: TypeScript 5.8
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT + Passport.js
- **Authorization**: Casbin RBAC
- **Caching**: Redis
- **API Documentation**: Swagger/OpenAPI
- **Logging**: Winston with daily rotation
- **Testing**: Vitest
- **Code Quality**: Biome

**Architecture:**
```
src/
├── modules/              # Feature modules (DDD layers)
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

**DDD Implementation:**
Each module follows DDD layers:
- **Domain**: Entities, value objects, domain services
- **Application**: Use cases, application services
- **Infrastructure**: Repositories, external services
- **Presentation**: Controllers, DTOs

**Blog Post Module Features:**
- Complete CRUD operations with multilingual support
- Draft/published/archived workflow management
- Slug generation and availability checking
- SEO optimization with meta titles and descriptions
- Reading time calculation and display
- Role-based access control and content ownership

## Shared Packages

### API Models (`packages/api-models/`)

**Purpose**: Shared TypeScript types and Zod schemas for API communication

**Structure:**
```
src/
├── auth/                # Authentication types
├── blog-post/           # Blog post schemas
├── shard/               # Content schemas
├── tag/                 # Tag schemas
├── common/              # Shared types (UUID, dates, responses)
└── permission-policy/   # Authorization types
```

**Key Features:**
- Zod schemas for runtime validation
- TypeScript interfaces for compile-time safety
- Shared between frontend and backend
- Versioned API responses
- Common response patterns

### UI Package (`packages/ui/`)

**Purpose**: Shared React component library with design system

**Technology Stack:**
- **Components**: Radix UI primitives
- **Styling**: TailwindCSS 4.x with organized CSS architecture
- **Icons**: Lucide React
- **State**: Jotai for global state
- **Forms**: React Hook Form
- **Design System**: Shadcn/ui with custom theming

**Structure:**
```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── styles/             # Organized CSS design system
    ├── globals.css     # Main initialization file
    ├── components.palette.css # Component color mappings
    ├── typography.css  # Typography system
    ├── *.palette.css   # Color palette definitions
    └── README.md       # CSS system documentation
```

**CSS Architecture:**
- **Layered Organization**: Clear separation of concerns with Tailwind layers
- **Design Tokens**: Semantic color system with consistent naming
- **Theme Support**: Light/dark mode with CSS variables
- **Typography System**: Comprehensive heading and text styles
- **Color Palettes**: 12-step color scales with alpha variants
- **Component Integration**: Semantic color mappings for UI components

**Key Features:**
- Accessible components built on Radix UI
- Theme-aware components (light/dark mode)
- Responsive design patterns
- Form components with validation
- Toast notifications
- Rich text editor components
- Organized CSS initialization system

## Development Conventions

### Code Style
- **Linting**: Biome for consistent formatting
- **TypeScript**: Strict configuration with no implicit any
- **Naming**: PascalCase for components, camelCase for functions
- **Imports**: Absolute imports with path aliases
- **Testing**: Comprehensive test coverage with Vitest
- **Test Patterns**: Browser tests for components, server tests for backend code
- **Test Setup**: Global test context with i18n and router providers
- **Component Testing**: DOM-based testing with Playwright and JSDOM

### CSS Best Practices
- **Layer Organization**: Use Tailwind's layer system (`@layer theme, base, components, utilities`)
- **Design Tokens**: Use semantic color variables (`--color-primary`, `--color-background`)
- **Theme Support**: Implement light/dark mode with CSS variables
- **Typography**: Use consistent heading hierarchy and spacing
- **Component Colors**: Map semantic colors to design tokens
- **Accessibility**: Maintain WCAG AA contrast ratios
- **Performance**: Minimize CSS bundle size through organization

### File Organization
- **Components**: One component per file with named exports
- **Hooks**: Custom hooks in separate files
- **Types**: Co-located with components or in dedicated type files
- **Utilities**: Shared utilities in `shared/` directories

### State Management
- **Frontend**: Jotai for global state, TanStack Query for server state
- **Backend**: NestJS dependency injection
- **Caching**: Redis for backend, React Query for frontend

### API Design
- **RESTful**: Standard HTTP methods and status codes
- **Versioning**: URI-based versioning (`/api/v1/`)
- **Documentation**: Swagger/OpenAPI with interactive docs
- **Validation**: Zod schemas for request/response validation
- **Error Handling**: Structured error responses with i18n support

### Database Patterns
- **ORM**: Prisma for type-safe database access
- **Migrations**: Version-controlled schema changes
- **Seeding**: Automated data seeding for development
- **Relationships**: Proper foreign key constraints

## Key Features

### Authentication & Authorization
- **JWT-based**: Secure token-based authentication
- **RBAC**: Role-based access control with Casbin
- **Multi-provider**: Support for local and OAuth providers
- **Session Management**: HTTP-only cookies for security

### Content Management
- **Blog Posts**: Complete CRUD operations with multilingual support, draft/published/archived workflow, and SEO optimization
- **Rich Text**: TipTap editor with custom extensions and JSON content storage
- **Markdown**: Support for markdown content
- **Media**: Image and video embedding
- **SEO**: Structured data, meta tags, and reading time metadata

### Reading Time System
- **Automatic Calculation**: Reading time calculated at 200 words per minute for all content
- **Shard Reading Time**: Display reading time on shard cards and detail pages with filtering capabilities
- **Blog Post Reading Time**: Consistent reading time display on blog post cards and pages
- **Range Support**: Reading time range from 1 minute (minimum) to 999 minutes (maximum)
- **Content Extraction**: Reading time calculated from TipTap JSON content, titles, and descriptions

### Content Pages & Navigation
- **Blog Posts Page**: SEO-optimized listing with infinite scroll, loading states, comprehensive meta tags, and URL-based sorting
- **Blog Post Detail Page**: Enhanced detail page with structured layout, reading progress indicator, table of contents, and comprehensive SEO
- **Main Page**: IDE-inspired landing page with curated shards grid and infinite blog posts timeline
- **Shards Page**: Sorting functionality with URL-based state management, FSD architecture, and breadcrumb navigation
- **Breadcrumb Navigation**: Consistent navigation patterns across all content pages

### Enhanced Content Features
- **Enhanced Code Blocks**: Language specification, file names, copy functionality, and syntax highlighting
- **Callout TipTap Extension**: Visual highlighting with predefined types (info, warning, danger, code, success, recommendation)
- **Editor Widget FSD Refactor**: Reorganized editor following FSD principles with improved state management and React Compiler compatibility
- **Content Rendering**: PoseDocument component for consistent content display across editor and viewer

### Internationalization
- **Multi-language**: Support for multiple locales
- **RTL**: Right-to-left language support
- **Dynamic**: Client-side language switching
- **Server-side**: Locale-aware content rendering

### Performance
- **Caching**: Redis for backend, React Query for frontend
- **Code Splitting**: Dynamic imports for route-based splitting
- **Optimization**: Image optimization and lazy loading
- **Monitoring**: Performance metrics and error tracking
- **CSS Performance**: Organized CSS architecture with minimal bundle size

## Development Workflow

### Setup
```bash
# Install dependencies
yarn install

# Setup database
cd apps/backend
yarn prisma generate
yarn prisma migrate dev

# Start development servers
yarn dev  # Frontend
yarn dev  # Backend (in separate terminal)
```

### Testing
```bash
# Frontend tests
cd apps/frontend
yarn test              # Unit tests
yarn test:ui          # Interactive tests
yarn test:cov         # Coverage report

# Backend tests
cd apps/backend
yarn test             # Unit tests
yarn test:cov         # Coverage report
```

**Testing Architecture:**
- **Browser Tests**: Component tests using Playwright with JSDOM environment
- **Server Tests**: Backend and server-side code tests using Node.js environment
- **Test Setup**: `setup.browser.tsx` provides i18n and router context for component testing
- **Test Files**: `.browser.test.tsx` files run in browser environment, `.server.test.tsx` files run in server environment
- **Component Testing**: Components should be tested using browser config as they require DOM access
- **Test Helpers**: Global test context provides `TestWrapper` component and i18n instance for consistent testing

### Building
```bash
# Frontend build
cd apps/frontend
yarn build

# Backend build
cd apps/backend
yarn build
```

## Environment Configuration

### Frontend Environment
```typescript
// apps/frontend/app/env.server.ts
export const serverEnv = {
  API_URL: process.env.API_URL,
  NODE_ENV: process.env.NODE_ENV,
} as const;
```

### Backend Environment
```bash
# apps/backend/.env
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=...
API_PORT=3000
```

## Deployment

### Frontend
- **Platform**: Vercel, Netlify, or similar
- **Build**: Static site generation with React Router
- **Environment**: Runtime environment variables
- **CDN**: Global content delivery network

### Backend
- **Platform**: Docker containers or cloud platforms
- **Database**: Managed PostgreSQL service
- **Cache**: Managed Redis service
- **Monitoring**: Application performance monitoring

## Future Considerations

### Scalability
- **Microservices**: Potential migration to microservices architecture
- **Caching**: Advanced caching strategies with CDN
- **Database**: Read replicas and connection pooling
- **Performance**: GraphQL for efficient data fetching

### Features
- **Real-time**: WebSocket integration for live updates
- **Search**: Full-text search with Elasticsearch
- **Analytics**: User behavior tracking and analytics
- **Notifications**: Push notifications and email alerts

### Technical Debt
- **Dependencies**: Regular security updates and maintenance
- **Performance**: Continuous monitoring and optimization
- **Documentation**: Automated API documentation updates
- **Testing**: Enhanced test coverage and E2E testing

## Contributing

### Code Standards
- Follow established patterns and conventions
- Write comprehensive tests for new features
- Update documentation for API changes
- Use conventional commits for version control

### Review Process
- Automated linting and type checking
- Manual code review for architectural decisions
- Performance testing for critical paths
- Security review for authentication changes

This summary serves as a comprehensive guide for AI-assisted development, providing context about the project's architecture, patterns, and conventions to enable effective code generation and modification.