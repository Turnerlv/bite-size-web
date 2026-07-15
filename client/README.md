# Bite Size Design — Client

Next.js 15 frontend for **Bite Size Design**, a portfolio/blog site showcasing technical Briefs (blog posts) and Bites (interactive project demos). Connects to the Express + PostgreSQL backend in `../server`.

## Tech Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS v4 (PostCSS-based)
- Axios (client-side API calls)
- Editor.js (rich-text blog editor in admin)
- Lucide React (icons)
- Concurrently (run client + server together)

## Project Structure

```
src/
├── api/
│   ├── briefs.js       # Axios + server-fetch helpers for /api/blogs
│   ├── bites.js        # API helpers for bites (projects)
│   ├── users.js        # API helpers for users
│   └── clients.js      # Shared axios instance + serverFetch utility
├── app/
│   ├── page.js                         # Homepage (/)
│   ├── about/page.js                   # About page (/about)
│   ├── contact/page.js                 # Contact page (/contact)
│   ├── briefs/
│   │   ├── page.js                     # All briefs (/briefs)
│   │   └── [slug]/page.js              # Single brief (/briefs/[slug])
│   ├── bites/
│   │   ├── page.js                     # All bites (/bites)
│   │   └── (categories)/[category]/    # Category-filtered bites
│   ├── admin/
│   │   ├── (dashboard)/                # Admin dashboard (/admin)
│   │   │   ├── layout.js
│   │   │   ├── briefs/page.js          # Manage briefs
│   │   │   └── bites/page.js           # Manage bites
│   │   └── (editor)/                   # Blog editor
│   │       ├── briefs/new/             # Create new brief
│   │       ├── briefs/[id]/            # Edit existing brief
│   │       └── bites/new/              # Create new bite
│   ├── not-found.js                    # 404 page
│   └── layout.js                       # Root layout (fonts, AppShell)
├── components/
│   ├── AppShell.js         # Wraps Navigation + Footer around all pages
│   ├── navigation/
│   │   ├── Navigation.js   # Top navigation bar with mega-menu
│   │   ├── Footer.js       # Site footer
│   │   └── ...             # Breadcrumbs, DarkToggle, Search, Tabs
│   ├── form/
│   │   └── ContactForm.js
│   └── ...                 # Button, Badge, Table, Drawer, ProductCard, etc.
├── config/
│   └── navigation.js       # Nav link definitions
├── content/
│   └── static.js           # Static copy/content constants
├── hooks/
│   └── a11y/               # Accessibility hooks (useDisclosure, etc.)
└── utils/
    └── ...                 # formatDate, readTime, etc.
```

## Pages & Routes

| Route            | File                        | Description                                                 |
| ---------------- | --------------------------- | ----------------------------------------------------------- |
| `/`              | `app/page.js`               | Homepage with hero, value prop, featured bites, contact CTA |
| `/about`         | `app/about/page.js`         | About / Our Story page                                      |
| `/contact`       | `app/contact/page.js`       | Contact form                                                |
| `/briefs`        | `app/briefs/page.js`        | Blog listing (fetches from API)                             |
| `/briefs/[slug]` | `app/briefs/[slug]/page.js` | Individual blog post                                        |
| `/bites`         | `app/bites/page.js`         | Projects / interactive demo listing                         |
| `/admin`         | `app/admin/(dashboard)/`    | Admin dashboard (redirects to `/admin/briefs`)              |
| `*`              | `app/not-found.js`          | 404 Not Found                                               |

## Prerequisites

- Node.js 18+
- The backend server running on port 3000 (`../server`)

## Environment Variables

Create a `.env.local` file in this (`client/`) directory:

```env
NEXT_PUBLIC_EXPRESS_API_KEY=yourClientSecret   # Used by browser-side axios calls
EXPRESS_API_KEY=yourClientSecret               # Used by server-side fetch (SSR/RSC)
```

The value must match `API_CLIENT_SECRET` in the server's `.env`.

## Installation

```bash
npm install
```

## Development

### Run client and server together (recommended)

From this (`client/`) directory:

```bash
npm run dev
```

This uses `concurrently` to start:
- **Next.js** on [http://localhost:3001](http://localhost:3001)
- **Express** on [http://localhost:3000](http://localhost:3000)

All `/api/*` requests from the browser are proxied to `http://localhost:3000/api/*` via `next.config.mjs` rewrites.

### Run client only

```bash
npm run client-dev
```

## Testing

### Unit & Component Tests (Jest + React Testing Library)

```bash
npm test
```

Watch mode (re-runs affected tests on save):

```bash
npm run test:watch
```

23 test files cover shared UI components, navigation, forms, and admin dashboard components. All component tests run in JSDOM with no network calls.

**UI components:**

| Test file | What it covers |
| --------- | -------------- |
| `Button.test.js` | Render variants, disabled state, loading spinner |
| `Table.test.js` | Column rendering, row click, row actions, empty state |
| `Toast.test.js` | Variant icons (success/error/default), dismiss button |
| `Drawer.test.js` | Open/close behaviour, portal rendering |
| `Input.test.js` | Label, error message, ref forwarding |
| `TextArea.test.js` | Controlled value, `defaultValue` seeding |

**Navigation components:**

| Test file | What it covers |
| --------- | -------------- |
| `NavItem.test.js`, `NavItemSecondary.test.js` | Link rendering, active state |
| `MegaMenu.test.js` | Open/close, keyboard navigation |
| `Tabs.test.js`, `Breadcrumbs.test.js` | Active tab, path-based rendering |
| `Search.test.js` | Query input, results display |
| `DarkToggle.test.js` | `prefers-color-scheme` detection, toggle state |
| `AccountMenu.test.js` | Desktop dropdown, mobile layout, logout action |

**Forms and auth:**

| Test file | What it covers |
| --------- | -------------- |
| `LoginForm.test.js` | Field validation, submit handler, server error display |
| `CreateAccountForm.test.js` | Registration flow, Zod validation errors |
| `ContactForm.test.js` | Form submission and field behaviour |
| `BriefForm.test.js` | Create/edit mode detection, category select, submit |

**Admin dashboard:**

| Test file | What it covers |
| --------- | -------------- |
| `DashboardLayout.test.js` | Welcome heading derivation, Add brief navigation |
| `BriefList.test.js` | Row rendering, delete action, optimistic update |
| `UsersList.test.js` | Row rendering, delete action |
| `UserProfile.test.js` | Profile update, password change, toast feedback |
| `ProtectedRoute.test.js` | Redirect for unauthenticated users |

---

### End-to-End Tests (Cypress)

Cypress tests require both servers running on their default ports (`3001` for Next.js, `3000` for Express).

Start both servers:

```bash
npm run dev
```

Open the interactive Cypress runner:

```bash
npx cypress open
```

Run all specs headlessly:

```bash
npx cypress run
```

**Test suites:**

| File | User flows covered |
| ---- | ------------------ |
| `auth.cy.js` | Create account, login, session enforcement (redirect), password change + re-login |
| `brief.cy.js` | Create brief, update brief, public feed rendering, delete brief |
| `users.cy.js` | Profile name update with persistence check, admin cascade-deletes user and their briefs |

Each spec calls `cy.exec('cd ../server && npm run db:seed')` in `beforeEach` to reset the database to a deterministic state before every test, making each spec fully independent.



Build is triggered from the server — see [`../server/README.md`](../server/README.md) for the full production setup.

