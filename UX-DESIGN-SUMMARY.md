# UX & Design Summary

**Purpose:** Capture the visual direction, navigation structure, and user flows so you can evaluate whether the design approach matches your vision and informs feature decisions intentionally.

---

## What's New

Three documents created to formalize the design:

1. **[DESIGN.md](./docs/DESIGN.md)** — Design system (colors, typography, spacing, components)
2. **[INFORMATION-ARCHITECTURE.md](./docs/INFORMATION-ARCHITECTURE.md)** — Screen map and navigation model
3. **Updated features** — F-001, F-002, F-003 now include UX flows with step-by-step interactions

---

## Design System Overview

### Visual Language

**Aesthetic:** Warm, literary, hand-drawn. Think journal pages with a fountain pen.

**Core Colors:**
- **Text:** Warm brown (`--ink: #1f1a17`)
- **Background:** Cream (`--paper: #f4efe6`), with warmer variant (`--paper-warm: #ebe3d3`)
- **Primary action:** Blue (`--accent: #2b4a7a`)
- **Semantic:** Green for Explore (`--explore: #4a7a5c`), Red for Combat (`--combat: #b04030`)
- **Annotation:** Rust/orange (`--rust: #a85a3a`) for notes and callouts

**Typography:**
- **Kalam** — regular body text (13–14px), reads like handwriting
- **Caveat** — display text, titles, buttons (18–32px), more stylized
- **Special Elite** — monospace, tags, small labels (8–11px), typewriter feel

**Key Details:**
- Hand-drawn borders (irregular border-radius: `4px 6px 5px 7px / 6px 4px 7px 5px`)
- Subtle paper texture overlay
- Squiggly lines for dividers and journal entries (SVG patterns)
- Raised button effect (box-shadow with offset)
- No traditional drop shadows; instead, layering and borders for depth

### Component Library

Built-in components include:
- **Boxes:** standard (solid), dashed (draft), double-border (emphasized)
- **Buttons:** primary (blue), secondary (paper), small variants
- **Tags:** semantic colors (explore green, combat red, accent blue)
- **Cards:** playing card representation (label + suit) with card-back
- **Progress bars:** segmented (not continuous line)
- **Navigation:** bottom tab bar + top header bar
- **Annotations:** rust-colored callout notes with arrows

All components have sketchy, intentionally imperfect styling.

---

## Navigation Structure

### Five Main Tabs

```
HOME → PLAY → PARTY → STORY → CARDS
```

| Tab | Purpose | Key Content |
|-----|---------|-------------|
| **HOME** | Campaign list & lifecycle | Create, view, resume, delete campaigns |
| **PLAY** | Active session & flip mechanic | Deck stage, oracle prompt, quick journal |
| **PARTY** | World-building hub | NPCs, settlements, relationships |
| **STORY** | Journal archive | All entries, searchable, linked to world |
| **CARDS** | Deck & oracle reference | Flip history, oracle tables, custom tables |

### Key Screens

**HOME → Campaign List**
- Shows all campaigns with metadata (last played, session count)
- Tap campaign → Campaign Detail (recent sessions, world summary)
- [+ New] button → Create Campaign form

**PLAY → Active Session**
- Shows session header (campaign, phase, counters)
- Deck stage (deck + flipped card display)
- Oracle prompt result (major focus)
- Quick journal entry form (pop-up)
- [Flip] button to draw next card
- [Journal] button to expand entry editor

**PARTY → World-Building Hub**
- Lists NPCs, settlements, relationships
- Tap item → Detail view with edit option
- Links to journal entries mentioning each item

**STORY → Journal Archive**
- Sessions list (collapsible)
- Entries within each session
- Search functionality
- Tap entry → full view with metadata and links

**CARDS → Deck & Oracles**
- Deck status (cards remaining, reshuffles)
- Oracle table browser (all 6 official tables)
- Flip history view
- [+ Add custom table] for user extensibility

---

## User Flows (MVP)

### Flow 1: Start Playing

```
Home (list) → [Tap campaign] → Campaign Detail → [Resume Latest] → Play tab (active session)
```

### Flow 2: Flip & Journal

```
Play tab → [Flip] → Oracle prompt shown → [Journal] → Quick entry form → [Save] → Ready for next flip
```

### Flow 3: Review Archive

```
Story tab → [Tap session] → See entries → [Tap entry] → Full view with metadata/links
```

### Flow 4: Manage World

```
Party tab → [Tap NPC] → NPC Detail → [Edit] or [Link to entries]
```

