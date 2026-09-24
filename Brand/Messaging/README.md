> **What this is:** the research foundation for Vanyshr's brand voice — competitor teardowns, ICP/objection/VoC research, and partnership recon · **Created:** 2026-09-24 · **Status:** research inputs (draft) — NOT canonical voice

# Brand Messaging

Research inputs for Vanyshr's brand voice and messaging. Everything in this folder is **evidence and raw material**. It feeds the voice workshop and the eventual canonical `BRAND-VOICE.md`, but nothing here is itself the brand voice — do not quote these files as brand law.

## Contents

### `competitors/` — teardowns & synthesis
Nine screenshot-based app teardowns (`aura`, `cloaked`, `guardio`, `google-removal-request`, `incogni`, `kasper`, `optery`, `privacy-hawk`, `privacybee`): positioning, claims, voice, pricing, proof patterns. Each backed by screenshot filenames and verbatim quotes.

- `_research-synthesis.md` (v2, draft) — cross-competitor synthesis: 11 workshop questions, plus §6b, the differentiation thesis (agentic architecture, synthetic obfuscation, solo-founder/VC framing, family-hypothesis status).
- `_landing-page-copy.md` — verbatim landing-page copy bank (Aura, DeleteMe, Mozilla Monitor, Incogni, Optery, others).
- `_framework-research.md` — messaging frameworks surveyed.
- `adjacent-carefull-infoarmor.md` — **adjacent intelligence, not competitors.** Carefull and InfoArmor/Allstate are advisor-distributed monitoring products (no removal execution). Read for the advisor-channel pitch template and the "privacy layer nobody has" gap. Includes the Baird × InfoArmor 2018 correction.

### `research/` — ICP, objections, language, partnerships
- `icp-recon.md` — 8 ranked ICPs with trigger evidence. Strongest trigger: harassment/stalking/DV survivors. Strongest family-adjacent wedge: adult children buying scam protection for elderly parents. Caveats: Reddit sentiment secondhand, no demographic dataset.
- `competitor-complaints.md` — 8 category-wide complaint themes (data returns, cancellation friction, no proof, support disappears…) → copy and product openings.
- `voc-phrase-bank.md` — voice-of-customer language. Copy-ready phrases, native-term ranking (**remove** > opt out > data broker), terms to avoid (take control, PII, peace of mind, whack-a-mole, unverified stats).
- `icp-objections.md` — per-ICP objections with verbatim quotes, 6 universal objections, and 20 "copy must answer" questions (questions, not answers).
- `partnership-recon.md` — affiliate/referral/white-label opportunities ranked for a solo founder (real-estate associations, RIAs, survivor orgs, family law, employer benefits, creator orgs…). First-3 recommendation: KC Realtors association → NNEDV Safety Net → independent RIAs.

### `likes/` — liked-brand examples (pending)
Drop liked-brand material here — screenshots, links, notes on *what* you like about each. Includes brands outside the category. This is the last missing input before the workshop.

## How to use these files

**Running the voice workshop (Igor runs, James decides).** One cluster at a time:
- Positioning ← `_research-synthesis.md` §6b + `icp-recon.md`
- Personality ← synthesis (Self/Mozilla Monitor notes) + `competitor-complaints.md`
- We-are / we-are-not ← `competitor-complaints.md` + `voc-phrase-bank.md`
- Vocabulary ← `voc-phrase-bank.md` (settles exposure/visibility debates with evidence, not opinion)
- Pillars & proof ← `icp-objections.md` + `competitor-complaints.md`
- Live rewrites ← the translation rule below + `voc-phrase-bank.md`

**Writing copy.** The translation rule: **users supply the promise language, you supply the mechanism language.** Lift promises near-verbatim from the phrase bank ("get your info off," "no way for a stranger to find me," "handled behind the scenes"). Reserve taught terms ("synthetic," "visibility") for the mechanism — never make the reader learn a word to understand what they're getting. Lint every draft against the terms-to-avoid list.

**Answering objections.** `icp-objections.md` is the checklist: the 6 universal objections (privacy paradox, proof demands, efficacy ceiling, free alternatives, category distrust, speed) belong on core pages; segment objections belong on segment pages. Pair with `competitor-complaints.md` for the proof layer (per-removal receipts, honest counters, one-click cancellation as a trust feature).

**Partnerships.** `partnership-recon.md` is the sequenced hit list; `adjacent-carefull-infoarmor.md` is the advisor-channel briefing ("sell the firm's economics, never the client's fear"). The survivor-org track follows the give-not-sell structure: org-referred or self-attestation — never ask survivors to prove victimhood.

**Standing hypotheses — do not use as claims.** Serus "retrieval-for-chatbot" read = anecdotal/unproven. Optery paid-broker-access suspicion = strong but unproven. Family-first 10-user plan = unvalidated. Solo-founder = not consumer copy (VC/margin narrative only).

## Implementation plan

- [x] **Phase 0 — Research** (complete 2026-09-24): competitor teardowns, synthesis v2, ICP / complaints / VoC / objections / partnership research.
- [ ] **Phase 1 — Liked brands** (James): drop examples into `likes/`. Last input before the workshop.
- [ ] **Phase 2 — Voice workshop** (Igor runs, one cluster at a time): positioning → personality → we-are/we-are-not → vocabulary → pillars/proof → live rewrites.
- [ ] **Phase 3 — `BRAND-VOICE.md`**: drafted from workshop output; James approves **by name**; then committed as canonical. Proposed location: this folder (confirm in workshop).
- [ ] **Phase 4 — Enforcement**: copy checklist wired into the `vanyshr-brand-voice` skill; `vanyshr-frontend` page builds lint against it. Canonical voice falls under bible governance (Igor sole editor; amendments need James's approval).
- [ ] **Phase 5 — Partnerships** (parallel, James-owned): outreach per `partnership-recon.md` sequencing.

## Notes & caveats

- The 70MB competitor screenshot archive is **not** committed (kept in Igor's working files). Every claim in the teardowns is independently backed by verbatim quotes + page URLs in the files themselves.
- Provisional items: Baird × InfoArmor $7.95 was a 2018 deal (Baird now uses ID Watchdog); Carefull wholesale/advisor pricing is not public.
- This folder is research input, not bible law — no `AMENDMENTS.md` entry. Change control applies once `BRAND-VOICE.md` is canonical.
