# PR: Module 10 — Testing & Quality Assurance

## Summary

This module adds a comprehensive test suite across the full stack — 3 server-side integration test suites using Jest + Supertest, 23 React component unit tests using Jest + React Testing Library, and 3 Cypress end-to-end test suites simulating complete user journeys. Alongside the tests, the admin dashboard was refactored to move all data-fetching into Next.js Server Components and Server Actions, eliminating client-side API hooks, improving performance, and making components fully testable as pure functions of their props.

---

## Server Changes

### Integration Tests (new)
- Added `tests/integration/auth.test.js` — covers `POST /create-account`, `POST /login`, and `PUT /change-password`; mocks `userQueries` and auth middleware to isolate controller logic from the database
- Added `tests/integration/blogs.test.js` — covers all CRUD routes with role-based assertions; `authorizeRole` and `verifyResourceOwner` mocks enforce real 403 logic (non-owners blocked, admins bypass) without a live JWT
- Added `tests/integration/users.test.js` — covers `GET /users`, `GET /user-by-id/:id`, `PUT`, and `DELETE` routes with ownership and admin-role checks
- Added `tests/setup.js` — global lifecycle hooks; sets `NODE_ENV=test` and `JWT_SECRET` before all suites; calls `jest.clearAllMocks()` after each test to prevent state bleed

### Bug Fix
- Fixed `getBlogById` SQL query — was missing `b.author_id` in the `SELECT`, causing `verifyResourceOwner` to always compare `req.user.userId !== undefined` (always `true`) and reject all non-admin resource updates with a spurious 403

---

## Client Changes

### React Component Unit Tests (new)
- 23 test files covering shared UI components, navigation, forms, and admin dashboard components using Jest + React Testing Library
- **Shared UI:** `Button`, `Table`, `Toast`, `Drawer`, `Input`, `TextArea`
- **Navigation:** `NavItem`, `NavItemSecondary`, `MegaMenu`, `Tabs`, `Breadcrumbs`, `Search`, `DarkToggle`, `AccountMenu`
- **Forms:** `LoginForm`, `CreateAccountForm`, `ContactForm`, `BriefForm`
- **Admin dashboard:** `DashboardLayout`, `BriefList`, `UsersList`, `UserProfile`, `ProtectedRoute`
- Fixed Radix UI `DropdownMenu` test isolation — the `onAnimationEnd` gate that sets `isReady` never fires in JSDOM; mocked the entire `@radix-ui/react-dropdown-menu` module using React context with a `useEffect` to fire `onAnimationEnd` synthetically
- Fixed Radix UI `Toast` dismiss — Radix uses pointer capture which JSDOM doesn't support; replaced `userEvent.click` with `fireEvent.click` for the dismiss button

### End-to-End Tests with Cypress (new)
- `cypress/e2e/auth.cy.js` — create account → login → session enforcement (redirect) → password change + re-authentication with new credentials
- `cypress/e2e/brief.cy.js` — brief creation with EditorJS content, content update, public feed rendering, brief deletion via row actions dropdown
- `cypress/e2e/users.cy.js` — profile name change persisted across re-login, admin deletes a user and verifies their briefs are cascade-deleted from the database
- All specs call `cy.exec('cd ../server && npm run db:seed')` in `beforeEach` for fully isolated, deterministic state per test

### Admin Dashboard — Server-Side Data Fetching Refactor
- Converted all admin page components to async Next.js Server Components; data is now fetched server-side using `serverFetch` utilities that read the JWT directly from the request cookie via `getServerSession()`
- Eliminated `useFetchUser` and `useFetchBriefs` client-side hooks; data is passed as props from the server component to child client components
- All mutations converted to `'use server'` inline Server Actions (e.g., `handleDelete` in `briefs/page.js` and `users/page.js`, `updateProfileAction` in `lib/users.js`)
- `UserProfile`, `BriefList`, and `UsersList` refactored to accept data and action props — no internal data-fetching, no network mocks needed in Jest

### BriefForm & Schema Validation
- Integrated `react-hook-form` + `zodResolver` into `BriefForm` with a new `briefSchema` (`src/schemas/briefSchema.js`) enforcing title length, description, category enum, and optional URL format
- Extracted EditorJS logic into a standalone `RichText` component (`src/components/form/RichText.js`) using `React.forwardRef` + `useImperativeHandle` exposing a `{ save(), clear() }` API
- Fixed `TextArea` internal state — extracted `defaultValue` from the spread props to correctly seed `useState` on mount without conflicting with React's controlled-component warnings

---

## Key Design Decisions

