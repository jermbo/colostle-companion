# Colostle Companion

A digital companion for solo narrative play of Colostle. The app holds everything needed to play: card deck, oracle tables, journaling, and world-building notes—all in one pocket-sized interface.

## Language

**Campaign**:
A self-contained story. Multiple campaigns can run simultaneously.
_Avoid_: Adventure, quest, project

**Session**:
A single play instance within a campaign. One or more phases may occur in a session; the player decides duration.
_Avoid_: Game, run (too generic)

**Phase**:
A narrative unit within a session combining exploration and optional combat. The player decides how many phases to play in a single sitting.
_Avoid_: Round, turn, encounter

**Flip**:
Drawing a card from the deck to trigger an oracle result. Each flip consumes one card and maps to a prompt via an oracle table.
_Avoid_: Draw, roll, query

**Deck**:
A shuffled set of cards belonging to a campaign. When depleted, the deck reshuffles and reuses the same cards. **Aces are low** — in oracle lookups, Ace is the lowest value (below 2), not above King.
_Avoid_: Card pool, card set

**Oracle** (or **Table**):
A reference table that maps card values and suits to prompts or results. Oracles exist for exploration (land, sea), combat, settlement, items, yes-no decisions, and others.
_Avoid_: Prompt table, lookup, rules

**Journal Entry**:
Narrative prose or notes captured after a flip. The entry records what the player imagined in response to the oracle result.
_Avoid_: Note, log, memo

**Counter**:
A resource tracker within a phase (e.g., exploration, combat). Counters are player-controlled and can increase or decrease based on narrative choices.
_Avoid_: Stat, score, resource (implies mechanical weight)

**Settlement**:
A location or community generated via card flips. Settlements are discovered and developed during a campaign.
_Avoid_: Base, location (too vague)

## Relationships

- A **Campaign** contains one **Deck** and multiple **Sessions**
- A **Session** contains one or more **Phases**
- A **Phase** contains multiple **Flips** and **Counters**
- Each **Flip** queries an **Oracle** and generates one **Journal Entry**
- A **Campaign** accumulates **Journal Entries**, **Settlements**, and world details across all sessions
- A **Deck** reshuffles when exhausted but retains the same card set throughout the campaign's lifetime

## Example dialogue

A player's internal narration during a session:

> "Okay, new **Campaign**. I'm going to begin a **Session** and play a **Phase**. Let me flip for an **Oracle** prompt about **Exploration**…"

> "A card. I got a prompt about a glade. That's interesting. Let me write a **Journal Entry** about discovering it. Okay, entry saved, flip recorded."

> "Two more flips in this **Phase**. My **Exploration Counter** is at 4 out of 6. I'm going to flip again for another **Oracle** result."

> "The **Deck** is exhausted. Good—it reshuffles and I'll use the same cards again, but I'll have to reinterpret them differently given where my **Campaign** has gone."

## Flagged ambiguities

- **"Flip" vs. "Draw"**: Colostle players may say both. Here, "flip" is canonical to emphasize the action and its oracle outcome.
- **"Oracle" vs. "Table"**: Both appear in Colostle. "Oracle" emphasizes consultation (asking the cards); "table" is the implementation. Use "oracle" with players; "table" in technical docs.
- **"Counter" vs. "Resource"**: Counters are player-controlled and narrative-driven, not mechanical. They track narrative momentum (exploration vs. combat), not character stats.
- **Ace value**: Aces are low in Colostle. In oracle table lookups, Ace ranks below 2 — it is the weakest card, not the strongest. Do not treat Ace as high (14) in any game logic or table ordering.
