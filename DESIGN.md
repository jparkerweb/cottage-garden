---
name: The Fertilizer Plot
description: A backyard cottage-garden companion — pressed-herbarium editorial design in warm paper and ink
colors:
  # Core roles
  primary: "#23301F"            # "ink" — deepest green-black; primary text, selected/pressed states, inverted result surface
  secondary: "#C25D7C"          # "bloom" — interactive accent: links, eyebrows, focus, hover borders (Phosphorus)
  tertiary: "#C28B36"           # "vigour" — gold accent (Potassium)
  # Botanical accent trio (the N–P–K spine of the brand)
  nitrogen: "#4E7C4A"           # leaf green
  phosphorus: "#C25D7C"         # bloom pink
  potassium: "#C28B36"          # vigour gold
  stem: "#3E5B3C"               # muted stem green for line work
  # Surfaces (warm paper stack, light → lighter)
  surface: "#E9E3D2"            # page background ("paper")
  surface-raised: "#F1ECDD"     # panels & cards ("paper-2")
  surface-inset: "#FBF8F0"      # inset wells: inputs, presets, plate ("paper-3")
  # Text
  on-surface: "#23301F"         # primary text on paper
  on-surface-muted: "#5C6450"   # secondary / supporting text
  on-primary: "#FBF8F0"         # text on the inverted (ink) result surface
  # Accent-as-text variants (darkened to pass WCAG AA on paper)
  leaf-text: "#3C6238"
  bloom-text: "#A6395A"
  vigour-text: "#8A5E14"
  # Lines & semantics
  outline: "#CBC3AA"            # hairline borders ("line")
  outline-soft: "#D9D2BC"       # faint dividers ("line-soft")
  warning: "#E29650"            # amber caution (overdose / no-nitrogen notices)
typography:
  display:
    fontFamily: Fraunces
    fontSize: 86px              # fluid clamp(2.7rem, 8vw, 5.4rem); value shown is desktop max
    fontWeight: 500
    lineHeight: 0.96
    letterSpacing: -0.01em
  headline:
    fontFamily: Fraunces
    fontSize: 33px             # section titles — clamp(1.5rem, 3vw, 2.05rem)
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: -0.01em
  headline-numeric:
    fontFamily: Fraunces
    fontSize: 53px             # result "big" figure — clamp(2.2rem, 5.6vw, 3.3rem); tabular-nums
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: 0em
  letter-display:
    fontFamily: Fraunces
    fontSize: 38px             # the italic N / P / K glyphs on nutrient cards
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: 0em
  title:
    fontFamily: Fraunces
    fontSize: 19px             # panel headings ("Choose a feed", "Your plot")
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0em
  lede:
    fontFamily: Hanken Grotesk
    fontSize: 20px             # hero standfirst — clamp(1.02rem, 1.6vw, 1.22rem)
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0em
  body:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0em
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px             # hints, card body, helper copy (on-surface-muted)
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  numeral:
    fontFamily: Fraunces
    fontSize: 22px             # NPK chip values — tabular-nums
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: 0em
  label:
    fontFamily: Hanken Grotesk
    fontSize: 13px             # field labels — UPPERCASE
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.04em
  eyebrow:
    fontFamily: Hanken Grotesk
    fontSize: 12px             # the wide-tracked brand eyebrow
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.26em
  overline:
    fontFamily: Hanken Grotesk
    fontSize: 12px             # roles & sub-headers ("LEAF & STEM", "WHAT ARE YOU FEEDING?")
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.14em
  caption:
    fontFamily: Hanken Grotesk
    fontSize: 10px             # chip keys (N/P/K), delivery tile keys
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.12em
rounded:
  sm: 2px                      # chips, preset cards, delivery tiles — crisp, almost-square
  DEFAULT: 3px                 # panels, result, number inputs
  full: 999px                  # pills: segmented toggle, type tags, icon buttons, toast
spacing:
  base: 4px
  xs: 6px
  sm: 8px
  md: 14px
  lg: 22px
  xl: 34px                     # max grid gutter — clamp(18px, 2.5vw, 34px)
  section: 72px                # space between sections — clamp(40px, 6vw, 72px)
  page-padding: 56px           # wrapper inset — clamp(20px, 4vw, 56px)
  container-max: 1120px
components:
  card:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body}"
    rounded: "{rounded.DEFAULT}"
    padding: 28px
  card-specimen:
    backgroundColor: "{colors.surface-inset}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.DEFAULT}"
    padding: 28px
  result-panel:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.headline-numeric}"
    rounded: "{rounded.DEFAULT}"
    padding: 28px
  preset-card:
    backgroundColor: "{colors.surface-inset}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: 9px 11px
  preset-card-selected:
    backgroundColor: "{colors.surface-inset}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: 9px 11px
  pill:
    backgroundColor: "{colors.surface-inset}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: 7px 13px
    height: 36px
  pill-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: 6px 13px
    height: 34px
  input-number:
    backgroundColor: "{colors.surface-inset}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body}"
    rounded: "{rounded.DEFAULT}"
    padding: 9px 10px
    height: 42px
  nutrient-card:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.DEFAULT}"
    padding: 20px 18px
