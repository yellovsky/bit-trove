# Enhanced Language Switcher Component - Tasks

## Relevant Files

- `apps/frontend/app/features/language-switcher/ui/LanguageSwitcher.tsx` - Main language switcher component to be refactored
- `apps/frontend/app/features/language-switcher/ui/LanguageSwitcherButton.tsx` - New button component for the language switcher
- `apps/frontend/app/features/language-switcher/ui/LanguageSwitcherContent.tsx` - New popover content component
- `apps/frontend/app/features/language-switcher/ui/LanguageSwitcherContent.stories.tsx` - Storybook stories for the content component
- `apps/frontend/app/features/language-switcher/ui/LanguageSwitcherButton.stories.tsx` - Storybook stories for the button component
- `apps/frontend/app/features/language-switcher/model/content-language-atom.ts` - Jotai atom for content language state management
- `apps/frontend/app/features/language-switcher/lib/content-language-cookie.ts` - Cookie management utilities for content language preferences
- `apps/frontend/app/root.tsx` - Root component to be updated with content language cookie handling
- `apps/frontend/app/features/language-switcher/ui/LanguageSwitcher.module.css` - Updated styles for the enhanced component

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `yarn test [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [x] 1.0 Set up content language state management and cookie handling
  - [x] 1.1 Create content language cookie utilities
  - [x] 1.2 Create Jotai atom for content language state management
  - [x] 1.3 Add content language cookie parsing to root loader
  - [x] 1.4 Test cookie persistence and atom state management
- [x] 2.0 Refactor existing LanguageSwitcher component architecture
  - [x] 2.1 Create LanguageSwitcherButton component
  - [x] 2.2 Create LanguageSwitcherContent component
  - [x] 2.3 Refactor main LanguageSwitcher to use new components
  - [x] 2.4 Create Storybook stories for new components
- [x] 3.0 Implement responsive design and visual enhancements
  - [x] 3.1 Add responsive breakpoint detection for mobile/desktop
  - [x] 3.2 Implement full-width panel for narrow screens
  - [x] 3.3 Add visual enhancements (flags, better spacing, animations)
  - [x] 3.4 Test responsive behavior across different screen sizes
- [x] 4.0 Add content language selection functionality
  - [x] 4.1 Create content language selection component with checkboxes
  - [x] 4.2 Integrate content language state with Jotai atoms
  - [x] 4.3 Add content language section to LanguageSwitcherContent
  - [x] 4.4 Handle edge cases (empty selection, all languages selected)
  - [x] 4.5 Test content language selection functionality
- [x] 5.0 Integrate SSR support and update root component
  - [x] 5.1 Update root loader to handle content language hydration
  - [x] 5.2 Ensure proper SSR hydration for Jotai atoms
  - [x] 5.3 Test SSR functionality and hydration
  - [x] 5.4 Final integration testing and validation