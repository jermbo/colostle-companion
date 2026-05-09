# Documentation Snapshot

**Purpose:** High-level project documentation for the Colostle Companion app, created via grilling session on 2026-05-09.

This snapshot captures the mission, domain language, core epics, and key design decisions. Use this to review direction before feature/story design begins.

---

## 📍 The Mission

Build a pocket-sized companion app for solo narrative play of Colostle. Consolidate three physical books, a card deck, and a notebook into one portable interface so players can play anywhere—park bench, lunch break, commute.

**Core value:** Faster play (instant oracle lookup) + remembered intent (persistent journal) + true portability (everything in the app).

---

## 🗣️ Domain Language

**Key terms** (defined in [CONTEXT.md](./CONTEXT.md)):
- **Campaign** — a self-contained story
- **Session** — a play instance (one visit to the app)
- **Phase** — a narrative unit combining exploration and optional combat
- **Flip** — drawing a card to trigger an oracle prompt
- **Deck** — 52-card set, reshuffles when exhausted (see [ADR-0001](./docs/adr/0001-single-shuffled-deck-per-campaign.md))
- **Oracle** — table mapping cards to prompts
- **Journal Entry** — narrative prose captured after each flip
- **Counter** — player-controlled resource tracker (exploration, combat)

**Philosophy:** Narrative-first, stat-light. We track intent and story, not inventory or gear.

---

## 🎯 Three Interlocking Epics

### [E-001: Portable Solo Play](./docs/epics/E-001-portable-solo-play.md)
Everything you need in your pocket. No books, no cards, no notebook—just the app and imagination.

### [E-002: Narrative Capture System](./docs/epics/E-002-narrative-capture-system.md)
Your campaign archive. Journal, NPCs, settlements, world details—captured so you remember your intent when you resume weeks later.

### [E-003: Instant Oracle Lookup](./docs/epics/E-003-instant-oracle-lookup.md)
The core mechanic. Flip a card, instantly see the prompt. Three seconds from flip to story moment.

---

## ⚙️ Core Features (Sketched)

1. **[F-001: Campaign Management](./docs/features/F-001-campaign-management.md)** — create, list, resume, delete campaigns
2. **[F-002: Card Flip & Oracle Lookup](./docs/features/F-002-card-flip-oracle-lookup.md)** — flip deck, resolve to prompt, record flip
3. **[F-003: Narrative Journaling](./docs/features/F-003-narrative-journaling.md)** — capture narrative, build archive, link to world details
4. **[F-004: World-Building Persistence](./docs/features/F-004-world-building-persistence.md)** — *(outline only)* NPCs, settlements, locations, relationships
5. **[F-005: Session & Phase Tracking](./docs/features/F-005-session-phase-tracking.md)** — *(outline only)* play structure, counters, session state
6. **[F-006: Import & Export](./docs/features/F-006-import-export.md)** — backup, share, transfer campaigns; users own their data locally

---

## 🏗️ Architecture Decisions

### [ADR-0001: Single Shuffled Deck Per Campaign](./docs/adr/0001-single-shuffled-deck-per-campaign.md)
One deck per campaign. When exhausted, reshuffle the same 52 cards.
- **Why:** Repeating cards force creative reinterpretation; consistent constraint across campaign lifetimes.
- **Implication:** Long campaigns cycle through the deck multiple times. This is intentional, not a limitation.

### [ADR-0002: Offline-First, No Cloud](./docs/adr/0002-offline-first-no-cloud.md)
All data is local. No accounts, no cloud sync, no servers. Users own their data entirely.
- **Why:** Simplicity, user ownership, privacy, no ongoing operational cost.
- **Trade-off:** Users manage their own backups via import/export.
- **Implication:** Data moves between devices via manual export/import; no automatic multi-device sync.

---

## 📋 What's Next?

This documentation is **high-level only**. The next steps are:

1. **Review & comment** — does the mission, domain language, and epic structure align with your vision?
2. **Sketch features** — flesh out F-004 and F-005, and any others we haven't covered (UX flows, data models, integrations)
3. **Create v0.1.0 milestone** — translate one epic into stories + tasks with acceptance criteria
4. **Start building** — implement the core flip mechanic first (F-002), then campaign list (F-001), then journaling (F-003)

---

## 📂 Documentation Tree

```
CONTEXT.md                                ← domain glossary (campaign, flip, oracle, etc.)
docs/
├── README.md                             ← how to read this docs folder
├── STANDARDS.md                          ← rules for maintaining docs
├── epics/
│   ├── README.md                         ← the three epics (why)
│   ├── E-001-portable-solo-play.md
│   ├── E-002-narrative-capture-system.md
│   └── E-003-instant-oracle-lookup.md
├── features/
│   ├── README.md                         ← core capabilities (what)
│   ├── F-001-campaign-management.md
│   ├── F-002-card-flip-oracle-lookup.md
│   └── F-003-narrative-journaling.md
├── adr/
│   ├── README.md
│   └── 0001-single-shuffled-deck-per-campaign.md  ← architecture decision
├── milestones/                           ← (empty until v0.1.0 milestone is sketched)
├── _inspiration/                         ← wireframes, design explorations
└── templates/                            ← story/task/epic/feature templates
```

---

## 🔍 Questions for You

1. **Does the mission and domain language feel right?** Any terms that should be renamed or clarified?
2. **Are the epics scoped correctly?** Should any be split, merged, or reframed?
3. **Did we miss a major capability or decision?** (e.g., offline support, cloud sync, user accounts)
4. **Which feature should we detail next?** (F-004: World-Building? F-005: Session Tracking? Something else?)
5. **Any design decisions we should surface as ADRs?** (e.g., "official tables + extensible" vs. "closed system")

---

**Created:** 2026-05-09  
**Format:** Follows [docs/STANDARDS.md](./docs/STANDARDS.md) and [skills/grill-with-docs/](./skills/grill-with-docs/)  
**Next review:** After user feedback on epics, domain, and core features
