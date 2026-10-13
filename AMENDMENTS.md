# Vanyshr Design Bible — Amendment Log

> **What this is:** Append-only log of every change to the design bible's protected files. · **Created:** 2026-09-18 · **Status:** living

Every amendment lands here in the same commit, as: date, change, rationale (one line), risk tier (ADDITIVE/MUTATIVE), approved-by. History is never rewritten.

## 2026-09-18 — Repository resurrected; bible published as canonical

- Change: Published the finalized design bible (`DESIGN.md`, `COMPONENTS.md`, `llms.txt`, `tokens.json`, `tokens.css`) as this repo's canonical content. Archived the 2026-02 legacy system (old docs, mockups, starter kit, skills) under `archive/2026-02-legacy/`; retained `Brand/LogoFiles/`.
- Rationale: The bible needed a single home with sole-editor change control, separate from the app repo where agents work.
- Tier: ADDITIVE · Approved by: James

## 2026-09-25 — ScanLoader tokens: `--shadow-scan-card`, `--gradient-text-shimmer`

- Change: Added `--shadow-scan-card` (loader-card elevation: 0.45-black drop shadow + 0.06-white inset top highlight, with a lighter `.light` override) and `--gradient-text-shimmer` (the bible's first gradient token, built entirely from `--color-text-primary` so it theme-flips with no `.light` override) to `tokens.css`, `tokens.json`, and `DESIGN.md`; new `Effects` token section.
- Rationale: The scan-wait ScanLoader needed elevation depth and an animated active-phase shimmer; both were proposed-but-unapproved in vanyshr-mono and blocking the token sync.
- Tier: ADDITIVE · Approved by: James

## 2026-09-18 — Sole-editor governance established

- Change: Adopted `GOVERNANCE.md`: Igor is the sole editor; amendments require James's explicit approval; `vanyshr-mono` holds a synced read-only `tokens.css` copy.
- Rationale: The bible is the spec and the test — it needs change control, not drive-by edits.
- Tier: ADDITIVE · Approved by: James

## 2026-09-25 — Primary button label → white bold (dark); disabled buttons gain outline

- Change: `--color-primary-on` (dark) `#0b0d10` → `#ffffff`; primary button labels set at font-weight 700 (`DESIGN.md`, `COMPONENTS.md`, `tokens.json`, `tokens.css`). Disabled controls now carry a 1px `--color-border` outline (§9 States) so a disabled button keeps its affordance instead of reading as stray text.
- Rationale: White-on-cyan is the brand's electric CTA look (James: keep the vibrant `#14abfe` fill). Disabled "scan now" CTA on the scan input form was invisible as a control — screenshot evidence 2026-09-25.
- Contrast note: white on `#14abfe` ≈ 2.5:1; accepted by James for bold CTA labels (platform precedent: iOS white-on-blue in dark mode). Reverses the 2026-09-17 "never white" lock.
- Tier: MUTATIVE · Approved by: James

## 2026-09-29 — Button spec (§11.1)

- Change: New DESIGN.md §11.1 Buttons — full spec for content-surface (shadcn) buttons. Five variants
  (primary, secondary, outline, ghost, destructive) with per-variant fill/label/border/hover/pressed token
  mapping; anatomy (48/44px sizes, 14px labels, pill radius, icon rules, loading treatment); states (focus,
  disabled, no selected state); behavior (one primary per screen, full-width sheet CTAs, destructive
  confirmation pattern, verb labels). COMPONENTS.md Button row updated. Resolves the parked 2026-09-17
  bottom-drawer CTA question (distinctiveness from scale + placement, fill stays cyan). Outline variant
  covers fill-collision cases where the secondary fill matches the container.
- Rationale: the bible had one catalog row and generic state rules — no variant token mapping, no
  anatomy, no placement rules; agents were inventing button styling per page.
- Update 2026-09-29 (same branch): radius `--radius-md` → `--radius-pill` — X and Cash App both converged on pill buttons.
- Update 2026-09-29 (same branch): button labels locked to sentence case (first word + proper nouns only) — Material 3 / modern consumer-app consensus, fits the Cash App approachability direction.
- Tier: MUTATIVE · Approved by: James

## 2026-10-12 — Dark theme retone: navy → `#07090e`, bg-app → `#22242b`, bg-surface → `#2b2d34`

- Change: `:root` (dark) `--color-brand-navy` `#070f1c` → `#07090e`; `--color-bg-app` `#242424` → `#22242b`; `--color-bg-surface` `#343434` → `#2b2d34`. Mirrored in `tokens.json`. Light theme untouched. Supersedes the unmerged 2026-10-10 navy proposal (`#0b1b2b`, branch `amend/brand-navy-0b1b2b`, deleted).
- Rationale: James specified the new dark-theme values; reverses the 2026-09-17 "no blue-tinted backgrounds" decision — dark surfaces now carry a blue tint continuous with the navy.
- Tier: MUTATIVE · Approved by: James

## 2026-10-12 — DESIGN.md mirror of the dark theme retone

- Change: `DESIGN.md` brought in line with the 2026-10-12 retone — the `:root` css fence (`--color-brand-navy` `#07090e`, `--color-bg-app` `#22242b`, `--color-bg-surface` `#2b2d34`) and the matching rows in the color table. No token values change; `tokens.css` / `tokens.json` already carry them.
- Rationale: governance rule 4 (mirrors move together) — the retone amendment updated `tokens.css` and `tokens.json` but not `DESIGN.md`, so `mirror-check` failed against the canonical files. Known leftover: the historical header comment (Navy `#070F1C`, "no blue-tinted backgrounds") is unchanged in both `tokens.css` and the `DESIGN.md` fence.
- Tier: MUTATIVE · Approved by: James

## 2026-10-12 — Dark ramp retone: elevated, border, disabled

- Change: `:root` (dark) `--color-bg-elevated` `#444444` → `#383a42`; `--color-border` `#545454` → `#4a4d56`; `--color-state-disabled-bg` `#343434` → `#2b2d34`; `--color-text-disabled` and `--color-state-disabled-fg` `#5c5c5c` → `#5a5f6b`. Mirrored in `tokens.json` and `DESIGN.md` (css fence + color table). Light theme untouched.
- Rationale: follows the 2026-10-12 retone of navy / bg-app / bg-surface. Inputs (`bg-elevated`), borders and disabled controls kept the old neutral grey and looked off against the blue-tinted surfaces. Known leftovers: `--color-border-subtle` / `-strong`, `--color-state-hover` / `-active` unchanged. `--color-state-disabled-bg` now equals `--color-bg-surface`, so a disabled control on a surface relies on its `--color-border` outline.
- Tier: MUTATIVE · Approved by: James
