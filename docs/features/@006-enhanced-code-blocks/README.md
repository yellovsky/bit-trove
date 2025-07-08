# Enhanced Code Blocks

## Purpose
Enable authors to insert code blocks in the CMS with language selection, optional file name, and a user-friendly display for readers.

## User Experience
- Authors can add code blocks, select a programming language, and (optionally) specify a file name via a popover UI in the editor.
- Readers see code blocks with a header showing the language, file name (if provided), and a copy-to-clipboard button.
- Responsive, accessible, and visually consistent with the BitTrove design system.

## Technical Highlights
- **TipTap Extension**: Custom extension supports `language` and `fileName` attributes, with schema validation and commands for attribute management.
- **Popover UI**: CodeBlockPopover component provides language dropdown, file name input, and live syntax highlighting preview.
- **Header Display**: CodeBlock component renders a header with language, file name, and a copy button using the Clipboard API.
- **FSD Structure**: All code follows Feature-Sliced Design (FSD) with clear separation between features, entities, shared UI, and widgets.
- **Testing**: Comprehensive unit and integration tests for extension, popover, and rendering. All tests pass as of July 2024.

## Status
**Fully implemented and integrated.**