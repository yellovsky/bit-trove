#!/bin/sh

set -e

echo "Starting BitTrove container..."

# Function to wait for a service to be ready
wait_for_service() {
    local host=$1
    local port=$2
    local service_name=$3

    echo "Waiting for $service_name to be ready..."
    while ! nc -z $host $port; do
        sleep 1
    done
    echo "$service_name is ready!"
}

# Function to check if a service is healthy
check_service_health() {
    local url=$1
    local service_name=$2

    echo "Checking $service_name health..."
    if curl -f $url > /dev/null 2>&1; then
        echo "$service_name is healthy"
        return 0
    else
        echo "$service_name health check failed"
        return 1
    fi
}

# Start Nginx first (to handle incoming requests)
echo "Starting Nginx..."
nginx -g "daemon off;" &
NGINX_PID=$!

# Wait a moment for Nginx to start
sleep 2

# Run database migrations
# echo "Running database migrations..."
# /app/scripts/migrate.sh

# Start backend service
echo "Starting backend service..."
node /app/apps/backend/dist/src/main.js &
BACKEND_PID=$!

# Wait for backend to be ready
wait_for_service localhost 3001 "Backend"

# Check backend health
if ! check_service_health "http://localhost:3001/api/health" "Backend"; then
    echo "Backend health check failed, exiting..."
    exit 1
fi

# Start frontend service
echo "Starting frontend service..."
node /app/apps/frontend/build/server/index.js &
FRONTEND_PID=$!

# Wait for frontend to be ready
wait_for_service localhost 3000 "Frontend"

# Check frontend health
if ! check_service_health "http://localhost:3000" "Frontend"; then
    echo "Frontend health check failed, exiting..."
    exit 1
fi

echo "All services started successfully!"

# Function to handle shutdown
cleanup() {
    echo "Shutting down services..."
    kill $FRONTEND_PID 2>/dev/null || true
    kill $BACKEND_PID 2>/dev/null || true
    kill $NGINX_PID 2>/dev/null || true
    exit 0
}

# Set up signal handlers
trap cleanup SIGTERM SIGINT

# Wait for all background processes
wait