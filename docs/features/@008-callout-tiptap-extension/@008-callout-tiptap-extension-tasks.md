# Callout TipTap Extension - Implementation Tasks

## Relevant Files

- `packages/ui/src/components/Callout.tsx` - Main Callout component for rendering callouts with type-based styling and icons
- `packages/ui/src/styles/components.callout.css` - CSS styles for callout component with type-specific theming
- `packages/ui/src/components/Callout.browser.test.tsx` - Unit tests for Callout component
- `packages/ui/src/components/Callout.stories.tsx` - Storybook stories for Callout component
- `apps/frontend/app/features/editor/extensions/callout.ts` - TipTap extension for callout node definition and commands
- `apps/frontend/app/features/editor/extensions/callout.test.ts` - Unit tests for callout extension
- `apps/frontend/app/features/editor/components/CalloutPopover.tsx` - Editor popover for creating callouts with type selection and title input
- `apps/frontend/app/features/editor/components/CalloutPopover.test.tsx` - Unit tests for CalloutPopover component
- `packages/ui/src/components/PoseDocument.tsx` - Update to include callout rendering in renderPoseNode function
- `packages/ui/src/components/PoseDocument.test.tsx` - Update tests to include callout rendering
- `apps/frontend/app/features/editor/extensions/index.ts` - Export callout extension for editor integration
- `apps/frontend/app/features/editor/commands/callout.ts` - Editor commands for creating and managing callouts
- `apps/frontend/app/features/editor/commands/callout.test.ts` - Unit tests for callout commands

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `Callout.tsx` and `Callout.test.tsx` in the same directory).
- Use `yarn test [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [x] 1.0 Create Callout Component
  - [x] 1.1 Create Callout component with type-based props and basic structure
  - [x] 1.2 Add type-specific styling with colors, borders, and backgrounds
  - [x] 1.3 Integrate Lucide icons for each callout type
  - [x] 1.4 Add header layout with icon and optional title
  - [x] 1.5 Add content area that accepts children
  - [x] 1.6 Create Storybook stories for all callout types
  - [x] 1.7 Write unit tests for Callout component
- [x] 2.0 Develop TipTap Extension
  - [x] 2.1 Create callout node definition with type and title attributes
  - [x] 2.2 Define callout node schema and content rules
  - [x] 2.3 Create callout extension with commands and keymaps
  - [x] 2.4 Add callout creation and management commands
  - [x] 2.5 Write unit tests for callout extension
- [x] 3.0 Integrate with PoseDocument Rendering
  - [x] 3.1 Add callout case to renderPoseNode function
  - [x] 3.2 Import Callout component in PoseDocument
  - [x] 3.3 Handle callout content rendering recursively
  - [x] 3.4 Update PoseDocument tests to include callout rendering
- [x] 4.0 Create Editor Creation Interface
  - [x] 4.1 Create CalloutPopover component for type selection and title input
  - [x] 4.2 Add callout type selection with visual preview
  - [x] 4.3 Add title input field with validation
  - [x] 4.4 Integrate with editor commands for callout creation
  - [x] 4.5 Write unit tests for CalloutPopover component
