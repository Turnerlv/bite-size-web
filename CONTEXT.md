# Module 10 — Bite Size Design: Project Context Summary

> This document is intended for LLM ingestion. It describes the full-stack architecture, current state of the codebase, and known gaps/placeholders.

---

## Project Overview

**Bite Size Design** is a portfolio/blog full-stack web application with two content types:

- **Briefs** — Rich-text blog posts authored via an admin editor, stored in PostgreSQL, rendered on public-facing pages.
- **Bites** — Interactive project demos intended to showcase system designs using embedded live-code sandboxes (Sandpack). This content type is largely unimplemented.

The app has an admin dashboard, JWT-based authentication, role-based access control, and a test suite added in module 10.

---

## Tech Stack

### Client — `module-10/client/`
- **Next.js 15** (App Router, React Server Components + Server Actions)
- **React 19**
- **Tailwind CSS v4** (PostCSS-based, not Tailwind config class-based)
- **Axios** — browser-side API calls via a shared instance in `src/api/clients.js`
- **Editor.js** (`@editorjs/editorjs`, `@editorjs/header`, `@editorjs/list`, `@editorjs/paragraph`) — rich-text editor in the admin brief editor
- **react-hook-form** + **zod** + **@hookform/resolvers** — form validation in `BriefForm`
- **@codesandbox/sandpack-react** — installed but only used as a stub in the bites detail page
- **Lucide React** — icon library
- **Jest + React Testing Library** — unit tests for UI components
- **Cypress** — end-to-end tests

### Server — `module-10/server/`
- **Node.js** (CommonJS)
- **Express 5**
- **PostgreSQL** (`pg`) with `citext` extension
- **JWT** (`jsonwebtoken`) — 15-minute access tokens, no refresh token
- **bcrypt** — password hashing
- **cookie-parser**, **cors**, **morgan**, **dotenv**
- **Jest + Supertest** — integration tests

---

## Database Schema

Three tables in PostgreSQL:

```
users
  id, name, email (citext, unique), title (varchar), description (text), role ('user'|'admin'), created_at

user_auth
  id, user_id (FK → users.id CASCADE DELETE), provider ('local'|future OAuth), provider_key (hashed password or OAuth ID)

blogs
  id, title, description, category, image_url, content (JSONB), author_id (FK → users.id CASCADE DELETE), slug (unique), created_at
```

Key notes:
- `users.title` and `users.description` columns exist in the schema but are **not exposed or used anywhere in the application** — no API endpoint reads or writes them, and no UI displays them.
- `blogs.image_url` is stored but **not rendered** in the public brief page (a gray placeholder `div` is shown instead).
- `blogs.content` is JSONB storing serialized Editor.js block data, transformed client-side by `formatFromEditor` / `formatToEditor` utilities.

---

## Authentication

- **JWT access token** issued on login/register; payload: `{ userId, role }`, expires in **15 minutes**.
- Token is set as a cookie via `cookie-parser` on the server; read server-side by Next.js Server Components using `getServerSession()`.
- **No refresh token** — once the 15-minute token expires, the user must re-authenticate manually. There is no silent refresh, no token rotation, no sliding session.
- Roles: `'user'` and `'admin'`. Admins bypass resource ownership checks.

---

## Directory Structure Highlights

```
module-10/
├── client/src/
│   ├── api/
│   │   ├── briefs.js       # Axios + serverFetch helpers for /api/blogs
│   │   ├── bites.js        # EMPTY — no API calls implemented
│   │   ├── users.js        # Axios + serverFetch helpers for /api/users
│   │   └── clients.js      # Shared axios instance + serverFetch utility
│   ├── app/
│   │   ├── page.js                        # Homepage — static content + hardcoded bites from static.js
│   │   ├── about/page.js                  # Static about page
│   │   ├── contact/page.js                # Contact form (no backend handler — UI only)
│   │   ├── briefs/page.js                 # Blog listing — live DB data via getBriefsAction()
│   │   ├── briefs/[slug]/page.js          # Blog detail — live DB data; renders Editor.js block types
│   │   ├── bites/page.js                  # Bites listing — hardcoded static data from HOME_CONTENT
│   │   ├── bites/[slug]/page.js           # Bites detail — STUB: renders a single hardcoded Sandpack instance
│   │   ├── admin/(dashboard)/briefs/      # Admin brief management — Server Component, live DB data
│   │   ├── admin/(dashboard)/bites/       # Admin bites management — STUB: "Coming soon..." placeholder
│   │   ├── admin/(editor)/briefs/new/     # Create brief — BriefForm + RichText (EditorJS)
│   │   └── admin/(editor)/briefs/[id]/    # Edit brief — BriefForm + RichText prefilled
│   ├── components/form/
│   │   ├── RichText.js     # Standalone EditorJS wrapper using React.forwardRef + useImperativeHandle
│   │   └── BriefForm.js    # react-hook-form + zod for title/description/category/url fields
│   ├── content/static.js   # Hardcoded copy for homepage, bites listing, about, and nav
│   ├── lib/
│   │   ├── briefs.js       # Server Actions for brief CRUD
│   │   └── users.js        # Server Actions for user profile update + delete
│   └── schemas/
│       └── briefSchema.js  # Zod schema for brief form validation
└── server/src/
    ├── controllers/auth.js     # createAccount, login, changePassword
    ├── db/
    │   ├── blogQueries.js      # SQL for blogs CRUD
    │   └── userQueries.js      # SQL for users CRUD
    ├── middleware/
    │   ├── authMiddleware.js   # JWT verify, authorizeRole, verifyResourceOwner
    │   └── tokenCheck.js       # API key check (x-api-key header)
    ├── routes/
    │   ├── authRouter.js       # POST /create-account, POST /login, PUT /change-password
    │   ├── blogsRouter.js      # GET|POST|PUT|DELETE /api/blogs
    │   └── userRouter.js       # GET|PUT|DELETE /api/users
    └── scripts/
        ├── setup-db.sql        # Schema DDL
        └── seedDb.js           # Seed with sample users and blogs
```

