# Bite Size Design — Server

Express + PostgreSQL REST API for **Bite Size Design**. Serves blog (Briefs) and user data to the Next.js frontend in `../client`. In production mode, Express also serves the Next.js static build.

## Tech Stack

- Node.js (CommonJS)
- Express 5
- PostgreSQL (`pg`) with `citext` extension
- JWT authentication (`jsonwebtoken`)
- Password hashing (`bcrypt`)
- `cookie-parser`, `cors`, `morgan`, `dotenv`
- `nodemon` (dev only)

## Project Structure

```
server/
├── controllers/
│   └── auth.js           # Auth business logic (create account, login, change password)
├── db/
│   ├── dbconn.js         # Shared PostgreSQL connection pool
│   ├── blogQueries.js    # SQL query functions for blogs
│   └── userQueries.js    # SQL query functions for users
├── middleware/
│   ├── authMiddleware.js # JWT verification + role/resource authorization
│   ├── tokenCheck.js     # API key auth (x-api-key header)
│   └── errorMiddleware.js # Centralized error mapping
├── routes/
│   ├── authRouter.js     # /api/auth endpoints
│   ├── blogsRouter.js    # /api/blogs endpoints
│   └── userRouter.js     # /api/users endpoints
├── scripts/
│   ├── setup-db.sql      # Schema: users, user_auth, blogs tables
│   ├── initDb.js         # Runs setup-db.sql against the DB
│   └── seedDb.js         # Inserts sample users and blog posts
├── utils/
│   └── appError.js       # Custom error class
├── config.js             # Reads env vars via dotenv
├── example.env           # Template — copy to .env
└── index.js              # App entry point
```

## Prerequisites

- Node.js 18+
- npm 9+
- PostgreSQL server with `citext` extension enabled

## Environment Variables

Copy `example.env` to `.env`:

```bash
cp example.env .env
```

Required variables:

| Variable            | Description                                   |
| ------------------- | --------------------------------------------- |
| `PGUSER`            | PostgreSQL username                           |
| `PGPASSWORD`        | PostgreSQL password                           |
| `PGHOST`            | PostgreSQL host                               |
| `PGPORT`            | PostgreSQL port (usually `5432`)              |
| `PGDATABASE`        | PostgreSQL database name                      |
| `JWT_SECRET`        | Secret used to sign and verify JWT tokens     |
| `API_CLIENT_SECRET` | Secret expected in `x-api-key` request header |

> The frontend reads `API_CLIENT_SECRET` from `NEXT_PUBLIC_EXPRESS_API_KEY` (browser) and `EXPRESS_API_KEY` (SSR).

## Installation

```bash
npm install
```

## PostgreSQL Setup

Initialize schema (creates `users`, `user_auth`, and `blogs` tables):

```bash
npm run db:init
```

Seed sample data:

```bash
npm run db:seed
```

> **Warning:** Seeding is destructive — it deletes all existing users and blogs before inserting sample records.

## Running the Server

Development mode (auto-reload via nodemon):

```bash
npm run dev
```

Server listens on `http://localhost:3001`.

## Testing

The server uses **Jest** with **Supertest** for integration testing. All database queries and auth middleware are mocked so tests run without a live PostgreSQL connection.

```bash
npm test
```

Test files live in `tests/integration/`:

| File           | Routes covered                                                         |
| -------------- | ---------------------------------------------------------------------- |
| `auth.test.js` | `POST /create-account`, `POST /login`, `PUT /change-password`          |
| `blogs.test.js`| All `GET`, `POST`, `PUT`, `DELETE` on `/api/blogs/**` with role checks |
| `users.test.js`| All `GET`, `PUT`, `DELETE` on `/api/users/**` with ownership checks    |

**Key test design decisions:**
- `jest.mock('../../src/db/*Queries')` isolates every test from the real database; mocked functions are configured per-test with `mockResolvedValue`
- `jest.mock('../../src/middleware/authMiddleware')` lets `authorizeRole` and `verifyResourceOwner` mock enforce actual 403 logic (non-owners blocked, admins bypass) without a real JWT
- `tests/setup.js` sets `NODE_ENV=test` and `JWT_SECRET`, then calls `jest.clearAllMocks()` after each test to prevent state bleeding between suites
- `forceExit: true` in `jest.config.js` prevents open database handles from hanging the runner after tests complete



All routes require an API key in the request header:

```
x-api-key: <value of API_CLIENT_SECRET>
```

Protected routes additionally require a JWT passed as a cookie (`token`). Tokens are issued on login/account creation, expire in 15 minutes, and carry `{ userId, role }` in the payload.

