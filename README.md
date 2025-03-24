# Colostle Companion

A digital companion app for the Colostle tabletop role-playing game.

## Project Structure

The project is organized into two main parts:

- `/api` - Backend API built with Express.js and TypeScript
- `/ui` - Frontend UI built with React and TypeScript

## Prerequisites

- Node.js (v18 or later)
- PostgreSQL database

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/colostle-companion.git
   cd colostle-companion
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a PostgreSQL database:

   ```sql
   CREATE DATABASE colostle_companion;
   ```

4. Configure environment variables:

   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

5. Run database migrations:

   ```bash
   npm run migrate:up
   ```

6. Seed the database with initial data:
   ```bash
   npm run seed
   ```

## Development

To run both the frontend and backend in development mode:

```bash
npm run dev
```

Or run them separately:

```bash
# Run just the API
npm run dev:api

# Run just the UI
npm run dev:ui
```

## Building for Production

```bash
npm run build
```

## API Documentation

Once the server is running, API documentation is available at:

```
http://localhost:3000/api-docs
```

## Database Management

- Create a new migration:

  ```bash
  npm run migrate:create -- migration-name
  ```

- Run migrations:

  ```bash
  npm run migrate:up
  ```

- Rollback migrations:
  ```bash
  npm run migrate:down
  ```

## Testing

```bash
npm test
```

## API Design

The API follows RESTful principles with the following endpoints:

- `/api/items` - Items data
- `/api/locations` - Locations data
- `/api/encounters` - Encounters data
- `/api/events` - Events data
- `/api/ocean-encounters` - Ocean encounters data
- `/api/weather` - Weather data
- `/api/city-amenities` - City amenities data

Each endpoint supports standard CRUD operations:

- `GET /` - List all resources
- `GET /:id` - Get a specific resource
- `POST /` - Create a new resource
- `PUT /:id` - Update a resource
- `DELETE /:id` - Delete a resource

## Project Architecture

### Backend

The backend follows a layered architecture:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Implement business logic
- **Repositories**: Handle data persistence
- **Middlewares**: Implement cross-cutting concerns
- **Utils**: Utility functions and helpers

### Frontend

The frontend follows a component-based architecture:

- **Components**: Reusable UI components
- **Pages**: Full page components
- **Services**: API communication and data fetching
- **Context**: State management
- **Hooks**: Custom React hooks
- **Types**: TypeScript type definitions

## License

[MIT](LICENSE)
