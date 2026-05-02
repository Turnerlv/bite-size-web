# Bite Size Design — Content Strategy

> "Resources and services to enable creative technologists to build their best."

This document maps every public route on the site to its content purpose, messaging, and the specific content blocks it contains. Use it when writing copy, planning new pages, or auditing existing content for consistency.

---

## Content Pillars

The site serves two interlocked audiences and purposes:

| Pillar | Purpose | Audience |
|---|---|---|
| **Community** | Free UI patterns, components, and experiments to learn from and reuse | Designers learning to code, developers refining their design eye |
| **Services** | Commercial work — design systems, frontend engineering, consulting | Teams and founders who need expert help building products |

Every page should reinforce at least one pillar. The brand voice is: **direct, technically confident, and slightly irreverent** — "playful on the surface, serious underneath."

---

## Site Map

```
/                           Home
├── /about
│   ├── /about/our_story    Brand story & mission
│   ├── /about/services     Services offering
│   └── /about/blog         Editorial blog
├── /bites                  Pattern library hub
│   ├── /bites/foundations  Typography, spacing, base styles
│   ├── /bites/theming      Color system & dark mode
│   ├── /bites/components   Component showcase
│   ├── /bites/categories   Browse by discipline
│   └── /bites/technology   Stack & feasibility principles
└── /styleguide             Internal design system reference (not in nav)
```

---

## Route Content Map

---

### `/` — Home

**Purpose:** First impression. Convert curious visitors into community members or service inquiries.

**Sections (in order):**

| Section | Component | Content |
|---|---|---|
| Hero | `HomeHero` | H1: *"Design meets code, one bite at a time."* Subtext: *"A growing playground of smart, interactive UI patterns..."* CTAs: **Explore patterns** → `/bites` and **Learn about us** → `/about/our_story`. Interactive backdrop-filter grayscale mouse effect. |
| Value Prop | `HomeValue` | H2: *"What is Bite Size Design?"* Body: Studio description — reusable UI patterns, creative prototypes, modern interaction ideas. Lottie animation right column. Yellow (`bg-primary`) background section. |
| Differentiator | `HomeDifferentiator` | H2: *"What makes Bite Size Design different?"* Four marketing tiles: **Built for curious minds** / **Process over polish** / **Real patterns, not just pretty pixels** / **Where design and development meet**. |
| Featured Bites | `HomeFeaturedBites` | H2: *"Featured Bites"* Horizontal scroll on mobile, 4-col grid on desktop. Up to 4 `ProductCard` items pulled from a static featured list. |
| Contact CTA | `HomeContact` | H3: *"Ready to bite design in the ass?"* Subtext: *"Get professionals to do the nasty bits. We don't bite...much."* Two CTAs: **Drop us a line** (opens contact `Drawer`) and **Check out our services** → `/about/services`. |

**SEO metadata:**
- Title: `Bite size design`
- Description: `Resources and services to enable creative technologists to build their best`

---

### `/about/our_story` — Our Story

**Purpose:** Build brand trust. Explain the philosophy behind the studio — playful craft married to engineering rigour.

**Sections (in order):**

| Section | Content |
|---|---|
| Hero | H1: *"Playful on the surface. Serious underneath."* (primary accent on first line). Paired copy: *"Yes, we publish fun UI 'bites' for the community. Yes, our logo is a pair of chattering teeth. But we're serious about building great products."* |
| Our Mission | H2. Mission statement. Placeholder: *"We are dedicated to delivering excellence in everything we do."* — **needs real copy** |
| Our Values | H2. Core values summary. Placeholder — **needs real copy** |
| Our Team | H2. Team bios / headshots. Placeholder — **needs real copy** |
| Get In Touch | H2. Closing contact nudge. Placeholder — **needs real copy** |

**Content gaps:** Sections below the hero are placeholder copy. Real mission, values, team, and contact content is needed.

---

### `/about/services` — Services

**Purpose:** Convert qualified visitors into clients. Describe what Bite Size builds, for whom, and why it's worth paying for.

