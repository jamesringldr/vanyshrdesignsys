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
