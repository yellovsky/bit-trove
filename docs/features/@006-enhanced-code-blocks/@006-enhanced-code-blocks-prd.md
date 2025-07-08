# Enhanced Code Blocks Feature PRD

## Introduction/Overview

The Enhanced Code Blocks feature aims to improve code organization and readability by allowing content creators to specify programming languages and optional file names for code blocks in the CMS. This feature will provide better context for readers and improve content management for authors through a user-friendly popover interface similar to the existing link popover.

The feature addresses the need for proper syntax highlighting, contextual file information, and easy code copying functionality, making code content more accessible and professional for developer audiences.

## Goals

1. **Improve Code Readability**: Enable proper syntax highlighting by allowing language specification
2. **Enhance Context**: Provide file name/path information to help readers understand code context
3. **Streamline Content Creation**: Offer intuitive interface for setting code block properties
4. **Improve User Experience**: Enable one-click code copying for readers
5. **Maintain Consistency**: Follow existing design patterns and UI conventions

## User Stories

1. **As a content creator**, I want to specify the programming language so that my code is properly syntax highlighted
2. **As a content creator**, I want to add a file name so that readers understand the context of the code
3. **As a reader**, I want to copy code easily so that I can use it in my own projects
4. **As a content creator**, I want to see syntax highlighting preview so that I can verify the language selection
5. **As a reader**, I want to see the file name so that I understand where this code belongs
6. **As a content creator**, I want to edit language/file name later so that I can correct mistakes

## Functional Requirements

1. **Language Selection**: The system must allow users to select programming language from a predefined list with search functionality
2. **File Name Input**: The system must allow users to optionally specify a file name or path
3. **Popover Interface**: The system must provide a popover interface consistent with the existing LinkPopover design
4. **Syntax Highlighting**: The system must display code with proper syntax highlighting based on the selected language
5. **Copy Functionality**: The system must provide a copy button that works reliably across all browsers
6. **Visual Feedback**: The system must provide toast notification feedback when code is copied
7. **Edit Capability**: The system must allow editing of language and file name after initial creation
8. **Preview Functionality**: The system must show syntax highlighting preview in the popover before saving
9. **Header Display**: The system must display language, file name, and copy button in a clean layout in the rendered code block
10. **Responsive Design**: The system must maintain mobile responsiveness for the popover interface

## Non-Goals (Out of Scope)

- Support for multiple files in a single code block
- Code execution or live preview functionality
- Git integration or version control features
- Code formatting/beautification tools
- Syntax error highlighting
- Line number display
- Code execution capabilities

## Design Considerations

### UI/UX Requirements
- **Popover Design**: Must match the existing LinkPopover design exactly for consistency
- **Language Selector**: Dropdown with search functionality for easy language selection
- **File Name Input**: Simple text input field for file name/path entry
- **Code Block Header**: Clean layout showing language, file name, and copy button
- **Copy Button**: Visual feedback through toast notifications
- **Mobile Responsiveness**: Leverage existing popover mobile responsiveness

### Layout Considerations
- **Long File Names**: Text wrapping and extended code block header for very long file names
- **Header Layout**: Horizontal arrangement of language, file name, and copy button
- **Visual Hierarchy**: Clear distinction between header elements and code content

## Technical Considerations

### TipTap Extension Requirements
- **Custom Extension**: New TipTap extension for enhanced code block attributes
- **Attribute Storage**: Store language and file name as node attributes
- **Schema Integration**: Integrate with existing TipTap schema and editor
- **Event Handling**: Handle popover open/close and attribute updates

### Data Structure
- **Language Attribute**: String value for programming language
- **File Name Attribute**: Optional string value for file name/path
- **Backward Compatibility**: Maintain compatibility with existing code blocks

### Integration Points
- **PoseDocument Component**: Update to display file name in rendered output
- **CodeBlock Component**: Enhance to show header with language, file name, and copy button
- **Editor Integration**: Seamless integration with existing TipTap editor

## Success Metrics

1. **User Adoption**: 90% of new code blocks use language specification within 30 days
2. **Copy Functionality**: 95% success rate for code copying across all browsers
3. **Performance**: No degradation in editor performance with new extension
4. **User Satisfaction**: Positive feedback on popover interface usability
5. **Content Quality**: Improved code readability and context for readers

## Open Questions

1. **Language List**: What is the comprehensive list of programming languages to support?
2. **File Name Validation**: Should there be validation for file name format/path?
3. **Default Language**: What should be the default language when none is specified?
4. **Copy Button Placement**: Should the copy button be in the header or as a floating element?
5. **Accessibility**: What additional accessibility features are needed for the popover?
6. **Performance**: How should we handle very large code blocks in the preview?

## Implementation Notes

### Key Components to Modify/Create
1. **CodeBlockPopover**: New component similar to LinkPopover
2. **Enhanced CodeBlock**: Updated CodeBlock component with header
3. **TipTap Extension**: Custom extension for language and file name attributes
4. **PoseDocument**: Update to handle new attributes in rendering

### File Name Display Strategy
- **Editor**: File name only shown in popover (not in editor view)
- **Rendered Output**: File name displayed in code block header in PoseDocument
- **Storage**: File name stored as node attribute for persistence

### Error Handling
- **Unsupported Languages**: Default to plain text highlighting
- **Empty Content**: Maintain existing default behavior
- **Invalid File Names**: Allow any string input without validation
- **Copy Failures**: Graceful fallback with user feedback