Roles:
- `user` — can create/edit/delete their own blogs and update their own profile
- `admin` — full access to all resources

## API Endpoints

Base URL: `http://localhost:3001`

### Auth — `/api/auth`

| Method | Path                        | Auth          | Description                              |
| ------ | --------------------------- | ------------- | ---------------------------------------- |
| `POST` | `/api/auth/create-account`  | API key       | Register a new user                      |
| `POST` | `/api/auth/login`           | API key       | Log in and receive a JWT cookie          |
| `PUT`  | `/api/auth/change-password` | JWT + API key | Change the authenticated user's password |

POST `/create-account` and `/login` body fields:

| Field          | Type   | Notes             |
| -------------- | ------ | ----------------- |
| `name`         | string | Required (create) |
| `email`        | string | Required          |
| `provider_key` | string | Password          |

PUT `/change-password` body fields:

| Field              | Type   | Notes    |
| ------------------ | ------ | -------- |
| `current_password` | string | Required |
| `new_password`     | string | Required |

### Blogs — `/api/blogs`

| Method   | Path                             | Auth          | Description                          |
| -------- | -------------------------------- | ------------- | ------------------------------------ |
| `GET`    | `/api/blogs`                     | API key       | Returns all blog posts               |
| `POST`   | `/api/blogs`                     | JWT + API key | Creates a new blog post              |
| `GET`    | `/api/blogs/blog-by-id/:id`      | API key       | Returns blog by numeric id           |
| `GET`    | `/api/blogs/blog-by-slug/:slug`  | API key       | Returns blog by URL slug             |
| `GET`    | `/api/blogs/by-author/:authorId` | JWT + API key | Returns blogs by a specific author   |
| `PUT`    | `/api/blogs/blog-by-id/:id`      | JWT + API key | Updates a blog post (owner or admin) |
| `DELETE` | `/api/blogs/blog-by-id/:id`      | JWT + API key | Deletes a blog post (owner or admin) |

POST/PUT body fields:

| Field         | Type    | Notes                     |
| ------------- | ------- | ------------------------- |
| `title`       | string  | Required, min 5 chars     |
| `description` | string  | Required                  |
| `category`    | string  | Required                  |
| `image_url`   | string  | Optional                  |
| `content`     | object  | EditorJS JSON block array |
| `author`      | integer | User id (POST only)       |

### Users — `/api/users`

| Method   | Path                             | Auth                  | Description                           |
| -------- | -------------------------------- | --------------------- | ------------------------------------- |
| `GET`    | `/api/users`                     | JWT + API key (admin) | Returns all users                     |
| `GET`    | `/api/users/user-by-id/:id`      | API key               | Returns user by id                    |
| `GET`    | `/api/users/user-by-name/:email` | JWT + API key (admin) | Returns user by email                 |
| `POST`   | `/api/users`                     | API key               | Creates a user                        |
| `PUT`    | `/api/users/user-by-id/:id`      | JWT + API key         | Updates user profile (owner or admin) |
| `DELETE` | `/api/users/user-by-id/:id`      | JWT + API key         | Deletes user (owner or admin)         |

## Database Schema

```sql
users
  id          SERIAL PRIMARY KEY
  name        VARCHAR(255) NOT NULL
  email       citext UNIQUE NOT NULL      -- case-insensitive
  role        VARCHAR(50) DEFAULT 'user'  -- 'user' | 'admin'
  created_at  TIMESTAMP DEFAULT NOW()

user_auth
  id            SERIAL PRIMARY KEY
  user_id       INT NOT NULL REFERENCES users(id) ON DELETE CASCADE
  provider      VARCHAR(50) NOT NULL       -- 'local' or OAuth provider
  provider_key  TEXT NOT NULL              -- bcrypt hash or OAuth token

blogs
  id           SERIAL PRIMARY KEY
  title        TEXT NOT NULL
  description  TEXT NOT NULL
  category     TEXT NOT NULL
  image_url    TEXT
  content      JSONB NOT NULL             -- EditorJS format
  author_id    INT NOT NULL REFERENCES users(id) ON DELETE CASCADE
  slug         TEXT NOT NULL UNIQUE
  created_at   TIMESTAMP DEFAULT NOW()
```

## Error Responses

| Status | Meaning                                 |
| ------ | --------------------------------------- |
| `400`  | Validation / constraint failure         |
| `401`  | Missing/invalid API key or JWT          |
| `403`  | Forbidden — insufficient role/ownership |
| `404`  | Resource not found                      |
| `409`  | Conflict (duplicate email/slug)         |
| `500`  | Internal server error                   |

## Production

