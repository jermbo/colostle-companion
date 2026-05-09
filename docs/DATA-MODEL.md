# Data Model

Object schemas for all persistent data in Colostle Companion. All IDs are UUID strings. All timestamps are ISO 8601 strings. All arrays default to empty.

The app is offline-first with no server. Persistence target (localStorage vs. IndexedDB) is an implementation decision not yet made — that ADR should be written when implementation begins. These schemas are storage-agnostic.

---

## Campaign

The root object. Everything else belongs to a campaign.

```
Campaign {
  id:           string       // UUID
  name:         string       // player-given name, required
  hook:         string       // optional theme/tone note (1–2 sentences)
  status:       "active" | "paused" | "archived"
  createdAt:    string       // ISO 8601
  lastPlayedAt: string       // ISO 8601, updated on session start
}
```

A campaign owns one Deck, multiple Sessions, and all world-building records (NPCs, Settlements) discovered during play.

---

## Deck

One per campaign. Tracks the shuffled card order and which cards have been flipped.

```
Deck {
  campaignId:     string    // FK → Campaign.id
  cards:          Card[]    // full set of 52, in shuffled order
  nextIndex:      number    // index of the next card to flip (0–51)
  reshuffleCount: number    // how many times the deck has cycled, starts at 0
}
```

When `nextIndex` reaches 52, the deck reshuffles (same 52 cards, new order) and `reshuffleCount` increments. See [ADR-0001](./adr/0001-single-shuffled-deck-per-campaign.md).

### Card

```
Card {
  value: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A"
  suit:  "hearts" | "diamonds" | "clubs" | "spades"
}
```

`color` is derived: hearts and diamonds = red; clubs and spades = black. Do not store it — derive at read time.

---

## Session

A single play instance within a campaign.

```
Session {
  id:         string     // UUID
  campaignId: string     // FK → Campaign.id
  number:     number     // sequential within the campaign (Session 1, Session 2, …)
  status:     "active" | "complete"
  startedAt:  string     // ISO 8601
  endedAt:    string | null  // null while active
}
```

A campaign can have at most one `active` session at a time.

---

## Phase

A narrative unit within a session.

```
Phase {
  id:                 string    // UUID
  sessionId:          string    // FK → Session.id
  campaignId:         string    // FK → Campaign.id (denormalized for query convenience)
  number:             number    // sequential within the session (Phase 1, Phase 2, …)
  explorationCounter: number    // player-controlled, starts at 0
  combatCounter:      number    // player-controlled, starts at 0
  combatActive:       boolean   // true if the player has activated combat for this phase
  startedAt:          string    // ISO 8601
}
```

Phases do not have an `endedAt` — a new phase beginning is what marks the previous one as done. The last phase in a session is implicitly ended when the session ends.

---

## FlipRecord

One record per card flip. Immutable after creation.

```
FlipRecord {
  id:             string    // UUID
  phaseId:        string    // FK → Phase.id
  sessionId:      string    // FK → Session.id
  campaignId:     string    // FK → Campaign.id
  card:           Card      // the card that was drawn
  oracleKey:      string    // e.g., "exploration/land", "combat", "yes-no"
  oraclePrompt:   string    // the full text of the oracle result shown to the player
  journalEntryId: string | null  // FK → JournalEntry.id, set after entry is written
  flippedAt:      string    // ISO 8601
}
```

Re-flips (same card, different narrative interpretation) do not create a new FlipRecord. They are a play-time interpretation choice with no persistent state.

---

## JournalEntry

Narrative prose captured in response to a flip.

```
JournalEntry {
  id:             string      // UUID
  flipId:         string      // FK → FlipRecord.id
  phaseId:        string      // FK → Phase.id
  sessionId:      string      // FK → Session.id
  campaignId:     string      // FK → Campaign.id
  prose:          string      // the player's narrative text
  tags:           string[]    // optional player-defined tags (free text)
  npcIds:         string[]    // FKs → NPC.id (linked world details)
  settlementIds:  string[]    // FKs → Settlement.id (linked world details)
  createdAt:      string      // ISO 8601
  updatedAt:      string      // ISO 8601
}
```

One entry per flip. The entry may be empty (not all flips need a written response), but the record exists as soon as the player opens the journal form.

---

## NPC

A character encountered during a campaign.

```
NPC {
  id:               string    // UUID
  campaignId:       string    // FK → Campaign.id
  name:             string    // required
  role:             string    // optional (e.g., "merchant", "antagonist", "unknown")
  notes:            string    // freeform text, markdown not required
  journalEntryIds:  string[]  // FKs → JournalEntry.id (entries that reference this NPC)
  discoveredAt:     string    // ISO 8601, set when record is created
}
```

---

## Settlement

A location or community discovered during a campaign.

```
Settlement {
  id:               string    // UUID
  campaignId:       string    // FK → Campaign.id
  name:             string    // required
  type:             string    // optional (e.g., "fortress", "market town", "ruin")
  features:         string    // freeform notes on notable features
  inhabitants:      string    // freeform notes on who lives here
  journalEntryIds:  string[]  // FKs → JournalEntry.id
  discoveredAt:     string    // ISO 8601
}
```

---

## Object Relationships

```
Campaign
  └─ Deck (1:1)
  └─ Sessions (1:many)
       └─ Phases (1:many)
            └─ FlipRecords (1:many)
                 └─ JournalEntry (1:0–1)
  └─ NPCs (1:many, via campaignId)
  └─ Settlements (1:many, via campaignId)

JournalEntry ←→ NPC        (many:many via npcIds / journalEntryIds)
JournalEntry ←→ Settlement (many:many via settlementIds / journalEntryIds)
```

---

## ID strategy

Use `crypto.randomUUID()` — available in all modern browsers without a library. No polyfill needed for the target environment.

---

## Open Questions

1. **Version field:** Each top-level object should carry a `"v": "1"` field so migrations can detect old data on load. Add to Campaign at minimum.
2. **Undo / redo:** Not planned for v0.1.0. If a FlipRecord is created by mistake, the player can delete it. No version history on JournalEntry for now (only latest prose stored).

## Persistence

**localStorage** — decided in [ADR-0004](./adr/0004-localstorage-for-persistence.md). Data is serialized as JSON under a single namespace key (e.g., `colostle_v1`). All reads load the full blob on init; all writes serialize the updated state. Wrap reads/writes in a `store` module so the backing store can be swapped without touching feature code.
