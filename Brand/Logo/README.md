> **What this is:** The Vanyshr logo lockup specification — how the icon and wordmark combine, with exact ratios so any builder can assemble or verify a lockup without eyeballing it. · **Created:** 2026-10-17 · **Status:** final

# Vanyshr Logo Lockup

## The system

The logo is a two-part lockup: the **ghost icon** plus the **"vanyshr" wordmark** (Neo Sans Italic — the wordmark is *always* italic; that is canonical).

There are two ways to use it, in this order of preference:

1. **Pre-built lockup files** (`Brand/LogoFiles/PrimaryLogo*.svg`) — use these whenever a standard horizontal lockup works. Don't rebuild what's already built.
2. **Assemble from parts** (icon SVG + wordmark SVG) using the recipe below — for responsive scaling, animation, or non-standard sizes.

## Construction — horizontal lockup (primary)

Measured from the master artwork (`PrimaryLogo-DarkMode.png`, 900×300). Let **H** = icon height. All ratios use **ink bounding boxes**, not SVG viewBox edges (viewBoxes may carry side bearings; italics slant past them).

- **Icon:** square-ish ghost mark, height **H**, aspect ≈ 0.75:1 (w:h).
- **Wordmark:** scaled so its full ink height (ascender to descender) = **H** (≈ 0.98H measured; treat as 1H). Ink aspect ≈ 3.59:1.
- **Gap** between icon's right ink edge and wordmark's left ink edge = **H/8** (measured 0.13H).
- **Vertical alignment:** wordmark's top ink edge sits **0.08H below** the icon's top edge. (The 'y' descender gives the wordmark a slightly low optical center — that's intentional, don't "correct" it.)
- **Sanity check:** full lockup ink aspect ≈ **4.16:1** (w:h). If your assembly doesn't land near that, something's off.

## Clearspace & minimum size

- **Clearspace:** H/4 on all sides. Nothing — type, rules, imagery, page edges — enters it.
- **Minimum size (digital):** 24px tall for the full lockup. Below that, use the **icon alone**.

## Variants & color

| Variant | When | Files |
|---|---|---|
| Horizontal lockup, dark | Dark backgrounds (primary) | `PrimaryLogo-DarkMode.svg` |
| Horizontal lockup, light | Light backgrounds | `PrimaryLogo.svg` |
| Icon only | Small sizes, avatars, favicons | `PrimaryIcon*.svg` |
| Wordmark only | Tight horizontal spaces | *Pending — see below* |
| Stacked lockup | — | **Not defined. Don't invent one; use horizontal or icon-only.** |

- Dark variant: **white** wordmark + full-color icon.
- Light variant: **brand-navy** wordmark + full-color icon.
- The wordmark SVG (once vectorized) must use `currentColor` so it themes via CSS — never bake the color into the paths.

## Wordmark rules

- The canonical wordmark is **Neo Sans Italic**. (Note: the wordmark letterforms inside the current `PrimaryLogo*` files are *not* italic — those files predate the correction. `Brand/Logo/wordmark.svg` (italic, landed 2026-10-17) unblocks the re-cut; until the lockups are re-cut, use the pre-built files as-is — don't rebuild them from parts.)
- Never re-typeset "vanyshr" from a Neo Sans font file and call it the logo. Always use the artwork.
- Never stretch, condense, re-space, rotate, outline, or add effects (shadows, gradients) to the lockup.

## Asset inventory

| File | Content | Status |
|---|---|---|
| `Brand/LogoFiles/PrimaryLogo.svg` / `.png` | Full lockup, light | Current (wordmark not yet italic) |
| `Brand/LogoFiles/PrimaryLogo-DarkMode.svg` / `.png` | Full lockup, dark | Current (wordmark not yet italic) |
| `Brand/LogoFiles/PrimaryIcon*.svg` / `.png` | Icon variants | Current |
| `Brand/Logo/wordmark.svg` | Standalone italic wordmark | Landed 2026-10-17 — pure vector, tight viewBox, `currentColor`, italic render-verified |

## Wordmark SVG — as built

`Brand/Logo/wordmark.svg` landed 2026-10-17 and met the acceptance criteria on intake (two normalizations applied: viewBox tightened to the ink bounding box `22 23 869 241`, and the fill changed from `var(--wordmark-ink,#0F172A)` to `currentColor` per this spec). Pure vector paths, no embedded raster, italic angle preserved and render-verified.

Once it lands, re-cut the `PrimaryLogo*` lockup files with the italic wordmark and the ratios above, then this note goes away.
