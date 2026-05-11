# Bite Size Design — Design System Reference

> "Playful on the surface. Serious underneath."

This document captures the full design system for the Bite Size Design website. Use it as a reference when building new pages, components, or extending the system.

---

## Tech Stack

| Layer         | Tool                         |
| ------------- | ---------------------------- |
| Framework     | Next.js 15 (App Router)      |
| Styling       | Tailwind CSS v4              |
| UI Primitives | Radix UI                     |
| Icons         | Lucide React                 |
| Animation     | Lottie (DotLottie)           |
| Fonts         | Google Fonts via `next/font` |

---

## Typography

Three font families are loaded via `next/font/google` and exposed as CSS variables:

| Variable                             | Font        | Use                  |
| ------------------------------------ | ----------- | -------------------- |
| `--font-rubik` / `font-rubik`        | Rubik       | Headings             |
| `--font-work-sans` / `font-work`     | Work Sans   | Body copy, UI text   |
| `--font-roboto-mono` / `font-roboto` | Roboto Mono | Code, badges, labels |

Default body font: Work Sans, Helvetica, sans-serif.

### Heading Classes

Semantic heading utility classes are defined in `@layer components` in `globals.css`:

| Class        | Font  | Weights | Mobile → Desktop sizes           |
| ------------ | ----- | ------- | -------------------------------- |
| `.heading-1` | Rubik | bold    | `text-3xl → text-4xl → text-5xl` |
| `.heading-2` | Rubik | bold    | `text-xl → text-2xl → text-3xl`  |
| `.heading-3` | Rubik | bold    | `text-lg → text-xl → text-2xl`   |
| `.heading-4` | Rubik | bold    | `text-base → text-lg → text-xl`  |
| `.heading-5` | Rubik | bold    | `text-base` (all breakpoints)    |

**Usage:**
```html
<h1 class="heading-1 text-foreground">Page Title</h1>
<h2 class="heading-2">Section Heading</h2>
```

---

## Color System

The palette is a 12-step Radix-style scale in two hues: **warm gray (sepia)** and **golden amber (yellow)**.

### Light Mode — Grays (Warm Sepia)

| Token       | Hex       | Use                             |
| ----------- | --------- | ------------------------------- |
| `--gray-1`  | `#fdfaf6` | Soft parchment, page background |
| `--gray-2`  | `#f7f2eb` | Card backgrounds, hover states  |
| `--gray-3`  | `#ece4d9` | Component hover backgrounds     |
| `--gray-4`  | `#e2d8c9` | Borders                         |
| `--gray-5`  | `#d8cdbc` |                                 |
| `--gray-6`  | `#cfc1ae` |                                 |
| `--gray-7`  | `#c1b29d` |                                 |
| `--gray-8`  | `#a89883` |                                 |
| `--gray-9`  | `#8a7a65` | Placeholder text                |
| `--gray-10` | `#7d6f5c` |                                 |
| `--gray-11` | `#635749` | Muted body text                 |
| `--gray-12` | `#2d2822` | Headings, primary text          |

### Light Mode — Yellows (Golden Amber)

| Token         | Hex       | Use                           |
| ------------- | --------- | ----------------------------- |
| `--yellow-1`  | `#fffef5` |                               |
| `--yellow-2`  | `#fff9e2` |                               |
| `--yellow-3`  | `#fdf0ad` |                               |
| `--yellow-4`  | `#fce47c` |                               |
| `--yellow-5`  | `#fad64d` |                               |
| `--yellow-6`  | `#edc33a` |                               |
| `--yellow-7`  | `#d9af29` |                               |
| `--yellow-8`  | `#c2991a` |                               |
| `--yellow-9`  | `#f5c400` | **Primary interactive color** |
| `--yellow-10` | `#e6b800` | Primary hover                 |
| `--yellow-11` | `#8c6d00` |                               |
| `--yellow-12` | `#3d3000` |                               |

### Dark Mode Backgrounds

| Token          | Light     | Dark      |
| -------------- | --------- | --------- |
| `--background` | `#fdfaf6` | `#0e0c0a` |
| `--contrast`   | `#2d2822` | `#faf8f5` |

Dark mode is toggled via `[data-theme="dark"]` on `<html>` (or `.dark` class).

### Semantic Color Tokens

These are the tokens to use in components (not the raw gray/yellow scales):