Build the Next.js frontend, then run the server in production mode:

```bash
# From this (server/) directory:
npm run build:frontend   # builds ../client
npm run prod             # NODE_ENV=production node index.js
```


## Project Structure

```
server/
├── db/
│   ├── dbconn.js         # Shared PostgreSQL connection pool
│   ├── blogQueries.js    # SQL query functions for blogs
│   └── userQueries.js    # SQL query functions for users
├── middleware/
│   ├── tokenCheck.js     # API key auth (x-api-key header)
│   └── errorMiddleware.js # Centralized error mapping
├── routes/
│   ├── blogsRouter.js    # /api/blogs endpoints
│   └── userRouter.js     # /api/users endpoints
├── scripts/
│   ├── setup-db.sql      # Schema: users + blogs tables, constraints
│   ├── initDb.js         # Runs setup-db.sql against the DB
│   └── seedDb.js         # Inserts sample users and blog posts
├── utils/
│   └── slugger.js        # Unique slug generator
├── config.js             # Reads env vars via dotenv
├── example.env           # Template — copy to .env
└── index.js              # App entry point
```

## Prerequisites

- Node.js 18+
- npm 9+
- PostgreSQL server/database

## Environment Variables

Copy `example.env` to `.env`:

```bash
cp example.env .env
```

Required variables:

| Variable            | Description                                   |
| ------------------- | --------------------------------------------- |
| `PGUSER`            | PostgreSQL username                           |
| `PGPASSWORD`        | PostgreSQL password                           |
| `PGHOST`            | PostgreSQL host                               |
| `PGPORT`            | PostgreSQL port (usually `5432`)              |
| `PGDATABASE`        | PostgreSQL database name                      |
| `API_CLIENT_SECRET` | Secret expected in `x-api-key` request header |

> The frontend reads this same secret from `NEXT_PUBLIC_EXPRESS_API_KEY` (browser) and `EXPRESS_API_KEY` (SSR).

## Installation

```bash
npm install
```

## PostgreSQL Setup

Initialize schema (creates `users` and `blogs` tables):

```bash
npm run db:init
```

Seed sample data:

```bash
npm run db:seed
```

> **Warning:** Seeding is destructive — it deletes all existing users and blogs before inserting sample records.

## Running the Server

Development mode (auto-reload via nodemon):

```bash
npm run dev
```

Server listens on `http://localhost:3000`.

## Authentication

All routes require an API key sent as a request header:

```
x-api-key: <value of API_CLIENT_SECRET>
```

Missing or invalid key returns `401 Unauthorized`.

## API Endpoints

Base URL: `http://localhost:3000`

### Blogs — `/api/blogs`

| Method   | Path                            | Description                                           |
| -------- | ------------------------------- | ----------------------------------------------------- |
| `GET`    | `/api/blogs`                    | Returns all blog posts (ordered by `created_at DESC`) |
| `POST`   | `/api/blogs`                    | Creates a new blog post                               |
| `GET`    | `/api/blogs/blog-by-id/:id`     | Returns blog by numeric id                            |
| `GET`    | `/api/blogs/blog-by-slug/:slug` | Returns blog by URL slug                              |
| `PUT`    | `/api/blogs/blog-by-id/:id`     | Updates a blog post                                   |
| `DELETE` | `/api/blogs/blog-by-id/:id`     | Deletes a blog post                                   |

POST/PUT body fields:

| Field         | Type    | Notes                      |
| ------------- | ------- | -------------------------- |
| `title`       | string  | Required                   |
| `description` | string  | Required                   |
| `category`    | string  | Required                   |
| `image_url`   | string  | Optional                   |
| `content`     | object  | Editor.js JSON block array |
| `author`      | integer | User id (POST only)        |

### Users — `/api/users`

| Method   | Path                            | Description                            |
| -------- | ------------------------------- | -------------------------------------- |
| `GET`    | `/api/users`                    | Returns all users                      |
| `POST`   | `/api/users`                    | Creates a user                         |
| `GET`    | `/api/users/user-by-id/:id`     | Returns user by id                     |
| `GET`    | `/api/users/user-by-name/:name` | Returns user by name                   |
| `PUT`    | `/api/users/user-by-id/:id`     | Updates a user                         |
| `DELETE` | `/api/users/user-by-id/:id`     | Deletes user (cascades to their blogs) |

## Error Responses

| Status | Meaning                         |
| ------ | ------------------------------- |
| `400`  | Validation / constraint failure |
| `401`  | Missing or invalid API key      |
| `404`  | User or blog not found          |
| `409`  | Duplicate email                 |
| `500`  | Internal server error           |

## Production

