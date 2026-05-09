---
feature: F-002
epic: E-003
---

# US-003: Flip Deck and Get Oracle Prompt

**As a player, I want to flip a card and immediately see an oracle prompt so I know what to narrate.**

## Scope

- Oracle selector: Exploration (Land), Exploration (Sea), Combat, Settlement, Items, Yes-No
- [Flip] button: draws next card from the campaign deck, looks up prompt in selected oracle table
- Oracle result display: card value and suit, prompt text
- Reshuffle: when deck reaches 0 cards, automatically reshuffles (same 52 cards, new order), increments reshuffle count
- Deck status indicator: cards remaining shown in Play tab
- Re-flip option: [↻ Re-flip] lets player re-interpret the same card without consuming a new one

## Out of scope for this story

- Custom oracle tables (v0.2.0+)
- Voice memo capture (v0.2.0+)

## Acceptance criteria

- [ ] Flip draws the correct next card from the shuffled deck
- [ ] Oracle lookup returns the correct prompt for the card value + suit color
- [ ] FlipRecord is created with card, oracleKey, oraclePrompt, and timestamp
- [ ] Deck counter decrements after each flip
- [ ] Reshuffle triggers correctly at 0 cards remaining; counter updates
- [ ] Re-flip does not consume a new card or create a new FlipRecord
- [ ] All 6 official oracle tables are complete and accurate per Colostle rules

## Notes

Oracle table data should be stored as a static JSON file (or JS object) — not in the database. Tables are read-only for v0.1.0.
