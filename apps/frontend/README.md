# Remix Client

The frontend is built with **Remix** and follows the **Feature Slice Design (FSD)** architecture for better code organization and maintainability.

## Features

- **State Management**: React Router + Jotai
- **Styling**: TailwindCSS
- **Icons**: Custom SVG sprite system
- **Testing**: Vitest + Playwright
- **Code Quality**: Biome
- **Development Tools**: React Router Dev Tools

## Project Structure

```
app/
├── app/              # Application core
├── entities/         # Business entities
├── features/         # Feature modules
├── shared/          # Shared utilities
└── widgets/         # Reusable UI blocks
```

## Development

```sh
# Start development server
yarn dev

# Run tests
yarn test

# Run tests with browser
yarn test:browser

# Run Storybook tests
yarn test:storybook

# Type checking
yarn typecheck

# Linting
yarn lint
```

## Testing

The project uses a comprehensive testing setup:

- Unit tests with Vitest
- Browser tests with Playwright
- Component tests with Storybook
- Accessibility tests with @storybook/addon-a11y

## Build Tools

- Vite for development and production builds
- TailwindCSS for styling
- Custom icon sprite generation
- Path aliases for better imports
- React Router for file-based routing
