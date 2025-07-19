# Enhanced Language Switcher Component - PRD

## Introduction/Overview

The current language switcher component has limitations on mobile devices and lacks content language selection functionality. This feature aims to create an enhanced language switcher that provides better UX across all screen sizes and allows users to filter content by language preferences.

**Problem:** The current language switcher looks poor on mobile devices and doesn't allow users to select content languages, limiting their ability to filter content based on language preferences.

**Goal:** Create a responsive, feature-rich language switcher that improves user experience on all devices and enables content language filtering.

## Goals

1. **Improve Mobile UX:** Create a responsive design that works well on both wide and narrow screens
2. **Add Content Language Selection:** Allow users to select which content languages they want to see
3. **Maintain Current Functionality:** Preserve existing UI language switching capabilities
4. **Enable SSR Support:** Ensure content language preferences are accessible during server-side rendering
5. **Provide Visual Feedback:** Clearly indicate selected/unselected content languages
6. **Follow Design System:** Maintain consistency with the existing IDE-like design aesthetic

## User Stories

1. **As a reader**, I want to switch the interface language between English and Russian so that I can navigate the site in my preferred language.

2. **As a reader**, I want to select which content languages I want to see so that I can filter articles and posts to match my language preferences.

3. **As a reader**, I want the language switcher to work well on my mobile device so that I can easily change language settings on any screen size.

4. **As a reader**, I want my content language preferences to persist across browser sessions so that I don't have to reconfigure them every time.

5. **As a reader**, I want to see visual indicators of which content languages are selected so that I understand my current filtering preferences.

6. **As a reader**, I want to quickly toggle between "all languages" and specific language selections so that I can easily switch between broad and filtered content views.

## Functional Requirements

1. **UI Language Switching:**
   - The component must allow switching between English (en) and Russian (ru) UI languages
   - UI language selection must persist across browser sessions
   - Current UI language must be visually indicated

2. **Content Language Selection:**
   - The component must display checkboxes for available content languages (en, ru)
   - Users must be able to select multiple content languages simultaneously
   - Content language selections must persist across browser sessions
   - If no content languages are passed as props, checkboxes must not be rendered
   - Initially, all available content languages must be selected by default

3. **Responsive Design:**
   - On wide screens: Display as a popover triggered by a button
   - On narrow screens: Display as either a popover or full-width panel
   - The component must adapt its layout based on screen size

4. **State Management:**
   - The component must receive selected values as props
   - The component must call provided callback functions when selections change
   - Content language preferences must be managed through Jotai atoms
   - Content language preferences must be accessible during SSR

5. **Visual Design:**
   - Follow the existing IDE-like design aesthetic
   - Use flags alongside language names for better visual recognition
   - Provide clear visual indicators for selected/unselected states
   - Indicate when "all languages" are effectively selected (when no specific languages are chosen)

6. **Component Architecture:**
   - Separate the button and popover content into distinct components
   - Enable Storybook stories for individual components
   - Maintain the existing `LanguageSwitcher.tsx` file structure

## Non-Goals (Out of Scope)

1. **Advanced Language Features:** No support for languages beyond English and Russian
2. **Complex Filtering Logic:** The component will not handle the actual content filtering logic
3. **User Authentication:** No integration with user accounts or profiles
4. **Analytics:** No built-in usage tracking or analytics
5. **Keyboard Navigation:** Basic accessibility only (can be enhanced in future iterations)

## Design Considerations

- **Current Design:** Follow the existing IDE-like design patterns from the current language switcher
- **Flags and Names:** Use country flags alongside language names for better visual recognition
- **Responsive Behavior:** Implement mobile-first responsive design
- **Visual States:** Clear indication of selected/unselected content languages
- **"All Languages" State:** Visual indicator when no specific content languages are selected (meaning all are shown)

## Technical Considerations

1. **SSR Integration:**
   - Add content language preferences to cookies (similar to color scheme in `root.tsx`)
   - Make content language preferences accessible in loaders for SSR
   - Pass content language preferences to fetch functions

2. **State Management:**
   - Use Jotai atoms for content language state management
   - Integrate with existing color scheme atom pattern
   - Ensure state persistence across sessions

3. **Component Structure:**
   - Refactor `LanguageSwitcher.tsx` to separate button and popover content
   - Create reusable components for individual language options
   - Enable Storybook documentation

4. **Cookie Management:**
   - Implement cookie-based storage for content language preferences
   - Follow the pattern established in `root.tsx` for color scheme cookies

## Success Metrics

1. **User Experience:**
   - Improved mobile usability (measured by user feedback)
   - Reduced bounce rate on mobile devices
   - Increased engagement with content filtering features

2. **Technical Performance:**
   - Component renders correctly on all screen sizes
   - State persistence works reliably across sessions
   - SSR integration functions properly

3. **Accessibility:**
   - Component is accessible via keyboard navigation
   - Screen readers can interpret language selections
   - Visual indicators are clear and meaningful

## Open Questions

1. **Mobile Layout:** Should the narrow screen version default to popover or full-width panel?
2. **"All Languages" Behavior:** How should the component visually represent when all languages are effectively selected?
3. **Animation:** Should there be smooth transitions between different states?
4. **Error Handling:** How should the component behave if cookie storage fails?
5. **Performance:** Should content language preferences be debounced when updating atoms?

## Implementation Notes

- Reference the existing color scheme implementation in `root.tsx` for cookie management patterns
- Use the existing `Toggle` and `Popover` components from `@repo/ui`
- Follow the established pattern for Jotai atom integration
- Ensure the component works with the existing i18n setup
- Create Storybook stories for both the button and popover content components