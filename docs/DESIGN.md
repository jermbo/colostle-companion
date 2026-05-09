# Design System

A warm, literary design system built on hand-drawn principles. Intentionally sketchy and tactile—like writing in a notebook with a fountain pen.

## Design Principles

1. **Literary & Warm** — Colors and typography evoke books, journals, and handwriting. Nothing sterile.
2. **Hand-Drawn Aesthetic** — Borders are slightly irregular, lines squiggle, nothing pixel-perfect. Imperfection is intentional.
3. **Semantic & Playful** — Color signals meaning (explore = green, combat = red), but the overall tone is whimsical, not military.
4. **Narrative First** — Every screen serves storytelling. Stats and mechanics fade into the background.
5. **Accessibility with Character** — Readable, functional, but with personality.
6. **Professional Language** — No emojis in documentation or UI labels. Emojis undermine credibility and make serious work appear trivial. Use clear, text-based language instead.

## Color System

### Core Palette

**Text & Structure:**
- `--ink` (#1f1a17) — primary text, borders, high contrast
- `--ink-soft` (#4a423d) — secondary text, metadata, softer UI elements
- `--ink-faint` (#8a8079) — tertiary text, disabled states

**Surfaces:**
- `--paper` (#f4efe6) — primary background (cream/off-white)
- `--paper-warm` (#ebe3d3) — secondary background (warmer variant for hierarchy)

**Actions & Semantic:**
- `--accent` (#2b4a7a) — primary action (buttons, links, active states)
- `--accent-soft` (#5a7099) — accent background tints
- `--explore` (#4a7a5c) — exploration mechanic (prompts, counters, tags)
- `--combat` (#b04030) — combat mechanic (prompts, counters, tags)
- `--rust` (#a85a3a) — annotations, callouts, secondary emphasis

**Structure:**
- `--line` (#2a2520) — borders, dividers, grid

### Semantic Color Usage

- **Buttons (Primary):** `--accent` background, `--paper` text
- **Buttons (Secondary):** `--paper` background, `--ink` text, `--line` border
- **Tags (Explore):** light background `rgba(74,122,92,0.15)`, border + text `--explore`
- **Tags (Combat):** light background `rgba(176,64,48,0.15)`, border + text `--combat`
- **Tags (Accent):** light background `rgba(43,74,122,0.12)`, border + text `--accent`

### Elevation & Depth

No drop shadows in the traditional sense. Instead, use:
- **Box shadow (raised):** `1.5px 1.5px 0 var(--line)` — subtle offset, hand-drawn feel
- **Double border (contained):** `2px 2px 0 var(--paper-warm), 2px 2px 0 1px var(--line)` — stacked effect
- **Layering via z-index:** overlays and focus states use z-index for depth, not shadow

## Typography

### Font Stack

- **Kalam** (body, ~13–14px) — regular prose, metadata, labels (everyday reading)
- **Caveat** (display, 18–32px) — titles, buttons, emphasis (handwritten flair)
- **Special Elite** (monospace, 8–11px) — tags, labels, system text (typewriter feel)
- **Fallbacks:** cursive, serif, monospace as needed

### Type Scale & Hierarchy

| Role | Font | Size | Weight | Usage |
|------|------|------|--------|-------|
| **Heading 1** | Caveat | 32px | 700 | Section title (canvas view) |
| **Heading 2** | Caveat | 22px | 700 | Page title, card titles |
| **Heading 3** | Caveat | 17px | 600 | Subsection title |
| **Body** | Kalam | 13px | 400 | Main prose, journal entries |
| **Meta** | Kalam | 11px | 400 | timestamps, secondary info |
| **Label** | Special Elite | 9px | 400 | UPPERCASE, tags, UI labels |
| **Button** | Caveat | 18px | 600 | action text |
| **Button (small)** | Caveat | 14px | 600 | compact buttons |

### Line Height

- Headings (Caveat): 1.05 (tight, impact)
- Body (Kalam): 1.4 (readable, spacious)
- Meta: 1.0 (compact)

## Spacing & Layout

### Grid

- **Base unit:** 2px
- **Common gaps:** 6px, 8px, 10px, 12px, 14px, 16px, 18px
- **Padding in containers:** 10–16px (depends on density)
- **Section margins:** 12–20px

### Density Modifiers

- `.wf-compact` — `--gap: 6px` (tight, packed)
- `.wf-spacious` — `--gap: 14px` (breathing room)

### Common Spacing Patterns

| Use | Spacing |
|-----|---------|
| Horizontal padding (button) | 14px |
| Vertical padding (button) | 6px |
| Gap between elements | 8–10px |
| Section padding | 12px |
| Card padding | 12px |
| Margin between sections | 14px |

## Components

### Boxes & Containers

**Standard box** (`.wf-box`):
- Border: 1.5px solid `--line`
- Border-radius: `4px 6px 5px 7px / 6px 4px 7px 5px` (sketchy irregular radius)
- Use for: content cards, form groups, panels

**Dashed box** (`.wf-box-dashed`):
- Border: 1.5px dashed `--ink-soft`
- Border-radius: sketchy (as above)
- Use for: empty states, drafts, hints

**Double border box** (`.wf-box-double`):
- 1.5px solid border + offset shadow effect
- Creates layered, stacked appearance
- Use for: emphasized containers, highlighted content

### Buttons

**Base button** (`.wf-btn`):
- Font: Caveat 18px 600
- Padding: 6px 14px
- Background: `--paper`
- Border: 1.5px `--line`
- Border-radius: sketchy
- Box-shadow: `1.5px 1.5px 0 var(--line)` (raised)
- Active state: translate button 1.5px down, shadow removed (pressed effect)
- Transition: 0.08s (snappy)

**Primary button** (`.wf-btn-primary`):
- Background: `--accent`
- Text: `--paper`

**Small button** (`.wf-btn-sm`):
- Font: Caveat 14px 600
- Padding: 3px 9px

### Tags & Chips

**Base tag** (`.wf-tag`):
- Font: Special Elite 9px, uppercase, 0.05em letter spacing
- Padding: 2px 7px
- Border: 1px `--line`
- Border-radius: 8px (rounded, not sketchy)
- Background: `--paper`
- Text: `--ink-soft`

**Semantic tags:**
- `.wf-tag-explore` — explore green
- `.wf-tag-combat` — combat red
- `.wf-tag-accent` — accent blue

All variants use light tinted background (`rgba(..., 0.15)`) with colored border and text.

### Cards

**Playing card** (`.wf-card`):
- Background: `--paper-warm`
- Border: 1.5px `--line`, sketchy radius
- Inner dashed border: 1px dashed `--ink-soft` (inset)
- Label: Caveat 14px 700 (card value)
- Suit: 18px (suit symbol)

**Card back** (`.CardBack`):
- Background: `--accent` with diagonal stripe pattern
- Creates visual distinction from face

### Progress & Counters

**Progress bar** (`.Progress`):
- Segmented design (not continuous bar)
- Each segment: 6px height, 1px border, sketchy radius
- Filled segments colored (e.g., `--explore`, `--combat`)
- Gap between segments: 2px

### Navigation

**Bottom navigation** (`.wf-bottomnav`):
- 5 items (Home, Play, Party, Story, Cards — layout negotiable)
- Flex layout, centered
- Border-top: 1.5px `--line`
- Background: `--paper`

**Navigation item** (`.wf-navitem`):
- Icon: `wf-navicon` (24×24px box with glyph)
- Label: Special Elite 8px, uppercase
- Active state: color changes to `--accent`

**Top bar** (`.TopBar`):
- Title: centered Caveat title
- Left/right: action buttons or labels (Caveat 22px)
- Subtitle: metadata (meta font, smaller)
- Background: `--paper-warm`
- Border-bottom: 1.5px `--line`

### Input & Form Elements

*(To be detailed when features define form interactions)*

- Text inputs: 1.5px border, sketchy radius, `--paper` background
- Focus state: border color changes to `--accent`
- Labels: Special Elite small caps
- Validation: use `--combat` (red) for errors, `--explore` (green) for success

## Visual Texture

### Paper Texture Overlay

Subtle noise/texture applied via pseudo-element (`.wf-paper-tex::before`):
- SVG turbulence filter (feTurbulence + feColorMatrix)
- Opacity: 0.5
- Blend mode: multiply
- Effect: adds subtle grain, like aged paper

### Sketchy Lines & Dividers

**Squiggle divider** (`.wf-divider`):
- SVG path (wavy line)
- Repeating background pattern
- Used for section separation

**Hand-drawn line** (`.wf-line`):
- SVG with slight irregular path
- Creates sketchy, non-mechanical feel

**Handwriting animation** (`.Handwriting`):
- SVG paths simulating handwritten lines
- Varying width to suggest pen pressure
- Used in journal entries to suggest human writing

## Icons & Glyphs

- **Bottom nav icons:** single character glyphs (⌂, ◆, ♛, ✎, ♠) in sketchy boxes
- **Semantic icons:** suit symbols (♣, ♥, ♦, ♠) and suit colors
- **Callout icons:** rust-colored text annotations with arrows

All icons are text-based (unicode) or simple SVG strokes, no raster graphics.

## Dark Mode

*(Optional; not defined yet. Discuss if needed.)*

If dark mode is added:
- Invert `--paper` and `--ink` relationships
- Keep semantic colors (`--explore`, `--combat`) consistent
- Adjust `--paper-warm` to darker warm variant

## Animation & Motion

- **Button press:** 0.08s transform (press down effect)
- **Transitions:** 0.12–0.18s cubic-bezier(0.2, 0.7, 0.3, 1) — snappy, playful
- **Focus overlays:** instant or 0.15s ease-in
- **Page transitions:** TBD (depends on navigation model)

No bounce or elastic easing; keep motion straightforward but quick.

## Accessibility

- **Color contrast:** All text meets WCAG AA minimum (4.5:1 for normal text, 3:1 for large)
- **Touch targets:** Buttons and interactive elements min 44×44px
- **Text size:** Body text min 13px on mobile (zoomed comfortably)
- **Focus indicators:** Visible focus states on all interactive elements (using `--accent` or border change)
- **Semantic HTML:** use `<button>`, `<a>`, landmarks, ARIA labels where needed
- **Reduced motion:** respect `prefers-reduced-motion` media query; disable animations if set

## Responsive Behavior

- **Mobile-first:** design targets 375px (iPhone SE) as baseline
- **Tablet:** layouts reflow for > 768px, but design language stays consistent
- **Scaling:** all spacing and sizing scales proportionally; no abrupt breakpoints
- **Touch:** all interactive targets sized for thumb (min 44–48px)

---

## Implementation Notes

- All color values stored as CSS custom properties (`:root`)
- Border-radius patterns use asymmetrical values for sketchy effect (consistent across components)
- Box shadows and layering create depth without traditional Material drop shadows
- Typography choices prioritize readability over authenticity (fallbacks to system fonts)
- Texture and sketch effects are optional enhancements; functionality works without them
