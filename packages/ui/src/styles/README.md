# CSS Design System - Bit-Trove

This directory contains the organized CSS initialization system for the Bit-Trove design system.

## Architecture Overview

The CSS system follows a layered approach with clear separation of concerns:

```
styles/
├── globals.css              # Main initialization file
├── components.palette.css    # Component color mappings
├── typography.css           # Typography system
├── *.palette.css            # Color palette definitions
└── README.md               # This documentation
```

## File Structure

### 1. `globals.css` - Main Initialization File

The central CSS file that orchestrates the entire design system:

- **External Dependencies**: Tailwind CSS and animations
- **Color Palettes**: Base color definitions
- **Primary Variants**: Primary color overrides
- **Component System**: Semantic color mappings
- **Design Tokens**: Spacing, typography, and component colors
- **Color Palette Variables**: All color variables for Tailwind utility generation
- **Theme Variables**: Light/dark mode specific variables
- **Base Styles**: Fundamental element styles

**Important**: The `@theme static` section includes all color palette variables (like `--color-red-surface`) to enable Tailwind utility classes like `bg-red-surface`.

### 2. `components.palette.css` - Component Color System

Defines semantic color mappings for UI components:

- Primary, secondary, and accent colors
- Background and foreground colors
- Input, card, and popover colors
- Focus states and destructive colors

### 3. `typography.css` - Typography System

Comprehensive typography styles:

- Heading hierarchy (h1, h2, h3)
- Paragraph and list styles
- Code and blockquote formatting
- Link and keyboard input styles

### 4. Color Palette Files

Individual color palette definitions:

- `teal.palette.css`, `blue.palette.css`, etc. - Base color palettes
- `primary-*.palette.css` - Primary color variants

## Best Practices

### 1. Layer Organization

CSS follows the Tailwind layer system:
```css
@layer theme, base, components, utilities;
```

### 2. Variable Naming

- Use semantic names: `--color-primary`, `--color-background`
- Follow consistent patterns: `--color-{name}-{shade}`
- Separate concerns: colors, spacing, typography

### 3. Theme Support

- Light/dark mode support via `[data-theme]` attributes
- Consistent variable structure across themes
- Proper fallbacks for all color values

### 4. Component Integration

- Components use semantic color tokens
- Consistent spacing and typography scales
- Accessible contrast ratios maintained

### 5. Tailwind Integration

- All color variables must be declared in `@theme static` for utility generation
- Color palette files define the actual values
- Theme variables reference palette values for consistency

## Usage

### Frontend Application

```css
/* apps/frontend/app/root.css */
@layer theme, base, components, utilities;
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css" layer(utilities);
@import "@repo/ui/globals.css";
@import "@repo/ui/typography.css";
@import "./theme.css"; /* App-specific overrides */
```

### Component Development

```tsx
// Use semantic color tokens
<div className="bg-background text-foreground">
  <h1 className="text-primary">Title</h1>
</div>

// Use palette-specific utilities
<div className="bg-red-surface text-red-contrast">
  Error message
</div>
```

## Color System

### Base Colors
- **Gray**: Neutral grays for text and backgrounds
- **Primary**: Brand colors (teal, blue, red, green, amber, slate)
- **Semantic**: Success, warning, error states

### Color Scale
Each color follows a 12-step scale:
- `1-4`: Lightest shades
- `5-8`: Mid-tones
- `9-12`: Darkest shades
- `a1-a12`: Alpha variants for overlays

### Theme Support
- **Light Mode**: High contrast, clean backgrounds
- **Dark Mode**: Reduced contrast, dark backgrounds
- **Automatic**: System preference detection

### Tailwind Utilities
All color variables are available as Tailwind utilities:
- `bg-red-surface`, `text-red-contrast`
- `bg-primary-9`, `text-primary-contrast`
- `bg-gray-1`, `text-gray-12`

## Typography System

### Font Stack
- **Heading**: Geologica Variable (modern, geometric)
- **Body**: System fonts with fallbacks
- **Monospace**: Roboto Mono for code

### Scale
- **H1**: 4xl (2.25rem) - Page titles
- **H2**: 3xl (1.875rem) - Section headers
- **H3**: xl (1.25rem) - Subsection headers

## Maintenance

### Adding Colors
1. Create palette file: `new-color.palette.css`
2. Import in `globals.css`
3. Add color variables to `@theme static` section
4. Add primary variant if needed
5. Update component palette if semantic mapping required

### Adding Typography
1. Extend `typography.css` with new classes
2. Follow existing naming patterns
3. Ensure responsive behavior
4. Test accessibility

### Theme Updates
1. Modify theme variables in `globals.css`
2. Update both light and dark mode values
3. Test contrast ratios
4. Verify component compatibility

## Performance

- CSS variables for runtime theme switching
- Minimal CSS bundle size through organization
- Efficient color palette reuse
- Optimized typography scale

## Accessibility

- WCAG AA contrast ratios maintained
- Focus states clearly defined
- Semantic color usage
- Screen reader friendly typography

## Future Considerations

- CSS-in-JS integration
- Advanced theming capabilities
- Animation system expansion
- Component-specific style isolation