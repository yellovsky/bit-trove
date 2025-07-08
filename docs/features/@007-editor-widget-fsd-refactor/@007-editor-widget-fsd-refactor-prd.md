# Editor Widget FSD Refactoring - Product Requirements Document

## Introduction/Overview

The current editor widget in `apps/frontend/app/widgets/editor/` needs to be refactored to follow Feature-Sliced Design (FSD) principles while maintaining its functionality as a TipTap-based rich text editor. The refactoring will reorganize the internal structure to improve maintainability, testability, and adherence to FSD architecture patterns, while keeping it as a widget layer component.

**Problem**: The current editor widget has a flat structure that doesn't follow FSD principles, making it difficult to maintain, test, and extend. The code organization doesn't clearly separate concerns between UI components, business logic, and utilities.

**Goal**: Reorganize the editor widget internally to follow FSD principles with clear separation of concerns, improved state management, and better testing patterns while maintaining all existing functionality.

## Goals

1. **Reorganize Internal Structure**: Transform the flat editor widget structure into a well-organized FSD-compliant internal architecture
2. **Improve State Management**: Create editor-specific state management patterns that work properly with React Compiler
3. **Enhance Testability**: Implement FSD-specific testing patterns for better component and integration testing
4. **Maintain Functionality**: Preserve all existing editor features including rich text editing, code blocks, links, and color highlighting
5. **Enforce FSD Import Rules**: Implement strict import rules allowing only imports from shared and upward layers
6. **Optimize React Compiler Compatibility**: Ensure all TipTap editor methods work properly with React Compiler using the useEditorSync hook

## User Stories

1. **As a developer**, I want the editor widget to follow FSD principles so that I can easily understand, maintain, and extend the codebase
2. **As a developer**, I want clear separation between UI components, business logic, and utilities so that I can modify specific parts without affecting others
3. **As a developer**, I want proper state management patterns so that the editor works correctly with React Compiler
4. **As a developer**, I want comprehensive testing patterns so that I can confidently make changes and catch regressions
5. **As a developer**, I want strict import rules so that I can maintain clean architecture and avoid circular dependencies

## Functional Requirements

### 1. Internal FSD Structure
The editor widget must be reorganized with the following internal structure:
```
widgets/editor/
├── ui/                    # React components
│   ├── Editor.tsx        # Main editor component
│   ├── Toolbar/          # Toolbar components
│   ├── Buttons/          # Editor buttons
│   ├── Popovers/         # Editor popovers
│   └── index.ts          # Public API
├── model/                # State management and business logic
│   ├── store/            # Editor state store
│   ├── hooks/            # Custom editor hooks
│   ├── services/         # Editor services
│   └── index.ts          # Public API
├── lib/                  # Editor-specific utilities
│   ├── tiptap-utils.ts   # TipTap utilities
│   ├── shortcuts.ts      # Keyboard shortcuts
│   └── index.ts          # Public API
├── config/               # Editor configuration
│   ├── extensions.ts     # TipTap extensions
│   ├── languages.ts      # Language options
│   └── index.ts          # Public API
├── types.ts              # Editor type definitions
└── index.ts              # Widget public API
```

### 2. State Management Patterns
The editor must implement editor-specific state management patterns:
- Create a dedicated editor store using Jotai atoms for editor state
- Implement useEditorSync hook for React Compiler compatibility
- Separate UI state from editor content state
- Provide clear state update patterns for all editor operations

### 3. Component Organization
The editor components must be organized by responsibility:
- **UI Components**: Pure React components for rendering
- **Container Components**: Components that manage state and logic
- **Feature Components**: Specialized components for specific editor features
- **Shared Components**: Reusable components within the editor

### 4. Testing Patterns
The editor must implement FSD-specific testing patterns:
- **Unit Tests**: Test individual components and utilities
- **Integration Tests**: Test component interactions
- **Feature Tests**: Test complete editor features
- **Browser Tests**: Test editor in browser environment
- **Test Utilities**: Provide test helpers for editor testing

### 5. Import Rules
The editor must follow strict FSD import rules:
- Only import from `shared/` layer for utilities and UI components
- Only import from upward layers (widgets, pages, app)
- No imports from other features or entities
- Clear public API through index.ts files

