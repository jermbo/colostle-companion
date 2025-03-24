#!/bin/bash

# Exit on error
set -e

CONTAINER_NAME="colostle-db"
DB_USER="postgres"
DB_PASSWORD="postgres"
DB_NAME="colostle_companion"

# Check if container already exists
if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "Container ${CONTAINER_NAME} already exists. Starting it if not running..."
    docker start ${CONTAINER_NAME} > /dev/null 2>&1 || true
else
    echo "Creating and starting PostgreSQL container..."
    docker run -d \
        --name ${CONTAINER_NAME} \
        -e POSTGRES_USER=${DB_USER} \
        -e POSTGRES_PASSWORD=${DB_PASSWORD} \
        -e POSTGRES_DB=${DB_NAME} \
        -p 5432:5432 \
        -v postgres_data:/var/lib/postgresql/data \
        postgres:latest
fi

# Wait for the database to be ready
echo "Waiting for PostgreSQL to be ready..."
sleep 5

# Check if the container is healthy
max_attempts=30
attempt_num=1

while [ $attempt_num -le $max_attempts ]; do
    if docker exec ${CONTAINER_NAME} pg_isready -U ${DB_USER}; then
        echo "PostgreSQL is ready!"
        break
    else
        echo "PostgreSQL is not ready yet. Attempt $attempt_num of $max_attempts..."
        sleep 2
        attempt_num=$((attempt_num + 1))
    fi
done

if [ $attempt_num -gt $max_attempts ]; then
    echo "Failed to connect to PostgreSQL after $max_attempts attempts."
    exit 1
fi

# Run database migrations (including the seed migrations)
echo "Running database migrations..."
npm run migrate:up -- -m api/migrations

echo "Database setup completed successfully!"
