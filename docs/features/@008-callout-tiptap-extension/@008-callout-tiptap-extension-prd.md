# Callout TipTap Extension - Product Requirements Document

## Introduction/Overview

The Callout TipTap Extension is a content enhancement feature that allows content creators to highlight important information using visually distinct colored areas with icons and optional titles. This feature provides a way to draw reader attention to specific types of information such as warnings, tips, code examples, and recommendations. The callout will be rendered as a colored container with an icon, optional title, and content area that can contain any TipTap node content.

## Goals

1. **Content Highlighting**: Provide content creators with a tool to visually emphasize important information
2. **Information Categorization**: Allow readers to quickly identify different types of information through visual cues
3. **Improved Readability**: Enhance content structure and scannability through consistent visual patterns
4. **Editor Integration**: Seamlessly integrate with the existing TipTap editor workflow
5. **Consistent Rendering**: Ensure callouts display correctly in both the editor and the PoseDocument viewer

## User Stories

1. **As a content creator**, I want to highlight important information so that readers notice it
2. **As a content creator**, I want to categorize information by type (warning, tip, code, etc.) so that readers understand the context
3. **As a content creator**, I want to add optional titles to callouts so that I can provide additional context
4. **As a reader**, I want to quickly identify different types of information (warnings, tips, etc.) so that I can prioritize my reading
5. **As a reader**, I want to see consistent visual patterns for different information types so that I can develop reading habits

## Functional Requirements

1. **Callout Types**: The system must support seven predefined callout types: info, question, warning, danger, code, success, recommendation
2. **Icon Assignment**: Each callout type must have a predefined icon from the Lucide icon library
3. **Optional Title**: The system must allow content creators to add an optional title to any callout
4. **Content Support**: The system must allow any TipTap node to be a child of the callout
5. **Editor Integration**: The system must integrate with the existing TipTap editor setup
6. **PoseDocument Rendering**: The system must render callouts correctly in the PoseDocument component
7. **Type Selection**: Content creators must be able to select the callout type during creation
8. **Title Input**: Content creators must be able to input an optional title during callout creation
9. **Visual Distinction**: Each callout type must have distinct visual styling (colors, borders, backgrounds)
10. **Full-Width Display**: Callouts must display at full width within their container
11. **Header Layout**: Callouts must display with a header containing the icon and optional title
12. **Empty Callout Support**: The system must allow and display callouts with no content

## Non-Goals (Out of Scope)

1. **Nested Callouts**: The system will not support callouts within callouts
2. **Custom Styling**: The system will not allow custom styling beyond the predefined types
3. **Interactive Behaviors**: The system will not include interactive features like collapsible content
4. **Custom Icons**: The system will not allow custom icons beyond the predefined type-based icons
5. **Animation Effects**: The system will not include animations or transitions
6. **Responsive Variations**: The system will not have different layouts for different screen sizes beyond standard responsive behavior

## Design Considerations

### Visual Design
- **Header Layout**: Icon + title (if provided) in a horizontal layout
- **Color System**: Each type should have distinct colors following the existing design system
- **Typography**: Use existing typography components and patterns
- **Spacing**: Follow existing spacing patterns and component margins
- **Borders**: Subtle borders or background colors to distinguish callout types
- **Full-Width**: Callouts should span the full width of their container

### Icon Mapping
- **Info**: `Info` icon (blue theme)
- **Question**: `HelpCircle` icon (purple theme)
- **Warning**: `AlertTriangle` icon (yellow/orange theme)
- **Danger**: `AlertOctagon` icon (red theme)
- **Code**: `Code` icon (gray theme)
- **Success**: `CheckCircle` icon (green theme)
- **Recommendation**: `Lightbulb` icon (amber theme)

### Editor Interface
- **Type Selection**: Dropdown or button group for selecting callout type
- **Title Input**: Text input field for optional title
- **Creation Flow**: Similar to link creation with a popover interface
- **Visual Preview**: Show callout type and title in the creation popover

## Technical Considerations

### TipTap Integration
- **Extension Development**: Create a custom TipTap extension for the callout node
- **Node Definition**: Define callout node with attributes for type and title
- **Schema Integration**: Integrate with existing TipTap schema
- **Command Integration**: Add callout creation commands to the editor

### PoseDocument Rendering
- **Node Handler**: Add callout case to the `renderPoseNode` function
- **Component Integration**: Create a Callout component for rendering
- **Content Rendering**: Recursively render callout content using existing render functions

### Component Architecture
- **Callout Component**: Reusable component for rendering callouts
- **Type Props**: Accept type, title, and children as props
- **Styling System**: Use CSS classes or Tailwind for type-based styling
- **Icon System**: Integrate with existing Lucide icon system

### Data Structure
```typescript
interface CalloutNode {
  type: 'callout';
  attrs: {
    type: 'info' | 'question' | 'warning' | 'danger' | 'code' | 'success' | 'recommendation';
    title?: string;
  };
  content: JSONContent[];
}
```

## Success Metrics

1. **Functionality**: Content creators can successfully create callouts with all supported types
2. **Rendering**: Callouts display correctly in both editor and PoseDocument viewer
3. **User Experience**: Creation flow is intuitive and similar to existing editor patterns
4. **Visual Consistency**: Callouts follow existing design patterns and color schemes
5. **Content Support**: All TipTap node types can be used within callouts
6. **Performance**: No performance degradation when rendering multiple callouts

## Open Questions

1. **Color Palette**: Should the callout colors match existing design system colors or use new ones?
2. **Icon Sizing**: What size should the icons be in the callout header?
3. **Title Styling**: Should the title have specific typography styling (heading level, weight, etc.)?
4. **Spacing**: What should be the internal spacing between header and content?
5. **Border Radius**: Should callouts have rounded corners and if so, what radius?
6. **Background Opacity**: Should callouts have solid or semi-transparent backgrounds?
7. **Editor Commands**: Should there be keyboard shortcuts for creating callouts?
8. **Accessibility**: What ARIA labels and roles should be used for callouts?

## Implementation Priority

1. **Phase 1**: Create the Callout component with basic styling and type support
2. **Phase 2**: Develop the TipTap extension with node definition and commands
3. **Phase 3**: Integrate with PoseDocument rendering
4. **Phase 4**: Add editor creation interface (popover)
5. **Phase 5**: Polish styling and ensure design consistency
6. **Phase 6**: Testing and accessibility improvements