### 6. React Compiler Compatibility
The editor must ensure React Compiler compatibility:
- Use useEditorSync hook for all TipTap editor method calls
- Avoid direct editor method calls that don't work with React Compiler
- Implement proper state synchronization patterns
- Test all editor functionality with React Compiler enabled

### 7. Plugin Architecture
The editor must support a hybrid plugin architecture:
- **Core Editor**: Basic text editing functionality
- **Plugin Features**: Extensible features for code blocks, links, highlighting
- **Plugin Registration**: Clear plugin registration and management
- **Plugin Isolation**: Plugins should be isolated and independently testable

### 8. Performance Optimization
The editor must maintain performance after refactoring:
- Lazy load editor features when possible
- Optimize re-renders with proper state management
- Maintain existing performance characteristics
- Profile and optimize critical editor operations

## Non-Goals (Out of Scope)

1. **Moving to Features Layer**: The editor will remain in the widgets layer
2. **Creating New Entities**: No new entities will be created for editor data
3. **Changing External API**: The public API of the editor widget will remain the same
4. **Rewriting TipTap Integration**: The existing TipTap integration will be preserved
5. **Changing Styling**: The existing CSS and styling will remain unchanged
6. **Adding New Features**: This refactoring focuses on structure, not new functionality
7. **Changing Build Process**: No changes to the build or bundling process

## Design Considerations

### Component Design
- Follow compound component patterns for complex editor components
- Use render props or children patterns for flexible component composition
- Implement proper prop interfaces with TypeScript
- Ensure accessibility compliance for all editor components

### State Design
- Use atomic state management with Jotai
- Separate concerns between UI state and editor content
- Implement proper state persistence patterns
- Provide clear state update APIs

### Plugin Design
- Use a registry pattern for plugin management
- Implement plugin lifecycle hooks
- Provide clear plugin API contracts
- Ensure plugin isolation and error boundaries

## Technical Considerations

### React Compiler Compatibility
- All TipTap editor method calls must go through useEditorSync hook
- Avoid direct editor.isActive() calls that don't work with React Compiler
- Implement proper state synchronization for editor operations
- Test all editor functionality with React Compiler enabled

### FSD Architecture
- Follow strict layer separation within the widget
- Implement clear public APIs through index.ts files
- Use proper import/export patterns
- Maintain widget layer responsibilities

### Testing Strategy
- Implement comprehensive test coverage for all editor components
- Use browser tests for DOM-dependent functionality
- Create test utilities for common editor testing patterns
- Ensure tests work with React Compiler

### Performance Requirements
- Maintain existing editor performance characteristics
- Optimize re-renders through proper state management
- Implement lazy loading for non-critical features
- Profile editor operations and optimize bottlenecks

## Success Metrics

1. **Code Organization**: 100% of editor code follows FSD internal structure
2. **Import Compliance**: 0 violations of FSD import rules
3. **Test Coverage**: Maintain or improve existing test coverage
4. **React Compiler**: All editor functionality works with React Compiler enabled
5. **Performance**: No performance regression compared to current implementation
6. **Functionality**: All existing editor features work exactly as before
7. **Developer Experience**: Improved code maintainability and developer productivity

## Open Questions

1. **Plugin API Design**: What should be the exact API contract for editor plugins?
2. **State Persistence**: How should editor state be persisted across sessions?
3. **Error Boundaries**: What error handling patterns should be implemented for plugins?
4. **Performance Monitoring**: What metrics should be tracked for editor performance?
5. **Migration Timeline**: What is the expected timeline for completing this refactoring?
6. **Rollback Strategy**: What is the plan if issues arise during the big-bang refactor?

## Implementation Notes

### Migration Strategy
- Big-bang refactor approach - move everything at once
- Create new FSD structure alongside existing code
- Switch over when new structure is complete and tested
- Remove old structure after successful migration

### Risk Mitigation
- Comprehensive testing before and after refactoring
- Feature parity validation
- Performance benchmarking
- React Compiler compatibility testing
- Rollback plan in case of issues

### Quality Assurance
- Code review for FSD compliance
- Testing with React Compiler enabled
- Performance regression testing
- Accessibility testing
- Cross-browser compatibility testing