# Architecture
> Part of [AGENTS.md](../AGENTS.md) — project guidance for AI coding agents.

## Big picture

The suite is several **independent single-file tools** that share a visual language and a few cross-file contracts (see [Conventions & Coupling Contracts](./AGENTS-conventions-coupling-contracts.md)). There is no shared stylesheet or shared script — common code (design tokens, the `.sitenav`, the theme logic) is **duplicated verbatim** in each file by design. When you change shared chrome, change it in **every** file.

Each `.html` file is laid out the same way:

```
<head> … fonts + meta
<style> … :root tokens + html[data-theme="dark"] tokens + page CSS
<body> … .sitenav, .toolbar, hero <header>, numbered <section>s, <footer>
<script> (function(){ "use strict"; … })()   // one IIFE per file
```

## The four-layer IIFE pattern

Both tools (and any future tool) follow the same data-driven shape inside the IIFE — **Data → Derive (pure) → Render → State/Wiring** — with a single top-level render per state change. No framework, no reactive store; just plain functions and one `state` object.

1. **Data** — literal datasets that are the single source of truth. Embedded in the page's `<script>`, or — when large — authored in a `src/_includes/` partial the build inlines (see "Partials" below).
2. **Derive** — pure helper/index functions (e.g. build lookups, compute results). No DOM, no side effects.
3. **Render** — functions that read `state` and write the DOM. One orchestrator runs the rest.
4. **State / Wiring** — a `state` object, event listeners, and `serialize` / `loadState` / `saveState` that sync state ↔ URL hash ↔ `localStorage`, plus shared chrome (theme toggle, toast, print).

## Partials (build-inlined includes)

A tool whose data or art block is large enough to dominate the file may split it into a partial under `src/_includes/`, kept out of the HTML so it can be edited on its own. `companion-planter.html` does this for its plant data and per-plant SVG art.

- **Reference** the partial from the page with a `<script src="_includes/NAME.js"></script>` tag **alone on its own line** (indentation is preserved). In dev (`src/`, `file://`) the browser just loads it, so the page runs un-built.
- The **build** (`inlineIncludes` step) replaces each such tag with the file's contents wrapped in a plain `<script>`, then `pruneIncludes` deletes `_includes/` from `docs/` — the published page is self-contained HTML with nothing left to fetch.
- **Caveat:** a literal `</script>` anywhere in a partial's payload would close the wrapper early; the build **fails loud** on it (and on a missing partial). Don't emit `</script>` in partial data.
- A partial is plain top-level script — it assigns the globals the IIFE reads (e.g. `var PLANTS = […]`). Keep it data/art only; logic stays in the page's IIFE.

### `fertilizer.html` specifics

- `PRESETS` (the six named feeds) + `DEFAULTS` → `state`.
- `compute()` (pure) does the dose/cost math; `renderBlend(animate)` is the per-change orchestrator that also redraws the generative SVG plant; `renderBuy()` / `renderSchedule()` render sub-panels.
- State: `serialize()` → `URLSearchParams`; `loadState()` reads `location.hash` then `localStorage["fertilizerPlot"]`; it already parses the `#f=<preset>` deep-link param (the companion tool's entry point).

### `companion-planter.html` specifics

- Datasets: `PLANTS` (139), `REASONS` (8-key taxonomy), `EDGES` (stored once per pair, mirrored both ways at init). Indexes `BY_ID` and `ADJ` are built once. `PLANTS`/`EDGES` live in `src/_includes/companion-planter.data.js`; the per-plant SVG art in `src/_includes/companion-planter.art.js` — both inlined at build (see "Partials").
- Data model:
  ```
  Plant { id, name, latin?, cat(veg|herb|flower|fruit), aliases?[], blurb?, feed }
  Reason{ key(pest|trap|pollinator|flavour|nitrogen|mulch|support|shade), label, accent }
  Edge  { a, b, rel(good|bad), reasons[], conf(strong|traditional), note?, w? }
  ```
- **Ranking:** `score = conf(strong=2, traditional=1)*10 + reasons.length + (w||0)`, sorted desc, alpha tiebreak. `strong` = "Well attested" (no marker); `traditional` = dotted/"~", ranked below strong.
- Renderers: `renderList` (search + category pills), `renderPlate` (selected-plant specimen + "Feed this →"), `renderCompanions`, `renderAntagonists`, `renderReasonFilter`.
- State key: `localStorage["companionPlanter"]`; URL params `p=<plantId>` · `c=<cat>` · `r=<reasonKey>`; default/fallback selection is Tomato.

### `index.html` specifics

Static hub — no datasets. Reuses the token block, `.sitenav`, hero, and a specimen-plate tool grid. Its only script is the shared `setTheme` logic reading/writing `localStorage["fertilizerTheme"]`.
