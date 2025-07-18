# BitTrove Production Deployment Guide

This guide covers deploying BitTrove to production using Docker and Docker Compose.

## Prerequisites

- Docker and Docker Compose installed on your server
- External PostgreSQL database (managed service or self-hosted)
- External Redis instance (managed service or self-hosted)
- Domain name and SSL certificate (recommended)

## Quick Start

### 1. Prepare Environment Configuration

```bash
# Copy the production environment template
cp production.env.template .env.production

# Edit the configuration with your actual values
nano .env.production
```

### 2. Generate Secure JWT Secret

```bash
# Generate a secure JWT secret
openssl rand -base64 32
```

Update the `JWT_SECRET` in your `.env.production` file with the generated value.

### 3. Deploy the Application

```bash
# Run the deployment script
./deploy-prod.sh
```

Or manually:

```bash
# Build and start the application
docker-compose -f docker-compose.prod.yml up -d --build

# Check logs
docker-compose -f docker-compose.prod.yml logs -f bittrove
```

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `JWT_SECRET` | Secret key for JWT tokens | `generated-secret-key` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Application environment | `production` |
| `PORT` | Backend port | `3000` |
| `JWT_EXPIRES_IN` | JWT token expiration | `7d` |
| `CORS_ORIGIN` | Allowed CORS origin | `https://yourdomain.com` |
| `UPLOAD_MAX_SIZE` | Max file upload size | `10mb` |
| `LOG_LEVEL` | Logging level | `info` |
| `RATE_LIMIT_WINDOW` | Rate limit window | `15m` |
| `RATE_LIMIT_MAX` | Rate limit max requests | `100` |

## Production Considerations

### Security

1. **Use strong JWT secrets** - Generate with `openssl rand -base64 32`
2. **Set proper CORS origins** - Only allow your production domain
3. **Use HTTPS** - Set up SSL/TLS with a reverse proxy
4. **Database security** - Use strong passwords and network restrictions
5. **Regular updates** - Keep Docker images and dependencies updated

### Performance

1. **Database optimization** - Use connection pooling
2. **Redis caching** - Configure proper cache settings
3. **CDN** - Use a CDN for static assets
4. **Monitoring** - Set up application monitoring

### Monitoring

1. **Health checks** - The container includes health checks
2. **Logs** - Configure log rotation and monitoring
3. **Metrics** - Set up application metrics collection

## SSL/TLS Setup

### Using Nginx Reverse Proxy (Recommended)

Create an Nginx configuration for SSL termination:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /path/to/your/cert.pem;
    ssl_certificate_key /path/to/your/key.pem;

    location / {
        proxy_pass http://localhost:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Using Let's Encrypt

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com
```

## Database Setup

### PostgreSQL

1. **Create database and user**:
```sql
CREATE DATABASE bittrove_production;
CREATE USER bittrove_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE bittrove_production TO bittrove_user;
```

2. **Run migrations** (handled automatically by the startup script)

### Redis

1. **Configure Redis for production**:
```conf
# redis.conf
maxmemory 256mb
maxmemory-policy allkeys-lru
save 900 1
save 300 10
save 60 10000
```

## Troubleshooting

### Common Issues

1. **Application won't start**:
   ```bash
   # Check logs
   docker-compose -f docker-compose.prod.yml logs bittrove

   # Check environment variables
   docker-compose -f docker-compose.prod.yml config
   ```

2. **Database connection issues**:
   - Verify `DATABASE_URL` format
   - Check network connectivity
   - Ensure database is accessible

3. **Health check failures**:
   - Check if the application is starting properly
   - Verify port mappings
   - Check for dependency issues

### Useful Commands

```bash
# View application logs
docker-compose -f docker-compose.prod.yml logs -f bittrove

# Restart the application
docker-compose -f docker-compose.prod.yml restart bittrove

# Update and redeploy
docker-compose -f docker-compose.prod.yml up -d --build

# Stop the application
docker-compose -f docker-compose.prod.yml down

# Check container status
docker-compose -f docker-compose.prod.yml ps
```

## Backup Strategy

### Database Backups

```bash
# Create backup script
#!/bin/bash
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Application Backups

```bash
# Backup application data
docker run --rm -v bittrove_app_data:/data -v $(pwd):/backup alpine tar czf /backup/app_backup_$(date +%Y%m%d_%H%M%S).tar.gz /data
```

## Scaling

For horizontal scaling, consider:

1. **Load balancer** - Use Nginx or HAProxy
2. **Multiple instances** - Run multiple containers
3. **Database clustering** - Use PostgreSQL clustering
4. **Redis clustering** - Use Redis Cluster or Sentinel

## Support

For issues and questions:
1. Check the logs: `docker-compose -f docker-compose.prod.yml logs -f bittrove`
2. Verify environment variables
3. Check network connectivity
4. Review this documentation