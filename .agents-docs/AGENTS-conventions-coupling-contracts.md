# Conventions & Coupling Contracts
> Part of [AGENTS.md](../AGENTS.md) — project guidance for AI coding agents.

## Code style (house idiom)

- **Vanilla JS, ES5-friendly**: one IIFE per file, `"use strict"`, `var` (not `let`/`const`), classic `function` declarations. No transpiler, no modules, no framework. Match the existing style rather than modernizing it.
- **CSS**: plain CSS with custom properties and `clamp()` for fluid sizing. No preprocessor, no utility framework.
- **Graphics**: inline SVG (category emblems, herbarium motifs, the generative plant). No image assets at all — even the eQuill Labs footer wordmark is pure text + CSS (no logo file).
- **One self-contained file per tool** — markup, CSS, script and data all live in the same `.html`. Don't split into external `.css`/`.js`/`.json`.

## Duplicated-by-design code

There is no shared stylesheet or script. The following are **copied verbatim into every page** and must be kept identical:

- The token block: `:root { … }` **and** `html[data-theme="dark"] { … }`.
- The shared cross-tool nav (`.sitenav`) markup **and** its CSS. Comments in the files literally say "mirrored in …".
- The shared eQuill Labs footer colophon (`.colophon`) markup **and** its CSS — the **CSS wordmark** (`.wordmark` lockup: `eQui` in Geist + gradient `\\` slash glyph in Geist Mono + `Labs` in Instrument Serif italic, reproducing equilllabs.com's `.wordmark`), the `https://www.equilllabs.com/` brand link, and the "Source on GitHub" repo link (`https://github.com/jparkerweb/cottage-garden`). The three brand fonts (Geist, Geist Mono, Instrument Serif) are appended to the shared Google Fonts `<link>`. Comments say "mirrored verbatim in …".
- The `setTheme()` theme logic.

➡️ When you touch any of these, update **`index.html`, `fertilizer.html`, and `companion-planter.html` together.**

## Coupling contracts (do not drift)

| Contract | Value |
|---|---|
| Shared theme key | `localStorage["fertilizerTheme"]` — values `"light"` / `"dark"` (dark mode chosen in any tool carries across all) |
| Fertilizer state key | `localStorage["fertilizerPlot"]` |
| Companion state key | `localStorage["companionPlanter"]` |
| Deep-link out (companion → fertilizer) | `fertilizer.html#f=<encodeURIComponent(presetName)>` |
| The six fertilizer preset names | `All-purpose balanced` · `Leafy greens & lawns` · `Tomato & vegetable` · `Rose & flower` · `Bulbs & roots` · `Gentle all-organic` |
| Companion URL hash params | `p=<plantId>` · `c=<cat>` · `r=<reasonKey>` (search query is ephemeral) |
| Default / fallback selection (companion) | Tomato (`id: "tomato"`) |

The preset names are a **contract**: `companion-planter.html`'s `feed` mapping and `fertilizer.html`'s `loadState()` both depend on the exact strings. Renaming a preset means updating both files in lockstep.

## State & persistence pattern

State is shareable and restorable: write to the URL hash + `localStorage`, read both on load (hash wins), and **validate** restored values — an unknown/stale id must fall back to the default rather than error.

## Accessibility & robustness (required, not optional)

- **WCAG AA text** — use the `*-text` accent variants (`--leaf-text`, `--bloom-text`, `--vigour-text`, `--stem-text`) for any accent-coloured text under ~18px; never the raw `--leaf` / `--bloom` / `--vigour` / `--stem` hues for small text. (`--stem-text` was added for `companion-planter.html`'s support/shade reason tags; `fertilizer.html` ships only the first three.)
- **Keyboard operable** — visible `:focus-visible` rings; arrow-key navigation for option lists; no focus traps.
- **`prefers-reduced-motion`** — gate transforms/animation behind it.
- **Light/dark parity** — every new surface must read correctly in both themes.
- **Opens from `file://`** with no console errors.
