# Product Requirements Document: Containerized Deployment

## Introduction/Overview

This feature will containerize the BitTrove application for production deployment on a single VPS. The solution will package the frontend (React Router), backend (NestJS), and Nginx reverse proxy into a single container, with Nginx handling all external traffic and routing requests appropriately to either the frontend or backend services.

**Problem**: Deploying BitTrove on two separate VPS instances is cost-prohibitive, but the application requires both frontend and backend services to function.

**Goal**: Create a single-container deployment solution that runs both frontend and backend services internally while exposing only Nginx to handle external traffic and route requests appropriately.

## Goals

1. **Cost Optimization**: Reduce deployment costs by running both services in a single container on one VPS
2. **Simplified Deployment**: Create a single container that can be deployed with minimal configuration
3. **Proper Request Routing**: Ensure Nginx correctly routes API requests to backend and all other requests to frontend
4. **Production Readiness**: Create a production-ready containerized solution with proper environment configuration
5. **Database Migration Support**: Include automated database migration handling during deployment

## User Stories

1. **As a developer**, I want to deploy BitTrove to a single VPS so that I can reduce hosting costs while maintaining full functionality.

2. **As a system administrator**, I want a single container to manage so that deployment and maintenance are simplified.

3. **As an end user**, I want to access the application through a single domain so that the experience is seamless and transparent.

4. **As a developer**, I want environment variables to be easily configurable so that I can deploy to different environments without code changes.

5. **As a system administrator**, I want database migrations to run automatically so that I don't need to manually handle schema updates.

## Functional Requirements

### 1. Container Architecture
The system must package the following services into a single container:
- **Nginx**: Reverse proxy (exposed to external traffic)
- **Frontend**: React Router application (internal service)
- **Backend**: NestJS API server (internal service)

### 2. Nginx Configuration
The system must configure Nginx to:
- Listen on port 80 (HTTP) and 443 (HTTPS) for external traffic
- Route all requests starting with `/api/*` to the backend service
- Route all other requests to the frontend service

### 3. Internal Service Communication
The system must ensure:
- Frontend service runs on internal port (e.g., 3000)
- Backend service runs on internal port (e.g., 3001)
- Services communicate via localhost/internal networking
- Nginx proxies requests between external traffic and internal services

### 4. Environment Configuration
The system must support:
- Environment variables passed to container during build/run
- Separate configuration for frontend and backend services
- Database connection configuration for external PostgreSQL
- Redis connection configuration for external Redis
- API base URL configuration for frontend

### 5. Database Migration Handling
The system must:
- Run database migrations automatically on container startup
- Handle migration failures gracefully
- Support rollback scenarios
- Log migration status and results

### 6. Service Startup Sequence
The system must ensure proper startup order:
- Start Nginx first (to handle incoming requests)
- Start backend service and wait for it to be ready
- Run database migrations
- Start frontend service
- Verify all services are healthy

### 7. Production Build Process
The system must:
- Build optimized production versions of both frontend and backend
- Minimize container size through multi-stage builds
- Include only necessary runtime dependencies
- Optimize for production performance

## Non-Goals (Out of Scope)

1. **Development Environment**: This solution is production-only; development will continue using local services
2. **Container Orchestration**: No Docker Swarm, Kubernetes, or other orchestration tools
3. **Health Checks**: No automated health monitoring or restart policies
4. **Logging Aggregation**: No centralized logging or monitoring systems
5. **SSL/TLS Management**: SSL certificates will be handled externally or through Nginx configuration
6. **Horizontal Scaling**: No support for multiple container instances or load balancing
7. **Hot Reload**: No development-style hot reload capabilities
8. **Volume Mounting**: No persistent volume mounting for development purposes

## Design Considerations

### Container Structure
```
bit-trove-container/
├── nginx/                 # Nginx configuration and setup
├── frontend/             # React Router production build
├── backend/              # NestJS production build
├── scripts/              # Startup and migration scripts
└── Dockerfile            # Multi-stage build configuration
```

