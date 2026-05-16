# Todo App Server

An enterprise-grade, production-ready REST API built with **Node.js**, **Express**, and **TypeScript**, following **Hexagonal (Clean) Architecture** principles.

---

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js (v5)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Testing**: Vitest & Supertest
- **Security**: Helmet, CORS
- **Logging**: Morgan
- **Development**: TSX (for hot reloading)

---

## Architecture

This project follows **Hexagonal Architecture** (also known as Ports and Adapters) to ensure high maintainability, testability, and decoupling from external dependencies.

### Layers:
- **Domain Layer (`src/entities`)**: Contains business entities and pure business logic. No dependencies on external frameworks.
- **Application Layer (`src/use-cases`)**: Orchestrates the flow of data to and from the domain layer. Contains business-specific use cases.
- **Infrastructure Layer (`src/repositories`, `src/models`, `src/config`)**: Implements the technical details, such as database access, external APIs, and configuration.
- **Interface/Adapter Layer (`src/controller`, `src/routes`, `src/middleware`)**: Handles HTTP requests, input validation, and maps internal domain objects to external representations.

---

## Project Structure

```text
server/
├── src/
│   ├── config/          # Configuration (env, database)
│   ├── controller/      # HTTP Request handlers
│   ├── entities/        # Domain entities (Business Logic)
│   ├── interfaces/      # Contract definitions (Repository interfaces, etc.)
│   ├── middleware/      # Express middlewares (Auth, Error handling)
│   ├── models/          # Database models (Mongoose)
│   ├── repositories/    # Data access implementations
│   ├── routes/          # API route definitions
│   ├── services/        # Cross-cutting concerns and helpers
│   ├── use-cases/       # Application business rules
│   ├── utils/           # Utility functions
│   ├── validators/      # Zod validation schemas
│   ├── app.ts           # Express application setup
│   └── index.ts         # Server entry point
├── tests/               # Integration and Unit tests
└── docker-compose.yml   # Infrastructure (MongoDB)
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Check `.nvmrc` or `package.json`)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) (Optional, for local MongoDB)

### Setup

1. **Clone and install dependencies:**
   ```bash
   pnpm install
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in the root of the `server` directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://admin:password@127.0.0.1:27017/todo?authSource=admin
   JWT_SECRET=your_super_secret_key_at_least_10_chars
   JWT_EXPIRES_IN=1d
   ```

3. **Start Infrastructure (Optional):**
   ```bash
   docker compose up -d
   ```

4. **Run Development Server:**
   ```bash
   pnpm dev
   ```

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts the development server with hot reload using `tsx`. |
| `pnpm build` | Compiles TypeScript to JavaScript in the `dist` folder. |
| `pnpm start` | Runs the compiled application from the `dist` folder. |
| `pnpm test` | Runs the test suite once using `Vitest`. |
| `pnpm test:watch` | Runs tests in watch mode. |
| `pnpm test:ui` | Opens the Vitest UI for a visual test report. |

---

## API Documentation

### Auth (`/api/v1/auth`)
- `POST /signup` - Register a new user.
- `POST /login` - Authenticate and receive a JWT.

### Tasks (`/api/v1/tasks`)
- `POST /create` - Create a new task (Authenticated).
- `GET /fetch` - Fetch tasks for the logged-in user (Authenticated, Role: Admin/User).
- `GET /fetch/all` - Fetch all tasks in the system (Authenticated, Role: Admin).

> **Note**: All task routes require a valid JWT passed in the `Authorization: Bearer <token>` header. Role-based access control is enforced on specific routes.

---

## Security Features

- **Helmet**: Secures the app by setting various HTTP headers.
- **CORS**: Configured for secure cross-origin resource sharing.
- **Input Validation**: Strict schema validation using **Zod**.
- **Error Handling**: Centralized global error handler for consistent API responses.
- **Password Hashing**: Securely hashed using **bcryptjs**.

---

## Key Principles

- **SOLID Principles**: Adhered to for better code organization.
- **Dependency Injection**: Decouples services and repositories for easier testing.
- **Type Safety**: Full TypeScript implementation for robust development.
- **Clean Code**: Focused on readability and maintainability.
