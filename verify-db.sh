#!/bin/bash

# Exit on error
set -e

CONTAINER_NAME="colostle-db"
DB_USER="postgres"
DB_PASSWORD="postgres"
DB_NAME="colostle_companion"

echo "Verifying database setup..."

echo "1. Checking container status..."
if docker ps -f "name=${CONTAINER_NAME}" --format '{{.Names}}' | grep -q "${CONTAINER_NAME}"; then
    echo "✅ Container ${CONTAINER_NAME} is running."
else
    echo "❌ Container ${CONTAINER_NAME} is not running."
    exit 1
fi

echo "2. Verifying database connection..."
if docker exec ${CONTAINER_NAME} pg_isready -U ${DB_USER}; then
    echo "✅ Database connection is working."
else
    echo "❌ Database connection failed."
    exit 1
fi

echo "3. Checking tables and data..."
TABLE_COUNT=$(docker exec ${CONTAINER_NAME} psql -U ${DB_USER} -d ${DB_NAME} -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';")
ITEMS_COUNT=$(docker exec ${CONTAINER_NAME} psql -U ${DB_USER} -d ${DB_NAME} -t -c "SELECT COUNT(*) FROM items;")
LOCATIONS_COUNT=$(docker exec ${CONTAINER_NAME} psql -U ${DB_USER} -d ${DB_NAME} -t -c "SELECT COUNT(*) FROM locations;")

echo "   - Tables in database: ${TABLE_COUNT}"
echo "   - Items in items table: ${ITEMS_COUNT}"
echo "   - Locations in locations table: ${LOCATIONS_COUNT}"

if [ "$(echo ${ITEMS_COUNT} | tr -d ' ')" -gt "0" ] && [ "$(echo ${LOCATIONS_COUNT} | tr -d ' ')" -gt "0" ]; then
    echo "✅ Database has been properly seeded with data."
else
    echo "❌ Database does not contain expected data."
    exit 1
fi

echo "✅ Database verification complete! Everything is working correctly."
