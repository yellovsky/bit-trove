#!/bin/bash

# BitTrove Production Deployment Script
# Usage: ./deploy-prod.sh

set -e

echo "🚀 Starting BitTrove Production Deployment..."

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo "❌ Error: .env.production file not found!"
    echo "Please create .env.production file with your production configuration."
    echo "You can copy from .env.production.example and update the values."
    exit 1
fi

# Load environment variables
export $(cat .env.production | grep -v '^#' | xargs)

# Validate required environment variables
required_vars=("DATABASE_URL" "JWT_SECRET")
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "❌ Error: Required environment variable $var is not set!"
        exit 1
    fi
done

echo "✅ Environment variables validated"

# Build and start the application
echo "🔨 Building and starting BitTrove application..."
docker-compose -f docker-compose.prod.yml up -d --build

echo "⏳ Waiting for application to start..."
sleep 10

# Check if the application is healthy
echo "🏥 Checking application health..."
if curl -f http://localhost/health > /dev/null 2>&1; then
    echo "✅ Application is healthy and running!"
    echo "🌐 Access your application at: http://localhost"
    echo "🔧 API endpoint: http://localhost/api"
else
    echo "⚠️  Application health check failed. Check logs with:"
    echo "   docker-compose -f docker-compose.prod.yml logs -f bittrove"
fi

echo "🎉 Deployment completed!"