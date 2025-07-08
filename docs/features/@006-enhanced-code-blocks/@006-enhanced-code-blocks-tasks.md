# Enhanced Code Blocks Feature Tasks

## Relevant Files

- `packages/ui/src/components/CodeBlock.tsx` - Main code block component that needs enhancement with header display
- `packages/ui/src/components/CodeBlock.test.tsx` - Unit tests for enhanced CodeBlock component
- `packages/ui/src/components/PoseDocument.tsx` - Document renderer that needs updates to handle file name attributes
- `packages/ui/src/components/PoseDocument.test.tsx` - Unit tests for PoseDocument updates
- `apps/frontend/app/widgets/editor/components/CodeBlockPopover.tsx` - New popover component for code block configuration
- `apps/frontend/app/widgets/editor/components/CodeBlockPopover.test.tsx` - Unit tests for CodeBlockPopover component
- `apps/frontend/app/widgets/editor/extensions/enhanced-code-block.ts` - New TipTap extension for enhanced code block attributes
- `apps/frontend/app/widgets/editor/extensions/enhanced-code-block.test.ts` - Unit tests for TipTap extension
- `apps/frontend/app/widgets/editor/components/ToolbarButton.tsx` - Existing toolbar button component (referenced for consistency)
- `apps/frontend/app/widgets/editor/hooks/use-editor-sync.ts` - Existing editor sync hook (referenced for consistency)
- `apps/frontend/app/widgets/editor/lib/tiptap-utils.ts` - Existing TipTap utilities (referenced for consistency)

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `yarn test [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [x] 1.0 Create TipTap Extension for Enhanced Code Block Attributes
  - [x] 1.1 Create enhanced code block extension with language and file name attributes
  - [x] 1.2 Add schema definition for enhanced code block node
  - [x] 1.3 Implement attribute handling and validation
  - [x] 1.4 Add commands for setting and updating attributes
  - [x] 1.5 Write unit tests for the extension
- [x] 2.0 Build CodeBlockPopover Component
  - [x] 2.1 Create a new CodeBlockPopover component in the appropriate FSD location
  - [x] 2.2 Implement language dropdown with search and file name input
  - [x] 2.3 Integrate with TipTap editor to set/get code block attributes
  - [x] 2.4 Add syntax highlighting preview in the popover
  - [x] 2.5 Add copy-to-clipboard button with toast feedback
  - [x] 2.6 Ensure accessibility and mobile responsiveness
  - [x] 2.7 Write unit tests for the popover component
- [x] 3.0 Enhance CodeBlock Component with Header Display
- [x] 4.0 Update PoseDocument for File Name Rendering
- [x] 5.0 Integrate Enhanced Code Blocks into Editor

---

**All tasks for the Enhanced Code Blocks feature are complete. The feature is fully implemented, tested, and integrated.**