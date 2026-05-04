# Bite Size Design — Content Strategy (v2)

> "Resources, architectures, and services to enable creative technologists to build resilient systems."

This document maps every public route on the site to its content purpose, messaging, and the specific content blocks it contains. Use it when writing copy, planning new pages, or auditing existing content for consistency.

---

## Content Pillars

The site serves two interlocked audiences and purposes:

| Pillar | Purpose | Audience |
|---|---|---|
| **Knowledge Hub** | Proof-of-Concepts, architecture diagrams, API integration templates, and DX tear-downs to learn from | Technical recruiters, VPs of Engineering, and CTOs evaluating SA/SE talent |
| **Services** | Commercial work — Solution Architecture, Technical Product Strategy, Fractional Platform Engineering | Teams and founders scaling complex systems who need bridge-builders |

Every page should reinforce at least one pillar. The brand voice is: **direct, technically confident, enthusiastic, and slightly irreverent** — "playful on the surface, bulletproof underneath." A core recurring narrative is that **the journey of the data and system integrity is the backbone of great experiences.**

---

## Site Map

```
/                           Home
├── /about
│   ├── /about/our_story    Brand story & mission
│   ├── /about/services     Services offering
│   └── /about/blog         Editorial blog
├── /bites                  Architecture & Knowledge hub
│   ├── /bites/architecture Systems, data flow, event-driven patterns
│   ├── /bites/integrations APIs, webhooks, platform connections
│   ├── /bites/dx           Developer Experience (DX) & tooling
│   ├── /bites/categories   Browse by discipline
│   ├── /bites/technology   Stack & feasibility principles
│   ├── /bites/foundations  (DEPRECATED)
│   ├── /bites/theming      (DEPRECATED)
│   └── /bites/components   (DEPRECATED)
└── /styleguide             Internal design system reference (not in nav)
```

---

## Route Content Map

---

### `/` — Home

**Purpose:** First impression. Convert curious visitors and hiring managers into believers of your technical depth, or service inquiries.

**Sections (in order):**

| Section | Component | Content |
|---|---|---|
| Hero | `HomeHero` | H1: *"Where product vision meets technical architecture."* Subtext: *"A growing playground of smart system designs, data flows, and robust API integrations..."* CTAs: **Explore architectures** → `/bites` and **Learn about us** → `/about/our_story`. Interactive backdrop-filter grayscale mouse effect. |
| Value Prop | `HomeValue` | H2: *"What is Bite Size Design?"* Body: Studio description — bridging the gap between pixel-perfect design and bulletproof backend systems. We believe the journey of the data and system integrity is the true backbone of great user experiences. Lottie animation right column. Yellow (`bg-primary`) background section. |
| Differentiator | `HomeDifferentiator` | H2: *"What makes Bite Size Design different?"* Four marketing tiles: **Built for complex states** / **Data integrity over surface polish** / **Real architecture, not just whiteboards** / **Where the frontend meets the backend**. |
| Featured Bites | `HomeFeaturedBites` | H2: *"Featured Architectures"* Horizontal scroll on mobile, 4-col grid on desktop. Up to 4 `ProductCard` items pulled from a static featured list of technical PoCs. |
| Contact CTA | `HomeContact` | H3: *"Ready to bite the bullet on technical debt?"* Subtext: *"Get professionals to design systems that actually scale. We don't bite... much."* Two CTAs: **Drop us a line** (opens contact `Drawer`) and **Check out our services** → `/about/services`. |

**SEO metadata:**
- Title: `Bite size design`
- Description: `Systems, architectures, and services to enable teams to build resilient products.`

---

### `/about/our_story` — Our Story

**Purpose:** Build brand trust. Explain the philosophy behind the studio — playful craft married to serious backend rigour and data integrity.

**Sections (in order):**

| Section | Content |
|---|---|
| Hero | H1: *"Playful on the surface. Bulletproof underneath."* (primary accent on first line). Paired copy: *"Yes, we publish fun architecture 'bites' for the community. Yes, our logo is a pair of chattering teeth. But we're dead serious about system integrity and the journey of your data."* |
| Our Mission | H2. Mission statement. Placeholder: *"We are dedicated to architecting systems where data integrity drives the experience."* — **needs real copy** |
| Our Values | H2. Core values summary. Placeholder — **needs real copy** |
| Our Team | H2. Team bios / headshots. Placeholder — **needs real copy** |
| Get In Touch | H2. Closing contact nudge. Placeholder — **needs real copy** |

---

### `/about/services` — Services

**Purpose:** Convert qualified visitors into clients. Describe the bridge-building SA/SE work Bite Size provides.

**Sections (in order):**