### Nginx Configuration
- **Virtual Hosts**: Configure for both `yourdomain.com` and `api.yourdomain.com`
- **Proxy Rules**: Route `/api/*` to backend, everything else to frontend
- **Static File Serving**: Serve frontend static files directly through Nginx
- **Caching**: Implement appropriate caching headers for static assets

### Service Communication
- **Internal Ports**: Frontend (3000), Backend (3001), Nginx (80/443)
- **Localhost Routing**: All internal communication via localhost
- **Request Forwarding**: Nginx forwards requests to appropriate internal services

## Technical Considerations

### Docker Multi-Stage Build
- **Build Stage**: Compile TypeScript, build frontend assets
- **Production Stage**: Copy only necessary files, install runtime dependencies
- **Optimization**: Minimize image size and layer count

### Environment Variables
- **Database**: `DATABASE_URL`
- **API Configuration**: `API_BASE_URL`, `API_PORT`
- **Frontend Configuration**: `PUBLIC_API_URL`, `NODE_ENV`
- **Nginx Configuration**: `DOMAIN_NAME`, `API_DOMAIN`

### Database Migration Strategy
- **Startup Script**: Run migrations before starting backend service
- **Error Handling**: Log migration failures and exit gracefully
- **Prisma Integration**: Use Prisma CLI for migration execution

### Security Considerations
- **Internal Communication**: All internal services communicate via localhost
- **External Exposure**: Only Nginx is exposed to external traffic
- **Environment Variables**: Sensitive data passed via environment variables

## Success Metrics

1. **Deployment Success**: Container starts successfully and all services are accessible
2. **Request Routing**: API requests are correctly routed to backend, all others to frontend
3. **Performance**: No significant performance degradation compared to separate deployments
4. **Cost Reduction**: 50% reduction in hosting costs (single VPS vs. two VPS instances)
5. **Deployment Time**: Container deployment completes within 5 minutes
6. **Migration Success**: Database migrations run successfully on container startup

## Open Questions

1. **SSL Certificate Management**: Should SSL certificates be included in the container or managed externally?
2. **Container Restart Policy**: What should happen if one of the internal services fails?
3. **Log Management**: How should logs from different services be handled and accessed?
4. **Backup Strategy**: How should database backups be handled in this containerized setup?
5. **Monitoring**: What basic monitoring should be included for production deployment?
6. **Update Strategy**: How should container updates be handled without downtime?

## Implementation Phases

### Phase 1: Basic Container Setup (Week 1)
- Create Dockerfile with multi-stage build
- Set up Nginx configuration
- Configure internal service communication
- Test basic container functionality

### Phase 2: Environment Configuration (Week 2)
- Implement environment variable handling
- Configure database and Redis connections
- Set up API routing and proxy configuration
- Test with external database services

### Phase 3: Migration Integration (Week 3)
- Integrate database migration scripts
- Implement startup sequence
- Add error handling and logging
- Test migration scenarios

### Phase 4: Production Optimization (Week 4)
- Optimize container size and performance
- Add production build optimizations
- Implement proper logging and error handling
- Create deployment documentation

## Risk Assessment

### High Risk
- **Service Communication**: Internal service communication failures
- **Migration Failures**: Database migration issues during startup
- **Performance Impact**: Containerization overhead affecting performance

### Medium Risk
- **Environment Configuration**: Environment variable management complexity
- **SSL/TLS Setup**: Certificate management and HTTPS configuration
- **Update Process**: Container update and deployment procedures

### Low Risk
- **Documentation**: Deployment and maintenance documentation
- **Testing**: Container testing and validation procedures

## Conclusion

This containerized deployment solution will provide a cost-effective, production-ready deployment option for BitTrove while maintaining the application's full functionality. The single-container approach with Nginx reverse proxy will simplify deployment and maintenance while ensuring proper request routing between frontend and backend services.

The solution focuses on production deployment only, keeping development workflows unchanged, and provides a solid foundation for future enhancements such as monitoring, logging, and scaling capabilities.