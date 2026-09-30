# Icon Library

> **What this is:** Vanyshr's two-tier icon system — functional Lucide replacements plus expressive brand icons · **Created:** 2026-09-30 · **Status:** draft

Two folders, two jobs. Never mix them.

## `override/` — Lucide replacements

Single-color icons that replace specific Lucide glyphs James doesn't like.
Filenames match the Lucide icon name exactly (`binoculars.svg` replaces Lucide's `binoculars`).

- Filled style, `fill="currentColor"`, 64×64 viewBox.
- Recolor: set `color` via CSS on the context. No hardcoded colors in the files
  (mask internals use `#fff`/`#000` as mask mechanics only — never visible).
- The app's shared icon component resolves these names here first, falling back
  to Lucide for everything else.
- Keep this list short. Past ~10 overrides, the base library is the problem.

## `styled/` — brand icons for hero moments

Hand-drawn, duotone, expressive. For hero moments, empty states, value props,
and the S verbs ONLY — never in buttons, nav, inputs, or list rows.

- Recolor via CSS variables, no hardcoded colors:
  - `--icon-ink` — outline ink (default `#070F1C`)
  - `--icon-shadow` — shadow/accent shapes (default `#14ABFE`)
  - `--icon-paper` — paper-white fills (default `#FFFFFF`)
- Approved pairings (don't invent new ones):
  - **Default** — navy ink `#070F1C`, dark shadow
  - **Brand** — blue ink, cyan shadow `#14ABFE`
  - **Accent** — black ink, orange shadow
- Each file uses unique `id`s for filters/masks so multiple icons can share a page.
- The `feTurbulence` wobble filter is the hand-drawn signature — keep it subtle.

## Adding icons

1. Drop finished SVGs in the working folder; Igor pulls, verifies, and commits.
2. Overrides: one color, `currentColor`, filename = Lucide name.
3. Styled: three variables above, unique IDs, hero moments only.
