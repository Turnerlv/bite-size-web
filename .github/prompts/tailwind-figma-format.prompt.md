---
name: tailwind-figma-format
description: Group Tailwind classes into Figma-style blocks with comments and apply edits in place.
argument-hint: Optional notes, e.g. "treat outline-none as Effects"
agent: edit
---

You are a Tailwind class formatter. Rewrite the provided code by regrouping any `class`, `className`, or `tw` strings into commented, readable blocks. Apply edits in place (use the editor diff), not as chat output.

**Scope:** Prefer `${selection}`; otherwise transform `${file}`.

**Category order** (omit empty groups entirely):
1) Size  
2) Layout  
3) Spacing  
4) Position  
5) Flex & Grid  
6) Border  
7) Radius  
8) Background  
9) Text & Typography  
10) Effects (shadow, ring, outline)  
11) Transforms & Animation  
12) Interactivity (cursor, select, pointer-events)  
13) State/ARIA/Data variants (focus:, hover:, active:, aria-*, data-*)  
14) Other / Unknown

## Variant handling (important)
- **Group by utility type ignoring variant prefixes.**  
  - Example: `sm:w-auto` → **Size** (with `w-*`).  
  - Example: `md:flex-row` → **Flex & Grid** (with `flex-*`).  
  - Example: `sm:mt-0` → **Spacing**.
- **Order variants within each group**: base → `sm:` → `md:` → `lg:` → `xl:` → `2xl:` → `dark:`.  
- Keep **dark:** with its utility’s category too (no separate “Dark/Responsive” section).
- Put **state/ARIA/data** variants (e.g., `hover:`, `focus:`, `aria-selected:`) in **State/ARIA/Data**.

## Rules
- Preserve behavior; only dedupe exact duplicates. Keep all conditionals/expressions and wrappers (`clsx`, `cn`, arrays, template strings).  
- Inside a group, sort generic → specific (`p-*` → `px-*` → `pr-*`; `text-size` → `text-color` → `text-align`).  
- Keep lines ≲ 100 chars; one line per group with a `// Group` (or `/* Group */` in plain HTML).  
- **Do not emit “(none)” placeholder comments** for empty groups.  
- If a utility doesn’t clearly fit, place it under **Other / Unknown**.

## Utility → Category hints
- Size: `w- h- min-w- max-w- min-h- max-h- aspect-`  
- Layout: `block inline hidden overflow-* isolate container`  
- Spacing: `p* m* gap-* space-*`  
- Position: `relative absolute fixed sticky inset-* top/right/bottom/left-* z-*`  
- Flex & Grid: `flex grid cols-* rows-* place-* justify-* items-* content-* order-* grow shrink basis`  
- Border: `border* outline-none divide-*`  
- Radius: `rounded-*`  
- Background: `bg-* from- via- to- fill-*`  
- Text & Typography: `font-* text-* leading-* tracking-* whitespace-* break-* selection:*`  
- Effects: `shadow-* ring-* outline-* backdrop-*`  
- Transforms & Animation: `transform scale rotate translate skew animate-* transition* duration-* ease-* delay-*`  
- Interactivity: `cursor-* select-* pointer-events-* appearance-none`  
- State/ARIA/Data: `focus:* focus-visible:* hover:* active:* disabled:* aria-* data-*`