---

## Known Gaps and Unfinished Work

### 1. Bites — Entirely Unimplemented

The Bites content type is a major placeholder throughout the entire stack:

- **`/bites` (public listing page)** — renders hardcoded static data from `src/content/static.js`. No database table for bites exists. No API exists.
- **`/bites/[slug]` (detail page)** — is a stub that renders a single hardcoded `<Sandpack template="react" />` with a "Hello Sandpack" example. No routing logic, no data fetching.
- **`/admin/bites` (admin dashboard tab)** — renders only `"Coming soon..."` text.
- **`src/api/bites.js`** — the file exists but is completely empty.
- **No database table** for bites exists in `setup-db.sql`.
- **No server routes** for bites exist.

To implement Bites fully, you would need: a `bites` DB table, server CRUD routes, a Sandpack-aware admin editor, an API module client-side, and a proper public listing + detail page that fetches from the DB.

### 2. Sandpack — No Styling or Integration

`@codesandbox/sandpack-react` is installed and appears in one stub page (`/bites/[slug]/page.js`). It renders with no custom theme, no Tailwind integration, and no data-driven file injection. The Sandpack component is not styled to match the site's design system.

### 3. Blog Detail — Hero Image Not Rendered

`blogs.image_url` is stored in the database and returned by the API, but in `briefs/[slug]/page.js` the hero image section is a fixed gray rectangle:

```jsx
<div className="w-full aspect-video bg-gray-3 rounded-xl" />
```

`post.image_url` is never consumed. The admin `BriefForm` does not include an image upload or URL input field.

### 4. Author Profile — Partial Data Only

In `briefs/[slug]/page.js`, the author sidebar renders:

- `post.author` — the user's name (a string joined from the `users` table at query time)
- A hardcoded string `"Solution architect"` as the author title
- A gray circle placeholder for the author profile image

The `users` table has `title` and `description` columns, but:
- **Neither column is selected** in `blogQueries.js` (the blog JOIN only pulls `u.name AS author`).
- **Neither column is populated** by any API endpoint.
- **No UI exists** to set or display them.
- **No profile image column or upload** exists anywhere in the schema or UI.

To wire this up: the blog query needs to join and return `u.title` and `u.description`; a user profile edit form needs to expose those fields; and the brief detail page needs to use them.

### 5. No Refresh Token

JWT access tokens expire after 15 minutes. There is no:
- Refresh token issuance on login
- `/refresh` endpoint on the server
- Silent refresh logic on the client
- Token expiry detection + redirect

When the token expires, server-side data fetching will fail silently or the user will be redirected to login. This is a known gap — the auth system is intentionally minimal for this module.

### 6. Rich Text — Limited Block Types

The `RichText.js` editor uses only three Editor.js tools: `paragraph`, `header`, and `list`. The `renderBlock` function in the brief detail page handles additional custom block types (`subheading`, `orderedList`, `unorderedList`, `labeledList`, plus a legacy `list` format), but there is no way to create those block types via the current editor config. They exist only to support legacy seed data.

Missing Editor.js tools that are not installed: image, code, quote, embed, table, delimiter.

### 7. Contact Form — No Backend

`/contact/page.js` renders a `<ContactForm />` component but there is no server route or email-sending integration backing it. The form submission goes nowhere.

### 8. "Load More Briefs" — Not Implemented

The briefs listing page (`/briefs/page.js`) renders a "Load more briefs" button but it has no `onClick` handler and no pagination logic exists on the server or client.

### 9. Bites Category Routes — Stub

The README references `app/bites/(categories)/[category]/` as a route group for filtered bites, but the category filtering logic and page components are not implemented.

---

## What IS Working

- Full brief CRUD: create, read, update, delete via admin dashboard + Editor.js
- Public briefs listing and detail pages (fetching live from PostgreSQL)
- JWT authentication: register, login, change password
- Role-based access control: admin vs. user, resource ownership enforcement
- Admin dashboard: briefs table with edit/delete row actions, user management table
- Server-side data fetching in admin: all data arrives via Server Components, no client-side hooks
- Server Actions for mutations (delete brief, update profile)
- Complete test suite: 3 server integration suites (Jest + Supertest), 23 React unit tests (Jest + RTL), 3 Cypress E2E specs
- Dark mode toggle
- Navigation: mega-menu, breadcrumbs, search UI (search is UI-only, no backend)

---

## Environment Variables

### Server (`.env`)
```
PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE
JWT_SECRET
API_CLIENT_SECRET
```

### Client (`.env.local`)
```
NEXT_PUBLIC_EXPRESS_API_KEY   # browser-side axios (x-api-key header)
EXPRESS_API_KEY               # SSR / Server Component fetch
```

Both API key values must match `API_CLIENT_SECRET` on the server.