---

## Design Decisions (Why This Shape?)

### Why Bottom Tab Navigation?

- **Mental model:** Each tab = one mode (list, play, world, story, reference)
- **Mobile-friendly:** Tab bar at bottom (thumb-friendly)
- **Persistent state:** When you return to a tab, you're back where you left off

### Why Sketchy/Hand-Drawn?

- **Aligns with narrative:** The aesthetic says "journal, imagination, story"
- **Differentiation:** Most apps are sterile; this feels literary and personal
- **Practical:** Irregular borders and squiggly lines forgive imperfection; they feel intentional, not broken

### Why Quick Journal in Play, Not Full Editor?

- **Flow:** Capture the moment before it fades (quick entry)
- **Expansion:** If player wants to expand/edit later, [Expand] button opens full editor
- **Fast play:** No friction between flip and next flip

### Why No Cloud Sync?

- **Simplicity:** No accounts, no authentication, no servers
- **User ownership:** Your data is yours; export/import for backups
- **Trust:** No telemetry, no data collection (see [ADR-0002](./docs/adr/0002-offline-first-no-cloud.md))

---

## What This Informs

### Feature Scope

By mapping screens and flows, we know:
- **V0.1.0 must have:** Home (F-001), Play (F-002), quick journal (F-003)
- **V0.2.0 nice-to-have:** Full Party (F-004), advanced Story search, custom oracle builder (F-005)
- **Offline + Import/Export (F-006):** Core from day one

### Development Priorities

1. **Build Play first** (F-002: flip mechanic) — the core loop must be airtight
2. **Then Home** (F-001: campaign management) — users need to create and resume
3. **Then Story** (F-003: journaling) — captures value of the app
4. **Later:** Party (F-004), Cards reference (F-005)

### Design System is Flexible

- Colors, fonts, spacing are all CSS variables → easy to tweak
- Component library (boxes, buttons, tags) established → new features use same language
- Hand-drawn aesthetic is intentional but can evolve → border-radius, textures can be adjusted
- Dark mode possible (if requested) → would invert paper/ink, keep semantic colors

---

## Review Checklist

As you review the UX & design docs:

**On Design System:**
- [ ] Do the colors feel right? (Warm browns and creams vs. something else?)
- [ ] Do the fonts (Caveat, Kalam, Special Elite) match your vision?
- [ ] Is the hand-drawn aesthetic intentional or should it be cleaner?
- [ ] Any components missing or redundant?

**On Navigation:**
- [ ] Do the five tabs (Home, Play, Party, Story, Cards) cover the right modes?
- [ ] Should any tabs be renamed or reordered?
- [ ] Does bottom tab navigation make sense, or would you prefer different navigation?

**On Flows:**
- [ ] Do the three UX flows (Start Playing, Flip & Journal, Review Archive) feel natural?
- [ ] Any steps missing or confusing?
- [ ] Is quick journal + expand the right balance, or too much complexity?

**On MVP Scope:**
- [ ] Does v0.1.0 (Home + Play + quick journal) cover enough to play?
- [ ] What would you cut if scope is too large?
- [ ] What's the must-have vs. nice-to-have?

---

## Connecting to Earlier Docs

**Design + Features:**
- Feature docs now reference wireframe locations and design system usage
- F-001, F-002, F-003 include mockups and component references

**Design + Epics:**
- [E-001: Portable](./docs/epics/E-001-portable-solo-play.md) — design supports "play anywhere" (responsive, mobile-first)
- [E-002: Narrative Capture](./docs/epics/E-002-narrative-capture-system.md) — Story tab + quick journal embody this
- [E-003: Instant Oracle](./docs/epics/E-003-instant-oracle-lookup.md) — Play tab design makes flip → prompt instant

**Design + CONTEXT.md:**
- Domain terms (flip, oracle, campaign) are visible in UI (buttons, labels, headers)
- Consistent language from docs → screens

---

## Next Steps

1. **Review & feedback** — Does the design direction align with your vision?
2. **Iterate** — Tweak colors, fonts, navigation based on feedback
3. **Build wireframes** — Create detailed wireframes for each screen (Home, Play, Party, Story, Cards) before coding
4. **Implement design system** — Build CSS/component library in the actual app
5. **Start coding** — Begin with Play tab (F-002), then Home (F-001), then Story (F-003)

---

**Everything is intentional from now on.** The design isn't borrowed from Material or iOS defaults—it's deliberately crafted for this app's narrative, offline-first, hand-journaling purpose.
