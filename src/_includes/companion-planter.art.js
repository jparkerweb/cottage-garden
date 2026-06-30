/* ============================================================================
   PLANT ART LIBRARY — per-plant herbarium-style SVG emblems.
   Standalone copy for visual QA; the verified code is pasted into
   companion-planter.html (inside its IIFE) once it looks right.

   Design rules (match the existing categoryEmblem aesthetic):
   - viewBox 0 0 120 120, thin line-art, soft fills (~0.92 opacity).
   - Outlines / stems use var(--stem) so structure stays visible in BOTH
     light and dark themes.
   - Foliage uses var(--leaf|--leaf-pale|--leaf-rich) so leaves re-theme.
   - Intrinsic colours (tomato red, aubergine purple, carrot orange…) are
     fixed hexes chosen to read on both paper-3 backgrounds (#FBF8F0 / #28301F).
   ============================================================================ */
(function (root) {
  "use strict";

  function svgEl(tag, attrs) {
    var e = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (var k in attrs) { e.setAttribute(k, attrs[k]); }
    return e;
  }

  /* ---- tiny drawing DSL ---- */
  var STEM = "var(--stem)";
  var LEAF = "var(--leaf)", LEAFP = "var(--leaf-pale)", LEAFR = "var(--leaf-rich)";

  function emblemSvg() {
    return svgEl("svg", { viewBox: "0 0 120 120", "class": "emblem", role: "img", "aria-hidden": "true" });
  }
  function attrs(base, extra) {
    if (extra) { for (var k in extra) { base[k] = extra[k]; } }
    return base;
  }
  function fa(color, extra) { return attrs({ fill: color, opacity: "0.92", stroke: STEM, "stroke-width": "1" }, extra); }
  function P(d, a) { a = a || {}; a.d = d; return svgEl("path", a); }
  function fillP(d, color, extra) { return P(d, fa(color, extra)); }
  function circ(cx, cy, r, a) { a = a || {}; a.cx = cx; a.cy = cy; a.r = r; return svgEl("circle", a); }
  function fillC(cx, cy, r, color, extra) { return circ(cx, cy, r, fa(color, extra)); }
  function ell(cx, cy, rx, ry, a) { a = a || {}; a.cx = cx; a.cy = cy; a.rx = rx; a.ry = ry; return svgEl("ellipse", a); }
  function fillE(cx, cy, rx, ry, color, extra) { return ell(cx, cy, rx, ry, fa(color, extra)); }
  function stem(d, w) {
    return P(d, { stroke: STEM, "stroke-width": w || 2, fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" });
  }

  /* simple pointed leaf blade centred at (x,y), `side` ±1, rotated */
  function blade(x, y, side, scale, fill, rot) {
    var L = 20 * scale, C = 8 * scale;
    return P("M0 0 Q" + (side * L * 0.55) + " -" + C + " " + (side * L) + " 0 Q" + (side * L * 0.55) + " " + C + " 0 0 Z",
      attrs({ fill: fill, opacity: "0.88", stroke: STEM, "stroke-width": "0.8" },
        { transform: "translate(" + x + "," + y + ") rotate(" + (rot != null ? rot : (side > 0 ? -18 : 18)) + ")" }));
  }

  /* ============================================================================
     FORM BUILDERS — each adds nodes to the svg via add(node)
     opt carries colour overrides where a form is shared across plants.
     ============================================================================ */
  var FORMS = {};

  /* --- generic fallbacks (kept close to the original categoryEmblem) --- */
  FORMS.leafySprig = function (add, o) {
    var f1 = o.leaf || LEAF, f2 = o.leafAlt || LEAFP, n = o.count || 5;
    var opp = o.opposite, sc = o.leafScale || 1, fl = o.flower;   // opposite pairs vs alternate; optional floret spike
    var topY = fl ? 40 : 28;
    add(stem("M60 106 C57 80 63 56 60 " + topY, 2.2));
    var ys = [92, 81, 70, 59, 48, 38];
    for (var i = 0; i < n; i++) {
      var y = ys[i];
      if (y == null || y < topY + 4) break;
      var s = (0.6 + (n - i) * 0.045) * sc;
      if (opp) { add(blade(60, y, 1, s, f1)); add(blade(60, y, -1, s, f2)); }
      else { add(blade(60, y, (i % 2 ? -1 : 1), s, (i % 2 ? f2 : f1))); }
    }
    if (fl) { for (var k = 0; k < 4; k++) { add(fillC(60, topY - 2 - k * 5, 3.2 - k * 0.5, fl, { "stroke-width": "0.5", opacity: "0.92" })); } }
  };

  /* ===== VEGETABLES ===== */
  FORMS.tomato = function (add) {
    add(stem("M60 40 V26", 2.2));
    add(fillP("M60 26 l-9 -7 M60 26 l9 -7 M60 26 l-3 -11 M60 26 l3 -11", { fill: "none", stroke: LEAF, "stroke-width": "2", "stroke-linecap": "round" }));
    add(fillC(60, 64, 30, "#C9483B"));
    // calyx
    add(P("M60 40 l-7 8 l-9 -3 l8 7 l-5 9 l8 -6 l8 6 l-5 -9 l8 -7 l-9 3 z", fa(LEAF, { opacity: "0.95" })));
    add(P("M50 54 Q57 49 64 53", { stroke: "#fff", "stroke-width": "1.6", opacity: "0.45", fill: "none", "stroke-linecap": "round" }));
  };
  FORMS.pepper = function (add) {
    add(stem("M60 32 V44", 2.4));
    add(fillP("M52 40 q8 -4 16 0", { fill: LEAF, stroke: STEM, "stroke-width": "1", opacity: "0.95" }));
    // bell pepper: three lobes
    add(P("M48 50 C40 60 42 86 52 96 C58 100 56 88 60 92 C64 88 62 100 68 96 C78 86 80 60 72 50 C66 46 54 46 48 50 Z", fa("#D14B3C")));
    add(P("M55 58 Q60 54 65 58", { stroke: "#fff", "stroke-width": "1.4", opacity: "0.4", fill: "none", "stroke-linecap": "round" }));
  };
  FORMS.aubergine = function (add) {
    add(stem("M60 30 V42", 2.4));
    add(fillE(60, 70, 20, 30, "#5E3D72"));
    // calyx
    add(P("M60 42 l-9 6 l-10 -2 l9 7 l-4 9 l8 -6 q6 4 12 0 l8 6 l-4 -9 l9 -7 l-10 2 z", fa(LEAF, { opacity: "0.95" })));
    add(P("M50 60 Q56 54 60 60", { stroke: "#fff", "stroke-width": "1.6", opacity: "0.4", fill: "none", "stroke-linecap": "round" }));
  };
  FORMS.taproot = function (add, o) {
    var f = o.fill || "#DD7A2E";
    // ferny carrot top
    add(stem("M60 56 C58 44 62 36 60 26", 2));
    add(blade(60, 44, 1, 0.7, LEAF)); add(blade(60, 40, -1, 0.7, LEAFP));
    add(blade(60, 34, 1, 0.6, LEAF)); add(blade(60, 30, -1, 0.6, LEAFP));
    add(blade(60, 47, -1, 0.6, LEAFP)); add(blade(60, 51, 1, 0.6, LEAF));
    // tapering root
    add(P("M48 58 Q60 54 72 58 C70 78 64 100 60 110 C56 100 50 78 48 58 Z", fa(f)));
    for (var i = 0; i < 3; i++) {
      var yy = 70 + i * 11;
      add(P("M" + (52 + i) + " " + yy + " q8 3 " + (16 - 2 * i) + " 0", { stroke: STEM, "stroke-width": "0.8", fill: "none", opacity: "0.5" }));
    }
  };
  FORMS.roundRoot = function (add, o) {
    var f = o.fill || "#8C3457", shoulder = o.shoulder, tip = o.tip;
    add(stem("M60 50 V30", 1.8));
    add(blade(60, 40, 1, 0.7, LEAF)); add(blade(60, 36, -1, 0.7, LEAFP)); add(blade(60, 32, 1, 0.55, LEAF));
    // bulb/teardrop root
    add(P("M60 50 C40 52 36 76 60 100 C84 76 80 52 60 50 Z", fa(f)));
    if (shoulder) { add(P("M60 50 C46 51 41 62 44 72 C52 66 70 66 76 72 C79 62 74 51 60 50 Z", fa(shoulder, { opacity: "0.95", "stroke-width": "0.6" }))); }
    if (tip) { add(P("M60 100 q-2 8 0 12 q2 -4 0 -12", { stroke: tip, "stroke-width": "2.4", fill: "none", "stroke-linecap": "round" })); }
  };
  FORMS.allium = function (add, o) {
    var f = o.fill || "#E2BE83", lines = o.lines || "#B07D33";
    // green shoots
    add(stem("M54 44 C52 30 50 24 52 18", 2)); add(stem("M60 42 V14", 2)); add(stem("M66 44 C68 30 70 24 68 18", 2));
    // bulb
    add(P("M60 44 C40 46 38 70 60 96 C82 70 80 46 60 44 Z", fa(f)));
    add(P("M60 46 V92 M48 56 Q60 66 72 56 M46 70 Q60 82 74 70", { stroke: lines, "stroke-width": "1", fill: "none", opacity: "0.6" }));
    if (o.roots) { add(P("M52 92 l-3 10 M60 96 v10 M68 92 l3 10", { stroke: STEM, "stroke-width": "1", fill: "none", opacity: "0.5", "stroke-linecap": "round" })); }
  };
  FORMS.garlic = function (add) {
    add(stem("M56 40 C54 28 53 22 55 16", 1.8)); add(stem("M60 38 V14", 1.8)); add(stem("M64 40 C66 28 67 22 65 16", 1.8));
    add(P("M60 40 C42 44 40 74 60 98 C80 74 78 44 60 40 Z", fa("#EFE9DA")));
    add(P("M60 42 V96 M52 44 Q54 70 56 96 M68 44 Q66 70 64 96", { stroke: "#C9B98F", "stroke-width": "1", fill: "none", opacity: "0.8" }));
  };
  FORMS.leek = function (add) {
    // flat fan leaves
    add(P("M60 56 C50 40 44 28 40 18", fa("none", { stroke: LEAF, "stroke-width": "5", "stroke-linecap": "round" })));
    add(P("M60 56 V14", fa("none", { stroke: LEAFP, "stroke-width": "5", "stroke-linecap": "round" })));
    add(P("M60 56 C70 40 76 28 80 18", fa("none", { stroke: LEAF, "stroke-width": "5", "stroke-linecap": "round" })));
    // white shaft
    add(P("M52 56 H68 V104 Q60 110 52 104 Z", fa("#ECE3CC")));
    add(P("M52 96 Q60 100 68 96", { stroke: STEM, "stroke-width": "0.8", fill: "none", opacity: "0.5" }));
    add(P("M54 100 l-3 8 M60 104 v8 M66 100 l3 8", { stroke: STEM, "stroke-width": "1", fill: "none", opacity: "0.5", "stroke-linecap": "round" }));
  };
  FORMS.cabbage = function (add, o) {
    var f = o.fill || LEAFP, core = o.core || LEAF;
    add(fillC(60, 66, 32, f));
    add(P("M60 36 C44 44 40 72 60 96 C80 72 76 44 60 36 Z", fa(core, { opacity: "0.85", "stroke-width": "0.8" })));
    add(P("M60 40 C50 50 48 74 60 92 M60 40 C70 50 72 74 60 92 M34 64 Q60 74 86 64 M40 82 Q60 90 80 82", { stroke: STEM, "stroke-width": "0.9", fill: "none", opacity: "0.5" }));
  };
  FORMS.floret = function (add, o) {
    var f = o.fill || "#3F6F3B", bumpy = o.bumpy !== false;
    add(stem("M60 100 V70", 3));
    add(stem("M60 86 l-9 6 M60 80 l9 5", 2));
    if (bumpy) {
      add(fillC(60, 54, 22, f));
      var dots = [[48, 48], [60, 42], [72, 48], [52, 58], [68, 58], [60, 60], [44, 56], [76, 56]];
      for (var i = 0; i < dots.length; i++) { add(fillC(dots[i][0], dots[i][1], 7, f, { opacity: "0.95", "stroke-width": "0.8" })); }
    } else {
      add(fillC(60, 54, 22, f));
      add(P("M44 52 Q60 40 76 52 M48 60 Q60 52 72 60", { stroke: STEM, "stroke-width": "0.8", fill: "none", opacity: "0.4" }));
    }
  };
  FORMS.kale = function (add) {
    add(stem("M60 104 V72", 2.4));
    var pts = [[48, 60, -1], [72, 60, 1], [44, 44, -1], [76, 44, 1], [60, 34, 0]];
    for (var i = 0; i < pts.length; i++) {
      var x = pts[i][0], y = pts[i][1];
      add(P("M60 72 C" + (x) + " " + (y + 14) + " " + (x) + " " + y + " " + x + " " + (y - 8) +
        " q-4 5 -8 2 q4 4 0 8 q-5 -2 -2 4 q4 -3 6 1 q2 -5 6 -2 q-3 -5 2 -7 z",
        fa(i % 2 ? LEAFP : LEAF, { opacity: "0.9", "stroke-width": "0.8" })));
    }
  };
  FORMS.leafRosette = function (add, o) {
    var f = o.fill || LEAFP, f2 = o.fillAlt || LEAF;
    add(fillE(60, 78, 16, 22, f2, { opacity: "0.95" }));
    var leaves = [[40, 70, -40], [80, 70, 40], [46, 54, -20], [74, 54, 20], [60, 46, 0]];
    for (var i = 0; i < leaves.length; i++) {
      add(fillE(leaves[i][0], leaves[i][1], 11, 22, (i % 2 ? f : f2), { opacity: "0.9", transform: "rotate(" + leaves[i][2] + " " + leaves[i][0] + " " + leaves[i][1] + ")" }));
    }
    add(P("M60 96 V60 M50 80 Q56 70 60 64 M70 80 Q64 70 60 64", { stroke: STEM, "stroke-width": "0.8", fill: "none", opacity: "0.45" }));
  };
  FORMS.chard = function (add, o) {
    var rib = o.rib || "#C9483B";
    var leaves = [[46, 56, -26], [74, 56, 26], [60, 42, 0]];
    for (var i = 0; i < leaves.length; i++) {
      var x = leaves[i][0], y = leaves[i][1];
      add(fillE(x, y, 13, 26, LEAFR, { opacity: "0.9", transform: "rotate(" + leaves[i][2] + " " + x + " " + y + ")" }));
    }
    // coloured stems converging
    add(P("M58 104 L48 58 M60 104 L60 42 M62 104 L72 58", { stroke: rib, "stroke-width": "3.4", fill: "none", "stroke-linecap": "round" }));
  };
  FORMS.brussels = function (add) {
    add(stem("M60 110 V20", 3.2));
    add(blade(60, 20, 1, 0.7, LEAF)); add(blade(60, 20, -1, 0.7, LEAFP)); add(blade(60, 24, 0, 0.6, LEAF, 0));
    for (var i = 0; i < 5; i++) {
      var y = 36 + i * 13, s = (i % 2 ? -1 : 1);
      add(fillC(60 + s * 11, y, 6.5, (i % 2 ? LEAFP : LEAF)));
      add(stem("M60 " + y + " h" + (s * 8), 1.4));
    }
  };
  FORMS.peapod = function (add, o) {
    var f = o.fill || "#84AE4F";
    add(stem("M40 96 C50 80 50 60 56 44", 2));
    add(P("M70 30 q8 -6 6 -14 q-8 2 -6 14", { stroke: STEM, "stroke-width": "1.4", fill: "none" })); // tendril
    add(blade(48, 70, -1, 0.6, LEAF)); add(blade(52, 56, 1, 0.6, LEAFP));
    add(P("M56 44 C72 40 86 56 84 86 C78 92 70 92 66 86 C64 64 60 50 56 44 Z", fa(f)));
    add(fillC(73, 60, 5.5, LEAFP, { "stroke-width": "0.7" })); add(fillC(76, 72, 5.5, LEAFP, { "stroke-width": "0.7" })); add(fillC(76, 84, 5, LEAFP, { "stroke-width": "0.7" }));
  };
  FORMS.bean = function (add, o) {
    var flower = o.flower;
    add(stem("M48 108 C44 80 52 60 56 26", 2.2)); // climbing stem
    add(blade(50, 88, -1, 0.8, LEAF)); add(blade(58, 70, 1, 0.85, LEAFP)); add(blade(52, 52, -1, 0.8, LEAF));
    if (flower) {
      add(P("M58 40 q10 -8 16 -2 q-2 8 -10 8 q4 4 0 8 q-8 -2 -6 -10 z", fa(flower, { opacity: "0.95", "stroke-width": "0.7" })));
      add(P("M60 56 q8 -4 14 0", { stroke: STEM, "stroke-width": "1", fill: "none" }));
    }
    // hanging pods
    add(P("M70 44 C82 50 84 70 76 86 C72 80 72 60 70 44 Z", fa(o.pod || "#6f9165", { opacity: "0.9" })));
    add(P("M60 50 C70 58 70 78 64 92 C60 84 60 64 60 50 Z", fa(o.pod || "#6f9165", { opacity: "0.9" })));
  };
  FORMS.cucurbitFruit = function (add, o) {
    var f = o.fill || "#4F7D33", shape = o.shape || "long";
    // leaf + tendril
    add(stem("M34 40 q-6 -6 -2 -14", 1.4));
    add(P("M44 44 C30 40 26 26 34 18 C46 22 50 36 44 44 Z", fa(LEAFP, { opacity: "0.9" })));
    if (shape === "long") {
      add(stem("M52 50 q4 -4 8 -4", 1.6));
      add(P("M48 56 C44 50 56 46 70 52 C86 60 84 92 70 100 C52 104 46 78 48 56 Z", fa(f)));
      add(P("M56 60 Q62 64 60 92 M68 58 Q72 70 70 94", { stroke: "#fff", "stroke-width": "1.2", opacity: "0.3", fill: "none" }));
      if (o.netting) { add(P("M50 64 Q66 60 82 70 M48 76 Q66 74 84 82 M50 88 Q66 88 80 92", { stroke: STEM, "stroke-width": "0.7", fill: "none", opacity: "0.45" })); }
    } else { // round squash / pumpkin / melon
      add(stem("M60 44 q2 -6 6 -8", 1.8));
      add(fillE(60, 74, 30, 26, f));
      if (o.ribs) { add(P("M60 50 V100 M44 54 Q40 74 46 96 M76 54 Q80 74 74 96", { stroke: STEM, "stroke-width": "1", fill: "none", opacity: "0.4" })); }
      if (o.netting) { add(P("M32 70 H88 M36 60 H84 M36 86 H84 M50 50 V98 M70 50 V98", { stroke: STEM, "stroke-width": "0.6", fill: "none", opacity: "0.4" })); }
      if (o.stripes) { add(P("M48 50 Q40 74 50 98 M60 48 V100 M72 50 Q80 74 70 98 M38 58 Q34 74 40 92 M82 58 Q86 74 80 92", { stroke: "#2E4A2A", "stroke-width": "2", fill: "none", opacity: "0.55" })); }
    }
  };
  FORMS.corn = function (add) {
    // husk leaves
    add(P("M60 100 C40 90 36 50 44 24 C56 36 60 64 60 100 Z", fa(LEAF, { opacity: "0.9" })));
    add(P("M60 100 C80 90 84 50 76 24 C64 36 60 64 60 100 Z", fa(LEAFP, { opacity: "0.9" })));
    // tassel
    add(P("M60 26 l-6 -12 M60 24 l0 -14 M60 26 l6 -12", { stroke: "#D9B24A", "stroke-width": "1.6", fill: "none", "stroke-linecap": "round" }));
    // cob
    add(P("M52 40 q8 -8 16 0 V90 q-8 8 -16 0 Z", fa("#E6C04C")));
    for (var r = 0; r < 5; r++) { for (var c = 0; c < 3; c++) { add(fillC(54 + c * 6, 48 + r * 9, 2.4, "#E6C04C", { stroke: "#B89230", "stroke-width": "0.5", opacity: "1" })); } }
  };
  FORMS.celery = function (add) {
    for (var i = 0; i < 5; i++) {
      var x = 44 + i * 8, s = (i - 2);
      add(P("M" + (60 + s * 1.5) + " 104 C" + (x) + " 80 " + (x - s * 2) + " 50 " + (x) + " 30", fa("none", { stroke: "#A6BE6F", "stroke-width": "4.5", "stroke-linecap": "round", opacity: "0.95" })));
      add(blade(x, 30, (s >= 0 ? 1 : -1), 0.4, LEAF));
    }
    add(P("M50 100 Q60 106 70 100", { stroke: STEM, "stroke-width": "1", fill: "none", opacity: "0.5" }));
  };
  FORMS.asparagus = function (add) {
    var xs = [50, 60, 70, 55, 65];
    for (var i = 0; i < xs.length; i++) {
      var x = xs[i], top = 24 + (i % 2) * 8;
      add(P("M" + x + " 104 V" + top, fa("none", { stroke: i % 2 ? LEAFP : LEAFR, "stroke-width": "5", "stroke-linecap": "round", opacity: "0.95" })));
      // scaly tip
      add(P("M" + (x - 4) + " " + (top + 8) + " l4 -8 l4 8 M" + (x - 3) + " " + (top + 14) + " l3 -6 l3 6", { stroke: STEM, "stroke-width": "1", fill: "none", opacity: "0.7" }));
    }
  };
  FORMS.potato = function (add, o) {
    var f = (o && o.fill) || "#C7A878";
    // small leafy shoot
    add(stem("M60 60 C58 48 62 40 60 30", 1.8));
    add(blade(60, 48, 1, 0.55, LEAF)); add(blade(60, 44, -1, 0.55, LEAFP)); add(blade(60, 38, 1, 0.45, LEAF));
    // tubers
    add(fillE(50, 78, 17, 13, f));
    add(fillE(74, 84, 15, 12, f));
    add(fillE(60, 96, 18, 12, f));
    var eyes = [[46, 74], [55, 82], [70, 80], [78, 88], [56, 96], [66, 98]];
    for (var i = 0; i < eyes.length; i++) { add(circ(eyes[i][0], eyes[i][1], 1.3, { fill: STEM, opacity: "0.45" })); }
  };

  /* ===== HERBS ===== */
  FORMS.needleSprig = function (add, o) {
    o = o || {};
    var c1 = o.leaf || LEAF, c2 = o.leafAlt || LEAFP, top = o.flower ? 32 : 24;
    add(stem("M60 106 C58 78 62 50 60 " + top, 2));
    for (var i = 0; i < 9; i++) {
      var y = 96 - i * 8, s = (i % 2 ? 1 : -1);
      if (y < top + 4) break;
      add(P("M60 " + y + " l" + (s * 12) + " -4 M60 " + (y) + " l" + (-s * 12) + " -4", { stroke: i % 2 ? c1 : c2, "stroke-width": "1.6", fill: "none", "stroke-linecap": "round" }));
    }
    if (o.flower) { for (var k = 0; k < 3; k++) { for (var j = -1; j <= 1; j++) { add(fillC(60 + j * 5, 30 - k * 6, 2.2, o.flower, { "stroke-width": "0.4", opacity: "0.95" })); } } }
  };
  FORMS.umbelHerb = function (add, o) {
    var f = o.fill || "#ECE3CC", ferny = o.ferny;
    add(stem("M60 106 V52", 2));
    add(stem("M60 52 l-16 -12 M60 52 l-8 -16 M60 52 l8 -16 M60 52 l16 -12 M60 52 V32", 1.2));
    var tips = [[44, 40], [52, 36], [60, 32], [68, 36], [76, 40]];
    for (var i = 0; i < tips.length; i++) {
      for (var d = 0; d < 4; d++) { var a = d / 4 * 6.28; add(circ(tips[i][0] + Math.cos(a) * 4, tips[i][1] + Math.sin(a) * 4, 1.6, { fill: f, stroke: STEM, "stroke-width": "0.4", opacity: "0.95" })); }
    }
    if (ferny) { add(blade(54, 80, -1, 0.55, LEAF)); add(blade(66, 70, 1, 0.55, LEAFP)); add(blade(56, 92, -1, 0.5, LEAF)); }
    else { add(blade(52, 82, -1, 0.6, LEAF)); add(blade(68, 74, 1, 0.6, LEAFP)); }
  };
  FORMS.lavender = function (add, o) {
    var col = (o && o.color) || "#8A6FB0";
    var xs = [48, 60, 72];
    for (var s = 0; s < xs.length; s++) {
      var x = xs[s], baseY = 104, topY = 36 + (s === 1 ? -6 : 4);
      add(stem("M" + x + " " + baseY + " V" + topY, 1.8));
      for (var i = 0; i < 6; i++) {
        var y = topY + i * 6;
        add(fillE(x, y, 4.5, 6, col, { "stroke-width": "0.5", opacity: "0.92" }));
      }
    }
  };
  FORMS.chives = function (add) {
    var xs = [50, 56, 60, 66, 72];
    for (var i = 0; i < xs.length; i++) { add(stem("M" + xs[i] + " 106 C" + (xs[i] + (i - 2) * 3) + " 70 " + (xs[i] + (i - 2) * 4) + " 50 " + (xs[i] + (i - 2) * 3) + " 38", 2)); }
    // pom-pom flower
    add(fillC(56, 34, 9, "#A56FB0"));
    for (var d = 0; d < 8; d++) { var a = d / 8 * 6.28; add(circ(56 + Math.cos(a) * 8, 34 + Math.sin(a) * 8, 2, { fill: "#B98AC4", opacity: "0.95" })); }
  };
  FORMS.borage = function (add) {
    add(stem("M60 106 C58 80 62 58 60 44", 2));
    add(blade(50, 84, -1, 0.7, LEAF)); add(blade(70, 70, 1, 0.7, LEAFP));
    // blue 5-point star flowers
    function star(cx, cy, r, col) {
      var pts = [];
      for (var i = 0; i < 5; i++) { var a = -1.57 + i / 5 * 6.28; pts.push((cx + Math.cos(a) * r) + " " + (cy + Math.sin(a) * r)); }
      add(P("M" + pts[0] + " Q" + cx + " " + cy + " " + pts[1] + " Q" + cx + " " + cy + " " + pts[2] + " Q" + cx + " " + cy + " " + pts[3] + " Q" + cx + " " + cy + " " + pts[4] + " Q" + cx + " " + cy + " " + pts[0] + " Z", fa(col, { opacity: "0.95", "stroke-width": "0.6" })));
      add(circ(cx, cy, 2, { fill: "#2C2030" }));
    }
    star(52, 40, 11, "#5A7FC0"); star(72, 34, 9, "#6E8FCC");
  };
  FORMS.chamomile = function (add) {
    add(stem("M60 106 V60", 1.8));
    add(stem("M60 84 l-12 -6 M60 76 l12 -6 M60 68 l-10 -8", 1));
    add(blade(48, 78, -1, 0.4, LEAF)); add(blade(72, 70, 1, 0.4, LEAFP));
    function daisy(cx, cy, r) {
      for (var i = 0; i < 10; i++) { var a = i / 10 * 6.28; add(ell(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 2.4, 5, attrs({ fill: "#FBF7EC", stroke: STEM, "stroke-width": "0.5", opacity: "0.97" }, { transform: "rotate(" + (a * 57.3 + 90) + " " + (cx + Math.cos(a) * r) + " " + (cy + Math.sin(a) * r) + ")" }))); }
      add(fillC(cx, cy, 4, "#E6C04C", { "stroke-width": "0.5" }));
    }
    daisy(54, 44, 8); daisy(74, 52, 7);
  };

  /* ===== FLOWERS ===== */
  FORMS.marigold = function (add, o) {
    var f = o.fill || "#E08A1E", f2 = o.fillAlt || "#D2691E";
    add(stem("M60 106 V60", 2));
    add(blade(50, 86, -1, 0.6, LEAF)); add(blade(70, 74, 1, 0.6, LEAFP));
    for (var ring = 0; ring < 2; ring++) {
      var r = ring ? 11 : 19, n = ring ? 8 : 12, col = ring ? f2 : f;
      for (var i = 0; i < n; i++) { var a = i / n * 6.28 + ring * 0.3; add(ell(60 + Math.cos(a) * r, 50 + Math.sin(a) * r, 5, 8, attrs({ fill: col, stroke: STEM, "stroke-width": "0.5", opacity: "0.92" }, { transform: "rotate(" + (a * 57.3 + 90) + " " + (60 + Math.cos(a) * r) + " " + (50 + Math.sin(a) * r) + ")" }))); }
    }
    add(fillC(60, 50, 6, "#B5560F", { "stroke-width": "0.5" }));
  };
  FORMS.nasturtium = function (add) {
    add(stem("M40 100 C50 80 44 64 50 50", 1.6));
    // round lily-pad leaf
    add(fillC(44, 56, 15, LEAFP, { opacity: "0.9" }));
    add(P("M44 56 l-8 4 M44 56 l8 6 M44 56 l-2 9 M44 56 l-9 -3 M44 56 l6 -8", { stroke: STEM, "stroke-width": "0.7", fill: "none", opacity: "0.5" }));
    // trumpet flower
    add(stem("M70 96 C74 80 70 64 72 52", 1.6));
    add(P("M72 52 C58 44 56 28 70 24 C84 26 90 40 84 50 C80 56 76 54 72 52 Z", fa("#E2761F", { opacity: "0.95" })));
    add(P("M72 50 l-3 8 M76 48 l1 9 M80 48 l4 7", { stroke: "#B5560F", "stroke-width": "1", fill: "none", opacity: "0.7" }));
  };
  FORMS.sunflower = function (add) {
    add(stem("M60 108 V72", 2.6));
    add(blade(50, 92, -1, 0.7, LEAF)); add(blade(70, 84, 1, 0.7, LEAFP));
    for (var i = 0; i < 14; i++) { var a = i / 14 * 6.28; add(ell(60 + Math.cos(a) * 26, 48 + Math.sin(a) * 26, 6, 13, attrs({ fill: "#ECC04A", stroke: "#C99A26", "stroke-width": "0.5", opacity: "0.95" }, { transform: "rotate(" + (a * 57.3 + 90) + " " + (60 + Math.cos(a) * 26) + " " + (48 + Math.sin(a) * 26) + ")" }))); }
    add(fillC(60, 48, 16, "#6E4B2A"));
    add(circ(60, 48, 16, { fill: "none", stroke: "#4A3119", "stroke-width": "0.5", opacity: "0.6" }));
  };
  FORMS.daisy = function (add, o) {
    var petal = o.petal || "#E59AB4", center = o.center || "#E6C04C", n = o.n || 12, pr = o.pr || 22, prx = o.prx || 5, pry = o.pry || 12, cr = o.cr || 7, reflex = o.reflex;
    add(stem("M60 106 V" + (48 + pr - 4), 2));
    add(blade(50, 88, -1, 0.6, LEAF)); add(blade(70, 80, 1, 0.6, LEAFP));
    var cy = 48;
    for (var i = 0; i < n; i++) {
      var a = i / n * 6.28;
      var px = 60 + Math.cos(a) * pr, py = cy + Math.sin(a) * pr;
      add(ell(px, py, prx, pry, attrs({ fill: petal, stroke: STEM, "stroke-width": "0.5", opacity: "0.92" }, { transform: "rotate(" + (a * 57.3 + 90 + (reflex ? 0 : 0)) + " " + px + " " + py + ")" })));
    }
    if (reflex) { add(P("M44 44 Q60 30 76 44", { stroke: STEM, "stroke-width": "0.6", fill: "none", opacity: "0.4" })); add(fillC(60, cy, cr, center, { "stroke-width": "0.6" })); add(ell(60, cy - 2, cr - 2, cr + 4, fa("#8A5A2A", { opacity: "0.95", "stroke-width": "0.5" }))); }
    else { add(fillC(60, cy, cr, center, { "stroke-width": "0.6" })); }
  };
  FORMS.spike = function (add, o) {
    var f = o.fill || "#C77CA6", style = o.style || "bell", n = o.n || 6;
    add(stem("M60 108 V" + (30), 2.4));
    add(blade(52, 92, -1, 0.6, LEAF)); add(blade(68, 84, 1, 0.6, LEAFP));
    for (var i = 0; i < n; i++) {
      var y = 38 + i * 10, s = (i % 2 ? 1 : -1), x = 60 + s * 12;
      if (style === "bell") { add(P("M" + x + " " + y + " q" + (s * 10) + " 2 " + (s * 11) + " 10 q-" + (s * 5) + " 4 -" + (s * 11) + " 0 z", fa(f, { opacity: "0.93", "stroke-width": "0.6" }))); add(stem("M60 " + (y + 2) + " H" + x, 1)); }
      else if (style === "round") { add(fillC(x, y, 7 - i * 0.3, f, { opacity: "0.93", "stroke-width": "0.6" })); add(stem("M60 " + y + " H" + x, 1)); }
      else { add(ell(x, y, 7, 5, fa(f, { opacity: "0.93", "stroke-width": "0.6" }))); add(stem("M60 " + y + " H" + x, 1)); }
    }
    // crown bud
    add(fillE(60, 32, 5, 8, f, { opacity: "0.9", "stroke-width": "0.6" }));
  };
  FORMS.lupinSpike = function (add) {
    add(stem("M60 108 V40", 2.4));
    add(blade(50, 92, -1, 0.6, LEAF)); add(blade(70, 84, 1, 0.6, LEAFP));
    for (var i = 0; i < 8; i++) {
      var y = 44 + i * 7, s = (i % 2 ? 1 : -1);
      add(P("M60 " + y + " q" + (s * 9) + " -3 " + (s * 10) + " 3 q-" + (s * 5) + " 4 -" + (s * 10) + " 0 z", fa(i % 3 ? "#7E86C6" : "#9A8FD0", { opacity: "0.93", "stroke-width": "0.5" })));
    }
    add(fillE(60, 40, 5, 7, "#9A8FD0", { opacity: "0.9", "stroke-width": "0.5" }));
  };
  FORMS.beebalm = function (add) {
    add(stem("M60 106 V52", 2.2));
    add(blade(50, 88, -1, 0.6, LEAF)); add(blade(70, 80, 1, 0.6, LEAFP));
    // shaggy tubular petals radiating
    for (var i = 0; i < 14; i++) { var a = i / 14 * 6.28; add(P("M60 46 L" + (60 + Math.cos(a) * 22) + " " + (46 + Math.sin(a) * 22), { stroke: "#C24D5C", "stroke-width": "2.6", "stroke-linecap": "round", fill: "none", opacity: "0.92" })); }
    add(fillC(60, 46, 8, "#A53A49"));
  };
  FORMS.poppy = function (add) {
    add(stem("M60 108 C58 84 62 64 60 50", 2));
    add(blade(52, 90, -1, 0.5, LEAF)); add(blade(68, 80, 1, 0.5, LEAFP));
    // four overlapping cup petals
    add(P("M60 50 C40 44 36 24 56 22 C66 22 64 38 60 50 Z", fa("#C9483B", { opacity: "0.9" })));
    add(P("M60 50 C80 44 84 24 64 22 C54 22 56 38 60 50 Z", fa("#D14B3C", { opacity: "0.9" })));
    add(P("M60 50 C46 56 30 50 38 34 C44 26 56 36 60 50 Z", fa("#C24036", { opacity: "0.92" })));
    add(P("M60 50 C74 56 90 50 82 34 C76 26 64 36 60 50 Z", fa("#C24036", { opacity: "0.92" })));
    add(fillC(60, 40, 6, "#3A2522"));
    for (var i = 0; i < 8; i++) { var a = i / 8 * 6.28; add(P("M60 40 l" + Math.cos(a) * 7 + " " + Math.sin(a) * 7, { stroke: "#2C1B19", "stroke-width": "1", "stroke-linecap": "round" })); }
  };
  FORMS.cornflower = function (add) {
    add(stem("M60 108 V52", 1.8));
    add(blade(52, 92, -1, 0.45, LEAFP)); add(blade(68, 82, 1, 0.45, LEAFP));
    for (var i = 0; i < 11; i++) {
      var a = i / 11 * 6.28, x = 60 + Math.cos(a) * 18, y = 46 + Math.sin(a) * 18;
      add(P("M60 46 L" + x + " " + y + " l" + Math.cos(a - 0.3) * 6 + " " + Math.sin(a - 0.3) * 6 + " M" + x + " " + y + " l" + Math.cos(a + 0.3) * 6 + " " + Math.sin(a + 0.3) * 6,
        { stroke: "#4F6FB0", "stroke-width": "2.2", "stroke-linecap": "round", fill: "none", opacity: "0.9" }));
    }
    add(fillC(60, 46, 7, "#3A4F86", { "stroke-width": "0.5" }));
  };
  FORMS.dahlia = function (add, o) {
    o = o || {};
    var pf = o.fill || "#C25D7C", ps = o.stroke || "#A6395A", ctr = o.center || "#8E2C49", big = o.big ? 1.25 : 1;
    add(stem("M60 106 V58", 2));
    add(blade(50, 90, -1, 0.6, LEAF)); add(blade(70, 82, 1, 0.6, LEAFP));
    for (var ring = 0; ring < 3; ring++) {
      var r = (20 - ring * 6) * big, n = 12 - ring * 2;
      for (var i = 0; i < n; i++) { var a = i / n * 6.28 + ring * 0.25; add(ell(60 + Math.cos(a) * r, 48 + Math.sin(a) * r, 4 * big, (9 - ring * 1.5) * big, attrs({ fill: pf, stroke: ps, "stroke-width": "0.4", opacity: "0.9" }, { transform: "rotate(" + (a * 57.3 + 90) + " " + (60 + Math.cos(a) * r) + " " + (48 + Math.sin(a) * r) + ")" }))); }
    }
    add(fillC(60, 48, 5, ctr));
  };
  FORMS.cluster = function (add, o) {
    var f = o.fill || "#7E86C6", curl = o.curl;
    add(stem("M60 106 V60", 1.8));
    add(blade(52, 90, -1, 0.45, LEAF)); add(blade(68, 82, 1, 0.45, LEAFP));
    if (curl) {
      // phacelia scorpioid coil
      add(P("M40 50 q10 -14 24 -10 q12 4 8 16 q-3 8 -12 6", { stroke: STEM, "stroke-width": "1.4", fill: "none" }));
      var cc = [[40, 50], [48, 42], [58, 40], [66, 46], [64, 56], [54, 58]];
      for (var i = 0; i < cc.length; i++) { add(fillC(cc[i][0], cc[i][1], 3.4, f, { "stroke-width": "0.5", opacity: "0.93" })); }
    } else {
      var pts = [[48, 44], [60, 38], [72, 44], [54, 52], [66, 52], [60, 46], [44, 52], [76, 52]];
      for (var j = 0; j < pts.length; j++) { for (var d = 0; d < 4; d++) { var a = d / 4 * 6.28; add(circ(pts[j][0] + Math.cos(a) * 2.6, pts[j][1] + Math.sin(a) * 2.6, 1.4, { fill: f, stroke: STEM, "stroke-width": "0.3", opacity: "0.92" })); } }
    }
  };
  FORMS.trumpet = function (add, o) {
    var f = o.fill || "#B5588A";
    add(stem("M60 106 V64", 2));
    add(blade(50, 90, -1, 0.6, LEAF)); add(blade(70, 82, 1, 0.6, LEAFP));
    function tr(cx, cy, r, rot) {
      add(P("M" + cx + " " + cy + " m0 6 C" + (cx - r) + " " + (cy + 4) + " " + (cx - r) + " " + (cy - r) + " " + cx + " " + (cy - r) + " C" + (cx + r) + " " + (cy - r) + " " + (cx + r) + " " + (cy + 4) + " " + cx + " " + (cy + 6) + " Z",
        attrs(fa(f, { opacity: "0.92", "stroke-width": "0.6" }), { transform: "rotate(" + rot + " " + cx + " " + cy + ")" })));
      add(circ(cx, cy, 2, { fill: "#fff", opacity: "0.5" }));
    }
    tr(50, 50, 12, -20); tr(72, 46, 12, 20); tr(60, 38, 12, 0);
  };
  FORMS.cleome = function (add) {
    add(stem("M60 108 V46", 2));
    add(blade(50, 92, -1, 0.55, LEAF)); add(blade(70, 84, 1, 0.55, LEAFP));
    // airy petals + long stamens
    for (var i = 0; i < 8; i++) { var a = -1.57 + (i - 3.5) * 0.4; add(ell(60 + Math.cos(a) * 14, 44 + Math.sin(a) * 14, 4, 8, attrs({ fill: "#C98FB4", stroke: STEM, "stroke-width": "0.4", opacity: "0.9" }, { transform: "rotate(" + (a * 57.3 + 90) + " " + (60 + Math.cos(a) * 14) + " " + (44 + Math.sin(a) * 14) + ")" }))); }
    for (var j = 0; j < 6; j++) { var a2 = -1.57 + (j - 2.5) * 0.32; add(P("M60 44 L" + (60 + Math.cos(a2) * 26) + " " + (44 + Math.sin(a2) * 26), { stroke: "#A56F93", "stroke-width": "0.8", fill: "none" })); add(circ(60 + Math.cos(a2) * 26, 44 + Math.sin(a2) * 26, 1.6, { fill: "#C98FB4" })); }
  };
  FORMS.sweetpea = function (add) {
    add(stem("M44 108 C42 84 50 64 54 40", 2));
    add(P("M66 34 q8 -8 4 -16 q-8 4 -4 16", { stroke: STEM, "stroke-width": "1.2", fill: "none" }));
    add(blade(50, 88, -1, 0.6, LEAFP)); add(blade(58, 66, 1, 0.6, LEAF));
    function pea(cx, cy, col) {
      add(P("M" + cx + " " + cy + " q-12 -10 -2 -16 q10 -4 12 6 q-2 6 -10 10 z", fa(col, { opacity: "0.93", "stroke-width": "0.6" })));
      add(P("M" + cx + " " + cy + " q8 -6 6 -14", { stroke: STEM, "stroke-width": "0.6", fill: "none", opacity: "0.5" }));
    }
    pea(58, 44, "#C97CA6"); pea(70, 34, "#D98199"); pea(62, 28, "#B86A95");
  };

  /* ===== FRUIT ===== */
  FORMS.strawberry = function (add) {
    add(stem("M60 36 V24", 1.6));
    add(blade(60, 30, 1, 0.5, LEAF)); add(blade(60, 30, -1, 0.5, LEAFP));
    // white blossom
    for (var i = 0; i < 5; i++) { var a = i / 5 * 6.28; add(fillC(40 + Math.cos(a) * 7, 40 + Math.sin(a) * 7, 4, "#FBF7EC", { "stroke-width": "0.5" })); }
    add(fillC(40, 40, 3, "#E6C04C", { "stroke-width": "0.4" }));
    // berry (heart)
    add(P("M60 44 C44 44 42 52 48 66 C53 78 60 88 60 100 C60 88 67 78 72 66 C78 52 76 44 60 44 Z", fa("#C9483B")));
    // calyx
    add(P("M60 44 l-8 -2 l-6 -8 l3 9 l-9 1 l9 3 z M60 44 l8 -2 l6 -8 l-3 9 l9 1 l-9 3 z", fa(LEAF, { opacity: "0.95", "stroke-width": "0.6" })));
    var seeds = [[54, 56], [64, 56], [50, 66], [60, 68], [70, 66], [55, 78], [65, 78], [60, 88]];
    for (var s = 0; s < seeds.length; s++) { add(ell(seeds[s][0], seeds[s][1], 1, 2, { fill: "#F0DFA0", stroke: "#9A7A2E", "stroke-width": "0.3" })); }
  };
  FORMS.aggregate = function (add, o) {
    var f = o.fill || "#C24A57";
    add(stem("M60 30 V20", 1.6));
    add(blade(60, 26, 1, 0.45, LEAF)); add(blade(60, 26, -1, 0.45, LEAFP));
    // cluster of drupelets in a thimble
    var rows = [[54, 44, 54, 66, 78], [50, 60], [54, 54, 66], [58, 70]]; // not used; build grid
    var cells = [[54, 44], [66, 44], [48, 54], [60, 54], [72, 54], [52, 66], [60, 66], [68, 66], [60, 78]];
    for (var i = 0; i < cells.length; i++) { add(fillC(cells[i][0], cells[i][1], 6.5, f, { "stroke-width": "0.6", opacity: "0.95" })); add(circ(cells[i][0] - 1.5, cells[i][1] - 1.5, 1.5, { fill: "#fff", opacity: "0.3" })); }
  };
  FORMS.berryCluster = function (add, o) {
    var f = o.fill || "#5A6E9A", bloom = o.bloom;
    add(stem("M60 24 C58 36 50 40 46 50 M60 24 C62 38 70 42 74 52 M60 24 V40", 1.6));
    add(P("M70 28 C82 24 88 32 84 42 C76 44 70 38 70 28 Z", fa(LEAFP, { opacity: "0.9" }))); // leaf
    var berries = [[44, 58], [56, 56], [68, 58], [50, 70], [62, 70], [74, 68], [56, 82], [68, 82], [62, 92]];
    for (var i = 0; i < berries.length; i++) { add(fillC(berries[i][0], berries[i][1], 7, f, { "stroke-width": "0.7" })); add(circ(berries[i][0] - 2, berries[i][1] - 2, 1.6, { fill: "#fff", opacity: bloom ? 0.35 : 0.25 })); if (bloom) { add(circ(berries[i][0], berries[i][1], 7, { fill: "#fff", opacity: "0.08" })); } }
  };
  FORMS.gooseberry = function (add) {
    add(stem("M60 26 V18", 1.6));
    add(blade(60, 24, 1, 0.5, LEAF)); add(blade(60, 24, -1, 0.5, LEAFP));
    var pos = [[48, 50], [72, 48], [60, 70], [42, 70], [78, 70]];
    for (var i = 0; i < pos.length; i++) {
      add(fillE(pos[i][0], pos[i][1], 11, 13, "#A9BE73", { opacity: "0.9" }));
      add(P("M" + pos[i][0] + " " + (pos[i][1] - 11) + " V" + (pos[i][1] + 11), { stroke: STEM, "stroke-width": "0.7", opacity: "0.5", fill: "none" }));
      add(P("M" + (pos[i][0] - 5) + " " + (pos[i][1] - 6) + " Q" + pos[i][0] + " " + (pos[i][1] + 11) + " " + (pos[i][0] + 5) + " " + (pos[i][1] - 6), { stroke: STEM, "stroke-width": "0.6", opacity: "0.4", fill: "none" }));
    }
  };
  FORMS.treeFruit = function (add, o) {
    var f = o.fill || "#C9483B", shape = o.shape || "round";
    add(stem("M60 34 C62 26 66 22 70 20", 2));
    add(P("M70 20 C82 16 88 24 82 34 C72 36 68 28 70 20 Z", fa(LEAFP, { opacity: "0.9" })));
    if (shape === "round") { add(fillC(60, 66, 30, f)); add(P("M60 38 q-3 5 0 8", { stroke: STEM, "stroke-width": "1.4", fill: "none" })); if (o.cleft) { add(P("M60 38 Q53 56 60 95", { stroke: STEM, "stroke-width": "1", fill: "none", opacity: "0.4" })); } }
    else if (shape === "pear") { add(P("M60 38 C50 40 50 52 54 60 C44 66 40 86 60 100 C80 86 76 66 66 60 C70 52 70 40 60 38 Z", fa(f))); }
    else if (shape === "oval") { add(fillE(60, 66, 22, 30, f)); add(P("M60 40 V96", { stroke: STEM, "stroke-width": "0.8", opacity: "0.35", fill: "none" })); if (o.bloom) { add(ell(60, 66, 22, 30, { fill: "#fff", opacity: "0.07" })); } }
    add(P("M50 56 Q58 50 66 54", { stroke: "#fff", "stroke-width": "1.6", opacity: "0.35", fill: "none", "stroke-linecap": "round" }));
  };
  FORMS.cherry = function (add) {
    add(stem("M52 88 C56 60 60 44 58 30 M68 90 C66 62 64 46 64 30", 1.8));
    add(P("M58 30 q4 -8 10 -8 q-2 8 -10 8 Z", fa(LEAF, { opacity: "0.9", "stroke-width": "0.6" })));
    add(fillC(50, 92, 13, "#B5303A"));
    add(fillC(72, 94, 13, "#A52A33"));
    add(circ(46, 88, 2.6, { fill: "#fff", opacity: "0.3" })); add(circ(68, 90, 2.6, { fill: "#fff", opacity: "0.3" }));
  };
  FORMS.grape = function (add) {
    add(stem("M60 24 H44 M52 24 V32", 1.6));
    add(P("M60 20 C74 14 86 22 82 34 C72 38 62 32 60 20 Z", fa(LEAFP, { opacity: "0.9" }))); // vine leaf
    add(P("M44 32 q6 -6 14 -2", { stroke: STEM, "stroke-width": "1", fill: "none" }));
    var rows = [[50, 60, 70], [44, 56, 66, 76], [50, 60, 70], [56, 64], [60]];
    var y = 42;
    for (var r = 0; r < rows.length; r++) { for (var c = 0; c < rows[r].length; c++) { add(fillC(rows[r][c], y, 7, "#6E4B72", { "stroke-width": "0.6" })); add(circ(rows[r][c] - 2, y - 2, 1.6, { fill: "#fff", opacity: "0.25" })); } y += 12; }
  };
  FORMS.fig = function (add) {
    add(stem("M60 32 V22", 1.6));
    add(P("M60 26 C46 18 44 30 52 34 M60 26 C74 18 76 30 68 34", { stroke: LEAF, "stroke-width": "3", fill: "none", "stroke-linecap": "round" }));
    add(P("M60 38 C42 40 40 64 60 100 C80 64 78 40 60 38 Z", fa("#6E4B72")));
    add(P("M52 54 Q60 48 68 54", { stroke: "#fff", "stroke-width": "1.4", opacity: "0.3", fill: "none", "stroke-linecap": "round" }));
    add(circ(60, 98, 2.2, { fill: "#3A2542" }));
  };
  FORMS.rhubarb = function (add) {
    // big crinkled leaf
    add(P("M60 44 C30 40 20 18 40 10 C44 24 56 26 60 44 Z", fa(LEAFR, { opacity: "0.92" })));
    add(P("M60 44 C90 40 100 18 80 10 C76 24 64 26 60 44 Z", fa(LEAF, { opacity: "0.92" })));
    add(P("M40 16 Q52 26 60 42 M80 16 Q68 26 60 42", { stroke: STEM, "stroke-width": "0.7", fill: "none", opacity: "0.5" }));
    // red stalks
    add(P("M54 104 C56 80 56 60 58 44 M64 104 C62 80 64 60 62 44", { stroke: "#C24A4F", "stroke-width": "5", fill: "none", "stroke-linecap": "round" }));
  };
  FORMS.elderberry = function (add) {
    add(stem("M60 106 V58", 2));
    add(stem("M60 58 l-16 -8 M60 58 l-8 -12 M60 58 l8 -12 M60 58 l16 -8 M60 58 V44", 1.2));
    add(blade(48, 84, -1, 0.6, LEAF)); add(blade(72, 76, 1, 0.6, LEAFP));
    var tips = [[44, 50], [52, 44], [60, 42], [68, 44], [76, 50], [50, 54], [70, 54], [60, 50]];
    for (var i = 0; i < tips.length; i++) { for (var d = 0; d < 4; d++) { var a = d / 4 * 6.28; add(circ(tips[i][0] + Math.cos(a) * 3.4, tips[i][1] + Math.sin(a) * 3.4, 2.4, { fill: "#2E2A38", stroke: STEM, "stroke-width": "0.3", opacity: "0.95" })); } }
  };

  /* ===== EXPANSION FORMS ===== */
  FORMS.okra = function (add) {
    add(stem("M60 104 V40", 2.4));
    add(blade(50, 86, -1, 0.7, LEAF)); add(blade(70, 70, 1, 0.7, LEAFP));
    add(P("M60 40 C50 40 50 60 54 86 C56 96 64 96 66 86 C70 60 70 40 60 40 Z", fa("#5E8E3C")));
    add(P("M60 42 V92 M55 50 Q56 70 57 90 M65 50 Q64 70 63 90", { stroke: STEM, "stroke-width": "0.7", fill: "none", opacity: "0.5" }));
    add(P("M60 40 l-7 -3 l-2 -7 l-1 8 l-7 1 l8 2 z M60 40 l7 -3 l2 -7 l1 8 l7 1 l-8 2 z", fa(LEAF, { opacity: "0.95", "stroke-width": "0.6" })));
  };
  FORMS.kohlrabi = function (add) {
    var stalks = [[40, 30], [52, 18], [68, 18], [80, 30], [60, 14]];
    for (var i = 0; i < stalks.length; i++) {
      add(stem("M60 64 L" + stalks[i][0] + " " + stalks[i][1], 1.6));
      add(fillE(stalks[i][0], stalks[i][1] - 2, 7, 11, (i % 2 ? LEAFP : LEAF), { opacity: "0.9", transform: "rotate(" + ((stalks[i][0] - 60) * 0.8) + " " + stalks[i][0] + " " + (stalks[i][1] - 2) + ")" }));
    }
    add(fillE(60, 76, 24, 20, "#9FC07A"));
    add(P("M44 74 Q60 84 76 74", { stroke: STEM, "stroke-width": "0.8", fill: "none", opacity: "0.45" }));
    add(P("M54 94 l-2 8 M60 96 v8 M66 94 l2 8", { stroke: STEM, "stroke-width": "1", fill: "none", opacity: "0.5", "stroke-linecap": "round" }));
  };
  FORMS.scallion = function (add) {
    var xs = [50, 56, 60, 64, 70];
    for (var i = 0; i < xs.length; i++) {
      var x = xs[i], lean = (i - 2) * 3;
      add(P("M" + x + " 96 C" + (x + lean) + " 64 " + (x + lean) + " 40 " + (x + lean) + " 26", fa("none", { stroke: i % 2 ? LEAF : LEAFP, "stroke-width": "4", "stroke-linecap": "round", opacity: "0.95" })));
    }
    add(P("M52 92 H68 V102 Q60 108 52 102 Z", fa("#ECE3CC")));
    add(P("M53 100 l-2 7 M60 104 v6 M67 100 l2 7", { stroke: STEM, "stroke-width": "0.9", fill: "none", opacity: "0.5", "stroke-linecap": "round" }));
  };
  FORMS.artichoke = function (add) {
    add(stem("M60 106 V64", 3));
    add(blade(48, 92, -1, 0.7, LEAFP)); add(blade(72, 84, 1, 0.7, LEAF));
    add(fillE(60, 46, 22, 26, "#6f8f5a"));
    for (var r = 0; r < 4; r++) {
      var y = 30 + r * 11, n = 3 + r;
      for (var i = 0; i < n; i++) {
        var x = 60 + (i - (n - 1) / 2) * 12;
        add(P("M" + x + " " + y + " q-6 6 0 12 q6 -6 0 -12 z", fa(r % 2 ? "#7BA063" : "#688B54", { opacity: "0.95", "stroke-width": "0.6" })));
      }
    }
    add(P("M60 24 q-3 -6 0 -10 q3 4 0 10", { stroke: "#8A6FB0", "stroke-width": "2", fill: "none", "stroke-linecap": "round" }));
  };
  FORMS.citrus = function (add, o) {
    var f = o.fill || "#E8C53A", shape = o.shape || "round";
    add(stem("M60 36 C62 28 66 24 70 22", 2));
    add(P("M70 22 C82 18 88 26 82 36 C72 38 68 30 70 22 Z", fa(LEAFR, { opacity: "0.92" })));
    if (shape === "oval") { add(fillE(60, 68, 24, 30, f)); add(circ(60, 40, 1.6, { fill: STEM, opacity: "0.5" })); add(circ(60, 96, 1.6, { fill: STEM, opacity: "0.5" })); }
    else { add(fillC(60, 70, 28, f)); }
    add(P("M50 60 Q58 54 66 58", { stroke: "#fff", "stroke-width": "1.6", opacity: "0.35", fill: "none", "stroke-linecap": "round" }));
    for (var i = 0; i < 7; i++) { var a = i / 7 * 6.28; add(circ(60 + Math.cos(a) * 16, 70 + Math.sin(a) * 16, 0.9, { fill: STEM, opacity: "0.25" })); }
  };
  FORMS.pomegranate = function (add) {
    add(stem("M60 40 V30", 2));
    add(blade(60, 36, 1, 0.5, LEAFR)); add(blade(60, 36, -1, 0.5, LEAF));
    add(fillC(60, 70, 28, "#B83A3A"));
    add(P("M52 46 l3 -10 l3 8 l2 -10 l3 10 z", fa("#9A2E2E", { opacity: "0.95", "stroke-width": "0.6" })));
    add(P("M50 62 Q60 56 70 62", { stroke: "#fff", "stroke-width": "1.4", opacity: "0.3", fill: "none", "stroke-linecap": "round" }));
    add(P("M70 78 q10 4 8 14 q-8 0 -10 -8 z", fa("#E0586A", { opacity: "0.9", "stroke-width": "0.5" })));
    for (var i = 0; i < 4; i++) { add(circ(73 + (i % 2) * 3, 84 + Math.floor(i / 2) * 4, 1.4, { fill: "#C23048" })); }
  };
  FORMS.rose = function (add, o) {
    var f = (o && o.fill) || "#C25D7C", st = (o && o.stroke) || "#A6395A";
    add(stem("M60 108 V56", 2.4));
    add(P("M60 92 l5 3 M60 80 l-5 3 M60 68 l5 3", { stroke: STEM, "stroke-width": "1.4", fill: "none", "stroke-linecap": "round" }));
    add(blade(50, 86, -1, 0.55, LEAF)); add(blade(70, 86, 1, 0.55, LEAFP)); add(blade(52, 72, -1, 0.5, LEAFP)); add(blade(68, 72, 1, 0.5, LEAF));
    for (var ring = 0; ring < 3; ring++) {
      var r = 19 - ring * 6, n = 7 - ring;
      for (var i = 0; i < n; i++) { var a = i / n * 6.28 + ring * 0.5; add(ell(60 + Math.cos(a) * r * 0.6, 44 + Math.sin(a) * r * 0.6, r * 0.7, r * 0.5, attrs({ fill: f, stroke: st, "stroke-width": "0.5", opacity: "0.92" }, { transform: "rotate(" + (a * 57.3) + " " + (60 + Math.cos(a) * r * 0.6) + " " + (44 + Math.sin(a) * r * 0.6) + ")" }))); }
    }
    add(fillC(60, 44, 4, st, { "stroke-width": "0" }));
  };
  FORMS.pansy = function (add) {
    add(stem("M60 106 V58", 1.8));
    add(blade(50, 90, -1, 0.5, LEAF)); add(blade(70, 82, 1, 0.5, LEAFP));
    add(ell(52, 40, 10, 11, fa("#7E5B9A", { "stroke-width": "0.5", opacity: "0.93" })));
    add(ell(68, 40, 10, 11, fa("#7E5B9A", { "stroke-width": "0.5", opacity: "0.93" })));
    add(ell(48, 52, 11, 10, fa("#9A6FB0", { "stroke-width": "0.5", opacity: "0.93" })));
    add(ell(72, 52, 11, 10, fa("#9A6FB0", { "stroke-width": "0.5", opacity: "0.93" })));
    add(ell(60, 56, 12, 12, fa("#E6C04C", { "stroke-width": "0.5", opacity: "0.95" })));
    add(P("M60 50 l-6 8 M60 50 l6 8 M60 50 v10", { stroke: "#5A3A6A", "stroke-width": "1", fill: "none", opacity: "0.7" }));
    add(fillC(60, 50, 3, "#4E3420", { "stroke-width": "0" }));
  };
  FORMS.grassClump = function (add) {
    for (var i = 0; i < 9; i++) {
      var x0 = 60 + (i - 4) * 2, bend = (i - 4) * 7;
      add(P("M" + x0 + " 106 C" + (x0 + bend * 0.4) + " 70 " + (x0 + bend) + " 40 " + (x0 + bend * 1.4) + " 20", fa("none", { stroke: i % 2 ? LEAF : LEAFP, "stroke-width": "2.4", "stroke-linecap": "round", opacity: "0.9" })));
    }
    add(fillE(60, 102, 10, 6, "#C9B98F", { opacity: "0.9" }));
  };
  FORMS.ginger = function (add) {
    add(P("M58 60 C48 44 44 30 46 18", fa("none", { stroke: LEAF, "stroke-width": "4", "stroke-linecap": "round" })));
    add(P("M60 60 V16", fa("none", { stroke: LEAFP, "stroke-width": "4", "stroke-linecap": "round" })));
    add(P("M62 60 C72 44 76 30 74 18", fa("none", { stroke: LEAF, "stroke-width": "4", "stroke-linecap": "round" })));
    add(P("M40 78 C40 68 52 66 58 70 C64 66 78 66 82 74 C90 78 88 92 78 92 C74 98 64 96 62 90 C56 96 44 96 42 88 C36 88 36 80 40 78 Z", fa("#D9B07A")));
    add(P("M58 72 V90 M70 72 Q72 82 70 90 M48 78 Q50 84 48 90", { stroke: STEM, "stroke-width": "0.7", fill: "none", opacity: "0.5" }));
  };

  /* ============================================================================
     REGISTRY — every plant id → [formName, options]
     ============================================================================ */
  var ART = {
    /* veg */
    tomato: ["tomato"], potato: ["potato"],
    carrot: ["taproot", { fill: "#DD7A2E" }], parsnip: ["taproot", { fill: "#E7D6AE" }],
    onion: ["allium", { fill: "#E2BE83", lines: "#B07D33", roots: true }], garlic: ["garlic"],
    leek: ["leek"],
    lettuce: ["leafRosette", {}], spinach: ["leafRosette", { fill: LEAF, fillAlt: LEAFR }],
    cabbage: ["cabbage", {}], broccoli: ["floret", { fill: "#3F6F3B", bumpy: true }],
    cauliflower: ["floret", { fill: "#ECE6CE", bumpy: false }], kale: ["kale"],
    cucumber: ["cucurbitFruit", { fill: "#3F6F2E", shape: "long" }],
    courgette: ["cucurbitFruit", { fill: "#4F7D33", shape: "long" }],
    squash: ["cucurbitFruit", { fill: "#D27D2A", shape: "round", ribs: true }],
    pea: ["peapod", {}], "french-bean": ["bean", { pod: "#6f9165" }],
    "runner-bean": ["bean", { pod: "#5F8E3C", flower: "#C9483B" }],
    beetroot: ["roundRoot", { fill: "#8C3457", tip: "#8C3457" }],
    radish: ["roundRoot", { fill: "#D24A57", tip: "#ECE3CC" }],
    turnip: ["roundRoot", { fill: "#ECE3CC", shoulder: "#7C4A86" }],
    sweetcorn: ["corn"], pepper: ["pepper"], aubergine: ["aubergine"],
    cauli: ["floret"], "brussels-sprout": ["brussels"], celery: ["celery"],
    chard: ["chard", { rib: "#C9483B" }], asparagus: ["asparagus"],
    /* herbs */
    basil: ["leafySprig", { leaf: LEAF, leafAlt: LEAFP, opposite: true, leafScale: 1.08, count: 4, flower: "#EDE7D6" }],
    parsley: ["umbelHerb", { ferny: true }], dill: ["umbelHerb", { fill: "#E6C04C", ferny: true }],
    coriander: ["umbelHerb", { ferny: true }], fennel: ["umbelHerb", { fill: "#E6C04C", ferny: true }],
    mint: ["leafySprig", { leaf: LEAF, leafAlt: LEAFP, opposite: true, count: 5, flower: "#B9A0D0" }],
    oregano: ["leafySprig", { leaf: LEAFP, leafAlt: LEAF, count: 6, flower: "#D29AB0" }],
    thyme: ["leafySprig", { leaf: LEAFP, leafAlt: LEAF, count: 6, leafScale: 0.72, flower: "#C99BB4" }],
    rosemary: ["needleSprig"], sage: ["leafySprig", { leaf: "#9DAE97", leafAlt: "#8AA083", opposite: true, count: 4, leafScale: 1.12, flower: "#9A7FC0" }],
    chives: ["chives"], borage: ["borage"], chamomile: ["chamomile"],
    tarragon: ["leafySprig", { leaf: LEAFR, leafAlt: LEAF, count: 6 }],
    "lemon-balm": ["leafySprig", { leaf: LEAF, leafAlt: LEAFP, opposite: true, count: 4, leafScale: 1.05 }],
    lavender: ["lavender"], "summer-savory": ["needleSprig"],
    catnip: ["leafySprig", { leaf: "#A8B79E", leafAlt: LEAFP, opposite: true, count: 5, flower: "#B9A0D0" }], marjoram: ["leafySprig", { leaf: LEAFP, leafAlt: LEAF, count: 6, flower: "#EAD9C0" }],
    /* flowers */
    "french-marigold": ["marigold", { fill: "#E08A1E", fillAlt: "#D2691E" }],
    calendula: ["marigold", { fill: "#E8A21C", fillAlt: "#E0801A" }],
    nasturtium: ["nasturtium"], sunflower: ["sunflower"],
    cosmos: ["daisy", { petal: "#E59AB4", center: "#E6C04C", n: 8 }],
    zinnia: ["daisy", { petal: "#D2553E", center: "#E6C04C", n: 14, pry: 11 }],
    "sweet-pea": ["sweetpea"], foxglove: ["spike", { fill: "#C77CA6", style: "bell" }],
    hollyhock: ["spike", { fill: "#D98199", style: "round", n: 5 }],
    poppy: ["poppy"], cornflower: ["cornflower"], lupin: ["lupinSpike"], dahlia: ["dahlia"],
    aster: ["daisy", { petal: "#8E86C6", center: "#E6C04C", n: 16, prx: 3.5, pry: 11 }],
    snapdragon: ["spike", { fill: "#E0902B", style: "pouch", n: 6 }],
    alyssum: ["cluster", { fill: "#F0EBDC" }], phacelia: ["cluster", { fill: "#7E86C6", curl: true }],
    petunia: ["trumpet", { fill: "#B5588A" }], geranium: ["trumpet", { fill: "#C9483B" }],
    yarrow: ["cluster", { fill: "#ECE3CC" }],
    echinacea: ["daisy", { petal: "#D389A6", center: "#8A5A2A", n: 14, pry: 13, reflex: true }],
    "bee-balm": ["beebalm"], cleome: ["cleome"],
    tithonia: ["daisy", { petal: "#E2761F", center: "#E6C04C", n: 13, pry: 12 }],
    /* fruit */
    strawberry: ["strawberry"], raspberry: ["aggregate", { fill: "#C24A57" }],
    blackberry: ["aggregate", { fill: "#3A2E3F" }],
    blueberry: ["berryCluster", { fill: "#5A6E9A", bloom: true }],
    apple: ["treeFruit", { fill: "#C9483B", shape: "round" }],
    pear: ["treeFruit", { fill: "#B7C04A", shape: "pear" }],
    plum: ["treeFruit", { fill: "#6E4B72", shape: "oval", bloom: true }],
    cherry: ["cherry"], grape: ["grape"], gooseberry: ["gooseberry"],
    blackcurrant: ["berryCluster", { fill: "#2E2A38" }],
    redcurrant: ["berryCluster", { fill: "#C9483B" }],
    rhubarb: ["rhubarb"], fig: ["fig"],
    melon: ["cucurbitFruit", { fill: "#A9BE73", shape: "round", netting: true }],
    quince: ["treeFruit", { fill: "#DDBE4A", shape: "pear" }], elderberry: ["elderberry"],

    /* ---- EXPANSION ---- */
    /* veg */
    "sweet-potato": ["potato", { fill: "#C8804A" }],
    "broad-bean": ["bean", { pod: "#7DA64F", flower: "#EDE7D6" }],
    okra: ["okra"], kohlrabi: ["kohlrabi"],
    "pak-choi": ["chard", { rib: "#ECE3CC" }],
    swede: ["roundRoot", { fill: "#E0C98A", shoulder: "#7C4A86" }],
    shallot: ["allium", { fill: "#C98A5A", lines: "#9A6233", roots: true }],
    "spring-onion": ["scallion"],
    rocket: ["leafRosette", { fill: LEAF, fillAlt: LEAFR }],
    endive: ["leafRosette", { fill: LEAFP, fillAlt: LEAF }],
    "globe-artichoke": ["artichoke"],
    "jerusalem-artichoke": ["daisy", { petal: "#E6B12E", center: "#7A5A2A", n: 13, pry: 12 }],
    horseradish: ["taproot", { fill: "#ECE3CC" }],
    celeriac: ["roundRoot", { fill: "#D9D2BC", shoulder: "#C2B89A" }],
    "mustard-greens": ["kale"],
    /* herbs */
    "bay-laurel": ["leafySprig", { leaf: LEAFR, leafAlt: "#3f6f3b", opposite: true, leafScale: 1.12, count: 4 }],
    chervil: ["umbelHerb", { ferny: true }],
    sorrel: ["leafRosette", { fill: LEAF, fillAlt: LEAFR }],
    lovage: ["umbelHerb", { fill: "#E6C04C", ferny: true }],
    hyssop: ["lavender", { color: "#5A7FC0" }],
    comfrey: ["spike", { fill: "#9A8FD0", style: "bell", n: 5 }],
    feverfew: ["chamomile"],
    lemongrass: ["grassClump"], ginger: ["ginger"],
    "winter-savory": ["needleSprig"],
    "anise-hyssop": ["spike", { fill: "#9A7FC0", style: "round", n: 6 }],
    "curry-plant": ["needleSprig", { leaf: "#A8B79E", leafAlt: "#9DAE97", flower: "#E6C04C" }],
    /* flowers */
    rose: ["rose", { fill: "#C25D7C", stroke: "#A6395A" }],
    peony: ["dahlia", { fill: "#E6A6C0", stroke: "#C27B9B", center: "#C27B9B", big: true }],
    delphinium: ["spike", { fill: "#5A7FC0", style: "round", n: 7 }],
    "sweet-william": ["cluster", { fill: "#D2697F" }],
    pansy: ["pansy"],
    nigella: ["daisy", { petal: "#8FA0D0", center: "#C7D0A0", n: 9, pry: 10 }],
    larkspur: ["spike", { fill: "#7E86C6", style: "bell", n: 6 }],
    rudbeckia: ["daisy", { petal: "#E6B12E", center: "#4E3420", n: 14, pry: 12 }],
    coreopsis: ["daisy", { petal: "#E6C04C", center: "#C28B36", n: 8 }],
    gaillardia: ["daisy", { petal: "#D2553E", center: "#8A5A2A", n: 13, pry: 11 }],
    salvia: ["spike", { fill: "#7E5B9A", style: "round", n: 7 }],
    verbena: ["cluster", { fill: "#9A6FB0" }],
    "shasta-daisy": ["daisy", { petal: "#FBF7EC", center: "#E6C04C", n: 16, pry: 13 }],
    /* fruit */
    lemon: ["citrus", { fill: "#E8C53A", shape: "oval" }],
    orange: ["citrus", { fill: "#E0892E", shape: "round" }],
    peach: ["treeFruit", { fill: "#E59A6A", shape: "round", cleft: true }],
    apricot: ["treeFruit", { fill: "#E0A24A", shape: "round", cleft: true }],
    watermelon: ["cucurbitFruit", { fill: "#3F7A3A", shape: "round", stripes: true }],
    cranberry: ["berryCluster", { fill: "#B5303A" }],
    kiwi: ["treeFruit", { fill: "#8A6B4A", shape: "oval" }],
    pomegranate: ["pomegranate"],
    mulberry: ["aggregate", { fill: "#3A2540" }],
    olive: ["berryCluster", { fill: "#5A6B3A" }]
  };

  /* category fallback emblems (kept for any unmapped id) */
  function categoryEmblem(cat, svg, add) {
    if (cat === "veg") { FORMS.taproot(add, { fill: "#DD7A2E" }); }
    else if (cat === "herb") { FORMS.leafySprig(add, {}); }
    else if (cat === "flower") { FORMS.daisy(add, { petal: "#C25D7C", center: "#E6C04C" }); }
    else { FORMS.treeFruit(add, { fill: "#C9483B", shape: "round" }); }
  }

  function plantEmblem(plant) {
    var svg = emblemSvg();
    function add(n) { svg.appendChild(n); }
    var spec = ART[plant.id];
    if (spec && FORMS[spec[0]]) { FORMS[spec[0]](add, spec[1] || {}); }
    else { categoryEmblem(plant.cat, svg, add); }
    return svg;
  }

  root.CG_COMPANION_ART = { plantEmblem: plantEmblem, ART: ART };
})(typeof window !== "undefined" ? window : this);
