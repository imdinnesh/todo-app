# Todo App - Clean Architecture

This project is built using a consistent, layered architecture based on the **Use Case** pattern. This ensures the code is testable, maintainable, and decoupled from external frameworks like Express or Mongoose.

## 📁 Directory Structure

```text
server/src/
├── controller/     # Express-aware layer (extracts req, sends res)
├── use-cases/      # Application logic (orchestrates services/repos)
├── services/       # Small building blocks (hashing, emails, payments)
├── repositories/   # Database operations (Mongoose/MongoDB)
├── models/         # Database schemas
├── routes/         # Endpoint definitions & Dependency Injection
├── validators/     # Request validation (Zod schemas)
└── utils/          # Shared utilities (ApiResponse, AppError)
```

## 🛡️ Layer Responsibilities

### 1. Route Layer
The "Wiring" layer. It maps endpoints to controllers and injects all dependencies (DI).
- **File:** `routes/auth.route.ts`

### 2. Controller Layer
The "Adapter" layer. It translates HTTP requests into simple data objects for the Use Cases.
- **Responsibility:** req/res handling, status codes.
- **File:** `controller/auth.controller.ts`

### 3. Use Case Layer (Interactors)
The "Brain" of the application. Every business action is its own Use Case.
- **Responsibility:** Orchestrating the flow of data.
- **File:** `use-cases/login.use-case.ts`

### 4. Service Layer
The "Worker" layer. Contains logic that doesn't belong in a repository or use case.
- **Responsibility:** Hashing, Token generation, Third-party APIs (Stripe, SendGrid).
- **File:** `services/auth.service.ts`

### 5. Repository Layer
The "Data" layer. The only place where database-specific queries live.
- **Responsibility:** CRUD operations.
- **File:** `repositories/user.repository.ts`

## ✅ Benefits
- **Testability:** You can test `LoginUseCase` by mocking the Repository and AuthService without running a server.
- **Consistency:** Every feature follows the same pattern.
- **Independence:** The business logic is independent of the UI, Database, and Framework.