| Section | Content |
|---|---|
| Hero | H1: *"Scale with us. We connect the hard bits."* (primary accent on first line). Subtext: *"Bite Size Design offers Solution Architecture and technical strategy for teams who care about resilient systems — and the data journey behind them."* CTA: **See what we offer** (anchor scroll to `#services`). |
| Services Grid | Four service cards (2-col on md+): **Solution Architecture** / **API & Developer Experience** / **Technical Product Strategy** / **Fractional Platform Engineering**. Each has icon, title, tagline (Roboto Mono, primary color), description, and 4 bullet deliverables. |
| CTA Banner | H2: *"Ready to get started?"* Subtext: *"Tell us what system you're building — we'll figure out the architecture."* CTA: **Drop us a line** (opens contact drawer). |

---

### `/about/blog` — Blog

**Purpose:** Demonstrate deep technical expertise, build SEO, and keep the community engaged with system design thinking.

**Sections (in order):**

| Section | Content |
|---|---|
| Hero | H1: *"We blabber. About systems."* Subtext: *"Opinions, data flows, and explainers from the messy middle of frontend and backend."* |
| Post Grid | 3-col grid (1-col mobile). Each post card: category badge, read time, title, excerpt, date, and **Read →** button. |

**Updated Current Posts (static data):**

| Title | Category | Date | Read Time |
|---|---|---|---|
| Why data integrity is the best UX | Architecture | Apr 14, 2026 | 6 min |
| Building robust webhooks in Next.js | Integrations | Mar 28, 2026 | 8 min |
| Error states that don't suck | Dev Experience | Mar 10, 2026 | 5 min |
| Event-driven patterns for fintech | Systems | Feb 20, 2026 | 7 min |
| Bridging design and APIs seamlessly | Tech Strategy| Feb 3, 2026 | 9 min |
| Using Supabase without torching your schema | Databases | Jan 15, 2026 | 4 min |

---

### `/bites` — Bites Hub

**Purpose:** Landing page for the knowledge hub. Orient visitors to deep-dive technical PoCs and architectural patterns.

**Sections (in order):**

| Section | Content |
|---|---|
| Hero | H1: *"One byte at a time."* Subtext: *"A growing library of system architectures, API patterns, and deep-dive technical experiments..."* |
| Section Nav | Five linked tiles, one per Bites sub-section: Architecture / Integrations / Developer Experience / Categories / Technology. Labels and descriptions pulled from updated `NAV_ITEMS` config. |
| Featured Bites | H2: *"Featured Architectures"* with **Browse all →** link to `/bites/categories`. Static 4-item `ProductCard` grid showing full-stack PoCs. |

---

### `/bites/architecture` (NEW) — Architecture

**Purpose:** Document high-level system designs, event-driven patterns, and data flow diagrams.

**Sections:**

| Section | Content |
|---|---|
| Hero | Badge: `Architecture`. H1: *"Systems that scale."* Subtext: *"Exploring the journey of the data—how robust backends power seamless frontends."* |
| Event-Driven Patterns | Live diagram or code snippets showing async workflows and webhook handling. |
| Data Flow Integrity | Examples of schema validation and state management across the stack. |

---

### `/bites/integrations` (NEW) — Integrations

**Purpose:** Showcase how to stitch together APIs and platform services reliably.

**Sections:**

| Section | Content |
|---|---|
| Hero | Badge: `Integrations`. H1: *"Connecting the dots."* Subtext: *"API wrappers, safe third-party integrations, and platform glue."* |
| Payment Gateways | Mock PoC showing a secure payment intent flow. |
| Legacy Wrappers | Examples of smoothing out clunky legacy APIs into modern, usable interfaces. |

---

### `/bites/dx` (NEW) — Developer Experience

**Purpose:** Focus on how APIs and internal tools should feel for the developers using them.

**Sections:**

| Section | Content |
|---|---|
| Hero | Badge: `Dev Experience`. H1: *"APIs that don't hurt."* Subtext: *"Because internal tools and integrations deserve good design too."* |
| Error Handling | Patterns for actionable, human-readable error messages and graceful degradation. |
| SDK Design | Best practices for typing and structuring client libraries. |

---

### Deprecated Pages (To Be Removed)

*These pages currently exist but are being phased out in the transition to SA/SE focus. They should be kept in the codebase for now, but clearly marked.*

#### `/bites/foundations`
* Hero H1: `* Foundations (to remove)`

#### `/bites/theming`
* Hero H1: `* Theming (to remove)`

#### `/bites/components`
* Hero H1: `* Components (to remove)`

---

### `/bites/categories` — Categories

**Purpose:** Help visitors find bites by technical discipline. 

**Sections:**

| Section | Content |
|---|---|
| Hero | Badge: `Categories`. H1: *"Browse by architecture."* |
| All Categories | 4-col grid of category cards. |

**Categories:** Systems (12), API Design (9), Full-Stack (7), Dev Experience (5), Databases (6), Integrations (8), Security (4), DevOps (3).

---

### `/bites/technology` — Technology

**Purpose:** Explain the technical choices behind the site and PoCs. Builds credibility.

**Sections:**

| Section | Content |
|---|---|
| Hero | Badge: `Technology`. H1: *"Feasibility FTW."* |
| Feasibility Principles | Four numbered principles: **Data journey first** / **Progressive enhancement** / **Resilient APIs** / **Design the system, not just the screen**. |

