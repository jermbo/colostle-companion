# PostgreSQL Database Setup with Docker

This guide will help you set up a PostgreSQL database using Docker for the Colostle Companion application.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

## Step 1: Start Docker Desktop

Make sure Docker Desktop is running on your machine. You can check this by:

1. Opening Docker Desktop application
2. Checking for the Docker icon in your system tray/menu bar
3. Running `docker info` in your terminal

## Step 2: Run the Database Container

Run the following command to start a PostgreSQL container:

```bash
docker run -d \
  --name colostle-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=colostle_companion \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  postgres:latest
```

This will:

- Create a container named `colostle-db`
- Set up PostgreSQL with username/password: postgres/postgres
- Create a database called `colostle_companion`
- Expose the database on port 5432
- Create a persistent volume for the data

## Step 3: Check if the Container is Running

```bash
docker ps
```

You should see the `colostle-db` container in the list.

## Step 4: Run Database Migrations

Once the database is running, you can apply the database migrations:

```bash
npm run migrate:up
```

## Step 5: Seed the Database (Optional)

To populate the database with initial data:

```bash
npm run seed
```

## Managing the Container

- To stop the container: `docker stop colostle-db`
- To start it again: `docker start colostle-db`
- To remove it: `docker rm -f colostle-db`

## Connection Information

- Host: localhost
- Port: 5432
- Database: colostle_companion
- Username: postgres
- Password: postgres

These settings match the default configuration in your `.env` file.
