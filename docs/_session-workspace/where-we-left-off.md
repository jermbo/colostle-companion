# Where We Left Off

**Session:** 2026-05-09 (Session 02 — extended)
**Status:** Documentation complete. Oracle tables scaffolded. Storage decided. Ready for implementation.

---

## What Was Accomplished

### Session 01 (carried forward, complete)
- CONTEXT.md, DESIGN.md, INFORMATION-ARCHITECTURE.md — all locked in
- F-001, F-002, F-003 — fully specced
- ADR-0001 (single deck), ADR-0002 (offline-first)
- Epics E-001, E-002, E-003

### Session 02

#### Feature specs completed
- **F-004: World-Building Persistence** — 3 UX flows, contracts, screen diagrams. Scoped to v0.2.0+.
- **F-005: Session & Phase Tracking** — 4 UX flows, contracts, screen diagrams. Included in v0.1.0.

#### Data model
- **DATA-MODEL.md** — 7 object schemas: Campaign, Deck, Card, Session, Phase, FlipRecord, JournalEntry, NPC, Settlement. Relationships diagram, ID strategy (`crypto.randomUUID()`).

#### v0.1.0 milestone — 6 user stories defined
- US-001: Campaign list and detail (Home tab)
- US-002: Session and phase play (Play tab)
- US-003: Flip deck and get oracle prompt (Play tab)
- US-004: Quick journal entry during play (Play tab)
- US-005: Journal archive (Story tab)
- US-006: Deck status and oracle reference (Cards tab)

#### Architecture decisions locked
- **ADR-0003** — Vanilla JS, minimal dependencies. Never auto-install; always ask first.
- **ADR-0004** — localStorage for persistence. Single JSON blob under `colostle_v1`. Wrap in a `store` module so the backing store is swappable.

#### Oracle tables scaffolded (`src/data/oracle-tables.js`)
- **Exploration** — split red (organic) / black (non-organic). Suit modifies base result (hearts/spades = positive, diamonds/clubs = negative). J/Q/K trigger enemy creation, not an exploration result.
- **Enemy creation** — triggered by J/Q/K during exploration:
  - J = Non-Rook enemy, Q = Medium Rook, K = Large Rook
  - 3 additional flips: type (A–6 defensive / 7–K attack), range (A–6 short / 7–K long), magic (A–3 none / 4–7 rumble / 8–10 ice / J–K lightning)
  - Lookup functions fully implemented and call-ready
- **Items** — A–K, suits irrelevant. Prompts are PLACEHOLDER.
- **Settlement** — A–K, suits irrelevant. Prompts are PLACEHOLDER.
- All lookup helpers exported: `lookupExploration`, `lookupEnemyType`, `lookupEnemyRange`, `lookupEnemyMagic`, `lookupItem`, `lookupSettlement`

#### Domain clarifications added to CONTEXT.md
- **Aces are low** — added to the Deck definition and Flagged Ambiguities. Ace ranks below 2 in all oracle lookups. Do not treat as high.

#### Memory system created
- `memory/MEMORY.md` + `memory/feedback_dependency_management.md` — dependency preference persisted for future agents.

---

## Current State

### Ready for implementation
- ✅ Domain language (CONTEXT.md) — including aces-are-low ruling
- ✅ Design system (DESIGN.md)
- ✅ Information architecture (INFORMATION-ARCHITECTURE.md)
- ✅ All 6 feature specs (F-001 through F-006)
- ✅ Data model (DATA-MODEL.md)
- ✅ Epics, ADRs (0001–0004)
- ✅ v0.1.0 milestone: 6 user stories with acceptance criteria
- ✅ Oracle table structure and lookup logic (`src/data/oracle-tables.js`)
- ✅ Storage decision: localStorage, `colostle_v1` key

### Still needs content (not blocking architecture)
- ⚠️ Exploration table prompts — base + suit modifier text for A–10 (red and black). PLACEHOLDERs in place.
- ⚠️ Items table prompts — A–K text. PLACEHOLDERs in place.
- ⚠️ Settlement table prompts — A–K text. PLACEHOLDERs in place.
- ⚠️ Enemy characteristic descriptions — prose for defensive/attack, short/long, rumble/ice/lightning. PLACEHOLDERs in place.

