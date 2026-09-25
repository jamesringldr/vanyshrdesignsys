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

## 2026-09-25 — New type token --size-display-xl (40px)

- Change: Added `--size-display-xl: 40px` (`tokens.json`, `tokens.css`) with `--text-display-3xl` bridge alias; documented in `DESIGN.md` §3. ScanLoadingView hero keeps its 40px headline; the `text-[20px]` instance snaps to `--size-title` (22px) with no new token.
- Rationale: Scan loading view needs a hero size above the 30px display max. Audit check 7 (no arbitrary font sizes) was failing 17/18 on `text-[40px]` / `text-[20px]` in ScanLoadingView.tsx.
- Tier: MUTATIVE · Approved by: James
