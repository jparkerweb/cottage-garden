# Development & Verification
> Part of [AGENTS.md](../AGENTS.md) — project guidance for AI coding agents.

## Run / preview

There is **no compile step, no package manager, no task runner**. Each tool is a complete page on its own. (The `build` skill stages `src/` → `docs/` for GitHub Pages, inlining any `src/_includes/` partials into the page — but the tools don't depend on it to run; see "No tooling to set up" below.)

Sources live in `src/`. Open and edit them there — `docs/` is generated and overwritten on each build.

- **Open directly:** double-click the file or open `file:///…/src/index.html` (and `src/fertilizer.html`, `src/companion-planter.html`) in a browser. The pages are designed to work fully from `file://`.
- **Optional static server** (only if a browser blocks something over `file://`): any static server works, e.g. `npx serve src` (or `npx serve docs` for the built copy), then visit the file.

The **only** network request is the Google Fonts `<link>` (Fraunces + Hanken Grotesk); everything else — logic, data, SVG — is inline. Offline, the page still works with fallback fonts.

## No tooling to "set up"

No `package.json`, lockfile, linter config, test framework, env vars, or backend. Don't introduce a bundler, framework, or npm dependency into the **tools** — the zero-build, opens-from-disk promise is a core project constraint (NFR): every page must still open and work directly from `src/…html` with nothing compiled. New tools should be authored the same way: one self-contained `.html` file.

The `build` skill is the one sanctioned exception, and only because it doesn't touch that promise: it stages `src/` to `docs/` and inlines `src/_includes/` partials into their pages (zero dependencies, Node stdlib only) so GitHub Pages gets self-contained HTML. The partials still load via `<script src>` in dev, so `src/` runs un-built. If a further transform is ever needed, add it as a step there — never as something a tool requires to run.

## Verification (manual smoke-check)

The project verifies by hand. After any change, check:

- **No console errors** on load or interaction.
- **Light + dark parity** — toggle the theme; both must read correctly (the toggle is shared across tools via `localStorage["fertilizerTheme"]`).
- **Responsive** — exercise desktop, tablet and the narrow mobile breakpoints (grids collapse around 860 / 620 / 430px in the tools).
- **Keyboard operable** — visible focus rings, list/option keyboard nav, no focus traps.
- **Reduced motion respected** — `prefers-reduced-motion` disables transforms/animation.
- **State round-trips** — change selections, copy the link, reload; the URL hash + `localStorage` restore the same state. A stale/invalid id falls back to the default selection.
- **Cross-tool links** — the shared nav and the `companion-planter → fertilizer` "Feed this →" deep-link land on the right page with the right preset preloaded.
- **Print** — the print card is clean (chrome/nav hidden) where a tool offers it. **Render and eyeball it** — a print-only CSS regression passes structural/static checks but can still print illegibly. A real case: the companions result panel flattens to white for print, so its rows (normally light-on-dark) must be explicitly forced dark-on-white in `@media print`; missing that left names/tags at ~1.25:1 on the page yet looked fine in the editor.
- **Full `DESIGN.md` fidelity** for any visual change.

## Automated browser smoke-check (fallback)

The checks above are manual, but the whole suite opens from `file://` with no server, so you can drive a real browser headlessly when no human is watching — useful for catching console errors, deep-link round-trips, state restore, and **print rendering** (which static checks miss). When the Claude-in-Chrome extension isn't connected, use Playwright against the **system Chrome** (no browser download needed):

- `npm i playwright-core` (or `playwright`), then `chromium.launch({ channel: 'chrome', headless: true })`.
- Load `file:///…/src/companion-planter.html`, exercise selection/search/filter/theme, assert via `page.evaluate`, and `page.screenshot({ fullPage: true })` in light, dark, and `page.emulateMedia({ media: 'print' })`.
- Restore precedence is a trap: navigating between two URLs that differ **only by the `#hash`** does **not** reload the document, so the inline script (and `loadState`) never re-runs. Use a fresh context or `page.reload()` to truly test "open a shared link".