### Not yet started
- ❌ Project scaffold — no HTML/JS files beyond the Astro stub. See next session focus.
- ❌ `store` module — localStorage read/write wrapper (see ADR-0004)
- ❌ Wireframes for Party tab screens (v0.2.0+, not urgent)

---

## Next Session Focus (Priority Order)

### 1. Decide build order (discuss with user first)

**Option A — Data layer first:**
Build `src/store.js` (localStorage wrapper) + vanilla JS modules for each domain object (Campaign, Session, Phase, FlipRecord, JournalEntry). Wire to a minimal UI once the data layer is solid.

**Option B — UI first:**
Build the Play tab UI against hardcoded/mock data. Get the core flip loop feeling right, then wire persistence underneath.

Recommend discussing before starting — both are valid, user preference should drive it.

### 2. Project scaffold

No `index.html` or `src/app.js` exists yet. Agreed starting point: vanilla JS ES modules, no bundler, Astro as the shell. Proposed structure:
```
src/
  data/
    oracle-tables.js    ← exists
  store.js              ← localStorage wrapper (to create)
  app.js                ← entry point (to create)
  pages/
    index.astro         ← exists (Astro shell)
```

### 3. Fill in oracle table prompt text

When the user has the Colostle rulebook handy, fill in PLACEHOLDER strings in `src/data/oracle-tables.js`. Can be done any time — the lookup functions are already wired.

---

## Open Questions

1. **Build order** — data-first or UI-first? (Discuss before starting)
2. **Counter ceiling** — enforce max=6 or let player manage? (Recommend: no enforcement for v0.1.0)
3. **Schema version field** — add `"v": "1"` to Campaign objects for future migration safety?
4. **Voice memos** — v0.1.0 or v0.2.0+? (Recommend: v0.2.0+)
5. **Search** — full-text (`string.includes()`) or tag-based? (Recommend: full-text for v0.1.0)
6. **Schema version field** — already listed above as item 3; no new questions.

---

## Key Principles (Do Not Forget)

1. **Top-down, intentional design** — Mission → Epics → Features → Design → Code
2. **Mermaid diagrams everywhere** — ASCII art is deprecated
3. **No emojis** — Professional language only (except suit symbols and navigation glyphs as domain language)
4. **Design-first, not code-first** — UX flows exist before implementation
5. **Offline-first with manual sync** — No cloud, no accounts, users own their data
6. **Narrative-first, stat-light** — Story and intent matter more than gear and inventory
7. **Solo play only** — No multiplayer, no GM mode
8. **Vanilla JS, minimal dependencies** — Ask before installing anything (ADR-0003)
9. **Aces are low** — In all oracle lookups, A < 2. Never treat Ace as high (14).

---

## Files & Directory Structure

```
docs/
  CONTEXT.md                    (glossary — locked in, aces-are-low added)
  DESIGN.md                     (design system — locked in)
  INFORMATION-ARCHITECTURE.md   (navigation — locked in)
  DATA-MODEL.md                 (object schemas — complete)
  features/
    F-001 through F-006         (all complete; F-004 is v0.2.0+ scope)
  epics/
    E-001, E-002, E-003
  adr/
    0001-single-shuffled-deck-per-campaign.md
    0002-offline-first-no-cloud.md
    0003-vanilla-js-minimal-dependencies.md
    0004-localstorage-for-persistence.md
  milestones/
    v0.1.0/
      US-001 through US-006
  _session-workspace/
    where-we-left-off.md        (this file)

src/
  data/
    oracle-tables.js            (scaffolded, lookup functions implemented)
  pages/
    index.astro                 (Astro shell, untouched)
  content/blog/
    2026-05-09-session01.md

memory/
  MEMORY.md
  feedback_dependency_management.md
```

---

**Last Updated:** 2026-05-09
**Author:** Claude (Agent SDK)
**Status:** Complete. Ready for Session 03 — implementation begins.
