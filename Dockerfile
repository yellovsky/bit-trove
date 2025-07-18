# =============================================================================
# BitTrove Multi-Stage Docker Build
# =============================================================================
# This Dockerfile builds a production-ready container with:
# - Frontend (Remix) and Backend (NestJS) applications
# - Nginx reverse proxy for routing and static file serving
# - Prisma for database migrations
# - Supervisor for process management
# =============================================================================

# =============================================================================
# Base Stage - Common dependencies and tools
# =============================================================================
FROM node:22-alpine AS base

# Install system dependencies
RUN apk update && apk add --no-cache libc6-compat

# Enable and configure Yarn package manager
RUN corepack enable && corepack prepare yarn@4.2.2 --activate

# =============================================================================
# Builder Stage - Dependencies and build preparation
# =============================================================================
FROM base AS builder

WORKDIR /app

# Install Turbo for monorepo build optimization
RUN npm install -g turbo@2

# Copy source code
COPY . .

# Prune workspace to only include required packages for Docker build
RUN turbo prune backend frontend --docker

# =============================================================================
# Installer Stage - Install dependencies and build applications
# =============================================================================
FROM base AS installer

WORKDIR /app

# Copy package files and install dependencies
COPY --from=builder /app/out/json/ .
RUN yarn install --immutable

# Copy source code and build applications
COPY --from=builder /app/out/full/ .
RUN yarn turbo run build

# =============================================================================
# Production Stage - Runtime environment
# =============================================================================
FROM base AS production

WORKDIR /app

# Install Prisma CLI globally for database migrations
RUN npm install -g prisma

# Install system dependencies for production
RUN apk add --no-cache \
    nginx \
    supervisor \
    curl \
    netcat-openbsd

# Create necessary directories
RUN mkdir -p \
    /app/frontend \
    /app/backend \
    /app/nginx \
    /app/scripts \
    /var/log/nginx \
    /tmp

# Copy Nginx configuration files
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy application startup and utility scripts
COPY scripts/start.sh /app/scripts/start.sh
COPY scripts/migrate.sh /app/scripts/migrate.sh
COPY scripts/wait-for.sh /app/scripts/wait-for.sh

# Make scripts executable
RUN chmod +x /app/scripts/*.sh

# Copy built applications and dependencies
# Frontend application
COPY --from=installer /app/apps/frontend/build /app/apps/frontend/build
COPY --from=installer /app/apps/frontend/public /app/apps/frontend/public
COPY --from=installer /app/apps/frontend/node_modules /app/apps/frontend/node_modules
COPY --from=installer /app/apps/frontend/package.json /app/apps/frontend/package.json

# Backend application
COPY --from=installer /app/apps/backend/dist /app/apps/backend/dist
COPY --from=installer /app/apps/backend/node_modules /app/apps/backend/node_modules
COPY --from=installer /app/apps/backend/prisma /app/apps/backend/prisma
COPY --from=installer /app/apps/backend/package.json /app/apps/backend/package.json
COPY --from=installer /app/apps/backend/model.conf /app/apps/backend/model.conf
COPY --from=installer /app/apps/backend/nest-cli.json /app/apps/backend/nest-cli.json

# Shared packages
COPY --from=installer /app/packages/api-models/dist /app/packages/api-models/dist
COPY --from=installer /app/packages/api-models/package.json /app/packages/api-models/package.json

# Root node_modules (for workspace dependencies)
COPY --from=installer /app/node_modules /app/node_modules

# =============================================================================
# Security Configuration
# =============================================================================

# Create non-root user and group for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Set proper ownership for application directories
RUN chown -R nodejs:nodejs /app /var/log/nginx /var/lib/nginx

# Switch to non-root user
USER nodejs

# =============================================================================
# Container Configuration
# =============================================================================

# Expose port 80 for Nginx
EXPOSE 80

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Start the application using the startup script
CMD ["/app/scripts/start.sh"]