### Cypress over Selenium
Cypress was chosen over Selenium for end-to-end testing:
- **No WebDriver bridge:** Cypress runs inside the browser's event loop directly, giving it synchronous access to the same runtime as the application
- **Automatic retry-ability:** Assertions retry until they pass or time out, eliminating the explicit waits and `sleep` calls common in Selenium scripts
- **`cy.exec()` for test isolation:** Direct shell access lets each spec reset the database to a known seed state before every test without a separate test harness or fixtures server
- **Time-travel debugging:** The Cypress Test Runner captures DOM snapshots at each command step, making it significantly faster to diagnose failures than reading Selenium WebDriver logs

### Next.js Server-Side Data Fetching
The admin dashboard was refactored from client-fetching hooks to a server-first architecture:
- **JWT stays in the cookie:** Server components read the token directly from the incoming request — it never touches client-side JavaScript, reducing XSS exposure compared to the previous `localStorage` user-object approach
- **Zero loading states in components:** Data arrives fully-formed as props from the server; no skeleton screens, no `useEffect` on mount, no axios calls from the browser
- **Mutations as Server Actions:** `'use server'` functions are colocated with their page, called directly from client event handlers — no separate API client layer on the client side
- **Testability:** Components are now pure functions of their props; Jest + RTL tests render them with plain prop values and assert on output, with no need to mock fetch, axios, or React Query

---

## Dependencies Added

### Server
- `supertest` (dev) — HTTP assertion library for integration-testing Express routes

### Client
- `cypress` (dev) — End-to-end testing framework
- `zod` — Runtime schema validation
- `@hookform/resolvers` — Connects Zod schemas to `react-hook-form`
- `react-hook-form` — Performant, uncontrolled-first form state management

---

<!-- # PR: Module 9 — Authentication, Authorization & Admin Dashboard

## Summary

This module rebuilds the Bite Size Design full-stack app with a complete authentication and authorization system, replacing the previous API-key-only approach. It introduces JWT-based auth, role-based access control, resource ownership enforcement, a full admin dashboard, and a rich blog editor. The frontend is refactored to support protected routes, user sessions, and form validation.

---

## Server Changes

### Authentication System (new)
- Added `controllers/auth.js` with `createAccount`, `login`, and `changePassword` logic
- Passwords hashed with **bcrypt** before storage in a separate `user_auth` table
- JWT tokens signed with `JWT_SECRET`, expire in 15 minutes, carry `{ userId, role }` payload
- Tokens returned on login/register and set as an `httpOnly`-style cookie via `cookie-parser`
- Added `authRouter.js` with `POST /create-account`, `POST /login`, `PUT /change-password`

### Role-Based Access Control (new)
- Added `middleware/authMiddleware.js` with three composable guards:
  - `verifyToken` — validates JWT from cookie, attaches `req.user`
  - `authorizeRole(...roles)` — restricts routes to specific roles; admins always pass
  - `verifyResourceOwner` / `verifyUserOwner` — ensures users can only modify their own resources; admins bypass
- Applied to all write routes on `blogsRouter` and `userRouter`
- Admin-only routes: `GET /api/users`, `GET /api/users/user-by-name/:email`

### Schema Changes
- Split user credentials out of the `users` table into a new `user_auth` table (`user_id`, `provider`, `provider_key`)
- `users.email` now uses the `citext` PostgreSQL extension for case-insensitive uniqueness
- Added `user.role` column (`'user'` | `'admin'`, default `'user'`)
- Added `GET /api/blogs/by-author/:authorId` route + `getBlogsByAuthor` query

### Bug Fixes
- Fixed `app.use(cookieParser)` → `app.use(cookieParser())` (middleware was never invoked)
- Removed unused `author` query param from `GET /api/blogs`

---

## Client Changes

### Auth & Session Management (new)
- Added `AuthContext` providing `{ user, token, isLoggedIn, isAdmin, loading, login, logout }`
- JWT stored in cookies (`js-cookie`, 7-day expiry, `sameSite: Strict`); user object in `localStorage`
- `ProtectedRoute` — redirects unauthenticated users to `/login`
- `PrivateRoute` — renders 404 for non-admin users
- `useCreateAccount` and `useLogin` hooks in `useAuthActions.js` handle form submission, error state, and post-auth redirect
- `useResetPassword` hook validates current password via the server before updating
- Removed `router.refresh()` before `router.push()` to fix slow auth redirects