---

# The Fertilizer Plot — Design System

## Overview

The Fertilizer Plot is a literary, almanac-flavoured gardening tool dressed as a **pressed-herbarium specimen sheet**. Its personality is calm, tactile and analogue: warm recycled-paper surfaces, deep botanical ink, fine hairline rules, and an old-press serif (Fraunces, italic) speaking over a clean modern grotesque (Hanken Grotesk). The aesthetic is **flat with soft, low elevation** — no glassmorphism, no glossy chrome — relying on tonal paper layers, hairline borders and long diffuse shadows to organise the page. The whole identity is keyed to the three garden nutrients it teaches: **Nitrogen (leaf green), Phosphorus (bloom pink) and Potassium (vigour gold)**, which recur as the only saturated colour in an otherwise muted palette. The target reader is a non-expert home gardener, so the design favours generous spacing, reassuring tone and a single accent hue per idea rather than dense dashboards.

## Colors

The palette is a **warm paper-and-ink duotone with a botanical accent trio.**

- **`primary` (#23301F, "ink")** — the deepest green-black. It does triple duty: primary body text, the fill of *selected/pressed* controls, and the background of the inverted **result panel**. Treated almost as a near-black, it anchors the page.
- **`secondary` (#C25D7C, "bloom")** — the one truly interactive hue: links, the brand eyebrow, focus rings, and hover borders. It is the "phosphorus" pink, so the accent that invites action is literally the flower colour.
- **`tertiary` / `potassium` (#C28B36, "vigour")** and **`nitrogen` (#4E7C4A, leaf)** complete the N–P–K trio. These appear as 3–4px accent bars, chip underlines, slider thumbs and the generative plant illustration — decorative roles where saturation is safe.
- **Surface stack** — `surface` (#E9E3D2 paper) → `surface-raised` (#F1ECDD panels) → `surface-inset` (#FBF8F0 wells/inputs). Hierarchy is built by *getting lighter as you go inward*, the opposite of a typical dark-UI elevation ramp.
- **Text** — `on-surface` (#23301F) for primary, `on-surface-muted` (#5C6450) for support, `on-primary` (#FBF8F0) on the ink result panel.
- **Accent-as-text variants** — because the raw leaf/bloom/vigour hues fail WCAG AA at small sizes on paper, dedicated darker tokens (`leaf-text` #3C6238, `bloom-text` #A6395A, `vigour-text` #8A5E14) are used wherever an accent must read as *text* (eyebrows, chip keys, the N/P/K letters, the K shield). **Never** use the decorative accent for small text.
- **`warning` (#E29650)** — a soft amber used only for cautionary notices (over-large doses, no-nitrogen blends), shown as tinted-background advisories rather than alarming red.

> **Dark mode** ("evening garden") is a full second token set toggled via `html[data-theme="dark"]`. Surfaces invert to low-luminance greens (`#171C14` → `#202619` → `#28301F`), text lifts to warm parchment (`#ECE7D6`), and the accent trio brightens (`#79A86F`, `#D98199`, `#D7A85C`) to hold contrast. The result panel becomes an even deeper surface (`#0F140C`) so it stays distinct rather than dark-on-dark. The generative-plant colours are read from CSS custom properties at runtime so the illustration re-themes correctly.

## Typography

Two families carry the whole system:

- **Fraunces** (variable serif, optical sizing) is the *voice* — almost always **italic at weight 500** for an engraved-almanac feel. It sets the hero `display`, section `headline`s, panel `title`s, the big result `numeral`, the NPK chip values, and the oversized N/P/K `letter-display` glyphs. Tracking is pulled slightly tight (−0.01em) on the largest sizes.
- **Hanken Grotesk** is the *workhorse* — body copy, hints, labels and the wide-tracked UI overlines. It runs 400 for prose and 600–700 for labels/eyebrows.

The scale is deliberately **fluid**: the hero, section titles and result figure all use `clamp()` (the YAML records the desktop maximum). A consistent device throughout is the **uppercase micro-label** — `eyebrow` (0.26em tracking), `overline` (0.14em) and `caption` (0.12em) — which gives the herbarium "field-label" texture. Numeric outputs use `font-variant-numeric: tabular-nums` so figures don't jitter as they update live.

## Layout

A single centred column, **`container-max` 1120px**, with fluid wrapper padding (`page-padding`, up to 56px). Content is organised into three numbered sections (01–03) separated by a large fluid `section` gap (up to 72px), each introduced by an italic serif section number + title pair.

Within sections the system uses **asymmetric two-column CSS grids** built with `minmax(0, …fr)` tracks (e.g. specimen `1.05fr / 1fr`, calculator `1fr / 0.92fr`) and a fluid gutter (`xl`, up to 34px). The spacing language is soft rather than a strict 8px grid — values cluster around a 4px base (`xs` 6, `sm` 8, `md` 14, `lg` 22, `xl` 34) and lean on `clamp()` for breathing room that scales with viewport. Breakpoints collapse the grids to single column at **860px** (studio & calculator), with the nutrient trio collapsing at **620px** and the finest controls (presets, number pairs) stacking at **430px**. Slider controls carry a ≥44px touch band for mobile.

## Elevation & Depth

This is a **flat, paper-first** system; depth is mostly *tonal* and *linear*, not shadow-heavy.

- **Tonal layering** is the primary depth cue — the lighter a surface, the more "inward/raised" it reads (paper → paper-2 → paper-3).
- **Hairline borders** (`outline` 1px) and **dashed dividers** (`outline-soft`) separate regions; the specimen card adds decorative L-shaped **corner brackets** evoking a mounted botanical plate.
- **Shadows are soft, long and very subtle** — panels use `0 18px 36px -28px` of a low-alpha ink shadow plus a 1px inset top highlight; the result panel sits a touch higher at `0 22px 40px -26px`. Nothing casts a hard or near shadow.
- The one genuinely "raised" element is the **inverted ink result panel**, which earns prominence through colour inversion rather than a big shadow.

## Shapes

Corner language is **crisp and restrained, with pill exceptions**:

- **Containers** (panels, result, inputs) use a barely-there **3px** (`rounded.DEFAULT`) — enough to soften, not enough to look bubbly, in keeping with a pressed-paper sheet.
- **Small data objects** (NPK chips, preset cards, delivery tiles) use an even tighter **2px** (`rounded.sm`), almost square — they read as labels/specimens.
- **Pills (`rounded.full`, 999px)** are reserved for *modal toggles and tags*: the units/theme segmented control, the "what are you feeding" type tags, the icon button, and the toast. Roundness signals "switchable option."
- **Circles (50%)** appear only at the smallest scale — slider thumbs and the legend dots — as functional affordances.

This mix keeps the body of the page architectural and label-like, while interactive *choosers* feel soft and tappable.

## Components

- **Containers** — `card` (raised paper panel) and `card-specimen` (the lighter inset "plate") share 3px corners, a 1px `outline`, and ~28px padding; they differ only in surface tone. `nutrient-card` is a `card` variant with a 4px accent bar pinned to its top edge in the relevant N/P/K hue.
- **The result panel** is the system's hero surface: `primary` (ink) background, `on-primary` text, holding the large tabular `headline-numeric` figure plus muted secondary lines. Its internal action buttons and delivery tiles float on faint white overlays rather than new colours.
- **Choosers** come in two shapes. **`preset-card`** is a 2px-cornered well (`surface-inset`) listing a feed name + ratio; its **`preset-card-selected`** state keeps the same fill but gains an `outline`/inset ring in `primary` to read as "pressed." **`pill`** (type tags, segmented toggle) is the rounded counterpart; its **`pill-active`** state inverts to `primary`/`on-primary` — the same selected-means-ink logic as the presets.
- **Inputs** — `input-number` (bag size/price) matches the inset well treatment, 3px corners, 42px tall for comfortable tapping, focus shown via a `secondary` (bloom) ring. Range sliders share the bloom focus ring and accent-tinted thumbs (N green, P pink, K gold).
- **Typography application** — Fraunces italic is reserved for headings, numerals and the N/P/K letters; everything functional (labels, buttons, body) is Hanken Grotesk. Selected/active = ink fill; interactive accent = bloom.

## Do's and Don'ts

- **Do** use `secondary` (bloom #C25D7C) as the single interactive accent — links, focus rings, hovers. **Don't** scatter the leaf/vigour accents onto interactive affordances; those belong to data (the plant, bars, chips).
- **Do** render small accent-coloured text with the `*-text` variants (`leaf-text`, `bloom-text`, `vigour-text`). **Don't** use the raw `nitrogen` / `phosphorus` / `potassium` hues for type under ~18px — they fail AA on paper.
- **Do** show selection by filling with `primary` (ink) and inverting text to `on-primary` (the preset-ring and pill-active pattern). **Don't** invent a new highlight colour for "selected."
- **Do** build hierarchy by lightening surfaces inward (paper → paper-2 → paper-3) and with hairline rules. **Don't** reach for heavy or hard-edged shadows — elevation here is tonal and whisper-soft.
- **Do** keep Fraunces *italic* for display, numerals and the N/P/K letters, and keep numeric outputs `tabular-nums`. **Don't** set body or UI labels in the serif, and don't use pure black — text is the green-black `on-surface` (#23301F), never #000000.
