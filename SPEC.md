# School Management API - Specification

## 1. Project Overview

**Name:** School Manager API
**Type:** NestJS REST API Backend
**Description:** Multi-tenant school management system with JWT authentication, managing students, teachers, courses, evaluations, and grades.
**Stack:** NestJS + TypeORM + PostgreSQL + Passport JWT

---

## 2. Infrastructure

### 2.1 Docker Compose

```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: vibecoding_db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: school_management
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
```

### 2.2 Database Configuration (TypeORM)

- **Host:** `localhost:5432` (from `.env`: `DB_HOST=localhost`)
- **User:** `postgres`
- **Password:** `postgres`
- **Database:** `school_management`
- **SSL:** disabled

---

## 3. Module Structure

| Module | Entity | Description |
|--------|--------|-------------|
| `tenants` | `Tenant` | Multi-tenant organization support |
| `auth` | `SuperAdmin`, `PasswordResetToken` | Super admin auth, email-based password reset |
| `users` | `User` | Base user entity |
| `students` | `Student` | Student records |
| `teachers` | `Teacher` | Teacher records |
| `courses` | `Course`, `CourseStudent` | Courses and enrollment |
| `evaluations` | `Evaluation` | Course evaluations |
| `grades` | `Grade` | Student grades |
| `stats` | - | Statistics endpoints |
| `admins` | - | Admin management |

---

## 4. Authentication

- **Type:** JWT Bearer token
- **Guard:** `JwtAuthGuard` applied globally
- **Public routes:** Decorated with `@Public()`
- **Super Admin:** Email/password login, separate from tenant users

---

## 5. Environment Variables

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=school_management

JWT_SECRET=super-secret-key-change-in-production
JWT_EXPIRATION=8h

SEED_DATABASE=true
SEED_DATABASE_FORCE=true
```

---

## 6. Known Issues

### Docker Database Not Starting

**Symptom:** App cannot connect to database; Docker container may be named `transportgps_db` instead of `vibecoding_db`.

**Root Cause:** Previous run used a different compose project name (`transportgps`).

**Fix:**
```bash
# Remove old container and volume
docker compose -p vibecoding down -v

# Recreate
docker compose up -d
```

---

## 7. Commands

```bash
# Start database
docker compose up -d

# Run migrations / seed
npm run start:dev

# Build
npm run build
```