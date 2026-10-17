> **What this is:** Vinnie — the Vanyshr ghost character's face/expression engine. A JS module that animates a ghost SVG's eyes (gaze, blinks, expressions). · **Created:** 2026-10-17 · **Status:** final

# Vinnie Face Engine

`vinnie-face.js` drives the eyes of the Vanyshr ghost ("Vinnie") inside a host SVG. It runs a `requestAnimationFrame` loop that positions, scales, and rotates the two eye groups every frame — combining a chosen **expression**, a deterministic **blink calendar**, and subtle **liveliness** (gaze wander), with smooth morphing between expressions.

## Host SVG contract

The engine does not draw the ghost — it only moves eyes. The host SVG must contain:

- `#eye-left` and `#eye-right` groups (positioned via `transform`)
- each containing a `.lid` child (scaled for open/close and expression shaping)

Rest-pose coordinates in the file (`cx ≈ 48/79`, `cy ≈ 83–88`) match the ghost icon's viewBox space — if the ghost artwork is re-cut at a different scale, the `REST` table must be re-measured.

## API

Loaded as an IIFE; exposes `window.VinnieFace` (or `globalThis.VinnieFace`):

- `attach(svg, opts)` → handle. `opts`: `{ expression }` (default `"idle"`), `{ morph }` (seconds to blend between expressions, default `0.38`), `{ frozen }` (static pose, no loop drift).
- Handle: `setExpression(id)`, `setLook(x, y)` / `clearLook()`, `freeze()` / `thaw()`, `get id()`, `destroy()` (cancels the rAF loop).
- Also exposed for tooling: `REST`, `EXPRESSIONS`, `BY_ID`, `blend`, `sample`, `apply`.

## Expressions (16)

`idle`, `focused`, `surprised`, `excited`, `happy`, `laughing`, `angry`, `sad`, `scared`, `wary`, `confused`, `curious`, `proud`, `shy`, `unimpressed`, `sleepy`.

Each defines head gaze (yaw/pitch/roll), eye split, and per-eye width/height/tilt. Blending between any two is eased (`easeOutQuint`).

## Behavior notes

- **Blinks** follow a deterministic seeded calendar (~1.9–4.6s apart, 18% double-blinks), 0.18s duration — not random, so captures stay consistent.
- **Liveliness** adds low-amplitude sinusoidal gaze drift; it damps to 25% while a `look` target is set.
- The engine is framework-free and side-effect-light: one rAF loop per `attach`, no DOM outside the host SVG.

## Attribution

The expression model (four levers: gaze, eye split, per-eye size, per-eye tilt; blink calendar idea) is ported from [jeremy-prt/bloub](https://github.com/jeremy-prt/bloub) (`src/bot/expressions.ts`, `src/bot/face.ts`), MIT licensed. The ghost body artwork and the rest-pose measurements are Vanyshr's own.