Build the Next.js frontend, then run the server in production mode (Express will serve the static build):

```bash
# From this (server/) directory:
npm run build:frontend   # builds ../client
npm run prod             # NODE_ENV=production node index.js
```

## Example Request

```bash
curl http://localhost:3000/api/blogs \
  -H "x-api-key: yourClientSecret"
```


## Overview

This project provides:

- User management (create, list, find, update, delete)
- Blog management (create, list, find, update, delete)
- API key protection through request header validation
- PostgreSQL persistence using raw SQL queries via `pg`
- SQL scripts for schema setup and seed data

## Tech Stack

- Node.js
- Express
- PostgreSQL
- pg
- dotenv
- morgan
- nodemon

## Project Structure

- index.js: App bootstrap, middleware registration, route mounting, error handling
- config.js: Loads PostgreSQL and API key environment variables
- db/dbconn.js: Shared PostgreSQL connection pool
- db/userQueries.js: SQL query functions for users
- db/blogQueries.js: SQL query functions for blogs
- routes/userRouter.js: User endpoints
- routes/blogRouter.js: Blog endpoints
- middleware/tokenCheck.js: API key middleware (`x-api-key`)
- middleware/errorMiddleware.js: Centralized PostgreSQL/validation error mapping
- scripts/setup-db.sql: Schema, constraints, and foreign keys
- scripts/populate-db.sql: Seed records
- scripts/initDb.js: Runs schema setup SQL
- scripts/seedDb.js: Runs seed SQL

## Prerequisites

- Node.js 18+
- npm 9+
- Access to a PostgreSQL server/database

## Environment Variables

Copy `example.env` to `.env` in this folder (for example: `cp example.env .env`).

Required variables:

- PGUSER: PostgreSQL username
- PGPASSWORD: PostgreSQL password
- PGHOST: PostgreSQL host
- PGPORT: PostgreSQL port (usually `5432`)
- PGDATABASE: PostgreSQL database name
- API_CLIENT_SECRET: Secret expected in the `x-api-key` request header

Note:

- `config.js` reads `API_CLIENT_SECRET` (uppercase). Make sure your `.env` uses this exact key.

## Installation

Run from the `module-6` directory:

```bash
npm install
```

## PostgreSQL Setup

Initialize schema/tables/constraints:

```bash
node scripts/initDb.js
```

Seed sample data:

```bash
npm run db:seed
```

Seed behavior:

- Deletes all existing users and blogs
- Inserts sample users and blog posts

Important:

- Seeding is destructive and intended for local/dev environments.

## Running the API

Development mode (auto-reload):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Server currently listens on `http://localhost:3000`.

## Authentication

All routes are protected by API key middleware.

Send this header with every request:

- `x-api-key`: value of `API_CLIENT_SECRET` from `.env`

If the key is missing or invalid, API returns `401 Unauthorized`.

## API Endpoints

Base URL: `http://localhost:3000`

### Users

- GET `/api/users`
  - Returns all users

- POST `/api/users`
  - Creates a user
  - Body:
    - `name` (string, required)
    - `email` (string, required, unique, valid email)

- GET `/api/users/user-by-id/:id`
  - Returns user by id

- GET `/api/users/user-by-name/:name`
  - Returns user by name

- PUT `/api/users/user-by-id/:id`
  - Updates user
  - Body:
    - `name` (string)
    - `email` (string)

- DELETE `/api/users/user-by-id/:id`
  - Deletes user
  - Related blogs are deleted by DB foreign key cascade

### Blogs

- GET `/api/blogs`
  - Returns all blogs

- POST `/api/blogs`
  - Creates a blog post
  - Body:
    - `title` (string, required, min length 5)
    - `content` (string, required, min length 50)
    - `author` (integer user id of an existing user, required)

- GET `/api/blogs/blog-by-id/:id`
  - Returns blog by id

- PUT `/api/blogs/blog-by-id/:id`
  - Updates blog
  - Body:
    - `title` (string)
    - `content` (string)

- DELETE `/api/blogs/blog-by-id/:id`
  - Deletes blog by id

## Error Handling

Common responses:

- `400 Bad Request` (check constraint failures)
- `401 Unauthorized` (missing/invalid API key)
- `404 Not Found` (missing user/blog/author)
- `409 Conflict` (duplicate email)
- `500 Internal Server Error`

## Example Request

Create a user:

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_api_client_secret" \
  -d '{"name":"Alice","email":"alice@example.com"}'
```

## Notes for Contributors

- Keep secrets out of source files; use `.env`
- Keep `example.env` committed with placeholder values only
- Validate route changes against SQL constraints and middleware behavior
