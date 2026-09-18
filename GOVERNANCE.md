# Bible Governance

> **What this is:** Change-control protocol for the Vanyshr design bible. · **Created:** 2026-09-18 · **Status:** final

## The rule

**Igor is the sole editor of this repository's bible files.** The bible is both the spec and the test for all Vanyshr frontend work — the test-taker does not rewrite the test. No agent working in the app repo edits these files; proposals come through the protocol below.

Protected files: `DESIGN.md`, `COMPONENTS.md`, `llms.txt`, `tokens.json`, `tokens.css`.
Append-only (anyone may append, no one rewrites history): `AMENDMENTS.md`.

## Amendment protocol

1. **Propose, don't apply.** The proposal states:
   - Exact change (file, old → new)
   - Why, with evidence (what breaks or what's missing without it)
   - Risk tier: **ADDITIVE** (new pattern, new token for a genuinely new need — extends the system) or **MUTATIVE** (changing an existing value, loosening a constraint, adding an exception — redefines what "passing" meant)
   - Impact: which existing pages/components the change affects
2. **James approves, by name.** A yes to the proposal approves exactly that change — nothing adjacent.
3. **Igor applies + logs atomically.** The amendment and its `AMENDMENTS.md` entry land in the same commit. Entry format: date, change summary, one-line rationale, risk tier, approved-by.
4. **Keep the mirrors in sync.** A token change touches `tokens.css` AND `tokens.json` together. If a documented rule changes, `DESIGN.md` changes with it. Never update one mirror alone.
5. **Sync downstream.** If `tokens.css` changed, the read-only copy in `vanyshr-mono` (`packages/ui/src/styles/tokens.css`) is synced at the new commit SHA and verified to match.

## Standing notes

- Adding a genuinely reusable catalog pattern during page conversion (the Mobbin process) is ADDITIVE and expected — still needs the proposal step, but it's the light path.
- James retains full owner access and may always edit directly; in practice, direct edits still get an `AMENDMENTS.md` entry.
