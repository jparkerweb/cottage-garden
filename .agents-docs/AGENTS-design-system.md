# Design System
> Part of [AGENTS.md](../AGENTS.md) — project guidance for AI coding agents.

**`DESIGN.md` in the project root is the canonical source of truth** (full tokens, type scale, components, do's & don'ts). It is **read-only — do not edit it.** This page is the working summary; consult `DESIGN.md` for exact values before any visual change.

## Identity

A pressed-herbarium specimen sheet: warm recycled-paper surfaces, deep botanical ink, fine hairline rules, long whisper-soft shadows. **Flat and tonal** — no glassmorphism, no glossy chrome. Calm, tactile, analogue; aimed at non-expert home gardeners (generous spacing, one accent idea at a time).

## Color

Warm paper-and-ink duotone with a botanical accent trio (the N–P–K spine of the brand). Tokens are defined once per file in `:root` and overridden under `html[data-theme="dark"]`.

- **`--ink` #23301F** — primary text, selected/pressed fills, and the inverted result panel. Treated as a near-black; **never use `#000000`.**
- **`--bloom` #C25D7C (phosphorus pink)** — the single interactive accent: links, eyebrows, focus rings, hover borders.
- **`--leaf` #4E7C4A (nitrogen)** and **`--vigour` #C28B36 (potassium)** — decorative/data roles only (bars, chips, the plant, legend dots).
- **Surface stack lightens inward:** `--paper` #E9E3D2 → `--paper-2` #F1ECDD → `--paper-3` #FBF8F0. (Hierarchy = lighter is more "raised", the opposite of dark-UI elevation.)
- **Accent-as-text variants** (`--leaf-text`, `--bloom-text`, `--vigour-text`) exist because the raw accents fail WCAG AA on paper — use them for small accent text.
- **`--warning` #E29650** — soft amber for cautions only (e.g. "keep apart", overdose), never alarming red.
- **Dark mode** ("evening garden") is a full second token set: low-luminance green surfaces, parchment text, brightened accents, an even-deeper result surface.

## Typography

Two families only:

- **Fraunces** (variable serif, optical sizing) — the *voice*, almost always **italic, weight 500**: hero display, section headings, panel titles, big numerals, and the N/P/K letter glyphs. Slightly tight tracking (−0.01em) on large sizes.
- **Hanken Grotesk** — the *workhorse*: body, hints, buttons, and the wide-tracked uppercase micro-labels (eyebrow 0.26em / overline 0.14em / caption 0.12em).
- Numeric output uses `font-variant-numeric: tabular-nums`. The scale is fluid via `clamp()`.

## Shape & depth

- Corners are crisp: **3px** for containers/inputs, **2px** for small data objects (chips, presets), **999px pills** reserved for switchable toggles/tags, **50% circles** only for tiny affordances (slider thumbs, dots).
- Depth is **tonal + linear**, not shadow-heavy: lighter surfaces read as raised; hairline `--line` borders and dashed dividers separate regions; shadows are long, soft and very low-alpha. The one truly "raised" element is the inverted ink result panel (earns prominence by color inversion).

## Do / Don't

- **Do** use `--bloom` as the only interactive accent. **Don't** put leaf/vigour on interactive affordances — those belong to data.
- **Do** render small accent text with the `*-text` variants. **Don't** use raw accent hues for type under ~18px (fails AA).
- **Do** show selection by filling with `--ink` and inverting text to `--paper-3`/`on-primary`. **Don't** invent a new "selected" highlight color.
- **Do** build hierarchy by lightening surfaces inward + hairline rules. **Don't** reach for heavy/hard shadows.
- **Do** keep Fraunces *italic* for display/numerals/N-P-K letters. **Don't** set body or UI labels in the serif, and never use pure black.