**Sections (in order):**

| Section | Content |
|---|---|
| Hero | H1: *"Build with us. We do the hard bits."* (primary accent on first line). Subtext: *"Bite Size Design offers design and frontend services for teams who care about the craft — and the code behind it."* CTA: **See what we offer** (anchor scroll to `#services`). |
| Services Grid | Four service cards (2-col on md+): **Design Systems** / **Frontend Engineering** / **Prototyping & Concepting** / **Workshops & Consulting**. Each has icon, title, tagline (Roboto Mono, primary color), description, and 4 bullet deliverables. |
| CTA Banner | H2: *"Ready to get started?"* Subtext: *"Tell us what you're building — we'll figure out the rest."* CTA: **Drop us a line** → `/` (should link to contact drawer or `/contact` if added). |

**Content gaps:** CTA links back to `/` — should open the contact drawer or point to a dedicated contact page.

---

### `/about/blog` — Blog

**Purpose:** Demonstrate expertise, build SEO, and keep the community engaged between new bites.

**Sections (in order):**

| Section | Content |
|---|---|
| Hero | H1: *"We blabber. About building."* Subtext: *"Opinions, experiments, and explainers from the messy middle of design and development."* |
| Post Grid | 3-col grid (1-col mobile). Each post card: category badge, read time, title, excerpt, date, and **Read →** button. |

**Current posts (static data):**

| Title | Category | Date | Read Time |
|---|---|---|---|
| A primer on design tokens | Design Systems | Apr 14, 2025 | 6 min |
| Tailwind v4: what actually changed | CSS | Mar 28, 2025 | 8 min |
| Focus states that don't suck | Accessibility | Mar 10, 2025 | 5 min |
| Composing Radix UI components | React | Feb 20, 2025 | 7 min |
| Dark mode without the headache | Design Systems | Feb 3, 2025 | 9 min |
| Using Lottie without torching your bundle | Performance | Jan 15, 2025 | 4 min |

**Content gaps:** Post data is currently static — no individual post routes (`/about/blog/[slug]`) exist yet. A dynamic route and MDX/CMS pipeline is needed to make posts navigable.

---

### `/bites` — Bites Hub

**Purpose:** Landing page for the pattern library. Orient visitors and route them to the right section.

**Sections (in order):**

| Section | Content |
|---|---|
| Hero | H1: *"One bite at a time."* Subtext: *"A growing library of interactive UI patterns, reusable components, and frontend experiments..."* |
| Section Nav | Five linked tiles, one per Bites sub-section: Foundations / Theming / Components / Categories / Technology. Labels and descriptions pulled from `NAV_ITEMS` config. |
| Featured Bites | H2: *"Featured Bites"* with **Browse all →** link to `/bites/categories`. Static 4-item `ProductCard` grid. |

---

### `/bites/foundations` — Foundations

**Purpose:** Document the base visual layer — typography, spacing, and shape — as a reference and teaching resource.

**Sections:**

| Section | Content |
|---|---|
| Hero | Badge: `Foundations`. H1: *"Base bits & building blocks."* Subtext about the primitive layer of the system. |
| Typography | Heading scale (h1–h5) rendered live with class name, size range, and font metadata. Body and code examples below. |
| Spacing Scale | Visual bar chart of Tailwind spacing steps 1–24. Labels show step number and pixel value. |
| Border Radius | Swatch grid showing `rounded-none` through `rounded-full` with visual squares. |

---

### `/bites/theming` — Theming

**Purpose:** Explain the color architecture — scales, semantic tokens, alpha values, and dark mode strategy.

**Sections:**

| Section | Content |
|---|---|
| Hero | Badge: `Theming`. H1: *"Tokens, tints & tweaks."* |
| Semantic Tokens | Grid of semantic token swatches: Background, Foreground, Surface, Border, Text Muted, Primary, Secondary. Each shows token name. |
| Gray Scale | 12-step warm sepia palette rendered as color squares. |
| Yellow Scale | 12-step golden amber palette. Step 9 (`#f5c400`) highlighted as primary interactive. |
| Dark Mode | Side-by-side light (`#fdfaf6`) and dark (`#0e0c0a`) background swatches with explanation of the `data-theme` switching strategy. |

