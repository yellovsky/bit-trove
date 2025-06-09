# Bit-Trove

A modern web application built with Remix + NestJS, focusing on scalability, maintainability, and security.

## Tech Stack

- **Frontend**: Remix with TypeScript
- **Backend**: NestJS with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis
- **Testing**: Vitest
- **Styling**: TailwindCSS
- **Code Quality**: Biome
- **Package Manager**: Yarn

## Getting Started

1. Install dependencies:
```sh
yarn
```

2. Start the database:
```sh
docker-compose up
```

3. Create the database:
```sh
docker exec -it boilerplate-postgres-1 psql -U postgres
CREATE DATABASE bolierplate
```

4. Start the backend:
```sh
cd ./apps/backend
yarn dev
```

5. Start the frontend:
```sh
cd ./apps/frontend
yarn dev
```

## Project Structure

```
bit-trove/
├── apps/
│   ├── backend/         # NestJS API
│   └── frontend/        # Remix Client
├── packages/
│   ├── api-models/      # Shared API models
│   ├── typescript-config/ # Shared TS config
└── package.json
```

## Development

- Backend follows Domain-Driven Design (DDD)
- Frontend follows Feature Slice Design (FSD)
- Uses Biome for linting and formatting
- Implements i18n for internationalization
- Includes comprehensive test setup with Vitest

## Environment Variables

Backend (apps/backend/.env):
- `API_PORT` - API server port
- `SESSION_SECRET` - Session encryption key
- `WEB_CLIENT_HOSTNAME` - Frontend URL for CORS
- Database configuration from docker-compose.yml

## Documentation

- API documentation available at `/api/:version/docs`
- ReDoc alternative documentation available
- OpenAPI specification at `/swagger-json`