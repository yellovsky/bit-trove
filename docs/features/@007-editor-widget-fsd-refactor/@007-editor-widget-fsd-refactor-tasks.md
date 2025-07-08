# Editor Widget FSD Refactoring - Task List

## Relevant Files

- `apps/frontend/app/widgets/editor/ui/Editor.tsx` - Main editor component following FSD structure
- `apps/frontend/app/widgets/editor/ui/Editor.browser.test.tsx` - Browser tests for main editor component
- `apps/frontend/app/widgets/editor/ui/Toolbar/Toolbar.tsx` - Toolbar component with FSD organization
- `apps/frontend/app/widgets/editor/ui/Toolbar/Toolbar.browser.test.tsx` - Browser tests for toolbar component
- `apps/frontend/app/widgets/editor/ui/Buttons/` - Directory containing all editor button components
- `apps/frontend/app/widgets/editor/ui/Popovers/` - Directory containing all editor popover components
- `apps/frontend/app/widgets/editor/model/store/editor-store.ts` - Jotai-based editor state store
- `apps/frontend/app/widgets/editor/model/store/editor-store.test.ts` - Unit tests for editor store
- `apps/frontend/app/widgets/editor/model/hooks/use-editor-sync.ts` - Enhanced useEditorSync hook for React Compiler
- `apps/frontend/app/widgets/editor/model/hooks/use-editor-sync.test.ts` - Unit tests for useEditorSync hook
- `apps/frontend/app/widgets/editor/model/services/editor-service.ts` - Editor business logic services
- `apps/frontend/app/widgets/editor/model/services/editor-service.test.ts` - Unit tests for editor services
- `apps/frontend/app/widgets/editor/lib/tiptap-utils.ts` - TipTap utility functions
- `apps/frontend/app/widgets/editor/lib/tiptap-utils.test.ts` - Unit tests for TipTap utilities
- `apps/frontend/app/widgets/editor/lib/shortcuts.ts` - Keyboard shortcut utilities
- `apps/frontend/app/widgets/editor/lib/shortcuts.test.ts` - Unit tests for keyboard shortcuts
- `apps/frontend/app/widgets/editor/config/extensions.ts` - TipTap extensions configuration
- `apps/frontend/app/widgets/editor/config/languages.ts` - Language options configuration
- `apps/frontend/app/widgets/editor/types.ts` - Editor type definitions
- `apps/frontend/app/widgets/editor/index.ts` - Widget public API exports
- `apps/frontend/app/widgets/editor/Editor.css` - Editor styles (moved to ui/ directory)
- `apps/frontend/app/widgets/editor/code-block.css` - Code block styles (moved to ui/ directory)

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `yarn test [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.
- Browser tests should use the `.browser.test.tsx` suffix for DOM-dependent functionality.
- All TipTap editor method calls must go through the useEditorSync hook for React Compiler compatibility.

## Tasks

- [ ] 1.0 Create FSD Directory Structure and Move Existing Files
- [x] 2.0 Implement State Management with Jotai and React Compiler Compatibility
- [x] 3.0 Reorganize UI Components Following FSD Principles
- [x] 4.0 Create Editor-Specific Utilities and Configuration
- [x] 5.0 Implement Testing Patterns and Quality Assurance