### Form Validation with Zod
- Added `@hookform/resolvers` + `zod`
- Schemas in `src/schemas/authSchema.js`: `loginSchema`, `createUserSchema`, `updatePasswordSchema`, `updateProfileSchema`
- All auth forms and the profile password form use `react-hook-form` + `zodResolver`
- Fixed `onClick={() => handleSwitch}` → `onClick={handleSwitch}` on form switch buttons
- Fixed `isPage: 'false'` → `isPage={false}` (invalid JSX string prop)

### Admin Dashboard (new)
- `/admin/briefs` — lists all briefs (admins see all; regular users see only their own via `by-author` endpoint)
- `/admin/profile` — view and edit profile; password reset form with Zod validation
- `/admin/users` — user management table (admin only, `PrivateRoute`)
- `BriefList` component handles optimistic delete and row actions
- `Table` component: optional add button, active state on row action trigger

### Blog Editor (new)
- EditorJS integration (`@editorjs/editorjs`, `header`, `list`, `paragraph`)
- `BriefForm` supports both create and edit modes (detected from URL)
- `formatFromEditor` / `formatToEditor` utilities convert between EditorJS output and DB JSONB format
- Supports `subheading`, `orderedList`, `unorderedList`, and `labeledList` block types
- Fixed `useEffect` that was clearing form fields on every parent re-render

### Toast Notification System (new)
- Radix UI `@radix-ui/react-toast` with custom `Toast`, `ToastViewport`, `ToastProvider` components
- `NotificationContext` / `useNotification()` provides a `showToast(title, description, variant)` API
- Three variants: `default` (info icon), `success` (green check), `error` (alert circle)
- Slide-in from right animation via `tailwindcss-animate` plugin

### Navigation & Account Menu (new)
- `AccountMenu` component: desktop dropdown (`@radix-ui/react-dropdown-menu`) + mobile inline buttons
- Login button hidden on `/login` and `/create-account` paths (uses `usePathname()`)
- Fixed mobile nav height calculation (`menu === 'flex' && isMobile`)

### Refactors & Code Organization
- Fetch logic extracted into reusable hooks: `useFetchUser`, `useFetchBriefs`
- `UserProfile` component extracted from profile page; `BriefList` self-fetches via `useFetchBriefs`
- Pages reduced to thin `<ProtectedRoute><Component /></ProtectedRoute>` wrappers
- API client split into `client` (axios with credentials) and server-side `serverFetch` methods per resource

### Design Tokens
- Added 12-step green scale (light + dark) and semantic success tokens (`--success`, `--success-surface`, `--success-border`) to `globals.css`
- Registered `tailwindcss-animate` via `@plugin` in `globals.css`

---

## Dependencies Added

### Server
- `bcrypt` — password hashing
- `jsonwebtoken` — JWT signing/verification
- `cookie-parser` — cookie middleware
- `cors` — cross-origin resource sharing
- `validator` — email/data validation helpers

### Client
- `@radix-ui/react-toast` — accessible toast primitives
- `@radix-ui/react-dropdown-menu` — account menu dropdown
- `@hookform/resolvers` + `zod` — schema-based form validation
- `@editorjs/editorjs`, `@editorjs/header`, `@editorjs/list`, `@editorjs/paragraph` — rich text editor
- `js-cookie` — cookie management
- `tailwindcss-animate` — Tailwind animation utilities -->


## Summary

This module rebuilds the Bite Size Design full-stack app with a complete authentication and authorization system, replacing the previous API-key-only approach. It introduces JWT-based auth, role-based access control, resource ownership enforcement, a full admin dashboard, and a rich blog editor. The frontend is refactored to support protected routes, user sessions, and form validation.

---

## Server Changes

### Authentication System (new)
- Added `controllers/auth.js` with `createAccount`, `login`, and `changePassword` logic
- Passwords hashed with **bcrypt** before storage in a separate `user_auth` table
- JWT tokens signed with `JWT_SECRET`, expire in 15 minutes, carry `{ userId, role }` payload
- Tokens returned on login/register and set as an `httpOnly`-style cookie via `cookie-parser`
- Added `authRouter.js` with `POST /create-account`, `POST /login`, `PUT /change-password`

### Role-Based Access Control (new)
- Added `middleware/authMiddleware.js` with three composable guards:
  - `verifyToken` — validates JWT from cookie, attaches `req.user`
  - `authorizeRole(...roles)` — restricts routes to specific roles; admins always pass
  - `verifyResourceOwner` / `verifyUserOwner` — ensures users can only modify their own resources; admins bypass
- Applied to all write routes on `blogsRouter` and `userRouter`
- Admin-only routes: `GET /api/users`, `GET /api/users/user-by-name/:email`