---

### `/bites/components` — Components

**Purpose:** Showcase and document the component library. Acts as a living style guide for the community.

**Sections:**

| Section | Content |
|---|---|
| Hero | Badge: `Components`. H1: *"Common components, coded cleanly."* |
| Button Showcase | Live rendered buttons: all 6 primary variants, 4 sizes, and 3 icon positions (left / right / only). |
| All Components | Grid of all 10 components: name, category badge, description, and status. Categories: Action, Display, Form, Overlay, Navigation. |

**Components listed:** Button, Badge, Input, Select, TextArea, ProductCard, MarketingTile, Drawer, Navigation, Footer.

---

### `/bites/categories` — Categories

**Purpose:** Help visitors find bites by discipline. Acts as a filterable index once bites are dynamic.

**Sections:**

| Section | Content |
|---|---|
| Hero | Badge: `Categories`. H1: *"Browse by bite type."* |
| All Categories | 4-col grid of category cards: label, bite count, description, and **Browse →** link to `/bites/categories/[slug]`. |
| Popular across categories | 4-col `ProductCard` grid of cross-category featured bites. |

**Categories:** CSS (12), React (9), JavaScript (7), Accessibility (5), Animation (6), Design Systems (8), Performance (4), DevOps (3).

**Content gaps:** Individual category routes (`/bites/categories/[slug]`) and bite counts are currently static. Dynamic routing and a data source are needed.

---

### `/bites/technology` — Technology

**Purpose:** Explain the technical choices behind the site. Builds credibility and serves as a feasibility reference for the community.

**Sections:**

| Section | Content |
|---|---|
| Hero | Badge: `Technology`. H1: *"Feasibility FTW."* |
| The Stack | Four cards: Next.js 15 / Tailwind CSS v4 / Radix UI / Lucide React. Each has icon, name, role tag, description, and external link. |
| Feasibility Principles | Four numbered principles: **Design for the DOM** / **Progressive enhancement** / **Composition over configuration** / **Tokens before classes**. |
| Key Dependencies | Table of 7 key packages with version and Production/Dev badge. |

---

### `/styleguide` — Style Guide

**Purpose:** Internal development reference. Not in the main navigation.

**Sections:** Typography scale, full color palette (both hue scales), spacing scale, and button variants showcase.

**Note:** This route is unlisted (no nav link) and intended for internal use during development. Content does not need to be production-polished.

---

## Content Gaps Summary

| Route | Gap | Priority |
|---|---|---|
| `/about/our_story` | Mission, values, team, and contact sections are placeholder copy | High |
| `/about/services` | CTA button links to `/` instead of a contact action | Medium |
| `/about/blog` | No individual post routes (`/about/blog/[slug]`) — posts are unnavigable | High |
| `/bites/categories` | Category routes (`/bites/categories/[slug]`) don't exist — browse links are dead | Medium |
| `/bites/*` | Bite counts are static; no real pattern data source connected | Low (future) |
| All pages | No OG image or structured metadata for social sharing | Low |

---

## Messaging Consistency Rules

- **Brand name:** Always "Bite Size Design" — never "Bite-Size" or "BiteSize"
- **"Bites":** Individual UI patterns/articles are called "bites" (lowercase when used as a noun)
- **Voice:** Confident and slightly irreverent. Avoid corporate-speak ("leverage", "solutions", "synergy")
- **CTAs:** Primary actions use the `contrast` or `primary` button variant. Secondary actions use `ghost` or `contrast_link`
- **Hero H1 pattern:** First line in `text-primary` with text-shadow; second line plain. Used across About and Bites sub-pages
- **Page descriptions** (metadata): Should complete the sentence "This page is about..." in plain language for SEO
