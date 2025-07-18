# NestJS API

The backend is built with **NestJS** and follows **layered architecture** (clean/hexagonal architecture) principles. It provides a robust foundation for building scalable server-side applications with clear separation of concerns across domain, application, infrastructure, and presentation layers.

## Features

- **Authentication**: JWT-based with Passport.js
- **Authorization**: RBAC with Casbin
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis for performance
- **Logging**: Winston with daily rotation
- **API Documentation**: Swagger/OpenAPI
- **Internationalization**: i18next
- **Testing**: Vitest

## Setup

### Database

1. Install Prisma CLI:
```sh
yarn add -D prisma
```

2. Initialize Prisma:
```sh
npx prisma init
```

3. Generate Prisma client:
```sh
npx prisma generate
```

4. Run migrations:
```sh
npx prisma migrate dev
```

### Environment Variables

Create a `.env` file with:
```
API_PORT=3001
SESSION_SECRET=your-secret
CORS_ORIGIN=http://localhost:5173
DATABASE_URL=postgresql://postgres:password@localhost:5432/bolierplate
```

## Development

```sh
# Start in development mode
yarn dev

# Start with debugging
yarn start:debug

# Run tests
yarn test

# Run tests with coverage
yarn test:cov

# Type checking
yarn typecheck

# Linting
yarn lint
```

## Architecture

The project follows a modular architecture with clear separation of concerns:

```
src/
├── modules/           # Feature modules
├── shared/           # Shared utilities
├── main.ts          # Application entry
└── app.module.ts    # Root module
```

For detailed architecture documentation, see [backend_analysis.md](./backend_analysis.md).
