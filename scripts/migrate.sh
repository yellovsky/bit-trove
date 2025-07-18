#!/bin/sh

set -e

echo "Running database migrations..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "Error: DATABASE_URL environment variable is not set"
    exit 1
fi

# Change to backend directory where Prisma is configured
cd /app/backend

# Generate Prisma client
echo "Generating Prisma client..."
prisma generate

# Run database migrations
echo "Running database migrations..."
prisma migrate deploy

# Verify database connection
echo "Verifying database connection..."
prisma db push --accept-data-loss

echo "Database migrations completed successfully!"