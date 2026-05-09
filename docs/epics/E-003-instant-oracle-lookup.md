# E-003: Instant Oracle Lookup

**The core mechanic.** Flip a card, instantly see the prompt — no book-fumbling, no table cross-referencing.

## Mission

Playing Colostle today means:
1. Shuffle the deck, flip a card
2. Note the card's value and suit
3. Find the right table in the right book (exploration? combat? settlement?)
4. Cross-reference by value and color (red = positive, black = negative)
5. Read the prompt
6. Imagine

With this app:
1. Flip a card
2. Read the prompt

**Success looks like:** Three seconds from flip to prompt, zero page-turning.

## The oracle system

The app ships with **Colostle's official tables**:
- **Exploration oracles** (land, sea) — keyed by card value + suit color
- **Combat oracle** — build enemy, determine difficulty
- **Settlement oracle** — build locations
- **Items oracle** — generate items
- **Yes-no oracle** — binary decisions
- Plus others as needed

Each oracle:
- Maps a card (value + suit/color) to a result
- May chain to sub-tables (e.g., "flip for combat" → "flip for enemy type")
- Is **extensible** — players can add custom tables/prompts

## Player control

- Player chooses which oracle to consult ("I want exploration")
- Player flips the deck
- App shows the result instantly
- Player journals the result and moves the narrative forward

## What this enables

- **Fast play** — no dead time hunting for rules
- **Seamless storytelling** — prompt flows directly into imagination
- **Customization** — players can add house rules, custom tables, themed prompts
- **Archive** — flip history is recorded (optional, for reference)

## Related epics

- [E-001: Portable Solo Play](./E-001-portable-solo-play.md) — the app that contains everything
- [E-002: Narrative Capture System](./E-002-narrative-capture-system.md) — the journal that captures what the prompts inspired
