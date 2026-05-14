# Server

TypeScript REST API for the todo app. Built with **Express 5**, **MongoDB (Mongoose)**, **JWT** authentication, and **Zod** request validation.

## Prerequisites

- Node.js (version compatible with the repo)
- [pnpm](https://pnpm.io/) (see `package.json` for the expected version)
- A running MongoDB instance (local or remote)

## Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create a `.env` file in this directory. Required variables are validated at startup (see `src/config/env.ts`).

   Example for local MongoDB started with the included Docker Compose file:

   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://admin:password@127.0.0.1:27017/todo?authSource=admin
   JWT_SECRET=change-me-at-least-10-chars
   JWT_EXPIRES_IN=1d
   ```

   | Variable           | Description |
   | ------------------ | ----------- |
   | `PORT`             | HTTP port (default `5000`) |
   | `NODE_ENV`         | `development`, `production`, or `test` |
   | `MONGO_URI`        | Full MongoDB connection URL (must be a valid URL) |
   | `JWT_SECRET`       | Secret for signing tokens (minimum 10 characters) |
   | `JWT_EXPIRES_IN`   | JWT lifetime (default `1d`) |

3. Start MongoDB (optional, if you use Docker):

   ```bash
   docker compose up -d
   ```

   This runs MongoDB on port **27017** with root user `admin` / `password` (see `docker-compose.yml`).

## Scripts

| Command       | Description |
| ------------- | ----------- |
| `pnpm dev`    | Run the API in development with hot reload (`tsx watch`) |
| `pnpm build`  | Compile TypeScript to `dist/` |
| `pnpm start`  | Run the compiled app (`node dist/index.js`) |

## API

Base URL (default): `http://localhost:5000`

### Health

- `GET /health` — Liveness check

### Auth (`/api/v1/auth`)

- `POST /api/v1/auth/signup` — Register (body validated with Zod)
- `POST /api/v1/auth/login` — Login; returns a JWT

### Tasks (`/api/v1/tasks`)

Protected routes: send `Authorization: Bearer <token>`.

- `POST /api/v1/tasks` — Create a task
- `GET /api/v1/tasks` — List tasks for the authenticated user

## Project layout

- `src/index.ts` — App entry: middleware, routes, 404, global error handler
- `src/config/` — Environment and database
- `src/routes/` — Route definitions
- `src/controllers/` — Request handlers
- `src/services/` — Business logic (auth, helpers)
- `src/models/` — Mongoose models
- `src/schemas/` — Zod schemas for validation
- `src/middleware/` — Auth, validation, errors
- `dist/` — Build output (generated; do not edit by hand)

## Security notes

- Uses **helmet** for security-related HTTP headers and limits JSON body size (`10kb`).
- Invalid or missing environment variables cause the process to exit on startup with a formatted error.
