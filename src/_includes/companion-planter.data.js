/* ============================================================================
   PLANT + COMPANION DATA for companion-planter.html
   ----------------------------------------------------------------------------
   Single source of truth for the cottage-garden roll and its companion edges.
   Edit HERE, not in the HTML. The build (node .claude/skills/build/scripts/
   build.mjs) inlines this file into docs/companion-planter.html so the published
   page is a single self-contained file; in dev it loads via a <script src> tag.
   ============================================================================ */
(function (root) {
  "use strict";
  var REASONS = [
    { key:"pest",       label:"Repels pests",      accent:"vigour" },
    { key:"trap",       label:"Trap crop",         accent:"vigour" },
    { key:"pollinator", label:"Draws pollinators", accent:"bloom"  },
    { key:"flavour",    label:"Improves flavour",  accent:"bloom"  },
    { key:"nitrogen",   label:"Fixes nitrogen",    accent:"leaf"   },
    { key:"mulch",      label:"Living mulch",      accent:"leaf"   },
    { key:"support",    label:"Physical support",  accent:"stem"   },
    { key:"shade",      label:"Shade / shelter",   accent:"stem"   }
  ];

  /* FEEDS — DEEP-LINK COUPLING POINT (keep in sync with fertilizer.html PRESETS). */
  var FEEDS = [
    "All-purpose balanced",
    "Leafy greens & lawns",
    "Tomato & vegetable",
    "Rose & flower",
    "Bulbs & roots",
    "Gentle all-organic"
  ];

  var PLANTS = [
    /* ---- VEGETABLES (cat:"veg") ---- */
    { id:"tomato",         name:"Tomato",            latin:"Solanum lycopersicum",            cat:"veg", blurb:"The cottage plot's hungry star — thrives among basil and marigolds.", feed:"Tomato & vegetable" },
    { id:"potato",         name:"Potato",            latin:"Solanum tuberosum",               cat:"veg", blurb:"Earthed-up tubers that resent their nightshade cousins close by.", feed:"Bulbs & roots" },
    { id:"carrot",         name:"Carrot",            latin:"Daucus carota",                   cat:"veg", blurb:"Feathery tops betrayed to carrot fly — mask them among alliums.", feed:"Bulbs & roots" },
    { id:"onion",          name:"Onion",             latin:"Allium cepa",                     cat:"veg", blurb:"Pungent allium that guards carrots but sulks beside beans.", feed:"Bulbs & roots" },
    { id:"garlic",         name:"Garlic",            latin:"Allium sativum",                  cat:"veg", blurb:"A clove-by-clove pest ward — best kept clear of peas and beans.", feed:"Bulbs & roots" },
    { id:"lettuce",        name:"Lettuce",           latin:"Lactuca sativa",                  cat:"veg", blurb:"Quick, tender leaves happy in the cool shade of taller crops.", feed:"Leafy greens & lawns" },
    { id:"cabbage",        name:"Cabbage",           latin:"Brassica oleracea",               cat:"veg", aliases:["brassica"], blurb:"A heavy-headed brassica that loves aromatic herbs at its feet.", feed:"Leafy greens & lawns" },
    { id:"broccoli",       name:"Broccoli",          latin:"Brassica oleracea var. italica",  cat:"veg", blurb:"Calabrese heads sweetened by chamomile and guarded by nasturtium.", feed:"Leafy greens & lawns" },
    { id:"cucumber",       name:"Cucumber",          latin:"Cucumis sativus",                 cat:"veg", blurb:"A scrambling vine that climbs sunflowers and shrinks from sage.", feed:"Tomato & vegetable" },
    { id:"courgette",      name:"Courgette",         latin:"Cucurbita pepo",                  cat:"veg", aliases:["zucchini","summer squash"], blurb:"Generous summer squash — borage brings bees to its golden flowers.", feed:"Tomato & vegetable" },
    { id:"pea",            name:"Pea",               latin:"Pisum sativum",                   cat:"veg", blurb:"A climbing legume that feeds the soil with nitrogen as it grows.", feed:"Gentle all-organic" },
    { id:"french-bean",    name:"French bean",       latin:"Phaseolus vulgaris",              cat:"veg", aliases:["green bean","dwarf bean","bush bean"], blurb:"Nitrogen-fixing bush bean — a Three Sisters mainstay.", feed:"Gentle all-organic" },
    { id:"runner-bean",    name:"Runner bean",       latin:"Phaseolus coccineus",             cat:"veg", aliases:["pole bean","string bean"], blurb:"Scarlet-flowered climber that scorns onions but loves sweetcorn poles.", feed:"Gentle all-organic" },
    { id:"beetroot",       name:"Beetroot",          latin:"Beta vulgaris",                   cat:"veg", aliases:["beet"], blurb:"Sweet roots and ruby leaves — keep climbing beans at a distance.", feed:"Bulbs & roots" },
    { id:"radish",         name:"Radish",            latin:"Raphanus sativus",                cat:"veg", blurb:"Fast row-marker that lures flea beetle and beetle from its neighbours.", feed:"Bulbs & roots" },
    { id:"spinach",        name:"Spinach",           latin:"Spinacia oleracea",               cat:"veg", blurb:"Cool-season leaf that carpets the ground beneath taller crops.", feed:"Leafy greens & lawns" },
    { id:"kale",           name:"Kale",              latin:"Brassica oleracea var. sabellica",cat:"veg", blurb:"Hardy frilled brassica — nasturtium draws aphids away from its leaves.", feed:"Leafy greens & lawns" },
    { id:"sweetcorn",      name:"Sweetcorn",         latin:"Zea mays",                        cat:"veg", aliases:["corn","maize"], blurb:"A living trellis for beans and a sun-screen for sprawling squash.", feed:"Leafy greens & lawns" },
    { id:"pepper",         name:"Pepper",            latin:"Capsicum annuum",                 cat:"veg", aliases:["bell pepper","chilli","chili"], blurb:"Warmth-loving nightshade that takes well to basil's company.", feed:"Tomato & vegetable" },
    { id:"squash",         name:"Squash",            latin:"Cucurbita maxima",                cat:"veg", aliases:["pumpkin","winter squash"], blurb:"Broad-leaved sprawler — the shading 'sister' to corn and beans.", feed:"Tomato & vegetable" },
    { id:"leek",           name:"Leek",              latin:"Allium ampeloprasum",             cat:"veg", blurb:"Mild standing allium that confuses carrot fly all season.", feed:"Bulbs & roots" },
    { id:"cauliflower",    name:"Cauliflower",       latin:"Brassica oleracea var. botrytis", cat:"veg", blurb:"A fussy brassica that rewards rich soil and herbal neighbours.", feed:"Leafy greens & lawns" },
    { id:"brussels-sprout",name:"Brussels sprout",   latin:"Brassica oleracea var. gemmifera",cat:"veg", blurb:"Tall winter brassica studded with sprouts — stake it well.", feed:"Leafy greens & lawns" },
    { id:"celery",         name:"Celery",            latin:"Apium graveolens",                cat:"veg", blurb:"Thirsty, aromatic stalks that pair kindly with leeks and brassicas.", feed:"All-purpose balanced" },
    { id:"aubergine",      name:"Aubergine",         latin:"Solanum melongena",               cat:"veg", aliases:["eggplant"], blurb:"Glossy nightshade fruit — beans help keep its beetles at bay.", feed:"Tomato & vegetable" },
    { id:"turnip",         name:"Turnip",            latin:"Brassica rapa",                   cat:"veg", blurb:"Swift brassica root that follows a nitrogen-fixing pea crop well.", feed:"Bulbs & roots" },
    { id:"parsnip",        name:"Parsnip",           latin:"Pastinaca sativa",                cat:"veg", blurb:"Long sweet root, all the sweeter after frost; flowers feed beneficials.", feed:"Bulbs & roots" },
    { id:"chard",          name:"Chard",             latin:"Beta vulgaris subsp. cicla",      cat:"veg", aliases:["swiss chard","silverbeet"], blurb:"Rainbow-stemmed leaf — a cut-and-come-again beside beans.", feed:"Leafy greens & lawns" },
    { id:"asparagus",      name:"Asparagus",         latin:"Asparagus officinalis",           cat:"veg", blurb:"A perennial spear bed that shelters tomatoes and shuns onions.", feed:"All-purpose balanced" },

    /* ---- HERBS (cat:"herb") ---- */
    { id:"basil",          name:"Basil",             latin:"Ocimum basilicum",                cat:"herb", blurb:"Tomato's classic partner — scent that muddles thrips and flies.", feed:"Gentle all-organic" },
    { id:"parsley",        name:"Parsley",           latin:"Petroselinum crispum",            cat:"herb", blurb:"When left to flower, a beacon for hoverflies and parasitic wasps.", feed:"Gentle all-organic" },
    { id:"dill",           name:"Dill",              latin:"Anethum graveolens",              cat:"herb", blurb:"Lacy umbels that draw beneficials — but never near carrots.", feed:"Gentle all-organic" },
    { id:"coriander",      name:"Coriander",         latin:"Coriandrum sativum",              cat:"herb", aliases:["cilantro"], blurb:"Quick-bolting umbel whose flowers summon aphid predators.", feed:"Gentle all-organic" },
    { id:"mint",           name:"Mint",              latin:"Mentha",                          cat:"herb", blurb:"A pungent cabbage-moth deterrent — best sunk in a pot to contain.", feed:"Gentle all-organic" },
    { id:"oregano",        name:"Oregano",           latin:"Origanum vulgare",                cat:"herb", blurb:"Low aromatic mat that flowers for pollinators and ground-shades.", feed:"Gentle all-organic" },
    { id:"thyme",          name:"Thyme",             latin:"Thymus vulgaris",                 cat:"herb", blurb:"Creeping, bee-loved carpet said to turn cabbage worm away.", feed:"Gentle all-organic" },
    { id:"rosemary",       name:"Rosemary",          latin:"Salvia rosmarinus",               cat:"herb", blurb:"Resinous evergreen whose scent unsettles bean beetle and carrot fly.", feed:"Gentle all-organic" },
    { id:"sage",           name:"Sage",              latin:"Salvia officinalis",              cat:"herb", blurb:"Grey-leaved guardian of brassicas — yet hard on cucumbers.", feed:"Gentle all-organic" },
    { id:"chives",         name:"Chives",            latin:"Allium schoenoprasum",            cat:"herb", blurb:"Edible-flowered allium that wards aphids and apple scab alike.", feed:"Gentle all-organic" },
    { id:"fennel",         name:"Fennel",            latin:"Foeniculum vulgare",              cat:"herb", blurb:"Aniseed loner — it inhibits most neighbours, so give it its own bed.", feed:"Gentle all-organic" },
    { id:"borage",         name:"Borage",            latin:"Borago officinalis",              cat:"herb", blurb:"Star-flowered bee plant that strengthens strawberries and squash.", feed:"Gentle all-organic" },
    { id:"chamomile",      name:"Chamomile",         latin:"Matricaria chamomilla",           cat:"herb", blurb:"The 'plant's physician' — said to sweeten onions and brassicas.", feed:"Gentle all-organic" },
    { id:"tarragon",       name:"Tarragon",          latin:"Artemisia dracunculus",           cat:"herb", blurb:"Aromatic French herb reputed to improve most of its neighbours.", feed:"Gentle all-organic" },
    { id:"lemon-balm",     name:"Lemon balm",        latin:"Melissa officinalis",             cat:"herb", blurb:"Lemony mint-relative humming with bees — contain its roots.", feed:"Gentle all-organic" },
    { id:"lavender",       name:"Lavender",          latin:"Lavandula angustifolia",          cat:"herb", blurb:"Silver, fragrant and full of bees — moths and aphids keep away.", feed:"Gentle all-organic" },
    { id:"summer-savory",  name:"Summer savory",     latin:"Satureja hortensis",              cat:"herb", blurb:"The 'bean herb' — sharpens their flavour and turns bean beetle aside.", feed:"Gentle all-organic" },
    { id:"catnip",         name:"Catnip",            latin:"Nepeta cataria",                  cat:"herb", aliases:["catmint"], blurb:"Cat-pleasing mint whose scent routs flea beetle and aphids.", feed:"Gentle all-organic" },
    { id:"marjoram",       name:"Marjoram",          latin:"Origanum majorana",               cat:"herb", blurb:"Sweet oregano cousin — a flavour-lifter and pollinator draw.", feed:"Gentle all-organic" },

    /* ---- FLOWERS (cat:"flower") ---- */
    { id:"french-marigold",name:"French marigold",   latin:"Tagetes patula",                  cat:"flower", aliases:["tagetes"], blurb:"The workhorse companion — roots fight nematodes, scent fights whitefly.", feed:"Rose & flower" },
    { id:"calendula",      name:"Calendula",         latin:"Calendula officinalis",           cat:"flower", aliases:["pot marigold"], blurb:"Cheerful pot marigold — sticky aphid trap and pollinator buffet.", feed:"Rose & flower" },
    { id:"nasturtium",     name:"Nasturtium",        latin:"Tropaeolum majus",                cat:"flower", blurb:"The great sacrificial trap — aphids and caterpillars flock to it.", feed:"Gentle all-organic" },
    { id:"sunflower",      name:"Sunflower",         latin:"Helianthus annuus",               cat:"flower", blurb:"Towering living trellis and pollinator landmark — but hard on potatoes.", feed:"All-purpose balanced" },
    { id:"cosmos",         name:"Cosmos",            latin:"Cosmos bipinnatus",               cat:"flower", blurb:"Airy daisy that calls in lacewings and hoverflies all summer.", feed:"Rose & flower" },
    { id:"zinnia",         name:"Zinnia",            latin:"Zinnia elegans",                  cat:"flower", blurb:"Hot-coloured nectar bar for butterflies and predatory wasps.", feed:"Rose & flower" },
    { id:"sweet-pea",      name:"Sweet pea",         latin:"Lathyrus odoratus",               cat:"flower", blurb:"Scented climbing legume — ornament that also feeds the soil.", feed:"Rose & flower" },
    { id:"foxglove",       name:"Foxglove",          latin:"Digitalis purpurea",              cat:"flower", blurb:"Cottage-border spire beloved of bumblebees; folklore favours its roots.", feed:"Rose & flower" },
    { id:"hollyhock",      name:"Hollyhock",         latin:"Alcea rosea",                     cat:"flower", blurb:"Stately back-of-border bloom that pulls pollinators sky-high.", feed:"Rose & flower" },
    { id:"poppy",          name:"Poppy",             latin:"Papaver rhoeas",                  cat:"flower", blurb:"Silken field poppy whose pollen feeds early bees and beetles.", feed:"Rose & flower" },
    { id:"cornflower",     name:"Cornflower",        latin:"Centaurea cyanus",                cat:"flower", aliases:["bachelor's button"], blurb:"True-blue meadow flower rich in nectar for beneficial insects.", feed:"Rose & flower" },
    { id:"lupin",          name:"Lupin",             latin:"Lupinus",                         cat:"flower", aliases:["lupine"], blurb:"Nitrogen-fixing spire — a flowering green manure for the border.", feed:"Rose & flower" },
    { id:"dahlia",         name:"Dahlia",            latin:"Dahlia pinnata",                  cat:"flower", blurb:"Late-season showpiece — ring it with nasturtium to spare it aphids.", feed:"Rose & flower" },
    { id:"aster",          name:"Aster",             latin:"Symphyotrichum",                  cat:"flower", aliases:["michaelmas daisy"], blurb:"Autumn daisy that keeps pollinators fed when little else flowers.", feed:"Rose & flower" },
    { id:"snapdragon",     name:"Snapdragon",        latin:"Antirrhinum majus",               cat:"flower", blurb:"Hinged blooms that only stout bumblebees can prise open.", feed:"Rose & flower" },
    { id:"alyssum",        name:"Sweet alyssum",     latin:"Lobularia maritima",              cat:"flower", aliases:["sweet alyssum"], blurb:"Honey-scented carpet — living mulch and a magnet for hoverflies.", feed:"Rose & flower" },
    { id:"phacelia",       name:"Phacelia",          latin:"Phacelia tanacetifolia",          cat:"flower", aliases:["fiddleneck"], blurb:"One of the finest bee plants — a green-manure and pollinator lure.", feed:"Gentle all-organic" },
    { id:"petunia",        name:"Petunia",           latin:"Petunia × atkinsiana",            cat:"flower", blurb:"Trumpet bedder said to repel aphids, leafhoppers and bean beetle.", feed:"Rose & flower" },
    { id:"geranium",       name:"Geranium",          latin:"Pelargonium",                     cat:"flower", aliases:["pelargonium"], blurb:"Scented bedding geranium reputed to confound beetles and worms.", feed:"Rose & flower" },
    { id:"yarrow",         name:"Yarrow",            latin:"Achillea millefolium",            cat:"flower", blurb:"Flat-topped landing pad for ladybirds, wasps and hoverflies.", feed:"Gentle all-organic" },
    { id:"echinacea",      name:"Echinacea",         latin:"Echinacea purpurea",              cat:"flower", aliases:["coneflower"], blurb:"Sturdy prairie coneflower that hums with bees and butterflies.", feed:"Rose & flower" },
    { id:"bee-balm",       name:"Bee balm",          latin:"Monarda didyma",                  cat:"flower", aliases:["bergamot","monarda"], blurb:"Shaggy mint-family bloom — a banquet for bees and hummingbirds.", feed:"Rose & flower" },
    { id:"cleome",         name:"Cleome",            latin:"Cleome hassleriana",              cat:"flower", aliases:["spider flower"], blurb:"Spidery night-scented bloom drawing dusk pollinators and bees.", feed:"Rose & flower" },
    { id:"tithonia",       name:"Tithonia",          latin:"Tithonia rotundifolia",           cat:"flower", aliases:["mexican sunflower"], blurb:"Fiery Mexican sunflower — a beacon for butterflies and wasps.", feed:"Rose & flower" },

    /* ---- FRUIT (cat:"fruit") ---- */
    { id:"strawberry",     name:"Strawberry",        latin:"Fragaria × ananassa",             cat:"fruit", blurb:"Sprawling ground fruit — borage at its side strengthens the crop.", feed:"All-purpose balanced" },
    { id:"raspberry",      name:"Raspberry",         latin:"Rubus idaeus",                    cat:"fruit", blurb:"Summer-caning bramble — a clove of garlic nearby wards its pests.", feed:"All-purpose balanced" },
    { id:"blackberry",     name:"Blackberry",        latin:"Rubus fruticosus",                cat:"fruit", blurb:"Vigorous hedgerow cane sweetened by bees the borage brings.", feed:"All-purpose balanced" },
    { id:"blueberry",      name:"Blueberry",         latin:"Vaccinium corymbosum",            cat:"fruit", blurb:"Acid-loving bush happiest under a thyme-mulched, lime-free soil.", feed:"Gentle all-organic" },
    { id:"apple",          name:"Apple",             latin:"Malus domestica",                 cat:"fruit", blurb:"Orchard mainstay — chives at the trunk are said to fend off scab.", feed:"All-purpose balanced" },
    { id:"pear",           name:"Pear",              latin:"Pyrus communis",                  cat:"fruit", blurb:"Long-lived orchard tree — nasturtium lures its codling moth aside.", feed:"All-purpose balanced" },
    { id:"plum",           name:"Plum",              latin:"Prunus domestica",                cat:"fruit", blurb:"Spring-blossoming stone fruit — alliums help keep aphids down.", feed:"All-purpose balanced" },
    { id:"cherry",         name:"Cherry",            latin:"Prunus avium",                    cat:"fruit", blurb:"Blossom-laden tree — chives and nasturtium soften its pest load.", feed:"All-purpose balanced" },
    { id:"grape",          name:"Grape",             latin:"Vitis vinifera",                  cat:"fruit", aliases:["grapevine"], blurb:"Sun-trained vine said to grow sweeter with geraniums at its feet.", feed:"All-purpose balanced" },
    { id:"gooseberry",     name:"Gooseberry",        latin:"Ribes uva-crispa",                cat:"fruit", blurb:"Thorny dessert bush — chives nearby discourage its sawfly.", feed:"All-purpose balanced" },
    { id:"blackcurrant",   name:"Blackcurrant",      latin:"Ribes nigrum",                    cat:"fruit", blurb:"Aromatic berry bush brightened by allium guards against aphids.", feed:"All-purpose balanced" },
    { id:"redcurrant",     name:"Redcurrant",        latin:"Ribes rubrum",                    cat:"fruit", blurb:"Jewel-stringed currant — chives help shield it from sawfly.", feed:"All-purpose balanced" },
    { id:"rhubarb",        name:"Rhubarb",           latin:"Rheum rhabarbarum",               cat:"fruit", blurb:"Bold-leaved perennial — its leaves are folk medicine for brassicas.", feed:"Leafy greens & lawns" },
    { id:"fig",            name:"Fig",               latin:"Ficus carica",                    cat:"fruit", blurb:"Mediterranean tree that keeps good company with lavender and herbs.", feed:"All-purpose balanced" },
    { id:"melon",          name:"Melon",             latin:"Cucumis melo",                    cat:"fruit", blurb:"Heat-loving trailing fruit — marigold and nasturtium see off its pests.", feed:"Tomato & vegetable" },
    { id:"quince",         name:"Quince",            latin:"Cydonia oblonga",                 cat:"fruit", blurb:"Fragrant old-orchard fruit — nasturtium draws its pests away.", feed:"All-purpose balanced" },
    { id:"elderberry",     name:"Elderberry",        latin:"Sambucus nigra",                  cat:"fruit", blurb:"Hedgerow elder whose froth of bloom feeds clouds of beneficials.", feed:"All-purpose balanced" }
  ];
  /* PLANTS total: 89 (veg 29 + herb 19 + flower 24 + fruit 17) */

  var EDGES = [
    /* ===== GOOD COMPANIONS (rel:"good") ===== */
    /* tomato guild */
    { a:"basil", b:"tomato", rel:"good", reasons:["pest","flavour"], conf:"strong", w:2 },
    { a:"basil", b:"pepper", rel:"good", reasons:["pest","flavour"], conf:"traditional" },
    { a:"asparagus", b:"basil", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"asparagus", b:"tomato", rel:"good", reasons:["pest"], conf:"strong", w:1 },
    { a:"asparagus", b:"parsley", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"parsley", b:"tomato", rel:"good", reasons:["pollinator","pest"], conf:"traditional" },

    /* carrot & alliums */
    { a:"carrot", b:"onion", rel:"good", reasons:["pest"], conf:"strong", w:2 },
    { a:"carrot", b:"leek", rel:"good", reasons:["pest"], conf:"strong", w:1 },
    { a:"carrot", b:"chives", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"carrot", b:"rosemary", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"carrot", b:"sage", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"carrot", b:"pea", rel:"good", reasons:["nitrogen"], conf:"traditional" },
    { a:"carrot", b:"lettuce", rel:"good", reasons:["mulch"], conf:"traditional" },
    { a:"carrot", b:"radish", rel:"good", reasons:["mulch"], conf:"traditional" },

    /* marigold pest control */
    { a:"french-marigold", b:"tomato", rel:"good", reasons:["pest"], conf:"strong", w:2 },
    { a:"french-marigold", b:"potato", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"french-bean", b:"french-marigold", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"cucumber", b:"french-marigold", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"french-marigold", b:"squash", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"courgette", b:"french-marigold", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"french-marigold", b:"melon", rel:"good", reasons:["pest"], conf:"traditional" },

    /* the Three Sisters */
    { a:"french-bean", b:"sweetcorn", rel:"good", reasons:["nitrogen","support"], conf:"strong", w:3 },
    { a:"squash", b:"sweetcorn", rel:"good", reasons:["mulch","shade"], conf:"strong", w:2 },
    { a:"french-bean", b:"squash", rel:"good", reasons:["nitrogen"], conf:"strong", w:2 },
    { a:"runner-bean", b:"sweetcorn", rel:"good", reasons:["nitrogen","support"], conf:"strong", w:2 },

    /* nasturtium as trap crop */
    { a:"nasturtium", b:"tomato", rel:"good", reasons:["trap"], conf:"traditional" },
    { a:"cabbage", b:"nasturtium", rel:"good", reasons:["trap"], conf:"strong", w:1 },
    { a:"cucumber", b:"nasturtium", rel:"good", reasons:["trap","pollinator"], conf:"traditional" },
    { a:"broccoli", b:"nasturtium", rel:"good", reasons:["trap"], conf:"traditional" },
    { a:"kale", b:"nasturtium", rel:"good", reasons:["trap"], conf:"traditional" },
    { a:"cauliflower", b:"nasturtium", rel:"good", reasons:["trap"], conf:"traditional" },
    { a:"brussels-sprout", b:"nasturtium", rel:"good", reasons:["trap"], conf:"traditional" },
    { a:"apple", b:"nasturtium", rel:"good", reasons:["trap","pest"], conf:"traditional" },
    { a:"dahlia", b:"nasturtium", rel:"good", reasons:["trap"], conf:"traditional" },
    { a:"courgette", b:"nasturtium", rel:"good", reasons:["trap"], conf:"traditional" },
    { a:"melon", b:"nasturtium", rel:"good", reasons:["trap"], conf:"traditional" },

    /* radish trap & row companions */
    { a:"cucumber", b:"radish", rel:"good", reasons:["trap"], conf:"traditional" },
    { a:"pea", b:"radish", rel:"good", reasons:["nitrogen"], conf:"traditional" },
    { a:"radish", b:"spinach", rel:"good", reasons:["mulch"], conf:"traditional" },
    { a:"parsnip", b:"radish", rel:"good", reasons:["mulch"], conf:"traditional" },

    /* brassicas & aromatic herbs */
    { a:"cabbage", b:"dill", rel:"good", reasons:["pest","pollinator"], conf:"traditional" },
    { a:"cabbage", b:"thyme", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"cabbage", b:"sage", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"cabbage", b:"mint", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"cabbage", b:"chamomile", rel:"good", reasons:["flavour"], conf:"traditional" },
    { a:"cabbage", b:"rosemary", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"cabbage", b:"lavender", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"cabbage", b:"catnip", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"cabbage", b:"geranium", rel:"good", reasons:["trap"], conf:"traditional" },
    { a:"cabbage", b:"celery", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"cabbage", b:"phacelia", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"broccoli", b:"dill", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"broccoli", b:"chamomile", rel:"good", reasons:["flavour"], conf:"traditional" },
    { a:"broccoli", b:"rosemary", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"cauliflower", b:"dill", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"cauliflower", b:"celery", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"brussels-sprout", b:"dill", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"dill", b:"kale", rel:"good", reasons:["pollinator"], conf:"traditional" },

    /* onion / allium companions */
    { a:"beetroot", b:"onion", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"lettuce", b:"onion", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"chamomile", b:"onion", rel:"good", reasons:["flavour"], conf:"traditional" },
    { a:"onion", b:"summer-savory", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"chard", b:"onion", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"onion", b:"pepper", rel:"good", reasons:["pest"], conf:"traditional" },

    /* borage the bee plant */
    { a:"borage", b:"strawberry", rel:"good", reasons:["pollinator","pest"], conf:"strong", w:1 },
    { a:"borage", b:"tomato", rel:"good", reasons:["pollinator","pest"], conf:"traditional" },
    { a:"borage", b:"squash", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"borage", b:"courgette", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"blackberry", b:"borage", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"borage", b:"melon", rel:"good", reasons:["pollinator"], conf:"traditional" },

    /* legumes feeding the soil */
    { a:"french-bean", b:"potato", rel:"good", reasons:["pest","nitrogen"], conf:"traditional" },
    { a:"cucumber", b:"pea", rel:"good", reasons:["nitrogen"], conf:"traditional" },
    { a:"pea", b:"sweetcorn", rel:"good", reasons:["nitrogen","support"], conf:"traditional" },
    { a:"parsnip", b:"pea", rel:"good", reasons:["nitrogen"], conf:"traditional" },
    { a:"pea", b:"turnip", rel:"good", reasons:["nitrogen"], conf:"traditional" },
    { a:"chard", b:"french-bean", rel:"good", reasons:["nitrogen"], conf:"traditional" },
    { a:"courgette", b:"french-bean", rel:"good", reasons:["nitrogen"], conf:"traditional" },
    { a:"apple", b:"lupin", rel:"good", reasons:["nitrogen"], conf:"traditional" },
    { a:"lupin", b:"potato", rel:"good", reasons:["nitrogen"], conf:"traditional" },
    { a:"sunflower", b:"sweet-pea", rel:"good", reasons:["nitrogen","support"], conf:"traditional" },

    /* herbs & their charges */
    { a:"french-bean", b:"summer-savory", rel:"good", reasons:["pest","flavour"], conf:"traditional" },
    { a:"french-bean", b:"rosemary", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"rosemary", b:"sage", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"mint", b:"tomato", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"tarragon", b:"tomato", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"cucumber", b:"oregano", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"oregano", b:"squash", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"lemon-balm", b:"tomato", rel:"good", reasons:["pollinator","flavour"], conf:"traditional" },
    { a:"lemon-balm", b:"squash", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"marjoram", b:"squash", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"aubergine", b:"marjoram", rel:"good", reasons:["flavour"], conf:"traditional" },
    { a:"aubergine", b:"catnip", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"aubergine", b:"tarragon", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"aubergine", b:"french-bean", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"coriander", b:"pepper", rel:"good", reasons:["pest","pollinator"], conf:"traditional" },
    { a:"coriander", b:"spinach", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"celery", b:"leek", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"dill", b:"lettuce", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"cucumber", b:"dill", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"chamomile", b:"cucumber", rel:"good", reasons:["pollinator"], conf:"traditional" },

    /* flowers calling in pollinators & predators */
    { a:"calendula", b:"tomato", rel:"good", reasons:["trap","pollinator"], conf:"strong", w:1 },
    { a:"asparagus", b:"calendula", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"cosmos", b:"tomato", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"cucumber", b:"sunflower", rel:"good", reasons:["support","pollinator"], conf:"traditional" },
    { a:"alyssum", b:"lettuce", rel:"good", reasons:["pollinator","mulch"], conf:"traditional" },
    { a:"phacelia", b:"tomato", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"bee-balm", b:"tomato", rel:"good", reasons:["pollinator","flavour"], conf:"traditional" },
    { a:"tomato", b:"yarrow", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"apple", b:"yarrow", rel:"good", reasons:["pollinator","pest"], conf:"traditional" },
    { a:"echinacea", b:"squash", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"cornflower", b:"cucumber", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"cornflower", b:"tomato", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"poppy", b:"squash", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"cucumber", b:"zinnia", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"tomato", b:"zinnia", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"aster", b:"squash", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"squash", b:"tithonia", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"tithonia", b:"tomato", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"cleome", b:"cucumber", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"cucumber", b:"hollyhock", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"french-bean", b:"snapdragon", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"french-bean", b:"petunia", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"apple", b:"foxglove", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"foxglove", b:"potato", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"cosmos", b:"parsnip", rel:"good", reasons:["pollinator"], conf:"traditional" },

    /* fruit companions */
    { a:"lettuce", b:"strawberry", rel:"good", reasons:["mulch"], conf:"traditional" },
    { a:"spinach", b:"strawberry", rel:"good", reasons:["mulch"], conf:"traditional" },
    { a:"strawberry", b:"thyme", rel:"good", reasons:["pest","mulch"], conf:"traditional" },
    { a:"blueberry", b:"thyme", rel:"good", reasons:["mulch"], conf:"traditional" },
    { a:"garlic", b:"raspberry", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"apple", b:"chives", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"apple", b:"garlic", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"blackberry", b:"chives", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"chives", b:"pear", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"nasturtium", b:"pear", rel:"good", reasons:["trap","pest"], conf:"traditional" },
    { a:"garlic", b:"plum", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"chives", b:"plum", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"cherry", b:"chives", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"cherry", b:"nasturtium", rel:"good", reasons:["trap"], conf:"traditional" },
    { a:"chives", b:"gooseberry", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"gooseberry", b:"tomato", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"blackcurrant", b:"chives", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"chives", b:"redcurrant", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"geranium", b:"grape", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"cabbage", b:"rhubarb", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"fig", b:"lavender", rel:"good", reasons:["pollinator"], conf:"traditional" },
    { a:"melon", b:"sweetcorn", rel:"good", reasons:["shade"], conf:"traditional" },
    { a:"cabbage", b:"elderberry", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"chives", b:"quince", rel:"good", reasons:["pest"], conf:"traditional" },
    { a:"nasturtium", b:"quince", rel:"good", reasons:["trap"], conf:"traditional" },
    { a:"apple", b:"elderberry", rel:"good", reasons:["pollinator"], conf:"traditional" },

    /* ===== ANTAGONISTS (rel:"bad") ===== */
    /* fennel the loner */
    { a:"fennel", b:"tomato", rel:"bad", conf:"strong", note:"Fennel secretes growth-inhibiting compounds — keep it well away from most vegetables." },
    { a:"fennel", b:"french-bean", rel:"bad", conf:"strong", note:"Fennel inhibits bean growth; give it its own corner of the garden." },
    { a:"fennel", b:"runner-bean", rel:"bad", conf:"strong", note:"Fennel stunts climbing beans — grow it well apart." },
    { a:"cabbage", b:"fennel", rel:"bad", conf:"strong", note:"Fennel suppresses brassicas; plant it elsewhere." },
    { a:"fennel", b:"pepper", rel:"bad", conf:"traditional", note:"Fennel inhibits most nightshades, peppers included." },
    { a:"coriander", b:"fennel", rel:"bad", conf:"traditional", note:"Fennel and coriander cross and sulk together — separate them." },
    { a:"dill", b:"fennel", rel:"bad", conf:"traditional", note:"Fennel and dill cross-pollinate, spoiling both seed lines." },

    /* nightshade blight & competition */
    { a:"potato", b:"tomato", rel:"bad", conf:"strong", note:"Both are blight-prone nightshades — separating them slows disease." },
    { a:"cucumber", b:"potato", rel:"bad", conf:"traditional", note:"Potatoes raise blight risk and compete heavily with cucumbers." },
    { a:"potato", b:"squash", rel:"bad", conf:"traditional", note:"Two heavy feeders that compete and share blight; keep apart." },
    { a:"potato", b:"sunflower", rel:"bad", conf:"traditional", note:"Sunflowers release growth-inhibiting compounds that stunt potatoes." },

    /* alliums vs legumes */
    { a:"french-bean", b:"onion", rel:"bad", conf:"traditional", note:"Onions and other alliums stunt beans and peas." },
    { a:"french-bean", b:"garlic", rel:"bad", conf:"traditional", note:"Garlic inhibits legume growth — keep beans away." },
    { a:"garlic", b:"pea", rel:"bad", conf:"traditional", note:"Garlic and onions stunt peas." },
    { a:"onion", b:"pea", rel:"bad", conf:"traditional", note:"Alliums inhibit pea growth." },
    { a:"onion", b:"runner-bean", rel:"bad", conf:"traditional", note:"Onions stunt climbing beans." },
    { a:"garlic", b:"runner-bean", rel:"bad", conf:"traditional", note:"Garlic inhibits bean growth." },
    { a:"asparagus", b:"garlic", rel:"bad", conf:"traditional", note:"Alliums inhibit asparagus crowns." },
    { a:"asparagus", b:"onion", rel:"bad", conf:"traditional", note:"Onions stunt establishing asparagus." },

    /* brassica & strawberry rivalry */
    { a:"cabbage", b:"strawberry", rel:"bad", conf:"traditional", note:"Brassicas and strawberries compete and share pests." },
    { a:"broccoli", b:"strawberry", rel:"bad", conf:"traditional", note:"Brassicas suppress strawberry vigour." },
    { a:"kale", b:"strawberry", rel:"bad", conf:"traditional", note:"Brassicas and strawberries make poor neighbours." },

    /* assorted documented clashes */
    { a:"carrot", b:"dill", rel:"bad", conf:"traditional", note:"Mature dill stunts carrots and can cross with their flowers." },
    { a:"sweetcorn", b:"tomato", rel:"bad", conf:"traditional", note:"Corn earworm and tomato fruitworm are one pest — separating them slows it." },
    { a:"cabbage", b:"tomato", rel:"bad", conf:"traditional", note:"Tomatoes and brassicas compete heavily; keep them apart." },
    { a:"cucumber", b:"sage", rel:"bad", conf:"traditional", note:"Strongly aromatic sage can stunt cucumbers." },
    { a:"beetroot", b:"runner-bean", rel:"bad", conf:"traditional", note:"Climbing beans and beetroot stunt one another." },
    { a:"french-bean", b:"sunflower", rel:"bad", conf:"traditional", note:"Sunflowers can inhibit bean growth." }
  ];
  /* EDGES total: 179 (good 151 + bad 28); every plant has >=1 edge (verified B1 Task 1.11) */
  root.CG_COMPANION_DATA = { REASONS: REASONS, FEEDS: FEEDS, PLANTS: PLANTS, EDGES: EDGES };
})(typeof window !== "undefined" ? window : this);
