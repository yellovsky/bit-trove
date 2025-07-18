#!/bin/sh

# wait-for.sh - Wait for a service to be ready
# Usage: ./wait-for.sh host:port [timeout] [command]

set -e

host=$(printf "%s\n" "$1"| cut -d : -f 1)
port=$(printf "%s\n" "$1"| cut -d : -f 2)
shift

timeout=${WAITFORIT_TIMEOUT:-30}
command="$@"

echo "Waiting for $host:$port..."

# Install netcat if not available
if ! command -v nc >/dev/null 2>&1; then
    echo "Installing netcat..."
    apk add --no-cache netcat-openbsd
fi

# Wait for the service to be ready
for i in $(seq 1 $timeout); do
    if nc -z "$host" "$port" >/dev/null 2>&1; then
        echo "$host:$port is ready!"
        if [ $# -gt 0 ]; then
            exec $command
        fi
        exit 0
    fi
    echo "Waiting for $host:$port... ($i/$timeout)"
    sleep 1
done

echo "Timeout waiting for $host:$port"
exit 1