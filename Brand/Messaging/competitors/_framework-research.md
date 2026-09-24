# Framework research — brand voice & positioning

> **What this is:** Web sweep on established voice/positioning frameworks to structure the Vanyshr workshop and the canonical BRAND-VOICE.md. · **Created:** 2026-09-24 · **Status:** complete — sweep run 2026-09-24 after browser access recovered.

All five planned queries ran: messaging hierarchies, voice sliders + we-are/we-are-not patterns, jobs-to-be-done for privacy/security, fintech voice case studies (Cash App, Monzo). Each framework below: what it is, its core mechanics, and exactly how it applies to Vanyshr's workshop or voice doc.

---

## 1. Nielsen Norman Group — Four Dimensions of Tone

**Source:** Kate Moran, Nielsen Norman Group, 2016 — "The Four Dimensions of Tone of Voice" (referenced via https://github.com/judicael-s/copywriting-skill/blob/HEAD/references/tone-dimensions.md)

- Tone plots on **four independent sliders, not binaries**: Funny ↔ Serious, Formal ↔ Casual, Respectful ↔ Irreverent, Enthusiastic ↔ Matter-of-fact. A brand can be casual *and* serious (the friendly-financial-advisor combo Vanyshr likely wants).
- Each slider is a **position, not a switch** — the workshop's 1–5 placement maps directly. Conflating dimensions ("professional but fun" with no definition) produces incoherent guidelines.
- **Empirically grounded:** tone measurably affects perceived friendliness, trustworthiness, and desirability — and ~52% of desirability variability is explained by trustworthiness, so trust-building dimensions (matter-of-fact, plainspoken, respectful) pay more than charm for a privacy product.
- Anti-pattern: **midpoint on every slider = no voice.** Teams default to 4–7 and get forgettable. Take real positions.
- **How it applies:** feeds workshop cluster 2 (personality sliders) as-is. Add the ratio discipline from Sprinklr/Bigeye frameworks (2025): state positions as ratios (e.g. 80/20 serious), never "somewhere in the middle."

## 2. Voice-vs-tone split + "this, but not that"

**Sources:** Mailchimp's "Voice and Tone" guide (heritage reference); Slack's voice attributes; Microsoft voice principles; Polaris design system content guidance — collected via https://github.com/onemole6022/claude-content/blob/HEAD/skills/strategy/brand-voice/SKILL.md and https://github.com/adamforrester/prism3/blob/HEAD/docs/29-tone-of-voice.md

- **Voice is constant; tone adjusts to context.** Mailchimp: "You have the same voice all the time, but your tone changes." Microsoft: "our voice is constant… we adapt our tone — from serious to empathetic to lighthearted — to fit the context and the customer's state of mind."
- **"This, but not that"** bounds each trait so it can't be misread — Mailchimp: fun *but not childish*, confident *but not cocky*, smart *but not stodgy*, informal *but not sloppy*; Slack: clear *but not blunt*, humble *but not insecure*. The "not that" is what makes the trait executable.
- Mailchimp's golden rule: **"Always more important to be clear than entertaining."** Polaris (the most-used design-system content guide) deliberately does less: *"Don't worry too much about voice and tone, just focus on sounding human"* — plain language, contractions, read-aloud test, ~7th-grade reading level.
- **Tone moves with stakes:** the voice that's charming on an onboarding screen is offensive in an error that cost someone an hour. Dial down humor, enthusiasm, and irreverence as consequence rises — to zero at data loss.
- **How it applies:** feeds workshop cluster 3 (we-are/we-are-not — use the exact "X but not Y" shape), schema §4 (voice principles: write 3–5 as rules, not adjectives), and schema §8 (tone by context: errors/empty states/legal adjust tone, never voice). The voice-doc structure this implies: voice summary → slider scores → tone rules → vocabulary → before/after rewrites → channel adaptations → wallet-size quick reference.

## 3. The messaging house — positioning → pillars → proof

**Sources:** https://github.com/aouellets/skillme/blob/HEAD/skills/messaging-hierarchy/SKILL.md · https://github.com/joanium/joanium/blob/HEAD/Skills/Joanium/BrandStrategy.md · https://github.com/astdeniss/business-skills/blob/HEAD/brand-messaging/SKILL.md

- **Hierarchy, top-down:** Layer 1 tagline (3–7 words, memorable not clever) → Layer 2 value proposition (1–2 sentences: specific benefit + differentiated reason) → Layer 3 pillars (exactly 3; 2 is thin, 4+ dilutes recall) → Layer 4 proof points (checkable: a number, a named capability, a customer result, a compliance fact — if you can't substantiate it, it's a claim, not proof).
- **Positioning template (Moore):** "For [target] who [need], [product] is the [category] that [single differentiated benefit] — unlike [alternative]." Write it in the customer's language; kill adjectives any competitor could also claim. Test it against five filters: specific (excludes some people), differentiated (competitors couldn't honestly say it), true (provable), relevant, durable.
- **Pillar derivation:** ask "what three things must a skeptic believe for the value prop to be true?" — those are the pillars, named as benefits the buyer feels, not features shipped. Each pillar gets a 3–6 word headline, 1–2 sentence explanation, 2–3 proof points.
- **Ladder-up test:** for every proof point ask "which pillar?" and for every pillar ask "does this prove the value prop?" Orphans get cut. Every value prop must pass the 4C test: Clear, Credible, Compelling, Competitive.
- **How it applies:** feeds workshop cluster 1 (positioning — converge to the Moore sentence) and cluster 5 (messaging pillars — claim + proof per pillar, proof must be checkable). Also gives the workshop's live-rewrite cluster a test: every Vanyshr string should ladder up to a pillar.

