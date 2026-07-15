# Bite Size Design

A full-stack portfolio and blog platform for showcasing design briefs and interactive code demos ("bites"). Built with Next.js 15 on the frontend and an Express 5 + PostgreSQL API on the backend.

---

## Project Structure

This monorepo contains two independent applications:

```
bite-size-web/
├── client/         # Next.js 15 frontend (App Router)
├── server/         # Express 5 REST API
└── ecosystem.config.js  # PM2 config for production
```

### Client (`/client`)

Next.js 15 app using the App Router. Handles all UI, routing, and static/server rendering. Communicates with the Express API for dynamic data.

**Key tech:** Next.js 15, React 19, Tailwind CSS v4, Editor.js, Radix UI, Sandpack, Zod, Axios

### Server (`/server`)

Express 5 REST API that serves blog/project data and manages user authentication. Connects to a PostgreSQL database.

**Key tech:** Express 5, PostgreSQL (`pg`), JWT, bcrypt, db-migrate

---

## Prerequisites

- Node.js 18+
- PostgreSQL 14+

---

## Installation

### 1. Clone the repo

```bash
git clone <repo-url>
cd bite-size-web
```

### 2. Install dependencies

From the `server` directory (installs both client and server deps):

```bash
cd server
npm run install:all
```

Or install separately:

```bash
cd client && npm install
cd ../server && npm install
```

### 3. Configure environment variables

**Server** — copy and fill in `server/example.env` as `server/.env`:

```bash
cp server/example.env server/.env
```

```env
PGUSER=your_db_user
PGPASSWORD=your_db_password
PGHOST=localhost
PGPORT=5432
PGDATABASE=bitesizedb
API_CLIENT_SECRET=your_shared_secret
JWT_SECRET=your_jwt_secret
```

**Client** — create `client/.env.local`:

```env
NEXT_PUBLIC_EXPRESS_API_KEY=your_shared_secret
EXPRESS_API_KEY=your_shared_secret
```

> The `API_CLIENT_SECRET` on the server and the `EXPRESS_API_KEY` values on the client must match — they are used for inter-service authentication.

### 4. Set up the database

```bash
cd server
npm run db:migrate   # Run schema migrations
npm run db:seed      # (Optional) Seed sample data
```

---

## Development

Run both the client and server concurrently from the `client` directory:

```bash
cd client
npm run dev
```

This starts:

| Service | URL | Description |
|---------|-----|-------------|
| Next.js (client) | http://localhost:3001 | Frontend |
| Express API (server) | http://localhost:3000 | REST API |

To run each service individually:

```bash
# Client only
cd client && npm run client-dev

# Server only
cd server && npm run dev    # nodemon with auto-reload
```

---

## Production

### Build

```bash
cd client
npm run build
```

### Start with PM2

The `ecosystem.config.js` at the project root configures both apps for production using [PM2](https://pm2.keyv.io/).

```bash
# Install PM2 globally if needed
npm install -g pm2

# Start both apps
pm2 start ecosystem.config.js

# Check status
pm2 status

# View logs
pm2 logs
```

This starts:

| PM2 App | Port | Script |
|---------|------|--------|
| `bite-size-server` | 3000 | `server/src/app.js` |
| `bite-size-client` | 3001 | Next.js `start` |

> Make sure all production environment variables (database credentials, `JWT_SECRET`, `API_CLIENT_SECRET`) are set in `ecosystem.config.js` or your deployment environment before starting.

### Start without PM2

```bash
# Server
cd server && npm run prod     # NODE_ENV=production node server.js

# Client (must be built first)
cd client && npm start
```

---

## Testing

### Client

```bash
cd client
npm test              # Jest unit tests
npm run test:watch    # Jest in watch mode
npx cypress open      # Cypress E2E tests (interactive)
npx cypress run       # Cypress E2E tests (headless)
```

### Server

```bash
cd server
npm test              # Jest + Supertest integration tests
```

---

## Database Migrations

Migrations are managed with `db-migrate` from the `server` directory:

```bash
npm run db:migrate        # Apply pending migrations
npm run db:migrate:down   # Roll back last migration
npm run db:migrate:reset  # Roll back all migrations
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/about` | About page |
| `/contact` | Contact form |
| `/briefs` | Blog post listing |
| `/briefs/[slug]` | Individual blog post |
| `/bites` | Interactive project demos |
| `/bites/[category]` | Category-filtered bites |
| `/admin` | Admin dashboard (authenticated) |
| `/admin/briefs` | Manage blog posts |
| `/admin/bites` | Manage projects |
