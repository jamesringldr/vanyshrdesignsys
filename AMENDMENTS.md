# Vanyshr Design Bible — Amendment Log

> **What this is:** Append-only log of every change to the design bible's protected files. · **Created:** 2026-09-18 · **Status:** living

Every amendment lands here in the same commit, as: date, change, rationale (one line), risk tier (ADDITIVE/MUTATIVE), approved-by. History is never rewritten.

## 2026-09-18 — Repository resurrected; bible published as canonical

- Change: Published the finalized design bible (`DESIGN.md`, `COMPONENTS.md`, `llms.txt`, `tokens.json`, `tokens.css`) as this repo's canonical content. Archived the 2026-02 legacy system (old docs, mockups, starter kit, skills) under `archive/2026-02-legacy/`; retained `Brand/LogoFiles/`.
- Rationale: The bible needed a single home with sole-editor change control, separate from the app repo where agents work.
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
  mapping; anatomy (48/44px sizes, 14px labels, 12px radius, icon rules, loading treatment); states (focus,
  disabled, no selected state); behavior (one primary per screen, full-width sheet CTAs, destructive
  confirmation pattern, verb labels). COMPONENTS.md Button row updated. Resolves the parked 2026-09-17
  bottom-drawer CTA question (distinctiveness from scale + placement, fill stays cyan). Outline variant
  covers fill-collision cases where the secondary fill matches the container.
- Rationale: the bible had one catalog row and generic state rules — no variant token mapping, no
  anatomy, no placement rules; agents were inventing button styling per page.
- Tier: MUTATIVE · Approved by: James