## 4. Jobs-to-be-done: functional / emotional / social

**Sources:** https://medium.com/@Bryanjnoel/your-customers-dont-buy-products-they-hire-them-bryan-j-noel-e100855d1716 · https://www.designative.info/2022/02/06/bringing-business-impact-and-user-needs-together-with-jobs-to-be-done-jtbd/

- People "hire" products for three different jobs simultaneously: **functional** (get the task done), **emotional** (how it makes me feel), **social** (how it makes me look). Products marketed to only one job lose buyers hired for the others — and the real competition is often something unrelated that does the emotional/social job better.
- For a privacy product, the split is instructive: functional = "remove my data from brokers" (what every competitor sells); emotional = "stop worrying, feel in control" (where Vanyshr's calm-confidence lane lives); social = "be the kind of person who takes privacy seriously" (untapped in the category).
- JTBD headline testing: write variants per job angle — functional ("Every broker. Every removal. One dashboard."), emotional ("Stop wondering who's selling your data."), social — and let each prove itself.
- **How it applies:** feeds workshop cluster 1 (positioning — "what job does Vanyshr do that nothing else does?" answered at all three levels) and cluster 5 (pillars should cover more than the functional job; the emotional job is where Vanyshr differentiates from fear-first competitors).

## 5. Fintech references: Monzo's public voice guide + Cash App's voice

**Sources:** Monzo tone of voice — http://monzo.com/tone-of-voice · Cash App brand-trust research — https://www.alistdaily.com/strategy/cashapp-ayzenberg-rebuilding-brand-trust-in-the-age-of-skepticism/amp/ · fintech campaign analysis — https://www.5wpr.com/new/best-fintech-marketing-campaigns/

- **Monzo's four principles** (closest public model for a friendly fintech voice): *straightforward kindness* ("we're clear, inclusive and focused on the reader; we go out of our way to make complex things simple"); *everyday magic* (transform the mundane with moments of unexpected delight); *warm wit* ("humour is a delicate seasoning… we want people to feel part of the joke, not the target of it"); *focus on what matters to readers* ("your first question before writing: what does my reader care about most?" — impact before process). Practical rules: swap formal words for normal ones (utilise→use, commence→start), read it aloud, use the language the audience uses.
- NN/g analysis scores Monzo as **Casual / Serious / Respectful / Enthusiastic** — the exact quadrant Vanyshr's locked direction points at (casual register, serious about the job, respectful of the reader, enthusiastic delivery).
- **Cash App:** sells cultural relevance without pandering — no explainer, no slogan, no voice-over; lets the product be checked casually mid-story. Audience research found trust comes from **insider language and listening** (users want to feel the brand speaks their language; personalization beats generic messaging). The *BREAD* zine made financial literacy accessible through storytelling — the "translator" move applied to finance.
- **How it applies:** Monzo is the worked example for workshop cluster 4 (vocabulary — formal→normal swaps are directly stealable) and the slider target for cluster 2 (CSRE as a starting hypothesis to confirm or move). Cash App validates the locked philosophy: approachable fintech voice earns trust through insider language and restraint, not explanation. Steal Monzo's reader-first question ("what does my reader care about most?") as a voice principle.

---

## Workshop-cluster → framework map

| Workshop cluster | Framework to use |
|---|---|
| 1. Positioning | Moore template + JTBD (all three jobs); test against the 5 positioning filters |
| 2. Personality sliders | NN/g 4 dimensions; ratio positions, no unexplained midpoints; Monzo CSRE as starting hypothesis |
| 3. We are / we are not | "This, but not that" (Mailchimp/Slack shape) |
| 4. Vocabulary | Power-word / ban-list word bank; Monzo formal→normal swaps; Mailchimp "translators" |
| 5. Messaging pillars | Messaging house: 3 pillars, claim + checkable proof each; skeptic test + ladder-up test |
| 6. Live rewrites | Before/after pairs as canonical doc examples; Monzo read-aloud test |

## Still pending (not this sweep)

- **Landing + product page web research** (Serus `/protection/` and `/intelligence/`, Self, Intelbase, and the rest) — runs when browser access is back; folds into the synthesis, not this file.
- **Brands James likes** — he hasn't supplied these yet; they'll feed the workshop's evidence base when they arrive.
