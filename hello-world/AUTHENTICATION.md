# Authentication System

This document explains how the authentication system works in this application.

## Overview

The authentication system implements role-based access control (RBAC) with three user roles:
- **admin**: Full access to all system features
- **professor**: Can manage subjects and grades
- **aluno** (student): Can view their own grades

## Authentication Flow

### 1. Login

To authenticate, send a POST request to `/api/v1/auth/login` with the following payload:

```json
{
  "email": "user@example.com",
  "senha": "password123"
}
```

On successful authentication, the response will be:

```json
{
  "user": {
    "id": 1,
    "nome": "User Name",
    "email": "user@example.com",
    "role": "admin"
  }
}
```

### 2. Logout

To logout, send a POST request to `/api/v1/auth/logout`. This endpoint requires authentication.

## Role-Based Access Control

The system provides middleware to restrict access based on user roles:

### Admin Only
```typescript
router.get('/admin-only-route', handler).use(middleware.auth()).use(middleware.admin())
```

### Professor Only
```typescript
router.get('/professor-only-route', handler).use(middleware.auth()).use(middleware.professor())
```

### Student Only
```typescript
router.get('/student-only-route', handler).use(middleware.auth()).use(middleware.student())
```

## Implementation Details

### User Model
The [User](./app/models/user.ts) model includes:
- `nome` (name)
- `email` (unique identifier)
- `senha` (hashed password)
- `role` (enum: admin, professor, aluno)

Helper methods are available to check user roles:
- `isAdmin()`
- `isProfessor()`
- `isAluno()`

### Middleware
Custom middleware files are located in [./app/middleware](./app/middleware):
- [admin_middleware.ts](./app/middleware/admin_middleware.ts)
- [professor_middleware.ts](./app/middleware/professor_middleware.ts)
- [student_middleware.ts](./app/middleware/student_middleware.ts)

### Controllers
The [AuthController](./app/controllers/auth_controller.ts) handles:
- User login with credential validation
- User logout

### Routes
Authentication routes are defined in [routes.ts](./start/routes.ts):
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`

## Testing

Run tests with:
```bash
npm test
```

## Seeding Test Data

To seed test users, run:
```bash
node ace db:seed
```

This creates:
- Admin user: admin@example.com / password123
- Professor user: professor@example.com / password123
- Student user: aluno@example.com / password123