### Schema Changes
- Split user credentials out of the `users` table into a new `user_auth` table (`user_id`, `provider`, `provider_key`)
- `users.email` now uses the `citext` PostgreSQL extension for case-insensitive uniqueness
- Added `user.role` column (`'user'` | `'admin'`, default `'user'`)
- Added `GET /api/blogs/by-author/:authorId` route + `getBlogsByAuthor` query

### Bug Fixes
- Fixed `app.use(cookieParser)` → `app.use(cookieParser())` (middleware was never invoked)
- Removed unused `author` query param from `GET /api/blogs`

---

## Client Changes

### Auth & Session Management (new)
- Added `AuthContext` providing `{ user, token, isLoggedIn, isAdmin, loading, login, logout }`
- JWT stored in cookies (`js-cookie`, 7-day expiry, `sameSite: Strict`); user object in `localStorage`
- `ProtectedRoute` — redirects unauthenticated users to `/login`
- `PrivateRoute` — renders 404 for non-admin users
- `useCreateAccount` and `useLogin` hooks in `useAuthActions.js` handle form submission, error state, and post-auth redirect
- `useResetPassword` hook validates current password via the server before updating
- Removed `router.refresh()` before `router.push()` to fix slow auth redirects

### Form Validation with Zod
- Added `@hookform/resolvers` + `zod`
- Schemas in `src/schemas/authSchema.js`: `loginSchema`, `createUserSchema`, `updatePasswordSchema`, `updateProfileSchema`
- All auth forms and the profile password form use `react-hook-form` + `zodResolver`
- Fixed `onClick={() => handleSwitch}` → `onClick={handleSwitch}` on form switch buttons
- Fixed `isPage: 'false'` → `isPage={false}` (invalid JSX string prop)

### Admin Dashboard (new)
- `/admin/briefs` — lists all briefs (admins see all; regular users see only their own via `by-author` endpoint)
- `/admin/profile` — view and edit profile; password reset form with Zod validation
- `/admin/users` — user management table (admin only, `PrivateRoute`)
- `BriefList` component handles optimistic delete and row actions
- `Table` component: optional add button, active state on row action trigger

### Blog Editor (new)
- EditorJS integration (`@editorjs/editorjs`, `header`, `list`, `paragraph`)
- `BriefForm` supports both create and edit modes (detected from URL)
- `formatFromEditor` / `formatToEditor` utilities convert between EditorJS output and DB JSONB format
- Supports `subheading`, `orderedList`, `unorderedList`, and `labeledList` block types
- Fixed `useEffect` that was clearing form fields on every parent re-render

### Toast Notification System (new)
- Radix UI `@radix-ui/react-toast` with custom `Toast`, `ToastViewport`, `ToastProvider` components
- `NotificationContext` / `useNotification()` provides a `showToast(title, description, variant)` API
- Three variants: `default` (info icon), `success` (green check), `error` (alert circle)
- Slide-in from right animation via `tailwindcss-animate` plugin

### Navigation & Account Menu (new)
- `AccountMenu` component: desktop dropdown (`@radix-ui/react-dropdown-menu`) + mobile inline buttons
- Login button hidden on `/login` and `/create-account` paths (uses `usePathname()`)
- Fixed mobile nav height calculation (`menu === 'flex' && isMobile`)

### Refactors & Code Organization
- Fetch logic extracted into reusable hooks: `useFetchUser`, `useFetchBriefs`
- `UserProfile` component extracted from profile page; `BriefList` self-fetches via `useFetchBriefs`
- Pages reduced to thin `<ProtectedRoute><Component /></ProtectedRoute>` wrappers
- API client split into `client` (axios with credentials) and server-side `serverFetch` methods per resource

### Design Tokens
- Added 12-step green scale (light + dark) and semantic success tokens (`--success`, `--success-surface`, `--success-border`) to `globals.css`
- Registered `tailwindcss-animate` via `@plugin` in `globals.css`

---

## Dependencies Added

### Server
- `bcrypt` — password hashing
- `jsonwebtoken` — JWT signing/verification
- `cookie-parser` — cookie middleware
- `cors` — cross-origin resource sharing
- `validator` — email/data validation helpers

### Client
- `@radix-ui/react-toast` — accessible toast primitives
- `@radix-ui/react-dropdown-menu` — account menu dropdown
- `@hookform/resolvers` + `zod` — schema-based form validation
- `@editorjs/editorjs`, `@editorjs/header`, `@editorjs/list`, `@editorjs/paragraph` — rich text editor
- `js-cookie` — cookie management
- `tailwindcss-animate` — Tailwind animation utilities -->
