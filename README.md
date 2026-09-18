# Vanyshr Design System

> **What this is:** Canonical design bible for the Vanyshr app — the rule-of-law spec all frontend agents follow. · **Created:** 2026-09-18 · **Status:** final

## What's here

| File | Purpose |
|---|---|
| `DESIGN.md` | The design bible — the rule of law for all Vanyshr frontend work |
| `COMPONENTS.md` | Component catalog (Konsta owns chrome, shadcn/Radix owns content) |
| `llms.txt` | Agent-facing summary of the bible |
| `tokens.json` | Token values as data (mirror of tokens.css, for agents and tooling) |
| `tokens.css` | **Source of truth** for token values. The app consumes a synced copy (see below) |
| `AMENDMENTS.md` | Append-only log of every bible change |
| `GOVERNANCE.md` | The amendment protocol — how this repo changes |
| `Brand/LogoFiles/` | Current brand assets (ghost mascot, wordmark, icons) |
| `archive/2026-02-legacy/` | The pre-bible 2026-02 system: old docs, mockups, starter kit, skills. Superseded — do not treat as current |

## Who edits this

**Igor is the sole editor.** No agent working in the app repo touches these files — they aren't in that repo. Changes follow `GOVERNANCE.md`: propose → James approves by name → Igor applies + logs in `AMENDMENTS.md`.

## Relationship to vanyshr-mono

The app repo (`jamesringldr/vanyshr-mono`) holds a **synced read-only copy** at `packages/ui/src/styles/tokens.css` (the build and audit read that path). It carries a DO NOT EDIT header and is guarded by the repo's pre-commit hook. After any `tokens.css` amendment here, the copy is synced at a pinned commit SHA and verified.

Path references inside `DESIGN.md` (e.g. `packages/ui/src/...`) are relative to **vanyshr-mono**, not this repo.

## History

Resurrected 2026-09-18 from the dormant 2026-02 design-system repo. The February content (old navy system, mockups, Untitled UI starter kit) is preserved under `archive/2026-02-legacy/` and is not current.
