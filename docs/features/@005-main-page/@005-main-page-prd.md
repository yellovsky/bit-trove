# Main Page Implementation PRD

## Introduction/Overview

The main page (`@/home`) serves as the primary landing page for BitTrove, providing users with immediate access to the latest content through two distinct sections: a curated horizontal grid of recent shards and an infinite timeline of blog posts. The page follows an IDE-inspired design aesthetic while maintaining the existing theme system and provides comprehensive SEO optimization with dynamic meta tags based on latest content.

## Goals

1. **Content Discovery**: Provide immediate access to the latest shards and blog posts
2. **SEO Optimization**: Implement comprehensive meta tags and structured data for search engine visibility
3. **Performance**: Ensure fast loading with server-side rendering and optimized client-side pagination
4. **Responsive Design**: Maintain consistent layout across devices with appropriate mobile adaptations
5. **User Experience**: Create an intuitive, IDE-like interface that encourages content exploration

## User Stories

1. **As a visitor**, I want to see the latest content immediately when I visit the main page so that I can discover new shards and blog posts without navigating elsewhere.

2. **As a content consumer**, I want to see a curated selection of recent shards in a horizontal grid so that I can quickly browse through the latest notes and insights.

3. **As a blog reader**, I want to scroll through an infinite timeline of blog posts so that I can continuously discover new long-form content without page interruptions.

4. **As a mobile user**, I want the layout to adapt responsively so that I can comfortably browse content on my device.

5. **As a search engine**, I want comprehensive meta tags and structured data so that I can properly index and display the page content in search results.

## Functional Requirements

### 1. Page Structure and Layout
1. The page must display two main sections: Shards Grid and Blog Posts Timeline
2. The Shards Grid must appear above the Blog Posts Timeline
3. The layout must be responsive with appropriate grid adjustments for mobile devices
4. The page must use the existing theme system for colors and styling

### 2. Shards Section
1. The section must display 6-8 recent shards in a horizontal grid layout
2. The number of displayed shards must be configurable via props or constants
3. The section must have a dedicated header with title and "See All" button
4. The "See All" button must link to the existing shards page (`@/shards`)
5. On mobile devices, the horizontal grid must become a vertical list
6. Shards must be loaded server-side for optimal performance
7. The section must use the existing `ShardHorizontalCard` component

### 3. Blog Posts Timeline
1. The timeline must display blog posts in chronological order (most recent first)
2. The timeline must implement infinite scroll functionality
3. The initial page must be server-rendered with the first set of blog posts
4. Subsequent pages must be loaded client-side via API calls
5. The timeline must use the existing `BlogPostCard` component
6. The pagination must follow the same pattern as the blog page (`@/blog`)

### 4. SEO Implementation
1. The page must include dynamic meta title and description based on latest content
2. The page must include Open Graph tags for social media sharing
3. The page must include Twitter Card tags for Twitter sharing
4. The page must include structured data (JSON-LD) for search engines
5. All static strings must be localized using the existing i18n system
6. Meta tags must be static for page-specific content (title, description, keywords)
7. Meta tags must be dynamic for content-related information when applicable

### 5. Component Reusability
1. The section header component must be extracted and reused from the blog posts page
2. The extracted component must support title and action button configuration
3. The component must be placed in the shared UI components for reusability

### 6. Performance Requirements
1. Initial page load must be server-rendered for optimal SEO and performance
2. Shards section must load with the initial page render
3. Blog posts timeline must support client-side pagination after initial load
4. The page must maintain fast loading times (< 2 seconds)

### 7. Responsive Design
1. The layout must maintain the same structure on mobile (shards above blog posts)
2. The horizontal shards grid must become a vertical list on mobile devices
3. All components must be responsive and accessible
4. Touch interactions must be optimized for mobile devices

## Non-Goals (Out of Scope)

1. **Content Filtering**: No filtering options on the main page (filters available on dedicated pages)
2. **Cross-linking**: No cross-linking between shards and blog posts sections
3. **Search Functionality**: No search implementation on the main page
4. **Content Scheduling**: No scheduled content display logic
5. **User Preferences**: No personalized content based on user preferences
6. **Advanced Analytics**: No detailed analytics tracking beyond basic page views

## Design Considerations

### IDE-Inspired Design
- Use existing theme system for colors and styling
- Maintain consistent design language with the rest of the application
- Ensure proper contrast and accessibility compliance
- Use appropriate spacing and typography for readability

### Component Architecture
- Extract reusable section header component from blog posts page
- Maintain FSD architecture principles
- Use existing UI components from the shared library
- Ensure proper TypeScript typing throughout

### Responsive Behavior
- Desktop: Horizontal shards grid with infinite blog posts timeline
- Tablet: Adapted grid with responsive adjustments
- Mobile: Vertical shards list with infinite blog posts timeline

## Technical Considerations

### Server-Side Rendering
- Implement server-side data loading for initial page content
- Use existing data loading patterns from other pages
- Ensure proper error handling for server-side rendering

### Client-Side Pagination
- Implement infinite scroll for blog posts timeline
- Use existing API patterns and TanStack Query
- Handle loading states and error scenarios

### SEO Implementation
- Use Next.js head management for meta tags
- Implement structured data following schema.org guidelines
- Ensure proper Open Graph and Twitter Card implementation
- Use i18n for all static strings

### Performance Optimization
- Implement proper caching strategies
- Use code splitting for non-critical components
- Optimize images and assets
- Monitor Core Web Vitals

## Success Metrics

### User Experience
- Page load time under 2 seconds
- Infinite scroll performs smoothly without lag
- Mobile responsiveness scores above 90%
- Accessibility compliance (WCAG AA)

### SEO Performance
- All meta tags properly implemented
- Structured data validation passes
- Social media sharing displays correctly
- Search engine indexing successful

### Content Discovery
- Users can view 6-8 shards immediately
- Infinite scroll provides seamless content browsing
- "See All" button leads to proper shards page
- No broken links or navigation issues

### Technical Performance
- Server-side rendering works correctly
- Client-side pagination functions properly
- No console errors or warnings
- Responsive design works across all devices

## Open Questions

1. **Shards Count Configuration**: Should the number of displayed shards be a constant or a configurable prop? If prop, where should it be defined?

2. **Section Header Component**: What should be the exact API for the extracted section header component? Should it support different button variants?

3. **Meta Tag Content**: What specific content should be used for dynamic meta tags? Should it include the latest blog post title, or a generic description?

4. **Error Handling**: How should the page handle scenarios where no shards or blog posts are available?

5. **Loading States**: Should there be skeleton loaders for the shards section, or only for the blog posts timeline?

6. **Caching Strategy**: What caching strategy should be used for the server-side rendered content?

7. **Analytics Integration**: Should basic page view analytics be included, or is this out of scope?

8. **Accessibility**: Are there any specific accessibility requirements beyond WCAG AA compliance?