| Tailwind Class                      | Token                        | Light Value               | Dark Value    |
| ----------------------------------- | ---------------------------- | ------------------------- | ------------- |
| `bg-background` / `text-background` | `--color-background`         | `#fdfaf6`                 | `#0e0c0a`     |
| `text-foreground`                   | `--color-foreground`         | `#2d2822`                 | `#faf8f5`     |
| `bg-surface`                        | `--color-surface`            | background at 80% opacity | —             |
| `border-border`                     | `--color-border`             | `gray-4`                  | dark gray-4   |
| `text-text-muted`                   | `--color-text-muted`         | `gray-11`                 | dark gray-11  |
| `bg-primary`                        | `--color-primary`            | `yellow-9` (#f5c400)      | dark yellow-9 |
| `text-primary-contrast`             | `--color-primary-contrast`   | `#0e0c0a`                 | same          |
| `bg-secondary`                      | `--color-secondary`          | `contrast`                | —             |
| `text-secondary-contrast`           | `--color-secondary-contrast` | `gray-1`                  | —             |

### Alpha Variants

Both gray and yellow have alpha variants (`--gray-a1` through `--gray-a12`, same for yellow). Use these for overlays, glass effects, and tints that blend with the background:

```html
<!-- Subtle card background -->
<div class="bg-gray-a2 border border-gray-a4">...</div>

<!-- Badge -->
<span class="bg-yellow-a4 text-yellow-a12">CSS</span>
```

---

## Spacing & Layout

| Utility           | Definition                              |
| ----------------- | --------------------------------------- |
| `.page-padding`   | `px-4 md:px-8` — horizontal page gutter |
| Max content width | `max-w-[1200px] mx-auto`                |
| Nav height offset | `pt-[74px]` or `pt-19`                  |

---

## Focus State

A single custom focus utility is used across all interactive elements:

```css
/* custom-focus */
outline-none ring-offset-2 ring-offset-background ring-2 ring-yellow-10
```

Apply it with: `focus-visible:custom-focus`

---

## Background Patterns

SVG tile patterns swap between light and dark mode via CSS:

```css
html[data-theme='light'] { --bg-pattern: url('/background_pattern_light.svg'); }
html[data-theme='dark']  { --bg-pattern: url('/background_pattern_dark.svg'); }
```

Usage: `bg-[image:var(--bg-pattern)] bg-repeat bg-center`

## Logo

The logo image also swaps via CSS `content`:

```css
html[data-theme='light'] .nav-logo { content: url('/biteSize_solid_full.svg'); }
html[data-theme='dark']  .nav-logo { content: url('/biteSize_outline_full.svg'); }
```

---

## Components

### Button

**File:** `src/components/Button.js`

```jsx
<Button variant="primary" size="md" icon={Heart} iconPosition="left" responsive={false} as="button">
  Click me
</Button>

// As a Next.js Link:
<Button as="link" href="/bites" variant="primary" size="lg">Explore</Button>
```

**Props:**

| Prop           | Values                                                                              | Default   |
| -------------- | ----------------------------------------------------------------------------------- | --------- |
| `variant`      | `primary` `secondary` `contrast` `outline` `soft` `surface` `ghost` `contrast_link` | `primary` |
| `size`         | `xs` `sm` `md` `lg`                                                                 | `md`      |
| `icon`         | Any Lucide icon component                                                           | —         |
| `iconPosition` | `left` `right` `only` `default`                                                     | `left`    |
| `responsive`   | `true` `false`                                                                      | `false`   |
| `as`           | `button` `link`                                                                     | `button`  |
| `href`         | URL string (required when `as="link"`)                                              | —         |

**Variant styles:**

| Variant         | Background              | Text                      | Hover          |
| --------------- | ----------------------- | ------------------------- | -------------- |
| `primary`       | `bg-primary` (yellow-9) | `text-primary-contrast`   | `bg-yellow-10` |
| `secondary`     | `bg-secondary`          | `text-secondary-contrast` | `bg-gray-12`   |
| `contrast`      | `bg-primary-contrast`   | `text-contrast-surface`   | dark           |
| `outline`       | transparent             | `text-foreground`         | `bg-gray-a3`   |
| `soft`          | `bg-gray-a3`            | `text-foreground`         | `bg-gray-a5`   |
| `surface`       | `bg-gray-a2` + ring     | `text-foreground`         | `bg-gray-a5`   |
| `ghost`         | transparent             | `text-foreground`         | `bg-gray-a3`   |
| `contrast_link` | transparent             | `text-primary-contrast`   | light          |

---

### Badge

**File:** `src/components/Badge.js`

```jsx
<Badge text="CSS" />
<Badge text="React" color="bg-gray-a3" />
```

**Props:**

| Prop    | Default        |
| ------- | -------------- |
| `text`  | required       |
| `color` | `bg-yellow-a4` |

Renders uppercase, `text-yellow-a12`, `font-roboto`, extra-small size (`text-[10px]`).

---

### Input

**File:** `src/components/form/Input.js`

```jsx
<Input
  label="Email"
  name="email"
  type="email"
  size="md"
  variant="outline"
  placeholder="you@example.com"
  leftIcon={<Mail size={16} />}
  description="We'll never share your email."
  error="Invalid email address"
/>
```

**Props:**

| Prop                     | Values                     | Default   |
| ------------------------ | -------------------------- | --------- |
| `size`                   | `xs` `sm` `md` `lg`        | `md`      |
| `variant`                | `outline` `subtle` `ghost` | `outline` |
| `label`                  | string                     | —         |
| `description`            | string                     | —         |
| `error`                  | string                     | —         |
| `leftIcon` / `rightIcon` | React node                 | —         |

Shape: fully rounded (`rounded-full`).

---

### Select

**File:** `src/components/form/Select.js`

Built on Radix UI `@radix-ui/react-select`.

```jsx
<Select
  label="Reason"
  name="reason"
  size="lg"
  placeholder="Choose one"
  options={[
    { value: 'project', label: 'Start a project' },
    { value: 'other', label: 'Something else' },
  ]}
  onValueChange={(val) => console.log(val)}
/>
```

**Props:** Same size/variant API as `Input`. Takes `options: { value, label }[]`.

---

### TextArea

**File:** `src/components/form/TextArea.js`

```jsx
<TextArea
  label="Message"
  name="message"
  size="md"
  rows={4}
  maxLength={500}
  showCounter={true}
  placeholder="Your message here..."
/>
```

Single-row (`rows={1}`) renders `rounded-full`. Multi-row renders `rounded-br-none` + size-specific radius.

---

### ProductCard

**File:** `src/components/ProductCard.js`

```jsx
<ProductCard
  heading="Responsive Grid Layout"
  description="Adapt screens to any size"
  category="CSS"
  preview="/bite_preview_1.png"
  route="/bites/foundations"
/>
```

Clicking the card navigates to `route`. Badge uses `category` as text.

---

### MarketingTile

**File:** `src/components/MarketingTile.js`

```jsx
<Tile
  image="/wallpaper_03.svg"
  padding="md:pt-8 md:pl-8"
  title="Built for curious minds"
  description="..."
/>
```

Side image (square) + text description. Used in `HomeDifferentiator` in a 2×2 grid.

---

### Drawer

**File:** `src/components/Drawer.js`

Controlled via `DrawerContext` (`useDrawer` hook):

```jsx
const { openDrawer, closeDrawer } = useDrawer();

openDrawer({
  title: 'Contact us',
  node: <ContactForm cancel={closeDrawer} />,
  triggerEl: buttonRef.current,
  side: 'bottom', // 'bottom' | 'right' | 'left' | 'top'
});
```

Accessibility features: click-outside close, ESC key, focus trap, focus return to trigger.

---

## Navigation Structure

Defined in `src/config/navigation.js`:

```
About
├── Our Story        /about/our_story
├── Services         /about/services
└── Blog             /about/blog

Bites
├── Foundations      /bites/foundations
├── Theming          /bites/theming
├── Components       /bites/components
├── Categories       /bites/categories
└── Technology       /bites/technology
```

The navigation supports mega-menus on desktop and a mobile slide-down menu. `NavItem` triggers are hover (desktop) and click (mobile).

---

## Page Layout Conventions

### Standard Inner Page Structure

```jsx
export default function MyPage() {
  return (
    <div>
      {/* Page Hero */}
      <section className="h-screen page-padding mx-auto max-w-[1200px] overflow-hidden relative flex items-center text-foreground">
        <div className="w-full flex flex-row items-center justify-between gap-20">
          <h1 className="heading-1">
            <span className="text-primary [text-shadow:-2px_-2px_0_var(--color-foreground)] dark:[text-shadow:none]">
              Bold statement.
            </span>
            <span>Supporting line.</span>
          </h1>
          <p>Introductory paragraph.</p>
        </div>
      </section>

      {/* Content sections */}
      <section className="py-20 page-padding mx-auto max-w-[1200px]">
        ...
      </section>
    </div>
  );
}
```

### Accent Text Effect

The primary color heading text shadow is a brand pattern used on hero sections:

```html
<span class="text-primary [text-shadow:-2px_-2px_0_var(--color-foreground)] dark:[text-shadow:none]">
  Accent text.
</span>
```

---

## A11y Hooks

Located in `src/hooks/a11y/`:

| Hook                    | Purpose                          |
| ----------------------- | -------------------------------- |
| `useDisclosure`         | Open/close boolean state         |
| `useClickOutside`       | Close panel on click outside     |
| `useFocusReturn`        | Return focus to trigger on close |
| `useKeyboardNavigation` | ESC key + focus trapping         |

---

## Scrollbar Styling

```css
.scrollbar-custom::-webkit-scrollbar-track { background: none; }
.scrollbar-custom::-webkit-scrollbar-thumb { background: var(--color-gray-a11); }
```

---

## Autofill Fix

Autofilled form inputs inherit `--color-background` to prevent browser-injected styles:

```css
input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px var(--color-background) inset !important;
  -webkit-text-fill-color: var(--color-foreground) !important;
}
```

---

## Public Assets

| File                            | Description                           |
| ------------------------------- | ------------------------------------- |
| `/bite_size_hero3.json`         | Lottie animation (value prop section) |
| `/biteSize_solid_full.svg`      | Logo — light mode                     |
| `/biteSize_outline_full.svg`    | Logo — dark mode                      |
| `/background_pattern_light.svg` | Tiled background — light mode         |
| `/background_pattern_dark.svg`  | Tiled background — dark mode          |
| `/wallpaper_*.svg`              | Marketing tile images                 |
| `/bite_preview_*.png`           | Product card preview images           |
